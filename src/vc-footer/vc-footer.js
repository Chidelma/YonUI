// vc-footer.js - Material 2 Footer Web Component
// Inspired by Vuetify v3 Footer

class VCFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['app', 'absolute', 'fixed', 'padless', 'color', 'elevation', 'height', 'theme'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    get app() {
        return this.hasAttribute('app');
    }

    get absolute() {
        return this.hasAttribute('absolute');
    }

    get fixed() {
        return this.hasAttribute('fixed');
    }

    get padless() {
        return this.hasAttribute('padless');
    }

    get color() {
        return this.getAttribute('color') || 'primary';
    }

    get elevation() {
        return this.getAttribute('elevation') || '0';
    }

    get height() {
        return this.getAttribute('height') || 'auto';
    }

    get theme() {
        return this.getAttribute('theme') || 'light';
    }

    getColorClass() {
        const colorMap = {
            'primary': '#1976D2',
            'secondary': '#424242',
            'accent': '#82B1FF',
            'error': '#FF5252',
            'info': '#2196F3',
            'success': '#4CAF50',
            'warning': '#FFC107',
        };

        return colorMap[this.color] || this.color;
    }

    getElevationClass() {
        const elevation = parseInt(this.elevation);
        if (isNaN(elevation) || elevation < 0 || elevation > 24) {
            return '0px 0px 0px rgba(0,0,0,0)';
        }

        // Generate box shadow based on elevation level
        const umbra = `0px ${elevation}px ${elevation}px 0px rgba(0,0,0,0.2)`;
        const penumbra = `0px ${elevation / 2}px ${elevation}px 0px rgba(0,0,0,0.14)`;
        const ambient = `0px ${elevation / 3}px ${elevation * 1.5}px 0px rgba(0,0,0,0.12)`;

        return `${umbra}, ${penumbra}, ${ambient}`;
    }

    render() {
        const backgroundColor = this.getColorClass();
        const boxShadow = this.getElevationClass();
        const themeTextColor = this.theme === 'dark' ? '#FFFFFF' : '#000000';
        const themeBgColor = this.theme === 'dark' ? '#212121' : '#FFFFFF';

        // Set the actual background color based on the color attribute or theme
        const actualBgColor = (this.color && this.color !== 'primary') ? backgroundColor : themeBgColor;

        // Base styles
        const baseCSS = `
        :host {
          display: block;
          box-sizing: border-box;
          flex: 0 1 auto;
          padding: ${this.padless ? '0' : '16px'};
          transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
  
        .vc-footer {
          width: 100%;
          background-color: ${actualBgColor};
          color: ${themeTextColor};
          box-shadow: ${boxShadow};
          box-sizing: border-box;
          outline: none;
          transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          height: ${this.height !== 'auto' ? `${this.height}px` : 'auto'};
          padding: ${this.padless ? '0' : '16px'};
          display: flex;
          flex-direction: column;
        }
  
        ${this.absolute ? `
        .vc-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1;
        }
        ` : ''}
  
        ${this.fixed ? `
        .vc-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 5;
        }
        ` : ''}
  
        ${this.app ? `
        .vc-footer {
          padding-left: var(--vc-app-bar-left-width, 0px);
          padding-right: var(--vc-app-bar-right-width, 0px);
        }
        ` : ''}
  
        ::slotted(*) {
          margin-bottom: 8px;
        }
  
        ::slotted(*:last-child) {
          margin-bottom: 0;
        }
      `;

        // Create the HTML structure
        this.shadowRoot.innerHTML = `
        <style>${baseCSS}</style>
        <footer class="vc-footer">
          <slot></slot>
        </footer>
      `;
    }
}

// Define the new custom element
customElements.define('vc-footer', VCFooter);

export default VCFooter;