# Material 2 Divider Web Component

A lightweight, framework-agnostic web component that implements Material Design 2 dividers. This component provides a simple way to add horizontal or vertical dividers to your web application with Material Design styling.

## Features

- **Horizontal and vertical dividers** - Create both horizontal and vertical dividers
- **Inset dividers** - Apply inset styling for hierarchical layouts
- **Light and dark themes** - Support for both light and dark themes
- **Accessibility** - Proper ARIA roles and attributes for screen readers
- **Framework agnostic** - Works with any JavaScript framework or vanilla JS
- **Customizable** - Easily customize through CSS variables (planned for future versions)

## Installation

### Option 1: Via npm (coming soon)

```bash
npm install vc-divider
```

```javascript
// In your JavaScript file
import 'vc-divider';
```

### Option 2: Direct include

```html
<script src="path/to/vc-divider.js"></script>
```

## Usage

After including the component in your project, you can use it like any HTML element:

```html
<!-- Basic horizontal divider -->
<vc-divider></vc-divider>

<!-- Inset horizontal divider (indented from the left) -->
<vc-divider inset></vc-divider>

<!-- Vertical divider -->
<vc-divider vertical></vc-divider>

<!-- Vertical inset divider (shortened from top and bottom) -->
<vc-divider vertical inset></vc-divider>

<!-- Dark theme divider -->
<vc-divider theme="dark"></vc-divider>
```

## Attributes

| Attribute | Type    | Default | Description                                    |
|-----------|---------|---------|------------------------------------------------|
| `vertical`| Boolean | `false` | When present, creates a vertical divider       |
| `inset`   | Boolean | `false` | When present, creates an inset divider         |
| `theme`   | String  | `light` | Theme of the divider. Options: `light`, `dark` |
| `hidden`  | Boolean | `false` | When present, hides the divider                |

## Styling

The component uses Shadow DOM for encapsulation. Current styling is based on Material Design 2 specifications:

- **Light theme**: `rgba(0, 0, 0, 0.12)` - 12% black
- **Dark theme**: `rgba(255, 255, 255, 0.12)` - 12% white
- **Inset horizontal**: 72px left margin
- **Inset vertical**: 8px top and bottom margin

## Browser Support

This component works in all browsers that support Custom Elements v1 and Shadow DOM v1:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## Accessibility

The component sets appropriate ARIA roles:
- `role="separator"` 
- `aria-orientation="horizontal"` or `aria-orientation="vertical"`

## Examples

See the included `index.html` for complete usage examples.

## Development

### Local Development

1. Clone the repository
2. Open `index.html` in your browser to see the examples

### Building (future enhancement)

```bash
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.