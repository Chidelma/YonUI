# Material 2 Navigation Rail Web Component

A lightweight, customizable navigation rail component following Material Design 2 guidelines. This web component `<vc-rail>` provides a clean, responsive side navigation that works across all modern browsers.

## Features

- Pure JavaScript with no dependencies
- Follows Material Design 2 specifications
- Supports icons, labels, and notification badges
- Custom styling through CSS variables
- Fires events for navigation changes
- Responsive and accessible

## Installation

1. Download the `vc-rail.js` file
2. Include it in your HTML:

```html
<script src="path/to/vc-rail.js"></script>
```

## Basic Usage

```html
<vc-rail selected="0">
  <div vc-rail-item 
       icon="<svg>...</svg>" 
       label="Home">
  </div>
  
  <div vc-rail-item 
       icon="<svg>...</svg>" 
       label="Messages" 
       badge-count="3">
  </div>
</vc-rail>
```

## API

### Attributes

| Attribute | Description |
|-----------|-------------|
| `selected` | Index of the selected item (0-based). |

### Item Attributes

Each navigation item should have the following attributes:

| Attribute | Description |
|-----------|-------------|
| `vc-rail-item` | Required. Marks an element as a navigation item. |
| `icon` | SVG icon markup for the item. |
| `label` | Text label for the item. |
| `badge-count` | (Optional) Shows a notification badge with the specified number. |

### Events

| Event | Description |
|-------|-------------|
| `vc-rail-change` | Fired when the selected item changes. The event detail contains `index` and `item` properties. |

### CSS Custom Properties

The component can be styled using the following CSS variables:

| Property | Default | Description |
|----------|---------|-------------|
| `--vc-rail-width` | `72px` | Width of the navigation rail |
| `--vc-rail-background` | `#ffffff` | Background color |
| `--vc-rail-color` | `#5f6368` | Text and icon color |
| `--vc-rail-color-selected` | `#1a73e8` | Color of selected item |
| `--vc-rail-badge-color` | `#ea4335` | Color of notification badges |
| `--vc-rail-border-color` | `#dadce0` | Color of right border |
| `--vc-rail-transition` | `0.2s ease` | Transition for hover and selection effects |

## JavaScript API

You can also interact with the component programmatically:

```javascript
// Get the rail element
const rail = document.querySelector('vc-rail');

// Change the selected index
rail.selected = 2;

// Listen for navigation changes
rail.addEventListener('vc-rail-change', (event) => {
  console.log('Selected index:', event.detail.index);
  console.log('Selected item:', event.detail.item);
});
```

## Styling Examples

### Custom colors

```css
vc-rail {
  --vc-rail-color: #424242;
  --vc-rail-color-selected: #6200ee; /* Purple accent */
  --vc-rail-badge-color: #03dac6; /* Teal accent */
}
```

### Dark theme

```css
vc-rail {
  --vc-rail-background: #121212;
  --vc-rail-color: #e0e0e0;
  --vc-rail-color-selected: #bb86fc;
  --vc-rail-badge-color: #03dac6;
  --vc-rail-border-color: #333333;
}
```

## Browser Support

The component works on all modern browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT