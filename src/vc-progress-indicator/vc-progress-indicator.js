/**
 * Material Design 2 Progress Indicator Web Component
 * 
 * A customizable progress indicator that follows Material Design 2 guidelines.
 * Supports both determinate and indeterminate states.
 */
class VcProgressIndicator extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        this.attachShadow({ mode: 'open' });

        // Initialize properties
        this._value = 0;
        this._max = 100;
        this._indeterminate = false;

        // Render the component
        this.render();
    }

    // Define observed attributes
    static get observedAttributes() {
        return ['value', 'max', 'indeterminate', 'color', 'track-color'];
    }

    // Lifecycle callback when attributes change
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'value':
                this._value = parseFloat(newValue) || 0;
                break;
            case 'max':
                this._max = parseFloat(newValue) || 100;
                break;
            case 'indeterminate':
                this._indeterminate = newValue !== null;
                break;
            case 'color':
                this.style.setProperty('--progress-color', newValue);
                break;
            case 'track-color':
                this.style.setProperty('--track-color', newValue);
                break;
        }

        this.updateProgress();
    }

    // Properties
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = parseFloat(val) || 0;
        this.setAttribute('value', this._value);
        this.updateProgress();
    }

    get max() {
        return this._max;
    }

    set max(val) {
        this._max = parseFloat(val) || 100;
        this.setAttribute('max', this._max);
        this.updateProgress();
    }

    get indeterminate() {
        return this._indeterminate;
    }

    set indeterminate(val) {
        this._indeterminate = Boolean(val);
        if (this._indeterminate) {
            this.setAttribute('indeterminate', '');
        } else {
            this.removeAttribute('indeterminate');
        }
        this.updateProgress();
    }

    // Update the progress bar
    updateProgress() {
        const progressBar = this.shadowRoot.querySelector('.progress-bar');
        const progressTrack = this.shadowRoot.querySelector('.progress-track');

        if (!progressBar || !progressTrack) return;

        if (this._indeterminate) {
            progressTrack.classList.add('indeterminate');
            progressBar.style.width = '100%';
        } else {
            progressTrack.classList.remove('indeterminate');
            const percentage = (this._value / this._max) * 100;
            progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
    }

    // Initial render
    render() {
        // Define the styles
        const style = document.createElement('style');
        style.textContent = `
        :host {
          --progress-height: 4px;
          --progress-color: #6200ee;
          --track-color: #e0e0e0;
          display: block;
          width: 100%;
          height: var(--progress-height);
          position: relative;
          overflow: hidden;
        }
        
        .progress-track {
          width: 100%;
          height: 100%;
          background-color: var(--track-color);
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          background-color: var(--progress-color);
          position: absolute;
          top: 0;
          left: 0;
          transition: width 0.2s ease;
        }
        
        .indeterminate .progress-bar {
          animation: indeterminate 2s infinite linear;
          width: 50% !important;
        }
        
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `;

        // Create the HTML structure
        const progressTrack = document.createElement('div');
        progressTrack.className = 'progress-track';

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        progressTrack.appendChild(progressBar);

        // Add everything to the shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(progressTrack);

        // Initialize based on attributes
        this._indeterminate = this.hasAttribute('indeterminate');
        this._value = parseFloat(this.getAttribute('value')) || 0;
        this._max = parseFloat(this.getAttribute('max')) || 100;

        if (this.hasAttribute('color')) {
            this.style.setProperty('--progress-color', this.getAttribute('color'));
        }

        if (this.hasAttribute('track-color')) {
            this.style.setProperty('--track-color', this.getAttribute('track-color'));
        }

        this.updateProgress();
    }
}

// Register the custom element
customElements.define('vc-progress-indicator', VcProgressIndicator);

export default VcProgressIndicator;