// vc-carousel.js - Material 2 Carousel Web Component
// Inspired by Vuetify v3 Carousel

class VcCarousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default configuration
        this._interval = 6000;
        this._continuous = true;
        this._showArrows = true;
        this._showDelimiters = true;
        this._currentIndex = 0;
        this._autoplay = false;
        this._timer = null;
        this._touch = {
            startX: 0,
            endX: 0,
        };

        // Initialize the component
        this._render();
        this._setupEventListeners();
    }

    static get observedAttributes() {
        return [
            'continuous',
            'interval',
            'show-arrows',
            'show-delimiters',
            'autoplay',
            'height'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'continuous':
                this._continuous = newValue !== 'false';
                break;
            case 'interval':
                this._interval = parseInt(newValue) || 6000;
                this._resetAutoplay();
                break;
            case 'show-arrows':
                this._showArrows = newValue !== 'false';
                this._updateControls();
                break;
            case 'show-delimiters':
                this._showDelimiters = newValue !== 'false';
                this._updateControls();
                break;
            case 'autoplay':
                this._autoplay = newValue !== 'false';
                this._resetAutoplay();
                break;
            case 'height':
                this.shadowRoot.querySelector('.carousel').style.height = newValue;
                break;
        }
    }

    connectedCallback() {
        // When the component is added to the DOM
        this._updateSlides();
        this._updateControls();
        this._resetAutoplay();

        // Process initial attributes
        if (this.hasAttribute('continuous')) {
            this._continuous = this.getAttribute('continuous') !== 'false';
        }

        if (this.hasAttribute('interval')) {
            this._interval = parseInt(this.getAttribute('interval')) || 6000;
        }

        if (this.hasAttribute('show-arrows')) {
            this._showArrows = this.getAttribute('show-arrows') !== 'false';
        }

        if (this.hasAttribute('show-delimiters')) {
            this._showDelimiters = this.getAttribute('show-delimiters') !== 'false';
        }

        if (this.hasAttribute('autoplay')) {
            this._autoplay = this.getAttribute('autoplay') !== 'false';
        }

        if (this.hasAttribute('height')) {
            this.shadowRoot.querySelector('.carousel').style.height = this.getAttribute('height');
        }
    }

    disconnectedCallback() {
        // When the component is removed from the DOM
        this._stopAutoplay();
        this._removeEventListeners();
    }

    _render() {
        // CSS styles for the component
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: block;
        }
        
        .carousel {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 400px;
          border-radius: 4px;
          background-color: #f5f5f5;
          box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        }
        
        .carousel__slides {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
          will-change: transform;
        }
        
        .carousel__slide {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 100%;
          height: 100%;
          width: 100%;
          position: relative;
          overflow: hidden;
          transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
        }
        
        .carousel__controls {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .carousel__arrow {
          color: #fff;
          background-color: rgba(0, 0, 0, 0.3);
          margin: 0 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.3s ease;
          box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        }
        
        .carousel__arrow:hover {
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .carousel__arrow--prev::after {
          content: '⟨';
          font-size: 20px;
        }
        
        .carousel__arrow--next::after {
          content: '⟩';
          font-size: 20px;
        }
        
        .carousel__delimiters {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .carousel__delimiter {
          width: 12px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .carousel__delimiter--active {
          background-color: #fff;
        }
      `;

        // HTML structure
        const carousel = document.createElement('div');
        carousel.className = 'carousel';

        const slides = document.createElement('div');
        slides.className = 'carousel__slides';

        const controls = document.createElement('div');
        controls.className = 'carousel__controls';

        const prevArrow = document.createElement('div');
        prevArrow.className = 'carousel__arrow carousel__arrow--prev';
        prevArrow.setAttribute('data-direction', 'prev');

        const nextArrow = document.createElement('div');
        nextArrow.className = 'carousel__arrow carousel__arrow--next';
        nextArrow.setAttribute('data-direction', 'next');

        controls.appendChild(prevArrow);
        controls.appendChild(nextArrow);

        const delimiters = document.createElement('div');
        delimiters.className = 'carousel__delimiters';

        carousel.appendChild(slides);
        carousel.appendChild(controls);
        carousel.appendChild(delimiters);

        // Append everything to the shadow root
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(carousel);
    }

    _setupEventListeners() {
        // Navigation arrows event listeners
        const prevArrow = this.shadowRoot.querySelector('.carousel__arrow--prev');
        const nextArrow = this.shadowRoot.querySelector('.carousel__arrow--next');

        prevArrow.addEventListener('click', () => this.prev());
        nextArrow.addEventListener('click', () => this.next());

        // Touch event listeners for swipe navigation
        const carousel = this.shadowRoot.querySelector('.carousel');

        carousel.addEventListener('touchstart', this._handleTouchStart.bind(this), { passive: true });
        carousel.addEventListener('touchend', this._handleTouchEnd.bind(this), { passive: true });

        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', () => {
            if (this._autoplay) {
                this._stopAutoplay();
            }
        });

        carousel.addEventListener('mouseleave', () => {
            if (this._autoplay) {
                this._startAutoplay();
            }
        });

        // Handle slot changes to re-render slides
        this.addEventListener('slotchange', () => {
            this._updateSlides();
            this._updateControls();
        });
    }

    _removeEventListeners() {
        const prevArrow = this.shadowRoot.querySelector('.carousel__arrow--prev');
        const nextArrow = this.shadowRoot.querySelector('.carousel__arrow--next');
        const carousel = this.shadowRoot.querySelector('.carousel');

        prevArrow.removeEventListener('click', () => this.prev());
        nextArrow.removeEventListener('click', () => this.next());

        carousel.removeEventListener('touchstart', this._handleTouchStart.bind(this));
        carousel.removeEventListener('touchend', this._handleTouchEnd.bind(this));

        carousel.removeEventListener('mouseenter', () => {
            if (this._autoplay) {
                this._stopAutoplay();
            }
        });

        carousel.removeEventListener('mouseleave', () => {
            if (this._autoplay) {
                this._startAutoplay();
            }
        });
    }

    _handleTouchStart(event) {
        this._touch.startX = event.touches[0].clientX;
    }

    _handleTouchEnd(event) {
        this._touch.endX = event.changedTouches[0].clientX;

        // Determine swipe direction
        const diff = this._touch.startX - this._touch.endX;

        if (diff > 50) {
            // Swipe left, go to next slide
            this.next();
        } else if (diff < -50) {
            // Swipe right, go to previous slide
            this.prev();
        }
    }

    _updateSlides() {
        // Get all child elements that are carousel items
        const slides = Array.from(this.children).filter(child =>
            child.nodeType === Node.ELEMENT_NODE
        );

        if (slides.length === 0) return;

        const slidesContainer = this.shadowRoot.querySelector('.carousel__slides');

        // Clear existing slides
        slidesContainer.innerHTML = '';

        // Add slides from light DOM to shadow DOM
        slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'carousel__slide';
            slideElement.setAttribute('data-index', index);

            // Create a slot for the content
            const slot = document.createElement('slot');
            slot.name = `slide-${index}`;
            slide.slot = `slide-${index}`;

            slideElement.appendChild(slot);
            slidesContainer.appendChild(slideElement);
        });

        // Set initial position
        this._goToSlide(this._currentIndex);
    }

    _updateControls() {
        // Update arrows visibility
        const arrows = this.shadowRoot.querySelectorAll('.carousel__arrow');
        arrows.forEach(arrow => {
            arrow.style.display = this._showArrows ? 'flex' : 'none';
        });

        // Update delimiters
        const slides = Array.from(this.children).filter(child =>
            child.nodeType === Node.ELEMENT_NODE
        );
        const delimitersContainer = this.shadowRoot.querySelector('.carousel__delimiters');

        // Clear existing delimiters
        delimitersContainer.innerHTML = '';

        if (this._showDelimiters) {
            slides.forEach((_, index) => {
                const delimiter = document.createElement('div');
                delimiter.className = 'carousel__delimiter';
                if (index === this._currentIndex) {
                    delimiter.classList.add('carousel__delimiter--active');
                }

                delimiter.setAttribute('data-index', index);
                delimiter.addEventListener('click', () => this._goToSlide(index));

                delimitersContainer.appendChild(delimiter);
            });

            delimitersContainer.style.display = 'flex';
        } else {
            delimitersContainer.style.display = 'none';
        }
    }

    _goToSlide(index) {
        const slides = Array.from(this.children).filter(child =>
            child.nodeType === Node.ELEMENT_NODE
        );

        if (slides.length === 0) return;

        // Handle continuous looping
        if (index < 0) {
            index = this._continuous ? slides.length - 1 : 0;
        } else if (index >= slides.length) {
            index = this._continuous ? 0 : slides.length - 1;
        }

        this._currentIndex = index;

        // Update slides position
        const slidesContainer = this.shadowRoot.querySelector('.carousel__slides');
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        // Update active delimiter
        const delimiters = this.shadowRoot.querySelectorAll('.carousel__delimiter');
        delimiters.forEach((delimiter, i) => {
            if (i === index) {
                delimiter.classList.add('carousel__delimiter--active');
            } else {
                delimiter.classList.remove('carousel__delimiter--active');
            }
        });

        // Dispatch change event
        this.dispatchEvent(new CustomEvent('change', {
            detail: { index: this._currentIndex }
        }));
    }

    _resetAutoplay() {
        this._stopAutoplay();
        if (this._autoplay) {
            this._startAutoplay();
        }
    }

    _startAutoplay() {
        this._timer = setInterval(() => {
            this.next();
        }, this._interval);
    }

    _stopAutoplay() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    // Public API methods

    /**
     * Go to the next slide
     */
    next() {
        this._goToSlide(this._currentIndex + 1);
    }

    /**
     * Go to the previous slide
     */
    prev() {
        this._goToSlide(this._currentIndex - 1);
    }

    /**
     * Go to a specific slide by index
     * @param {number} index - The slide index to navigate to
     */
    goTo(index) {
        this._goToSlide(index);
    }
}

// Register the custom element
customElements.define('vc-carousel', VcCarousel);

export default VcCarousel;