import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import HeptagonLogo from './HeptagonLogo';

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Subscribed!', { description: 'You\'ll receive our latest updates and case studies.' });
  };

  const handleLinkClick = (linkName: string) => {
    toast.info(`${linkName}`, { description: 'Page coming soon!' });
  };

  const handleSocialClick = (platform: string) => {
    toast.info(`Opening ${platform}...`, { description: 'Redirecting to our profile.' });
  };

  return (
    <footer className="relative py-20 border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 mb-4 group"
            >
              <HeptagonLogo size={40} className="group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-display font-bold">HEPTACT</span>
            </button>
            <p className="text-base text-muted-foreground mb-6 max-w-sm">
              We engineer the next generation of touchless web interaction.
              Hardware-free, AI-powered, and designed for the elite.
              The future beyond the mouse.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                className="bg-muted/50 border-border/50 focus:border-foreground"
              />
              <Button type="submit" variant="default">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-base font-display font-semibold mb-4">Work</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('demos')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Live Demos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('Case Studies')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('Process')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Technology
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleLinkClick('About Us')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('Careers')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('Contact')}
                  className="text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <p className="text-base text-muted-foreground mb-4 md:mb-0">
            © 2024 Heptact. Crafted with precision.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => handleSocialClick('GitHub')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => handleSocialClick('Twitter')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => handleSocialClick('LinkedIn')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => handleSocialClick('Email')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Mail className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
