document.addEventListener('DOMContentLoaded', function() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    const benefitImage = document.getElementById('benefit-image');
    const overlayTitle = document.getElementById('overlay-title');
    const overlayDescription = document.getElementById('overlay-description');
    const overlayBox = document.querySelector('.overlay-box');

    // Create overlay paragraph element
    let benefitOverlay = document.createElement('div');
    benefitOverlay.className = 'benefit-overlay-paragraph';
    benefitOverlay.style.display = 'none';
    benefitOverlay.innerHTML = '<span id="benefit-overlay-text"></span><button id="close-benefit-overlay" style="position:absolute;top:8px;right:16px;background:none;border:none;font-size:1.5rem;color:#888;cursor:pointer;">&times;</button>';

    if (overlayBox && !overlayBox.querySelector('.benefit-overlay-paragraph')) {
        overlayBox.appendChild(benefitOverlay);
    }

    // Benefit-specific overlay texts
    const overlayTexts = {
        'benefit-safety': 'Safety: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, vitae porta erat urna a velit.',
        'benefit-muscle-tone': 'Muscle Tone: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.',
        'benefit-weight-loss': 'Weight Loss: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Mauris euismod, sapien nec cursus cursus, enim urna.',
        'benefit-cardio': 'Cardio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac neque nec urna dictum facilisis. Integer euismod, urna eu.',
        'benefit-tracking': 'Tracking: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.'
    };

    benefitItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove highlight from all items
            benefitItems.forEach(li => li.classList.remove('highlight'));
            // Add highlight to clicked item
            this.classList.add('highlight');
            // Update image and overlay box content
            const newImageSrc = this.dataset.imageSrc;
            const newOverlayTitle = this.dataset.overlayTitle;
            const newOverlayDescription = this.dataset.overlayDescription;
            if (benefitImage) {
                benefitImage.src = newImageSrc;
            }
            if (overlayTitle) {
                overlayTitle.textContent = newOverlayTitle;
            }
            if (overlayDescription) {
                overlayDescription.textContent = newOverlayDescription;
            }
            // Show overlay paragraph with benefit-specific text
            const id = this.id;
            const text = overlayTexts[id] || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
            document.getElementById('benefit-overlay-text').textContent = text;
            benefitOverlay.style.display = 'block';
        });
    });

    // Dismiss overlay on close button click
    overlayBox.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'close-benefit-overlay') {
            benefitOverlay.style.display = 'none';
        }
    });

    // Set initial state for the "Weight Loss" item (as it was previously highlighted)
    const initialHighlightedItem = document.getElementById('benefit-weight-loss');
    if (initialHighlightedItem) {
        initialHighlightedItem.click(); // Simulate a click to set its initial state
        benefitOverlay.style.display = 'none'; // Hide overlay initially
    }
}); 