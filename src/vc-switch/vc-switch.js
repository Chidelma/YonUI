// vc-switch.js
// Material 2 Switch Web Component

class VcSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Default state
    this._checked = false;
    this._disabled = false;
    this._label = '';

    // Render initial state
    this.render();
  }

  static get observedAttributes() {
    return ['checked', 'disabled', 'label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'checked':
        this._checked = newValue !== null;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'label':
        this._label = newValue || '';
        break;
    }

    this.render();
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this._checked = Boolean(value);
    if (this._checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    this.render();
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    this._disabled = Boolean(value);
    if (this._disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
    this.render();
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this._label = String(value);
    this.setAttribute('label', this._label);
    this.render();
  }

  connectedCallback() {
    // Get initial attribute values
    this._checked = this.hasAttribute('checked');
    this._disabled = this.hasAttribute('disabled');
    this._label = this.getAttribute('label') || '';

    // Add event listener when component is connected to DOM
    this.shadowRoot.querySelector('.switch-container')?.addEventListener('click', this._handleClick.bind(this));

    // Render with attributes
    this.render();
  }

  disconnectedCallback() {
    // Clean up event listeners when component is removed from DOM
    this.shadowRoot.querySelector('.switch-container')?.removeEventListener('click', this._handleClick.bind(this));
  }

  _handleClick(event) {
    if (this._disabled) return;

    this.checked = !this._checked;

    // Dispatch change event
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { checked: this._checked }
    });

    this.dispatchEvent(changeEvent);
  }

  render() {
    const checkedClass = this._checked ? 'checked' : '';
    const disabledClass = this._disabled ? 'disabled' : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: Roboto, Arial, sans-serif;
        }
        
        .switch-container {
          display: flex;
          align-items: center;
          cursor: ${this._disabled ? 'not-allowed' : 'pointer'};
          user-select: none;
        }
        
        .switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 14px;
          margin-right: 8px;
        }
        
        .track {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.38);
          border-radius: 7px;
          transition: background-color 0.3s;
        }
        
        .thumb {
          position: absolute;
          top: -3px;
          left: 0;
          width: 20px;
          height: 20px;
          background-color: #FAFAFA;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
          transition: all 0.3s;
        }
        
        .switch.checked .track {
          background-color: rgba(33, 150, 243, 0.5);
        }
        
        .switch.checked .thumb {
          background-color: #2196F3;
          transform: translateX(16px);
        }
        
        .switch.disabled .track {
          background-color: rgba(0, 0, 0, 0.12);
        }
        
        .switch.disabled .thumb {
          background-color: #BDBDBD;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }
        
        .switch.checked.disabled .track {
          background-color: rgba(33, 150, 243, 0.2);
        }
        
        .switch.checked.disabled .thumb {
          background-color: #BBDEFB;
        }
        
        /* Ripple effect */
        .thumb::after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background-color: rgba(33, 150, 243, 0.12);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0);
          transition: all 0.3s;
        }
        
        .switch:not(.disabled):active .thumb::after {
          opacity: 1;
          transform: scale(1);
        }
        
        .label {
          color: ${this._disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.87)'};
        }
      </style>
      
      <div class="switch-container">
        <div class="switch ${checkedClass} ${disabledClass}">
          <div class="track"></div>
          <div class="thumb"></div>
        </div>
        ${this._label ? `<span class="label">${this._label}</span>` : ''}
      </div>
    `;

    // Re-add event listener after rendering
    this.shadowRoot.querySelector('.switch-container')?.addEventListener('click', this._handleClick.bind(this));
  }
}

// Register the custom element
customElements.define('vc-switch', VcSwitch);

export default VcSwitch;