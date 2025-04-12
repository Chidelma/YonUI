/**
 * Material 2 Divider Web Component
 * A custom element that creates dividers in Material Design 2 style
 */
class VcDivider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create styles
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        :host([hidden]) {
          display: none;
        }
        
        .divider {
          display: block;
          margin: 0;
          border: none;
        }
        
        /* Default (horizontal) divider */
        :host(:not([vertical])) .divider {
          height: 1px;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.12);
        }
        
        /* Light theme inset divider (horizontal) */
        :host(:not([vertical])[inset]) .divider {
          margin-left: 72px;
          width: calc(100% - 72px);
        }
        
        /* Vertical divider */
        :host([vertical]) .divider {
          height: 100%;
          width: 1px;
          background-color: rgba(0, 0, 0, 0.12);
        }
        
        /* Light theme inset divider (vertical) */
        :host([vertical][inset]) .divider {
          margin-top: 8px;
          margin-bottom: 8px;
          height: calc(100% - 16px);
        }
        
        /* Dark theme */
        :host([theme="dark"]) .divider {
          background-color: rgba(255, 255, 255, 0.12);
        }
      </style>
      <hr class="divider">
    `;
  }

  /**
   * Web component lifecycle callback
   * Called when the element is inserted into the DOM
   */
  connectedCallback() {
    // Set ARIA role for accessibility
    if (this.getAttribute('vertical') !== null) {
      this.setAttribute('role', 'separator');
      this.setAttribute('aria-orientation', 'vertical');
    } else {
      this.setAttribute('role', 'separator');
      this.setAttribute('aria-orientation', 'horizontal');
    }
  }

  /**
   * Web component lifecycle callback
   * Called when observed attributes change
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'vertical') {
      if (newValue !== null) {
        this.setAttribute('aria-orientation', 'vertical');
      } else {
        this.setAttribute('aria-orientation', 'horizontal');
      }
    }
  }

  /**
   * Define which attributes to observe for changes
   */
  static get observedAttributes() {
    return ['vertical', 'inset', 'theme'];
  }
}

// Register the custom element
customElements.define('vc-divider', VcDivider);

export default VcDivider;