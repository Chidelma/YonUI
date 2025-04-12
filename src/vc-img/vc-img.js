// material-2-image.js
// A custom web component inspired by Vuetify's v-img

class Image extends HTMLElement {
    // Define observed attributes
    static get observedAttributes() {
        return [
            'src',
            'alt',
            'width',
            'height',
            'aspect-ratio',
            'cover',
            'contain',
            'lazy-load',
            'transition',
            'gradient'
        ];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._loaded = false;
        this._error = false;

        // Create internal elements
        this._container = document.createElement('div');
        this._container.className = 'vc-img-container';

        this._placeholder = document.createElement('div');
        this._placeholder.className = 'vc-img-placeholder';

        this._image = document.createElement('img');
        this._image.className = 'vc-img-image';

        this._gradient = document.createElement('div');
        this._gradient.className = 'vc-img-gradient';

        this._overlay = document.createElement('div');
        this._overlay.className = 'vc-img-overlay';

        // Setup event listeners
        this._image.addEventListener('load', this._onLoad.bind(this));
        this._image.addEventListener('error', this._onError.bind(this));

        // Append internal elements to shadow DOM
        this._container.appendChild(this._placeholder);
        this._container.appendChild(this._image);
        this._container.appendChild(this._gradient);
        this._container.appendChild(this._overlay);

        // Set up slot for content
        const slot = document.createElement('slot');
        this._overlay.appendChild(slot);

        // Apply base styles
        this._applyStyles();
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this._container);
        this._updateComponent();
        this._setupIntersectionObserver();
    }

    _applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: inline-block;
          position: relative;
          line-height: 0;
          overflow: hidden;
        }
        
        .vc-img-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: inherit;
        }
        
        .vc-img-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.1);
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        
        .vc-img-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          object-position: center;
        }
        
        .vc-img-image.loaded {
          opacity: 1;
        }
        
        .vc-img-placeholder.hidden {
          opacity: 0;
        }
        
        .vc-img-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
        }
        
        .vc-img-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `;
        this.shadowRoot.appendChild(style);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        this._updateComponent();
    }

    _updateComponent() {
        // Update image source
        const src = this.getAttribute('src');
        if (src && !this.getAttribute('lazy-load')) {
            this._image.src = src;
        }

        // Update image alt text
        const alt = this.getAttribute('alt');
        if (alt) {
            this._image.alt = alt;
        }

        // Update width and height
        const width = this.getAttribute('width');
        const height = this.getAttribute('height');

        if (width) {
            this.style.width = this._addUnitIfNeeded(width);
        }

        if (height) {
            this.style.height = this._addUnitIfNeeded(height);
        }

        // Handle aspect-ratio
        const aspectRatio = this.getAttribute('aspect-ratio');
        if (aspectRatio && !height) {
            const [w, h] = aspectRatio.split(':').map(v => parseFloat(v));
            if (!isNaN(w) && !isNaN(h) && h > 0) {
                this.style.paddingBottom = `${(h / w * 100)}%`;
                this.style.height = '0';
            }
        }

        // Handle cover and contain
        if (this.hasAttribute('cover')) {
            this._image.style.objectFit = 'cover';
        } else if (this.hasAttribute('contain')) {
            this._image.style.objectFit = 'contain';
        }

        // Handle transition
        const transition = this.getAttribute('transition');
        if (transition) {
            this._image.style.transition = `opacity ${transition}`;
            this._placeholder.style.transition = `opacity ${transition}`;
        }

        // Handle gradient
        const gradient = this.getAttribute('gradient');
        if (gradient) {
            this._gradient.style.background = gradient;
        } else {
            this._gradient.style.background = 'none';
        }
    }

    _addUnitIfNeeded(value) {
        return /^\d+$/.test(value) ? `${value}px` : value;
    }

    _onLoad() {
        this._loaded = true;
        this._error = false;
        this._image.classList.add('loaded');
        this._placeholder.classList.add('hidden');

        // Dispatch load event
        this.dispatchEvent(new CustomEvent('vc-img:load', {
            bubbles: true,
            composed: true
        }));
    }

    _onError() {
        this._loaded = false;
        this._error = true;

        // Dispatch error event
        this.dispatchEvent(new CustomEvent('vc-img:error', {
            bubbles: true,
            composed: true
        }));
    }

    _setupIntersectionObserver() {
        if (this.hasAttribute('lazy-load') && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const src = this.getAttribute('src');
                        if (src && !this._image.src) {
                            this._image.src = src;
                        }
                        observer.unobserve(this);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            observer.observe(this);
        }
    }

    // Public methods
    getSrc() {
        return this._image.src;
    }

    isLoaded() {
        return this._loaded;
    }

    hasError() {
        return this._error;
    }
}

// Define the custom element
customElements.define('vc-img', Image);

export default Image;