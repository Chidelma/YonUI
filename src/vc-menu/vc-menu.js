/**
 * Material 2 Menu Web Component
 * 
 * A custom web component implementation of Material Design 2 menus.
 */

class VcMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._isOpen = false;
        this._position = 'bottom-start'; // Default position
        this._triggerElement = null;
        this._onDocumentClick = this._onDocumentClick.bind(this);
    }

    static get observedAttributes() {
        return ['position', 'open'];
    }

    connectedCallback() {
        this.render();
        this._setupEventListeners();
    }

    disconnectedCallback() {
        document.removeEventListener('click', this._onDocumentClick);
        if (this._triggerElement) {
            this._triggerElement.removeEventListener('click', this._toggleMenu.bind(this));
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'position' && oldValue !== newValue) {
            this._position = newValue;
            if (this._isOpen) {
                this._updateMenuPosition();
            }
        }

        if (name === 'open' && oldValue !== newValue) {
            this._isOpen = newValue === 'true';
            this._toggleMenuVisibility();
        }
    }

    /**
     * Set the trigger element for the menu
     * @param {HTMLElement} element - The element that triggers the menu
     */
    setTrigger(element) {
        if (this._triggerElement) {
            this._triggerElement.removeEventListener('click', this._toggleMenu.bind(this));
        }

        this._triggerElement = element;
        if (this._triggerElement) {
            this._triggerElement.addEventListener('click', this._toggleMenu.bind(this));
        }
    }

    /**
     * Open the menu
     */
    open() {
        if (!this._isOpen) {
            this._isOpen = true;
            this.setAttribute('open', 'true');
            this._toggleMenuVisibility();
            document.addEventListener('click', this._onDocumentClick);
        }
    }

    /**
     * Close the menu
     */
    close() {
        if (this._isOpen) {
            this._isOpen = false;
            this.setAttribute('open', 'false');
            this._toggleMenuVisibility();
            document.removeEventListener('click', this._onDocumentClick);
        }
    }

    /**
     * Toggle the menu open state
     */
    toggle() {
        if (this._isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Set the position of the menu relative to the trigger
     * @param {string} position - Position value (top-start, top-end, bottom-start, bottom-end, etc.)
     */
    setPosition(position) {
        this._position = position;
        this.setAttribute('position', position);
        if (this._isOpen) {
            this._updateMenuPosition();
        }
    }

    _setupEventListeners() {
        const menuItems = this.shadowRoot.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Dispatch a custom event with the selected item
                this.dispatchEvent(new CustomEvent('menu-select', {
                    detail: { value: item.getAttribute('value') || item.textContent.trim() },
                    bubbles: true,
                    composed: true
                }));

                // Close the menu after selection unless prevented
                if (!e.preventDefault) {
                    this.close();
                }
            });
        });

        // Find and set the trigger if it exists
        const trigger = document.querySelector(`[aria-controls="${this.id}"]`);
        if (trigger) {
            this.setTrigger(trigger);
        }
    }

    _toggleMenu() {
        this.toggle();
    }

    _toggleMenuVisibility() {
        const menuContainer = this.shadowRoot.querySelector('.menu-container');
        if (menuContainer) {
            if (this._isOpen) {
                menuContainer.style.display = 'block';
                this._updateMenuPosition();
                // Add animation class
                menuContainer.classList.add('menu-open');
                // Focus the first menu item
                setTimeout(() => {
                    const firstItem = menuContainer.querySelector('.menu-item');
                    if (firstItem) {
                        firstItem.focus();
                    }
                }, 100);
            } else {
                menuContainer.classList.remove('menu-open');
                // Add transition end listener to hide the menu after animation
                const handleTransitionEnd = () => {
                    menuContainer.style.display = 'none';
                    menuContainer.removeEventListener('transitionend', handleTransitionEnd);
                };
                menuContainer.addEventListener('transitionend', handleTransitionEnd);
            }
        }
    }

    _updateMenuPosition() {
        if (!this._triggerElement) return;

        const menuContainer = this.shadowRoot.querySelector('.menu-container');
        if (!menuContainer) return;

        const triggerRect = this._triggerElement.getBoundingClientRect();
        const menuRect = menuContainer.getBoundingClientRect();

        // Reset position to calculate proper size
        menuContainer.style.top = '0';
        menuContainer.style.left = '0';

        // Determine position based on this._position value
        let top, left;

        switch (this._position) {
            case 'top-start':
                top = triggerRect.top - menuRect.height;
                left = triggerRect.left;
                break;
            case 'top-end':
                top = triggerRect.top - menuRect.height;
                left = triggerRect.right - menuRect.width;
                break;
            case 'bottom-end':
                top = triggerRect.bottom;
                left = triggerRect.right - menuRect.width;
                break;
            case 'bottom-start':
            default:
                top = triggerRect.bottom;
                left = triggerRect.left;
                break;
        }

        // Apply positioning
        menuContainer.style.top = `${top}px`;
        menuContainer.style.left = `${left}px`;

        // Ensure the menu stays within viewport
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        if (top + menuRect.height > viewportHeight) {
            // If menu would go beyond bottom edge, position above the trigger
            menuContainer.style.top = `${triggerRect.top - menuRect.height}px`;
        }

        if (left + menuRect.width > viewportWidth) {
            // If menu would go beyond right edge, align to right edge of trigger
            menuContainer.style.left = `${triggerRect.right - menuRect.width}px`;
        }
    }

    _onDocumentClick(event) {
        // Close the menu if clicked outside of it
        const clickedInside = this.contains(event.target) ||
            (this._triggerElement && this._triggerElement.contains(event.target)) ||
            this.shadowRoot.contains(event.target);

        if (!clickedInside && this._isOpen) {
            this.close();
        }
    }

    render() {
        // Extract slot content
        const content = Array.from(this.children)
            .map(child => {
                // For menu items, add the necessary class and attributes
                if (child.tagName === 'BUTTON' || child.getAttribute('role') === 'menuitem') {
                    return `<div class="menu-item" role="menuitem" tabindex="0" value="${child.getAttribute('value') || ''}">${child.innerHTML}</div>`;
                } else if (child.tagName === 'HR' || child.classList.contains('divider')) {
                    return '<div class="menu-divider"></div>';
                } else {
                    return child.outerHTML;
                }
            })
            .join('');

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            position: relative;
          }
          
          .menu-container {
            position: fixed;
            display: none;
            min-width: 112px;
            max-width: 280px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 
                        0 8px 10px 1px rgba(0,0,0,.14), 
                        0 3px 14px 2px rgba(0,0,0,.12);
            padding: 8px 0;
            z-index: 1000;
            transform-origin: top left;
            transform: scale(0.8);
            opacity: 0;
            transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), 
                        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
            overflow: auto;
            max-height: calc(100vh - 48px);
          }
          
          .menu-container.menu-open {
            transform: scale(1);
            opacity: 1;
          }
          
          .menu-item {
            position: relative;
            display: flex;
            align-items: center;
            height: 48px;
            padding: 0 16px;
            font-size: 14px;
            font-family: Roboto, sans-serif;
            color: rgba(0, 0, 0, 0.87);
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          
          .menu-item:hover {
            background-color: rgba(0, 0, 0, 0.04);
          }
          
          .menu-item:focus {
            outline: none;
            background-color: rgba(0, 0, 0, 0.08);
          }
          
          .menu-divider {
            height: 1px;
            margin: 8px 0;
            background-color: rgba(0, 0, 0, 0.12);
          }
          
          /* Disabled item styling */
          .menu-item[disabled] {
            color: rgba(0, 0, 0, 0.38);
            pointer-events: none;
          }
        </style>
        <div class="menu-container" role="menu">
          ${content}
        </div>
      `;
    }
}

// Define the custom element
customElements.define('vc-menu', VcMenu);

export default VcMenu;