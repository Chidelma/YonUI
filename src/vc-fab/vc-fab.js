// vc-fab.js
// Material Design 2 Floating Action Button Web Component

class FloatingActionButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Default properties
    this._size = 'normal'; // normal or mini
    this._icon = 'add';
    this._extended = false;
    this._label = '';
    this._disabled = false;
    this._color = 'primary'; // primary, secondary or surface

    this.render();
  }

  static get observedAttributes() {
    return ['size', 'icon', 'extended', 'label', 'disabled', 'color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'size':
        this._size = newValue;
        break;
      case 'icon':
        this._icon = newValue;
        break;
      case 'extended':
        this._extended = newValue !== null;
        break;
      case 'label':
        this._label = newValue;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'color':
        this._color = newValue;
        break;
    }

    this.render();
  }

  get size() { return this._size; }
  set size(value) {
    if (value === this._size) return;
    if (value === 'normal' || value === 'mini') {
      this.setAttribute('size', value);
    } else {
      console.warn('Invalid size value. Use "normal" or "mini".');
    }
  }

  get icon() { return this._icon; }
  set icon(value) {
    if (value === this._icon) return;
    this.setAttribute('icon', value);
  }

  get extended() { return this._extended; }
  set extended(value) {
    if (Boolean(value) === this._extended) return;
    if (value) {
      this.setAttribute('extended', '');
    } else {
      this.removeAttribute('extended');
    }
  }

  get label() { return this._label; }
  set label(value) {
    if (value === this._label) return;
    this.setAttribute('label', value);
  }

  get disabled() { return this._disabled; }
  set disabled(value) {
    if (Boolean(value) === this._disabled) return;
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get color() { return this._color; }
  set color(value) {
    if (value === this._color) return;
    if (value === 'primary' || value === 'secondary' || value === 'surface') {
      this.setAttribute('color', value);
    } else {
      console.warn('Invalid color value. Use "primary", "secondary", or "surface".');
    }
  }

  connectedCallback() {
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  _handleClick = (event) => {
    if (this._disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Create and dispatch a custom event
    const customEvent = new CustomEvent('fab-click', {
      bubbles: true,
      composed: true,
      detail: { source: this }
    });

    this.dispatchEvent(customEvent);
  }

  _handleKeyDown = (event) => {
    if (this._disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  render() {
    const buttonClasses = [
      'fab',
      this._size === 'mini' ? 'fab--mini' : '',
      this._extended ? 'fab--extended' : '',
      this._disabled ? 'fab--disabled' : '',
      `fab--${this._color}`
    ].filter(Boolean).join(' ');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --md-fab-primary-color: #6200ee;
          --md-fab-primary-color-hover: #6f16ff;
          --md-fab-on-primary-color: #ffffff;
          --md-fab-secondary-color: #03dac6;
          --md-fab-secondary-color-hover: #02f2d6;
          --md-fab-on-secondary-color: #000000;
          --md-fab-surface-color: #ffffff;
          --md-fab-surface-color-hover: #f2f2f2;
          --md-fab-on-surface-color: #000000;
          --md-fab-disabled-color: #e0e0e0;
          --md-fab-on-disabled-color: #9e9e9e;
          --md-fab-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 
                            0 6px 10px 0 rgba(0, 0, 0, 0.14), 
                            0 1px 18px 0 rgba(0, 0, 0, 0.12);
          --md-fab-shadow-hover: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 
                                  0 8px 10px 1px rgba(0, 0, 0, 0.14), 
                                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
        }
        
        .fab {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          outline: none;
          border-radius: 28px;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          transition: box-shadow 0.2s ease, background-color 0.2s ease;
          box-shadow: var(--md-fab-shadow);
          height: 56px;
          width: 56px;
          padding: 0;
          position: relative;
          overflow: hidden;
        }
        
        .fab:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
        
        .fab:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: currentColor;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        
        .fab:hover:after {
          opacity: 0.08;
        }
        
        .fab:active:after {
          opacity: 0.12;
        }
        
        .fab--mini {
          height: 40px;
          width: 40px;
          border-radius: 20px;
        }
        
        .fab--extended {
          width: auto;
          min-width: 56px;
          padding: 0 20px;
          border-radius: 28px;
        }
        
        .fab--mini.fab--extended {
          height: 40px;
          min-width: 40px;
          padding: 0 16px;
        }
        
        .fab--primary {
          background-color: var(--md-fab-primary-color);
          color: var(--md-fab-on-primary-color);
        }
        
        .fab--primary:hover {
          background-color: var(--md-fab-primary-color-hover);
          box-shadow: var(--md-fab-shadow-hover);
        }
        
        .fab--secondary {
          background-color: var(--md-fab-secondary-color);
          color: var(--md-fab-on-secondary-color);
        }
        
        .fab--secondary:hover {
          background-color: var(--md-fab-secondary-color-hover);
          box-shadow: var(--md-fab-shadow-hover);
        }
        
        .fab--surface {
          background-color: var(--md-fab-surface-color);
          color: var(--md-fab-on-surface-color);
        }
        
        .fab--surface:hover {
          background-color: var(--md-fab-surface-color-hover);
          box-shadow: var(--md-fab-shadow-hover);
        }
        
        .fab--disabled {
          background-color: var(--md-fab-disabled-color);
          color: var(--md-fab-on-disabled-color);
          box-shadow: none;
          cursor: not-allowed;
          pointer-events: none;
        }
        
        .fab--disabled:hover:after,
        .fab--disabled:active:after {
          opacity: 0;
        }
        
        .fab__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        
        .fab--extended .fab__icon {
          margin-right: ${this._label ? '12px' : '0'};
        }
        
        .fab--mini .fab__icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
        
        .fab__label {
          font-family: Roboto, sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.1px;
          text-transform: uppercase;
          white-space: nowrap;
        }
      </style>
      <button class="${buttonClasses}" role="button" aria-disabled="${this._disabled}" tabindex="${this._disabled ? '-1' : '0'}">
        <span class="fab__icon">${this._icon}</span>
        ${this._extended && this._label ? `<span class="fab__label">${this._label}</span>` : ''}
      </button>
    `;
  }
}

// Register the custom element
customElements.define('vc-fab', FloatingActionButton);

export default FloatingActionButton;