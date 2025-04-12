class VcButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._disabled = false;
    this._variant = 'contained'; // contained, outlined, text
    this._color = 'primary'; // primary, secondary, default
    this._size = 'medium'; // small, medium, large

    this._render();
  }

  static get observedAttributes() {
    return ['disabled', 'variant', 'color', 'size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'variant':
        this._variant = newValue || 'contained';
        break;
      case 'color':
        this._color = newValue || 'primary';
        break;
      case 'size':
        this._size = newValue || 'medium';
        break;
    }

    this._render();
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get variant() {
    return this._variant;
  }

  set variant(value) {
    this.setAttribute('variant', value);
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this.setAttribute('color', value);
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  _getStyles() {
    return `
      :host {
        display: inline-block;
        font-family: Roboto, sans-serif;
      }
      
      .vc-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-width: 64px;
        border: none;
        outline: none;
        line-height: 1.75;
        border-radius: 4px;
        font-weight: 500;
        font-size: 0.875rem;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: none;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        user-select: none;
        -webkit-appearance: none;
        overflow: hidden;
      }
      
      .vc-btn::-moz-focus-inner {
        border-style: none;
      }
      
      .vc-btn:focus {
        outline: none;
      }
      
      .vc-btn-small {
        padding: 4px 10px;
        font-size: 0.8125rem;
      }
      
      .vc-btn-medium {
        padding: 6px 16px;
      }
      
      .vc-btn-large {
        padding: 8px 22px;
        font-size: 0.9375rem;
      }
      
      /* Contained button styles */
      .vc-btn-contained {
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
                    0px 2px 2px 0px rgba(0,0,0,0.14),
                    0px 1px 5px 0px rgba(0,0,0,0.12);
      }
      
      .vc-btn-contained:hover {
        box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
                    0px 4px 5px 0px rgba(0,0,0,0.14),
                    0px 1px 10px 0px rgba(0,0,0,0.12);
      }
      
      .vc-btn-contained.vc-btn-primary {
        background-color: #1976d2;
        color: #fff;
      }
      
      .vc-btn-contained.vc-btn-primary:hover {
        background-color: #1565c0;
      }
      
      .vc-btn-contained.vc-btn-secondary {
        background-color: #dc004e;
        color: #fff;
      }
      
      .vc-btn-contained.vc-btn-secondary:hover {
        background-color: #c51162;
      }
      
      .vc-btn-contained.vc-btn-default {
        background-color: #e0e0e0;
        color: rgba(0, 0, 0, 0.87);
      }
      
      .vc-btn-contained.vc-btn-default:hover {
        background-color: #d5d5d5;
      }
      
      /* Outlined button styles */
      .vc-btn-outlined {
        border: 1px solid currentColor;
        background-color: transparent;
      }
      
      .vc-btn-outlined.vc-btn-primary {
        color: #1976d2;
        border-color: rgba(25, 118, 210, 0.5);
      }
      
      .vc-btn-outlined.vc-btn-primary:hover {
        background-color: rgba(25, 118, 210, 0.04);
        border-color: #1976d2;
      }
      
      .vc-btn-outlined.vc-btn-secondary {
        color: #dc004e;
        border-color: rgba(220, 0, 78, 0.5);
      }
      
      .vc-btn-outlined.vc-btn-secondary:hover {
        background-color: rgba(220, 0, 78, 0.04);
        border-color: #dc004e;
      }
      
      .vc-btn-outlined.vc-btn-default {
        color: rgba(0, 0, 0, 0.87);
        border-color: rgba(0, 0, 0, 0.23);
      }
      
      .vc-btn-outlined.vc-btn-default:hover {
        background-color: rgba(0, 0, 0, 0.04);
        border-color: rgba(0, 0, 0, 0.23);
      }
      
      /* Text button styles */
      .vc-btn-text {
        background-color: transparent;
        padding: 6px 8px;
      }
      
      .vc-btn-text.vc-btn-primary {
        color: #1976d2;
      }
      
      .vc-btn-text.vc-btn-primary:hover {
        background-color: rgba(25, 118, 210, 0.04);
      }
      
      .vc-btn-text.vc-btn-secondary {
        color: #dc004e;
      }
      
      .vc-btn-text.vc-btn-secondary:hover {
        background-color: rgba(220, 0, 78, 0.04);
      }
      
      .vc-btn-text.vc-btn-default {
        color: rgba(0, 0, 0, 0.87);
      }
      
      .vc-btn-text.vc-btn-default:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
      
      /* Disabled styles */
      .vc-btn-disabled {
        color: rgba(0, 0, 0, 0.26) !important;
        box-shadow: none;
        cursor: default;
        pointer-events: none;
      }
      
      .vc-btn-contained.vc-btn-disabled {
        background-color: rgba(0, 0, 0, 0.12) !important;
        color: rgba(0, 0, 0, 0.26) !important;
      }
      
      .vc-btn-outlined.vc-btn-disabled,
      .vc-btn-text.vc-btn-disabled {
        border-color: rgba(0, 0, 0, 0.12) !important;
      }
      
      /* Ripple effect */
      .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      }
      
      .vc-btn-outlined .ripple,
      .vc-btn-text .ripple {
        background-color: rgba(0, 0, 0, 0.1);
      }
      
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
  }

  _handleClick(event) {
    if (this._disabled) return;

    // Create ripple effect
    const button = this.shadowRoot.querySelector('.vc-btn');
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    circle.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  _render() {
    const buttonClasses = [
      'vc-btn',
      `vc-btn-${this._variant}`,
      `vc-btn-${this._color}`,
      `vc-btn-${this._size}`,
      this._disabled ? 'vc-btn-disabled' : ''
    ].join(' ');

    this.shadowRoot.innerHTML = `
      <style>${this._getStyles()}</style>
      <button class="${buttonClasses}" ?disabled="${this._disabled}">
        <slot></slot>
      </button>
    `;

    this.shadowRoot.querySelector('button').addEventListener('click', this._handleClick.bind(this));
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button').removeEventListener('click', this._handleClick.bind(this));
  }
}

// Define the custom element
customElements.define('vc-btn', VcButton);

export default VcButton;