# Material 2 Avatar Web Component

A lightweight, customizable Material Design 2 Avatar web component inspired by Vuetify v3's `v-avatar` component. This component is built using the native Web Components API, making it framework-agnostic and easy to integrate into any project.

## Features

- **Framework-agnostic**: Works with any web framework or vanilla JavaScript
- **Multiple sizes**: Predefined sizes (x-small, small, medium, large, x-large) or custom pixel sizes
- **Content options**: Support for text, icons, or images
- **Variants**: Flat or outlined style variants
- **Shapes**: Square or rounded (circular) avatars
- **Customizable colors**: Set background and text colors
- **Lightweight**: No dependencies required

## Installation

Simply copy the `material-avatar.js` file to your project and include it in your HTML.

```html
<script src="path/to/material-avatar.js"></script>
```

## Usage

After importing the component, you can use the `<vc-avatar>` tag in your HTML:

```html
<!-- Basic usage with text -->
<vc-avatar text="JS"></vc-avatar>

<!-- Using an image -->
<vc-avatar image="path/to/image.jpg"></vc-avatar>

<!-- Using an icon (requires Material Icons) -->
<vc-avatar icon="person"></vc-avatar>
```

## API

### Properties

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `size` | `String` | `'medium'` | Size of the avatar. Options: `'x-small'`, `'small'`, `'medium'`, `'large'`, `'x-large'`, or a custom number in pixels |
| `color` | `String` | `'#1976D2'` | Background color (for flat variant) or border color (for outlined variant) |
| `text-color` | `String` | `'#FFFFFF'` | Color of the text or icon |
| `text` | `String` | `''` | Text content (displays up to 2 characters) |
| `image` | `String` | `''` | URL of the image to display |
| `icon` | `String` | `''` | Icon name (requires Material Icons) |
| `rounded` | `Boolean` | `false` | Whether the avatar should be circular |
| `variant` | `String` | `'flat'` | Avatar style variant: `'flat'` or `'outlined'` |

### Content Priority

When multiple content types are provided, the component follows this priority order:
1. Image
2. Icon
3. Text

## Examples

### Size Variants

```html
<vc-avatar size="x-small" text="XS"></vc-avatar>
<vc-avatar size="small" text="SM"></vc-avatar>
<vc-avatar size="medium" text="MD"></vc-avatar>
<vc-avatar size="large" text="LG"></vc-avatar>
<vc-avatar size="x-large" text="XL"></vc-avatar>
<vc-avatar size="72" text="72"></vc-avatar>
```

### Color Variants

```html
<vc-avatar color="#F44336" text="R"></vc-avatar>
<vc-avatar color="#4CAF50" text="G"></vc-avatar>
<vc-avatar color="#2196F3" text="B"></vc-avatar>
<vc-avatar color="#FF9800" text="O"></vc-avatar>
<vc-avatar color="#9C27B0" text="P"></vc-avatar>
```

### Content Types

```html
<vc-avatar text="AB"></vc-avatar>
<vc-avatar icon="person"></vc-avatar>
<vc-avatar image="https://picsum.photos/id/64/100/100"></vc-avatar>
```

### Shape Variants

```html
<vc-avatar text="SQ"></vc-avatar>
<vc-avatar rounded text="RD"></vc-avatar>
```

### Style Variants

```html
<vc-avatar variant="flat" color="#E91E63" text="FL"></vc-avatar>
<vc-avatar variant="outlined" color="#E91E63" text="OL"></vc-avatar>
```

## Material Icons Support

To use icons with the avatar component, include Material Icons in your HTML:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Browser Support

This component uses the Web Components API, which is supported by all modern browsers. For older browsers, a polyfill might be needed.

## License

MIT

## Acknowledgments

- Inspired by [Vuetify v3's v-avatar component](https://vuetifyjs.com/en/components/avatars/)