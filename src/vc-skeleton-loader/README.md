# vc-skeleton-loader

A Material 2 Skeleton Loader Web Component inspired by Vuetify v3. This lightweight, framework-agnostic web component provides loading placeholders for various UI elements.

## Features

- 🎨 Material Design styling
- 🧩 Multiple skeleton types (text, avatar, button, card, etc.)
- 📱 Responsive and customizable
- 🔌 Works with any framework or vanilla JS
- 💨 CSS animations for loading states
- 🏗️ Combine multiple skeleton types
- 🎯 Custom types via slots

## Installation

### Option 1: Include via CDN (coming soon)

```html
<script src="https://unpkg.com/vc-skeleton-loader@1.0.0/vc-skeleton-loader.js"></script>
```

### Option 2: Download and include locally

1. Download the `vc-skeleton-loader.js` file
2. Include it in your HTML:

```html
<script src="./path/to/vc-skeleton-loader.js"></script>
```

## Basic Usage

```html
<!-- Basic text skeleton -->
<vc-skeleton-loader type="text"></vc-skeleton-loader>

<!-- Avatar skeleton -->
<vc-skeleton-loader type="avatar"></vc-skeleton-loader>

<!-- Card skeleton with elevation -->
<vc-skeleton-loader type="card" elevation="2"></vc-skeleton-loader>
```

## Available Types

- `text` - A simple text line
- `avatar` - A circular avatar placeholder
- `button` - A button placeholder
- `chip` - A chip/badge placeholder
- `image` - An image placeholder
- `card` - A card with image and text placeholders
- `list-item` - A list item with avatar and text
- `paragraph` - Multiple text lines
- `table` - A simple table structure

## Combining Types

You can combine multiple types by separating them with spaces:

```html
<!-- Card followed by a paragraph -->
<vc-skeleton-loader type="card paragraph"></vc-skeleton-loader>

<!-- Multiple list items -->
<vc-skeleton-loader type="list-item list-item list-item"></vc-skeleton-loader>
```

## Props/Attributes

| Prop/Attribute | Type | Default | Description |
|----------------|------|---------|-------------|
| `type` | String | `'text'` | Type of skeleton loader |
| `loading` | Boolean | `true` | Whether to show the skeleton |
| `elevation` | Number | `0` | Material elevation (0-24) |
| `height` | String | `null` | Custom height (CSS value) |
| `width` | String | `null` | Custom width (CSS value) |
| `boilerplate` | Boolean | `false` | Remove animation |
| `tile` | Boolean | `false` | Remove border radius |

## JavaScript API

You can also manipulate the component using JavaScript:

```javascript
// Get the element
const skeleton = document.querySelector('vc-skeleton-loader');

// Set properties
skeleton.type = 'card';
skeleton.elevation = 3;
skeleton.loading = false; // Hide skeleton
skeleton.boilerplate = true; // Remove animation
skeleton.width = '300px';
skeleton.height = '200px';
```

## Custom Types with Slots

Create custom skeleton types using slots:

```html
<vc-skeleton-loader type="custom-type">
  <div slot="custom-type" style="width: 100px; height: 100px; background-color: #e0e0e0;"></div>
</vc-skeleton-loader>
```

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Any browser that supports Web Components

## Examples

See the included `example.html` file for a complete showcase of all features and types.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

This component is inspired by Vuetify's v-skeleton-loader component but implemented as a framework-agnostic web component.