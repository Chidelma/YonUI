/**
 * Material Design 2 inspired Dialog Web Component
 * 
 * A lightweight, customizable dialog component that follows Material Design 2 principles
 * 
 * @class VcDialog
 * @extends HTMLElement
 */
class VcDialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create the dialog structure
        this.shadowRoot.innerHTML = `
        <style>
          :host {
            --vc-dialog-width: 280px;
            --vc-dialog-max-width: 80vw;
            --vc-dialog-max-height: 80vh;
            --vc-dialog-border-radius: 4px;
            --vc-dialog-bg-color: #ffffff;
            --vc-dialog-text-color: rgba(0, 0, 0, 0.87);
            --vc-dialog-secondary-text-color: rgba(0, 0, 0, 0.6);
            --vc-dialog-divider-color: rgba(0, 0, 0, 0.12);
            --vc-dialog-scrim-color: rgba(0, 0, 0, 0.32);
            --vc-dialog-elevation: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
                                   0 16px 24px 2px rgba(0, 0, 0, 0.14),
                                   0 6px 30px 5px rgba(0, 0, 0, 0.12);
            --vc-dialog-title-font-size: 20px;
            --vc-dialog-content-font-size: 16px;
            
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            align-items: center;
            justify-content: center;
          }
  
          :host([open]) {
            display: flex;
          }
  
          .vc-dialog-scrim {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--vc-dialog-scrim-color);
          }
  
          .vc-dialog-container {
            position: relative;
            display: flex;
            flex-direction: column;
            width: var(--vc-dialog-width);
            max-width: var(--vc-dialog-max-width);
            max-height: var(--vc-dialog-max-height);
            background-color: var(--vc-dialog-bg-color);
            color: var(--vc-dialog-text-color);
            border-radius: var(--vc-dialog-border-radius);
            box-shadow: var(--vc-dialog-elevation);
            overflow: hidden;
            z-index: 1;
            transform: scale(0.8);
            opacity: 0;
            transition: transform 0.15s cubic-bezier(0, 0, 0.2, 1),
                        opacity 0.15s cubic-bezier(0, 0, 0.2, 1);
          }
  
          :host([open]) .vc-dialog-container {
            transform: scale(1);
            opacity: 1;
          }
  
          .vc-dialog-title {
            padding: 24px 24px 16px;
            font-size: var(--vc-dialog-title-font-size);
            font-weight: 500;
            line-height: 1.4;
            letter-spacing: 0.0125em;
          }
  
          .vc-dialog-content {
            flex: 1;
            padding: 0 24px 20px;
            font-size: var(--vc-dialog-content-font-size);
            line-height: 1.5;
            color: var(--vc-dialog-secondary-text-color);
            overflow-y: auto;
          }
  
          .vc-dialog-actions {
            display: flex;
            justify-content: flex-end;
            padding: 8px;
          }
  
          .vc-dialog-actions ::slotted(button) {
            margin-left: 8px;
            padding: 8px 8px;
            min-width: 64px;
            font-family: inherit;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.0892857143em;
            border: none;
            border-radius: 4px;
            background: transparent;
            color: #6200ee;
            cursor: pointer;
            transition: background-color 0.2s;
          }
  
          .vc-dialog-actions ::slotted(button:hover) {
            background-color: rgba(98, 0, 238, 0.08);
          }
  
          .vc-dialog-actions ::slotted(button[data-primary]) {
            background-color: #6200ee;
            color: white;
          }
  
          .vc-dialog-actions ::slotted(button[data-primary]:hover) {
            background-color: #5000d1;
          }
        </style>
  
        <div class="vc-dialog-scrim"></div>
        <div class="vc-dialog-container">
          <div class="vc-dialog-title">
            <slot name="title">Dialog Title</slot>
          </div>
          <div class="vc-dialog-content">
            <slot></slot>
          </div>
          <div class="vc-dialog-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      `;

        // Get elements
        this.scrim = this.shadowRoot.querySelector('.vc-dialog-scrim');
        this.container = this.shadowRoot.querySelector('.vc-dialog-container');

        // Bind methods
        this._handleKeydown = this._handleKeydown.bind(this);
        this._handleScrimClick = this._handleScrimClick.bind(this);
    }

    /**
     * Called when the element is connected to the DOM
     */
    connectedCallback() {
        this.scrim.addEventListener('click', this._handleScrimClick);
        if (this.hasAttribute('open')) {
            this._addGlobalListeners();
        }
    }

    /**
     * Called when the element is disconnected from the DOM
     */
    disconnectedCallback() {
        this.scrim.removeEventListener('click', this._handleScrimClick);
        this._removeGlobalListeners();
    }

    /**
     * Add global event listeners when dialog is open
     * @private
     */
    _addGlobalListeners() {
        document.addEventListener('keydown', this._handleKeydown);
        // Prevent scrolling on body when dialog is open
        document.body.style.overflow = 'hidden';
    }

    /**
     * Remove global event listeners when dialog is closed
     * @private
     */
    _removeGlobalListeners() {
        document.removeEventListener('keydown', this._handleKeydown);
        // Restore scrolling on body
        document.body.style.overflow = '';
    }

    /**
     * Handle keydown events
     * @param {KeyboardEvent} event - The keydown event
     * @private
     */
    _handleKeydown(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    /**
     * Handle scrim click
     * @private
     */
    _handleScrimClick() {
        if (this.hasAttribute('modal')) return;
        this.close();
    }

    /**
     * Observed attributes that trigger attributeChangedCallback
     * @returns {string[]} Array of attribute names to observe
     */
    static get observedAttributes() {
        return ['open'];
    }

    /**
     * Called when observed attributes change
     * @param {string} name - The attribute name
     * @param {string} oldValue - The old attribute value
     * @param {string} newValue - The new attribute value
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            if (newValue !== null) {
                this._addGlobalListeners();
                this.dispatchEvent(new CustomEvent('vc-dialog-open'));
            } else {
                this._removeGlobalListeners();
                this.dispatchEvent(new CustomEvent('vc-dialog-close'));
            }
        }
    }

    /**
     * Open the dialog
     */
    open() {
        if (!this.hasAttribute('open')) {
            this.setAttribute('open', '');
        }
    }

    /**
     * Close the dialog
     */
    close() {
        if (this.hasAttribute('open')) {
            this.removeAttribute('open');
        }
    }
}

// Register the custom element
customElements.define('vc-dialog', VcDialog);

export default VcDialog;