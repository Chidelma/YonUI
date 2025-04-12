/**
 * Material 2 Text Field Web Component
 * A customizable text field component following Material Design 2 guidelines
 */
class VcTextField extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._value = '';
    this._label = '';
    this._placeholder = '';
    this._disabled = false;
    this._required = false;
    this._readonly = false;
    this._helperText = '';
    this._errorMessage = '';
    this._hasError = false;
    this._maxLength = -1;
    this._type = 'text';

    this._render();
  }

  static get observedAttributes() {
    return [
      'value',
      'label',
      'placeholder',
      'disabled',
      'required',
      'readonly',
      'helper-text',
      'error-message',
      'max-length',
      'type'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'value':
        this._value = newValue || '';
        this._updateInputValue();
        break;
      case 'label':
        this._label = newValue || '';
        this._updateLabel();
        break;
      case 'placeholder':
        this._placeholder = newValue || '';
        this._updatePlaceholder();
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        this._updateDisabled();
        break;
      case 'required':
        this._required = newValue !== null;
        this._updateRequired();
        break;
      case 'readonly':
        this._readonly = newValue !== null;
        this._updateReadonly();
        break;
      case 'helper-text':
        this._helperText = newValue || '';
        this._updateHelperText();
        break;
      case 'error-message':
        this._errorMessage = newValue || '';
        this._updateErrorState();
        break;
      case 'max-length':
        this._maxLength = newValue ? parseInt(newValue, 10) : -1;
        this._updateMaxLength();
        break;
      case 'type':
        this._type = newValue || 'text';
        this._updateType();
        break;
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  get label() {
    return this._label;
  }

  set label(val) {
    this.setAttribute('label', val);
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(val) {
    this.setAttribute('placeholder', val);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get required() {
    return this._required;
  }

  set required(val) {
    if (val) {
      this.setAttribute('required', '');
    } else {
      this.removeAttribute('required');
    }
  }

  get readonly() {
    return this._readonly;
  }

  set readonly(val) {
    if (val) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }

  get helperText() {
    return this._helperText;
  }

  set helperText(val) {
    this.setAttribute('helper-text', val);
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(val) {
    this.setAttribute('error-message', val);
  }

  get maxLength() {
    return this._maxLength;
  }

  set maxLength(val) {
    this.setAttribute('max-length', val);
  }

  get type() {
    return this._type;
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: Roboto, Arial, sans-serif;
          font-size: 16px;
          width: 280px;
          --primary-color: #6200ee;
          --error-color: #b00020;
          --disabled-color: rgba(0, 0, 0, 0.38);
          --label-color: rgba(0, 0, 0, 0.6);
          --input-color: rgba(0, 0, 0, 0.87);
          --border-color: rgba(0, 0, 0, 0.42);
        }
        
        .text-field {
          position: relative;
          margin-bottom: 8px;
        }
        
        .input-container {
          position: relative;
          padding-top: 16px;
        }
        
        label {
          position: absolute;
          top: 16px;
          left: 0;
          color: var(--label-color);
          font-size: 16px;
          transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left top;
          pointer-events: none;
        }
        
        input {
          width: 100%;
          height: 30px;
          border: none;
          border-bottom: 1px solid var(--border-color);
          background: none;
          font-size: 16px;
          padding: 0;
          color: var(--input-color);
          outline: none;
          transition: border-bottom-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input:focus {
          border-bottom-color: var(--primary-color);
          border-bottom-width: 2px;
        }
        
        input:focus + label,
        input:not(:placeholder-shown) + label {
          transform: translateY(-100%) scale(0.75);
          color: var(--primary-color);
        }
        
        input:focus + label.error,
        input.error:not(:placeholder-shown) + label {
          color: var(--error-color);
        }
        
        input.error {
          border-bottom-color: var(--error-color);
          border-bottom-width: 2px;
        }
        
        input:disabled {
          border-bottom: 1px dashed var(--disabled-color);
          color: var(--disabled-color);
        }
        
        input:disabled + label {
          color: var(--disabled-color);
        }
        
        input:read-only {
          border-bottom-style: dotted;
        }
        
        .line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: width 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        input:focus ~ .line {
          width: 100%;
        }
        
        input.error ~ .line {
          background-color: var(--error-color);
        }
        
        .helper-text {
          font-size: 12px;
          color: var(--label-color);
          margin-top: 4px;
          min-height: 16px;
        }
        
        .helper-text.error {
          color: var(--error-color);
        }

        .char-counter {
          font-size: 12px;
          color: var(--label-color);
          float: right;
          margin-top: 4px;
        }
      </style>
      
      <div class="text-field">
        <div class="input-container">
          <input type="text" value="" placeholder=" ">
          <label></label>
          <div class="line"></div>
        </div>
        <div class="supporting-text">
          <div class="helper-text"></div>
          <div class="char-counter"></div>
        </div>
      </div>
    `;

    this._inputElement = this.shadowRoot.querySelector('input');
    this._labelElement = this.shadowRoot.querySelector('label');
    this._helperTextElement = this.shadowRoot.querySelector('.helper-text');
    this._charCounterElement = this.shadowRoot.querySelector('.char-counter');

    this._inputElement.addEventListener('input', this._handleInput.bind(this));
    this._inputElement.addEventListener('focus', this._handleFocus.bind(this));
    this._inputElement.addEventListener('blur', this._handleBlur.bind(this));

    // Initialize all properties
    this._updateInputValue();
    this._updateLabel();
    this._updatePlaceholder();
    this._updateDisabled();
    this._updateRequired();
    this._updateReadonly();
    this._updateHelperText();
    this._updateErrorState();
    this._updateMaxLength();
    this._updateType();
  }

  _handleInput(event) {
    this._value = event.target.value;

    // Character counter update
    if (this._maxLength > 0) {
      this._updateCharCounter();
    }

    // Validation (optional)
    this._validateInput();

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this._value
      },
      bubbles: true,
      composed: true
    }));
  }

  _handleFocus() {
    this.dispatchEvent(new CustomEvent('focus', {
      bubbles: false,
      composed: true
    }));
  }

  _handleBlur() {
    this._validateInput(true);

    this.dispatchEvent(new CustomEvent('blur', {
      bubbles: false,
      composed: true
    }));
  }

  _validateInput(isBlur = false) {
    // Reset error state
    this._hasError = false;

    // Required validation
    if (isBlur && this._required && !this._value) {
      this._hasError = true;
      this._errorMessage = this._errorMessage || 'This field is required';
    }

    // Max length validation is handled by the browser, but we could add custom validation here

    this._updateErrorState();
  }

  _updateInputValue() {
    if (this._inputElement) {
      this._inputElement.value = this._value;

      if (this._maxLength > 0) {
        this._updateCharCounter();
      }
    }
  }

  _updateLabel() {
    if (this._labelElement) {
      this._labelElement.textContent = this._label;

      if (this._required) {
        this._labelElement.textContent += ' *';
      }
    }
  }

  _updatePlaceholder() {
    if (this._inputElement) {
      this._inputElement.placeholder = this._placeholder ? this._placeholder : ' ';
    }
  }

  _updateDisabled() {
    if (this._inputElement) {
      this._inputElement.disabled = this._disabled;
    }
  }

  _updateRequired() {
    if (this._inputElement) {
      this._inputElement.required = this._required;
      this._updateLabel(); // Update label to show asterisk
    }
  }

  _updateReadonly() {
    if (this._inputElement) {
      this._inputElement.readOnly = this._readonly;
    }
  }

  _updateHelperText() {
    if (this._helperTextElement) {
      this._helperTextElement.textContent = this._hasError ? this._errorMessage : this._helperText;
    }
  }

  _updateErrorState() {
    if (this._inputElement && this._labelElement && this._helperTextElement) {
      this._hasError = !!this._errorMessage;

      if (this._hasError) {
        this._inputElement.classList.add('error');
        this._labelElement.classList.add('error');
        this._helperTextElement.classList.add('error');
        this._helperTextElement.textContent = this._errorMessage;
      } else {
        this._inputElement.classList.remove('error');
        this._labelElement.classList.remove('error');
        this._helperTextElement.classList.remove('error');
        this._helperTextElement.textContent = this._helperText;
      }
    }
  }

  _updateMaxLength() {
    if (this._inputElement) {
      if (this._maxLength > 0) {
        this._inputElement.maxLength = this._maxLength;
        this._updateCharCounter();
      } else {
        this._inputElement.removeAttribute('maxLength');
        this._charCounterElement.textContent = '';
      }
    }
  }

  _updateCharCounter() {
    if (this._charCounterElement && this._maxLength > 0) {
      this._charCounterElement.textContent = `${this._value.length} / ${this._maxLength}`;
    }
  }

  _updateType() {
    if (this._inputElement) {
      this._inputElement.type = this._type;
    }
  }

  // Public methods

  /**
   * Sets focus on the input element
   */
  focus() {
    this._inputElement.focus();
  }

  /**
   * Removes focus from the input element
   */
  blur() {
    this._inputElement.blur();
  }

  /**
   * Checks if the input is valid
   * @return {boolean} True if valid, false otherwise
   */
  checkValidity() {
    return !this._hasError && this._inputElement.checkValidity();
  }

  /**
   * Manually sets an error message
   * @param {string} message - The error message to display
   */
  setError(message) {
    this._errorMessage = message || '';
    this._updateErrorState();
  }

  /**
   * Clears any error message
   */
  clearError() {
    this._errorMessage = '';
    this._updateErrorState();
  }
}

// Define the custom element
customElements.define('vc-text-field', VcTextField);

export default VcTextField;