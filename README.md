# Portfolio Website

A modern, responsive portfolio website for Python Full Stack Web Developer - Bharti Thapa.

## Features

- 🎨 Modern, sleek design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and lightweight
- 🎯 Smooth scrolling navigation
- 💫 Interactive elements and hover effects
- 🌈 Beautiful gradient backgrounds
- 📧 Contact form (ready for backend integration)

## Sections

1. **Hero Section** - Introduction with animated profile image
2. **About** - Personal information and statistics
3. **Skills** - Technical skills and technologies
4. **Projects** - Showcase of featured projects including:
   - Job Portal (Featured)
   - Learning Management System (Featured)
   - Student Attendance System
   - CursorOAuth
   - Jaarvis Voice Assistant
   - Hotel Invoice Generator
   - Weather App
   - QR Code Generator
   - Modern Calculator
5. **Contact** - Contact form and social links

## Setup Instructions

1. **Add Your Profile Image (Avatar)**
   - Place your 3D avatar image in the root directory
   - Name it `avatar.png` (or `avatar.jpg`)
   - Recommended size: 400x400px or larger (square format works best)
   - The image should have a transparent or solid background
   - Your beautiful 3D character image will appear in the hero and about sections

2. **Add Project Images** (Highly Recommended!)
   - Create a `projects` folder in the root directory
   - Add screenshots of your projects (see `PROJECT_IMAGES_GUIDE.md` for details)
   - Images will automatically display when added
   - If images are missing, beautiful icon placeholders will show

3. **Customize Content**
   - Update email address in the contact section
   - Add your LinkedIn and Twitter URLs if available
   - Update project links with your actual GitHub repository URLs and live demo links
   - Modify any text content to match your preferences

4. **Open the Website**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- JavaScript (Vanilla JS)
- Font Awesome Icons
- Google Fonts (Poppins)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors
Edit the CSS variables in `styles.css` (lines 3-18) to change the color scheme:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Fonts
The website uses Poppins font from Google Fonts. You can change it in `index.html` (line 9).

### Animations
All animations are defined in `styles.css`. You can adjust timing, delays, and effects as needed.

## Future Enhancements

- Backend integration for contact form
- Blog section
- Dark/Light theme toggle
- Multi-language support
- Project filtering/search functionality

## License

This portfolio template is free to use and modify for personal and commercial projects.

## Contact

For questions or suggestions, feel free to reach out!

---

## Quick Start

1. Add your `avatar.png` file to the root directory
2. (Optional) Create a `projects` folder and add project screenshots
3. Open `index.html` in your browser or use a local server
4. Customize contact information and social links

**Note**: The portfolio is designed to work perfectly even without images - it will show beautiful placeholders until you add them!

