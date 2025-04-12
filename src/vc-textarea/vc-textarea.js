// vc-textarea.js - Material 2 inspired Textarea Web Component
class VcTextarea extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Initialize internal state
        this._value = '';
        this._focused = false;
        this._disabled = false;
        this._readonly = false;
        this._outlined = false;
        this._rows = 5;
        this._maxRows = null;
        this._autogrow = false;
        this._counter = false;
        this._maxlength = -1;
        this._clearable = false;
        this._persistentHint = false;
        this._persistentPlaceholder = false;

        // Bind methods to maintain 'this' context
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onInput = this._onInput.bind(this);
        this._onClear = this._onClear.bind(this);
        this._adjustHeight = this._adjustHeight.bind(this);
    }

    static get observedAttributes() {
        return [
            'label', 'placeholder', 'value', 'disabled', 'readonly', 'outlined',
            'rows', 'maxrows', 'autogrow', 'counter', 'maxlength', 'clearable',
            'hint', 'error', 'success', 'persistent-hint', 'persistent-placeholder'
        ];
    }

    connectedCallback() {
        this.render();
        this._setupEventListeners();

        // Initial height adjustment for autogrow
        if (this._autogrow) {
            setTimeout(() => this._adjustHeight(), 0);
        }
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'value':
                this._value = newValue || '';
                this._updateTextareaValue();
                if (this._autogrow) this._adjustHeight();
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                this._updateDisabledState();
                break;
            case 'readonly':
                this._readonly = newValue !== null;
                this._updateReadonlyState();
                break;
            case 'outlined':
                this._outlined = newValue !== null;
                this._updateOutlinedState();
                break;
            case 'rows':
                this._rows = parseInt(newValue) || 5;
                this._updateRows();
                break;
            case 'maxrows':
                this._maxRows = newValue ? parseInt(newValue) : null;
                if (this._autogrow) this._adjustHeight();
                break;
            case 'autogrow':
                this._autogrow = newValue !== null;
                if (this._autogrow) this._adjustHeight();
                break;
            case 'counter':
                this._counter = newValue !== null;
                this._updateCounter();
                break;
            case 'maxlength':
                this._maxlength = newValue ? parseInt(newValue) : -1;
                this._updateMaxLength();
                this._updateCounter();
                break;
            case 'clearable':
                this._clearable = newValue !== null;
                this._updateClearButton();
                break;
            case 'persistent-hint':
                this._persistentHint = newValue !== null;
                this._updateHintVisibility();
                break;
            case 'persistent-placeholder':
                this._persistentPlaceholder = newValue !== null;
                this._updatePlaceholderBehavior();
                break;
            default:
                this.render(); // Re-render for other attributes like label, hint, error
        }
    }

    // Getters and setters for properties
    get value() { return this._value; }
    set value(val) {
        this._value = val || '';
        this.setAttribute('value', this._value);
        this._updateTextareaValue();
        if (this._autogrow) this._adjustHeight();
    }

    get disabled() { return this._disabled; }
    set disabled(val) {
        this._disabled = !!val;
        if (this._disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
        this._updateDisabledState();
    }

    get readonly() { return this._readonly; }
    set readonly(val) {
        this._readonly = !!val;
        if (this._readonly) {
            this.setAttribute('readonly', '');
        } else {
            this.removeAttribute('readonly');
        }
        this._updateReadonlyState();
    }

    // Event handlers
    _onFocus(event) {
        if (this._disabled || this._readonly) return;
        this._focused = true;
        this.shadowRoot.querySelector('.vc-textarea-container').classList.add('focused');
        this.dispatchEvent(new CustomEvent('focus', { detail: { value: this._value } }));
    }

    _onBlur(event) {
        this._focused = false;
        this.shadowRoot.querySelector('.vc-textarea-container').classList.remove('focused');
        this._updateHintVisibility();
        this.dispatchEvent(new CustomEvent('blur', { detail: { value: this._value } }));
    }

    _onInput(event) {
        if (this._disabled || this._readonly) return;
        this._value = event.target.value;

        if (this._maxlength >= 0 && this._value.length > this._maxlength) {
            this._value = this._value.slice(0, this._maxlength);
            event.target.value = this._value;
        }

        this._updateCounter();
        if (this._autogrow) this._adjustHeight();

        // Dispatch input and change events
        this.dispatchEvent(new CustomEvent('input', { detail: { value: this._value } }));
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value } }));
    }

    _onClear(event) {
        if (this._disabled || this._readonly) return;
        this._value = '';
        this._updateTextareaValue();
        this._updateCounter();
        if (this._autogrow) this._adjustHeight();

        // Focus textarea after clearing
        this.shadowRoot.querySelector('textarea').focus();

        // Dispatch events
        this.dispatchEvent(new CustomEvent('input', { detail: { value: this._value } }));
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._value } }));
        this.dispatchEvent(new CustomEvent('clear'));
    }

    // Helper methods
    _setupEventListeners() {
        const textarea = this.shadowRoot.querySelector('textarea');
        textarea.addEventListener('focus', this._onFocus);
        textarea.addEventListener('blur', this._onBlur);
        textarea.addEventListener('input', this._onInput);

        const clearButton = this.shadowRoot.querySelector('.vc-textarea-clear-button');
        if (clearButton) {
            clearButton.addEventListener('click', this._onClear);
        }
    }

    _removeEventListeners() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (textarea) {
            textarea.removeEventListener('focus', this._onFocus);
            textarea.removeEventListener('blur', this._onBlur);
            textarea.removeEventListener('input', this._onInput);
        }

        const clearButton = this.shadowRoot.querySelector('.vc-textarea-clear-button');
        if (clearButton) {
            clearButton.removeEventListener('click', this._onClear);
        }
    }

    _updateTextareaValue() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (textarea) {
            textarea.value = this._value;
        }
    }

    _updateDisabledState() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (textarea) {
            textarea.disabled = this._disabled;
        }

        const container = this.shadowRoot.querySelector('.vc-textarea-container');
        if (container) {
            if (this._disabled) {
                container.classList.add('disabled');
            } else {
                container.classList.remove('disabled');
            }
        }
    }

    _updateReadonlyState() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (textarea) {
            textarea.readOnly = this._readonly;
        }

        const container = this.shadowRoot.querySelector('.vc-textarea-container');
        if (container) {
            if (this._readonly) {
                container.classList.add('readonly');
            } else {
                container.classList.remove('readonly');
            }
        }
    }

    _updateOutlinedState() {
        const container = this.shadowRoot.querySelector('.vc-textarea-container');
        if (container) {
            if (this._outlined) {
                container.classList.add('outlined');
            } else {
                container.classList.remove('outlined');
            }
        }
    }

    _updateRows() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (textarea) {
            textarea.rows = this._rows;
        }
    }

    _updateMaxLength() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (textarea) {
            if (this._maxlength >= 0) {
                textarea.maxLength = this._maxlength;
            } else {
                textarea.removeAttribute('maxlength');
            }
        }
    }

    _updateCounter() {
        const counterElement = this.shadowRoot.querySelector('.vc-textarea-counter');
        if (counterElement) {
            if (this._counter) {
                counterElement.style.display = 'block';
                if (this._maxlength >= 0) {
                    counterElement.textContent = `${this._value.length} / ${this._maxlength}`;
                } else {
                    counterElement.textContent = `${this._value.length}`;
                }
            } else {
                counterElement.style.display = 'none';
            }
        }
    }

    _updateClearButton() {
        const clearButton = this.shadowRoot.querySelector('.vc-textarea-clear-button');
        if (clearButton) {
            if (this._clearable && this._value && !this._disabled && !this._readonly) {
                clearButton.style.display = 'flex';
            } else {
                clearButton.style.display = 'none';
            }
        }
    }

    _updateHintVisibility() {
        const hintElement = this.shadowRoot.querySelector('.vc-textarea-hint');
        if (hintElement) {
            if (this._persistentHint || (this._focused && this.getAttribute('hint'))) {
                hintElement.style.display = 'block';
            } else {
                hintElement.style.display = 'none';
            }
        }
    }

    _updatePlaceholderBehavior() {
        const label = this.shadowRoot.querySelector('.vc-textarea-label');
        if (label) {
            if (this._persistentPlaceholder) {
                label.classList.add('persistent-placeholder');
            } else {
                label.classList.remove('persistent-placeholder');
            }
        }
    }

    _adjustHeight() {
        const textarea = this.shadowRoot.querySelector('textarea');
        if (!textarea || !this._autogrow) return;

        // Reset height to calculate scroll height
        textarea.style.height = 'auto';

        let newHeight = textarea.scrollHeight;

        // Apply max-rows limit if set
        if (this._maxRows) {
            // Calculate line height (approximation)
            const computedStyle = window.getComputedStyle(textarea);
            const lineHeight = parseInt(computedStyle.lineHeight) || 20; // Default fallback
            const maxHeight = this._maxRows * lineHeight;

            if (newHeight > maxHeight) {
                newHeight = maxHeight;
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.overflowY = 'hidden';
            }
        }

        textarea.style.height = `${newHeight}px`;
    }

    render() {
        const label = this.getAttribute('label') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const hint = this.getAttribute('hint') || '';
        const error = this.getAttribute('error') || '';
        const success = this.getAttribute('success') || '';

        // Determine styles for different states
        let messageClass = '';
        if (error) messageClass = 'error';
        else if (success) messageClass = 'success';

        // Determine if label should float
        const shouldFloatLabel = this._value || this._focused || this._persistentPlaceholder;

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            width: 100%;
            font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.87);
            --primary-color: #6200ee;
            --error-color: #b00020;
            --success-color: #4caf50;
            --disabled-color: rgba(0, 0, 0, 0.38);
            --border-color: rgba(0, 0, 0, 0.42);
            --hover-border-color: rgba(0, 0, 0, 0.87);
            --background-color: transparent;
          }
          
          .vc-textarea-container {
            position: relative;
            width: 100%;
            min-height: 56px;
            border-radius: 4px 4px 0 0;
            background-color: var(--background-color);
            transition: all 0.2s ease;
          }
          
          .vc-textarea-container.outlined {
            border-radius: 4px;
            border: 1px solid var(--border-color);
            background-color: transparent;
            transition: border-color 0.2s ease;
          }
          
          .vc-textarea-container.outlined.focused {
            border-color: var(--primary-color);
            border-width: 2px;
          }
          
          .vc-textarea-container.outlined.error {
            border-color: var(--error-color);
          }
          
          .vc-textarea-container.outlined.success {
            border-color: var(--success-color);
          }
          
          .vc-textarea-container:not(.outlined):after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1px;
            background-color: var(--border-color);
            transition: background-color 0.2s ease;
          }
          
          .vc-textarea-container.focused:not(.outlined):after {
            height: 2px;
            background-color: var(--primary-color);
          }
          
          .vc-textarea-container.error:not(.outlined):after {
            background-color: var(--error-color);
          }
          
          .vc-textarea-container.success:not(.outlined):after {
            background-color: var(--success-color);
          }
          
          .vc-textarea-container.disabled {
            opacity: 0.6;
            pointer-events: none;
          }
          
          .vc-textarea-label {
            position: absolute;
            top: 16px;
            left: 12px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.6);
            pointer-events: none;
            transition: all 0.2s ease;
            transform-origin: left top;
            z-index: 1;
          }
          
          .vc-textarea-container.focused .vc-textarea-label,
          .vc-textarea-label.elevated {
            transform: translateY(-24px) scale(0.75);
          }
          
          .vc-textarea-container.focused .vc-textarea-label {
            color: var(--primary-color);
          }
          
          .vc-textarea-container.error .vc-textarea-label {
            color: var(--error-color);
          }
          
          .vc-textarea-container.success .vc-textarea-label {
            color: var(--success-color);
          }
          
          .vc-textarea-wrapper {
            position: relative;
            width: 100%;
            padding: 16px 12px 6px;
            box-sizing: border-box;
          }
          
          .vc-textarea-container.outlined .vc-textarea-wrapper {
            padding-top: 20px;
          }
          
          textarea {
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            font-family: inherit;
            font-size: 16px;
            line-height: 1.5;
            padding: 0;
            margin: 0;
            resize: vertical;
            color: rgba(0, 0, 0, 0.87);
          }
          
          textarea:disabled {
            color: var(--disabled-color);
          }
          
          .vc-textarea-hint,
          .vc-textarea-error,
          .vc-textarea-success {
            font-size: 12px;
            padding: 4px 12px 0;
            min-height: 16px;
            transition: color 0.2s ease;
          }
          
          .vc-textarea-hint {
            color: rgba(0, 0, 0, 0.6);
          }
          
          .vc-textarea-error {
            color: var(--error-color);
          }
          
          .vc-textarea-success {
            color: var(--success-color);
          }
          
          .vc-textarea-counter {
            font-size: 12px;
            text-align: right;
            padding: 4px 12px 0;
            color: rgba(0, 0, 0, 0.6);
          }
          
          .vc-textarea-clear-button {
            position: absolute;
            right: 12px;
            top: 16px;
            width: 24px;
            height: 24px;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: rgba(0, 0, 0, 0.54);
            border-radius: 50%;
            background: transparent;
            transition: background-color 0.2s ease;
            z-index: 2;
          }
          
          .vc-textarea-clear-button:hover {
            background-color: rgba(0, 0, 0, 0.04);
          }
          
          .vc-textarea-clear-button svg {
            width: 18px;
            height: 18px;
          }
        </style>
        
        <div class="vc-textarea-container ${this._outlined ? 'outlined' : ''} ${messageClass} ${this._focused ? 'focused' : ''} ${this._disabled ? 'disabled' : ''} ${this._readonly ? 'readonly' : ''}">
          ${label ? `<label class="vc-textarea-label ${shouldFloatLabel ? 'elevated' : ''}">${label}</label>` : ''}
          
          <div class="vc-textarea-wrapper">
            <textarea 
              rows="${this._rows}" 
              placeholder="${shouldFloatLabel ? placeholder : ''}"
              ${this._disabled ? 'disabled' : ''}
              ${this._readonly ? 'readonly' : ''}
              ${this._maxlength >= 0 ? `maxlength="${this._maxlength}"` : ''}
            >${this._value}</textarea>
            
            ${this._clearable ? `
              <div class="vc-textarea-clear-button" style="display: ${(this._value && !this._disabled && !this._readonly) ? 'flex' : 'none'}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
                </svg>
              </div>
            ` : ''}
          </div>
          
          ${error ? `<div class="vc-textarea-error">${error}</div>` : ''}
          ${success && !error ? `<div class="vc-textarea-success">${success}</div>` : ''}
          ${hint && !error && !success ? `<div class="vc-textarea-hint" style="display: ${this._persistentHint || this._focused ? 'block' : 'none'}">${hint}</div>` : ''}
          
          ${this._counter ? `<div class="vc-textarea-counter">${this._value.length}${this._maxlength >= 0 ? ` / ${this._maxlength}` : ''}</div>` : ''}
        </div>
      `;

        this._setupEventListeners();
    }
}

// Register the custom element
customElements.define('vc-textarea', VcTextarea);

export default VcTextarea;