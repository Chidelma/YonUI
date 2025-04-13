/**
 * Material 2 Image List Web Component
 * 
 * A custom element that recreates the functionality of Material 2 Image Lists
 * providing a responsive grid of images with optional supporting content.
 */
class ImageList extends HTMLElement {
    // Observed attributes that will trigger attributeChangedCallback
    static get observedAttributes() {
        return [
            'variant', 'columns', 'gap',
            'cols-xs', 'cols-sm', 'cols-md', 'cols-lg', 'cols-xl',
            'gap-xs', 'gap-sm', 'gap-md', 'gap-lg', 'gap-xl'
        ];
    }

    constructor() {
        super();

        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Breakpoint definitions (similar to Vuetify)
        this._breakpoints = {
            xs: 600,   // Extra small (< 600px)
            sm: 960,   // Small (600px - 959px)
            md: 1264,  // Medium (960px - 1263px)
            lg: 1904,  // Large (1264px - 1903px)
            xl: 9999   // Extra large (≥ 1904px)
        };

        // Default properties
        this._variant = 'standard'; // standard, masonry, or quilted
        this._columns = 3;
        this._gap = 8;

        // Responsive columns
        this._colsXs = null;
        this._colsSm = null;
        this._colsMd = null;
        this._colsLg = null;
        this._colsXl = null;

        // Responsive gaps
        this._gapXs = null;
        this._gapSm = null;
        this._gapMd = null;
        this._gapLg = null;
        this._gapXl = null;

        // Create a resize observer to handle responsive behavior
        this._resizeObserver = new ResizeObserver(() => this._handleResize());

        // Initialize the component
        this._render();
    }

    // Lifecycle: When component is connected to the DOM
    connectedCallback() {
        this._updateItems();
        this._resizeObserver.observe(document.documentElement);
        this._handleResize();

        // Add window resize event listener as a fallback
        window.addEventListener('resize', this._handleResize.bind(this));
    }

    // Lifecycle: When component is disconnected from the DOM
    disconnectedCallback() {
        this._resizeObserver.disconnect();
        window.removeEventListener('resize', this._handleResize.bind(this));
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
            // Responsive columns
            case 'cols-xs':
                this._colsXs = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'cols-sm':
                this._colsSm = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'cols-md':
                this._colsMd = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'cols-lg':
                this._colsLg = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'cols-xl':
                this._colsXl = newValue !== null ? parseInt(newValue) : null;
                break;
            // Responsive gaps
            case 'gap-xs':
                this._gapXs = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'gap-sm':
                this._gapSm = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'gap-md':
                this._gapMd = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'gap-lg':
                this._gapLg = newValue !== null ? parseInt(newValue) : null;
                break;
            case 'gap-xl':
                this._gapXl = newValue !== null ? parseInt(newValue) : null;
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

    // Responsive columns getters/setters
    get colsXs() {
        return this._colsXs;
    }

    set colsXs(value) {
        this.setAttribute('cols-xs', value);
    }

    get colsSm() {
        return this._colsSm;
    }

    set colsSm(value) {
        this.setAttribute('cols-sm', value);
    }

    get colsMd() {
        return this._colsMd;
    }

    set colsMd(value) {
        this.setAttribute('cols-md', value);
    }

    get colsLg() {
        return this._colsLg;
    }

    set colsLg(value) {
        this.setAttribute('cols-lg', value);
    }

    get colsXl() {
        return this._colsXl;
    }

    set colsXl(value) {
        this.setAttribute('cols-xl', value);
    }

    // Responsive gaps getters/setters
    get gapXs() {
        return this._gapXs;
    }

    set gapXs(value) {
        this.setAttribute('gap-xs', value);
    }

    get gapSm() {
        return this._gapSm;
    }

    set gapSm(value) {
        this.setAttribute('gap-sm', value);
    }

    get gapMd() {
        return this._gapMd;
    }

    set gapMd(value) {
        this.setAttribute('gap-md', value);
    }

    get gapLg() {
        return this._gapLg;
    }

    set gapLg(value) {
        this.setAttribute('gap-lg', value);
    }

    get gapXl() {
        return this._gapXl;
    }

    set gapXl(value) {
        this.setAttribute('gap-xl', value);
    }

    // Handle window resize events
    _handleResize() {
        const width = window.innerWidth;
        let currentColumns = this._columns;
        let currentGap = this._gap;

        // Determine which breakpoint we're at and set columns accordingly
        if (width < this._breakpoints.xs) {
            if (this._colsXs !== null) currentColumns = this._colsXs;
            if (this._gapXs !== null) currentGap = this._gapXs;
        } else if (width < this._breakpoints.sm) {
            if (this._colsSm !== null) currentColumns = this._colsSm;
            if (this._gapSm !== null) currentGap = this._gapSm;
        } else if (width < this._breakpoints.md) {
            if (this._colsMd !== null) currentColumns = this._colsMd;
            if (this._gapMd !== null) currentGap = this._gapMd;
        } else if (width < this._breakpoints.lg) {
            if (this._colsLg !== null) currentColumns = this._colsLg;
            if (this._gapLg !== null) currentGap = this._gapLg;
        } else {
            if (this._colsXl !== null) currentColumns = this._colsXl;
            if (this._gapXl !== null) currentGap = this._gapXl;
        }

        // Apply the current responsive values
        this._currentColumns = currentColumns;
        this._currentGap = currentGap;

        // Re-render with the responsive values
        this._updateStyle();
    }

    // Update just the style without rebuilding the whole component
    _updateStyle() {
        const styleElement = this.shadowRoot.querySelector('style');
        if (styleElement) {
            styleElement.textContent = this._generateStyles();
        }
    }

    // Generate styles based on current state
    _generateStyles() {
        return `
        :host {
          display: block;
          box-sizing: border-box;
        }
        
        .vc-image-list {
          display: grid;
          grid-template-columns: repeat(${this._currentColumns || this._columns}, 1fr);
          gap: ${this._currentGap || this._gap}px;
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
    }

    // Private method to render the component
    _render() {
        this.shadowRoot.innerHTML = `
        <style>${this._generateStyles()}</style>
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