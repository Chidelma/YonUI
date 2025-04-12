/**
 * Material 2 Cards Web Component
 * 
 * A custom web component that implements Material Design 2 Card patterns.
 * This component supports various card types including simple, media, and action cards.
 */
class VCCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  static get observedAttributes() {
    return ['title', 'subtitle', 'elevation', 'outlined', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._render();
    }
  }

  connectedCallback() {
    this._render();
  }

  get title() {
    return this.getAttribute('title') || '';
  }

  set title(value) {
    this.setAttribute('title', value);
  }

  get subtitle() {
    return this.getAttribute('subtitle') || '';
  }

  set subtitle(value) {
    this.setAttribute('subtitle', value);
  }

  get elevation() {
    return parseInt(this.getAttribute('elevation') || '1', 10);
  }

  set elevation(value) {
    this.setAttribute('elevation', value);
  }

  get outlined() {
    return this.hasAttribute('outlined');
  }

  set outlined(value) {
    if (value) {
      this.setAttribute('outlined', '');
    } else {
      this.removeAttribute('outlined');
    }
  }

  get image() {
    return this.getAttribute('image') || '';
  }

  set image(value) {
    this.setAttribute('image', value);
  }

  _render() {
    const styles = `
      :host {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }
      
      .card {
        background-color: #fff;
        border-radius: 4px;
        overflow: hidden;
        transition: box-shadow 0.3s ease-in-out;
        width: 100%;
        box-sizing: border-box;
      }
      
      .card.outlined {
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: none !important;
      }
      
      .card.elevation-1 { box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12); }
      .card.elevation-2 { box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); }
      .card.elevation-3 { box-shadow: 0 3px 3px -2px rgba(0,0,0,.2), 0 3px 4px 0 rgba(0,0,0,.14), 0 1px 8px 0 rgba(0,0,0,.12); }
      .card.elevation-4 { box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); }
      .card.elevation-5 { box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12); }
      
      .card-media {
        width: 100%;
        background-size: cover;
        background-position: center;
        padding-top: 56.25%; /* 16:9 aspect ratio */
        position: relative;
      }
      
      .card-header {
        padding: 16px 16px 0;
      }
      
      .card-title {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.87);
      }
      
      .card-subtitle {
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.6);
        margin-top: 4px;
      }
      
      .card-content {
        padding: 16px;
        font-size: 14px;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.6);
      }
      
      .card-actions {
        display: flex;
        padding: 8px;
        box-sizing: border-box;
        align-items: center;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
      }
      
      ::slotted(button) {
        margin: 0 8px 0 0;
        padding: 0 8px;
        min-width: 64px;
        height: 36px;
        line-height: 36px;
        background: transparent;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        cursor: pointer;
        color: #6200ee;
        transition: background-color 0.3s;
      }
      
      ::slotted(button:hover) {
        background-color: rgba(98, 0, 238, 0.04);
      }
      
      ::slotted(button:focus) {
        outline: none;
        background-color: rgba(98, 0, 238, 0.12);
      }
    `;

    const elevationClass = this.outlined ? 'outlined' : `elevation-${this.elevation}`;
    const mediaSection = this.image ?
      `<div class="card-media" style="background-image: url('${this.image}')"></div>` : '';
    const headerSection = (this.title || this.subtitle) ?
      `<div class="card-header">
         ${this.title ? `<h2 class="card-title">${this.title}</h2>` : ''}
         ${this.subtitle ? `<p class="card-subtitle">${this.subtitle}</p>` : ''}
       </div>` : '';

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <div class="card ${elevationClass}">
        ${mediaSection}
        ${headerSection}
        <div class="card-content">
          <slot name="content"></slot>
        </div>
        <div class="card-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('vc-card', VCCard);

export default VCCard;