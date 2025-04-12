// vc-col.js
// A web component inspired by Vuetify's v-col

class VcCol extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['cols', 'sm', 'md', 'lg', 'xl', 'offset', 'align', 'justify', 'order'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const cols = this.getAttribute('cols') || '12';
        const sm = this.getAttribute('sm') || null;
        const md = this.getAttribute('md') || null;
        const lg = this.getAttribute('lg') || null;
        const xl = this.getAttribute('xl') || null;
        const offset = this.getAttribute('offset') || null;
        const align = this.getAttribute('align') || 'start';
        const justify = this.getAttribute('justify') || 'start';
        const order = this.getAttribute('order') || null;

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            box-sizing: border-box;
            flex-basis: ${(parseInt(cols) / 12) * 100}%;
            max-width: ${(parseInt(cols) / 12) * 100}%;
            padding: 12px;
            display: flex;
            flex-direction: column;
          }
  
          ${sm ? `@media (min-width: 600px) { :host { flex-basis: ${(parseInt(sm) / 12) * 100}%; max-width: ${(parseInt(sm) / 12) * 100}%; } }` : ''}
          ${md ? `@media (min-width: 960px) { :host { flex-basis: ${(parseInt(md) / 12) * 100}%; max-width: ${(parseInt(md) / 12) * 100}%; } }` : ''}
          ${lg ? `@media (min-width: 1264px) { :host { flex-basis: ${(parseInt(lg) / 12) * 100}%; max-width: ${(parseInt(lg) / 12) * 100}%; } }` : ''}
          ${xl ? `@media (min-width: 1904px) { :host { flex-basis: ${(parseInt(xl) / 12) * 100}%; max-width: ${(parseInt(xl) / 12) * 100}%; } }` : ''}
  
          ${offset ? `:host { margin-left: ${(parseInt(offset) / 12) * 100}%; }` : ''}
          ${order ? `:host { order: ${order}; }` : ''}
  
          :host {
            align-items: ${this._getAlignValue(align)};
            justify-content: ${this._getJustifyValue(justify)};
          }
  
          ::slotted(*) {
            width: 100%;
          }
        </style>
        <slot></slot>
      `;
    }

    _getAlignValue(align) {
        const alignMap = {
            'start': 'flex-start',
            'end': 'flex-end',
            'center': 'center',
            'baseline': 'baseline',
            'stretch': 'stretch'
        };
        return alignMap[align] || 'flex-start';
    }

    _getJustifyValue(justify) {
        const justifyMap = {
            'start': 'flex-start',
            'end': 'flex-end',
            'center': 'center',
            'space-between': 'space-between',
            'space-around': 'space-around',
            'space-evenly': 'space-evenly'
        };
        return justifyMap[justify] || 'flex-start';
    }
}

customElements.define('vc-col', VcCol);

export default VcCol;