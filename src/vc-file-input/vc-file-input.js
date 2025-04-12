/**
 * Material 2-inspired File Input Web Component
 * Inspired by Vuetify v3's v-file-input
 */
class VcFileInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Initialize properties
    this._multiple = false;
    this._disabled = false;
    this._accept = '';
    this._label = 'Choose file';
    this._placeholder = '';
    this._clearable = true;
    this._persistentPlaceholder = false;
    this._prependIcon = 'file_upload';
    this._counter = false;
    this._chips = false;
    this._variant = 'filled'; // 'filled', 'outlined', 'plain', 'underlined', 'solo'
    this._density = 'default'; // 'default', 'comfortable', 'compact'
    this._color = 'primary';
    this._error = false;
    this._errorMessages = [];

    // File storage
    this.files = [];

    this._render();
  }

  static get observedAttributes() {
    return [
      'multiple', 'disabled', 'accept', 'label', 'placeholder',
      'clearable', 'persistent-placeholder', 'prepend-icon',
      'counter', 'chips', 'variant', 'density', 'color', 'error'
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'multiple':
        this._multiple = newValue !== null;
        break;
      case 'disabled':
        this._disabled = newValue !== null;
        break;
      case 'accept':
        this._accept = newValue || '';
        break;
      case 'label':
        this._label = newValue || 'Choose file';
        break;
      case 'placeholder':
        this._placeholder = newValue || '';
        break;
      case 'clearable':
        this._clearable = newValue !== 'false';
        break;
      case 'persistent-placeholder':
        this._persistentPlaceholder = newValue !== null;
        break;
      case 'prepend-icon':
        this._prependIcon = newValue || 'file_upload';
        break;
      case 'counter':
        this._counter = newValue !== null;
        break;
      case 'chips':
        this._chips = newValue !== null;
        break;
      case 'variant':
        this._variant = newValue || 'filled';
        break;
      case 'density':
        this._density = newValue || 'default';
        break;
      case 'color':
        this._color = newValue || 'primary';
        break;
      case 'error':
        this._error = newValue !== null;
        break;
    }

    this._render();
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
  }

  disconnectedCallback() {
    this._removeEventListeners();
  }

  _setupEventListeners() {
    this.shadowRoot.querySelector('.vc-file-input__field').addEventListener('click', this._handleFieldClick.bind(this));
    this.shadowRoot.querySelector('.vc-file-input__input').addEventListener('change', this._handleInputChange.bind(this));

    if (this._clearable) {
      const clearBtn = this.shadowRoot.querySelector('.vc-file-input__clear');
      if (clearBtn) {
        clearBtn.addEventListener('click', this._handleClear.bind(this));
      }
    }
  }

  _removeEventListeners() {
    const field = this.shadowRoot.querySelector('.vc-file-input__field');
    if (field) {
      field.removeEventListener('click', this._handleFieldClick.bind(this));
    }

    const input = this.shadowRoot.querySelector('.vc-file-input__input');
    if (input) {
      input.removeEventListener('change', this._handleInputChange.bind(this));
    }

    if (this._clearable) {
      const clearBtn = this.shadowRoot.querySelector('.vc-file-input__clear');
      if (clearBtn) {
        clearBtn.removeEventListener('click', this._handleClear.bind(this));
      }
    }
  }

  _handleFieldClick(e) {
    if (!this._disabled) {
      this.shadowRoot.querySelector('.vc-file-input__input').click();
    }
  }

  _handleInputChange(e) {
    const fileList = e.target.files;

    if (fileList.length > 0) {
      this.files = this._multiple ? Array.from(fileList) : [fileList[0]];

      // Dispatch change event
      this.dispatchEvent(new CustomEvent('change', {
        detail: { files: this.files },
        bubbles: true,
        composed: true
      }));

      this._render();
    }
  }

  _handleClear(e) {
    e.stopPropagation();
    this.files = [];

    // Reset the input value
    const input = this.shadowRoot.querySelector('.vc-file-input__input');
    input.value = '';

    // Dispatch clear event
    this.dispatchEvent(new CustomEvent('clear', {
      bubbles: true,
      composed: true
    }));

    this._render();
  }

  _formatFileNames() {
    if (this.files.length === 0) {
      return '';
    }

    if (this.files.length === 1) {
      return this.files[0].name;
    }

    return `${this.files.length} files`;
  }

  _getColorStyle() {
    const colors = {
      primary: '#1976d2',
      secondary: '#26a69a',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196f3'
    };

    return colors[this._color] || colors.primary;
  }

  _getDensityClass() {
    switch (this._density) {
      case 'comfortable':
        return 'vc-file-input--density-comfortable';
      case 'compact':
        return 'vc-file-input--density-compact';
      default:
        return 'vc-file-input--density-default';
    }
  }

  _getVariantClass() {
    switch (this._variant) {
      case 'outlined':
        return 'vc-file-input--variant-outlined';
      case 'plain':
        return 'vc-file-input--variant-plain';
      case 'underlined':
        return 'vc-file-input--variant-underlined';
      case 'solo':
        return 'vc-file-input--variant-solo';
      default:
        return 'vc-file-input--variant-filled';
    }
  }

  _renderChips() {
    if (!this._chips || this.files.length === 0) {
      return '';
    }

    return this.files.map(file => {
      return `
        <div class="vc-file-input__chip">
          <span class="vc-file-input__chip-text">${file.name}</span>
          ${this._clearable ? `<button class="vc-file-input__chip-close" data-file="${file.name}">×</button>` : ''}
        </div>
      `;
    }).join('');
  }

  _renderCounter() {
    if (!this._counter) {
      return '';
    }

    return `
      <div class="vc-file-input__counter">
        ${this.files.length} ${this.files.length === 1 ? 'file' : 'files'}
      </div>
    `;
  }

  _render() {
    const hasFiles = this.files.length > 0;
    const displayText = hasFiles ? this._formatFileNames() : this._placeholder;
    const showPlaceholder = this._persistentPlaceholder || !hasFiles;
    const colorStyle = this._getColorStyle();
    const densityClass = this._getDensityClass();
    const variantClass = this._getVariantClass();

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .vc-file-input {
          position: relative;
          width: 100%;
        }
        
        .vc-file-input__input {
          position: absolute;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
        }
        
        .vc-file-input__field {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 56px;
          padding: 16px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-sizing: border-box;
          position: relative;
        }
        
        .vc-file-input--variant-filled .vc-file-input__field {
          background-color: rgba(0, 0, 0, 0.06);
        }
        
        .vc-file-input--variant-outlined .vc-file-input__field {
          border: 1px solid rgba(0, 0, 0, 0.38);
        }
        
        .vc-file-input--variant-plain .vc-file-input__field {
          padding-left: 0;
          padding-right: 0;
        }
        
        .vc-file-input--variant-underlined .vc-file-input__field {
          border-bottom: 1px solid rgba(0, 0, 0, 0.38);
          border-radius: 0;
        }
        
        .vc-file-input--variant-solo .vc-file-input__field {
          background-color: #fff;
          box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        }
        
        .vc-file-input--density-comfortable .vc-file-input__field {
          min-height: 48px;
          padding: 12px;
        }
        
        .vc-file-input--density-compact .vc-file-input__field {
          min-height: 40px;
          padding: 8px;
        }
        
        .vc-file-input__field:hover:not(.vc-file-input__field--disabled) {
          background-color: ${this._variant === 'filled' ? 'rgba(0, 0, 0, 0.12)' : ''};
          border-color: ${this._variant === 'outlined' || this._variant === 'underlined' ? 'rgba(0, 0, 0, 0.87)' : ''};
        }
        
        .vc-file-input__field--disabled {
          cursor: default;
          opacity: 0.6;
          pointer-events: none;
        }
        
        .vc-file-input__field--error {
          border-color: #f44336 !important;
        }
        
        .vc-file-input__field--error .vc-file-input__text {
          color: #f44336;
        }
        
        .vc-file-input__label {
          position: absolute;
          top: ${hasFiles || showPlaceholder ? '8px' : '50%'};
          left: ${this._variant === 'plain' ? '0' : '12px'};
          transform: translateY(${hasFiles || showPlaceholder ? '0' : '-50%'});
          font-size: ${hasFiles || showPlaceholder ? '12px' : '16px'};
          color: rgba(0, 0, 0, 0.6);
          transition: all 0.2s ease;
          pointer-events: none;
          ${this._error ? 'color: #f44336;' : ''}
          ${hasFiles ? `color: ${colorStyle};` : ''}
        }
        
        .vc-file-input__text {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: ${hasFiles || showPlaceholder ? '16px' : '0'};
          font-size: 16px;
          color: ${hasFiles ? 'rgba(0, 0, 0, 0.87)' : 'rgba(0, 0, 0, 0.6)'};
        }
        
        .vc-file-input__prepend {
          display: flex;
          align-items: center;
          margin-right: 8px;
          color: rgba(0, 0, 0, 0.54);
        }
        
        .vc-file-input__clear {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin-left: 8px;
          color: rgba(0, 0, 0, 0.54);
          background: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          outline: none;
          transition: background-color 0.2s ease;
        }
        
        .vc-file-input__clear:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        .vc-file-input__counter {
          margin-top: 4px;
          font-size: 12px;
          text-align: right;
          color: rgba(0, 0, 0, 0.6);
        }
        
        .vc-file-input__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }
        
        .vc-file-input__chip {
          display: flex;
          align-items: center;
          height: 32px;
          padding: 0 12px;
          background-color: rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          font-size: 14px;
        }
        
        .vc-file-input__chip-text {
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .vc-file-input__chip-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          margin-left: 4px;
          background: transparent;
          border: none;
          border-radius: 50%;
          font-size: 18px;
          line-height: 1;
          color: rgba(0, 0, 0, 0.54);
          cursor: pointer;
        }
        
        .vc-file-input__chip-close:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        .vc-file-input__error-messages {
          margin-top: 4px;
          font-size: 12px;
          color: #f44336;
        }
      </style>
      
      <div class="vc-file-input ${densityClass} ${variantClass}">
        <input 
          type="file" 
          class="vc-file-input__input" 
          ${this._multiple ? 'multiple' : ''} 
          ${this._accept ? `accept="${this._accept}"` : ''} 
          ${this._disabled ? 'disabled' : ''}
        >
        
        <div class="vc-file-input__field ${this._disabled ? 'vc-file-input__field--disabled' : ''} ${this._error ? 'vc-file-input__field--error' : ''}">
          ${this._label ? `<div class="vc-file-input__label">${this._label}</div>` : ''}
          
          ${this._prependIcon ? `
            <div class="vc-file-input__prepend">
              <span class="material-icons">${this._prependIcon}</span>
            </div>
          ` : ''}
          
          ${this._chips ? `
            <div class="vc-file-input__chips">
              ${this._renderChips()}
            </div>
          ` : `
            <div class="vc-file-input__text">
              ${showPlaceholder ? displayText : ''}
            </div>
          `}
          
          ${this._clearable && hasFiles ? `
            <button class="vc-file-input__clear" type="button">
              <span class="material-icons">close</span>
            </button>
          ` : ''}
        </div>
        
        ${this._renderCounter()}
        
        ${this._error && this._errorMessages.length > 0 ? `
          <div class="vc-file-input__error-messages">
            ${this._errorMessages.map(msg => `<div>${msg}</div>`).join('')}
          </div>
        ` : ''}
      </div>
    `;

    // Set up event listeners for chip close buttons
    if (this._chips && this._clearable) {
      const chipCloseButtons = this.shadowRoot.querySelectorAll('.vc-file-input__chip-close');
      chipCloseButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const fileName = btn.getAttribute('data-file');
          this.files = this.files.filter(file => file.name !== fileName);

          // Dispatch change event
          this.dispatchEvent(new CustomEvent('change', {
            detail: { files: this.files },
            bubbles: true,
            composed: true
          }));

          this._render();
        });
      });
    }
  }

  // Public methods
  setFiles(files) {
    this.files = this._multiple ? (Array.isArray(files) ? files : [files]) : [files[0]];
    this._render();
  }

  clearFiles() {
    this.files = [];

    // Reset the input value
    const input = this.shadowRoot.querySelector('.vc-file-input__input');
    if (input) {
      input.value = '';
    }

    this._render();
  }

  setErrorMessages(messages) {
    this._errorMessages = Array.isArray(messages) ? messages : [messages];
    this._error = this._errorMessages.length > 0;
    this._render();
  }

  // Getters and setters
  get multiple() {
    return this._multiple;
  }

  set multiple(value) {
    this._multiple = Boolean(value);
    this.setAttribute('multiple', '');
    this._render();
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
    this._render();
  }

  get accept() {
    return this._accept;
  }

  set accept(value) {
    this._accept = value;
    this.setAttribute('accept', value);
    this._render();
  }

  get label() {
    return this._label;
  }

  set label(value) {
    this._label = value;
    this.setAttribute('label', value);
    this._render();
  }

  get placeholder() {
    return this._placeholder;
  }

  set placeholder(value) {
    this._placeholder = value;
    this.setAttribute('placeholder', value);
    this._render();
  }

  get clearable() {
    return this._clearable;
  }

  set clearable(value) {
    this._clearable = Boolean(value);
    this.setAttribute('clearable', value ? 'true' : 'false');
    this._render();
  }

  get persistentPlaceholder() {
    return this._persistentPlaceholder;
  }

  set persistentPlaceholder(value) {
    this._persistentPlaceholder = Boolean(value);
    if (this._persistentPlaceholder) {
      this.setAttribute('persistent-placeholder', '');
    } else {
      this.removeAttribute('persistent-placeholder');
    }
    this._render();
  }

  get prependIcon() {
    return this._prependIcon;
  }

  set prependIcon(value) {
    this._prependIcon = value;
    this.setAttribute('prepend-icon', value);
    this._render();
  }

  get counter() {
    return this._counter;
  }

  set counter(value) {
    this._counter = Boolean(value);
    if (this._counter) {
      this.setAttribute('counter', '');
    } else {
      this.removeAttribute('counter');
    }
    this._render();
  }

  get chips() {
    return this._chips;
  }

  set chips(value) {
    this._chips = Boolean(value);
    if (this._chips) {
      this.setAttribute('chips', '');
    } else {
      this.removeAttribute('chips');
    }
    this._render();
  }

  get variant() {
    return this._variant;
  }

  set variant(value) {
    this._variant = value;
    this.setAttribute('variant', value);
    this._render();
  }

  get density() {
    return this._density;
  }

  set density(value) {
    this._density = value;
    this.setAttribute('density', value);
    this._render();
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
    this.setAttribute('color', value);
    this._render();
  }

  get error() {
    return this._error;
  }

  set error(value) {
    this._error = Boolean(value);
    if (this._error) {
      this.setAttribute('error', '');
    } else {
      this.removeAttribute('error');
    }
    this._render();
  }
}

// Define the custom element
customElements.define('vc-file-input', VcFileInput);

export default VcFileInput;