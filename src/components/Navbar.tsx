import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Vision', id: 'vision' },
    { label: 'Demos', id: 'demos' },
    { label: 'Features', id: 'features' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6">
          <div
            className={`glass-card rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'bg-background/80' : 'bg-background/40'
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-background" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
                GESTURA
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="default"
                size="sm"
                onClick={() => scrollToSection('demos')}
                className="font-mono uppercase tracking-wider text-xs"
              >
                Try Demo
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-foreground/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-24 left-0 right-0 z-40 px-6 md:hidden"
          >
            <div className="glass-card rounded-2xl p-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-lg font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border-b border-border/50 last:border-0"
                >
                  {item.label}
                </motion.button>
              ))}
              <Button
                variant="default"
                size="lg"
                onClick={() => scrollToSection('demos')}
                className="w-full mt-4 font-mono uppercase tracking-wider"
              >
                Try Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
