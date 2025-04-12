# Material 2 Badge Web Component (vc-badge)

A versatile and customizable Material Design 2 inspired badge component built using Web Component technology. This component is inspired by the Vuetify v3 badge component but implemented as a standalone web component that can be used in any web project regardless of framework.

## Features

- Simple, lightweight implementation with no dependencies
- Consistent with Material Design 2 aesthetics
- Framework-agnostic - works with any frontend framework or vanilla JS
- Highly customizable with various positioning, styling, and content options
- Compatible with modern browsers

## Installation

Simply include the `vc-badge.js` file in your project:

```html
<script src="path/to/vc-badge.js"></script>
```

Or import it in your JavaScript:

```javascript
import './path/to/vc-badge.js';
```

## Basic Usage

Wrap any element with the `<vc-badge>` component:

```html
<vc-badge content="5">
  <button>Notifications</button>
</vc-badge>
```

## Props / Attributes

| Attribute    | Type                | Default       | Description                                                |
|--------------|---------------------|---------------|------------------------------------------------------------|
| content      | String/Number       | ''            | The content displayed inside the badge                     |
| dot          | Boolean             | false         | Display badge as a dot with no content                     |
| color        | String              | 'primary'     | Badge color - either a preset or custom color              |
| bordered     | Boolean             | false         | Add a white border around the badge                        |
| inline       | Boolean             | false         | Display component as inline-flex instead of block          |
| offset-x     | Number              | 0             | Horizontal offset from default position                    |
| offset-y     | Number              | 0             | Vertical offset from default position                      |
| max          | Number              | Infinity      | Maximum value to display (displays 'max+' when exceeded)   |
| model-value  | Boolean             | true          | Controls visibility of the badge                           |
| position     | String              | 'top-right'   | Position of badge relative to its wrapper                  |

## Available Colors

The component includes the following preset colors:

- `primary` - Blue (#1976D2)
- `secondary` - Gray (#424242)
- `success` - Green (#4CAF50)
- `error` - Red (#FF5252)
- `warning` - Orange (#FB8C00)
- `info` - Light Blue (#2196F3)

You can also use any custom color by providing a valid CSS color:

```html
<vc-badge content="5" color="#9C27B0">
  <button>Custom Color</button>
</vc-badge>
```

## Badge Positions

The badge can be positioned in four different positions relative to its wrapper:

- `top-right` (default)
- `top-left`
- `bottom-right`
- `bottom-left`

Example:

```html
<vc-badge content="5" position="bottom-left">
  <div class="avatar">User</div>
</vc-badge>
```

## Advanced Usage

### Maximum Value

Limit the displayed value with the `max` attribute:

```html
<vc-badge content="120" max="99">
  <button>Notifications</button>
</vc-badge>
```

This will display "99+" instead of "120".

### Dot Badge

Display the badge as a small dot without content:

```html
<vc-badge dot color="error">
  <button>Notifications</button>
</vc-badge>
```

### Custom Positioning

Fine-tune the badge position using the `offset-x` and `offset-y` attributes:

```html
<vc-badge content="5" offset-x="10" offset-y="-5">
  <button>Notifications</button>
</vc-badge>
```

### Visibility Control

Hide the badge while keeping the wrapped content visible:

```html
<vc-badge content="5" model-value="false">
  <button>Notifications</button>
</vc-badge>
```

### Inline Badges

Use badges inline with text:

```html
<p>This text has an <vc-badge content="new" color="success" inline>inline</vc-badge> badge.</p>
```

## Browser Support

The component uses modern Web Component APIs and is compatible with all major browsers that support the Custom Elements v1 specification:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT

## Example

See the `example.html` file for a complete demonstration of all available features and options.