// vc-badge.js
// A Material 2 inspired badge web component similar to Vuetify v3's badge

class VcBadge extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._content = '';
        this._dot = false;
        this._color = 'primary';
        this._bordered = false;
        this._inline = false;
        this._offset = { x: 0, y: 0 };
        this._max = Infinity;
        this._modelValue = true;
        this._position = 'top-right';
    }

    static get observedAttributes() {
        return [
            'content',
            'dot',
            'color',
            'bordered',
            'inline',
            'offset-x',
            'offset-y',
            'max',
            'model-value',
            'position'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'content':
                this._content = newValue;
                break;
            case 'dot':
                this._dot = newValue !== null;
                break;
            case 'color':
                this._color = newValue;
                break;
            case 'bordered':
                this._bordered = newValue !== null;
                break;
            case 'inline':
                this._inline = newValue !== null;
                break;
            case 'offset-x':
                this._offset.x = parseInt(newValue) || 0;
                break;
            case 'offset-y':
                this._offset.y = parseInt(newValue) || 0;
                break;
            case 'max':
                this._max = parseInt(newValue) || Infinity;
                break;
            case 'model-value':
                this._modelValue = newValue === null ? true : newValue !== 'false';
                break;
            case 'position':
                this._position = newValue || 'top-right';
                break;
        }
        this._render();
    }

    connectedCallback() {
        this._render();
    }

    _render() {
        const colors = {
            primary: '#1976D2',
            secondary: '#424242',
            success: '#4CAF50',
            error: '#FF5252',
            warning: '#FB8C00',
            info: '#2196F3'
        };

        const selectedColor = colors[this._color] || this._color;
        const displayContent = this._dot ? '' : this._formatContent();

        // Position calculations
        const positionMap = {
            'top-right': { top: '-8px', right: '-8px' },
            'top-left': { top: '-8px', left: '-8px' },
            'bottom-right': { bottom: '-8px', right: '-8px' },
            'bottom-left': { bottom: '-8px', left: '-8px' }
        };

        const position = positionMap[this._position] || positionMap['top-right'];

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: ${this._inline ? 'inline-flex' : 'block'};
            position: relative;
          }
          
          .badge-wrapper {
            position: relative;
          }
          
          .badge {
            position: absolute;
            display: ${this._modelValue ? 'flex' : 'none'};
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 500;
            color: white;
            background-color: ${selectedColor};
            border-radius: ${this._dot ? '50%' : '10px'};
            min-width: ${this._dot ? '8px' : '20px'};
            height: ${this._dot ? '8px' : '20px'};
            padding: ${this._dot ? '0' : '0 6px'};
            box-sizing: border-box;
            transform: translate(${this._offset.x}px, ${this._offset.y}px);
            z-index: 1;
            ${position.top ? `top: ${position.top};` : ''}
            ${position.right ? `right: ${position.right};` : ''}
            ${position.bottom ? `bottom: ${position.bottom};` : ''}
            ${position.left ? `left: ${position.left};` : ''}
            ${this._bordered ? `border: 2px solid white;` : ''}
            transition: all 0.2s ease-in-out;
          }
        </style>
        
        <div class="badge-wrapper">
          <slot></slot>
          <div class="badge">${displayContent}</div>
        </div>
      `;
    }

    _formatContent() {
        if (!this._content) return '';

        const contentValue = isNaN(parseInt(this._content)) ? this._content : parseInt(this._content);

        if (typeof contentValue === 'number' && contentValue > this._max) {
            return `${this._max}+`;
        }

        return contentValue;
    }
}

// Register the custom element
customElements.define('vc-badge', VcBadge);

export default VcBadge;