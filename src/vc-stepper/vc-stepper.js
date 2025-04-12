// vc-stepper.js - Material 2 Steppers Web Component inspired by Vuetify v3

class Stepper extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._currentStep = 0;
        this._steps = [];
        this._vertical = false;
        this._editable = false;
        this._nonLinear = false;
    }

    static get observedAttributes() {
        return ['vertical', 'editable', 'non-linear', 'current-step'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'vertical':
                this._vertical = newValue !== null;
                this._render();
                break;
            case 'editable':
                this._editable = newValue !== null;
                this._render();
                break;
            case 'non-linear':
                this._nonLinear = newValue !== null;
                this._render();
                break;
            case 'current-step':
                const step = parseInt(newValue, 10);
                if (!isNaN(step) && step >= 0) {
                    this._currentStep = step;
                    this._updateActiveStep();
                }
                break;
        }
    }

    connectedCallback() {
        this._parseSteps();
        this._setupStyles();
        this._render();

        // Re-render if content changes (for mutations like adding/removing steps)
        this._observer = new MutationObserver(() => {
            this._parseSteps();
            this._render();
        });

        this._observer.observe(this, { childList: true, subtree: true });
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    _parseSteps() {
        this._steps = [];
        const stepElements = this.querySelectorAll('vc-step');

        stepElements.forEach((step, index) => {
            const title = step.getAttribute('title') || `Step ${index + 1}`;
            const subtitle = step.getAttribute('subtitle') || '';
            const complete = step.hasAttribute('complete');
            const error = step.hasAttribute('error');
            const disabled = step.hasAttribute('disabled');

            this._steps.push({
                title,
                subtitle,
                complete,
                error,
                disabled,
                content: step.innerHTML,
                element: step
            });
        });
    }

    _setupStyles() {
        const style = document.createElement('style');
        style.textContent = `
        :host {
          display: block;
          font-family: Roboto, sans-serif;
          --primary-color: #1976D2;
          --error-color: #FF5252;
          --disabled-color: #9E9E9E;
          --complete-color: #4CAF50;
          --step-size: 24px;
          --step-connector-size: 1px;
        }
        
        .stepper {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .stepper-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        
        .stepper-vertical .stepper-header {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .step {
          display: flex;
          flex: 1;
          align-items: center;
          position: relative;
        }
        
        .stepper-vertical .step {
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 8px;
          flex: 0;
          width: 100%;
        }
        
        .step-content {
          position: relative;
          width: 100%;
          padding: 16px;
          box-sizing: border-box;
          display: none;
        }
        
        .step-content.active {
          display: block;
        }
        
        .step-dot {
          width: var(--step-size);
          height: var(--step-size);
          border-radius: 50%;
          background-color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          z-index: 2;
          transition: background-color 0.3s ease;
        }
        
        .step.complete .step-dot {
          background-color: var(--complete-color);
        }
        
        .step.error .step-dot {
          background-color: var(--error-color);
        }
        
        .step.disabled .step-dot {
          background-color: var(--disabled-color);
        }
        
        .step-info {
          margin-left: 8px;
          position: relative;
          z-index: 1;
        }
        
        .stepper-vertical .step-info {
          margin-left: 32px;
          margin-top: -16px;
        }
        
        .step-title {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.87);
        }
        
        .step-subtitle {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.54);
        }
        
        .step.disabled .step-title,
        .step.disabled .step-subtitle {
          color: var(--disabled-color);
        }
        
        .step-connector {
          flex: 1;
          height: var(--step-connector-size);
          background-color: rgba(0, 0, 0, 0.12);
          margin: 0 12px;
        }
        
        .stepper-vertical .step-connector {
          width: var(--step-connector-size);
          height: 24px;
          margin: 0;
          margin-left: calc(var(--step-size) / 2);
          position: absolute;
          top: var(--step-size);
          bottom: 0;
        }
        
        .step:last-child .step-connector {
          display: none;
        }
        
        .step.complete .step-connector,
        .step.active .step-connector {
          background-color: var(--primary-color);
        }
        
        .step.error .step-connector {
          background-color: var(--error-color);
        }
        
        .step.clickable {
          cursor: pointer;
        }
        
        .step.clickable:hover .step-dot {
          box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.1);
        }
        
        .actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
          gap: 8px;
        }
        
        button {
          padding: 8px 16px;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        button:hover {
          background-color: #1565C0;
        }
        
        button:disabled {
          background-color: rgba(0, 0, 0, 0.12);
          color: rgba(0, 0, 0, 0.26);
          cursor: not-allowed;
        }
        
        button.secondary {
          background-color: transparent;
          color: var(--primary-color);
        }
        
        button.secondary:hover {
          background-color: rgba(25, 118, 210, 0.1);
        }
      `;

        this._shadowRoot.appendChild(style);
    }

    _render() {
        // Clear previous content
        while (this._shadowRoot.firstChild) {
            if (this._shadowRoot.firstChild.nodeName === 'STYLE') {
                break;
            }
            this._shadowRoot.removeChild(this._shadowRoot.firstChild);
        }

        const stepper = document.createElement('div');
        stepper.className = `stepper ${this._vertical ? 'stepper-vertical' : ''}`;

        // Create header
        const header = document.createElement('div');
        header.className = 'stepper-header';

        // Create steps
        this._steps.forEach((step, index) => {
            const stepEl = document.createElement('div');
            stepEl.className = `step ${index === this._currentStep ? 'active' : ''}`;

            if (step.complete) stepEl.classList.add('complete');
            if (step.error) stepEl.classList.add('error');
            if (step.disabled) stepEl.classList.add('disabled');

            if ((this._editable || this._nonLinear) && !step.disabled) {
                stepEl.classList.add('clickable');
                stepEl.addEventListener('click', () => this.goToStep(index));
            }

            // Create dot
            const dot = document.createElement('div');
            dot.className = 'step-dot';
            dot.textContent = index + 1;
            stepEl.appendChild(dot);

            // Create step info
            const stepInfo = document.createElement('div');
            stepInfo.className = 'step-info';

            const title = document.createElement('div');
            title.className = 'step-title';
            title.textContent = step.title;
            stepInfo.appendChild(title);

            if (step.subtitle) {
                const subtitle = document.createElement('div');
                subtitle.className = 'step-subtitle';
                subtitle.textContent = step.subtitle;
                stepInfo.appendChild(subtitle);
            }

            stepEl.appendChild(stepInfo);

            // Create connector
            const connector = document.createElement('div');
            connector.className = 'step-connector';
            stepEl.appendChild(connector);

            header.appendChild(stepEl);
        });

        stepper.appendChild(header);

        // Create content sections
        this._steps.forEach((step, index) => {
            const content = document.createElement('div');
            content.className = `step-content ${index === this._currentStep ? 'active' : ''}`;
            content.innerHTML = step.content;

            stepper.appendChild(content);
        });

        // Create action buttons
        const actions = document.createElement('div');
        actions.className = 'actions';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'secondary';
        prevBtn.textContent = 'Back';
        prevBtn.disabled = this._currentStep === 0;
        prevBtn.addEventListener('click', () => this.prev());

        const nextBtn = document.createElement('button');
        nextBtn.textContent = this._currentStep === this._steps.length - 1 ? 'Finish' : 'Continue';
        nextBtn.addEventListener('click', () => this.next());

        actions.appendChild(prevBtn);
        actions.appendChild(nextBtn);

        stepper.appendChild(actions);

        this._shadowRoot.appendChild(stepper);
    }

    _updateActiveStep() {
        const steps = this._shadowRoot.querySelectorAll('.step');
        const contents = this._shadowRoot.querySelectorAll('.step-content');

        steps.forEach((step, index) => {
            if (index === this._currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        contents.forEach((content, index) => {
            if (index === this._currentStep) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Update next/prev buttons
        const prevBtn = this._shadowRoot.querySelector('button.secondary');
        if (prevBtn) {
            prevBtn.disabled = this._currentStep === 0;
        }

        const nextBtn = this._shadowRoot.querySelector('button:not(.secondary)');
        if (nextBtn) {
            nextBtn.textContent = this._currentStep === this._steps.length - 1 ? 'Finish' : 'Continue';
        }

        // Dispatch an event
        this.dispatchEvent(new CustomEvent('step-change', {
            detail: {
                currentStep: this._currentStep,
                step: this._steps[this._currentStep]
            }
        }));
    }

    // Public methods

    next() {
        if (this._currentStep < this._steps.length - 1) {
            // Mark current step as complete
            if (this._steps[this._currentStep] && this._steps[this._currentStep].element) {
                this._steps[this._currentStep].element.setAttribute('complete', '');
                this._steps[this._currentStep].complete = true;
            }

            this._currentStep++;
            this._updateActiveStep();

            // If last step, dispatch complete event
            if (this._currentStep === this._steps.length - 1) {
                this.dispatchEvent(new CustomEvent('stepper-complete'));
            }
        }
    }

    prev() {
        if (this._currentStep > 0) {
            this._currentStep--;
            this._updateActiveStep();
        }
    }

    goToStep(step) {
        if (step >= 0 && step < this._steps.length &&
            (this._nonLinear || this._editable || step < this._currentStep)) {
            this._currentStep = step;
            this._updateActiveStep();
        }
    }

    getCurrentStep() {
        return this._currentStep;
    }

    reset() {
        this._currentStep = 0;

        // Reset all steps
        this._steps.forEach(step => {
            if (step.element) {
                if (step.complete) {
                    step.element.removeAttribute('complete');
                    step.complete = false;
                }
                if (step.error) {
                    step.element.removeAttribute('error');
                    step.error = false;
                }
            }
        });

        this._updateActiveStep();
        this._render();
    }
}

// Define vc-step element
class Step extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'subtitle', 'complete', 'error', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Notify parent stepper to update
        const stepper = this.closest('vc-stepper');
        if (stepper) {
            const event = new CustomEvent('step-update', {
                detail: { step: this, attribute: name, oldValue, newValue }
            });
            stepper.dispatchEvent(event);
        }
    }
}

// Register custom elements
customElements.define('vc-stepper', Stepper);
customElements.define('vc-step', Step);

export { Stepper, Step };