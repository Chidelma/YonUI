// vc-skeleton-loader.js
// Material 2 Skeleton Loader Web Component inspired by Vuetify v3

class VcSkeletonLoader extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'loading', 'elevation', 'height', 'width', 'boilerplate', 'tile'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._type = 'text';
        this._loading = true;
        this._elevation = 0;
        this._height = null;
        this._width = null;
        this._boilerplate = false;
        this._tile = false;

        this.render();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'type':
                this._type = newValue || 'text';
                break;
            case 'loading':
                this._loading = newValue !== 'false';
                break;
            case 'elevation':
                this._elevation = parseInt(newValue, 10) || 0;
                break;
            case 'height':
                this._height = newValue;
                break;
            case 'width':
                this._width = newValue;
                break;
            case 'boilerplate':
                this._boilerplate = newValue !== null && newValue !== 'false';
                break;
            case 'tile':
                this._tile = newValue !== null && newValue !== 'false';
                break;
        }

        this.render();
    }

    // Getters and setters
    get type() { return this._type; }
    set type(value) {
        this.setAttribute('type', value);
    }

    get loading() { return this._loading; }
    set loading(value) {
        this.setAttribute('loading', value);
    }

    get elevation() { return this._elevation; }
    set elevation(value) {
        this.setAttribute('elevation', value);
    }

    get height() { return this._height; }
    set height(value) {
        this.setAttribute('height', value);
    }

    get width() { return this._width; }
    set width(value) {
        this.setAttribute('width', value);
    }

    get boilerplate() { return this._boilerplate; }
    set boilerplate(value) {
        if (value) {
            this.setAttribute('boilerplate', '');
        } else {
            this.removeAttribute('boilerplate');
        }
    }

    get tile() { return this._tile; }
    set tile(value) {
        if (value) {
            this.setAttribute('tile', '');
        } else {
            this.removeAttribute('tile');
        }
    }

    getTypeStyles() {
        const types = this._type.split(' ');
        let template = '';

        for (const type of types) {
            switch (type) {
                case 'text':
                    template += `<div class="skeleton-text"></div>`;
                    break;
                case 'avatar':
                    template += `<div class="skeleton-avatar"></div>`;
                    break;
                case 'button':
                    template += `<div class="skeleton-button"></div>`;
                    break;
                case 'chip':
                    template += `<div class="skeleton-chip"></div>`;
                    break;
                case 'image':
                    template += `<div class="skeleton-image"></div>`;
                    break;
                case 'card':
                    template += `
              <div class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-card-content">
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                </div>
              </div>
            `;
                    break;
                case 'list-item':
                    template += `
              <div class="skeleton-list-item">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-content">
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text skeleton-text-small"></div>
                </div>
              </div>
            `;
                    break;
                case 'paragraph':
                    template += `
              <div class="skeleton-paragraph">
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
              </div>
            `;
                    break;
                case 'table':
                    template += `
              <div class="skeleton-table">
                <div class="skeleton-table-header">
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                </div>
                <div class="skeleton-table-row">
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                </div>
                <div class="skeleton-table-row">
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                </div>
              </div>
            `;
                    break;
                default:
                    // Custom slot for user-defined types
                    template += `<slot name="${type}"></slot>`;
            }
        }

        return template;
    }

    getElevationClass() {
        if (this._elevation === 0) return '';
        return `elevation-${Math.min(Math.max(this._elevation, 0), 24)}`;
    }

    render() {
        const styles = `
        :host {
          display: block;
        }
        
        .skeleton-loader {
          position: relative;
          overflow: hidden;
          width: ${this._width || '100%'};
          height: ${this._height || 'auto'};
        }
        
        .skeleton-loader:not(.skeleton-boilerplate) .skeleton-loader-item > * {
          background-color: #e0e0e0;
          animation: skeleton-pulse 1.5s ease-in-out infinite;
        }
        
        .skeleton-loader.skeleton-tile {
          border-radius: 0;
        }
        
        .skeleton-loader:not(.skeleton-tile) {
          border-radius: 4px;
        }
        
        .skeleton-loader:not(.skeleton-tile) .skeleton-loader-item > * {
          border-radius: 4px;
        }
        
        .skeleton-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50% !important;
        }
        
        .skeleton-text {
          height: 16px;
          border-radius: 4px;
          margin-bottom: 8px;
          width: 100%;
        }
        
        .skeleton-text-small {
          width: 70%;
        }
        
        .skeleton-button {
          width: 80px;
          height: 36px;
          border-radius: 4px;
        }
        
        .skeleton-chip {
          width: 70px;
          height: 32px;
          border-radius: 16px !important;
        }
        
        .skeleton-image {
          width: 100%;
          height: 200px;
        }
        
        .skeleton-card {
          width: 100%;
        }
        
        .skeleton-card-content {
          padding: 16px;
        }
        
        .skeleton-list-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 0;
        }
        
        .skeleton-content {
          flex: 1;
        }
        
        .skeleton-paragraph {
          width: 100%;
        }
        
        .skeleton-table {
          width: 100%;
        }
        
        .skeleton-table-header {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 2px solid #f5f5f5;
        }
        
        .skeleton-table-header .skeleton-text {
          width: 30%;
        }
        
        .skeleton-table-row {
          display: flex;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .skeleton-table-row .skeleton-text {
          width: 30%;
        }
        
        /* Elevation classes */
        .elevation-1 { box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12); }
        .elevation-2 { box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); }
        .elevation-3 { box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12); }
        .elevation-4 { box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); }
        .elevation-5 { box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12); }
        
        @keyframes skeleton-pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        
        /* Don't animate when boilerplate is set */
        .skeleton-boilerplate .skeleton-loader-item > * {
          background-color: #f5f5f5;
          animation: none;
        }
        
        /* Hide when loading is false */
        .skeleton-loader.not-loading {
          display: none;
        }
      `;

        const loaderClasses = [
            'skeleton-loader',
            this._boilerplate ? 'skeleton-boilerplate' : '',
            this._tile ? 'skeleton-tile' : '',
            this._loading ? '' : 'not-loading',
            this.getElevationClass()
        ].filter(Boolean).join(' ');

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <div class="${loaderClasses}">
          <div class="skeleton-loader-item">
            ${this.getTypeStyles()}
          </div>
          <slot></slot>
        </div>
      `;
    }
}

// Define the custom element
customElements.define('vc-skeleton-loader', VcSkeletonLoader);

export default VcSkeletonLoader;