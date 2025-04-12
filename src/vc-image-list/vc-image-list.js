/**
 * Material 2 Image List Web Component
 * 
 * A custom element that recreates the functionality of Material 2 Image Lists
 * providing a responsive grid of images with optional supporting content.
 */
class ImageList extends HTMLElement {
    // Observed attributes that will trigger attributeChangedCallback
    static get observedAttributes() {
        return ['variant', 'columns', 'gap'];
    }

    constructor() {
        super();

        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Default properties
        this._variant = 'standard'; // standard, masonry, or quilted
        this._columns = 3;
        this._gap = 8;

        // Initialize the component
        this._render();
    }

    // Lifecycle: When component is connected to the DOM
    connectedCallback() {
        this._updateItems();
    }

    // Lifecycle: When attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'variant':
                this._variant = newValue || 'standard';
                break;
            case 'columns':
                this._columns = parseInt(newValue) || 3;
                break;
            case 'gap':
                this._gap = parseInt(newValue) || 8;
                break;
        }

        this._render();
        this._updateItems();
    }

    // Getters and setters for properties
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this.setAttribute('variant', value);
    }

    get columns() {
        return this._columns;
    }

    set columns(value) {
        this.setAttribute('columns', value);
    }

    get gap() {
        return this._gap;
    }

    set gap(value) {
        this.setAttribute('gap', value);
    }

    // Private method to render the component
    _render() {
        const style = `
        :host {
          display: block;
          box-sizing: border-box;
        }
        
        .vc-image-list {
          display: grid;
          grid-template-columns: repeat(${this._columns}, 1fr);
          gap: ${this._gap}px;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        
        .vc-image-list.masonry {
          grid-auto-rows: 0;
        }
        
        .vc-image-list.quilted .item {
          grid-row: span var(--row-span, 1);
          grid-column: span var(--col-span, 1);
        }
        
        .item {
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          background-color: #f0f0f0;
        }
        
        .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .item-content {
          display: flex;
          flex-direction: column;
          padding: 8px 16px;
          background-color: rgba(255, 255, 255, 0.9);
        }
        
        .with-text-protection .item-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
        
        .item-primary-text {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .item-secondary-text {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `;

        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <ul class="vc-image-list ${this._variant}">
          <slot></slot>
        </ul>
      `;
    }

    // Process items when they are added or changed
    _updateItems() {
        if (this._variant === 'masonry') {
            this._setupMasonry();
        } else if (this._variant === 'quilted') {
            this._setupQuilted();
        }
    }

    // Setup masonry layout
    _setupMasonry() {
        const items = Array.from(this.children);
        const imageList = this.shadowRoot.querySelector('.vc-image-list');

        // Reset any previous calculations
        items.forEach(item => {
            item.style.gridRowEnd = '';
        });

        // Need to wait for images to load to calculate heights
        Promise.all(items.map(item => {
            const img = item.querySelector('img');
            if (!img) return Promise.resolve();

            if (img.complete) return Promise.resolve();

            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        })).then(() => {
            // Apply masonry layout
            items.forEach(item => {
                const img = item.querySelector('img');
                if (img) {
                    const heightRatio = img.naturalHeight / img.naturalWidth;
                    // Use aspect ratio to determine approximate span
                    item.style.gridRowEnd = `span ${Math.ceil(heightRatio * 10)}`;
                }
            });
        });
    }

    // Setup quilted layout
    _setupQuilted() {
        const items = Array.from(this.children);
        const patterns = [
            { colSpan: 2, rowSpan: 2 }, // Featured item
            { colSpan: 1, rowSpan: 1 }, // Standard item
            { colSpan: 1, rowSpan: 1 }, // Standard item
            { colSpan: 1, rowSpan: 2 }, // Tall item
            { colSpan: 2, rowSpan: 1 }  // Wide item
        ];

        items.forEach((item, index) => {
            const pattern = patterns[index % patterns.length];
            item.style.setProperty('--col-span', pattern.colSpan);
            item.style.setProperty('--row-span', pattern.rowSpan);
        });
    }
}

/**
 * Material 2 Image List Item Web Component
 * 
 * A child component for the VcImageList that represents a single item
 * in the image list.
 */
class ImageListItem extends HTMLElement {
    static get observedAttributes() {
        return ['primary-text', 'secondary-text', 'text-protection'];
    }

    constructor() {
        super();

        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Default properties
        this._primaryText = '';
        this._secondaryText = '';
        this._textProtection = false;

        // Initialize the component
        this._render();
    }

    // Lifecycle: When attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'primary-text':
                this._primaryText = newValue || '';
                break;
            case 'secondary-text':
                this._secondaryText = newValue || '';
                break;
            case 'text-protection':
                this._textProtection = newValue !== null;
                break;
        }

        this._render();
    }

    // Getters and setters for properties
    get primaryText() {
        return this._primaryText;
    }

    set primaryText(value) {
        this.setAttribute('primary-text', value);
    }

    get secondaryText() {
        return this._secondaryText;
    }

    set secondaryText(value) {
        this.setAttribute('secondary-text', value);
    }

    get textProtection() {
        return this._textProtection;
    }

    set textProtection(value) {
        if (value) {
            this.setAttribute('text-protection', '');
        } else {
            this.removeAttribute('text-protection');
        }
    }

    // Private method to render the component
    _render() {
        const style = `
        :host {
          display: block;
        }
        
        .item {
          height: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          background-color: #f0f0f0;
        }
        
        .item-image-container {
          height: 100%;
          width: 100%;
        }
        
        ::slotted(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        
        .item-content {
          display: ${this._primaryText || this._secondaryText ? 'flex' : 'none'};
          flex-direction: column;
          padding: 8px 16px;
          background-color: ${this._textProtection ? 'rgba(255, 255, 255, 0.9)' : 'white'};
          ${this._textProtection ? 'position: absolute; bottom: 0; left: 0; right: 0;' : ''}
        }
        
        .item-primary-text {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .item-secondary-text {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `;

        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="item">
          <div class="item-image-container">
            <slot></slot>
          </div>
          <div class="item-content">
            ${this._primaryText ? `<p class="item-primary-text">${this._primaryText}</p>` : ''}
            ${this._secondaryText ? `<p class="item-secondary-text">${this._secondaryText}</p>` : ''}
          </div>
        </div>
      `;
    }
}

// Register custom elements
customElements.define('vc-image-list', ImageList);
customElements.define('vc-image-list-item', ImageListItem);

export { ImageList, ImageListItem };