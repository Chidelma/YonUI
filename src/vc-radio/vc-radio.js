// vc-radio.js
// Material Design 2 Radio Button Web Component

class VCRadio extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Initialize state
        this._checked = false;
        this._disabled = false;
        this._value = '';
        this._name = '';

        // Render the component
        this.render();

        // Bind event handlers
        this._onClick = this._onClick.bind(this);
    }

    // Define observed attributes
    static get observedAttributes() {
        return ['checked', 'disabled', 'value', 'name'];
    }

    // Lifecycle: when attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'checked':
                this._checked = newValue !== null;
                this._updateCheckedState();
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                this._updateDisabledState();
                break;
            case 'value':
                this._value = newValue || '';
                break;
            case 'name':
                this._name = newValue || '';
                break;
        }
    }

    // Lifecycle: when element is connected to DOM
    connectedCallback() {
        this.addEventListener('click', this._onClick);
        this._checked = this.hasAttribute('checked');
        this._disabled = this.hasAttribute('disabled');
        this._value = this.getAttribute('value') || '';
        this._name = this.getAttribute('name') || '';

        this._updateCheckedState();
        this._updateDisabledState();
    }

    // Lifecycle: when element is disconnected from DOM
    disconnectedCallback() {
        this.removeEventListener('click', this._onClick);
    }

    // Getters/setters for properties
    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = Boolean(value);
        this._updateCheckedState();
        if (this._checked) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = Boolean(value);
        this._updateDisabledState();
        if (this._disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.setAttribute('value', val);
    }

    get name() {
        return this._name;
    }

    set name(val) {
        this._name = val;
        this.setAttribute('name', val);
    }

    // Event handlers
    _onClick(event) {
        if (this._disabled) return;

        this.checked = true;

        // Dispatch change event
        const changeEvent = new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                checked: this.checked,
                value: this.value
            }
        });
        this.dispatchEvent(changeEvent);

        // If this radio button is part of a group (has a name), deselect others
        if (this._name) {
            this._uncheckSiblings();
        }
    }

    // Helper methods
    _uncheckSiblings() {
        // Only look for radio buttons with the same name
        const siblings = document.querySelectorAll(`vc-radio[name="${this._name}"]`);
        siblings.forEach(radio => {
            if (radio !== this && radio.checked) {
                radio.checked = false;
            }
        });
    }

    _updateCheckedState() {
        if (!this.shadowRoot) return;

        const innerCircle = this.shadowRoot.querySelector('.inner-circle');
        const outerCircle = this.shadowRoot.querySelector('.outer-circle');

        if (innerCircle && outerCircle) {
            if (this._checked) {
                innerCircle.classList.add('checked');
                outerCircle.classList.add('checked');
            } else {
                innerCircle.classList.remove('checked');
                outerCircle.classList.remove('checked');
            }
        }
    }

    _updateDisabledState() {
        if (!this.shadowRoot) return;

        const radio = this.shadowRoot.querySelector('.radio');

        if (radio) {
            if (this._disabled) {
                radio.classList.add('disabled');
            } else {
                radio.classList.remove('disabled');
            }
        }
    }

    // Render the component
    render() {
        const styles = `
        :host {
          display: inline-block;
          position: relative;
          width: 40px;
          height: 40px;
          vertical-align: middle;
          cursor: pointer;
        }
        
        :host([disabled]) {
          cursor: default;
          pointer-events: none;
        }
        
        .radio {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .outer-circle {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.54);
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }
        
        .inner-circle {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: transparent;
          transform: scale(0);
          transition: transform 0.15s ease, background-color 0.15s ease;
        }
        
        .outer-circle.checked {
          border-color: #1a73e8; /* Material Blue */
        }
        
        .inner-circle.checked {
          background-color: #1a73e8; /* Material Blue */
          transform: scale(1);
        }
        
        .radio:hover .outer-circle:not(.disabled) {
          border-color: rgba(0, 0, 0, 0.87);
        }
        
        .radio:hover .outer-circle.checked:not(.disabled) {
          border-color: #174ea6; /* Material Blue Darker */
        }
        
        .radio:hover .inner-circle.checked:not(.disabled) {
          background-color: #174ea6; /* Material Blue Darker */
        }
        
        .radio.disabled .outer-circle {
          border-color: rgba(0, 0, 0, 0.26);
        }
        
        .radio.disabled .inner-circle.checked {
          background-color: rgba(0, 0, 0, 0.26);
        }
        
        /* Ripple Effect */
        .ripple {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(26, 115, 232, 0.12);
          transform: scale(0);
          opacity: 1;
          pointer-events: none;
        }
        
        @keyframes ripple-effect {
          to {
            transform: scale(1);
            opacity: 0;
          }
        }
      `;

        const html = `
        <div class="radio">
          <div class="outer-circle ${this._checked ? 'checked' : ''}"></div>
          <div class="inner-circle ${this._checked ? 'checked' : ''}"></div>
          <div class="ripple"></div>
        </div>
      `;

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        ${html}
      `;

        // Add ripple effect on click
        const radio = this.shadowRoot.querySelector('.radio');
        const ripple = this.shadowRoot.querySelector('.ripple');

        radio.addEventListener('mousedown', () => {
            if (this._disabled) return;

            ripple.style.animation = 'none';

            // Force reflow
            void ripple.offsetWidth;

            ripple.style.animation = 'ripple-effect 0.3s ease-out forwards';
        });
    }
}

// Register the custom element
customElements.define('vc-radio', VCRadio);

export default VCRadio;