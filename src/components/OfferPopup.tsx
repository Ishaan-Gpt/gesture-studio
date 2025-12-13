import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { toast } from 'sonner';

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already dismissed the popup
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
    toast.success('Offer claimed!', {
      description: 'Redirecting to book your spot...',
    });
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
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-lg"
          >
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-foreground/10">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-foreground/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-foreground/5 blur-3xl" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-foreground/10 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider mb-6"
                >
                  <Sparkles className="w-3 h-3" />
                  Limited Time Offer
                </motion.div>

                {/* Headline */}
                <motion.h3
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl font-display font-bold mb-4"
                >
                  First 3 Clients Get
                  <br />
                  <span className="gradient-text">90% OFF</span>
                </motion.h3>

                {/* Price comparison */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-center gap-4 mb-6"
                >
                  <span className="text-2xl text-muted-foreground line-through">$199</span>
                  <span className="text-5xl font-display font-bold text-foreground">$20</span>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto"
                >
                  Get the full Pro package at a fraction of the cost. 
                  Custom gesture component, 3D integration, and priority support included.
                </motion.p>

                {/* Urgency indicator */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground mb-6"
                >
                  <Clock className="w-3 h-3" />
                  <span>Only 3 spots available</span>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleClaimOffer}
                    className="w-full group text-base"
                  >
                    Claim Your Spot
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <button
                    onClick={handleClose}
                    className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    No thanks, I'll pay full price
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OfferPopup;
