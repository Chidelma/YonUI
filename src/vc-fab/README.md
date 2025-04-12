# Material Design 2 Floating Action Button Web Component

A lightweight, customizable Web Component implementation of the Material Design 2 Floating Action Button (FAB). This component follows the [Material Design 2 FAB specifications](https://material.io/components/buttons-floating-action-button) and is built as a standards-compliant Web Component, requiring no framework dependencies.

## Features

- 🎨 Standard Material Design 2 FAB styling
- 🔄 Different FAB types: regular, mini, extended
- 🌈 Color variants: primary, secondary, surface
- 🔤 Support for Material Icons
- ♿ Accessibility: keyboard navigation, ARIA attributes
- 📱 Responsive design
- 🔌 Framework agnostic - works with any framework or vanilla JS
- 🎯 Custom events for easy event handling
- 🧩 Easy to customize with CSS variables

## Installation

### Option 1: Via npm (recommended)

```bash
npm install vc-fab
```

Then import it in your project:

```javascript
import 'vc-fab';
```

### Option 2: Direct `<script>` include

```html
<script src="path/to/vc-fab.js"></script>
```

## Usage

### Basic Usage

```html
<vc-fab icon="add"></vc-fab>
```

### Required Dependencies

This component requires:
- Material Icons font (for icons)
- Roboto font (for extended FAB labels)

```html
<!-- Material Icons Font -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<!-- Roboto Font (for extended FABs) -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
```

### Examples

#### Regular FAB (default)

```html
<vc-fab icon="add" color="primary"></vc-fab>
```

#### Mini FAB

```html
<vc-fab icon="edit" size="mini" color="secondary"></vc-fab>
```

#### Extended FAB

```html
<vc-fab icon="add" extended label="Create" color="primary"></vc-fab>
```

#### Disabled FAB

```html
<vc-fab icon="delete" disabled></vc-fab>
```

#### Fixed Position FAB

```html
<style>
  .fixed-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
</style>

<vc-fab icon="add" class="fixed-fab"></vc-fab>
```

### JavaScript API

You can create and manipulate FABs programmatically:

```javascript
// Create a new FAB
const fab = document.createElement('vc-fab');
fab.icon = 'add';
fab.color = 'primary';
fab.extended = true;
fab.label = 'Create';
document.body.appendChild(fab);

// Listen for click events
fab.addEventListener('fab-click', (e) => {
  console.log('FAB clicked!', e.detail);
});

// Disable the FAB
fab.disabled = true;

// Enable the FAB
fab.disabled = false;
```

## API Reference

### Attributes / Properties

| Attribute | Property | Type    | Default   | Description |
|-----------|----------|---------|-----------|-------------|
| icon      | icon     | String  | 'add'     | Material icon name to display |
| size      | size     | String  | 'normal'  | FAB size: 'normal' or 'mini' |
| extended  | extended | Boolean | false     | Whether the FAB is extended (has a label) |
| label     | label    | String  | ''        | Text to display when extended |
| disabled  | disabled | Boolean | false     | Whether the FAB is disabled |
| color     | color    | String  | 'primary' | Color theme: 'primary', 'secondary', or 'surface' |

### Events

| Event Name | Detail | Description |
|------------|--------|-------------|
| fab-click  | `{ source: element }` | Fired when the FAB is clicked |

### CSS Custom Properties

You can customize the appearance by overriding these CSS variables:

```css
vc-fab {
  --md-fab-primary-color: #6200ee;
  --md-fab-primary-color-hover: #6f16ff;
  --md-fab-on-primary-color: #ffffff;
  --md-fab-secondary-color: #03dac6;
  --md-fab-secondary-color-hover: #02f2d6;
  --md-fab-on-secondary-color: #000000;
  --md-fab-surface-color: #ffffff;
  --md-fab-surface-color-hover: #f2f2f2;
  --md-fab-on-surface-color: #000000;
  --md-fab-disabled-color: #e0e0e0;
  --md-fab-on-disabled-color: #9e9e9e;
  --md-fab-shadow: /* your custom shadow */;
  --md-fab-shadow-hover: /* your custom hover shadow */;
}
```

## Accessibility

- Implements proper ARIA roles and attributes
- Supports keyboard navigation (Enter and Space to activate)
- Focus states with visible outlines
- Disabled state properly communicated to assistive technologies

## Browser Support

This component uses standard Web Component APIs and works in all modern browsers:

- Chrome (and Chromium-based browsers like Edge)
- Firefox
- Safari 10.1+
- Edge 79+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.