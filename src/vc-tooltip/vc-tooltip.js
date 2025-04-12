/**
 * vc-tooltip.js
 * A Material Design 2 inspired tooltip web component
 */

class VcTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create tooltip element
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.className = 'tooltip-container';
        this._tooltipContainer.style.display = 'none';

        // Setup shadow DOM
        this.shadowRoot.innerHTML = `
        <style>
          :host {
            position: relative;
            display: inline-block;
          }
          
          .tooltip-container {
            position: absolute;
            background-color: rgba(97, 97, 97, 0.9);
            color: white;
            font-family: Roboto, 'Helvetica Neue', sans-serif;
            font-size: 10px;
            font-weight: 500;
            line-height: 14px;
            padding: 8px 16px;
            border-radius: 4px;
            pointer-events: none;
            white-space: nowrap;
            z-index: 1000;
            transition: opacity 0.2s, transform 0.2s;
            opacity: 0;
            transform: scale(0.9);
            box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 
                        0 6px 10px 0 rgba(0,0,0,.14), 
                        0 1px 18px 0 rgba(0,0,0,.12);
          }
          
          .tooltip-container.visible {
            opacity: 1;
            transform: scale(1);
          }
          
          /* Arrow styles */
          .tooltip-container::after {
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            border: 5px solid transparent;
          }
          
          .tooltip-container.top::after {
            border-top-color: rgba(97, 97, 97, 0.9);
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
          
          .tooltip-container.bottom::after {
            border-bottom-color: rgba(97, 97, 97, 0.9);
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
          }
          
          .tooltip-container.left::after {
            border-left-color: rgba(97, 97, 97, 0.9);
            top: 50%;
            left: 100%;
            transform: translateY(-50%);
          }
          
          .tooltip-container.right::after {
            border-right-color: rgba(97, 97, 97, 0.9);
            top: 50%;
            right: 100%;
            transform: translateY(-50%);
          }
          
          /* Slot style */
          ::slotted(*) {
            display: inline-block;
          }
        </style>
        <slot></slot>
      `;

        this.shadowRoot.appendChild(this._tooltipContainer);

        // Bind event handlers
        this._showTooltip = this._showTooltip.bind(this);
        this._hideTooltip = this._hideTooltip.bind(this);
        this._onSlotChange = this._onSlotChange.bind(this);

        // Default values
        this._position = 'top';
        this._delay = 500;
        this._hideDelay = 0;
        this._showTimeout = null;
        this._hideTimeout = null;
    }

    static get observedAttributes() {
        return ['text', 'position', 'delay', 'hide-delay'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'text':
                this._tooltipContainer.textContent = newValue;
                break;
            case 'position':
                this._position = newValue || 'top';
                this._updatePosition();
                break;
            case 'delay':
                this._delay = newValue ? parseInt(newValue, 10) : 500;
                break;
            case 'hide-delay':
                this._hideDelay = newValue ? parseInt(newValue, 10) : 0;
                break;
        }
    }

    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', this._onSlotChange);

        this._updatePosition();
        this._addEventListeners();
    }

    disconnectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        slot.removeEventListener('slotchange', this._onSlotChange);

        this._removeEventListeners();

        if (this._showTimeout) {
            clearTimeout(this._showTimeout);
            this._showTimeout = null;
        }

        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }
    }

    _onSlotChange() {
        this._addEventListeners();
    }

    _addEventListeners() {
        const children = this.shadowRoot.querySelector('slot').assignedElements();

        children.forEach(element => {
            element.addEventListener('mouseenter', this._showTooltip);
            element.addEventListener('focus', this._showTooltip);
            element.addEventListener('mouseleave', this._hideTooltip);
            element.addEventListener('blur', this._hideTooltip);
            element.addEventListener('touchstart', this._showTooltip, { passive: true });
            element.addEventListener('touchend', this._hideTooltip, { passive: true });
        });
    }

    _removeEventListeners() {
        const children = this.shadowRoot.querySelector('slot').assignedElements();

        children.forEach(element => {
            element.removeEventListener('mouseenter', this._showTooltip);
            element.removeEventListener('focus', this._showTooltip);
            element.removeEventListener('mouseleave', this._hideTooltip);
            element.removeEventListener('blur', this._hideTooltip);
            element.removeEventListener('touchstart', this._showTooltip);
            element.removeEventListener('touchend', this._hideTooltip);
        });
    }

    _showTooltip() {
        if (this._hideTimeout) {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = null;
        }

        this._showTimeout = setTimeout(() => {
            this._tooltipContainer.style.display = 'block';
            this._updatePosition();

            // Force reflow
            void this._tooltipContainer.offsetWidth;

            this._tooltipContainer.classList.add('visible');
        }, this._delay);
    }

    _hideTooltip() {
        if (this._showTimeout) {
            clearTimeout(this._showTimeout);
            this._showTimeout = null;
        }

        this._hideTimeout = setTimeout(() => {
            this._tooltipContainer.classList.remove('visible');

            setTimeout(() => {
                this._tooltipContainer.style.display = 'none';
            }, 200); // Match the CSS transition duration
        }, this._hideDelay);
    }

    _updatePosition() {
        // Remove all position classes
        this._tooltipContainer.classList.remove('top', 'bottom', 'left', 'right');

        // Add the current position class
        this._tooltipContainer.classList.add(this._position);

        if (!this.shadowRoot.querySelector('slot').assignedElements().length) {
            return;
        }

        const triggerElement = this.shadowRoot.querySelector('slot').assignedElements()[0];
        const triggerRect = triggerElement.getBoundingClientRect();

        // Reset positions
        this._tooltipContainer.style.top = '';
        this._tooltipContainer.style.bottom = '';
        this._tooltipContainer.style.left = '';
        this._tooltipContainer.style.right = '';

        // Calculate tooltip position
        const tooltipRect = this._tooltipContainer.getBoundingClientRect();

        switch (this._position) {
            case 'top':
                this._tooltipContainer.style.bottom = `${triggerRect.height + 8}px`;
                this._tooltipContainer.style.left = `${(triggerRect.width - tooltipRect.width) / 2}px`;
                break;
            case 'bottom':
                this._tooltipContainer.style.top = `${triggerRect.height + 8}px`;
                this._tooltipContainer.style.left = `${(triggerRect.width - tooltipRect.width) / 2}px`;
                break;
            case 'left':
                this._tooltipContainer.style.right = `${triggerRect.width + 8}px`;
                this._tooltipContainer.style.top = `${(triggerRect.height - tooltipRect.height) / 2}px`;
                break;
            case 'right':
                this._tooltipContainer.style.left = `${triggerRect.width + 8}px`;
                this._tooltipContainer.style.top = `${(triggerRect.height - tooltipRect.height) / 2}px`;
                break;
        }
    }
}

// Register the web component
customElements.define('vc-tooltip', VcTooltip);

export default VcTooltip;