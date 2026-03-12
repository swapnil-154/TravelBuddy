// Try to load Twilio SDK at module level
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    const twilio = require('twilio');
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  } catch (err) {
    console.log('[SMS Service] Twilio SDK not installed. SMS notifications disabled.');
  }
}

const sendBookingConfirmationSMS = async (booking, phoneNumber, userName) => {
  if (!phoneNumber) {
    console.log('[SMS Service] No phone number provided. Skipping SMS notification.');
    return { sent: false, reason: 'No phone number provided' };
  }

  const message = `Hi ${userName}! Your TravelBuddy booking is confirmed. Code: ${booking.confirmationCode}. Type: ${booking.type}. Total: $${booking.totalCost}. Thank you for choosing TravelBuddy!`;

  // Send via Twilio if configured
  if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const result = await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
      console.log(`[SMS Service] SMS sent to ${phoneNumber}: ${result.sid}`);
      return { sent: true, sid: result.sid };
    } catch (error) {
      console.error('[SMS Service] Failed to send SMS:', error.message);
      return { sent: false, reason: error.message };
    }
  }

  // Fallback: log the message
  console.log('[SMS Service] Twilio not configured. Skipping SMS notification.');
  console.log(`[SMS Service] Would send to ${phoneNumber}: ${message}`);
  return { sent: false, reason: 'SMS service not configured' };
};

module.exports = { sendBookingConfirmationSMS };
