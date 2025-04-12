/**
 * Material 2 Lists Web Component
 * 
 * A customizable list component implementing Material Design 2 styling and behavior
 * using Web Component standards.
 */
class List extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._items = [];
    this._twoLine = false;
    this._avatar = false;
    this._interactive = false;
    this._dense = false;
    this._dividers = false;
    this.render();
  }

  static get observedAttributes() {
    return ['two-line', 'avatar', 'interactive', 'dense', 'dividers'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'two-line':
          this._twoLine = newValue !== null;
          break;
        case 'avatar':
          this._avatar = newValue !== null;
          break;
        case 'interactive':
          this._interactive = newValue !== null;
          break;
        case 'dense':
          this._dense = newValue !== null;
          break;
        case 'dividers':
          this._dividers = newValue !== null;
          break;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.upgradeItems();
    this.render();

    // Set up mutation observer to handle dynamically added items
    this._observer = new MutationObserver(mutations => {
      let needsUpdate = false;

      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        this.upgradeItems();
        this.render();
      }
    });

    this._observer.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
    }
  }

  upgradeItems() {
    // Query for all list items and set up event listeners
    this._items = Array.from(this.querySelectorAll('vc-list-item'));

    if (this._interactive) {
      this._items.forEach(item => {
        if (!item._listenerAttached) {
          item.addEventListener('click', this._handleItemClick.bind(this));
          item._listenerAttached = true;
        }
      });
    }
  }

  _handleItemClick(event) {
    const item = event.currentTarget;

    // Create and dispatch custom event
    const customEvent = new CustomEvent('vc-list-item-click', {
      bubbles: true,
      composed: true,
      detail: {
        item,
        index: this._items.indexOf(item)
      }
    });

    this.dispatchEvent(customEvent);
  }

  render() {
    const style = `
      :host {
        display: block;
        font-family: Roboto, sans-serif;
        color: rgba(0, 0, 0, 0.87);
        background-color: #fff;
        border-radius: 4px;
      }
      
      ::slotted(vc-list-item) {
        display: flex;
        position: relative;
        align-items: center;
        padding: ${this._dense ? '8px 16px' : '16px'};
        min-height: ${this._dense ? '40px' : '48px'};
        transition: background-color 0.15s ease;
      }
      
      ${this._interactive ? `
        ::slotted(vc-list-item) {
          cursor: pointer;
        }
        
        ::slotted(vc-list-item:hover) {
          background-color: rgba(0, 0, 0, 0.04);
        }
      ` : ''}
      
      ${this._dividers ? `
        ::slotted(vc-list-item:not(:last-child))::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: rgba(0, 0, 0, 0.12);
        }
      ` : ''}
      
      ::slotted(vc-list-item[selected]) {
        background-color: rgba(0, 0, 0, 0.12);
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      <slot></slot>
    `;
  }
}

class ListItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._selected = false;
    this.render();
  }

  static get observedAttributes() {
    return ['selected'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name === 'selected') {
      this._selected = newValue !== null;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  get selected() {
    return this._selected;
  }

  set selected(value) {
    if (value) {
      this.setAttribute('selected', '');
    } else {
      this.removeAttribute('selected');
    }
  }

  render() {
    const style = `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
      }
      
      .avatar-slot {
        display: flex;
        margin-right: 16px;
        flex-shrink: 0;
      }
      
      .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0;
      }
      
      .primary {
        font-size: 16px;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .secondary {
        font-size: 14px;
        line-height: 1.25;
        color: rgba(0, 0, 0, 0.54);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .meta-slot {
        margin-left: 16px;
        flex-shrink: 0;
      }
    `;

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      <div class="avatar-slot">
        <slot name="avatar"></slot>
      </div>
      <div class="content">
        <div class="primary">
          <slot name="primary"></slot>
          <slot></slot>
        </div>
        <div class="secondary">
          <slot name="secondary"></slot>
        </div>
      </div>
      <div class="meta-slot">
        <slot name="meta"></slot>
      </div>
    `;
  }
}

// Define the custom elements
customElements.define('vc-list', List);
customElements.define('vc-list-item', ListItem);

export { List, ListItem };