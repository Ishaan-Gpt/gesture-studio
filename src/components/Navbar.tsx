import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, ArrowRight, Hand } from 'lucide-react';
import HeptagonLogo from './HeptagonLogo';
import { toast } from 'sonner';
import { useGesture } from '@/context/GestureContext';
import { useTheme } from '@/components/DynamicThemeProvider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isEnabled, toggleGestureMode } = useGesture();
  const { currentTheme } = useTheme();

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

  const handleStartProject = () => {
    scrollToSection('contact');
    toast.success('Let\'s build something amazing!', {
      description: 'Choose a package that fits your needs.'
    });
  };

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'About', id: 'vision' },
    { label: 'Use Cases', id: 'use-cases' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'
          }`}
      >
        <div className="container mx-auto px-6">
          <div
            className={`glass-card rounded px-6 py-3 flex items-center justify-between transition-all duration-300 ${currentTheme === 'light'
              ? isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-white/70 backdrop-blur-lg'
              : isScrolled ? 'bg-background/80' : 'bg-background/40'
              }`}
          >
            {/* Logo */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 group"
            >
              <HeptagonLogo size={32} className="group-hover:scale-110 transition-transform" />
              <span className={`font-display font-bold text-lg tracking-tight hidden sm:block ${currentTheme === 'light' ? 'text-black' : 'text-white'
                }`}>
                HEPTACT
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm uppercase tracking-wider transition-colors relative group ${currentTheme === 'light'
                    ? 'text-black/60 hover:text-black'
                    : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${currentTheme === 'light' ? 'bg-black' : 'bg-foreground'
                    }`} />
                </button>
              ))}
            </div>

            {/* CTA Button & Gesture Toggle */}
            <div className="hidden md:flex items-center gap-4">
              {/* Gesture Toggle with red/green */}
              <div className="flex items-center gap-2 mr-2 border-r border-border pr-4">
                <Hand className={`w-4 h-4 transition-colors ${isEnabled ? 'text-green-500' : 'text-red-500'
                  }`} />
                <Switch
                  id="gesture-mode-nav"
                  checked={isEnabled}
                  onCheckedChange={toggleGestureMode}
                  className="scale-75 data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
              </div>

              <Button
                variant="default"
                size="sm"
                onClick={handleStartProject}
                className="uppercase tracking-wider text-xs"
              >
                Start Project
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
            <div className="glass-card rounded p-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 text-lg uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors border-b border-border/50 last:border-0"
                >
                  {item.label}
                </motion.button>
              ))}

              {/* Mobile Gesture Toggle */}
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Hand className={`w-4 h-4 transition-colors ${isEnabled ? 'text-green-500' : 'text-red-500'
                    }`} />
                  <span className="text-sm uppercase tracking-wider text-muted-foreground">Gesture Mode</span>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={toggleGestureMode}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
              </div>

              <Button
                variant="default"
                size="lg"
                onClick={handleStartProject}
                className="w-full mt-4 uppercase tracking-wider"
              >
                Start Project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
