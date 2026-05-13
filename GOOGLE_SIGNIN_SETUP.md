# 🚀 Google Sign-In Setup Guide

## Problem Fixed ✅
The sign-in now uses **real Google authentication** instead of fake email prompts!

## What Changed
- ✅ Added Firebase SDK
- ✅ Implemented Google OAuth sign-in
- ✅ Users stay signed in after page refresh
- ✅ Proper user data from Google account

## Setup Required (5 minutes)

### 1. Create Firebase Project
1. Go to https://firebase.google.com
2. Click "Get Started" → "Create a project"
3. Name: `al-rasid-trading`
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase console → "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Click "Google" → "Enable"
5. Add your domain: `localhost` (for testing)
6. Save

### 3. Get Firebase Config
1. Click gear icon → "Project settings"
2. Scroll to "Your apps" → "Web app"
3. Click "Add app" if needed
4. Copy the config object

### 4. Update index.html
1. Open `index.html`
2. Find the `firebaseConfig` object (around line 1008)
3. Replace the placeholder values with your real config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...", // Your real API key
    authDomain: "al-rasid-trading.firebaseapp.com",
    projectId: "al-rasid-trading",
    // ... etc
};
```

### 5. Test It!
1. Open `index.html` in browser
2. Click "Account" → "Sign in with Google"
3. Complete Google OAuth
4. You're signed in! 🎉

## Troubleshooting
- **"Sign-in failed"**: Check Firebase config is correct
- **"Invalid domain"**: Add your domain to Firebase authorized domains
- **Popup blocked**: Allow popups for the site

## Next Steps
- Add Firestore database for persistent orders
- Deploy to Netlify with Firebase
- Add more auth providers (Apple, Facebook)</content>
<parameter name="filePath">c:\Users\DELL\web test\al-rasid-trading\GOOGLE_SIGNIN_SETUP.md