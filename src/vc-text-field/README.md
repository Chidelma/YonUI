# Material 2 Text Field Web Component

A lightweight and customizable Material Design 2 text field implementation using Web Components.

## Features

- 🎨 Follows Material Design 2 guidelines
- 🧩 Works with any framework or vanilla JS
- 📦 No dependencies
- 🔄 Two-way data binding
- ✅ Built-in validation
- 📝 Helper text support
- ❌ Error state and messages
- 🔢 Character counter
- 📱 Responsive and accessible

## Installation

### Option 1: Include via Script Tag

```html
<script src="vc-text-field.js"></script>
```

### Option 2: Import as ES Module

```javascript
import './vc-text-field.js';
```

## Basic Usage

```html
<vc-text-field 
  label="Username" 
  helper-text="Enter your username">
</vc-text-field>
```

## API Reference

### Attributes

| Attribute       | Type      | Default | Description                                    |
|-----------------|-----------|---------|------------------------------------------------|
| `value`         | String    | `''`    | The input value                                |
| `label`         | String    | `''`    | The label text                                 |
| `placeholder`   | String    | `''`    | Placeholder text when input is empty           |
| `disabled`      | Boolean   | `false` | Whether the input is disabled                  |
| `required`      | Boolean   | `false` | Whether the input is required                  |
| `readonly`      | Boolean   | `false` | Whether the input is read-only                 |
| `helper-text`   | String    | `''`    | Helper text displayed below the input          |
| `error-message` | String    | `''`    | Error message displayed when validation fails  |
| `max-length`    | Number    | `-1`    | Maximum length of the input, -1 for unlimited  |
| `type`          | String    | `'text'`| Input type (text, password, email, etc.)       |

### Properties

All attributes are also available as properties with camelCase naming:

```javascript
const textField = document.querySelector('vc-text-field');
textField.value = 'New value';
textField.disabled = true;
textField.helperText = 'New helper text';
```

### Methods

| Method           | Description                                              |
|------------------|----------------------------------------------------------|
| `focus()`        | Sets focus on the input element                          |
| `blur()`         | Removes focus from the input element                     |
| `checkValidity()`| Returns true if the input is valid, false otherwise      |
| `setError(msg)`  | Sets an error message                                    |
| `clearError()`   | Clears any error message                                 |

### Events

| Event    | Description                             | Detail                     |
|----------|-----------------------------------------|----------------------------|
| `change` | Fired when the input value changes      | `{ value: string }`        |
| `focus`  | Fired when the input receives focus     | None                       |
| `blur`   | Fired when the input loses focus        | None                       |

## Styling

The component uses CSS custom properties for styling:

```css
vc-text-field {
  --primary-color: #2196F3;       /* Main color for focused state */
  --error-color: #F44336;         /* Color for error state */
  --disabled-color: #9E9E9E;      /* Color for disabled state */
  --label-color: #757575;         /* Color for label */
  --input-color: #212121;         /* Color for input text */
  --border-color: #BDBDBD;        /* Color for border */
}
```

## Examples

### Required Field

```html
<vc-text-field 
  label="Email" 
  required 
  helper-text="We'll never share your email">
</vc-text-field>
```

### Password Field

```html
<vc-text-field 
  label="Password" 
  type="password" 
  helper-text="At least 8 characters">
</vc-text-field>
```

### With Character Counter

```html
<vc-text-field 
  label="Bio" 
  max-length="50" 
  helper-text="Tell us about yourself">
</vc-text-field>
```

### Disabled Field

```html
<vc-text-field 
  label="Username" 
  value="johndoe" 
  disabled>
</vc-text-field>
```

### Read-only Field

```html
<vc-text-field 
  label="User ID" 
  value="USR12345" 
  readonly>
</vc-text-field>
```

### With Error

```html
<vc-text-field 
  label="Email" 
  value="invalid-email" 
  error-message="Please enter a valid email address">
</vc-text-field>
```

## JavaScript API Example

```javascript
// Get reference to the element
const textField = document.getElementById('my-field');

// Set value programmatically
textField.value = 'John Doe';

// Get current value
console.log(textField.value);

// Set focus
textField.focus();

// Check validity
console.log(textField.checkValidity());

// Set error message
textField.setError('This username is already taken');

// Clear error
textField.clearError();

// Listen for changes
textField.addEventListener('change', (event) => {
  console.log('New value:', event.detail.value);
});
```

## Browser Support

This component works in all browsers that support [Web Components](https://caniuse.com/custom-elementsv1):

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, you may need to use polyfills.

## License

MIT