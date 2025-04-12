/**
 * vc-btn-toggle - Material 2 Button toggles web component inspired by Vuetify v3
 * 
 * A customizable button toggle component that allows users to select one or multiple options
 * from a group of buttons.
 */

class VcBtnToggle extends HTMLElement {
    constructor() {
        super();
        this._selected = [];
        this._multiple = false;
        this._mandatory = false;
        this._dense = false;
        this._color = 'primary';
        this._variant = 'outlined';

        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get observedAttributes() {
        return ['multiple', 'mandatory', 'dense', 'color', 'variant', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'multiple':
                this._multiple = newValue !== null;
                break;
            case 'mandatory':
                this._mandatory = newValue !== null;
                break;
            case 'dense':
                this._dense = newValue !== null;
                break;
            case 'color':
                this._color = newValue || 'primary';
                break;
            case 'variant':
                this._variant = newValue || 'outlined';
                break;
            case 'value':
                try {
                    this._selected = newValue ? JSON.parse(newValue) : [];
                    if (!Array.isArray(this._selected)) {
                        this._selected = [this._selected];
                    }
                } catch (e) {
                    this._selected = newValue ? [newValue] : [];
                }
                break;
        }

        this.render();
        this.updateButtons();
    }

    connectedCallback() {
        this.upgradeProperty('multiple');
        this.upgradeProperty('mandatory');
        this.upgradeProperty('dense');
        this.upgradeProperty('color');
        this.upgradeProperty('variant');
        this.upgradeProperty('value');

        // Setup mutation observer to handle dynamically added buttons
        this._observer = new MutationObserver(() => {
            this.setupButtons();
            this.updateButtons();
        });

        this._observer.observe(this, {
            childList: true,
            subtree: false
        });

        this.setupButtons();
        this.updateButtons();
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }

        // Remove event listeners from buttons
        this.querySelectorAll('button').forEach(button => {
            button.removeEventListener('click', this.handleButtonClick);
        });
    }

    upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            const value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }

    get multiple() {
        return this._multiple;
    }

    set multiple(value) {
        if (value) {
            this.setAttribute('multiple', '');
        } else {
            this.removeAttribute('multiple');
        }
    }

    get mandatory() {
        return this._mandatory;
    }

    set mandatory(value) {
        if (value) {
            this.setAttribute('mandatory', '');
        } else {
            this.removeAttribute('mandatory');
        }
    }

    get dense() {
        return this._dense;
    }

    set dense(value) {
        if (value) {
            this.setAttribute('dense', '');
        } else {
            this.removeAttribute('dense');
        }
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this.setAttribute('color', value);
    }

    get variant() {
        return this._variant;
    }

    set variant(value) {
        this.setAttribute('variant', value);
    }

    get value() {
        return this._selected;
    }

    set value(val) {
        let newValue = val;
        if (!Array.isArray(newValue)) {
            newValue = [newValue];
        }

        this.setAttribute('value', JSON.stringify(newValue));
    }

    render() {
        const buttonGroupStyles = `
        :host {
          display: inline-flex;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid transparent;
          box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
        }
        
        :host([variant="text"]) {
          box-shadow: none;
          border: none;
        }
        
        :host([variant="outlined"]) {
          box-shadow: none;
          border: 1px solid rgba(0,0,0,.12);
        }
        
        ::slotted(button) {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 64px;
          height: 36px;
          padding: 0 16px;
          margin: 0;
          overflow: hidden;
          vertical-align: middle;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          outline: none;
          background-color: transparent;
          color: rgba(0,0,0,.87);
          font-family: Roboto, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.0892857143em;
          text-decoration: none;
          text-align: center;
          transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          user-select: none;
          -webkit-appearance: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        :host([dense]) ::slotted(button) {
          height: 28px;
          min-width: 48px;
          padding: 0 12px;
          font-size: 0.8125rem;
        }
        
        ::slotted(button:not(:last-child)) {
          border-right: 1px solid rgba(0,0,0,.12);
        }
        
        ::slotted(button:hover) {
          background-color: rgba(0,0,0,.04);
        }
        
        ::slotted(button[selected]) {
          background-color: var(--btn-toggle-color, rgba(25, 118, 210, 0.12));
          color: var(--btn-toggle-text-color, #1976d2);
        }
        
        ::slotted(button:focus) {
          outline: none;
        }
        
        /* Color variants */
        :host([color="primary"]) {
          --btn-toggle-color: rgba(25, 118, 210, 0.12);
          --btn-toggle-text-color: #1976d2;
        }
        
        :host([color="secondary"]) {
          --btn-toggle-color: rgba(156, 39, 176, 0.12);
          --btn-toggle-text-color: #9c27b0;
        }
        
        :host([color="success"]) {
          --btn-toggle-color: rgba(76, 175, 80, 0.12);
          --btn-toggle-text-color: #4caf50;
        }
        
        :host([color="error"]) {
          --btn-toggle-color: rgba(244, 67, 54, 0.12);
          --btn-toggle-text-color: #f44336;
        }
        
        :host([color="warning"]) {
          --btn-toggle-color: rgba(255, 152, 0, 0.12);
          --btn-toggle-text-color: #ff9800;
        }
        
        :host([color="info"]) {
          --btn-toggle-color: rgba(3, 169, 244, 0.12);
          --btn-toggle-text-color: #03a9f4;
        }
      `;

        this.shadowRoot.innerHTML = `
        <style>${buttonGroupStyles}</style>
        <slot></slot>
      `;
    }

    setupButtons() {
        // Add click handler to all child buttons
        this.querySelectorAll('button').forEach(button => {
            button.removeEventListener('click', this.handleButtonClick.bind(this));
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });
    }

    updateButtons() {
        const buttons = this.querySelectorAll('button');
        buttons.forEach(button => {
            const value = button.value || button.textContent;

            if (this._selected.includes(value)) {
                button.setAttribute('selected', '');
            } else {
                button.removeAttribute('selected');
            }
        });
    }

    handleButtonClick(event) {
        const button = event.currentTarget;
        const value = button.value || button.textContent;
        let newSelected = [...this._selected];

        if (this._multiple) {
            // Handle multiple selection
            const valueIndex = newSelected.indexOf(value);

            if (valueIndex >= 0) {
                // Already selected, unselect it if not mandatory or if there are other selected items
                if (!this._mandatory || newSelected.length > 1) {
                    newSelected.splice(valueIndex, 1);
                }
            } else {
                // Not yet selected, select it
                newSelected.push(value);
            }
        } else {
            // Handle single selection
            if (newSelected.includes(value)) {
                // Already selected, unselect it if not mandatory
                if (!this._mandatory) {
                    newSelected = [];
                }
            } else {
                // Not yet selected, select it (replacing any previous selection)
                newSelected = [value];
            }
        }

        this._selected = newSelected;
        this.setAttribute('value', JSON.stringify(newSelected));
        this.updateButtons();

        // Dispatch change event
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.multiple ? this._selected : this._selected[0] || null
            },
            bubbles: true,
            composed: true
        }));
    }
}

// Define the custom element
customElements.define('vc-btn-toggle', VcBtnToggle);

export default VcBtnToggle;