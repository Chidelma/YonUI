// Material 2 Expansion Panels - Web Component
// Inspired by Vuetify v3's expansion panels

class ExpansionPanels extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._accordionMode = false;
        this._panels = [];
        this._render();
    }

    static get observedAttributes() {
        return ['accordion'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'accordion') {
            this._accordionMode = newValue !== null;
            this._updateAccordionBehavior();
        }
    }

    connectedCallback() {
        this._updatePanels();
        this.addEventListener('panel-toggle', this._handlePanelToggle.bind(this));
    }

    disconnectedCallback() {
        this.removeEventListener('panel-toggle', this._handlePanelToggle);
    }

    _handlePanelToggle(event) {
        const toggledPanel = event.detail.panel;

        if (this._accordionMode && toggledPanel.expanded) {
            // In accordion mode, close other panels when one is expanded
            this._panels.forEach(panel => {
                if (panel !== toggledPanel && panel.expanded) {
                    panel.collapse();
                }
            });
        }
    }

    _updatePanels() {
        // Get all child panels
        this._panels = Array.from(this.querySelectorAll('vc-expansion-panel'));
        this._updateAccordionBehavior();
    }

    _updateAccordionBehavior() {
        if (this._accordionMode) {
            // Ensure only one panel is open at a time
            const expandedPanels = this._panels.filter(panel => panel.expanded);
            if (expandedPanels.length > 1) {
                // Keep only the first expanded panel open
                expandedPanels.slice(1).forEach(panel => panel.collapse());
            }
        }
    }

    _render() {
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: block;
          width: 100%;
          font-family: Roboto, sans-serif;
          --panel-border-radius: 4px;
          --panel-elevation: 0 2px 4px rgba(0, 0, 0, 0.12);
          --panel-background: #fff;
          --panel-header-height: 48px;
          --panel-header-color: rgba(0, 0, 0, 0.87);
          --panel-header-active-color: #1976d2;
          --panel-disabled-color: rgba(0, 0, 0, 0.38);
          --panel-transition-duration: 0.3s;
        }
        
        ::slotted(vc-expansion-panel) {
          margin-bottom: 8px;
        }
        
        ::slotted(vc-expansion-panel:last-child) {
          margin-bottom: 0;
        }
      `;

        const slot = document.createElement('slot');

        this._shadow.appendChild(style);
        this._shadow.appendChild(slot);
    }
}

class ExpansionPanel extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._expanded = false;
        this._disabled = false;
        this._render();
    }

    static get observedAttributes() {
        return ['expanded', 'disabled'];
    }

    get expanded() {
        return this._expanded;
    }

    get disabled() {
        return this._disabled;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'expanded') {
            this._expanded = newValue !== null;
            this._updateExpandedState();
        } else if (name === 'disabled') {
            this._disabled = newValue !== null;
            this._updateDisabledState();
        }
    }

    connectedCallback() {
        this._header = this._shadow.querySelector('.expansion-panel-header');
        this._content = this._shadow.querySelector('.expansion-panel-content');

        this._header.addEventListener('click', this._handleHeaderClick.bind(this));

        // Initial state setup
        this._updateExpandedState();
        this._updateDisabledState();
    }

    disconnectedCallback() {
        this._header.removeEventListener('click', this._handleHeaderClick);
    }

    _handleHeaderClick() {
        if (this._disabled) return;

        this.toggle();
    }

    toggle() {
        if (this._disabled) return;

        this._expanded = !this._expanded;
        this._updateExpandedState();

        // Dispatch custom event for the panel container to handle accordion behavior
        const event = new CustomEvent('panel-toggle', {
            bubbles: true,
            composed: true,
            detail: { panel: this }
        });
        this.dispatchEvent(event);
    }

    expand() {
        if (!this._expanded && !this._disabled) {
            this._expanded = true;
            this._updateExpandedState();

            const event = new CustomEvent('panel-toggle', {
                bubbles: true,
                composed: true,
                detail: { panel: this }
            });
            this.dispatchEvent(event);
        }
    }

    collapse() {
        if (this._expanded) {
            this._expanded = false;
            this._updateExpandedState();
        }
    }

    _updateExpandedState() {
        if (!this._shadow) return;

        const panel = this._shadow.querySelector('.expansion-panel');
        const header = this._shadow.querySelector('.expansion-panel-header');
        const content = this._shadow.querySelector('.expansion-panel-content');
        const icon = this._shadow.querySelector('.expansion-panel-icon');

        if (panel && header && content && icon) {
            if (this._expanded) {
                this.setAttribute('expanded', '');
                panel.classList.add('expanded');
                header.classList.add('expanded');
                content.style.maxHeight = `${content.scrollHeight}px`;
                icon.style.transform = 'rotate(180deg)';
            } else {
                this.removeAttribute('expanded');
                panel.classList.remove('expanded');
                header.classList.remove('expanded');
                content.style.maxHeight = '0px';
                icon.style.transform = 'rotate(0deg)';
            }
        }
    }

    _updateDisabledState() {
        if (!this._shadow) return;

        const panel = this._shadow.querySelector('.expansion-panel');

        if (panel) {
            if (this._disabled) {
                this.setAttribute('disabled', '');
                panel.classList.add('disabled');
            } else {
                this.removeAttribute('disabled');
                panel.classList.remove('disabled');
            }
        }
    }

    _render() {
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: block;
          width: 100%;
        }
        
        .expansion-panel {
          background-color: var(--panel-background, #fff);
          border-radius: var(--panel-border-radius, 4px);
          box-shadow: var(--panel-elevation, 0 2px 4px rgba(0, 0, 0, 0.12));
          overflow: hidden;
          transition: box-shadow var(--panel-transition-duration, 0.3s) ease;
        }
        
        .expansion-panel.expanded {
          box-shadow: var(--panel-elevation-expanded, 0 3px 6px rgba(0, 0, 0, 0.16));
        }
        
        .expansion-panel.disabled {
          opacity: 0.6;
          pointer-events: none;
        }
        
        .expansion-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: var(--panel-header-height, 48px);
          padding: 0 16px;
          color: var(--panel-header-color, rgba(0, 0, 0, 0.87));
          cursor: pointer;
          user-select: none;
          position: relative;
          transition: all var(--panel-transition-duration, 0.3s) ease;
        }
        
        .expansion-panel-header:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        .expansion-panel-header.expanded {
          color: var(--panel-header-active-color, #1976d2);
        }
        
        .expansion-panel-header-content {
          flex: 1;
          display: flex;
          align-items: center;
        }
        
        .expansion-panel-icon {
          transition: transform var(--panel-transition-duration, 0.3s) ease;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .expansion-panel-icon svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }
        
        .expansion-panel-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--panel-transition-duration, 0.3s) ease;
        }
        
        .expansion-panel-content-inner {
          padding: 0 16px 16px 16px;
        }
      `;

        const template = document.createElement('div');
        template.innerHTML = `
        <div class="expansion-panel">
          <div class="expansion-panel-header">
            <div class="expansion-panel-header-content">
              <slot name="header"></slot>
            </div>
            <div class="expansion-panel-icon">
              <svg viewBox="0 0 24 24">
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
              </svg>
            </div>
          </div>
          <div class="expansion-panel-content">
            <div class="expansion-panel-content-inner">
              <slot name="content"></slot>
            </div>
          </div>
        </div>
      `;

        this._shadow.appendChild(style);
        this._shadow.appendChild(template.firstElementChild);
    }
}

// Define custom elements
customElements.define('vc-expansion-panels', ExpansionPanels);
customElements.define('vc-expansion-panel', ExpansionPanel);

export { ExpansionPanels, ExpansionPanel };