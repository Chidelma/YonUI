// material2-image.js - Material 2 Image web component inspired by Vuetify v3
class Material2Image extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default values
        this._src = '';
        this._alt = '';
        this._aspectRatio = null;
        this._cover = false;
        this._contain = false;
        this._eager = false;
        this._gradient = '';
        this._height = 'auto';
        this._width = '100%';
        this._rounded = false;
        this._isLoading = true;
        this._hasError = false;
    }

    static get observedAttributes() {
        return [
            'src',
            'alt',
            'aspect-ratio',
            'cover',
            'contain',
            'eager',
            'gradient',
            'height',
            'width',
            'rounded'
        ];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'src':
                this._src = newValue;
                break;
            case 'alt':
                this._alt = newValue;
                break;
            case 'aspect-ratio':
                this._aspectRatio = newValue;
                break;
            case 'cover':
                this._cover = newValue !== null;
                break;
            case 'contain':
                this._contain = newValue !== null;
                break;
            case 'eager':
                this._eager = newValue !== null;
                break;
            case 'gradient':
                this._gradient = newValue;
                break;
            case 'height':
                this._height = newValue;
                break;
            case 'width':
                this._width = newValue;
                break;
            case 'rounded':
                this._rounded = newValue !== null;
                break;
        }

        this.render();
    }

    _handleImageLoad() {
        this._isLoading = false;
        this._hasError = false;
        this.render();
        this.dispatchEvent(new CustomEvent('load', { bubbles: true }));
    }

    _handleImageError() {
        this._isLoading = false;
        this._hasError = true;
        this.render();
        this.dispatchEvent(new CustomEvent('error', { bubbles: true }));
    }

    render() {
        const objectFit = this._cover ? 'cover' : this._contain ? 'contain' : 'fill';
        const loading = this._eager ? 'eager' : 'lazy';

        // Create aspect ratio padding if needed
        let aspectRatioPadding = '';
        if (this._aspectRatio) {
            const [width, height] = this._aspectRatio.split('/').map(Number);
            if (!isNaN(width) && !isNaN(height) && height > 0) {
                const paddingPercent = (height / width) * 100;
                aspectRatioPadding = `padding-bottom: ${paddingPercent}%;`;
            }
        }

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            position: relative;
            overflow: hidden;
            width: ${this._width};
            height: ${this._aspectRatio ? '0' : this._height};
            ${aspectRatioPadding}
            ${this._rounded ? 'border-radius: 4px;' : ''}
          }
          
          .img-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          img {
            width: 100%;
            height: 100%;
            object-fit: ${objectFit};
            transition: opacity 0.3s ease;
            opacity: ${this._isLoading ? 0 : 1};
          }
          
          .placeholder {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f5f5f5;
            display: ${this._isLoading ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
          }
          
          .error {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fafafa;
            color: #f44336;
            display: ${this._hasError ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
          }
          
          .gradient {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this._gradient || 'none'};
            pointer-events: none;
            display: ${this._gradient ? 'block' : 'none'};
          }
          
          .content-slot {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          
          .content-slot ::slotted(*) {
            pointer-events: auto;
          }
          
          .loading-spinner {
            width: 30px;
            height: 30px;
            border: 3px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-top-color: #1976d2;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        </style>
        
        <div class="img-wrapper">
          <img 
            src="${this._src}"
            alt="${this._alt}"
            loading="${loading}"
            @load="${this._handleImageLoad.bind(this)}"
            @error="${this._handleImageError.bind(this)}"
          />
        </div>
        
        <div class="placeholder">
          <div class="loading-spinner"></div>
        </div>
        
        <div class="error">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        
        <div class="gradient"></div>
        
        <div class="content-slot">
          <slot></slot>
        </div>
      `;

        // Fix for @load and @error attributes - need to add event listeners manually
        const img = this.shadowRoot.querySelector('img');
        if (img) {
            img.removeEventListener('load', this._handleImageLoad.bind(this));
            img.removeEventListener('error', this._handleImageError.bind(this));
            img.addEventListener('load', this._handleImageLoad.bind(this));
            img.addEventListener('error', this._handleImageError.bind(this));
        }
    }
}

// Register the web component
customElements.define('vc-img', Material2Image);