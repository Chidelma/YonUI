# VC-Chip Web Component

A lightweight, customizable Web Component that implements Material Design 2 Chips. This component is built using the native Custom Elements API without any framework dependencies.

## Features

- 🎨 Multiple color variants (default, primary, secondary, success, warning, error)
- ✖️ Removable chips with click handlers
- 🚫 Disabled state
- 🔣 Icon support
- 🌐 Framework agnostic (works with any framework or vanilla JS)
- 📦 No dependencies

## Installation

### Option 1: Direct inclusion

```html
<script src="vc-chip.js"></script>
```

### Option 2: NPM (if published to npm)

```bash
npm install vc-chip
```

Then import it in your JavaScript:

```javascript
import 'vc-chip';
```

## Usage

### Basic Chip

```html
<vc-chip>Basic Chip</vc-chip>
```

### Color Variants

```html
<vc-chip>Default</vc-chip>
<vc-chip color="primary">Primary</vc-chip>
<vc-chip color="secondary">Secondary</vc-chip>
<vc-chip color="success">Success</vc-chip>
<vc-chip color="warning">Warning</vc-chip>
<vc-chip color="error">Error</vc-chip>
```

### Removable Chips

```html
<vc-chip removable>Removable Chip</vc-chip>
```

### Disabled Chips

```html
<vc-chip disabled>Disabled Chip</vc-chip>
```

### Chips with Icons

```html
<vc-chip icon="👤">User</vc-chip>
```

## API

### Properties

| Attribute  | Type      | Default | Description                                   |
|------------|-----------|---------|-----------------------------------------------|
| `color`    | `string`  | `''`    | Color variant (primary, secondary, etc.)      |
| `removable`| `boolean` | `false` | Whether the chip shows a remove button        |
| `disabled` | `boolean` | `false` | Whether the chip is disabled                  |
| `icon`     | `string`  | `''`    | Icon to display at the start of the chip      |

### Events

| Event    | Description                                  |
|----------|----------------------------------------------|
| `click`  | Triggered when the chip is clicked           |
| `remove` | Triggered when the remove button is clicked  |

## Working with Events

### Listening for Remove Event

```javascript
const chip = document.querySelector('vc-chip');
chip.addEventListener('remove', (event) => {
  // Handle remove event
  event.target.parentNode.removeChild(event.target);
});
```

### Creating Chips Dynamically

```javascript
const createChip = (text, color = '', removable = false) => {
  const chip = document.createElement('vc-chip');
  chip.textContent = text;
  
  if (color) {
    chip.setAttribute('color', color);
  }
  
  if (removable) {
    chip.setAttribute('removable', '');
    chip.addEventListener('remove', (e) => {
      e.target.parentNode.removeChild(e.target);
    });
  }
  
  return chip;
};

// Usage
const container = document.getElementById('chip-container');
const newChip = createChip('New Chip', 'primary', true);
container.appendChild(newChip);
```

## Browser Support

This component uses modern web standards and works in all browsers that support Custom Elements v1:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## Customizing Styles

You can customize the appearance of the chips by defining CSS custom properties at the document level:

```css
:root {
  /* You can override default styles here */
  /* Example for future development */
}
```

## License

MIT