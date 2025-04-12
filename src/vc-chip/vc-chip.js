/**
 * Material 2 Chip Web Component
 * A custom element that implements Material Design 2 Chips
 */
class VcChip extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._removable = false;
    this._disabled = false;
    this._color = '';
  }

  static get observedAttributes() {
    return ['removable', 'disabled', 'color', 'icon'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'removable':
        this._removable = newValue !== null;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'color':
        this._color = newValue;
        break;
      case 'icon':
        this._icon = newValue;
        break;
    }

    if (this.shadowRoot.querySelector('.chip')) {
      this.render();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const removeButton = this.shadowRoot.querySelector('.chip__remove');
    if (removeButton) {
      removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this._disabled) {
          this.dispatchEvent(new CustomEvent('remove', {
            bubbles: true,
            composed: true
          }));
        }
      });
    }

    const chip = this.shadowRoot.querySelector('.chip');
    chip.addEventListener('click', () => {
      if (!this._disabled) {
        this.dispatchEvent(new CustomEvent('click', {
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  render() {
    const chipClasses = [
      'chip',
      this._disabled ? 'chip--disabled' : '',
      this._color ? `chip--${this._color}` : ''
    ].filter(Boolean).join(' ');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          margin: 4px;
        }
        
        .chip {
          font-family: Roboto, 'Segoe UI', Arial, sans-serif;
          font-size: 14px;
          height: 32px;
          border-radius: 16px;
          background-color: #e0e0e0;
          color: rgba(0, 0, 0, 0.87);
          display: inline-flex;
          align-items: center;
          padding: 0 12px;
          cursor: pointer;
          outline: none;
          border: none;
          transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }
        
        .chip:hover {
          background-color: #d5d5d5;
        }
        
        .chip:focus {
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }
        
        .chip--disabled {
          opacity: 0.6;
          cursor: default;
          pointer-events: none;
        }
        
        .chip--primary {
          background-color: #1976d2;
          color: white;
        }
        
        .chip--primary:hover {
          background-color: #1565c0;
        }
        
        .chip--secondary {
          background-color: #9c27b0;
          color: white;
        }
        
        .chip--secondary:hover {
          background-color: #8e24aa;
        }
        
        .chip--success {
          background-color: #4caf50;
          color: white;
        }
        
        .chip--success:hover {
          background-color: #43a047;
        }
        
        .chip--warning {
          background-color: #ff9800;
          color: white;
        }
        
        .chip--warning:hover {
          background-color: #fb8c00;
        }
        
        .chip--error {
          background-color: #f44336;
          color: white;
        }
        
        .chip--error:hover {
          background-color: #e53935;
        }
        
        .chip__icon {
          margin-right: 8px;
          margin-left: -4px;
          font-size: 18px;
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .chip__remove {
          margin-right: -4px;
          margin-left: 8px;
          font-size: 18px;
          width: 18px;
          height: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .chip__remove:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .chip--primary .chip__remove:hover,
        .chip--secondary .chip__remove:hover,
        .chip--success .chip__remove:hover,
        .chip--warning .chip__remove:hover,
        .chip--error .chip__remove:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      </style>
      <div class="${chipClasses}">
        ${this._icon ? `<span class="chip__icon">${this._icon}</span>` : ''}
        <slot></slot>
        ${this._removable ? `<span class="chip__remove">✕</span>` : ''}
      </div>
    `;
  }
}

customElements.define('vc-chip', VcChip);

export default VcChip;