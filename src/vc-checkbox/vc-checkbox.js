/**
 * Material 2 Checkbox Web Component
 * A custom element that implements a Material Design 2 style checkbox
 */
class VcCheckbox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Initial state
    this._checked = false;
    this._disabled = false;
    this._indeterminate = false;
    this._value = '';
    this._label = '';

    // Render the initial component
    this.render();
  }

  static get observedAttributes() {
    return ['checked', 'disabled', 'indeterminate', 'value', 'label'];
  }

  // Lifecycle: When attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'checked':
        this._checked = newValue !== null;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'indeterminate':
        this._indeterminate = newValue !== null;
        break;
      case 'value':
        this._value = newValue || '';
        break;
      case 'label':
        this._label = newValue || '';
        break;
    }

    this.render();
  }

  // Lifecycle: When component is added to DOM
  connectedCallback() {
    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeydown);

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'checkbox');
    }

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    this.render();
  }

  // Lifecycle: When component is removed from DOM
  disconnectedCallback() {
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeydown);
  }

  // Event handlers
  _handleClick = (event) => {
    if (this._disabled) return;

    this.checked = !this._checked;
    this.indeterminate = false;

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { checked: this._checked }
    }));
  }

  _handleKeydown = (event) => {
    if (this._disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this._handleClick(event);
    }
  }

  // Getters and setters
  get checked() {
    return this._checked;
  }

  set checked(value) {
    const isChecked = Boolean(value);
    if (this._checked !== isChecked) {
      this._checked = isChecked;

      if (isChecked) {
        this.setAttribute('checked', '');
        this.setAttribute('aria-checked', 'true');
      } else {
        this.removeAttribute('checked');
        this.setAttribute('aria-checked', 'false');
      }

      this.render();
    }
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    const isDisabled = Boolean(value);
    if (this._disabled !== isDisabled) {
      this._disabled = isDisabled;

      if (isDisabled) {
        this.setAttribute('disabled', '');
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('disabled');
        this.setAttribute('aria-disabled', 'false');
      }

      this.render();
    }
  }

  get indeterminate() {
    return this._indeterminate;
  }

  set indeterminate(value) {
    const isIndeterminate = Boolean(value);
    if (this._indeterminate !== isIndeterminate) {
      this._indeterminate = isIndeterminate;

      if (isIndeterminate) {
        this.setAttribute('indeterminate', '');
        this.setAttribute('aria-checked', 'mixed');
      } else {
        this.removeAttribute('indeterminate');
        this.setAttribute('aria-checked', this._checked ? 'true' : 'false');
      }

      this.render();
    }
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this._value !== value) {
      this._value = value;
      this.setAttribute('value', value);
    }
  }

  get label() {
    return this._label;
  }

  set label(value) {
    if (this._label !== value) {
      this._label = value;
      this.setAttribute('label', value);
      this.render();
    }
  }

  // Render the component
  render() {
    // Define the styles
    const styles = `
      :host {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        outline: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        font-family: Roboto, Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.87);
      }
      
      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
      }
      
      .checkbox {
        position: relative;
        width: 18px;
        height: 18px;
        border: 2px solid rgba(0, 0, 0, 0.54);
        border-radius: 2px;
        margin-right: 10px;
        transition: all 0.15s ease;
        box-sizing: border-box;
      }
      
      :host(:hover) .checkbox {
        border-color: rgba(0, 0, 0, 0.87);
      }
      
      :host([checked]) .checkbox {
        background-color: #1976d2;
        border-color: #1976d2;
      }
      
      :host([indeterminate]) .checkbox {
        background-color: #1976d2;
        border-color: #1976d2;
      }
      
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        width: 18px;
        height: 18px;
        transform: scale(0);
        transition: transform 0.15s ease;
      }
      
      :host([checked]) .checkmark {
        transform: scale(1);
      }
      
      .checkmark-path {
        stroke: white;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
      }
      
      .indeterminate-mark {
        position: absolute;
        top: 50%;
        left: 3px;
        right: 3px;
        height: 2px;
        background-color: white;
        transform: scaleX(0);
        transition: transform 0.15s ease;
        margin-top: -1px;
      }
      
      :host([indeterminate]) .indeterminate-mark {
        transform: scaleX(1);
      }
      
      :host(:focus-visible) .focus-ring {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 50%;
        background-color: rgba(25, 118, 210, 0.12);
        pointer-events: none;
      }
      
      .ripple {
        position: absolute;
        top: -12px;
        left: -12px;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.1);
        transform: scale(0);
        opacity: 0;
        pointer-events: none;
      }
      
      .ripple.active {
        animation: ripple 0.3s ease-out;
      }
      
      @keyframes ripple {
        0% {
          transform: scale(0);
          opacity: 0.5;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }
      
      label {
        cursor: pointer;
        margin-left: 2px;
      }
      
      :host([disabled]) label {
        cursor: not-allowed;
      }
    `;

    // Create the template
    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="focus-ring"></div>
      <div class="ripple"></div>
      <div class="checkbox">
        <svg class="checkmark" viewBox="0 0 24 24">
          <path class="checkmark-path" d="M4.5 12.5l5 5 10-10"></path>
        </svg>
        <div class="indeterminate-mark"></div>
      </div>
      ${this._label ? `<label>${this._label}</label>` : ''}
    `;

    // Add ripple effect
    const ripple = this.shadowRoot.querySelector('.ripple');
    this.addEventListener('pointerdown', () => {
      if (this._disabled) return;
      ripple.classList.remove('active');
      setTimeout(() => ripple.classList.add('active'), 10);
    });
  }
}

// Register the custom element
customElements.define('vc-checkbox', VcCheckbox);

export default VcCheckbox;