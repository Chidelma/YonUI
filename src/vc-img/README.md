# Material 2 Image Web Component (vc-img)

A lightweight, responsive, and feature-rich image web component inspired by Vuetify's v-img. This component is built using the Web Components standard, making it framework-agnostic and usable in any modern web application.

## Features

- **Responsive Design**: Automatically adapts to container size
- **Aspect Ratio Support**: Maintain specific aspect ratios for images
- **Loading States**: Shows a placeholder while the image loads
- **Cover/Contain Modes**: Control how the image fills its container
- **Lazy Loading**: Only load images when they enter the viewport
- **Gradient Overlays**: Apply customizable gradients over images
- **Content Overlay**: Add text or other elements on top of images
- **Custom Transitions**: Control the animation when images load
- **Event Handling**: Monitor loading and error states

## Installation

Simply include the `material-2-image.js` file in your project:

```html
<script src="path/to/material-2-image.js"></script>
```

## Usage

Once you've included the script, you can use the `<vc-img>` element in your HTML:

```html
<vc-img 
  src="path/to/image.jpg" 
  alt="Description of image" 
  width="100%" 
  height="300"
  cover>
</vc-img>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `src` | String | - | URL of the image |
| `alt` | String | - | Alternative text for the image |
| `width` | String | - | Width of the component (px, %, etc.) |
| `height` | String | - | Height of the component (px, %, etc.) |
| `aspect-ratio` | String | - | Sets a specific aspect ratio (e.g., "16:9") |
| `cover` | Boolean | false | Sets object-fit to cover |
| `contain` | Boolean | false | Sets object-fit to contain |
| `lazy-load` | Boolean | false | Enables lazy loading for the image |
| `transition` | String | "0.25s ease-in-out" | Custom transition for image loading |
| `gradient` | String | - | CSS gradient overlay for the image |

## Slots

The component accepts content as a slot, allowing you to overlay text or other elements on top of the image:

```html
<vc-img src="path/to/image.jpg" width="100%" height="300" cover>
  <div class="overlay-content">
    <h3>Image Title</h3>
    <p>Image description goes here</p>
  </div>
</vc-img>
```

## Events

The component dispatches the following custom events:

| Event | Description |
|-------|-------------|
| `vc-img:load` | Fired when the image is successfully loaded |
| `vc-img:error` | Fired when the image fails to load |

### Event Examples

```javascript
const image = document.querySelector('vc-img');

image.addEventListener('vc-img:load', () => {
  console.log('Image loaded successfully!');
});

image.addEventListener('vc-img:error', () => {
  console.log('Image failed to load!');
});
```

## Public Methods

The component exposes the following methods:

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getSrc()` | String | Returns the current image source URL |
| `isLoaded()` | Boolean | Returns true if the image has loaded |
| `hasError()` | Boolean | Returns true if there was an error loading the image |

## Examples

### Basic Example

```html
<vc-img 
  src="path/to/image.jpg" 
  alt="Description" 
  width="100%" 
  height="250"
  cover>
</vc-img>
```

### With Aspect Ratio

```html
<vc-img 
  src="path/to/image.jpg" 
  alt="Description" 
  width="100%" 
  aspect-ratio="16:9"
  cover>
</vc-img>
```

### With Gradient Overlay

```html
<vc-img 
  src="path/to/image.jpg" 
  alt="Description" 
  width="100%" 
  height="250"
  gradient="linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)"
  cover>
  <span class="overlay-text">Text over gradient</span>
</vc-img>
```

### Lazy Loading

```html
<vc-img 
  src="path/to/image.jpg" 
  alt="Description" 
  width="100%" 
  height="250"
  lazy-load
  cover>
</vc-img>
```

## Browser Support

This component uses modern web standards and should work in all browsers that support Web Components. For older browsers, consider using a polyfill.

## License

MIT License