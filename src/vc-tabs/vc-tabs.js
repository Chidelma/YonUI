/**
 * Material 2 Tabs - Web Component Implementation
 * A custom element implementation of Material Design 2 tabs
 */

// Define the Tab Item component
class Tab extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            padding: 12px 16px;
            cursor: pointer;
            font-family: Roboto, Arial, sans-serif;
            font-size: 14px;
            font-weight: 500;
            text-transform: uppercase;
            color: rgba(0, 0, 0, 0.6);
            transition: color 0.3s ease, background-color 0.3s ease;
            position: relative;
            user-select: none;
            white-space: nowrap;
          }
          
          :host(:hover) {
            background-color: rgba(0, 0, 0, 0.04);
          }
          
          :host([active]) {
            color: #673ab7;
          }
          
          .indicator {
            display: none;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #673ab7;
            transform-origin: left center;
          }
          
          :host([active]) .indicator {
            display: block;
          }
          
          .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
            transform: scale(0);
            pointer-events: none;
          }
          
          .ripple.animate {
            animation: ripple-effect 0.6s linear;
          }
          
          @keyframes ripple-effect {
            to {
              transform: scale(2);
              opacity: 0;
            }
          }
        </style>
        <slot></slot>
        <div class="indicator"></div>
      `;

        this._ripples = [];
        this._handleClick = this._handleClick.bind(this);
    }

    static get observedAttributes() {
        return ['active'];
    }

    get active() {
        return this.hasAttribute('active');
    }

    set active(value) {
        if (value) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }
    }

    connectedCallback() {
        this.addEventListener('click', this._handleClick);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this._handleClick);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active' && this.active) {
            const event = new CustomEvent('tab-selected', {
                bubbles: true,
                composed: true,
                detail: { tab: this }
            });
            this.dispatchEvent(event);
        }
    }

    _handleClick(e) {
        this.active = true;
        this._createRipple(e);
    }

    _createRipple(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.shadowRoot.appendChild(ripple);

        // Force reflow
        ripple.offsetWidth;

        ripple.classList.add('animate');

        // Clean up after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Define the Tabs Container component
class Tabs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            font-family: Roboto, Arial, sans-serif;
          }
          
          .tabs-header {
            display: flex;
            position: relative;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            overflow-x: auto;
            scrollbar-width: none; /* Firefox */
          }
          
          .tabs-header::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Edge */
          }
          
          .tabs-content {
            padding: 24px 16px;
          }
          
          ::slotted([slot="content"]) {
            display: none;
          }
          
          ::slotted([slot="content"][active]) {
            display: block;
          }
        </style>
        <div class="tabs-header">
          <slot name="tab"></slot>
        </div>
        <div class="tabs-content">
          <slot name="content"></slot>
        </div>
      `;

        this._handleTabSelected = this._handleTabSelected.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.addEventListener('tab-selected', this._handleTabSelected);

        // Initialize: select first tab or the one marked as active
        setTimeout(() => {
            let tabs = this._getTabs();
            let activeTab = tabs.find(tab => tab.hasAttribute('active'));

            if (!activeTab && tabs.length > 0) {
                tabs[0].active = true;
            } else if (activeTab) {
                this._activateTab(activeTab);
            }
        }, 0);
    }

    disconnectedCallback() {
        this.shadowRoot.removeEventListener('tab-selected', this._handleTabSelected);
    }

    _getTabs() {
        return Array.from(this.querySelectorAll('vc-tab[slot="tab"]'));
    }

    _getContents() {
        return Array.from(this.querySelectorAll('[slot="content"]'));
    }

    _handleTabSelected(e) {
        const selectedTab = e.detail.tab;
        this._activateTab(selectedTab);
    }

    _activateTab(selectedTab) {
        // Deactivate all tabs except the selected one
        const tabs = this._getTabs();
        tabs.forEach(tab => {
            if (tab !== selectedTab) {
                tab.active = false;
            }
        });

        // Show the corresponding content
        const contents = this._getContents();
        const tabIndex = tabs.indexOf(selectedTab);

        contents.forEach((content, index) => {
            if (index === tabIndex) {
                content.setAttribute('active', '');
            } else {
                content.removeAttribute('active');
            }
        });

        // Dispatch a change event
        const event = new CustomEvent('tabs-changed', {
            bubbles: true,
            detail: {
                selectedIndex: tabIndex,
                selectedTab: selectedTab
            }
        });
        this.dispatchEvent(event);
    }

    // Public API
    selectTab(index) {
        const tabs = this._getTabs();
        if (index >= 0 && index < tabs.length) {
            tabs[index].active = true;
        }
    }
}

// Register the custom elements
customElements.define('vc-tab', Tab);
customElements.define('vc-tabs', Tabs);

export { Tab, Tabs };