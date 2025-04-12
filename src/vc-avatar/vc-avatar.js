/**
 * Material 2 Avatar Web Component
 * Inspired by Vuetify v3 Avatar Component
 */
class MaterialAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['size', 'color', 'text', 'image', 'icon', 'rounded', 'variant'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    get size() {
        const size = this.getAttribute('size') || 'medium';
        const sizeMap = {
            'x-small': '24px',
            'small': '36px',
            'medium': '48px',
            'large': '64px',
            'x-large': '84px'
        };

        return sizeMap[size] || (isNaN(parseInt(size)) ? '48px' : `${size}px`);
    }

    get color() {
        return this.getAttribute('color') || '#1976D2'; // Default blue color
    }

    get textColor() {
        return this.getAttribute('text-color') || '#FFFFFF';
    }

    get text() {
        return this.getAttribute('text') || '';
    }

    get image() {
        return this.getAttribute('image') || '';
    }

    get icon() {
        return this.getAttribute('icon') || '';
    }

    get rounded() {
        return this.hasAttribute('rounded');
    }

    get variant() {
        return this.getAttribute('variant') || 'flat';
    }

    createStyles() {
        const borderRadius = this.rounded ? '50%' : '4px';
        const backgroundColor = this.variant === 'flat' ? this.color : 'transparent';
        const border = this.variant === 'outlined' ? `2px solid ${this.color}` : 'none';

        return `
        :host {
          display: inline-block;
        }
        
        .vc-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${this.size};
          height: ${this.size};
          background-color: ${backgroundColor};
          color: ${this.textColor};
          border-radius: ${borderRadius};
          border: ${border};
          overflow: hidden;
          user-select: none;
          font-family: "Roboto", sans-serif;
          font-weight: 500;
          position: relative;
        }
        
        .vc-avatar-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .vc-avatar-text {
          font-size: calc(${this.size} * 0.4);
          text-transform: uppercase;
        }
        
        .vc-avatar-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .vc-avatar-icon {
          width: 60%;
          height: 60%;
          fill: currentColor;
        }
      `;
    }

    render() {
        const styles = this.createStyles();
        let content = '';

        // Priority: image > icon > text
        if (this.image) {
            content = `<img class="vc-avatar-image" src="${this.image}" alt="avatar">`;
        } else if (this.icon) {
            // Simple support for material icons
            content = `<span class="vc-avatar-icon material-icons">${this.icon}</span>`;
        } else if (this.text) {
            // If text is longer than 2 characters, use first 2 characters
            const displayText = this.text.length > 2 ? this.text.substring(0, 2) : this.text;
            content = `<span class="vc-avatar-text">${displayText}</span>`;
        }

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="vc-avatar">
          <div class="vc-avatar-content">
            ${content}
          </div>
        </div>
      `;
    }
}

// Define the custom element
customElements.define('vc-avatar', MaterialAvatar);

export default MaterialAvatar;