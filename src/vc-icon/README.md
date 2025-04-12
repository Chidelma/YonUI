# Material 2 Icons Web Component

A lightweight Material Icons web component inspired by Vuetify v3's icon implementation. This component provides a simple way to use Material Design icons in your web projects with various customization options.

## Features

- 🎨 Custom color support
- 📏 Adjustable size
- 🔍 Density options (default, comfortable, compact)
- 🧩 Positioning attributes (left, right, start)
- ⚡ Lightweight with no dependencies
- 🚫 Disabled state support

## Installation

1. Include the Material Icons font in your HTML:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

2. Include the web component:

```html
<script src="material-icons.js"></script>
```

## Usage

Basic usage:

```html
<vc-icon icon="home"></vc-icon>
```

## Props/Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `icon` | String | - | The name of the Material Icon (required) |
| `color` | String | - | Custom color for the icon (any valid CSS color) |
| `size` | String/Number | - | Size of the icon in pixels (e.g., "24" or "24px") |
| `density` | String | "default" | Density preset: "default", "comfortable", or "compact" |
| `left` | Boolean | false | Adds right margin to position the icon on the left side of content |
| `right` | Boolean | false | Adds left margin to position the icon on the right side of content |
| `start` | Boolean | false | Adds a larger right margin (useful for navigation items) |
| `disabled` | Boolean | false | Reduces opacity and disables pointer events |

## Examples

### Colors

```html
<vc-icon icon="home" color="#1867c0"></vc-icon>
<vc-icon icon="favorite" color="#e91e63"></vc-icon>
<vc-icon icon="check_circle" color="#4caf50"></vc-icon>
```

### Sizes

```html
<vc-icon icon="account_circle" size="16"></vc-icon>
<vc-icon icon="account_circle" size="24"></vc-icon>
<vc-icon icon="account_circle" size="36"></vc-icon>
```

### Density

```html
<vc-icon icon="settings" density="default"></vc-icon>
<vc-icon icon="settings" density="comfortable"></vc-icon>
<vc-icon icon="settings" density="compact"></vc-icon>
```

### With Buttons

```html
<button class="btn">
  <vc-icon icon="add" left></vc-icon>
  Add Item
</button>

<button class="btn">
  Save
  <vc-icon icon="save" right></vc-icon>
</button>
```

### Disabled State

```html
<vc-icon icon="delete" color="#e91e63" disabled></vc-icon>
```

## Browser Support

This web component uses modern web standards and should work in all modern browsers that support Custom Elements v1.

## License

MIT

## Acknowledgements

This component is inspired by the Vuetify v3 framework's icon component implementation.