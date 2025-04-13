# Material 2 Spacer Web Component

A lightweight and flexible spacing component inspired by Vuetify v3's spacer, built using native Web Components technology.

## Features

- **Simple API**: Easy to use with intuitive attributes
- **Two Directions**: Support for both vertical and horizontal spacing
- **Customizable Size**: Define the amount of space with a simple size multiplier
- **Framework Agnostic**: Works with any framework or vanilla JavaScript
- **Small Footprint**: Lightweight with no dependencies

## Installation

### Option 1: Copy the file directly

Simply copy the `vc-spacer.js` file to your project.

### Option 2: Include from CDN (if published)

```html
<script src="https://cdn.example.com/vc-spacer.js"></script>
```

### Option 3: npm (if published)

```bash
npm install material-spacer-component
```

Then import in your JavaScript:

```javascript
import 'material-spacer-component';
```

## Usage

### Basic Usage

```html
<!-- Default vertical spacer (4px height) -->
<vc-spacer></vc-spacer>

<!-- Vertical spacer with custom size (16px height) -->
<vc-spacer size="4"></vc-spacer>

<!-- Horizontal spacer (8px width) -->
<vc-spacer direction="horizontal" size="2"></vc-spacer>
```

### API

#### Attributes

| Attribute  | Type    | Default    | Description                                          |
|------------|---------|------------|------------------------------------------------------|
| `size`     | Number  | `1`        | Size multiplier (base unit is 4px × size)            |
| `direction`| String  | `vertical` | Direction of spacing (`vertical` or `horizontal`)    |

#### Properties

The component also exposes JavaScript properties that match the attributes:

```javascript
const spacer = document.querySelector('vc-spacer');

// Get current values
console.log(spacer.size);        // => 1
console.log(spacer.direction);   // => "vertical"

// Set new values
spacer.size = 4;
spacer.direction = "horizontal";
```

## Sizing Guide

The spacing size is calculated as `size × 4px`:

| Size Value | Actual Space |
|------------|--------------|
| 1          | 4px          |
| 2          | 8px          |
| 4          | 16px         |
| 6          | 24px         |
| 8          | 32px         |
| 10         | 40px         |
| etc.       | size × 4px   |

## Examples

### Card Layout with Vertical Spacing

```html
<div class="card">
  <h3 class="card-title">Card Title</h3>
  <vc-spacer size="2"></vc-spacer>
  <p class="card-content">First paragraph of content.</p>
  <vc-spacer size="4"></vc-spacer>
  <p class="card-content">Second paragraph with more space above it.</p>
</div>
```

### Toolbar with Horizontal Spacing

```html
<div class="toolbar">
  <button>Action 1</button>
  <vc-spacer direction="horizontal" size="2"></vc-spacer>
  <button>Action 2</button>
  <vc-spacer direction="horizontal" size="6"></vc-spacer>
  <button>Action 3</button>
</div>
```

### Dynamic Spacing

```html
<button onclick="changeSpacing()">Increase Space</button>

<div class="container">
  <div>Element 1</div>
  <vc-spacer id="dynamic-spacer" size="2"></vc-spacer>
  <div>Element 2</div>
</div>

<script>
  function changeSpacing() {
    const spacer = document.getElementById('dynamic-spacer');
    spacer.size = spacer.size + 2;
  }
</script>
```

## Browser Support

Works in all modern browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT License