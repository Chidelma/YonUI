// vc-footer.js
// Material 2 Footer Web Component inspired by Vuetify v3

class VcFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default properties
        this._color = 'primary';
        this._dark = false;
        this._elevation = 4;
        this._app = false;
        this._absolute = false;
        this._padless = false;
        this._inset = false;
        this._height = 'auto';
        this._border = false;
    }

    static get observedAttributes() {
        return [
            'color',
            'dark',
            'elevation',
            'app',
            'absolute',
            'padless',
            'inset',
            'height',
            'border'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'color':
                this._color = newValue || 'primary';
                break;
            case 'dark':
                this._dark = newValue !== null;
                break;
            case 'elevation':
                this._elevation = newValue || 4;
                break;
            case 'app':
                this._app = newValue !== null;
                break;
            case 'absolute':
                this._absolute = newValue !== null;
                break;
            case 'padless':
                this._padless = newValue !== null;
                break;
            case 'inset':
                this._inset = newValue !== null;
                break;
            case 'height':
                this._height = newValue || 'auto';
                break;
            case 'border':
                this._border = newValue !== null;
                break;
        }
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const style = this._generateStyles();
        const content = `
        <style>
          ${style}
        </style>
        <footer class="vc-footer ${this._dark ? 'vc-footer--dark' : ''} ${this._app ? 'vc-footer--app' : ''} ${this._absolute ? 'vc-footer--absolute' : ''} ${this._padless ? 'vc-footer--padless' : ''} ${this._inset ? 'vc-footer--inset' : ''} ${this._border ? 'vc-footer--border' : ''}">
          <div class="vc-footer__content">
            <slot></slot>
          </div>
        </footer>
      `;

        this.shadowRoot.innerHTML = content;
    }

    _generateStyles() {
        const baseColor = this._getBaseColor();
        const elevation = this._getElevationClass(this._elevation);

        return `
        :host {
          display: block;
        }
        
        .vc-footer {
          display: flex;
          position: relative;
          align-items: center;
          background-color: ${baseColor};
          color: ${this._dark ? '#fff' : 'rgba(0, 0, 0, 0.87)'};
          min-height: 36px;
          padding: ${this._padless ? '0' : '8px 16px'};
          transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          ${elevation}
        }
        
        .vc-footer--dark {
          background-color: ${this._color === 'primary' ? '#272727' : baseColor};
          color: #fff;
        }
        
        .vc-footer--app {
          bottom: 0;
          left: 0;
          position: fixed;
          right: 0;
          z-index: 5;
        }
        
        .vc-footer--absolute {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
        
        .vc-footer--inset {
          margin-left: 72px;
          width: calc(100% - 72px);
        }
        
        .vc-footer--padless {
          padding: 0;
        }
        
        .vc-footer--border {
          border-top: 1px solid rgba(0, 0, 0, 0.12);
        }
        
        .vc-footer__content {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          justify-content: space-between;
          height: ${this._height};
          max-width: 100%;
          width: 100%;
        }
      `;
    }

    _getBaseColor() {
        const colorMap = {
            'primary': '#6200ee',
            'secondary': '#03dac6',
            'success': '#4caf50',
            'error': '#f44336',
            'info': '#2196f3',
            'warning': '#fb8c00',
        };

        if (this._color.startsWith('#') || this._color.startsWith('rgb')) {
            return this._color;
        }

        return colorMap[this._color] || colorMap.primary;
    }

    _getElevationClass(elevation) {
        const shadowMap = {
            0: 'none',
            1: '0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)',
            2: '0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)',
            3: '0 3px 3px -2px rgba(0,0,0,.2),0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12)',
            4: '0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)',
            6: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)',
            8: '0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)',
            12: '0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)',
            16: '0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12)',
            24: '0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)'
        };

        const shadowValue = shadowMap[elevation] || shadowMap[4];
        return `box-shadow: ${shadowValue};`;
    }
}

// Define the custom element
customElements.define('vc-footer', VcFooter);

export default VcFooter;