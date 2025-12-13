import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { toast } from 'sonner';

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('offer-popup-dismissed');
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('offer-popup-dismissed', 'true');
  };

  const handleClaimOffer = () => {
    toast.success('Offer claimed!', { description: 'Redirecting to pricing...' });
    handleClose();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm"
          />

          {/* Popup - Small & Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[320px]"
          >
            <div className="glass-card rounded-xl p-6 relative border border-foreground/10">
              {/* Close */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 hover:bg-foreground/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 bg-foreground text-background px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" />
                  Limited Offer
                </div>

                {/* Headline */}
                <h3 className="text-xl font-display font-bold mb-2">
                  First 3 Clients
                </h3>
                <p className="text-2xl font-display font-bold gradient-text mb-3">90% OFF</p>

                {/* Price */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-lg text-muted-foreground line-through">$199</span>
                  <span className="text-3xl font-display font-bold">$20</span>
                </div>

                {/* Urgency */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-muted-foreground mb-4">
                  <Clock className="w-3 h-3" />
                  <span>3 spots left</span>
                </div>

                {/* CTA */}
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleClaimOffer}
                  className="w-full group text-sm"
                >
                  Claim Spot
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button
                  onClick={handleClose}
                  className="mt-3 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  No thanks
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OfferPopup;
