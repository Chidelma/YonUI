// material-rating.js
// A Material Design 2 inspired rating component based on Vuetify v3

class MaterialRating extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default properties
        this._value = 0;
        this._max = 5;
        this._readonly = false;
        this._dense = false;
        this._size = 24;
        this._color = '#FFCA28'; // Material amber
        this._emptyColor = '#E0E0E0'; // Material grey lighten-2
        this._hoverColor = '#FFA000'; // Material amber darken-2
        this._icons = {
            full: 'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
            half: 'M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z',
            empty: 'M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z'
        };

        this._hoverValue = null;
        this._focused = false;
    }

    static get observedAttributes() {
        return ['value', 'max', 'readonly', 'dense', 'size', 'color', 'empty-color', 'hover-color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                this._value = parseFloat(newValue) || 0;
                break;
            case 'max':
                this._max = parseInt(newValue) || 5;
                break;
            case 'readonly':
                this._readonly = newValue !== null;
                break;
            case 'dense':
                this._dense = newValue !== null;
                break;
            case 'size':
                this._size = parseInt(newValue) || 24;
                break;
            case 'color':
                this._color = newValue || '#FFCA28';
                break;
            case 'empty-color':
                this._emptyColor = newValue || '#E0E0E0';
                break;
            case 'hover-color':
                this._hoverColor = newValue || '#FFA000';
                break;
        }

        this.render();
    }

    connectedCallback() {
        this.render();

        if (!this._readonly) {
            this.shadowRoot.addEventListener('mousemove', this._handleMouseMove.bind(this));
            this.shadowRoot.addEventListener('mouseleave', this._handleMouseLeave.bind(this));
            this.shadowRoot.addEventListener('click', this._handleClick.bind(this));
            this.shadowRoot.addEventListener('keydown', this._handleKeyDown.bind(this));
        }
    }

    disconnectedCallback() {
        if (!this._readonly) {
            this.shadowRoot.removeEventListener('mousemove', this._handleMouseMove);
            this.shadowRoot.removeEventListener('mouseleave', this._handleMouseLeave);
            this.shadowRoot.removeEventListener('click', this._handleClick);
            this.shadowRoot.removeEventListener('keydown', this._handleKeyDown);
        }
    }

    _handleMouseMove(event) {
        if (this._readonly) return;

        const stars = this.shadowRoot.querySelectorAll('.rating-star');
        const rect = this.shadowRoot.querySelector('.rating-container').getBoundingClientRect();
        const position = event.clientX - rect.left;
        const width = rect.width;
        const starWidth = width / this._max;

        let hoveredValue = Math.ceil(position / starWidth);
        hoveredValue = Math.max(1, Math.min(hoveredValue, this._max));

        this._hoverValue = hoveredValue;
        this.render();
    }

    _handleMouseLeave() {
        if (this._readonly) return;

        this._hoverValue = null;
        this.render();
    }

    _handleClick(event) {
        if (this._readonly) return;

        if (this._hoverValue !== null) {
            this._value = this._hoverValue;
            this.setAttribute('value', this._value);

            // Dispatch change event
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: this._value }
            }));
        }
    }

    _handleKeyDown(event) {
        if (this._readonly) return;

        let newValue = this._value;

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                newValue = Math.min(this._max, this._value + 1);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                newValue = Math.max(0, this._value - 1);
                break;
            case 'Home':
                newValue = 0;
                break;
            case 'End':
                newValue = this._max;
                break;
            default:
                return;
        }

        if (newValue !== this._value) {
            this._value = newValue;
            this.setAttribute('value', this._value);

            // Dispatch change event
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: { value: this._value }
            }));

            this.render();
        }

        event.preventDefault();
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = parseFloat(val) || 0;
        this.setAttribute('value', this._value);
        this.render();
    }

    get max() {
        return this._max;
    }

    set max(val) {
        this._max = parseInt(val) || 5;
        this.setAttribute('max', this._max);
        this.render();
    }

    get readonly() {
        return this._readonly;
    }

    set readonly(val) {
        this._readonly = Boolean(val);
        if (this._readonly) {
            this.setAttribute('readonly', '');
        } else {
            this.removeAttribute('readonly');
        }
        this.render();
    }

    _renderStar(index) {
        const value = this._hoverValue !== null ? this._hoverValue : this._value;
        const isFilled = index < Math.floor(value);
        const isHalf = !isFilled && (index === Math.floor(value)) && (value % 1 >= 0.5);
        const isEmpty = !isFilled && !isHalf;

        const color = this._hoverValue !== null ? this._hoverColor : this._color;
        const path = isEmpty ? this._icons.empty : (isHalf ? this._icons.half : this._icons.full);
        const fillColor = isEmpty ? this._emptyColor : color;

        return `
        <div class="rating-star" tabindex="${this._readonly ? -1 : 0}" data-value="${index + 1}">
          <svg xmlns="http://www.w3.org/2000/svg" 
               width="${this._size}" 
               height="${this._size}" 
               viewBox="0 0 24 24">
            <path d="${path}" fill="${fillColor}" />
          </svg>
        </div>
      `;
    }

    render() {
        const stars = Array.from({ length: this._max }, (_, i) => this._renderStar(i)).join('');

        const containerClass = `
        rating-container
        ${this._dense ? 'dense' : ''}
        ${this._readonly ? 'readonly' : ''}
      `;

        const styles = `
        <style>
          :host {
            display: inline-block;
            --rating-spacing: ${this._dense ? '2px' : '4px'};
          }
          
          .rating-container {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: var(--rating-spacing);
            position: relative;
          }
          
          .dense {
            gap: 2px;
          }
          
          .rating-star {
            cursor: ${this._readonly ? 'default' : 'pointer'};
            display: inline-flex;
            transition: transform 0.2s ease;
          }
          
          .rating-star:not(.readonly):hover {
            transform: scale(1.1);
          }
          
          .rating-star:focus {
            outline: none;
            transform: scale(1.1);
          }
          
          .rating-value {
            margin-left: 8px;
            font-family: Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.87);
          }
        </style>
      `;

        this.shadowRoot.innerHTML = `
        ${styles}
        <div class="${containerClass.trim()}" role="slider" aria-valuemin="0" aria-valuemax="${this._max}" aria-valuenow="${this._value}">
          ${stars}
        </div>
      `;
    }
}

// Define the custom element
customElements.define('vc-rating', MaterialRating);

export default MaterialRating;