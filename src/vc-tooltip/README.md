# Material 2 Tooltips Web Component

A lightweight, customizable Material Design 2 inspired tooltip web component. This component follows Material Design guidelines for tooltips and provides a simple way to add tooltips to your web applications.

## Features

- 🎨 Material Design 2 styled tooltips
- 🔄 Four positioning options: top, bottom, left, right
- ⏱️ Customizable show and hide delays
- 📱 Mobile-friendly with touch support
- 🌟 Smooth animations and transitions
- 🧩 Works with any HTML element
- 🔍 Accessible with keyboard focus support
- 📦 Zero dependencies
- 🚀 Lightweight and performant

## Installation

Simply include the `vc-tooltip.js` file in your project:

```html
<script src="path/to/vc-tooltip.js"></script>
```

## Usage

### Basic Usage

```html
<vc-tooltip text="This is a tooltip">
  <button>Hover me</button>
</vc-tooltip>
```

### Positioning

You can position the tooltip in four different directions:

```html
<vc-tooltip text="Top tooltip" position="top">
  <button>Top</button>
</vc-tooltip>

<vc-tooltip text="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</vc-tooltip>

<vc-tooltip text="Left tooltip" position="left">
  <button>Left</button>
</vc-tooltip>

<vc-tooltip text="Right tooltip" position="right">
  <button>Right</button>
</vc-tooltip>
```

### Custom Delays

You can customize the show and hide delays (in milliseconds):

```html
<vc-tooltip text="Instant tooltip" delay="0">
  <button>No delay</button>
</vc-tooltip>

<vc-tooltip text="Delayed tooltip" delay="1000">
  <button>1 second delay</button>
</vc-tooltip>

<vc-tooltip text="Persists after hover" hide-delay="500">
  <button>Stays visible for a bit</button>
</vc-tooltip>
```

### With Icons

```html
<vc-tooltip text="Settings">
  <button class="icon-button">⚙️</button>
</vc-tooltip>
```

## Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| `text` | The tooltip text content | - |
| `position` | Tooltip position: `top`, `bottom`, `left`, `right` | `top` |
| `delay` | Show delay in milliseconds | `500` |
| `hide-delay` | Hide delay in milliseconds | `0` |

## Styling

The tooltip uses Shadow DOM for encapsulation, but you can customize the host element using regular CSS:

```css
vc-tooltip {
  display: inline-block;
  margin: 8px;
}
```

## Dynamic Updates

You can dynamically update the tooltip attributes:

```javascript
const tooltip = document.querySelector('vc-tooltip');
tooltip.setAttribute('text', 'New tooltip text');
tooltip.setAttribute('position', 'bottom');
tooltip.setAttribute('delay', '200');
tooltip.setAttribute('hide-delay', '300');
```

## Browser Support

This web component works in all modern browsers that support Web Components:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## Example

See the included `example.html` file for a complete demo of all features.

## License

MIT