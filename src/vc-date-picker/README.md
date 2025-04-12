# Material 2 Date Picker Web Component

A customizable, accessible date picker web component built using the Web Component standard with Material Design 2 styling. The component provides a clean, intuitive date selection experience with a calendar dropdown interface.

## Features

- **Material Design 2 Styling**: Follows Material Design 2 guidelines for a familiar, polished appearance
- **Web Component**: Built using native web component technology for framework-agnostic usage
- **Customizable**: Supports various configuration options including min/max dates, labels, and more
- **Accessible**: Keyboard navigable with proper ARIA attributes
- **Responsive**: Works on both desktop and mobile devices
- **No Dependencies**: Pure JavaScript implementation with no external dependencies

## Installation

Simply include the `vc-date-picker.js` file in your project:

```html
<script src="path/to/vc-date-picker.js"></script>
```

## Basic Usage

```html
<!-- Basic date picker -->
<vc-date-picker label="Select a date"></vc-date-picker>

<!-- With initial value -->
<vc-date-picker label="Arrival date" value="2023-04-15"></vc-date-picker>

<!-- With min and max dates -->
<vc-date-picker 
  label="Select within range" 
  min="2023-01-01" 
  max="2023-12-31">
</vc-date-picker>

<!-- Disabled state -->
<vc-date-picker label="Cannot change this date" disabled></vc-date-picker>

<!-- Required field -->
<vc-date-picker label="Required date" required></vc-date-picker>
```

## API Reference

### Attributes/Properties

| Attribute | Property | Type    | Default     | Description |
|-----------|----------|---------|-------------|-------------|
| `value`   | `value`  | String  | `''`        | The selected date in ISO format (YYYY-MM-DD) |
| `min`     | `min`    | String  | `''`        | The minimum selectable date in ISO format |
| `max`     | `max`    | String  | `''`        | The maximum selectable date in ISO format |
| `label`   | `label`  | String  | `'Select date'` | Label text for the input field |
| `disabled` | `disabled` | Boolean | `false`   | Whether the date picker is disabled |
| `required` | `required` | Boolean | `false`   | Whether the date picker is required |

### Events

| Event     | Detail                              | Description |
|-----------|-------------------------------------|-------------|
| `change`  | `{ value: string, date: Date }`    | Fired when the selected date changes |

### Methods

| Method    | Parameters | Return Type | Description |
|-----------|------------|-------------|-------------|
| `value`   | `string`   | void        | Sets the current value and updates the UI |
| `label`   | `string`   | void        | Updates the label text |
| `min`     | `string`   | void        | Sets the minimum date |
| `max`     | `string`   | void        | Sets the maximum date |
| `disabled` | `boolean` | void        | Enables/disables the date picker |
| `required` | `boolean` | void        | Makes the date picker required/optional |

## Examples

### JavaScript Interaction

```javascript
// Get a reference to the date picker
const datePicker = document.querySelector('vc-date-picker');

// Set a date programmatically
datePicker.value = '2023-05-15';

// Listen for changes
datePicker.addEventListener('change', (event) => {
  console.log('Selected date:', event.detail.value);
  console.log('As Date object:', event.detail.date);
});

// Disable the date picker
datePicker.disabled = true;

// Make it required
datePicker.required = true;
```

### Styling

The date picker uses Shadow DOM for encapsulation, but you can customize its appearance using CSS variables (coming in a future version) or by extending the component.

## Browser Support

This component works in all modern browsers that support Web Components:

- Chrome/Edge (Chromium-based)
- Firefox
- Safari

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.