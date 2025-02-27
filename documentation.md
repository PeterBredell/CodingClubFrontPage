# Eduvos Coding Club Website Documentation

## Project Structure
- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `scripts.js` - Interactive functionality
- `/images` - Website assets

## Key Components

### Homepage (Landing Page)
- Animated welcome text with staggered letter animations
- Pulsing Eduvos logo
- Glowing "ENTER" button
- Particle effect background

### Navigation
- Fixed home button that appears on scroll
- Smooth scrolling between sections
- Section anchors for direct linking

### Sections

#### About
- Club introduction
- Mission statement
- Features grid with hover effects
- What We Offer & Focus Areas lists

#### Learn & Grow
- Three-column card layout
- Interactive hover effects
- Circular images with overlay

#### Build Projects
- Project showcase cards
- GitHub links
- Project descriptions and thumbnails

#### Connect
- Carousel with team members
- LinkedIn integration
- Auto-scrolling functionality

### Interactive Elements

#### Glowing Button
```css
.glowing-btn {
    /* Glowing button effect with pulsing border */
    animation: border-flicker 2s linear infinite;
}
```

#### Particle System
```javascript
function createParticles() {
    // Creates floating background particles
    // Each particle has random size, position, and animation duration
}
```

#### Carousel
```javascript
function startCarouselAutoScroll() {
    // Auto-scrolling carousel with reversing direction
    // Manual control with radio buttons
    // Smooth transitions between slides
}
```

### Animations

#### Page Transitions
```javascript
function enterWebsite() {
    // Fade out homepage
    // Reveal main content
    // Smooth scroll to about section
}

function returnHome() {
    // Hide main content
    // Fade in homepage
    // Reset scroll position
}
```

#### Visual Effects
```css
/* Particle Animation */
@keyframes float {
    // Floating movement for background particles
}

/* Text Animation */
@keyframes fadeInUp {
    // Staggered text reveal animation
}

/* Button Effects */
@keyframes border-flicker {
    // Glowing border effect
}
```

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Breakpoint at 768px for tablet/mobile
- Scaled images and text
- Reorganized layouts for smaller screens

### Performance Optimizations
- Will-change hints for animations
- Document fragments for particle creation
- Debounced scroll handlers
- Cached DOM queries
- Optimized transitions

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers
- CSS variables for theming
- Flexbox/Grid layout system

### Known Issues & Solutions
1. Scroll jumping on navigation
   - Solution: scroll-margin-top adjustment

2. Animation performance on mobile
   - Solution: Reduced particle count
   - Hardware acceleration enabled

3. Button visibility on different backgrounds
   - Solution: Added contrasting glow effect

### Future Improvements
1. Add loading animations
2. Implement form submission
3. Add more interactive elements
4. Optimize image loading
5. Add more project examples

### Usage Instructions
1. Clone repository
2. Open index.html
3. No build process required
4. Images should be placed in /images directory

### Maintenance Notes
- Update LinkedIn links as needed
- Keep project examples current
- Check for broken image links
- Update member information as needed