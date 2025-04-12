# Material 2 Checkbox Web Component

A lightweight, customizable checkbox web component that follows Material Design 2 guidelines. This component is framework-agnostic and can be used in any HTML application.

## Features

- ✅ Material Design 2 styling and animations
- 🔄 Checked, unchecked, and indeterminate states
- 🚫 Support for disabled state
- 🏷️ Integrated label support
- 🌊 Ripple effect on interaction
- ♿ Fully accessible with keyboard navigation and ARIA attributes
- 📝 Form integration
- 🔄 Custom events
- 🧩 Simple API

## Installation

1. Download the `vc-checkbox.js` file
2. Include it in your HTML file:

```html
<script src="path/to/vc-checkbox.js"></script>
```

## Basic Usage

```html
<!-- Basic checkbox -->
<vc-checkbox label="Click me"></vc-checkbox>

<!-- Checked checkbox -->
<vc-checkbox checked label="I am checked"></vc-checkbox>

<!-- Indeterminate state -->
<vc-checkbox indeterminate label="Indeterminate state"></vc-checkbox>

<!-- Disabled checkbox -->
<vc-checkbox disabled label="Can't touch this"></vc-checkbox>
```

## API

### Attributes

| Attribute      | Type      | Default | Description                              |
|----------------|-----------|---------|------------------------------------------|
| `checked`      | Boolean   | `false` | Sets the checkbox to checked state       |
| `disabled`     | Boolean   | `false` | Disables the checkbox                    |
| `indeterminate`| Boolean   | `false` | Sets the checkbox to indeterminate state |
| `value`        | String    | `''`    | Value of the checkbox (like a native checkbox) |
| `label`        | String    | `''`    | Text label for the checkbox              |

### Properties

The component also exposes the following JavaScript properties:

```javascript
// Get/set checked state
checkbox.checked = true;
const isChecked = checkbox.checked;

// Get/set disabled state
checkbox.disabled = true;
const isDisabled = checkbox.disabled;

// Get/set indeterminate state
checkbox.indeterminate = true;
const isIndeterminate = checkbox.indeterminate;

// Get/set value
checkbox.value = "option1";
const value = checkbox.value;

// Get/set label
checkbox.label = "New label text";
const labelText = checkbox.label;
```

### Events

The checkbox component emits a `change` event when its checked state changes:

```javascript
const checkbox = document.querySelector('vc-checkbox');

checkbox.addEventListener('change', (event) => {
  console.log('Checkbox changed to:', event.detail.checked);
});
```

## Form Integration

The checkbox can be used within forms, similar to a native checkbox:

```html
<form id="myForm">
  <vc-checkbox id="termsCheckbox" label="I agree to terms" value="agreed"></vc-checkbox>
  <button type="submit">Submit</button>
</form>

<script>
  document.getElementById('myForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const termsAccepted = document.getElementById('termsCheckbox').checked;
    console.log('Terms accepted:', termsAccepted);
    
    // Access the value if needed
    if (termsAccepted) {
      console.log('Terms value:', document.getElementById('termsCheckbox').value);
    }
  });
</script>
```

## Styling

The component uses shadow DOM for encapsulation, but you can still customize it using CSS variables (coming in a future update) or by extending the component class.

## Browser Support

This component works in all modern browsers that support Custom Elements v1:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements or find any bugs.