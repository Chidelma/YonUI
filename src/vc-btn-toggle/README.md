# vc-btn-toggle Web Component

A Material Design 2 Button toggle web component inspired by Vuetify v3. This component allows users to select one or multiple options from a group of buttons.

## Features

- Single or multiple selection modes
- Mandatory selection option
- Various color themes (primary, secondary, success, error, warning, info)
- Style variants (outlined, text)
- Dense mode for compact UI
- Easy integration with any project (framework-agnostic)
- Simple API similar to Vuetify

## Installation

Simply include the `vc-btn-toggle.js` file in your project:

```html
<script src="path/to/vc-btn-toggle.js"></script>
```

## Basic Usage

```html
<vc-btn-toggle>
  <button value="left">Left</button>
  <button value="center">Center</button>
  <button value="right">Right</button>
</vc-btn-toggle>
```

## API Reference

### Properties/Attributes

| Property  | Attribute  | Type      | Default   | Description |
|-----------|------------|-----------|-----------|-------------|
| multiple  | multiple   | Boolean   | false     | Allows multiple selection |
| mandatory | mandatory  | Boolean   | false     | At least one button must be active |
| dense     | dense      | Boolean   | false     | Makes the buttons more compact |
| color     | color      | String    | 'primary' | Color theme ('primary', 'secondary', 'success', 'error', 'warning', 'info') |
| variant   | variant    | String    | 'outlined'| Button style variant ('outlined', 'text') |
| value     | value      | Array/JSON| []        | Selected value(s) |

### Events

| Event   | Detail                          | Description |
|---------|--------------------------------|-------------|
| change  | { value: String or Array }     | Fired when selection changes |

## Examples

### Single Selection

```html
<vc-btn-toggle>
  <button value="left">Left</button>
  <button value="center">Center</button>
  <button value="right">Right</button>
</vc-btn-toggle>
```

### Multiple Selection

```html
<vc-btn-toggle multiple>
  <button value="bold">Bold</button>
  <button value="italic">Italic</button>
  <button value="underline">Underline</button>
</vc-btn-toggle>
```

### Mandatory Selection

```html
<vc-btn-toggle mandatory value='["option1"]'>
  <button value="option1">Option 1</button>
  <button value="option2">Option 2</button>
  <button value="option3">Option 3</button>
</vc-btn-toggle>
```

### Different Colors

```html
<vc-btn-toggle color="primary">
  <button>Primary</button>
  <button>Options</button>
</vc-btn-toggle>

<vc-btn-toggle color="secondary">
  <button>Secondary</button>
  <button>Options</button>
</vc-btn-toggle>

<!-- Available colors: primary, secondary, success, error, warning, info -->
```

### Variants

```html
<vc-btn-toggle variant="outlined">
  <button>Outlined</button>
  <button>Variant</button>
</vc-btn-toggle>

<vc-btn-toggle variant="text">
  <button>Text</button>
  <button>Variant</button>
</vc-btn-toggle>
```

### Dense

```html
<vc-btn-toggle dense>
  <button>Compact</button>
  <button>Buttons</button>
</vc-btn-toggle>
```

## JavaScript API

You can also interact with the component using JavaScript:

```javascript
// Get the component
const btnToggle = document.querySelector('vc-btn-toggle');

// Get the current value
console.log(btnToggle.value);

// Set a new value
btnToggle.value = ['option1'];

// Set properties
btnToggle.multiple = true;
btnToggle.mandatory = true;
btnToggle.color = 'success';

// Listen for changes
btnToggle.addEventListener('change', (event) => {
  console.log('New selection:', event.detail.value);
});
```

## Browser Support

This component uses modern Web Component APIs and should work in all major browsers that support the Custom Elements v1 spec:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

For older browsers, you may need to use polyfills.

## License

MIT