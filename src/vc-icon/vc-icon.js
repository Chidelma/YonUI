/**
 * Material 2 Icons Web Component
 * A web component inspired by Vuetify v3's icon implementation
 */
class VcIcon extends HTMLElement {
    // Define observed attributes
    static get observedAttributes() {
        return ['icon', 'size', 'color', 'density', 'left', 'right', 'disabled', 'start'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create styles
        this._createStyles();

        // Create icon container
        this._container = document.createElement('i');
        this._container.className = 'vc-icon';

        // Append to shadow DOM
        this.shadowRoot.appendChild(this._styles);
        this.shadowRoot.appendChild(this._container);
    }

    _createStyles() {
        this._styles = document.createElement('style');
        this._styles.textContent = `
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          vertical-align: middle;
          user-select: none;
        }
        
        :host([disabled]) {
          opacity: 0.6;
          pointer-events: none;
        }
        
        :host([left]) {
          margin-right: 8px;
        }
        
        :host([right]) {
          margin-left: 8px;
        }
        
        :host([start]) {
          margin-right: 16px;
        }
        
        .vc-icon {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        
        /* Density classes */
        :host([density="default"]) .vc-icon {
          font-size: 24px;
          height: 24px;
          width: 24px;
        }
        
        :host([density="comfortable"]) .vc-icon {
          font-size: 20px;
          height: 20px;
          width: 20px;
        }
        
        :host([density="compact"]) .vc-icon {
          font-size: 16px;
          height: 16px;
          width: 16px;
        }
      `;
    }

    // Lifecycle: When element is added to DOM
    connectedCallback() {
        // Set default values if none provided
        if (!this.hasAttribute('density')) {
            this.setAttribute('density', 'default');
        }

        this._updateIconContent();
    }

    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'icon':
                this._updateIconContent();
                break;
            case 'color':
                this._updateColor();
                break;
            case 'size':
                this._updateSize();
                break;
        }
    }

    // Update the icon content
    _updateIconContent() {
        const iconName = this.getAttribute('icon');
        if (iconName) {
            this._container.textContent = iconName;
        }
    }

    // Update color
    _updateColor() {
        const color = this.getAttribute('color');
        if (color) {
            this._container.style.color = color;
        } else {
            this._container.style.color = '';
        }
    }

    // Update size
    _updateSize() {
        const size = this.getAttribute('size');
        if (size) {
            const sizeValue = isNaN(size) ? size : `${size}px`;
            this._container.style.fontSize = sizeValue;
            this._container.style.height = sizeValue;
            this._container.style.width = sizeValue;
        } else {
            this._container.style.fontSize = '';
            this._container.style.height = '';
            this._container.style.width = '';
        }
    }
}

// Define the custom element
customElements.define('vc-icon', VcIcon);

export default VcIcon;