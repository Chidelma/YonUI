// Material 2 Timeline Web Component
// A custom web component inspired by Vuetify v3 timeline

class Timeline extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._align = 'start';
        this._dense = false;
        this._reverse = false;
        this._side = 'end';
        this._lineThickness = '2px';
        this._lineColor = 'rgba(0, 0, 0, 0.12)';
        this._init();
    }

    _init() {
        this.render();
    }

    static get observedAttributes() {
        return ['align', 'dense', 'reverse', 'side', 'line-thickness', 'line-color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'align':
                this._align = newValue || 'start';
                break;
            case 'dense':
                this._dense = newValue !== null;
                break;
            case 'reverse':
                this._reverse = newValue !== null;
                break;
            case 'side':
                this._side = newValue || 'end';
                break;
            case 'line-thickness':
                this._lineThickness = newValue || '2px';
                break;
            case 'line-color':
                this._lineColor = newValue || 'rgba(0, 0, 0, 0.12)';
                break;
        }

        this.render();
    }

    get align() { return this._align; }
    set align(value) {
        this.setAttribute('align', value);
    }

    get dense() { return this._dense; }
    set dense(value) {
        if (value) {
            this.setAttribute('dense', '');
        } else {
            this.removeAttribute('dense');
        }
    }

    get reverse() { return this._reverse; }
    set reverse(value) {
        if (value) {
            this.setAttribute('reverse', '');
        } else {
            this.removeAttribute('reverse');
        }
    }

    get side() { return this._side; }
    set side(value) {
        this.setAttribute('side', value);
    }

    get lineThickness() { return this._lineThickness; }
    set lineThickness(value) {
        this.setAttribute('line-thickness', value);
    }

    get lineColor() { return this._lineColor; }
    set lineColor(value) {
        this.setAttribute('line-color', value);
    }

    connectedCallback() {
        this.render();

        // Re-render when child elements change
        const observer = new MutationObserver(() => this.render());
        observer.observe(this, { childList: true });
    }

    render() {
        const style = `
        :host {
          display: block;
          position: relative;
          padding: 24px 0;
        }
        
        .timeline-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: ${this._lineThickness};
          background-color: ${this._lineColor};
        }
        
        .timeline-container {
          position: relative;
          display: flex;
          flex-direction: column;
          ${this._reverse ? 'flex-direction: column-reverse;' : ''}
          padding: 0;
          margin: 0;
          list-style-type: none;
        }
        
        ${this._side === 'start' ?
                `.timeline-line { left: 0; }` :
                this._side === 'end' ?
                    `.timeline-line { right: 0; }` :
                    `.timeline-line { left: 50%; transform: translateX(-50%); }`
            }
        
        .timeline-item-slots {
          display: flex;
          flex: 1 1 auto;
          justify-content: space-between;
          align-items: ${this._align};
          padding: ${this._dense ? '8px 0' : '16px 0'};
          position: relative;
        }
        
        ${this._side === 'center' ?
                `
          .timeline-item:nth-child(odd) .timeline-item-slots {
            flex-direction: row-reverse;
          }
          ` : ''
            }
      `;

        const items = Array.from(this.children).filter(child =>
            child.tagName.toLowerCase() === 'vc-timeline-item'
        );

        // Process the items based on the reverse attribute
        const processedItems = this._reverse ? [...items].reverse() : items;

        let itemsHtml = '';
        processedItems.forEach((item, index) => {
            // Clone the item to preserve its content and attributes
            const clonedItem = item.cloneNode(true);
            clonedItem.setAttribute('index', index);
            itemsHtml += clonedItem.outerHTML;
        });

        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="timeline-line"></div>
        <div class="timeline-container">
          ${itemsHtml}
        </div>
      `;
    }
}

class TimelineItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._dotColor = 'primary';
        this._dot = '';
        this._fillDot = false;
        this._hideDot = false;
        this._size = 'small';
        this._init();
    }

    _init() {
        this.render();
    }

    static get observedAttributes() {
        return ['dot-color', 'dot', 'fill-dot', 'hide-dot', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'dot-color':
                this._dotColor = newValue || 'primary';
                break;
            case 'dot':
                this._dot = newValue || '';
                break;
            case 'fill-dot':
                this._fillDot = newValue !== null;
                break;
            case 'hide-dot':
                this._hideDot = newValue !== null;
                break;
            case 'size':
                this._size = newValue || 'small';
                break;
        }

        this.render();
    }

    get dotColor() { return this._dotColor; }
    set dotColor(value) {
        this.setAttribute('dot-color', value);
    }

    get dot() { return this._dot; }
    set dot(value) {
        this.setAttribute('dot', value);
    }

    get fillDot() { return this._fillDot; }
    set fillDot(value) {
        if (value) {
            this.setAttribute('fill-dot', '');
        } else {
            this.removeAttribute('fill-dot');
        }
    }

    get hideDot() { return this._hideDot; }
    set hideDot(value) {
        if (value) {
            this.setAttribute('hide-dot', '');
        } else {
            this.removeAttribute('hide-dot');
        }
    }

    get size() { return this._size; }
    set size(value) {
        this.setAttribute('size', value);
    }

    connectedCallback() {
        this.render();
    }

    getColorClass(color) {
        const colorMap = {
            'primary': '#1976D2',
            'secondary': '#424242',
            'success': '#4CAF50',
            'info': '#2196F3',
            'warning': '#FFC107',
            'error': '#FF5252',
        };

        return colorMap[color] || color;
    }

    getDotSize() {
        const sizeMap = {
            'x-small': '16px',
            'small': '24px',
            'default': '32px',
            'large': '48px',
            'x-large': '64px'
        };

        return sizeMap[this._size] || sizeMap.small;
    }

    render() {
        const parent = this.closest('vc-timeline');
        const side = parent ? parent.side : 'end';
        const dotSize = this.getDotSize();
        const dotColor = this.getColorClass(this._dotColor);

        const style = `
        :host {
          display: block;
          position: relative;
        }
        
        .timeline-item {
          display: flex;
          width: 100%;
        }
        
        .timeline-item-dot {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          background-color: ${this._fillDot ? dotColor : '#FFFFFF'};
          border: ${this._fillDot ? 'none' : `2px solid ${dotColor}`};
          border-radius: 50%;
          width: ${dotSize};
          height: ${dotSize};
          z-index: 2;
          ${this._hideDot ? 'display: none;' : ''}
        }
        
        .timeline-item-content {
          flex: 1;
          padding: 0 16px;
          position: relative;
        }
        
        ${side === 'start' ?
                `.timeline-item-dot { left: -${parseInt(dotSize) / 2}px; }` :
                side === 'end' ?
                    `.timeline-item-dot { right: -${parseInt(dotSize) / 2}px; }` :
                    `.timeline-item-dot { left: 50%; transform: translateX(-50%); }`
            }
        
        .opposite-slot {
          flex: 1;
          padding: 0 16px;
          text-align: ${side === 'start' ? 'right' : 'left'};
        }
      `;

        const oppositeSlot = this.querySelector('div[slot="opposite"]');
        const oppositeContent = oppositeSlot ? oppositeSlot.innerHTML : '';

        const dotContent = this._dot || '';

        // Get the main content which is not in any specific slot
        let mainContent = '';
        const slotElement = document.createElement('div');
        Array.from(this.childNodes).forEach(node => {
            if (node.nodeType === 1) {
                if (!node.hasAttribute('slot')) {
                    slotElement.appendChild(node.cloneNode(true));
                }
            } else {
                slotElement.appendChild(node.cloneNode(true));
            }
        });
        mainContent = slotElement.innerHTML;

        this.shadowRoot.innerHTML = `
        <style>${style}</style>
        <div class="timeline-item">
          <div class="timeline-item-slots">
            ${side === 'center' ? `<div class="opposite-slot">${oppositeContent}</div>` : ''}
            
            <div class="timeline-item-content">
              ${mainContent}
            </div>
            
            ${side !== 'center' ? `<div class="opposite-slot">${oppositeContent}</div>` : ''}
          </div>
          
          <div class="timeline-item-dot">
            ${dotContent}
          </div>
        </div>
      `;
    }
}

// Define the custom elements
customElements.define('vc-timeline', Timeline);
customElements.define('vc-timeline-item', TimelineItem);

export { Timeline, TimelineItem };