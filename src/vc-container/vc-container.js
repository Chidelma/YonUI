// material-container.js
// A Material 2 Container web component inspired by Vuetify v3

class MaterialContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create styles and container
        this._createComponent();
    }

    static get observedAttributes() {
        return ['fluid', 'class', 'tag', 'max-width'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        this._createComponent();
    }

    _createComponent() {
        const isFluid = this.hasAttribute('fluid');
        const maxWidth = this.getAttribute('max-width') || null;
        const customClass = this.getAttribute('class') || '';

        // Create the container element
        const container = document.createElement('div');
        container.classList.add('v-container');

        if (isFluid) {
            container.classList.add('v-container--fluid');
        }

        if (customClass) {
            customClass.split(' ').forEach(cls => {
                if (cls) container.classList.add(cls);
            });
        }

        // Apply styling
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: block;
        }
        
        .v-container {
          width: 100%;
          padding: 16px;
          margin-right: auto;
          margin-left: auto;
          box-sizing: border-box;
        }
        
        @media (min-width: 960px) {
          .v-container:not(.v-container--fluid) {
            max-width: 900px;
          }
        }
        
        @media (min-width: 1280px) {
          .v-container:not(.v-container--fluid) {
            max-width: 1185px;
          }
        }
        
        @media (min-width: 1920px) {
          .v-container:not(.v-container--fluid) {
            max-width: 1785px;
          }
        }
        
        .v-container--fluid {
          max-width: 100%;
        }
      `;

        // Apply custom max-width if provided
        if (maxWidth) {
            container.style.maxWidth = maxWidth;
        }

        // Clear the shadow DOM and append the new elements
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);

        // Move all child nodes to the container
        while (this.childNodes.length > 0) {
            container.appendChild(this.childNodes[0]);
        }

        this.shadowRoot.appendChild(container);
    }

    // When elements are added or removed, update the component
    connectedCallback() {
        // Create a mutation observer to watch for changes to the component's children
        this._observer = new MutationObserver(() => {
            this._createComponent();
        });

        this._observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }
}

// Define the custom element
customElements.define('vc-container', MaterialContainer);

export default MaterialContainer;