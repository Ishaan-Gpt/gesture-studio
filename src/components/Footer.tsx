import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, Twitter, Linkedin, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import HeptagonLogo from './HeptagonLogo';
import { subscribeNewsletter } from '@/lib/formService';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeNewsletter({ email });
      toast.success('Subscribed!', { description: 'You\'ll receive our latest updates and case studies.' });
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe', { description: 'Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLinkClick = (linkName: string) => {
    toast.info(`${linkName}`, { description: 'Page coming soon!' });
  };

  const handleSocialClick = (platform: string, url: string) => {
    window.open(url, '_blank');
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
              We craft bespoke gesture-controlled 3D experiences for brands that refuse to blend in.
              Your vision, our expertise.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/50 border-border/50 focus:border-foreground"
              />
              <Button type="submit" variant="default" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
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
            © 2024 Heptact. All rights reserved.
          </p>

          {/* Social Links - Text based */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleSocialClick('GitHub', 'https://github.com/heptact')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </button>
            <button
              onClick={() => handleSocialClick('Twitter', 'https://twitter.com/heptact')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </button>
            <button
              onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com/company/heptact')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </button>
            <a
              href="mailto:hello@heptact.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
