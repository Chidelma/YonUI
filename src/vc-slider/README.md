# vc-slider Web Component

A customizable Material Design 2 slider implemented as a web component with no dependencies.

![Material Design 2 Slider](https://material.io/archive/guidelines/images/components-sliders-discreteslider.png)

## Features

- 🎨 Material Design 2 styling
- 📏 Continuous and discrete modes
- 🎛️ Customizable min/max/step values
- 🎯 Custom color support
- ♿ Keyboard navigation
- 🔒 Disabled state
- 📱 Responsive design
- 🧩 Zero dependencies

## Installation

Simply include the `vc-slider.js` file in your project:

```html
<script src="path/to/vc-slider.js"></script>
```

## Usage

Add the `<vc-slider>` element to your HTML:

```html
<vc-slider></vc-slider>
```

### Basic Example

```html
<!-- Basic slider with default values -->
<vc-slider></vc-slider>

<!-- Slider with custom initial value -->
<vc-slider value="50"></vc-slider>

<!-- Discrete slider that shows value label -->
<vc-slider discrete value="25"></vc-slider>

<!-- Slider with custom range and step -->
<vc-slider min="0" max="10" value="5" step="0.5"></vc-slider>

<!-- Slider with custom color -->
<vc-slider value="75" color="#f44336"></vc-slider>

<!-- Disabled slider -->
<vc-slider value="30" disabled></vc-slider>
```

## API

### Properties/Attributes

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `min` | `min` | Number | `0` | Minimum value of the slider |
| `max` | `max` | Number | `100` | Maximum value of the slider |
| `value` | `value` | Number | `0` | Current value of the slider |
| `step` | `step` | Number | `1` | Step size for value increments |
| `disabled` | `disabled` | Boolean | `false` | Whether the slider is disabled |
| `discrete` | `discrete` | Boolean | `false` | Whether to show value label when dragging |
| `color` | `color` | String | `#6200ee` | Color of the slider (primary color) |

### Events

| Event | Description |
|-------|-------------|
| `input` | Fires continuously as the slider value changes during drag |
| `change` | Fires when the slider value changes after drag ends |

### Methods

| Method | Description |
|--------|-------------|
| `addEventListener(eventName, handler)` | Adds an event listener to the slider |
| `removeEventListener(eventName, handler)` | Removes an event listener from the slider |

## Keyboard Navigation

When the slider has focus, the following keyboard controls are available:

| Key | Action |
|-----|--------|
| `ArrowRight`, `ArrowUp` | Increase value by one step |
| `ArrowLeft`, `ArrowDown` | Decrease value by one step |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `PageUp` | Increase value by 10% of range |
| `PageDown` | Decrease value by 10% of range |

## JavaScript Interaction

You can interact with the slider programmatically:

```javascript
// Get the slider element
const slider = document.querySelector('vc-slider');

// Get the current value
console.log(slider.value);

// Set a new value
slider.value = 42;

// Listen for value changes
slider.addEventListener('input', (event) => {
  console.log('Value changing:', slider.value);
});

slider.addEventListener('change', (event) => {
  console.log('Value changed to:', slider.value);
});

// Toggle discrete mode
slider.discrete = true;

// Change the color
slider.color = '#ff9800';

// Disable the slider
slider.disabled = true;
```

## Styling

The component uses Shadow DOM for encapsulation, but you can customize the size and spacing:

```css
vc-slider {
  width: 300px;
  margin: 20px 0;
}
```

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