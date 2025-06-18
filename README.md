# Harsh Kapadiya - Portfolio Website

A modern, responsive portfolio website showcasing my work as a web developer and designer. Built with vanilla HTML, CSS, and JavaScript featuring smooth animations and interactive elements.

## Features

- **Responsive Design** - Works perfectly on all devices
- **Smooth Animations** - Engaging scroll-triggered animations
- **Interactive Elements** - Hover effects, typing animation, floating icons
- **Contact Form** - Working contact form with validation
- **Project Showcase** - Detailed project modals with descriptions
- **Skills Timeline** - Interactive skills and education sections
- **Modern UI** - Clean, professional design with purple/gold color scheme

## Sections

1. **Hero Section** - Introduction with animated typing effect
2. **About** - Personal information with animated statistics
3. **Skills & Education** - Tabbed interface showing technical skills and academic background
4. **Projects** - Grid layout showcasing various projects
5. **Contact** - Contact form and social media links

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Inter, JetBrains Mono)

## Getting Started

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Open `portfolio.html` in your web browser

3. For local development, you can use a simple HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## Project Structure

```
portfolio/
├── main.html          # Main HTML file
├── main.css           # Stylesheet with all styles
├── main.js            # JavaScript functionality
└── README.md              # Project documentation
```

## Customization

### Colors
The color scheme is defined using CSS custom properties in `:root`:
- `--primary-color`: #A55B4B
- `--secondary-color`: #DCA06D
- `--accent-color`: #4F1C51
- `--dark-purple`: #210F37

### Content
- Update personal information in the HTML file
- Modify project details in the JavaScript `projects` object
- Replace social media links with your actual profiles

### Animations
Animation timing and effects can be customized in the CSS file:
- Scroll animations use Intersection Observer API
- Typing animation speed can be adjusted in JavaScript
- Hover effects and transitions use CSS custom properties

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Features

- Optimized animations with `requestAnimationFrame`
- Lazy loading for better performance
- Efficient event handling with debouncing
- Minimal external dependencies

## Contact

- **Email**: harsh.kapadiya@example.com
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]

## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Harsh Kapadiya