// Material 2 Spacer Web Component inspired by Vuetify v3
// vc-spacer.js

class MaterialSpacer extends HTMLElement {
    static get observedAttributes() {
        return ['size', 'direction'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._size = 1;
        this._direction = 'vertical';
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (name === 'size') {
            this._size = newValue ? parseInt(newValue, 10) : 1;
        } else if (name === 'direction') {
            this._direction = newValue === 'horizontal' ? 'horizontal' : 'vertical';
        }

        this._render();
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this.setAttribute('size', value);
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        this.setAttribute('direction', value);
    }

    _render() {
        const styles = `
        :host {
          display: block;
        }
        .spacer {
          display: block;
        }
        .vertical {
          height: ${this._size * 4}px;
          min-height: ${this._size * 4}px;
          max-height: ${this._size * 4}px;
        }
        .horizontal {
          width: ${this._size * 4}px;
          min-width: ${this._size * 4}px;
          max-width: ${this._size * 4}px;
          display: inline-block;
        }
      `;

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="spacer ${this._direction}"></div>
      `;
    }
}

// Define the custom element
customElements.define('vc-spacer', MaterialSpacer);

export default MaterialSpacer;