# DPi Website

A modern, responsive website for DPi (Digital Product Innovation) built with HTML5, CSS3, and vanilla JavaScript.

## Features

- **Responsive Design**: Works on all device sizes from mobile to desktop
- **Modern UI/UX**: Clean, accessible, and user-friendly interface
- **Performance Optimized**: Fast loading and smooth animations
- **SEO Friendly**: Properly structured with semantic HTML and meta tags
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation

## Project Structure

```
dpi-website/
├── assets/
│   ├── fonts/          # Custom fonts
│   ├── icons/          # SVG icons and favicon
│   └── images/         # Image assets
├── components/         # Reusable UI components
├── js/                 # JavaScript files
│   └── main.js         # Main JavaScript file
├── pages/              # Individual page templates
├── styles/             # CSS styles
│   └── main.css        # Main stylesheet
└── index.html          # Homepage
```

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dpi-website.git
   cd dpi-website
   ```

2. Open `index.html` in your browser to view the website locally.

## Development

### CSS Architecture

The project follows the ITCSS (Inverted Triangle CSS) architecture:

1. **Settings**: Global variables, config switches, brand colors, etc.
2. **Tools**: Default mixins and functions
3. **Generic**: Ground-zero styles (resets, box-sizing, etc.)
4. **Elements**: Unclassed HTML elements (h1, a, etc.)
5. **Objects**: Class-based selectors for undecorated design patterns
6. **Components**: Specific UI components
7. **Utilities**: Overrides, helpers, and utility classes

### JavaScript

The JavaScript is organized into modules and follows modern ES6+ syntax. Main functionality includes:

- Mobile navigation toggle
- Smooth scrolling
- Dynamic copyright year
- Back to top button
- Form validation
- Lazy loading of images
- Scroll animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS 10+)
- Chrome for Android (latest)

## Performance

- Optimized images and assets
- Minified CSS and JavaScript in production
- Lazy loading for images and iframes
- Critical CSS inlined in the head
- Font display swap for faster text rendering

## Accessibility

- Semantic HTML5 elements
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Sufficient color contrast
- Skip to main content link
- Focus states for interactive elements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [AOS - Animate On Scroll](https://michalsnik.github.io/aos/)
