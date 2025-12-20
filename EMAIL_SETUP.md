# Email Backend Setup Guide

## EmailJS Integration

The contact form now uses EmailJS to send real emails. Follow these steps to configure it:

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions
5. Copy your **Service ID**

### 3. Create Email Template

1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Project Type: {{project_type}}
Pricing Plan: {{pricing_plan}}

Message:
{{message}}

---
This email was sent from your Heptact website contact form.
```

4. Save and copy your **Template ID**

### 4. Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (starts with something like `user_...`)

### 5. Update ContactSection.tsx

Replace these lines in `src/components/ContactSection.tsx`:

```typescript
const SERVICE_ID = 'YOUR_SERVICE_ID';        // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

Also update this line with your actual email:
```typescript
to_email: 'your-email@example.com',          // Your receiving email
```

### 6. Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox
4. You should receive the contact form data

### 7. Troubleshooting

**Emails not sending?**
- Check that all IDs are correct
- Verify your email service is connected in EmailJS dashboard
- Check browser console for error messages
- Ensure your EmailJS account is verified

**Receiving spam/test emails?**
- Add email validation in EmailJS dashboard
- Enable reCAPTCHA (optional)

### Alternative: Web3Forms (No Account Required)

If you prefer not to use EmailJS, you can use Web3Forms:

1. Go to [Web3Forms.com](https://web3forms.com/)
2. Get a free access key
3. Update the form to POST to `https://api.web3forms.com/submit`
4. Add your access key to the form data

### Current Behavior (Without Setup)

- Form data is logged to console
- Success toast shows to user
- No actual email is sent until you configure EmailJS

### Free Tier Limits

EmailJS Free Tier:
- 200 emails/month
- 2 email services
- 2 email templates

This should be sufficient for a startup/portfolio site.
