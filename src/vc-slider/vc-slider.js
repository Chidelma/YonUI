/**
 * Material 2 Slider Web Component
 * 
 * A customizable slider that follows Material Design 2 guidelines
 */
class VcSlider extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default properties
        this._min = 0;
        this._max = 100;
        this._value = 0;
        this._step = 1;
        this._disabled = false;
        this._discrete = false;
        this._color = '#6200ee'; // Material primary color

        // Bind methods to this
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);

        // Create DOM structure
        this._render();
    }

    // Define observed attributes
    static get observedAttributes() {
        return ['min', 'max', 'value', 'step', 'disabled', 'discrete', 'color'];
    }

    // Lifecycle callbacks
    connectedCallback() {
        this._track = this.shadowRoot.querySelector('.slider-track');
        this._thumb = this.shadowRoot.querySelector('.slider-thumb');
        this._thumbLabel = this.shadowRoot.querySelector('.slider-thumb-label');
        this._filledTrack = this.shadowRoot.querySelector('.slider-filled-track');

        this._thumb.addEventListener('mousedown', this._onMouseDown);
        this._track.addEventListener('mousedown', this._onMouseDown);
        this.addEventListener('keydown', this._onKeyDown);
        this.addEventListener('focus', this._onFocus);
        this.addEventListener('blur', this._onBlur);

        // Slider needs to be focusable
        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', '0');
        }

        this._updateSliderPosition();
    }

    disconnectedCallback() {
        this._thumb.removeEventListener('mousedown', this._onMouseDown);
        this._track.removeEventListener('mousedown', this._onMouseDown);
        this.removeEventListener('keydown', this._onKeyDown);
        this.removeEventListener('focus', this._onFocus);
        this.removeEventListener('blur', this._onBlur);
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'min':
                this._min = Number(newValue);
                break;
            case 'max':
                this._max = Number(newValue);
                break;
            case 'value':
                this._value = this._clamp(Number(newValue));
                break;
            case 'step':
                this._step = Number(newValue);
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                this.shadowRoot.host.classList.toggle('disabled', this._disabled);
                break;
            case 'discrete':
                this._discrete = newValue !== null;
                this.shadowRoot.host.classList.toggle('discrete', this._discrete);
                break;
            case 'color':
                this._color = newValue;
                this._updateStyles();
                break;
        }

        this._updateSliderPosition();
    }

    // Getters and setters
    get min() {
        return this._min;
    }

    set min(value) {
        this.setAttribute('min', value);
    }

    get max() {
        return this._max;
    }

    set max(value) {
        this.setAttribute('max', value);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this.setAttribute('value', value);
    }

    get step() {
        return this._step;
    }

    set step(value) {
        this.setAttribute('step', value);
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get discrete() {
        return this._discrete;
    }

    set discrete(value) {
        if (value) {
            this.setAttribute('discrete', '');
        } else {
            this.removeAttribute('discrete');
        }
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this.setAttribute('color', value);
    }

    // Private methods
    _render() {
        const styles = `
        :host {
          display: block;
          height: 48px;
          position: relative;
          width: 100%;
          cursor: pointer;
          outline: none;
        }
        
        :host(.disabled) {
          cursor: not-allowed;
          opacity: 0.38;
          pointer-events: none;
        }
        
        .slider-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding: 0 8px;
          box-sizing: border-box;
        }
        
        .slider-track {
          position: relative;
          width: 100%;
          height: 2px;
          background-color: rgba(0, 0, 0, 0.26);
          border-radius: 1px;
        }
        
        .slider-filled-track {
          position: absolute;
          height: 2px;
          background-color: ${this._color};
          border-radius: 1px;
          left: 0;
          width: 0;
        }
        
        .slider-thumb {
          position: absolute;
          height: 12px;
          width: 12px;
          background-color: ${this._color};
          border-radius: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease, box-shadow 0.1s ease;
          left: 0;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 
                      0 1px 5px 0 rgba(0, 0, 0, 0.12), 
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb:hover,
        :host(:focus) .slider-thumb {
          transform: translate(-50%, -50%) scale(1.2);
          box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 
                      0 2px 6px 0 rgba(0, 0, 0, 0.12), 
                      0 4px 2px -2px rgba(0, 0, 0, 0.2);
        }
        
        .slider-thumb-label {
          position: absolute;
          bottom: 32px;
          width: 30px;
          height: 30px;
          background-color: ${this._color};
          color: white;
          border-radius: 50% 50% 50% 0;
          left: 0;
          transform: translate(-50%, 0) rotate(-45deg) scale(0);
          display: ${this._discrete ? 'flex' : 'none'};
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }
        
        :host(.discrete) .slider-thumb-label {
          display: flex;
        }
        
        :host(.discrete.active) .slider-thumb-label,
        :host(.discrete:focus) .slider-thumb-label {
          transform: translate(-50%, 0) rotate(-45deg) scale(1);
        }
        
        .slider-thumb-label-text {
          transform: rotate(45deg);
          font-size: 12px;
          font-family: Roboto, sans-serif;
          font-weight: 500;
        }
        
        :host(.active) .slider-thumb {
          transform: translate(-50%, -50%) scale(1.5);
        }
      `;

        const html = `
        <div class="slider-container">
          <div class="slider-track">
            <div class="slider-filled-track"></div>
            <div class="slider-thumb">
              <div class="slider-thumb-label">
                <span class="slider-thumb-label-text">0</span>
              </div>
            </div>
          </div>
        </div>
      `;

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        ${html}
      `;
    }

    _updateStyles() {
        const styleElement = this.shadowRoot.querySelector('style');
        styleElement.textContent = styleElement.textContent.replace(
            /background-color: [^;]+;/g,
            `background-color: ${this._color};`
        );
    }

    _updateSliderPosition() {
        if (!this._thumb || !this._filledTrack || !this._thumbLabel) return;

        const percentage = this._valueToPercentage(this._value);
        this._thumb.style.left = `${percentage}%`;
        this._thumbLabel.style.left = `${percentage}%`;
        this._filledTrack.style.width = `${percentage}%`;

        if (this._discrete) {
            this.shadowRoot.querySelector('.slider-thumb-label-text').textContent = this._value;
        }
    }

    _onMouseDown(event) {
        if (this._disabled) return;

        // Prevent text selection
        event.preventDefault();

        this.shadowRoot.host.classList.add('active');

        // Calculate the new value based on click position
        this._updateValueFromEvent(event);

        // Add event listeners for dragging
        document.addEventListener('mousemove', this._onMouseMove);
        document.addEventListener('mouseup', this._onMouseUp);
    }

    _onMouseMove(event) {
        if (this._disabled) return;

        // Calculate the new value based on mouse position
        this._updateValueFromEvent(event);
    }

    _onMouseUp() {
        if (this._disabled) return;

        this.shadowRoot.host.classList.remove('active');

        // Remove event listeners
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);

        // Dispatch change event
        this.dispatchEvent(new Event('change', { bubbles: true }));
    }

    _onKeyDown(event) {
        if (this._disabled) return;

        let newValue = this._value;

        switch (event.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                newValue += this._step;
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                newValue -= this._step;
                break;
            case 'Home':
                newValue = this._min;
                break;
            case 'End':
                newValue = this._max;
                break;
            case 'PageUp':
                newValue += (this._max - this._min) / 10;
                break;
            case 'PageDown':
                newValue -= (this._max - this._min) / 10;
                break;
            default:
                return;
        }

        event.preventDefault();

        // Set the new value
        newValue = this._quantizeToStep(this._clamp(newValue));
        if (newValue !== this._value) {
            this._value = newValue;
            this._updateSliderPosition();
            this.dispatchEvent(new Event('input', { bubbles: true }));
            this.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    _onFocus() {
        this.shadowRoot.host.classList.add('focused');
    }

    _onBlur() {
        this.shadowRoot.host.classList.remove('focused');
        this.shadowRoot.host.classList.remove('active');
    }

    _updateValueFromEvent(event) {
        const trackRect = this._track.getBoundingClientRect();
        const x = Math.max(trackRect.left, Math.min(event.clientX, trackRect.right));
        const percentage = (x - trackRect.left) / trackRect.width;

        const rawValue = this._percentageToValue(percentage);
        const newValue = this._quantizeToStep(this._clamp(rawValue));

        if (newValue !== this._value) {
            this._value = newValue;
            this._updateSliderPosition();
            this.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    _clamp(value) {
        return Math.min(this._max, Math.max(this._min, value));
    }

    _valueToPercentage(value) {
        return ((value - this._min) / (this._max - this._min)) * 100;
    }

    _percentageToValue(percentage) {
        return this._min + percentage * (this._max - this._min);
    }

    _quantizeToStep(value) {
        const normalized = (value - this._min) / this._step;
        const quantized = Math.round(normalized) * this._step + this._min;
        return Number(quantized.toFixed(10)); // Handle floating point errors
    }
}

// Define the custom element
customElements.define('vc-slider', VcSlider);

export default VcSlider;