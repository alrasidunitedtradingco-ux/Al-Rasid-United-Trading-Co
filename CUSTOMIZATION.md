# Customization Guide - Change Colors, Name & More

## 1. Change Company Name

### Where to Find It
Open `index.html` in a text editor (Notepad, VS Code, etc.)

### Find & Replace These Lines:

#### In Header (appears in top-left):
**Find:**
```html
<span>Al Rasid Trading</span>
```
**Replace with:**
```html
<span>Your Company Name</span>
```

#### In Banner (main heading):
**Find:**
```html
<h1>Welcome to Al Rasid United Trading Co</h1>
```
**Replace with:**
```html
<h1>Welcome to Your Company Name</h1>
```

#### In Banner (subheading):
**Find:**
```html
<p>Premium Products | Fast Delivery | Best Prices</p>
```
**Replace with:**
```html
<p>Your tagline here | Fast Service | Great Quality</p>
```

---

## 2. Change Colors

### Theme Colors (New Method)
The store now uses **CSS Variables** located at the top of the `<style>` block in `index.html`. 
Instead of finding and replacing every hex code, simply update these variables:

```css
:root {
    --primary-color: #1a472a;   /* Change for Header/Admin */
    --primary-light: #2d5a3d;   /* Change for Header Gradient/Hover */
    --accent-color: #ff9900;    /* Change for Buttons/Search/Cart */
    --accent-hover: #e68a00;    /* Change for Button Hover */
    --price-color: #B12704;     /* Change for Prices */
}
```
#### Color Options:
- **Professional Blue**: `#003366`
- **Royal Purple**: `#663399`
- **Deep Red**: `#8B0000`
- **Navy Blue**: `#000080`
- **Dark Gray**: `#2c3e50`
- **Forest Green**: `#228B22`

**Where it appears:**
1. Header background
2. Logo background
3. Banner background
4. Admin panel background
5. Active category links

### Secondary/Accent Color (Orange)
**Current:** `#ff9900` (Orange)

**Find all instances of `#ff9900` and replace with your color:**

#### Color Options:
- **Bright Blue**: `#0066ff`
- **Electric Green**: `#00cc00`
- **Crimson Red**: `#dc143c`
- **Gold**: `#ffd700`
- **Lime Green**: `#32cd32`
- **Hot Pink**: `#ff1493`

**Where it appears:**
1. Search button
2. "Add to Cart" buttons
3. Hover effects
4. Price tags

### Price Tag Color (Red)
**Current:** `#B12704` (Amazon Red)

**Find & replace to match your theme:**

#### Options:
- Keep as is (professional e-commerce look)
- Use a brighter red: `#ff0000`
- Use a darker red: `#8B0000`

---

## 3. Easy Color Schemes (Pre-Made)

### Scheme 1: Premium Blue
```
Primary: #0047AB (Blue)
Accent: #FFD700 (Gold)
Price: #DC143C (Red)
```
Replace:
- `#1a472a` → `#0047AB`
- `#ff9900` → `#FFD700`
- `#B12704` → `#DC143C`

### Scheme 2: Modern Black & Neon
```
Primary: #1a1a1a (Black)
Accent: #00FF00 (Neon Green)
Price: #FF00FF (Magenta)
```
Replace:
- `#1a472a` → `#1a1a1a`
- `#ff9900` → `#00FF00`
- `#B12704` → `#FF00FF`

### Scheme 3: Luxury Purple
```
Primary: #2d1b69 (Deep Purple)
Accent: #FF6B9D (Pink)
Price: #FFD700 (Gold)
```
Replace:
- `#1a472a` → `#2d1b69`
- `#ff9900` → `#FF6B9D`
- `#B12704` → `#FFD700`

### Scheme 4: Corporate Red
```
Primary: #8B0000 (Dark Red)
Accent: #FF8C00 (Dark Orange)
Price: #000080 (Navy Blue)
```
Replace:
- `#1a472a` → `#8B0000`
- `#ff9900` → `#FF8C00`
- `#B12704` → `#000080`

---

## 4. How to Find & Replace in HTML

### Using Notepad (Windows):
1. Right-click `index.html`
2. Choose "Open with" → "Notepad"
3. Press `Ctrl + H` (Find & Replace)
4. Enter your search and replacement
5. Click "Replace All"
6. Save (Ctrl + S)

### Using VS Code (Better):
1. Right-click `index.html`
2. Choose "Open with" → "VS Code"
3. Press `Ctrl + H` (Find & Replace)
4. Enter search color code
5. Enter replacement color
6. Click "Replace All"
7. Save (Ctrl + S)

### Using Online Tool:
1. Open `index.html` in VS Code
2. Copy all content
3. Go to: https://www.textfixer.com/tools/find-and-replace.php
4. Paste content
5. Use find & replace
6. Copy result back

---

## 5. Change Logo/Icon

### Option 1: Use Emoji Instead
**Find:**
```html
<i class="fas fa-store"></i>
```
**Replace with:**
```html
📦
```
Other options: 🏪 🛒 💼 🏢 🎁

### Option 2: Use Custom Icon
Replace with an image:
```html
<img src="your-logo-url.png" alt="Logo" style="height: 30px; width: 30px; margin-right: 10px;">
```

---

## 6. Change Header Text

### Top Right Links
**Find:**
```html
<span>Admin</span>
<span>Account</span>
<span>Cart</span>
```
**Replace with custom text**

---

## 7. Change Footer Information

If you want to add footer info (currently not in template):

**Add this before closing `</body>` tag:**
```html
<footer style="background-color: #1a472a; color: white; padding: 30px; text-align: center; margin-top: 50px;">
    <p>&copy; 2024 Al Rasid Trading Co. All rights reserved.</p>
    <p>Email: contact@alrasid.com | Phone: +1-234-567-8900</p>
</footer>
```

---

## 8. Change Welcome Banner Text

**Find:**
```html
<div class="banner">
    <h1>Welcome to Al Rasid United Trading Co</h1>
    <p>Premium Products | Fast Delivery | Best Prices</p>
</div>
```

**Replace with:**
```html
<div class="banner">
    <h1>Your Company Name - Where Quality Meets Value</h1>
    <p>Discover Amazing Products | Same Day Delivery | Unbeatable Prices</p>
</div>
```

---

## 9. Full Color Change Example

### Before (Green & Orange):
```css
background-color: #1a472a;  /* Dark Green */
background-color: #ff9900;  /* Orange */
color: #B12704;             /* Red Price */
```

### After (Blue & Gold):
```css
background-color: #0047AB;  /* Blue */
background-color: #FFD700;  /* Gold */
color: #DC143C;             /* Red Price */
```

---

## 10. Testing Your Changes

1. **Save your changes** (Ctrl + S)
2. **Refresh browser** (F5 or Ctrl + R)
3. **Clear cache** if changes don't show:
   - Ctrl + Shift + Delete
   - Choose "All time"
   - Clear browsing data

---

## Troubleshooting

### Changes Not Showing?
- [ ] Saved the file?
- [ ] Refreshed the browser?
- [ ] Cleared browser cache?
- [ ] Using same color code format?

### Color Looks Different?
- Every monitor displays colors differently
- Try a different browser
- Adjust brightness/contrast on monitor

### Accidentally Broke Something?
1. Press Ctrl + Z (undo)
2. Or copy original file from GitHub
3. Or ask for help in comments

---

## Common Mistakes to Avoid

❌ **Don't do:**
- Change `#1a472a00` (too many digits)
- Use `color: green` (won't work, use `#008000`)
- Delete the `#` symbol
- Mix up similar colors like `#ff9900` and `#FF9900` (case doesn't matter but keep consistent)

✅ **Do:**
- Use exact 6-digit hex codes: `#000000`
- Keep the `#` symbol
- Test after each change
- Save before closing

---

## Pro Tips

1. **Color Picker Tool**: Use https://coolors.co/ to generate color schemes
2. **Hex Color Search**: Use https://www.colorhexa.com/ to find hex codes
3. **Preview Changes**: Make a backup before making major changes
4. **Test on Phone**: Check mobile view with colors you chose

---

## Quick Reference - All Color Codes in File

```
#1a472a    = Primary/Header (currently green)
#2d5a3d    = Hover effect for primary
#ff9900    = Accent/Buttons (currently orange)
#e68a00    = Hover effect for accent
#B12704    = Price tags (currently red)
#f8f9fa    = Light background
#ffffff    = White
#333333    = Dark text
#666666    = Medium text
#ddd        = Border color
```

---

**Start customizing and make it truly yours! 🎨**

Need help? Check the main README.md for more info.