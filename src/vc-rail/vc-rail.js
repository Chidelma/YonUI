/**
 * Material 2 Navigation Rail Web Component (vc-rail)
 * 
 * A lightweight, customizable navigation rail component following Material Design 2 guidelines.
 */
class VcRail extends HTMLElement {
    constructor() {
        super();
        this._selected = 0;
        this._items = [];
        this._shadow = this.attachShadow({ mode: 'open' });
        this._render();
    }

    static get observedAttributes() {
        return ['selected'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selected' && oldValue !== newValue) {
            this._selected = parseInt(newValue, 10) || 0;
            this._updateSelected();
        }
    }

    connectedCallback() {
        this._processChildren();
        this._addEventListeners();
    }

    disconnectedCallback() {
        this._removeEventListeners();
    }

    get selected() {
        return this._selected;
    }

    set selected(index) {
        if (this._selected !== index) {
            this._selected = index;
            this.setAttribute('selected', index.toString());
            this._updateSelected();
        }
    }

    _processChildren() {
        // Clear existing items
        this._items = [];

        // Process child elements with vc-rail-item attribute
        const items = this.querySelectorAll('[vc-rail-item]');
        items.forEach((item, index) => {
            const icon = item.getAttribute('icon') || '';
            const label = item.getAttribute('label') || '';
            const badgeCount = item.getAttribute('badge-count') || null;

            this._items.push({ icon, label, badgeCount, element: item });

            // Hide original elements
            item.style.display = 'none';
        });

        this._renderItems();
        this._updateSelected();
    }

    _addEventListeners() {
        this._handleItemClick = this._handleItemClick.bind(this);
        this._shadow.addEventListener('click', this._handleItemClick);
    }

    _removeEventListeners() {
        this._shadow.removeEventListener('click', this._handleItemClick);
    }

    _handleItemClick(event) {
        const item = event.target.closest('.rail-item');
        if (item) {
            const index = parseInt(item.dataset.index, 10);
            if (!isNaN(index)) {
                this.selected = index;

                // Dispatch custom event
                this.dispatchEvent(new CustomEvent('vc-rail-change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        index: this.selected,
                        item: this._items[this.selected]
                    }
                }));
            }
        }
    }

    _updateSelected() {
        const items = this._shadow.querySelectorAll('.rail-item');
        items.forEach((item, index) => {
            if (index === this._selected) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    _renderItems() {
        const itemsContainer = this._shadow.querySelector('.rail-items');
        if (!itemsContainer) return;

        // Clear existing items
        itemsContainer.innerHTML = '';

        // Create new items
        this._items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'rail-item';
            itemEl.dataset.index = index;

            // Create icon
            const iconEl = document.createElement('div');
            iconEl.className = 'rail-icon';
            iconEl.innerHTML = item.icon;
            itemEl.appendChild(iconEl);

            // Create badge if needed
            if (item.badgeCount) {
                const badgeEl = document.createElement('div');
                badgeEl.className = 'rail-badge';
                badgeEl.textContent = item.badgeCount;
                iconEl.appendChild(badgeEl);
            }

            // Create label
            const labelEl = document.createElement('div');
            labelEl.className = 'rail-label';
            labelEl.textContent = item.label;
            itemEl.appendChild(labelEl);

            itemsContainer.appendChild(itemEl);
        });

        this._updateSelected();
    }

    _render() {
        this._shadow.innerHTML = `
        <style>
          :host {
            --vc-rail-width: 72px;
            --vc-rail-background: #ffffff;
            --vc-rail-color: #5f6368;
            --vc-rail-color-selected: #1a73e8;
            --vc-rail-badge-color: #ea4335;
            --vc-rail-border-color: #dadce0;
            --vc-rail-transition: 0.2s ease;
            
            display: block;
            width: var(--vc-rail-width);
            height: 100%;
            background-color: var(--vc-rail-background);
            box-shadow: 1px 0 var(--vc-rail-border-color);
            font-family: Roboto, 'Segoe UI', Arial, sans-serif;
            user-select: none;
          }
  
          .rail-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow-y: auto;
            scrollbar-width: none; /* Firefox */
          }
  
          .rail-container::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
  
          .rail-items {
            display: flex;
            flex-direction: column;
            padding: 8px 0;
          }
  
          .rail-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 16px 0;
            color: var(--vc-rail-color);
            cursor: pointer;
            transition: all var(--vc-rail-transition);
            position: relative;
          }
  
          .rail-item:hover {
            background-color: rgba(0, 0, 0, 0.04);
          }
  
          .rail-item.selected {
            color: var(--vc-rail-color-selected);
          }
  
          .rail-icon {
            position: relative;
            width: 24px;
            height: 24px;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          .rail-badge {
            position: absolute;
            top: -4px;
            right: -8px;
            min-width: 16px;
            height: 16px;
            padding: 0 4px;
            border-radius: 8px;
            background-color: var(--vc-rail-badge-color);
            color: white;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          .rail-label {
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            max-width: 68px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        </style>
        <div class="rail-container">
          <div class="rail-items"></div>
        </div>
      `;
    }
}

customElements.define('vc-rail', VcRail);

export default VcRail;