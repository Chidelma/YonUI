# VC-Radio Web Component

A lightweight, Material Design 2 style radio button implemented as a Web Component.

![VC-Radio Component](https://via.placeholder.com/500x100/f5f5f5/1a73e8?text=VC-Radio+Component)

## Features

- 🎨 Material Design 2 styling with ripple effect
- 🔄 Automatic radio group functionality
- ⌨️ Keyboard accessible
- 🧩 No dependencies or frameworks required
- 🔌 Simple API with events for JavaScript integration
- 🎯 Small footprint (~5KB minified)

## Installation

### Option 1: Direct script include

```html
<script src="vc-radio.js"></script>
```

### Option 2: npm (coming soon)

```bash
npm install vc-radio
```

Then import it in your JavaScript:

```javascript
import 'vc-radio';
```

## Basic Usage

```html
<!-- Basic radio button -->
<vc-radio name="group1" value="option1"></vc-radio>
<label>Option 1</label>

<!-- Pre-selected radio button -->
<vc-radio name="group1" value="option2" checked></vc-radio>
<label>Option 2</label>

<!-- Disabled radio button -->
<vc-radio name="group1" value="option3" disabled></vc-radio>
<label>Option 3 (Disabled)</label>
```

## JavaScript API

### Properties

| Property  | Type    | Default | Description                                                |
|-----------|---------|--------|------------------------------------------------------------|
| `checked` | Boolean | `false` | Whether the radio button is checked                        |
| `disabled`| Boolean | `false` | Whether the radio button is disabled                       |
| `value`   | String  | `''`    | The value associated with this radio button                |
| `name`    | String  | `''`    | The name of the radio group this button belongs to         |

### Methods

The component has getters and setters for all properties mentioned above.

```javascript
// Get a reference to the radio button
const radio = document.querySelector('vc-radio');

// Check the radio button
radio.checked = true;

// Disable the radio button
radio.disabled = true;

// Get the value
console.log(radio.value);
```

### Events

| Event    | Detail                           | Description                         |
|----------|----------------------------------|-------------------------------------|
| `change` | `{ checked: Boolean, value: String }` | Fired when the radio button is checked |

```javascript
// Listen for changes
radio.addEventListener('change', (event) => {
  console.log('Selected value:', event.detail.value);
});
```

## Radio Groups

Radio buttons with the same `name` attribute will automatically function as a group, where only one can be selected at a time.

```html
<vc-radio name="fruit" value="apple"></vc-radio>
<label>Apple</label>

<vc-radio name="fruit" value="banana"></vc-radio>
<label>Banana</label>

<vc-radio name="fruit" value="cherry"></vc-radio>
<label>Cherry</label>
```

## Styling

The component uses Shadow DOM encapsulation, but you can apply some styling through CSS custom properties (planned for future release).

## Accessibility

The component implements proper keyboard navigation and ARIA attributes:

- Space or Enter: Toggle the radio button
- Tab: Navigate between radio buttons
- Arrow keys: Navigate within a radio group (planned for future release)

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Any browser that supports Web Components (Custom Elements v1 and Shadow DOM v1)

## Development

### Building from source

```bash
# Clone the repository
git clone https://github.com/yourusername/vc-radio.git
cd vc-radio

# Install dependencies
npm install

# Build
npm run build
```

## License

MIT