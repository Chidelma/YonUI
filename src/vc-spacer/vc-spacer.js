// material-spacer.js
// A Material 2 Spacer web component inspired by Vuetify v3

class MaterialSpacer extends HTMLElement {
    static get observedAttributes() {
        return ['size', 'grow', 'direction'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    get size() {
        return this.getAttribute('size') || '1';
    }

    get grow() {
        return this.hasAttribute('grow');
    }

    get direction() {
        return this.getAttribute('direction') || 'both';
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: block;
          --size-multiplier: ${this.size};
          --space-amount: calc(var(--size-multiplier) * 8px);
        }
        
        :host([grow]) {
          flex-grow: 1;
        }
        
        :host([direction="vertical"]) {
          height: var(--space-amount);
          min-height: var(--space-amount);
          width: initial;
          min-width: initial;
        }
        
        :host([direction="horizontal"]) {
          width: var(--space-amount);
          min-width: var(--space-amount);
          height: initial;
          min-height: initial;
        }
        
        :host([direction="both"]) {
          width: var(--space-amount);
          min-width: var(--space-amount);
          height: var(--space-amount);
          min-height: var(--space-amount);
        }
      `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
    }
}

// Define the custom element
customElements.define('vc-spacer', MaterialSpacer);

export default MaterialSpacer;