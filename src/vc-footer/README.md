# Material 2 Footer Web Component

A customizable Material Design 2 inspired footer web component based on Vuetify v3 styling and functionality.

## Features

- Uses Web Component technology for framework-agnostic integration
- Consistent with Material Design 2 guidelines
- Highly customizable with various props
- Shadow DOM encapsulation for style isolation
- Lightweight with no dependencies

## Installation

### Method 1: Direct inclusion in HTML

```html
<script src="path/to/vc-footer.js"></script>
```

### Method 2: NPM (if you package this as an npm module)

```bash
npm install vc-footer-component
```

Then import in your JavaScript:

```javascript
import 'vc-footer-component';
```

## Usage

Once the component is included in your project, you can use it like any other HTML element:

```html
<vc-footer color="primary">
  <div>© 2025 My Company</div>
</vc-footer>
```

### Advanced Usage

```html
<!-- Dark themed footer with app (fixed) positioning -->
<vc-footer 
  color="primary" 
  dark 
  app 
  elevation="4">
  <div class="footer-links">
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </div>
  <div class="copyright">
    © 2025 My Company
  </div>
</vc-footer>
```

## Props/Attributes

| Attribute  | Type      | Default    | Description                                      |
|------------|-----------|------------|--------------------------------------------------|
| color      | String    | 'primary'  | Sets the background color of the footer          |
| dark       | Boolean   | false      | Applies dark theme styling                       |
| elevation  | Number    | 4          | Sets the elevation (box-shadow) level (0-24)     |
| app        | Boolean   | false      | Positions the footer fixed at the bottom         |
| absolute   | Boolean   | false      | Positions the footer absolutely                  |
| padless    | Boolean   | false      | Removes default padding from the footer          |
| inset      | Boolean   | false      | Applies inset styling (indented from left)       |
| height     | String    | 'auto'     | Sets the height of the footer                    |
| border     | Boolean   | false      | Adds a top border to the footer                  |

### Available Color Options

- `primary` - #6200ee (Default purple)
- `secondary` - #03dac6 (Teal)
- `success` - #4caf50 (Green)
- `error` - #f44336 (Red)
- `info` - #2196f3 (Blue)
- `warning` - #fb8c00 (Orange)
- Custom colors - Pass any valid CSS color value (hex, rgb, etc.)

## Slots

The footer component uses a default slot where you can place any content you want to appear inside the footer.

## CSS Customization

The component uses Shadow DOM, which encapsulates the styles. However, you can still style your content inside the slots with your own CSS.

## Browser Support

This component uses modern web standards and should work in all browsers that support Web Components:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

For older browsers, you may need to include polyfills for Web Components.

## Examples

Check out the `example.html` file for various implementation examples.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.