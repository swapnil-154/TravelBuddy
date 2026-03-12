const nodemailer = require('nodemailer');

const createTransporter = () => {
  // Use environment variables for email configuration
  // Falls back to a test/ethereal configuration if not set
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
  return null;
};

const sendBookingConfirmationEmail = async (booking, userEmail, userName) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.log('[Email Service] Email not configured. Skipping email notification.');
    console.log(`[Email Service] Would send booking confirmation to: ${userEmail}`);
    console.log(`[Email Service] Booking Code: ${booking.confirmationCode}`);
    return { sent: false, reason: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"TravelBuddy" <noreply@travelbuddy.com>',
      to: userEmail,
      subject: `Booking Confirmation - ${booking.confirmationCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">✈️ TravelBuddy</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 5px;">Booking Confirmation</p>
          </div>
          <div style="padding: 30px; background: #f8f9fa; border: 1px solid #e9ecef;">
            <h2 style="color: #333;">Hello ${userName}!</h2>
            <p style="color: #666;">Your booking has been confirmed successfully.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
              <p><strong>Confirmation Code:</strong> <span style="color: #667eea; font-size: 18px;">${booking.confirmationCode}</span></p>
              <p><strong>Booking Type:</strong> ${booking.type}</p>
              <p><strong>Total Cost:</strong> $${booking.totalCost} ${booking.currency}</p>
              <p><strong>Status:</strong> ${booking.status}</p>
              <p><strong>Payment Status:</strong> ${booking.paymentStatus}</p>
              <p><strong>Booking Date:</strong> ${new Date(booking.bookingDate).toLocaleDateString()}</p>
            </div>
            <p style="color: #666;">Thank you for choosing TravelBuddy! We hope you have an amazing trip.</p>
          </div>
          <div style="padding: 15px; text-align: center; background: #333; border-radius: 0 0 10px 10px;">
            <p style="color: #999; margin: 0; font-size: 12px;">© ${new Date().getFullYear()} TravelBuddy. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Service] Booking confirmation sent to ${userEmail}: ${info.messageId}`);
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Service] Failed to send email:', error.message);
    return { sent: false, reason: error.message };
  }
};

module.exports = { sendBookingConfirmationEmail };
