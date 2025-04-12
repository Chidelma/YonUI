/**
 * Material 2 Navigation Drawer Web Component
 * 
 * A customizable navigation drawer component following Material Design 2 guidelines.
 * 
 * @class VcDrawer
 * @extends HTMLElement
 */
class VcDrawer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._open = false;
        this._permanent = false;
        this._position = 'left'; // left or right
        this._width = '256px';
        this._overlay = false;

        // Bind methods
        this._handleClickOutside = this._handleClickOutside.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    /**
     * Observed attributes for the component
     */
    static get observedAttributes() {
        return ['open', 'permanent', 'position', 'width', 'overlay'];
    }

    /**
     * Component connected callback
     */
    connectedCallback() {
        this._render();

        // Add event listeners
        if (!this._permanent) {
            document.addEventListener('click', this._handleClickOutside);
            document.addEventListener('keydown', this._handleKeyDown);
        }

        // Dispatch event when component is connected
        this.dispatchEvent(new CustomEvent('vc-drawer-connected', {
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Component disconnected callback
     */
    disconnectedCallback() {
        document.removeEventListener('click', this._handleClickOutside);
        document.removeEventListener('keydown', this._handleKeyDown);
    }

    /**
     * Handle attribute changes
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'open':
                this._open = newValue !== null;
                break;
            case 'permanent':
                this._permanent = newValue !== null;
                break;
            case 'position':
                if (newValue === 'left' || newValue === 'right') {
                    this._position = newValue;
                }
                break;
            case 'width':
                this._width = newValue;
                break;
            case 'overlay':
                this._overlay = newValue !== null;
                break;
        }

        this._render();
    }

    /**
     * Handle outside clicks to close drawer
     */
    _handleClickOutside(event) {
        if (!this._open || this._permanent) return;

        const path = event.composedPath();
        if (!path.includes(this.shadowRoot.querySelector('.drawer'))) {
            this.close();
        }
    }

    /**
     * Handle key down events (escape to close)
     */
    _handleKeyDown(event) {
        if (event.key === 'Escape' && this._open && !this._permanent) {
            this.close();
        }
    }

    /**
     * Open the drawer
     */
    open() {
        if (this._permanent) return;
        this._open = true;
        this.setAttribute('open', '');
        this._render();

        // Dispatch open event
        this.dispatchEvent(new CustomEvent('vc-drawer-opened', {
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Close the drawer
     */
    close() {
        if (this._permanent) return;
        this._open = false;
        this.removeAttribute('open');
        this._render();

        // Dispatch close event
        this.dispatchEvent(new CustomEvent('vc-drawer-closed', {
            bubbles: true,
            composed: true
        }));
    }

    /**
     * Toggle the drawer
     */
    toggle() {
        if (this._permanent) return;
        if (this._open) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Render the component
     */
    _render() {
        const drawerStyles = `
        :host {
          --drawer-width: ${this._width};
          --drawer-bg-color: #ffffff;
          --drawer-text-color: rgba(0, 0, 0, 0.87);
          --drawer-secondary-text-color: rgba(0, 0, 0, 0.54);
          --drawer-divider-color: rgba(0, 0, 0, 0.12);
          --drawer-hover-color: rgba(0, 0, 0, 0.04);
          --drawer-active-color: rgba(0, 0, 0, 0.08);
          --drawer-transition-duration: 0.3s;
          --drawer-elevation: 0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12);
          
          display: block;
          position: relative;
          height: 100%;
          z-index: 5;
        }
  
        .drawer-container {
          position: ${this._overlay ? 'fixed' : 'absolute'};
          top: 0;
          ${this._position}: 0;
          height: 100%;
          width: 100%;
          z-index: 6;
          pointer-events: ${this._open || this._permanent ? 'auto' : 'none'};
        }
  
        .drawer-scrim {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: ${this._open && !this._permanent ? '1' : '0'};
          transition: opacity var(--drawer-transition-duration) ease;
          pointer-events: ${this._open && !this._permanent ? 'auto' : 'none'};
        }
  
        .drawer {
          position: absolute;
          top: 0;
          ${this._position}: ${this._open || this._permanent ? '0' : '-' + this._width};
          width: var(--drawer-width);
          height: 100%;
          background-color: var(--drawer-bg-color);
          color: var(--drawer-text-color);
          box-shadow: ${this._permanent ? 'none' : 'var(--drawer-elevation)'};
          transition: ${this._position} var(--drawer-transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 7;
        }
  
        .drawer-header {
          min-height: 64px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-sizing: border-box;
        }
  
        .drawer-content {
          flex-grow: 1;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }
  
        .drawer-divider {
          height: 1px;
          background-color: var(--drawer-divider-color);
          margin: 8px 0;
        }
  
        /* Slotted elements styling */
        ::slotted(.drawer-title) {
          font-size: 20px;
          font-weight: 500;
          margin: 0;
          padding: 0;
        }
  
        ::slotted(.drawer-subtitle) {
          font-size: 14px;
          font-weight: 400;
          color: var(--drawer-secondary-text-color);
          margin: 4px 0 0 0;
          padding: 0;
        }
  
        ::slotted(.drawer-item) {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          color: var(--drawer-text-color);
          transition: background-color 0.2s ease;
        }
  
        ::slotted(.drawer-item:hover) {
          background-color: var(--drawer-hover-color);
        }
  
        ::slotted(.drawer-item.active) {
          background-color: var(--drawer-active-color);
        }
  
        ::slotted(.drawer-item-icon) {
          margin-right: 32px;
          color: var(--drawer-secondary-text-color);
        }
      `;

        this.shadowRoot.innerHTML = `
        <style>${drawerStyles}</style>
        <div class="drawer-container">
          <div class="drawer-scrim"></div>
          <div class="drawer">
            <div class="drawer-header">
              <slot name="header"></slot>
            </div>
            <div class="drawer-divider"></div>
            <div class="drawer-content">
              <slot></slot>
            </div>
            <div class="drawer-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      `;

        // Add click event for scrim
        const scrim = this.shadowRoot.querySelector('.drawer-scrim');
        scrim.addEventListener('click', () => {
            if (!this._permanent) {
                this.close();
            }
        });
    }
}

// Define the custom element
customElements.define('vc-drawer', VcDrawer);

export default VcDrawer;