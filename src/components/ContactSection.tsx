import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Mail, MessageSquare, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from './GlassCard';
import { submitContactForm } from '@/lib/formService';

// Declare Calendly on window
declare global {
    interface Window {
        Calendly?: {
            initPopupWidget: (options: { url: string }) => void;
        };
    }
}

const ContactSection = () => {
    const containerRef = useRef(null);
    const formRef = useRef<HTMLFormElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: '-100px' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<'message' | 'schedule'>('message');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Web Application',
        pricingPlan: 'Not sure yet',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Save to Firebase Firestore
            await submitContactForm({
                name: formData.name,
                email: formData.email,
                company: formData.projectType,
                message: `Plan: ${formData.pricingPlan}\n\n${formData.message}`,
                plan: formData.pricingPlan
            });

            toast.success('Message sent successfully!', {
                description: 'We will get back to you within 24 hours.'
            });

            // Reset form
            setFormData({
                name: '',
                email: '',
                projectType: 'Web Application',
                pricingPlan: 'Not sure yet',
                message: ''
            });

        } catch (error) {
            console.error('Form submission error:', error);
            toast.error('Failed to send message', {
                description: 'Please try again or contact us directly at hello@heptact.com'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSchedule = () => {
        // Use Calendly popup widget
        if (window.Calendly) {
            window.Calendly.initPopupWidget({
                url: 'https://calendly.com/ishaangupta011205?hide_landing_page_details=1&hide_gdpr_banner=1&text_color=000000&primary_color=d3d3d3'
            });
        } else {
            // Fallback to new window
            window.open('https://calendly.com/ishaangupta011205', '_blank');
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden" ref={containerRef}>
            {/* Background Elements */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] rounded-full bg-primary/[0.03] blur-[120px]" />
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 glass-card rounded-full px-3 py-1.5 mb-4">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Get in Touch</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">
                        Ready to Connect
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto font-mono">
                        Start your project or schedule a call with our engineering team.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Left Panel - Navigation & Info */}
                        <motion.div
                            className="md:col-span-2 space-y-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <GlassCard className="p-2">
                                <div className="grid grid-cols-2 gap-1 p-1 bg-muted/20 rounded-lg">
                                    <button
                                        onClick={() => setActiveTab('message')}
                                        className={`flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-md transition-all ${activeTab === 'message'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        Send Message
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('schedule')}
                                        className={`flex items-center justify-center gap-2 py-2.5 text-xs font-medium rounded-md transition-all ${activeTab === 'schedule'
                                            ? 'bg-background text-foreground shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <Calendar className="w-3.5 h-3.5" />
                                        Book Call
                                    </button>
                                </div>
                            </GlassCard>

                            <GlassCard className="p-6 space-y-6">
                                <div>
                                    <h4 className="font-display font-bold mb-2">Why Heptact?</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        We specialize in high-performance, gesture-controlled web experiences that define the future of interaction.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span>24h Response Time</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span>Direct Engineering Access</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span>Custom Implementation Plans</span>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Contact Info */}
                            <GlassCard className="p-6">
                                <h4 className="font-display font-bold mb-4 text-sm">Direct Contact</h4>
                                <div className="space-y-3">
                                    <a
                                        href="mailto:hello@heptact.com"
                                        className="flex items-center gap-3 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                                    >
                                        <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                                        <span>hello@heptact.com</span>
                                    </a>
                                </div>
                            </GlassCard>
                        </motion.div>

                        {/* Right Panel - Form / Calendar */}
                        <motion.div
                            className="md:col-span-3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <GlassCard className="h-full p-6 sm:p-8 relative overflow-hidden">
                                {activeTab === 'message' ? (
                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono uppercase text-muted-foreground">Name *</label>
                                                <Input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    required
                                                    className="bg-background/50 border-white/10 focus:border-primary/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-mono uppercase text-muted-foreground">Email *</label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@company.com"
                                                    required
                                                    className="bg-background/50 border-white/10 focus:border-primary/50"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-mono uppercase text-muted-foreground">Project Type</label>
                                            <select
                                                name="projectType"
                                                value={formData.projectType}
                                                onChange={handleChange}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option>Web Application</option>
                                                <option>Marketing Site</option>
                                                <option>3D Experience</option>
                                                <option>Gesture Control Integration</option>
                                                <option>Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-mono uppercase text-muted-foreground">Pricing Plan</label>
                                            <select
                                                name="pricingPlan"
                                                value={formData.pricingPlan}
                                                onChange={handleChange}
                                                className="flex h-10 w-full items-center justify-between rounded-md border border-white/10 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option>Starter ($20)</option>
                                                <option>Pro ($499)</option>
                                                <option>Enterprise (Custom)</option>
                                                <option>Not sure yet</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-mono uppercase text-muted-foreground">Project Details *</label>
                                            <Textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us about your vision, timeline, and requirements..."
                                                className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary/50 resize-none"
                                                required
                                            />
                                        </div>

                                        <Button type="submit" className="w-full group" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-[10px] text-muted-foreground text-center mt-4">
                                            By submitting this form, you agree to receive communications from Heptact.
                                        </p>
                                    </form>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-8">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                            <Calendar className="w-8 h-8 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">Schedule a Discovery Call</h3>
                                            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                                Book a 30-minute slot directly with our team to discuss your project needs.
                                            </p>
                                        </div>
                                        <Button onClick={handleSchedule} size="lg" className="group">
                                            Open Calendar <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                )}
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
