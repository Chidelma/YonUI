// vc-sparkline.js - Material 2 Sparklines Web Component
// Inspired by Vuetify v3 Sparklines

class VcSparkline extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default configuration
        this._config = {
            autoDraw: true,
            autoDrawDuration: 2000,
            autoDrawEasing: 'ease',
            color: 'primary',
            gradient: null,
            gradientDirection: 'top',
            height: 75,
            labels: [],
            lineWidth: 2,
            padding: 8,
            showLabels: false,
            smooth: false,
            type: 'trend', // trend, bar, area
            value: [],
            fill: false,
            fillColor: undefined,
            fillOpacity: 0.2
        };

        this._data = [];
        this._paths = [];
        this._points = [];
    }

    static get observedAttributes() {
        return [
            'auto-draw', 'auto-draw-duration', 'auto-draw-easing',
            'color', 'gradient', 'gradient-direction', 'height',
            'labels', 'line-width', 'padding', 'show-labels',
            'smooth', 'type', 'value', 'fill', 'fill-color', 'fill-opacity'
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        const camelCaseName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

        if (name === 'value' || name === 'labels') {
            try {
                this._config[camelCaseName] = JSON.parse(newValue);
            } catch (e) {
                console.error(`Error parsing ${name} attribute: ${e.message}`);
            }
        } else if (name === 'auto-draw' || name === 'show-labels' || name === 'smooth' || name === 'fill') {
            this._config[camelCaseName] = newValue !== null && newValue !== 'false';
        } else if (name === 'height' || name === 'line-width' || name === 'padding' || name === 'auto-draw-duration' || name === 'fill-opacity') {
            this._config[camelCaseName] = parseFloat(newValue);
        } else {
            this._config[camelCaseName] = newValue;
        }

        this.render();
    }

    connectedCallback() {
        // Get value from slot if not provided as attribute
        if (!this.hasAttribute('value') && this.textContent.trim()) {
            try {
                this._config.value = JSON.parse(this.textContent.trim());
            } catch (e) {
                console.error(`Error parsing value from content: ${e.message}`);
            }
        }

        this.render();
    }

    get value() {
        return this._config.value;
    }

    set value(newValue) {
        this._config.value = newValue;
        this.render();
    }

    // Calculate points for the sparkline
    _genPoints() {
        const { value, height, padding, lineWidth } = this._config;
        if (!value || value.length < 2) return [];

        const min = Math.min(...value);
        const max = Math.max(...value);
        const total = value.length;
        const boundary = {
            minX: padding,
            minY: padding + lineWidth / 2,
            maxX: this.clientWidth - padding,
            maxY: height - padding - lineWidth / 2
        };

        const range = max - min || 1;
        const ratio = (boundary.maxY - boundary.minY) / range;

        return value.map((val, i) => {
            const x = boundary.minX + (i * (boundary.maxX - boundary.minX) / (total - 1));
            const y = boundary.maxY - ((val - min) * ratio);
            return { x, y };
        });
    }

    // Generate SVG path for the sparkline
    _genPath() {
        const { smooth, type } = this._config;
        const points = this._points;

        if (!points.length) return '';

        if (type === 'bar') {
            const width = (this.clientWidth - 2 * this._config.padding) / points.length;
            const barWidth = width * 0.8;
            const barSpacing = width * 0.2;

            return points.map((point, i) => {
                const x = point.x - barWidth / 2;
                return `M${x},${this._config.height - this._config.padding} V${point.y} h${barWidth} V${this._config.height - this._config.padding}`;
            }).join(' ');
        }

        const curve = smooth ? this._getCurve(points) : this._getLine(points);

        if (type === 'area') {
            const firstPoint = points[0];
            const lastPoint = points[points.length - 1];
            return `M${firstPoint.x},${this._config.height - this._config.padding} ${curve} L${lastPoint.x},${this._config.height - this._config.padding} Z`;
        }

        return curve;
    }

    // Generate fill path for area under the sparkline
    _genFillPath() {
        if (!this._config.fill) return '';

        const points = this._points;
        if (!points.length) return '';

        const { smooth, height, padding } = this._config;
        const firstPoint = points[0];
        const lastPoint = points[points.length - 1];
        const baseline = height - padding;

        const curve = smooth ? this._getCurve(points) : this._getLine(points);

        return `M${firstPoint.x},${baseline} V${firstPoint.y} ${curve} V${baseline} Z`;
    }

    // Generate line path through points
    _getLine(points) {
        return `M${points[0].x},${points[0].y} ` +
            points.slice(1).map(point => `L${point.x},${point.y}`).join(' ');
    }

    // Generate smooth curve through points
    _getCurve(points) {
        if (points.length < 3) {
            return this._getLine(points);
        }

        let path = `M${points[0].x},${points[0].y}`;

        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i - 1] || points[0];
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2] || p2;

            const cp1x = p1.x + (p2.x - p0.x) / 6;
            const cp1y = p1.y + (p2.y - p0.y) / 6;
            const cp2x = p2.x - (p3.x - p1.x) / 6;
            const cp2y = p2.y - (p3.y - p1.y) / 6;

            path += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
        }

        return path;
    }

    // Generate gradient definition if needed
    _genGradient() {
        const { gradient, gradientDirection, color, fillColor } = this._config;

        if (!gradient && !fillColor) return '';

        let gradientAttrs = '';
        if (gradientDirection === 'top') {
            gradientAttrs = 'x1="0%" y1="100%" x2="0%" y2="0%"';
        } else if (gradientDirection === 'right') {
            gradientAttrs = 'x1="0%" y1="0%" x2="100%" y2="0%"';
        } else if (gradientDirection === 'bottom') {
            gradientAttrs = 'x1="0%" y1="0%" x2="0%" y2="100%"';
        } else if (gradientDirection === 'left') {
            gradientAttrs = 'x1="100%" y1="0%" x2="0%" y2="0%"';
        }

        let stops = '';
        if (gradient) {
            if (Array.isArray(gradient)) {
                stops = gradient.map((color, i) =>
                    `<stop offset="${i / (gradient.length - 1)}" stop-color="${color}" />`
                ).join('');
            } else {
                console.error('Gradient must be an array of colors');
            }
        } else {
            // Default gradient from main color to fill color with opacity
            const fillColorValue = fillColor || color;
            stops = `
          <stop offset="0" stop-color="${fillColorValue}" stop-opacity="${this._config.fillOpacity}" />
          <stop offset="1" stop-color="${fillColorValue}" stop-opacity="0" />
        `;
        }

        return `
        <defs>
          <linearGradient id="grad-${this._uid}" ${gradientAttrs}>
            ${stops}
          </linearGradient>
        </defs>
      `;
    }

    // Generate animation for auto-draw
    _genAutoDrawAnimation() {
        if (!this._config.autoDraw) return '';

        const { autoDrawDuration, autoDrawEasing } = this._config;
        const length = this._paths.length > 0 ? this._paths[0].getTotalLength() : 0;

        return `
        <style>
          @keyframes sparkline-auto-draw {
            0% {
              stroke-dashoffset: ${length};
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          .sparkline-path {
            stroke-dasharray: ${length};
            stroke-dashoffset: ${length};
            animation: sparkline-auto-draw ${autoDrawDuration}ms ${autoDrawEasing} forwards;
          }
        </style>
      `;
    }

    // Generate labels
    _genLabels() {
        if (!this._config.showLabels) return '';

        const { labels, value, padding } = this._config;
        const points = this._points;

        if (!points.length) return '';

        const labelsArray = labels.length ? labels : value;

        return points.map((point, i) => {
            const label = labelsArray[i] !== undefined ? labelsArray[i] : '';
            return `
          <text
            x="${point.x}"
            y="${point.y - 8}"
            text-anchor="middle"
            font-size="10"
            fill="${this._config.color}"
          >${label}</text>
        `;
        }).join('');
    }

    // Convert color names to actual colors
    _getColor(colorName) {
        const colors = {
            'primary': '#1976D2',
            'secondary': '#424242',
            'success': '#4CAF50',
            'info': '#2196F3',
            'warning': '#FFC107',
            'error': '#FF5252'
        };

        return colors[colorName] || colorName;
    }

    // Generate a unique ID for this instance
    get _uid() {
        if (!this.__uid) {
            this.__uid = Math.random().toString(36).substring(2, 9);
        }
        return this.__uid;
    }

    // Render the sparkline
    render() {
        // Calculate dimensions
        const width = this.clientWidth || 300;

        // Generate points
        this._points = this._genPoints();

        // Generate path
        const path = this._genPath();
        const fillPath = this._genFillPath();

        // Generate CSS
        const css = `
        :host {
          display: inline-block;
          width: 100%;
          line-height: 0;
        }
        svg {
          overflow: visible;
        }
      `;

        // Create SVG
        const color = this._getColor(this._config.color);
        const fillColor = this._config.fillColor ? this._getColor(this._config.fillColor) : color;

        // Generate template
        this.shadowRoot.innerHTML = `
        <style>${css}</style>
        ${this._genAutoDrawAnimation()}
        <svg width="100%" height="${this._config.height}" preserveAspectRatio="none">
          ${this._genGradient()}
          ${fillPath ? `<path 
            d="${fillPath}" 
            fill="${this._config.gradient ? `url(#grad-${this._uid})` : fillColor}" 
            opacity="${this._config.fillOpacity}" 
          />` : ''}
          <path 
            class="sparkline-path" 
            d="${path}" 
            fill="none" 
            stroke="${color}" 
            stroke-width="${this._config.lineWidth}" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
          ${this._genLabels()}
        </svg>
      `;

        // Store path elements for animation
        this._paths = Array.from(this.shadowRoot.querySelectorAll('.sparkline-path'));
    }
}

// Register the custom element
customElements.define('vc-sparkline', VcSparkline);

export default VcSparkline;