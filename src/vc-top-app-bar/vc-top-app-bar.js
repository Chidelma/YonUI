// vc-top-app-bar.js
// Material 2 App Bar Top Web Component

class VcTopAppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create the initial structure
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'color', 'elevation'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    // Handle event listeners when connected to DOM
    this.setupEventListeners();
  }

  disconnectedCallback() {
    // Clean up event listeners when removed from DOM
    this.cleanupEventListeners();
  }

  setupEventListeners() {
    // Get navigation icon if exists
    const navIcon = this.shadowRoot.querySelector('.vc-top-app-bar__navigation-icon');
    if (navIcon) {
      navIcon.addEventListener('click', this.handleNavigationClick.bind(this));
    }

    // Get action items
    const actionItems = this.shadowRoot.querySelectorAll('.vc-top-app-bar__action-item');
    actionItems.forEach(item => {
      item.addEventListener('click', this.handleActionItemClick.bind(this));
    });
  }

  cleanupEventListeners() {
    const navIcon = this.shadowRoot.querySelector('.vc-top-app-bar__navigation-icon');
    if (navIcon) {
      navIcon.removeEventListener('click', this.handleNavigationClick.bind(this));
    }

    const actionItems = this.shadowRoot.querySelectorAll('.vc-top-app-bar__action-item');
    actionItems.forEach(item => {
      item.removeEventListener('click', this.handleActionItemClick.bind(this));
    });
  }

  handleNavigationClick(event) {
    // Dispatch a custom event for navigation icon click
    this.dispatchEvent(new CustomEvent('navigation-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }

  handleActionItemClick(event) {
    const actionItem = event.currentTarget;
    const actionIndex = Array.from(
      this.shadowRoot.querySelectorAll('.vc-top-app-bar__action-item')
    ).indexOf(actionItem);

    // Dispatch a custom event for action item click
    this.dispatchEvent(new CustomEvent('action-click', {
      bubbles: true,
      composed: true,
      detail: {
        index: actionIndex,
        originalEvent: event
      }
    }));
  }

  render() {
    const title = this.getAttribute('title') || 'App Bar';
    const color = this.getAttribute('color') || 'primary';
    const elevation = this.hasAttribute('elevation') ? 'vc-top-app-bar--elevated' : '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Roboto, 'Helvetica Neue', sans-serif;
        }
        
        .vc-top-app-bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 0 16px;
          width: 100%;
          height: 56px;
          box-sizing: border-box;
          background-color: var(--vc-top-app-bar-color, #6200ee);
          color: white;
          z-index: 4;
        }
        
        .vc-top-app-bar--elevated {
          box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
        }
        
        .vc-top-app-bar--primary {
          background-color: #6200ee;
        }
        
        .vc-top-app-bar--secondary {
          background-color: #03dac6;
          color: rgba(0, 0, 0, 0.87);
        }
        
        .vc-top-app-bar--success {
          background-color: #4caf50;
        }
        
        .vc-top-app-bar--danger {
          background-color: #f44336;
        }
        
        .vc-top-app-bar--warning {
          background-color: #ff9800;
          color: rgba(0, 0, 0, 0.87);
        }
        
        .vc-top-app-bar--info {
          background-color: #2196f3;
        }
        
        .vc-top-app-bar__row {
          display: flex;
          position: relative;
          height: 56px;
          width: 100%;
          align-items: center;
        }
        
        .vc-top-app-bar__section {
          display: inline-flex;
          flex: 1 1 auto;
          align-items: center;
          min-width: 0;
          z-index: 1;
        }
        
        .vc-top-app-bar__section--align-start {
          justify-content: flex-start;
          order: -1;
        }
        
        .vc-top-app-bar__section--align-end {
          justify-content: flex-end;
          order: 1;
        }
        
        .vc-top-app-bar__title {
          font-size: 20px;
          font-weight: 500;
          letter-spacing: 0.15px;
          padding-left: 16px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          z-index: 1;
        }
        
        .vc-top-app-bar__navigation-icon,
        .vc-top-app-bar__action-item {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 48px;
          height: 48px;
          padding: 12px;
          border: none;
          background-color: transparent;
          color: inherit;
          cursor: pointer;
          border-radius: 50%;
          box-sizing: border-box;
          transition: background-color 0.15s;
        }
        
        .vc-top-app-bar__navigation-icon:hover,
        .vc-top-app-bar__action-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .vc-top-app-bar--secondary .vc-top-app-bar__navigation-icon:hover,
        .vc-top-app-bar--warning .vc-top-app-bar__navigation-icon:hover,
        .vc-top-app-bar--secondary .vc-top-app-bar__action-item:hover,
        .vc-top-app-bar--warning .vc-top-app-bar__action-item:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
      </style>
      
      <div class="vc-top-app-bar vc-top-app-bar--${color} ${elevation}">
        <div class="vc-top-app-bar__row">
          <section class="vc-top-app-bar__section vc-top-app-bar__section--align-start">
            <slot name="navigation-icon">
              <!-- Default navigation icon if none provided -->
              <button class="vc-top-app-bar__navigation-icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor"/>
                </svg>
              </button>
            </slot>
            <span class="vc-top-app-bar__title">${title}</span>
            <slot name="title-suffix"></slot>
          </section>
          
          <section class="vc-top-app-bar__section vc-top-app-bar__section--align-end">
            <slot name="actions"></slot>
          </section>
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('vc-top-app-bar', VcTopAppBar);

export default VcTopAppBar;