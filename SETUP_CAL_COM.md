# Cal.com Integration Setup Guide

## What Was Added

1. **Video Showcase Component** - A new section that displays your introduction video
2. **Cal.com Booking Integration** - Easy scheduling directly in your contact section
3. **Toggle Between Booking & Contact Form** - Users can switch between scheduling a call or sending a message

## Files Modified

- `app/page.js` - Added VideoShowcase component to the page
- `src/components/contact.js` - Integrated cal.com with toggle functionality
- `src/components/video.js` - New component for video display

## Files Created

- `public/intro-video.mp4` - Your introduction video (7.4MB)
- `SETUP_CAL_COM.md` - This setup guide

## Cal.com Setup Instructions

### Step 1: Create a Cal.com Account
1. Go to [cal.com](https://cal.com)
2. Sign up for a free account
3. Complete your profile setup

### Step 2: Create a Calendar
1. In Cal.com dashboard, create a new calendar
2. Connect your Google Calendar, Outlook, or other calendar service
3. Set your availability and booking duration

### Step 3: Update Your Cal.com Username
The current setup uses `https://cal.com/danmwihoti` - you need to update this:

**Location 1**: `src/components/contact.js` (Line 41)
```javascript
href: 'https://cal.com/YOUR_USERNAME', // Change "danmwihoti" to your username
```

**Location 2**: `src/components/contact.js` (Line 210)
```javascript
src="https://cal.com/YOUR_USERNAME?embed=true&embedType=inline"
```

### Step 4: Test the Integration
1. Run `npm run dev`
2. Navigate to the Contact section
3. Click "Book a Call" tab
4. The cal.com booking widget should load
5. Try scheduling a test call

## Video Setup

Your video has been automatically placed at:
- `public/intro-video.mp4` (7.4MB)

The video is displayed in the "Let Me Show You What I Can Do" section between your Profile and About sections.

### To Change Video Location
If you want to reorder the sections in the portfolio, edit `app/page.js` and move the `<VideoShowcase />` component to a different position.

### To Replace the Video
Simply replace the file at `public/intro-video.mp4` with another video file (keep the same filename).

## Features

✅ **Video Showcase**
- Responsive video player with controls
- Beautiful card design with shadows
- Dark/light mode support
- Framer motion animations

✅ **Cal.com Integration**
- One-click scheduling
- No email form filling needed
- Syncs with your calendar automatically
- Professional appearance

✅ **Contact Options**
- Toggle between "Book a Call" (Cal.com) and "Send Message" (Email form)
- Users can choose their preferred method
- Contact links also updated with Calendar option

## Troubleshooting

### Cal.com Widget Not Loading
1. Check if your Cal.com username is correct
2. Ensure your Cal.com account is active
3. Check browser console for CORS errors
4. Try clearing browser cache

### Video Not Playing
1. Verify `public/intro-video.mp4` exists
2. Check browser console for 404 errors
3. Ensure video format is MP4 (H.264 codec recommended)

### Styling Issues
- The styling uses Tailwind CSS classes
- Ensure your Tailwind config is up to date
- Check that `glow-teal` and `card-glow` classes exist in your CSS

## Next Steps

1. Update your Cal.com username in two places (as mentioned above)
2. Test the video playback
3. Test the Cal.com booking widget
4. Deploy to production

## Contact Links Updated

Your contact section now includes:
- GitHub
- LinkedIn
- Email
- **Schedule Call** (Cal.com) - NEW!

All with beautiful icons and hover effects.
