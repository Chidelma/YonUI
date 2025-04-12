# Material 2 Steppers Web Component

A customizable Material Design 2 stepper web component inspired by Vuetify v3, built using native Web Component technology.

## Features

- Horizontal and vertical layouts
- Linear and non-linear navigation
- Editable steps
- Step completion, error, and disabled states
- Customizable styling with CSS variables
- Event handling for step changes and stepper completion
- Full keyboard accessibility
- No dependencies - pure vanilla JavaScript

## Installation

1. Download the `vc-stepper.js` file
2. Include it in your HTML:

```html
<script src="path/to/vc-stepper.js"></script>
```

## Basic Usage

```html
<vc-stepper>
  <vc-step title="Step 1" subtitle="First step description">
    <!-- Step 1 content goes here -->
    <h3>First Step Content</h3>
    <p>This is the content for step 1.</p>
  </vc-step>
  
  <vc-step title="Step 2" subtitle="Second step description">
    <!-- Step 2 content goes here -->
    <h3>Second Step Content</h3>
    <p>This is the content for step 2.</p>
  </vc-step>
  
  <vc-step title="Step 3" subtitle="Third step description">
    <!-- Step 3 content goes here -->
    <h3>Third Step Content</h3>
    <p>This is the content for step 3.</p>
  </vc-step>
</vc-stepper>
```

## vc-stepper Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `vertical` | Boolean | `false` | Displays the stepper in a vertical layout |
| `editable` | Boolean | `false` | Allows users to click on step headers to navigate directly to that step |
| `non-linear` | Boolean | `false` | Allows navigation to any step regardless of completion status |
| `current-step` | Number | `0` | Sets the active step (0-based index) |

## vc-step Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | String | Step {index} | The title of the step |
| `subtitle` | String | `""` | Optional subtitle text |
| `complete` | Boolean | `false` | Marks the step as completed |
| `error` | Boolean | `false` | Marks the step as having an error |
| `disabled` | Boolean | `false` | Disables the step (can't be selected) |

## CSS Variables

You can customize the appearance by overriding these CSS variables:

```css
vc-stepper {
  --primary-color: #1976D2;      /* Main color for active steps */
  --error-color: #FF5252;        /* Color for error state */
  --disabled-color: #9E9E9E;     /* Color for disabled steps */
  --complete-color: #4CAF50;     /* Color for completed steps */
  --step-size: 24px;             /* Size of the step dot */
  --step-connector-size: 1px;    /* Thickness of the connector line */
}
```

## JavaScript API

The stepper component exposes the following methods:

### next()

Advances to the next step.

```javascript
const stepper = document.querySelector('vc-stepper');
stepper.next();
```

### prev()

Goes back to the previous step.

```javascript
stepper.prev();
```

### goToStep(stepIndex)

Navigates to a specific step by index (0-based).

```javascript
stepper.goToStep(2); // Go to the third step
```

### getCurrentStep()

Returns the current step index.

```javascript
const currentIndex = stepper.getCurrentStep();
```

### reset()

Resets the stepper to the first step and clears all completion and error states.

```javascript
stepper.reset();
```

## Events

The stepper component dispatches the following events:

### step-change

Fired when the active step changes. The event detail contains the current step index and step data.

```javascript
stepper.addEventListener('step-change', function(event) {
  console.log('Current step:', event.detail.currentStep);
  console.log('Step data:', event.detail.step);
});
```

### stepper-complete

Fired when the user clicks "Finish" on the last step.

```javascript
stepper.addEventListener('stepper-complete', function() {
  console.log('Stepper completed!');
  // Submit form or perform final action
});
```

### step-update

Fired when a step's attributes are changed.

```javascript
stepper.addEventListener('step-update', function(event) {
  console.log('Updated step:', event.detail.step);
  console.log('Changed attribute:', event.detail.attribute);
});
```

## Advanced Usage Examples

### Vertical Stepper with Editable Steps

```html
<vc-stepper vertical editable>
  <vc-step title="Account" subtitle="Create your account">
    <!-- Account setup form -->
  </vc-step>
  <vc-step title="Profile" subtitle="Complete your profile">
    <!-- Profile information form -->
  </vc-step>
  <vc-step title="Confirm" subtitle="Review and submit">
    <!-- Confirmation screen -->
  </vc-step>
</vc-stepper>
```

### Non-Linear Navigation

```html
<vc-stepper non-linear>
  <vc-step title="Step 1"><!-- content --></vc-step>
  <vc-step title="Step 2"><!-- content --></vc-step>
  <vc-step title="Step 3"><!-- content --></vc-step>
</vc-stepper>
```

### Programmatically Controlling Steps

```javascript
// Get references to elements
const stepper = document.querySelector('vc-stepper');
const steps = stepper.querySelectorAll('vc-step');

// Mark a step as having an error
steps[1].setAttribute('error', '');

// Mark a step as complete
steps[0].setAttribute('complete', '');

// Disable a step
steps[2].setAttribute('disabled', '');

// Jump to a specific step
stepper.goToStep(1);
```

### Integrating with Forms

```javascript
const stepper = document.querySelector('vc-stepper');
const form = document.querySelector('form');

// Validate form before proceeding to next step
stepper.addEventListener('step-change', function(e) {
  const previousStepIndex = e.detail.currentStep - 1;
  if (previousStepIndex >= 0) {
    const inputs = steps[previousStepIndex].querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        input.reportValidity();
      }
    });
    
    if (!isValid) {
      // Go back to previous step if validation fails
      setTimeout(() => stepper.prev(), 0);
    } else {
      // Mark step as complete if validation passes
      steps[previousStepIndex].setAttribute('complete', '');
    }
  }
});

// Handle form submission on stepper completion
stepper.addEventListener('stepper-complete', function() {
  if (form.checkValidity()) {
    form.submit();
  }
});
```

## Browser Support

This component works in all modern browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT License