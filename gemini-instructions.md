# AI Coding Preferences for Al Rasid Trading

## Technical Stack
- **Backend**: Node.js with Express and Mongoose (CommonJS).
- **Frontend**: Vanilla JavaScript, HTML5, and CSS3 (Mainly single-file architecture in `index.html`).
- **Authentication**: JWT (JSON Web Tokens) and bcryptjs.

## Standards & Style
- **Architecture**: Keep backend logic modular; maintain the B2B corporate aesthetic (Deep Emerald Green: #0F4C3A, Metallic Gold: #D4AF37).
- **Naming**: Use descriptive variable and function names (e.g., `showProductModal` instead of `openM`).
- **Security**: Always verify `JWT_SECRET` presence, use `auth` middleware for protected routes, and never expose sensitive credentials.
- **Responsive Design**: Ensure all UI elements are mobile-friendly and respect the established CSS variables.