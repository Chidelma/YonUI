# Material 2 Parallax Web Component

A lightweight, dependency-free Material Design 2 parallax component inspired by Vuetify v3's v-parallax. This component is built using native Web Component technology, making it framework-agnostic and easy to integrate into any project.

## Features

- Pure JavaScript Web Component with no dependencies
- Smooth parallax scrolling effect
- Customizable height and parallax speed
- Responsive design
- Slot-based content projection
- Works in all modern browsers

## Installation

### Option 1: Direct Download

Download the `vc-parallax.js` file and include it in your project:

```html
<script src="path/to/vc-parallax.js"></script>
```

### Option 2: CDN (example)

```html
<!-- Replace with your preferred CDN URL when published -->
<script src="https://unpkg.com/vc-parallax@1.0.0/vc-parallax.js"></script>
```

### Option 3: NPM (if published)

```bash
npm install vc-parallax
```

Then import it in your JavaScript:

```javascript
import 'vc-parallax';
```

## Usage

Once the component is included in your project, you can use it like any standard HTML element:

```html
<vc-parallax 
  src="path/to/your/image.jpg" 
  alt="Descriptive text for the image"
  height="500"
  speed="0.5">
  <!-- Your content goes here -->
  <div>
    <h2>Your Parallax Content</h2>
    <p>This content will be centered over the parallax background</p>
  </div>
</vc-parallax>
```

## API

### Attributes

| Attribute | Type    | Default | Description |
|-----------|---------|---------|-------------|
| `src`     | String  | `''`    | URL of the background image |
| `alt`     | String  | `''`    | Alternative text for the background image |
| `height`  | Number  | `400`   | Height of the parallax container in pixels |
| `speed`   | Number  | `0.5`   | Parallax effect speed (0 = no movement, 1 = moves with scroll) |

### Slots

The component has a default slot where you can place any content you want to display over the parallax background. This content will be centered both vertically and horizontally by default.

## Styling

The component uses Shadow DOM to encapsulate its styles. However, you can customize the appearance of your content through standard CSS:

```html
<style>
  .my-parallax-content {
    color: white;
    text-align: center;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
  }
</style>

<vc-parallax src="background.jpg">
  <div class="my-parallax-content">
    <h2>Custom Styled Content</h2>
    <p>This content has custom styling</p>
  </div>
</vc-parallax>
```

## Browser Support

This component works in all modern browsers that support Web Components:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## Performance Considerations

The parallax effect relies on the scroll event which can fire frequently. For better performance, the component uses `translate3d` to leverage hardware acceleration and implements throttling for scroll calculations.

## Examples

See the included `example.html` file for working examples of the component with different configurations.

## License

MIT

## Acknowledgements

This component is inspired by the Vuetify v3 v-parallax component but implemented as a standalone Web Component with no dependencies.