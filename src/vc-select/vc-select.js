/**
 * Material 2 inspired Select Web Component
 * A customizable dropdown select component
 */
class VcSelect extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Component state
        this._open = false;
        this._disabled = false;
        this._value = '';
        this._options = [];
        this._placeholder = 'Select an option';
        this._label = '';

        // Event binding
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    static get observedAttributes() {
        return ['disabled', 'placeholder', 'label', 'value'];
    }

    connectedCallback() {
        this._render();
        this._upgradeProperty('disabled');
        this._upgradeProperty('placeholder');
        this._upgradeProperty('label');
        this._upgradeProperty('value');

        // Parse options from slot
        this._processOptions();

        // Set up event listeners
        this.shadowRoot.querySelector('.select-container').addEventListener('click', () => this._toggleDropdown());
        document.addEventListener('click', this._handleDocumentClick);
        this.addEventListener('keydown', this._handleKeyDown);

        // Observe slot changes for options
        const observer = new MutationObserver(() => this._processOptions());
        observer.observe(this, { childList: true, subtree: true });
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._handleDocumentClick);
        this.removeEventListener('keydown', this._handleKeyDown);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'disabled':
                this._disabled = newValue !== null;
                if (this._disabled && this._open) {
                    this._open = false;
                    this._render();
                }
                break;
            case 'placeholder':
                this._placeholder = newValue || 'Select an option';
                break;
            case 'label':
                this._label = newValue || '';
                break;
            case 'value':
                this._value = newValue || '';
                this._updateSelectedOption();
                break;
        }

        this._render();
    }

    // Getters/Setters
    get value() {
        return this._value;
    }

    set value(val) {
        if (this._value === val) return;
        this._value = val;
        this.setAttribute('value', val);
        this._updateSelectedOption();
        this._render();
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(val) {
        const isDisabled = Boolean(val);
        if (this._disabled === isDisabled) return;
        this._disabled = isDisabled;

        if (isDisabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }

        this._render();
    }

    get placeholder() {
        return this._placeholder;
    }

    set placeholder(val) {
        this._placeholder = val;
        this.setAttribute('placeholder', val);
        this._render();
    }

    get label() {
        return this._label;
    }

    set label(val) {
        this._label = val;
        this.setAttribute('label', val);
        this._render();
    }

    // Private methods
    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            const value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    _processOptions() {
        this._options = [];
        const items = this.querySelectorAll('option');

        items.forEach(item => {
            this._options.push({
                value: item.value,
                text: item.textContent,
                disabled: item.disabled
            });
        });

        this._updateSelectedOption();
        this._render();
    }

    _updateSelectedOption() {
        if (!this._value) return;

        // Find matching option
        const option = this._options.find(opt => opt.value === this._value);

        // If no matching option is found, reset value
        if (!option) {
            this._value = '';
            this.removeAttribute('value');
        }
    }

    _toggleDropdown() {
        if (this._disabled) return;

        this._open = !this._open;
        this._render();

        if (this._open) {
            this.shadowRoot.querySelector('.dropdown').focus();
        }
    }

    _handleDocumentClick(event) {
        const path = event.composedPath();
        if (!path.includes(this) && this._open) {
            this._open = false;
            this._render();
        }
    }

    _handleKeyDown(event) {
        if (this._disabled) return;

        switch (event.key) {
            case 'Enter':
            case 'Space':
                if (!this._open) {
                    this._open = true;
                    this._render();
                    event.preventDefault();
                }
                break;
            case 'Escape':
                if (this._open) {
                    this._open = false;
                    this._render();
                    event.preventDefault();
                }
                break;
            case 'ArrowDown':
                if (this._open) {
                    this._focusNextOption();
                    event.preventDefault();
                }
                break;
            case 'ArrowUp':
                if (this._open) {
                    this._focusPreviousOption();
                    event.preventDefault();
                }
                break;
        }
    }

    _focusNextOption() {
        const options = this.shadowRoot.querySelectorAll('.option:not(.disabled)');
        const current = this.shadowRoot.querySelector('.option:focus');
        let index = -1;

        if (current) {
            index = Array.from(options).indexOf(current);
            if (index >= options.length - 1) {
                index = -1;
            }
        }

        options[index + 1]?.focus();
    }

    _focusPreviousOption() {
        const options = this.shadowRoot.querySelectorAll('.option:not(.disabled)');
        const current = this.shadowRoot.querySelector('.option:focus');
        let index = options.length;

        if (current) {
            index = Array.from(options).indexOf(current);
            if (index <= 0) {
                index = options.length;
            }
        }

        options[index - 1]?.focus();
    }

    _selectOption(option) {
        if (option.disabled) return;

        const oldValue = this._value;
        this._value = option.value;
        this.setAttribute('value', option.value);

        this._open = false;
        this._render();

        if (oldValue !== this._value) {
            this.dispatchEvent(new CustomEvent('change', {
                detail: { value: this._value },
                bubbles: true
            }));
        }
    }

    _render() {
        const selectedOption = this._options.find(opt => opt.value === this._value);
        const displayText = selectedOption ? selectedOption.text : this._placeholder;

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            font-family: Roboto, 'Segoe UI', Arial, sans-serif;
            width: 100%;
            position: relative;
            outline: none;
          }
          
          :host([disabled]) {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .select-label {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.6);
            margin-bottom: 6px;
            display: block;
          }
          
          .select-container {
            border: 1px solid rgba(0, 0, 0, 0.24);
            border-radius: 4px;
            height: 36px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            position: relative;
            cursor: pointer;
            background-color: white;
            transition: all 0.2s ease;
          }
          
          :host(:not([disabled])) .select-container:hover {
            border-color: rgba(0, 0, 0, 0.42);
          }
          
          :host(:not([disabled])) .select-container:focus-within {
            border-color: #1976d2;
            box-shadow: 0 0 0 1px #1976d2;
          }
          
          .select-value {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            user-select: none;
            color: ${this._value ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.42)'};
          }
          
          .select-arrow {
            border-style: solid;
            border-width: 5px 5px 0 5px;
            border-color: rgba(0, 0, 0, 0.54) transparent transparent transparent;
            margin-left: 8px;
            transition: transform 0.2s ease;
            transform: ${this._open ? 'rotate(180deg)' : 'rotate(0deg)'};
          }
          
          .dropdown {
            position: absolute;
            top: calc(100% + 2px);
            left: 0;
            width: 100%;
            background: white;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
            display: ${this._open ? 'block' : 'none'};
            outline: none;
          }
          
          .option {
            padding: 12px 16px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            outline: none;
          }
          
          .option:hover:not(.disabled),
          .option:focus:not(.disabled) {
            background-color: rgba(25, 118, 210, 0.08);
          }
          
          .option.selected {
            background-color: rgba(25, 118, 210, 0.16);
            font-weight: 500;
          }
          
          .option.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        </style>
        
        ${this._label ? `<label class="select-label">${this._label}</label>` : ''}
        
        <div class="select-container" tabindex="${this._disabled ? '-1' : '0'}">
          <span class="select-value">${displayText}</span>
          <span class="select-arrow"></span>
        </div>
        
        <div class="dropdown" tabindex="-1">
          ${this._options.map(option => `
            <div class="option ${option.value === this._value ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}" 
                 tabindex="${option.disabled ? '-1' : '0'}"
                 data-value="${option.value}">
              ${option.text}
            </div>
          `).join('')}
        </div>
      `;

        // Add event listeners to options
        this.shadowRoot.querySelectorAll('.option:not(.disabled)').forEach(element => {
            element.addEventListener('click', (event) => {
                const value = event.currentTarget.dataset.value;
                const option = this._options.find(opt => opt.value === value);
                this._selectOption(option);
            });
        });
    }
}

// Define the web component
customElements.define('vc-select', VcSelect);

export default VcSelect;