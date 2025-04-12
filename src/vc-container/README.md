# Material 2 Container Web Component

A responsive container web component inspired by Vuetify v3, built using native Web Components technology.

## Features

- Responsive container with predefined breakpoints
- Fluid container option
- Custom max-width option
- Customizable with CSS classes
- No dependencies - pure vanilla JavaScript
- Works with any framework or no framework at all

## Installation

1. Download the `material-container.js` file
2. Include it in your HTML file:

```html
<script src="path/to/material-container.js"></script>
```

Or import it in your JavaScript:

```javascript
import './path/to/material-container.js';
```

## Usage

The web component is registered with the name `vc-container`. Here are different ways to use it:

### Basic Container

```html
<vc-container>
  <!-- Your content here -->
</vc-container>
```

A basic container has responsive max-width values at different breakpoints:
- Mobile: 100% width
- ≥960px: 900px max-width
- ≥1280px: 1185px max-width
- ≥1920px: 1785px max-width

### Fluid Container

```html
<vc-container fluid>
  <!-- Your content here -->
</vc-container>
```

A fluid container always takes up 100% of the available width.

### Custom Max Width

```html
<vc-container max-width="800px">
  <!-- Your content here -->
</vc-container>
```

You can specify a custom max-width for the container.

### Custom Classes

```html
<vc-container class="my-custom-class another-class">
  <!-- Your content here -->
</vc-container>
```

You can add custom classes to style the container further.

## Attributes

| Attribute   | Type      | Default | Description                            |
|-------------|-----------|---------|----------------------------------------|
| `fluid`     | Boolean   | `false` | Makes the container take 100% width    |
| `class`     | String    | `""`    | Custom CSS classes to apply            |
| `max-width` | String    | `null`  | Custom max-width value (e.g., "800px") |

## Browser Support

This component works in all browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

For older browsers, you may need to include the Web Components polyfill.

## Customizing with CSS

You can customize the component further using CSS variables or by overriding the shadow DOM styles with Shadow Parts (in a future version).

## License

MIT

## Acknowledgements

Inspired by Vuetify v3's container component.