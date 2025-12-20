import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Sparkles, ArrowRight, Clock, CheckCircle2, Zap } from 'lucide-react';
import { toast } from 'sonner';

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ m: 14, s: 59 });

  useEffect(() => {
    // Show popup after 4 seconds
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('offer-popup-dismissed');
      if (!dismissed) {
        setIsOpen(true);
      }
    }, 4000);

    // Countdown timer logic
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        return prev;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('offer-popup-dismissed', 'true');
  };

  const handleClaimOffer = () => {
    toast.success('Discount Applied!', { description: 'Starter Pack unlocked at $199.' });
    handleClose();
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Premium Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className="z-[101] w-full max-w-md pointer-events-auto relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl">
              {/* Animated Gradient Border/Glow - Monochrome */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-30" />

              {/* Content Container */}
              <div className="relative p-6 sm:p-8 backdrop-blur-xl">

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-white/20">
                    <Sparkles className="w-3 h-3 fill-black" />
                    Launch Special
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                    Unlock the Future
                  </h2>
                  <p className="text-white/60 text-sm max-w-xs">
                    Get our premium gesture control starter pack at an exclusive early-bird rate.
                  </p>
                </div>

                {/* Offer Box */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                  <div className="flex items-end justify-center gap-3 mb-2">
                    <span className="text-lg text-white/40 line-through decoration-white/40 decoration-2">$199</span>
                    <span className="text-5xl font-display font-bold text-white tracking-tight">$20</span>
                  </div>
                  <div className="text-center">
                    <span className="text-black text-xs font-bold uppercase tracking-wider bg-white px-2 py-1 rounded">
                      Save $179 Today
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Full Gesture Control System</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Custom 3D Integration</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Priority Implementation Support</span>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="space-y-4">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={handleClaimOffer}
                    className="w-full h-12 bg-white text-black hover:bg-gray-200 font-bold text-base shadow-lg shadow-white/10 group"
                  >
                    Claim Offer Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="flex items-center justify-between text-xs text-white/40 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-white/60" />
                      <span className="text-white/60">Offer ends in {timeLeft.m}:{timeLeft.s.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-white" />
                      <span className="text-white">3 spots left</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OfferPopup;
