# Material 2 Image Lists Web Component

A lightweight, customizable implementation of Material Design 2 Image Lists using Web Components technology. This library provides a reusable `<vc-image-list>` component that can be easily integrated into any web project without framework dependencies.

## Features

- **Three Layout Variants**: Standard, Masonry, and Quilted layouts
- **Responsive Grid**: Customizable number of columns and gap spacing
- **Text Protection**: Optional overlay for text on top of images
- **Framework Agnostic**: Works with any framework or vanilla JavaScript
- **Customizable**: Easy to style and extend
- **Lightweight**: No external dependencies

## Installation

### Option 1: Include via CDN (recommended)

```html
<script src="https://unpkg.com/vc-image-list@latest/dist/vc-image-list.js"></script>
```

### Option 2: Download and include locally

1. Download the `vc-image-list.js` file
2. Include it in your HTML:

```html
<script src="path/to/vc-image-list.js"></script>
```

### Option 3: NPM (if you publish this as a package)

```bash
npm install vc-image-list
```

Then import in your JavaScript file:

```javascript
import 'vc-image-list';
```

## Usage

### Basic Usage

```html
<vc-image-list variant="standard" columns="3" gap="8">
  <vc-image-list-item primary-text="Item Title" secondary-text="Subtitle">
    <img src="path/to/image.jpg" alt="Description">
  </vc-image-list-item>
  <!-- Add more items as needed -->
</vc-image-list>
```

### Component Attributes

#### `<vc-image-list>` Component

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | String | `'standard'` | Layout variant: `'standard'`, `'masonry'`, or `'quilted'` |
| `columns` | Number | `3` | Number of columns in the grid |
| `gap` | Number | `8` | Gap between items in pixels |

#### `<vc-image-list-item>` Component

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `primary-text` | String | `''` | Main text/title for the item |
| `secondary-text` | String | `''` | Subtitle or supporting text |
| `text-protection` | Boolean | `false` | Whether to add a semi-transparent overlay behind text |

### Layout Variants

#### Standard Layout

A uniform grid where all items have the same size.

```html
<vc-image-list variant="standard" columns="3" gap="8">
  <!-- Image list items -->
</vc-image-list>
```

#### Masonry Layout

A layout where items maintain their aspect ratio but vary in height.

```html
<vc-image-list variant="masonry" columns="3" gap="8">
  <!-- Image list items -->
</vc-image-list>
```

#### Quilted Layout

A pattern-based layout with featured items spanning multiple cells.

```html
<vc-image-list variant="quilted" columns="4" gap="8">
  <!-- Image list items -->
</vc-image-list>
```

## Styling

The components use Shadow DOM for encapsulation, but you can style the container element itself:

```css
vc-image-list {
  max-width: 1200px;
  margin: 0 auto;
}
```

## JavaScript API

You can also interact with the components programmatically:

```javascript
// Get reference to the image list
const imageList = document.querySelector('vc-image-list');

// Change properties
imageList.variant = 'masonry';
imageList.columns = 4;
imageList.gap = 12;

// Create new items
const newItem = document.createElement('vc-image-list-item');
newItem.primaryText = 'New Item';
newItem.secondaryText = 'Added dynamically';
newItem.textProtection = true;

const img = document.createElement('img');
img.src = 'path/to/image.jpg';
img.alt = 'Description';
newItem.appendChild(img);

imageList.appendChild(newItem);
```

## Browser Support

This component uses modern Web Component APIs and should work in all major browsers including:

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, consider using a polyfill like webcomponentsjs.

## Examples

See the included `example.html` file for comprehensive examples of all layout variants and customization options.

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.