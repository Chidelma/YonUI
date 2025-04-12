/**
 * vc-snackbar.js
 * A Material Design 2 Snackbar implementation using Web Components
 */
class VcSnackbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Default properties
    this._message = '';
    this._action = '';
    this._actionHandler = null;
    this._duration = 5000;
    this._position = 'bottom';
    this._isOpen = false;
    this._timeoutId = null;

    this.render();
  }

  static get observedAttributes() {
    return ['message', 'action', 'duration', 'position', 'open'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'message':
        this._message = newValue;
        this.updateMessage();
        break;
      case 'action':
        this._action = newValue;
        this.updateAction();
        break;
      case 'duration':
        this._duration = Number(newValue) || 5000;
        break;
      case 'position':
        this._position = newValue || 'bottom';
        this.updatePosition();
        break;
      case 'open':
        if (newValue === null) {
          this.close();
        } else {
          this.open();
        }
        break;
    }
  }

  // Getters and setters
  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this.setAttribute('message', value);
    this.updateMessage();
  }

  get action() {
    return this._action;
  }

  set action(value) {
    this._action = value;
    this.setAttribute('action', value);
    this.updateAction();
  }

  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = Number(value) || 5000;
    this.setAttribute('duration', value);
  }

  get position() {
    return this._position;
  }

  set position(value) {
    this._position = value || 'bottom';
    this.setAttribute('position', value);
    this.updatePosition();
  }

  get isOpen() {
    return this._isOpen;
  }

  // Public methods
  open() {
    if (this._isOpen) return;

    this._isOpen = true;
    this.setAttribute('open', '');
    const container = this.shadowRoot.querySelector('.snackbar-container');
    container.classList.add('show');

    // Auto close after duration, if not -1 (stay open)
    if (this._duration !== -1) {
      this._timeoutId = setTimeout(() => {
        this.close();
      }, this._duration);
    }

    // Dispatch open event
    this.dispatchEvent(new CustomEvent('vc-snackbar-open', {
      bubbles: true,
      composed: true
    }));
  }

  close() {
    if (!this._isOpen) return;

    this._isOpen = false;
    this.removeAttribute('open');
    const container = this.shadowRoot.querySelector('.snackbar-container');
    container.classList.remove('show');

    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }

    // Dispatch close event
    this.dispatchEvent(new CustomEvent('vc-snackbar-close', {
      bubbles: true,
      composed: true
    }));
  }

  setActionHandler(handler) {
    if (typeof handler === 'function') {
      this._actionHandler = handler;
    }
  }

  // Private methods
  updateMessage() {
    const messageEl = this.shadowRoot.querySelector('.snackbar-message');
    if (messageEl) {
      messageEl.textContent = this._message;
    }
  }

  updateAction() {
    const actionEl = this.shadowRoot.querySelector('.snackbar-action');
    if (actionEl) {
      if (this._action) {
        actionEl.textContent = this._action;
        actionEl.style.display = 'inline-block';
      } else {
        actionEl.style.display = 'none';
      }
    }
  }

  updatePosition() {
    const container = this.shadowRoot.querySelector('.snackbar-container');
    if (container) {
      container.className = 'snackbar-container';
      container.classList.add(`position-${this._position}`);
      if (this._isOpen) {
        container.classList.add('show');
      }
    }
  }

  handleActionClick(e) {
    if (this._actionHandler) {
      this._actionHandler(e);
    }
    this.close();

    // Dispatch action event
    this.dispatchEvent(new CustomEvent('vc-snackbar-action', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: fixed;
        z-index: 10000;
        left: 0;
        right: 0;
        pointer-events: none;
      }
      
      .snackbar-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        min-height: 48px;
        padding: 14px 16px;
        background-color: #323232;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.4;
        border-radius: 4px;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        transform: translateY(100%);
        transition: transform 0.25s cubic-bezier(0, 0, 0.2, 1);
        max-width: 600px;
        margin: 0 auto;
        pointer-events: auto;
        opacity: 0;
      }
      
      .snackbar-container.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .position-bottom {
        position: fixed;
        bottom: 16px;
        left: 16px;
        right: 16px;
      }
      
      .position-top {
        position: fixed;
        top: 16px;
        left: 16px;
        right: 16px;
        transform: translateY(-100%);
      }
      
      .position-top.show {
        transform: translateY(0);
      }
      
      .position-bottom-center {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translate(-50%, 100%);
      }
      
      .position-bottom-center.show {
        transform: translate(-50%, 0);
      }
      
      .position-top-center {
        position: fixed;
        top: 16px;
        left: 50%;
        transform: translate(-50%, -100%);
      }
      
      .position-top-center.show {
        transform: translate(-50%, 0);
      }
      
      .snackbar-message {
        flex-grow: 1;
        margin-right: 48px;
      }
      
      .snackbar-action {
        background: none;
        border: none;
        color: #bb86fc;
        text-transform: uppercase;
        font-weight: 500;
        padding: 4px 8px;
        margin: -4px -8px -4px 8px;
        cursor: pointer;
        outline: none;
        font-family: inherit;
        font-size: 14px;
        letter-spacing: 0.5px;
      }
      
      .snackbar-action:hover,
      .snackbar-action:focus {
        background-color: rgba(187, 134, 252, 0.12);
        border-radius: 4px;
      }
    `;

    const container = document.createElement('div');
    container.className = `snackbar-container position-${this._position}`;

    const message = document.createElement('div');
    message.className = 'snackbar-message';
    message.textContent = this._message;

    const action = document.createElement('button');
    action.className = 'snackbar-action';
    action.textContent = this._action;
    if (!this._action) {
      action.style.display = 'none';
    }

    action.addEventListener('click', (e) => this.handleActionClick(e));

    container.appendChild(message);
    container.appendChild(action);

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(container);
  }
}

customElements.define('vc-snackbar', VcSnackbar);

export default VcSnackbar;