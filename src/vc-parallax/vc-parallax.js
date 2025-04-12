/**
 * Material 2 Parallax Web Component
 * Inspired by Vuetify v3's v-parallax component
 */
class VcParallax extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default properties
        this._src = '';
        this._alt = '';
        this._height = 400;
        this._speed = 0.5;

        // Create the component structure
        this._render();
    }

    static get observedAttributes() {
        return ['src', 'alt', 'height', 'speed'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'src':
                this._src = newValue;
                if (this._imgElement) this._imgElement.src = newValue;
                break;
            case 'alt':
                this._alt = newValue;
                if (this._imgElement) this._imgElement.alt = newValue;
                break;
            case 'height':
                this._height = parseInt(newValue) || 400;
                this._updateStyles();
                break;
            case 'speed':
                this._speed = parseFloat(newValue) || 0.5;
                break;
        }

        this._render();
    }

    connectedCallback() {
        window.addEventListener('scroll', this._handleScroll.bind(this));
        window.addEventListener('resize', this._handleScroll.bind(this));

        // Initial positioning
        setTimeout(() => this._handleScroll(), 0);
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this._handleScroll.bind(this));
        window.removeEventListener('resize', this._handleScroll.bind(this));
    }

    _handleScroll() {
        if (!this._imgElement) return;

        const rect = this.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the parallax is visible
        if (rect.bottom < 0 || rect.top > windowHeight) return;

        // Calculate the translation based on scroll position
        const scrollPosition = window.pageYOffset;
        const offsetTop = rect.top + scrollPosition;
        const parallaxDist = scrollPosition - offsetTop;
        const translateY = Math.round(parallaxDist * this._speed);

        // Apply the transform
        this._imgElement.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }

    _updateStyles() {
        if (!this.shadowRoot) return;

        const containerStyle = `
        position: relative;
        overflow: hidden;
        height: ${this._height}px;
        width: 100%;
      `;

        const imgStyle = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        max-width: none;
        transform: translate3d(0, 0, 0);
        z-index: -1;
        object-fit: cover;
      `;

        const contentStyle = `
        position: relative;
        height: 100%;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `;

        this._styleElement.textContent = `
        :host {
          display: block;
          width: 100%;
        }
        .vc-parallax-container {
          ${containerStyle}
        }
        .vc-parallax-img {
          ${imgStyle}
        }
        .vc-parallax-content {
          ${contentStyle}
        }
      `;
    }

    _render() {
        if (!this.shadowRoot) return;

        // Create style element if it doesn't exist
        if (!this._styleElement) {
            this._styleElement = document.createElement('style');
            this.shadowRoot.appendChild(this._styleElement);
        }

        // Update styles
        this._updateStyles();

        // Create or update the main container
        if (!this._container) {
            this._container = document.createElement('div');
            this._container.classList.add('vc-parallax-container');
            this.shadowRoot.appendChild(this._container);

            // Create the image element
            this._imgElement = document.createElement('img');
            this._imgElement.classList.add('vc-parallax-img');
            this._container.appendChild(this._imgElement);

            // Create the content container
            this._content = document.createElement('div');
            this._content.classList.add('vc-parallax-content');
            this._container.appendChild(this._content);

            // Move slots into content
            const slot = document.createElement('slot');
            this._content.appendChild(slot);
        }

        // Update image properties
        if (this._imgElement) {
            this._imgElement.src = this._src;
            this._imgElement.alt = this._alt;
        }
    }
}

// Register the component
customElements.define('vc-parallax', VcParallax);

export default VcParallax;