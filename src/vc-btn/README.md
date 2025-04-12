# Material 2 Button Web Component

A customizable Material Design 2 button implemented as a Web Component with no dependencies.

## Features

- 🎨 Three button variants: contained, outlined, and text
- 🌈 Multiple color options: primary, secondary, and default
- 📏 Three size options: small, medium, and large
- 💫 Material Design ripple effect
- ♿ Accessibility-friendly
- 🧩 Fully encapsulated with Shadow DOM
- 🚫 Support for disabled state

## Installation

### Option 1: Direct include

```html
<script src="vc-btn.js"></script>
```

### Option 2: NPM (if you publish it)

```bash
npm install vc-material-button
```

Then import it in your JavaScript:

```javascript
import 'vc-material-button';
```

## Usage

Once the component is imported, you can use it like any other HTML element:

```html
<!-- Basic usage -->
<vc-btn>Click Me</vc-btn>

<!-- With attributes -->
<vc-btn variant="contained" color="primary" size="medium">Primary Button</vc-btn>
```

## API

### Properties/Attributes

| Property  | Attribute | Type    | Default     | Description                                  |
|-----------|-----------|---------|-------------|----------------------------------------------|
| variant   | variant   | String  | 'contained' | Button style ('contained', 'outlined', 'text') |
| color     | color     | String  | 'primary'   | Button color ('primary', 'secondary', 'default') |
| size      | size      | String  | 'medium'    | Button size ('small', 'medium', 'large')     |
| disabled  | disabled  | Boolean | false       | Whether the button is disabled               |

### CSS Custom Properties

The component doesn't expose CSS custom properties, but you can style the button using the Shadow Parts API (future enhancement).

## Examples

### Basic Buttons

```html
<!-- Contained button (default) -->
<vc-btn>Default Button</vc-btn>

<!-- Primary contained button -->
<vc-btn variant="contained" color="primary">Primary Button</vc-btn>

<!-- Secondary contained button -->
<vc-btn variant="contained" color="secondary">Secondary Button</vc-btn>
```

### Outlined Buttons

```html
<vc-btn variant="outlined" color="primary">Primary Outlined</vc-btn>
<vc-btn variant="outlined" color="secondary">Secondary Outlined</vc-btn>
<vc-btn variant="outlined" color="default">Default Outlined</vc-btn>
```

### Text Buttons

```html
<vc-btn variant="text" color="primary">Primary Text</vc-btn>
<vc-btn variant="text" color="secondary">Secondary Text</vc-btn>
<vc-btn variant="text" color="default">Default Text</vc-btn>
```

### Size Variants

```html
<vc-btn size="small">Small Button</vc-btn>
<vc-btn size="medium">Medium Button</vc-btn>
<vc-btn size="large">Large Button</vc-btn>
```

### Disabled Buttons

```html
<vc-btn disabled>Disabled Button</vc-btn>
<vc-btn variant="outlined" disabled>Disabled Outlined</vc-btn>
<vc-btn variant="text" disabled>Disabled Text</vc-btn>
```

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## Accessibility

The button component implements proper accessibility features:
- Uses native `<button>` element internally
- Sets appropriate `role` attributes
- Preserves keyboard navigation
- Handles disabled states correctly

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.