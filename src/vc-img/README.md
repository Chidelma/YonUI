# Material 2 Image Web Component

A lightweight, flexible and reusable image web component inspired by Vuetify v3's `v-img` component. This component is built using native Web Component technology, making it framework-agnostic and easy to use in any project.

## Features

- 🖼️ Responsive image display with aspect ratio support
- 🔄 Loading state with spinner
- ⚠️ Error state handling
- 🎨 Gradient overlay support
- 📏 Aspect ratio control
- 🔍 Object-fit options (cover, contain)
- 🚀 Lazy loading with eager option
- 🔲 Rounded corners option
- 📦 Slot for custom content overlays

## Installation

Simply include the `material2-image.js` file in your project:

```html
<script src="path/to/material2-image.js"></script>
```

Or import it in your JavaScript:

```javascript
import './path/to/material2-image.js';
```

## Usage

Once included, you can use the `<vc-img>` element in your HTML:

```html
<vc-img 
  src="path/to/image.jpg" 
  alt="Description of image"
  aspect-ratio="16/9">
</vc-img>
```

## Props/Attributes

| Attribute     | Type      | Default | Description                                       |
|---------------|-----------|---------|---------------------------------------------------|
| src           | String    | ''      | The source URL of the image                       |
| alt           | String    | ''      | Alt text for the image                            |
| aspect-ratio  | String    | null    | Sets a fixed aspect ratio (e.g., '16/9', '4/3')   |
| cover         | Boolean   | false   | Sets object-fit to 'cover'                        |
| contain       | Boolean   | false   | Sets object-fit to 'contain'                      |
| eager         | Boolean   | false   | Loads image immediately instead of lazy loading   |
| gradient      | String    | ''      | CSS gradient overlay (e.g., 'linear-gradient...') |
| height        | String    | 'auto'  | Sets the height of the component                  |
| width         | String    | '100%'  | Sets the width of the component                   |
| rounded       | Boolean   | false   | Applies rounded corners to the image              |

## Events

| Event Name | Description                                         |
|------------|-----------------------------------------------------|
| load       | Emitted when the image is successfully loaded       |
| error      | Emitted when there's an error loading the image     |

## Slots

The component provides a default slot that can be used to overlay content on top of the image:

```html
<vc-img src="background.jpg" gradient="linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.8))">
  <div style="position: absolute; bottom: 0; padding: 16px; color: white;">
    <h3>Image Title</h3>
    <p>Image description or caption</p>
  </div>
</vc-img>
```

## Examples

### Basic Usage

```html
<vc-img 
  src="image.jpg" 
  alt="My image" 
  height="300px">
</vc-img>
```

### With Aspect Ratio

```html
<vc-img 
  src="image.jpg" 
  alt="My image" 
  aspect-ratio="16/9">
</vc-img>
```

### With Cover Mode

```html
<vc-img 
  src="image.jpg" 
  alt="My image" 
  height="300px"
  cover>
</vc-img>
```

### With Gradient Overlay and Content

```html
<vc-img 
  src="image.jpg" 
  alt="My image" 
  height="300px"
  gradient="linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)">
  <div style="position: absolute; bottom: 0; padding: 16px; color: white;">
    <h3>Image Title</h3>
  </div>
</vc-img>
```

## Browser Support

This component uses Web Components which are supported by all modern browsers. For older browsers, you might need to use polyfills.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.