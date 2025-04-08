/**
 * Card interactions for the Learn & Grow section
 * Adds interactive behavior to the cards
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get all the interactive cards in the Learn & Grow section only
    const cards = document.querySelectorAll('#learnAndGrow .card-hover');

    // Add hover effects to the cards
    cards.forEach(card => {
        // Add hover effect to the card title
        const cardTitle = card.querySelector('.card-hover__title');
        if (cardTitle) {
            cardTitle.addEventListener('mouseenter', function() {
                this.classList.add('title-hover');
            });

            cardTitle.addEventListener('mouseleave', function() {
                this.classList.remove('title-hover');
            });
        }
    });

    // Add a subtle animation to the cards on page load to draw attention
    setTimeout(() => {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-attention');
                setTimeout(() => {
                    card.classList.remove('card-attention');
                }, 1000);
            }, index * 300); // Stagger the animations
        });
    }, 2000); // Wait for page to load
});
