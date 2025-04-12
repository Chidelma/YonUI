/**
 * Material 2 Banner Web Component
 * 
 * A customizable banner component based on Material Design 2 guidelines.
 * Supports different types, actions, and customization options.
 */
class VcBanner extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Default configuration
    this._type = 'info';
    this._dismissible = false;
    this._actions = [];
    this._message = '';
    this._icon = null;
    this._visible = true;
    
    this.render();
  }
  
  static get observedAttributes() {
    return ['type', 'message', 'dismissible', 'actions', 'visible', 'icon'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'type':
        this._type = newValue || 'info';
        break;
      case 'message':
        this._message = newValue || '';
        break;
      case 'dismissible':
        this._dismissible = newValue !== null && newValue !== 'false';
        break;
      case 'actions':
        try {
          this._actions = JSON.parse(newValue) || [];
        } catch (e) {
          console.error('Invalid actions JSON in vc-banner:', e);
          this._actions = [];
        }
        break;
      case 'visible':
        this._visible = newValue !== 'false';
        break;
      case 'icon':
        this._icon = newValue;
        break;
    }
    
    this.render();
  }
  
  // Getters and setters for properties
  get type() { return this._type; }
  set type(value) {
    this.setAttribute('type', value);
  }
  
  get message() { return this._message; }
  set message(value) {
    this.setAttribute('message', value);
  }
  
  get dismissible() { return this._dismissible; }
  set dismissible(value) {
    if (value) {
      this.setAttribute('dismissible', '');
    } else {
      this.removeAttribute('dismissible');
    }
  }
  
  get actions() { return this._actions; }
  set actions(value) {
    this.setAttribute('actions', JSON.stringify(value));
  }
  
  get visible() { return this._visible; }
  set visible(value) {
    this.setAttribute('visible', value ? 'true' : 'false');
  }
  
  get icon() { return this._icon; }
  set icon(value) {
    if (value) {
      this.setAttribute('icon', value);
    } else {
      this.removeAttribute('icon');
    }
  }
  
  dismiss() {
    this._visible = false;
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true }));
    this.render();
  }
  
  // Helper method to get the right icon based on type
  getIconForType() {
    if (this._icon) return this._icon;
    
    switch (this._type) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'success':
        return 'check_circle';
      default:
        return 'info';
    }
  }
  
  render() {
    if (!this._visible) {
      this.shadowRoot.innerHTML = '';
      return;
    }
    
    const typeColorMap = {
      'info': {
        background: '#E3F2FD',
        icon: '#2196F3',
        text: '#0D47A1'
      },
      'warning': {
        background: '#FFF3E0',
        icon: '#FF9800',
        text: '#E65100'
      },
      'error': {
        background: '#FFEBEE',
        icon: '#F44336',
        text: '#B71C1C'
      },
      'success': {
        background: '#E8F5E9',
        icon: '#4CAF50',
        text: '#1B5E20'
      }
    };
    
    const colors = typeColorMap[this._type] || typeColorMap.info;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Roboto, 'Helvetica Neue', sans-serif;
        }
        
        .banner {
          display: flex;
          padding: 16px;
          background-color: ${colors.background};
          border-radius: 4px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          align-items: flex-start;
        }
        
        .icon {
          color: ${colors.icon};
          margin-right: 16px;
          flex-shrink: 0;
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
        }
        
        .content {
          flex-grow: 1;
          color: ${colors.text};
        }
        
        .message {
          margin-bottom: 8px;
          line-height: 1.5;
        }
        
        .actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        
        button {
          border: none;
          background: transparent;
          padding: 8px 16px;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.5px;
          cursor: pointer;
          color: ${colors.icon};
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        button:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        button.primary {
          background-color: ${colors.icon};
          color: white;
        }
        
        button.primary:hover {
          filter: brightness(1.1);
        }
        
        .dismiss {
          flex-shrink: 0;
          cursor: pointer;
          color: ${colors.text};
          background: transparent;
          border: none;
          width: 24px;
          height: 24px;
          font-family: 'Material Icons';
          font-size: 24px;
          margin-left: 8px;
          opacity: 0.7;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        
        .dismiss:hover {
          opacity: 1;
        }
      </style>
      
      <div class="banner" role="alert">
        <div class="icon">${this.getIconForType()}</div>
        <div class="content">
          <div class="message">${this._message}</div>
          <div class="actions">
            ${this._actions.map(action => `
              <button 
                class="${action.primary ? 'primary' : 'secondary'}"
                data-action="${action.action || ''}"
              >
                ${action.label}
              </button>
            `).join('')}
          </div>
        </div>
        ${this._dismissible ? `<button class="dismiss" aria-label="Dismiss">close</button>` : ''}
      </div>
    `;
    
    // Add event listeners
    const actionButtons = this.shadowRoot.querySelectorAll('.actions button');
    actionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const actionName = button.getAttribute('data-action');
        this.dispatchEvent(new CustomEvent('action', {
          bubbles: true,
          detail: { action: actionName }
        }));
      });
    });
    
    if (this._dismissible) {
      const dismissButton = this.shadowRoot.querySelector('.dismiss');
      dismissButton.addEventListener('click', () => this.dismiss());
    }
  }
}

// Register the web component
customElements.define('vc-banner', VcBanner);

export default VcBanner;