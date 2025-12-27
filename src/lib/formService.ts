import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Types
export interface ContactFormData {
    name: string;
    email: string;
    company?: string;
    message: string;
    plan?: string;
}

export interface NewsletterData {
    email: string;
}

// Rate limiting helper - prevents spam
const checkRateLimit = (key: string, limitMinutes: number = 1): void => {
    const lastSubmitKey = `lastSubmit_${key}`;
    const lastSubmit = localStorage.getItem(lastSubmitKey);

    if (lastSubmit) {
        const timeSinceLastSubmit = Date.now() - parseInt(lastSubmit);
        const minutesElapsed = timeSinceLastSubmit / 60000;

        if (minutesElapsed < limitMinutes) {
            const waitTime = Math.ceil(limitMinutes - minutesElapsed);
            throw new Error(`Please wait ${waitTime} minute${waitTime > 1 ? 's' : ''} before submitting again`);
        }
    }

    localStorage.setItem(lastSubmitKey, Date.now().toString());
};

// Send email via API
const sendEmail = async (data: { name: string; email: string; message?: string; type: string }) => {
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.warn('Email sending failed, but form was saved');
        }
    } catch (error) {
        console.warn('Email API not available:', error);
    }
};

// Save contact form submission to Firestore
export const submitContactForm = async (data: ContactFormData) => {
    // Rate limiting: 1 submission per minute
    checkRateLimit('contact', 1);

    try {
        const docRef = await addDoc(collection(db, 'contacts'), {
            ...data,
            createdAt: serverTimestamp(),
            status: 'new'
        });

        // Send confirmation email
        await sendEmail({
            name: data.name,
            email: data.email,
            message: data.message,
            type: 'contact'
        });

        console.log('Contact form submitted:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

// Save newsletter subscription
export const subscribeNewsletter = async (data: NewsletterData) => {
    // Rate limiting: 1 subscription per 5 minutes
    checkRateLimit('newsletter', 5);

    try {
        const docRef = await addDoc(collection(db, 'newsletter'), {
            ...data,
            subscribedAt: serverTimestamp(),
            active: true
        });

        // Send confirmation email
        await sendEmail({
            name: 'Subscriber',
            email: data.email,
            type: 'newsletter'
        });

        console.log('Newsletter subscribed:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        throw error;
    }
};

// Save pricing inquiry
export const submitPricingInquiry = async (plan: string, email?: string) => {
    try {
        const docRef = await addDoc(collection(db, 'pricing_inquiries'), {
            plan,
            email: email || null,
            createdAt: serverTimestamp(),
            status: 'pending'
        });

        console.log('Pricing inquiry submitted:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error submitting pricing inquiry:', error);
        throw error;
    }
};
