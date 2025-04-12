/**
 * Material 2 OTP Input - Web Component
 * Inspired by Vuetify v3's OTP Input
 */

class MaterialOtpInput extends HTMLElement {
    static get observedAttributes() {
      return ['length', 'value', 'autofocus', 'placeholder', 'disabled', 'type', 'loading'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      
      // Default values
      this._length = 6;
      this._value = '';
      this._autofocus = false;
      this._placeholder = '•';
      this._disabled = false;
      this._type = 'text'; // text or password
      this._loading = false;
      
      // Setup the component
      this._setupComponent();
    }
  
    connectedCallback() {
      this._updateRendering();
      this._setupEventListeners();
      
      if (this._autofocus) {
        setTimeout(() => {
          const firstInput = this.shadowRoot.querySelector('input');
          if (firstInput) firstInput.focus();
        }, 0);
      }
    }
  
    disconnectedCallback() {
      this._removeEventListeners();
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      
      switch (name) {
        case 'length':
          this._length = newValue ? parseInt(newValue, 10) : 6;
          break;
        case 'value':
          this._value = newValue || '';
          break;
        case 'autofocus':
          this._autofocus = newValue !== null;
          break;
        case 'placeholder':
          this._placeholder = newValue || '•';
          break;
        case 'disabled':
          this._disabled = newValue !== null;
          break;
        case 'type':
          this._type = newValue === 'password' ? 'password' : 'text';
          break;
        case 'loading':
          this._loading = newValue !== null;
          break;
      }
      
      this._updateRendering();
    }
  
    // Getters and setters
    get value() {
      return this._value;
    }
  
    set value(val) {
      if (this._value !== val) {
        this._value = val;
        this.setAttribute('value', val);
        this._updateInputValues();
        this._dispatchChangeEvent();
      }
    }
  
    get length() {
      return this._length;
    }
  
    set length(val) {
      const newLength = parseInt(val, 10);
      if (!isNaN(newLength) && this._length !== newLength) {
        this._length = newLength;
        this.setAttribute('length', newLength);
        this._updateRendering();
      }
    }
  
    get disabled() {
      return this._disabled;
    }
  
    set disabled(val) {
      this._disabled = Boolean(val);
      if (this._disabled) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
      this._updateInputStates();
    }
  
    get loading() {
      return this._loading;
    }
  
    set loading(val) {
      this._loading = Boolean(val);
      if (this._loading) {
        this.setAttribute('loading', '');
      } else {
        this.removeAttribute('loading');
      }
      this._updateInputStates();
    }
  
    _setupComponent() {
      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: inline-flex;
          flex-direction: row;
          gap: 8px;
          font-family: Roboto, 'Segoe UI', Arial, sans-serif;
        }
        
        .otp-input-container {
          display: inline-flex;
          gap: 8px;
          align-items: center;
        }
        
        .otp-field {
          position: relative;
          min-width: 40px;
          height: 56px;
        }
        
        .otp-field input {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 4px;
          text-align: center;
          font-size: 20px;
          font-weight: 500;
          background-color: rgb(242, 242, 242);
          color: rgba(0, 0, 0, 0.87);
          transition: all 0.2s ease;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          caret-color: rgb(25, 118, 210);
          -moz-appearance: textfield; /* Firefox */
        }
        
        .otp-field input::-webkit-outer-spin-button,
        .otp-field input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .otp-field input:focus {
          outline: none;
          background-color: rgb(232, 240, 254);
          box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        }
        
        .otp-field input:disabled {
          background-color: rgba(0, 0, 0, 0.06);
          color: rgba(0, 0, 0, 0.38);
          cursor: not-allowed;
        }
  
        .otp-field.loading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(25, 118, 210, 0), 
            rgba(25, 118, 210, 1) 50%, 
            rgba(25, 118, 210, 0)
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
  
        @keyframes loading {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
      `;
  
      this.shadowRoot.appendChild(style);
  
      const container = document.createElement('div');
      container.classList.add('otp-input-container');
      this.shadowRoot.appendChild(container);
    }
  
    _updateRendering() {
      const container = this.shadowRoot.querySelector('.otp-input-container');
      if (!container) return;
  
      // Clear container
      container.innerHTML = '';
  
      // Create input fields
      for (let i = 0; i < this._length; i++) {
        const field = document.createElement('div');
        field.classList.add('otp-field');
        
        if (this._loading) {
          field.classList.add('loading');
        }
  
        const input = document.createElement('input');
        input.type = this._type === 'password' ? 'password' : 'text';
        input.inputMode = 'numeric';
        input.maxLength = 1;
        input.placeholder = this._placeholder;
        input.disabled = this._disabled;
        input.dataset.index = i;
        input.value = this._value[i] || '';
  
        field.appendChild(input);
        container.appendChild(field);
      }
  
      this._updateInputValues();
    }
  
    _setupEventListeners() {
      this.shadowRoot.addEventListener('input', this._handleInput.bind(this));
      this.shadowRoot.addEventListener('keydown', this._handleKeyDown.bind(this));
      this.shadowRoot.addEventListener('focus', this._handleFocus.bind(this), true);
      this.shadowRoot.addEventListener('paste', this._handlePaste.bind(this));
    }
  
    _removeEventListeners() {
      this.shadowRoot.removeEventListener('input', this._handleInput.bind(this));
      this.shadowRoot.removeEventListener('keydown', this._handleKeyDown.bind(this));
      this.shadowRoot.removeEventListener('focus', this._handleFocus.bind(this), true);
      this.shadowRoot.removeEventListener('paste', this._handlePaste.bind(this));
    }
  
    _handleInput(event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      
      const input = event.target;
      const index = parseInt(input.dataset.index, 10);
      if (isNaN(index)) return;
  
      // Allow only numbers
      input.value = input.value.replace(/[^0-9]/g, '');
  
      // Update value
      const newValue = this._updateValueAtIndex(index, input.value);
      this.value = newValue;
  
      // Move to next input if current is filled
      if (input.value && index < this._length - 1) {
        const nextInput = this.shadowRoot.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  
    _handleKeyDown(event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      
      const input = event.target;
      const index = parseInt(input.dataset.index, 10);
      if (isNaN(index)) return;
  
      // Handle backspace
      if (event.key === 'Backspace') {
        if (input.value === '') {
          // Move to previous input if current is empty
          if (index > 0) {
            const prevInput = this.shadowRoot.querySelector(`input[data-index="${index - 1}"]`);
            if (prevInput) {
              prevInput.focus();
              prevInput.select();
            }
          }
        } else {
          // Clear current input
          input.value = '';
          this.value = this._updateValueAtIndex(index, '');
        }
      } 
      // Handle arrow keys for navigation
      else if (event.key === 'ArrowLeft' && index > 0) {
        const prevInput = this.shadowRoot.querySelector(`input[data-index="${index - 1}"]`);
        if (prevInput) prevInput.focus();
      } 
      else if (event.key === 'ArrowRight' && index < this._length - 1) {
        const nextInput = this.shadowRoot.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  
    _handleFocus(event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      
      // Select text on focus
      setTimeout(() => {
        // Make sure we're only calling select() on input elements
        if (event.target instanceof HTMLInputElement) {
          event.target.select();
        }
      }, 0);
    }
  
    _handlePaste(event) {
      if (!(event.target instanceof HTMLInputElement)) return;
      
      event.preventDefault();
      
      // Get pasted data
      const pastedData = (event.clipboardData || window.clipboardData).getData('text');
      if (!pastedData) return;
  
      // Filter only numbers
      const numericData = pastedData.replace(/[^0-9]/g, '');
      
      // Fill inputs with pasted data
      let newValue = this._value;
      const startIndex = parseInt(event.target.dataset.index, 10);
      
      for (let i = 0; i < numericData.length && i + startIndex < this._length; i++) {
        newValue = this._setCharAt(newValue, startIndex + i, numericData[i]);
      }
      
      this.value = newValue;
      
      // Focus the next empty input or the last input
      for (let i = startIndex; i < this._length; i++) {
        if (i >= newValue.length || !newValue[i]) {
          const nextInput = this.shadowRoot.querySelector(`input[data-index="${i}"]`);
          if (nextInput) {
            nextInput.focus();
            break;
          }
        }
        
        if (i === this._length - 1) {
          const lastInput = this.shadowRoot.querySelector(`input[data-index="${this._length - 1}"]`);
          if (lastInput) lastInput.focus();
        }
      }
    }
  
    _updateValueAtIndex(index, char) {
      return this._setCharAt(this._value, index, char);
    }
  
    _setCharAt(str, index, char) {
      if (index >= str.length) {
        return str.padEnd(index, '') + char;
      }
      
      return str.substring(0, index) + char + str.substring(index + 1);
    }
  
    _updateInputValues() {
      const inputs = this.shadowRoot.querySelectorAll('input');
      inputs.forEach((input, index) => {
        input.value = index < this._value.length ? this._value[index] : '';
      });
    }
  
    _updateInputStates() {
      const inputs = this.shadowRoot.querySelectorAll('input');
      inputs.forEach(input => {
        input.disabled = this._disabled;
      });
  
      const fields = this.shadowRoot.querySelectorAll('.otp-field');
      fields.forEach(field => {
        if (this._loading) {
          field.classList.add('loading');
        } else {
          field.classList.remove('loading');
        }
      });
    }
  
    _dispatchChangeEvent() {
      const event = new CustomEvent('change', {
        detail: {
          value: this._value,
          complete: this._value.length === this._length
        },
        bubbles: true,
        composed: true
      });
      
      this.dispatchEvent(event);
    }
  
    // Public methods
    clear() {
      this.value = '';
      const firstInput = this.shadowRoot.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  
    focus() {
      const firstInput = this.shadowRoot.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  }
  
  // Define the custom element
  customElements.define('vc-otp-input', MaterialOtpInput);

  export default MaterialOtpInput;