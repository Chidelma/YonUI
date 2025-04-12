# Material 2 Switch Web Component

A lightweight, customizable Material Design 2 style switch component built using Web Components technology. This component provides a visually appealing toggle switch that follows the Material Design guidelines while being framework-agnostic.

## Features

- Follows Material Design 2 specifications
- No dependencies, just vanilla JavaScript
- Works with any framework or no framework
- Customizable via properties and CSS
- Keyboard accessible
- Includes ripple effect animation
- Small footprint (~4KB minified)

## Installation

### Option 1: Download the file directly

Download the `vc-switch.js` file and include it in your project.

```html
<script src="path/to/vc-switch.js"></script>
```

### Option 2: Using npm

```bash
npm install material2-vc-switch
```

Then import it in your JavaScript:

```javascript
import 'material2-vc-switch';
```

## Usage

After loading the script, you can use the `<vc-switch>` tag in your HTML:

```html
<!-- Basic switch -->
<vc-switch></vc-switch>

<!-- Switch with label -->
<vc-switch label="Enable notifications"></vc-switch>

<!-- Pre-checked switch -->
<vc-switch label="Dark mode" checked></vc-switch>

<!-- Disabled switch -->
<vc-switch label="Premium feature" disabled></vc-switch>

<!-- Checked and disabled -->
<vc-switch label="System setting" checked disabled></vc-switch>
```

## JavaScript API

You can interact with the switch component using JavaScript:

```javascript
// Get reference to the switch
const mySwitch = document.querySelector('vc-switch');

// Get current state
console.log(mySwitch.checked); // true or false

// Set state
mySwitch.checked = true;

// Get/set disabled state
console.log(mySwitch.disabled);
mySwitch.disabled = true;

// Get/set label
console.log(mySwitch.label);
mySwitch.label = "New label text";

// Listen for changes
mySwitch.addEventListener('change', (event) => {
  console.log('Switch toggled:', event.detail.checked);
});
```

## Attributes

| Attribute  | Type      | Default | Description                           |
|------------|-----------|---------|---------------------------------------|
| `checked`  | Boolean   | `false` | Sets the switch to checked state      |
| `disabled` | Boolean   | `false` | Disables the switch                   |
| `label`    | String    | `''`    | Text label to display next to switch  |

## Events

| Event     | Detail                    | Description                     |
|-----------|---------------------------|---------------------------------|
| `change`  | `{ checked: Boolean }`    | Fired when switch state changes |

## Styling

The switch uses Shadow DOM, but you can customize its appearance using CSS custom properties (coming in future versions).

## Accessibility

- The switch is keyboard accessible and can be toggled using the space or enter keys when focused.
- Appropriate ARIA attributes are added for screen readers.
- Focus states are clearly visible.

## Browser Support

This component works in all modern browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.