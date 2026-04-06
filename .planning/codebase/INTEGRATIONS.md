# External Integrations

## EmailJS — Lead Notification Emails

- **Library**: `@emailjs/browser` ^4.4.1
- **Config**: `src/services/emailNotificationService.js`
- **Usage**: Sends lead capture notification emails to `axelisoverseas@overseeducation.com` and `info@overseeducation.com`
- **Trigger**: After a lead form submission via `LeadCaptureModal.jsx`
- **Fallback**: Console logging if email fails; lead storage still succeeds

## Calendly — Appointment Booking

- **Service**: `src/services/calendlyService.js` (10KB)
- **Usage**: Scheduling consultations with counselors
- **Integration Type**: Embeddable widget / URL redirect

## WhatsApp — Chat Widget

- **Service**: `src/services/whatsappService.js` (8KB)
- **Components**: `WhatsAppWidget.jsx` (11.5KB), `WhatsAppTest.jsx` (5KB)
- **Usage**: Floating WhatsApp chat button for instant messaging
- **Test utility**: `src/utils/testWhatsApp.js`

## YouTube — Video Content

- **Services**:
  - `src/services/youtubeService.js` (5KB) — Standard YouTube embeds
  - `src/services/youtubeShortsService.js` (9.3KB) — YouTube Shorts integration
- **Components**: `YouTubeSection.jsx`, `YouTubeShorts.jsx` (22.8KB), `YouTubeThumbnail.jsx`
- **Usage**: Embedded study abroad guides, success stories, and shorts

## Instagram — Success Stories

- **Component**: `InstagramSuccessStories.jsx` (23.6KB)
- **Usage**: Displays Instagram reels/stories as social proof on homepage

## Razorpay — Payment Gateway

- **Component**: `RazorpayEmbed.jsx` (625B)
- **Usage**: Embedded payment form for charter program purchases
- **Status**: Minimal implementation (likely early stage)

## OTP Service

- **Service**: `src/services/otpService.js` (2KB)
- **Usage**: OTP verification for admin login or lead verification

## Mock Lead Management (No Real Backend)

- **Service**: `src/services/mockLeadService.js` (8KB)
- **Facade**: `src/services/leadService.js` (2.2KB) — wraps mock service
- **Storage**: Uses browser localStorage for lead data
- **Features**: Store leads, get leads, update status, analytics
- **Components**: `LeadDashboard.jsx`, `AdminDashboard.jsx`
- **Implication**: No persistent backend — all data is local to the browser

## External CDN Assets

- Grainy gradient noise texture from `grainy-gradients.vercel.app`
- Flag icons bundled in `public/flag-icons-main/`
