# Eduvos Coding Club Website Documentation

## File Structure
- `index.html` - Main HTML file containing website structure
- `styles.css` - Stylesheet for all components and animations
- `scripts.js` - JavaScript functionality and interactions
- `lightmode.js` - Theme switching functionality
- `modals.html` - Modal templates for detailed content views

## Core Features

### Theme System
```javascript
// Theme switching functionality
const enableLightMode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightmode', 'active');
};
```
- Light/Dark mode toggle
- Theme persistence using localStorage
- Dynamic color variable switching

### Modal System
```javascript
// Modal initialization and handlers
function setupModals() {
    // Maps titles to modal IDs
    const modals = {
        'Our Mission': 'mission-modal',
        'Our Activities': 'activities-modal',
        'Our Club': 'club-modal'
    };
}
```
- Click-to-open detailed content views
- Multiple close options (button, outside click, ESC key)
- Smooth animations
- Scroll locking when modal is open

### Carousel Implementation
```javascript
function startCarouselAutoScroll() {
    // Auto-scrolling with touch support
    // Direction reversal at ends
    // Manual control via radio buttons
}
```
- Touch-enabled swipe functionality
- Auto-scrolling with direction reversal
- Manual controls
- Responsive design

### Particle System
```javascript
function createParticles() {
    // Creates background particles
    // Random size, position, and animation
}
```
- Dynamic particle generation
- Random movement patterns
- Performance optimized

## CSS Components

### Buttons
- `.glowing-btn` - Animated button with glow effect
- `.custom-button` - LinkedIn profile buttons
- `.fixed-home-btn` - Fixed position navigation button

### Cards
- `.card-hover` - Interactive card components
- `.activity-section` - Activity display cards
- `.project-card` - Project showcase cards

### Animations
```css
@keyframes fadeInUp { /* Entry animations */ }
@keyframes float { /* Particle movement */ }
@keyframes modalSlideIn { /* Modal entry */ }
@keyframes pulse { /* Logo pulsing */ }
```

## JavaScript Functions

### Navigation
```javascript
function enterWebsite() {
    // Handles main page entry animation
    // Initializes main content
}

function returnHome() {
    // Returns to landing page
    // Resets scroll state
}
```

### Observer Pattern
```javascript
const observer = new IntersectionObserver((entries) => {
    // Handles section visibility
    // Triggers animations
});
```

## Responsive Design

### Breakpoints
- 768px - Tablet/Mobile transition
- 480px - Small mobile adjustments

### Mobile Optimizations
```css
@media (max-width: 768px) {
    /* Adjusted layouts */
    /* Touch-optimized interactions */
    /* Simplified animations */
}
```

## Event Handlers

### Touch Events
```javascript
carousel.addEventListener('touchstart', (e) => {
    // Swipe detection
    // Gesture handling
});
```

### Scroll Management
```javascript
window.addEventListener('scroll', function() {
    // Navigation visibility
    // Scroll position management
});
```

## Performance Considerations

### Optimization Techniques
- Will-change hints for animations
- Touch-action properties for mobile
- Debounced scroll handlers
- Cached DOM queries
- Hardware acceleration where needed
- Image optimization

### Resource Loading
- Deferred scripts
- Preconnect for external resources
- Lazy loading for images
- Minified assets

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive enhancement
- Fallback behaviors

## Maintenance Guide

### Adding New Content
1. Modal content in `modals.html`
2. Styling in `styles.css`
3. Behavior in `scripts.js`

### Theme Updates
1. Add colors to `:root`
2. Add `.lightmode` variations
3. Test in both modes

### Component Updates
1. Match existing patterns
2. Follow naming conventions
3. Test responsive behavior
4. Verify animations

## Known Issues & Solutions

### Scroll Handling
- Issue: Scroll jumps during navigation
- Solution: Smooth scroll behavior and position management

### Mobile Performance
- Issue: Heavy animations on mobile
- Solution: Reduced particle count, simplified animations

### Touch Interactions
- Issue: Gesture conflicts
- Solution: Proper touch-action properties, prevented defaults

## Future Enhancements
1. Form submission functionality
2. More interactive elements
3. Enhanced accessibility
4. Additional project examples
5. Performance monitoring
6. Analytics integration

## Security Considerations
1. Content Security Policy
2. Input sanitization
3. Cross-Origin Resource Sharing
4. Secure storage practices
