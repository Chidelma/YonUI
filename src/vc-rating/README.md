# Material 2 Rating Component

A lightweight, customizable rating component inspired by Vuetify v3, built using native Web Component technology.

## Features

- 🌟 Material Design 2 styled star rating system
- 🎨 Customizable colors, size, and density
- 🔄 Half-star ratings support
- ⌨️ Keyboard navigation for accessibility
- 🔒 Read-only mode option
- 📱 Responsive design
- 🧩 Framework-agnostic (works with any framework or vanilla JS)

## Installation

Simply include the `material-rating.js` file in your project:

```html
<script src="path/to/material-rating.js"></script>
```

## Usage

Add the `<vc-rating>` element to your HTML:

```html
<vc-rating value="3.5" max="5"></vc-rating>
```

### Listen for changes

```javascript
const rating = document.querySelector('vc-rating');
rating.addEventListener('change', (event) => {
  console.log('New rating:', event.detail.value);
});
```

### Programmatic control

```javascript
const rating = document.querySelector('vc-rating');

// Get current value
console.log(rating.value);

// Set new value
rating.value = 4;
```

## API

### Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| value | value | Number | 0 | The current rating value |
| max | max | Number | 5 | Maximum number of stars |
| readonly | readonly | Boolean | false | Whether the rating can be changed |
| dense | dense | Boolean | false | Reduces the spacing between stars |
| size | size | Number | 24 | Size of stars in pixels |
| color | color | String | '#FFCA28' | Color of filled stars |
| emptyColor | empty-color | String | '#E0E0E0' | Color of empty stars |
| hoverColor | hover-color | String | '#FFA000' | Color of stars on hover |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| change | `{ value: Number }` | Fires when the rating value changes |

## Examples

### Basic Usage

```html
<vc-rating value="3.5"></vc-rating>
```

### Custom Colors

```html
<vc-rating 
  value="4" 
  color="#9C27B0" 
  empty-color="#E1BEE7" 
  hover-color="#7B1FA2">
</vc-rating>
```

### Read-only Rating

```html
<vc-rating value="4.5" readonly></vc-rating>
```

### Dense Mode with Custom Size

```html
<vc-rating value="3" dense size="18"></vc-rating>
```

### Custom Maximum

```html
<vc-rating value="7" max="10"></vc-rating>
```

## Browser Support

Works in all modern browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT