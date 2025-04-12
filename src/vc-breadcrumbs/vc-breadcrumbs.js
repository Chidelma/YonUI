// material-breadcrumbs.js
// A Material Design 2 Breadcrumbs web component inspired by Vuetify v3

class Breadcrumbs extends HTMLElement {
    constructor() {
        super();
        this._items = [];
        this._divider = '/';
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['divider', 'dark'];
    }

    connectedCallback() {
        this._processSlotItems();
        this._render();

        // Add mutation observer to handle dynamic changes to the component's children
        this._observer = new MutationObserver(() => {
            this._processSlotItems();
            this._render();
        });

        this._observer.observe(this, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true
        });
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'divider' && oldValue !== newValue) {
            this._divider = newValue;
            this._render();
        } else if (name === 'dark' && oldValue !== newValue) {
            this._render();
        }
    }

    _processSlotItems() {
        this._items = [];
        const items = this.querySelectorAll('vc-breadcrumb-item');

        items.forEach((item, index) => {
            const text = item.textContent.trim();
            const href = item.getAttribute('href') || null;
            const disabled = item.hasAttribute('disabled');
            const active = index === items.length - 1 || item.hasAttribute('active');

            this._items.push({
                text,
                href,
                disabled,
                active
            });
        });
    }

    _render() {
        const isDark = this.hasAttribute('dark');

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            align-items: center;
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            padding: 8px 0;
          }
          
          .breadcrumbs {
            display: flex;
            flex-wrap: wrap;
            flex: 0 1 auto;
            list-style-type: none;
            margin: 0;
            padding: 0;
            background: transparent;
          }
          
          .breadcrumb-item {
            display: inline-flex;
            align-items: center;
            position: relative;
            color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
            transition: color 0.2s ease;
          }
          
          .breadcrumb-item.active {
            color: ${isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.87)'};
            font-weight: 500;
            pointer-events: none;
          }
          
          .breadcrumb-item.disabled {
            color: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'};
            pointer-events: none;
          }
          
          .breadcrumb-item a {
            color: inherit;
            text-decoration: none;
            outline: none;
          }
          
          .breadcrumb-item:not(.active):not(.disabled):hover {
            color: ${isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.87)'};
          }
          
          .breadcrumb-divider {
            padding: 0 8px;
            color: ${isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'};
            user-select: none;
          }
        </style>
        
        <nav aria-label="Breadcrumb">
          <ol class="breadcrumbs" role="list">
            ${this._items.map((item, index) => `
              <li class="breadcrumb-item ${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}" 
                  ${item.active ? 'aria-current="page"' : ''}>
                ${this._renderItem(item)}
              </li>
              ${index < this._items.length - 1 ?
                `<li class="breadcrumb-divider" aria-hidden="true">${this._divider}</li>` : ''}
            `).join('')}
          </ol>
        </nav>
      `;
    }

    _renderItem(item) {
        if (item.href && !item.disabled && !item.active) {
            return `<a href="${item.href}">${item.text}</a>`;
        } else {
            return item.text;
        }
    }

    // Public API
    set divider(value) {
        this.setAttribute('divider', value);
    }

    get divider() {
        return this._divider;
    }
}

class BreadcrumbItem extends HTMLElement {
    static get observedAttributes() {
        return ['href', 'disabled', 'active'];
    }

    attributeChangedCallback() {
        // Trigger update in parent component
        const event = new CustomEvent('breadcrumb-item-changed', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }
}

// Define custom elements
customElements.define('vc-breadcrumbs', Breadcrumbs);
customElements.define('vc-breadcrumb-item',BreadcrumbItem);

export { MaterialBreadcrumbs, MaterialBreadcrumbItem };