import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  runtime: 'edge',
};

// Professional email template with brand styling
const getEmailTemplate = (type: 'user' | 'admin', data: any) => {
  const heptagonLogo = `
    <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" 
               fill="none" 
               stroke="#000000" 
               stroke-width="3"/>
      <circle cx="50" cy="50" r="15" fill="#000000"/>
    </svg>
  `;

  if (type === 'user') {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #000000;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 40px 40px 30px; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);">
              ${heptagonLogo}
              <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 700; color: #ffffff; margin: 20px 0 10px; letter-spacing: 1px;">
                HEPTACT
              </h1>
              <p style="font-size: 11px; color: #999999; margin: 0; letter-spacing: 3px; text-transform: uppercase;">
                Gesture-Controlled Experiences
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 50px 40px;">
              <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 24px; font-weight: 600; color: #000000; margin: 0 0 20px;">
                ${data.type === 'newsletter' ? 'Welcome to Heptact' : 'Thank You for Reaching Out'}
              </h2>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px;">
                Hi ${data.name},
              </p>
              
              ${data.type === 'newsletter' ? `
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px;">
                You've successfully subscribed to our newsletter. You'll receive updates about cutting-edge gesture control technology, new project showcases, and industry insights.
              </p>
              ` : `
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 0 0 20px;">
                We've received your message and our team will review it carefully. We aim to respond within 24 hours.
              </p>
              
              <div style="background-color: #f9f9f9; border-left: 3px solid #000000; padding: 20px; margin: 30px 0;">
                <p style="font-size: 14px; color: #666666; margin: 0 0 5px; font-weight: 500;">Your Message:</p>
                <p style="font-size: 15px; color: #333333; margin: 0; line-height: 1.5;">${data.message}</p>
              </div>
              `}
              
              <p style="font-size: 16px; line-height: 1.6; color: #333333; margin: 30px 0 0;">
                Best regards,<br>
                <strong style="font-weight: 600;">The Heptact Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f5f5f5; border-top: 1px solid #e0e0e0;">
              <p style="font-size: 13px; color: #666666; margin: 0 0 15px; line-height: 1.5;">
                <strong style="color: #000000;">Heptact</strong><br>
                Building the future of touchless interaction
              </p>
              
              <p style="font-size: 12px; color: #999999; margin: 0;">
                <a href="https://gesture-studio.vercel.app" style="color: #000000; text-decoration: none; font-weight: 500;">Visit our website</a>
                &nbsp;•&nbsp;
                <a href="mailto:hello@heptact.com" style="color: #000000; text-decoration: none;">hello@heptact.com</a>
              </p>
              
              <p style="font-size: 11px; color: #999999; margin: 15px 0 0;">
                © 2024 Heptact. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  // Admin notification template
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <tr>
            <td style="padding: 30px; background-color: #000000; border-radius: 8px 8px 0 0;">
              <h1 style="font-size: 20px; font-weight: 600; color: #ffffff; margin: 0;">
                🔔 New ${data.type === 'newsletter' ? 'Newsletter Subscription' : 'Contact Form Submission'}
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 30px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-radius: 4px; margin-bottom: 10px;">
                    <p style="font-size: 13px; color: #666666; margin: 0 0 5px; font-weight: 500;">Name</p>
                    <p style="font-size: 15px; color: #000000; margin: 0; font-weight: 600;">${data.name}</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-radius: 4px;">
                    <p style="font-size: 13px; color: #666666; margin: 0 0 5px; font-weight: 500;">Email</p>
                    <p style="font-size: 15px; color: #000000; margin: 0;">
                      <a href="mailto:${data.email}" style="color: #000000; text-decoration: none;">${data.email}</a>
                    </p>
                  </td>
                </tr>
                ${data.message ? `
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-radius: 4px;">
                    <p style="font-size: 13px; color: #666666; margin: 0 0 5px; font-weight: 500;">Message</p>
                    <p style="font-size: 15px; color: #000000; margin: 0; line-height: 1.5;">${data.message}</p>
                  </td>
                </tr>
                ` : ''}
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 12px; background-color: #f9f9f9; border-radius: 4px;">
                    <p style="font-size: 13px; color: #666666; margin: 0 0 5px; font-weight: 500;">Received</p>
                    <p style="font-size: 14px; color: #000000; margin: 0;">${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #f0f0f0; border-radius: 4px;">
                <p style="font-size: 12px; color: #666666; margin: 0;">
                  💡 Quick action: Reply to ${data.email} from Firebase Console → Firestore → ${data.type === 'newsletter' ? 'newsletter' : 'contacts'}
                </p>
              </div>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { name, email, message, type } = body;

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Heptact <onboarding@resend.dev>',
      to: email,
      subject: type === 'newsletter' ? 'Welcome to Heptact' : 'We received your message - Heptact',
      html: getEmailTemplate('user', { name, email, message, type }),
    });

    // Send notification to admin
    await resend.emails.send({
      from: 'Heptact Notifications <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'ishaangupta011205@gmail.com',
      subject: `[Heptact] New ${type === 'newsletter' ? 'Subscription' : 'Contact'}: ${name}`,
      html: getEmailTemplate('admin', { name, email, message, type }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Email error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
