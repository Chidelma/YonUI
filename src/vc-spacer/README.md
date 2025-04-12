# Material Spacer Web Component

A lightweight, customizable spacer web component inspired by Vuetify v3's spacer component. This component provides a simple way to add spacing between elements in your layouts without additional markup.

## Features

- Create horizontal, vertical, or both-direction spacing
- Customizable sizing using the `size` attribute
- Flexible spacing with the `grow` attribute
- Zero dependencies
- Built using native Web Components for framework-agnostic usage

## Installation

### Option 1: Include directly in your HTML

```html
<script src="material-spacer.js"></script>
```

### Option 2: Install via npm (if packaged)

```bash
npm install material-spacer-component
```

Then import it in your JavaScript:

```javascript
import 'material-spacer-component';
```

## Usage

Once the component is loaded, you can use the `<vc-spacer>` element in your HTML:

```html
<!-- Basic usage with default values -->
<vc-spacer></vc-spacer>

<!-- Horizontal spacer with custom size -->
<vc-spacer direction="horizontal" size="2"></vc-spacer>

<!-- Vertical spacer -->
<vc-spacer direction="vertical" size="4"></vc-spacer>

<!-- Flexible spacer that grows to fill available space -->
<vc-spacer grow></vc-spacer>
```

## Attributes

| Attribute   | Description                                    | Values                                    | Default |
|-------------|------------------------------------------------|-------------------------------------------|---------|
| `size`      | The size multiplier (multiplied by 8px)        | Any positive number                       | `1`     |
| `direction` | The direction in which the spacer extends      | `horizontal`, `vertical`, `both`          | `both`  |
| `grow`      | Whether the spacer should grow to fill space   | Boolean attribute (present or not present)| `false` |

## Examples

### Creating space between flex items

```html
<div style="display: flex; align-items: center;">
  <div>Element 1</div>
  <vc-spacer size="2" direction="horizontal"></vc-spacer>
  <div>Element 2</div>
  <vc-spacer grow></vc-spacer>
  <div>Element 3</div>
</div>
```

### Creating vertical spacing

```html
<div style="display: flex; flex-direction: column;">
  <div>Top element</div>
  <vc-spacer size="3" direction="vertical"></vc-spacer>
  <div>Bottom element</div>
</div>
```

## Customization

The spacer uses CSS custom properties internally, so you can override the base unit size by setting a custom property:

```css
vc-spacer {
  --size-multiplier: 2; /* Override the size multiplier */
}
```

## Browser Support

This component uses standard Web Components APIs and should work in all modern browsers that support the Custom Elements v1 spec.

## License

MIT

## Credits

Inspired by the Vuetify v3 spacer component.