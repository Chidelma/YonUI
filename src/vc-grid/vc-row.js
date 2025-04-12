// vc-row.js
// A web component inspired by Vuetify's v-row

class VcRow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['dense', 'no-gutters', 'align', 'justify', 'wrap'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const dense = this.hasAttribute('dense');
        const noGutters = this.hasAttribute('no-gutters');
        const align = this.getAttribute('align') || 'start';
        const justify = this.getAttribute('justify') || 'start';
        const wrap = this.getAttribute('wrap') !== 'no-wrap';

        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: flex;
            flex-wrap: ${wrap ? 'wrap' : 'nowrap'};
            flex: 1 1 auto;
            margin: ${noGutters ? '0' : '-12px'};
            box-sizing: border-box;
            align-items: ${this._getAlignValue(align)};
            justify-content: ${this._getJustifyValue(justify)};
          }
  
          ${dense ? ':host { margin: -4px; }' : ''}
          ${dense ? '::slotted(vc-col) { padding: 4px; }' : ''}
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

customElements.define('vc-row', VcRow);

export default VcRow;