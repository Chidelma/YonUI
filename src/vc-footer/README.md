# VC-Footer Web Component

A Material 2 Footer web component inspired by Vuetify v3, implemented using native Web Component technology.

## Features

- **Modern Design**: Follows Material 2 design principles
- **Responsive**: Adapts to different screen sizes
- **Customizable**: Multiple attributes for easy customization
- **No Dependencies**: Pure vanilla JavaScript implementation
- **Framework Agnostic**: Works with any framework or no framework

## Installation

### Option 1: Include via CDN (example)
```html
<script src="https://unpkg.com/vc-footer@1.0.0/vc-footer.js"></script>
```

### Option 2: Download and include locally
1. Download the `vc-footer.js` file
2. Include it in your HTML file:
```html
<script src="path/to/vc-footer.js"></script>
```

### Option 3: Install via npm (if published)
```bash
npm install vc-footer
```

Then import it in your JavaScript:
```javascript
import 'vc-footer';
```

## Usage

Basic usage:

```html
<vc-footer>
  © 2025 My Company
</vc-footer>
```

Styled footer with custom color and elevation:

```html
<vc-footer color="primary" elevation="4" theme="dark">
  <div class="footer-content">
    <!-- Your footer content here -->
    <p>© 2025 My Company</p>
  </div>
</vc-footer>
```

Fixed footer at the bottom of the page:

```html
<vc-footer fixed color="secondary">
  <!-- Fixed footer content -->
</vc-footer>
```

## API

### Properties/Attributes

| Attribute  | Type    | Default   | Description                                                  |
|------------|---------|-----------|--------------------------------------------------------------|
| `app`      | Boolean | `false`   | Designates the footer for use with an application layout     |
| `absolute` | Boolean | `false`   | Applies `position: absolute` to the component                |
| `fixed`    | Boolean | `false`   | Applies `position: fixed` to the component                   |
| `padless`  | Boolean | `false`   | Remove padding from the footer                               |
| `color`    | String  | `primary` | Sets the background color ('primary', 'secondary', etc)      |
| `elevation`| String  | `0`       | Sets the elevation of the footer (0-24)                      |
| `height`   | String  | `auto`    | Sets the height of the footer                                |
| `theme`    | String  | `light`   | Sets the theme ('light' or 'dark')                           |

### Predefined Colors

The component recognizes the following color names:
- `primary`: #1976D2
- `secondary`: #424242
- `accent`: #82B1FF
- `error`: #FF5252
- `info`: #2196F3
- `success`: #4CAF50
- `warning`: #FFC107

You can also provide any valid CSS color value (hex, rgb, rgba, etc).

## Styling

The component uses Shadow DOM for encapsulation. To style the content inside the footer, you'll need to add your own styles to the elements you place inside the component.

Example:

```html
<style>
  .footer-content {
    display: flex;
    justify-content: space-between;
  }
  
  .footer-links {
    display: flex;
    gap: 20px;
  }
</style>

<vc-footer>
  <div class="footer-content">
    <div class="footer-links">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
    </div>
    <p>© 2025 My Company</p>
  </div>
</vc-footer>
```

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

MIT License