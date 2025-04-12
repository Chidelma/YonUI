# vc-textarea

A Material 2 Design inspired textarea web component, based on Vuetify v3's styling and behavior. This lightweight, framework-agnostic component is built using the Web Components standard, making it compatible with any modern browser or JavaScript framework.

## Features

- 🎨 Material Design 2 styling
- 📝 Regular and outlined variants
- 🔄 Auto-growing capability
- 🔢 Character counter with maxlength support
- ❌ Clearable option
- 🚧 Validation with error and success states
- 💡 Hint messages (persistent or focus-based)
- ⌨️ Customizable rows and max rows
- 🚫 Disabled and readonly states
- 🏷️ Placeholders with persistent option
- 🎭 Event system for input/change/focus/blur
- 🎯 No dependencies

## Installation

Simply copy the `vc-textarea.js` file to your project and include it in your HTML:

```html
<script src="path/to/vc-textarea.js"></script>
```

## Basic Usage

After including the script, you can use the `<vc-textarea>` element in your HTML:

```html
<vc-textarea 
  label="Message" 
  placeholder="Enter your message"
  hint="Optional hint text"
></vc-textarea>
```

## API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | String | `''` | The label text for the textarea |
| `value` | String | `''` | The textarea value |
| `placeholder` | String | `''` | Placeholder text shown when the textarea is empty |
| `hint` | String | `''` | Helper text displayed below the textarea |
| `error` | String | `''` | Error message that turns the textarea to error state |
| `success` | String | `''` | Success message that turns the textarea to success state |
| `outlined` | Boolean | `false` | Uses the outlined design variant |
| `disabled` | Boolean | `false` | Disables the textarea |
| `readonly` | Boolean | `false` | Makes the textarea read-only |
| `rows` | Number | `5` | The number of rows to show |
| `maxrows` | Number | `null` | Maximum number of rows when using `autogrow` |
| `autogrow` | Boolean | `false` | Automatically grows the textarea based on content |
| `counter` | Boolean | `false` | Shows a character counter below the textarea |
| `maxlength` | Number | `-1` | Maximum length of the textarea content |
| `clearable` | Boolean | `false` | Adds a clear icon when the textarea has content |
| `persistent-hint` | Boolean | `false` | Makes the hint text always visible |
| `persistent-placeholder` | Boolean | `false` | Makes the placeholder behavior persistent |

### Properties

The component exposes JavaScript properties that can be accessed and modified programmatically:

```javascript
const textarea = document.querySelector('vc-textarea');

// Get value
console.log(textarea.value);

// Set value
textarea.value = 'New text content';

// Set disabled state
textarea.disabled = true;

// Set readonly state
textarea.readonly = true;
```

### Events

The component emits the following custom events:

| Event | Detail | Description |
|-------|--------|-------------|
| `input` | `{ value: string }` | Fired when the textarea content changes |
| `change` | `{ value: string }` | Fired when the textarea content changes |
| `focus` | `{ value: string }` | Fired when the textarea gains focus |
| `blur` | `{ value: string }` | Fired when the textarea loses focus |
| `clear` | none | Fired when the clear button is clicked |

Example:

```javascript
const textarea = document.querySelector('vc-textarea');

textarea.addEventListener('input', (event) => {
  console.log('Current value:', event.detail.value);
});

textarea.addEventListener('clear', () => {
  console.log('Textarea was cleared');
});
```

## Styling

The component uses CSS variables for easy customization:

```css
vc-textarea {
  --primary-color: #1976d2; /* Change primary color */
  --error-color: #ff5252; /* Change error color */
  --success-color: #4caf50; /* Change success color */
  --disabled-color: rgba(0, 0, 0, 0.38); /* Change disabled color */
  --border-color: rgba(0, 0, 0, 0.42); /* Change border color */
  --hover-border-color: rgba(0, 0, 0, 0.87); /* Change hover border color */
  --background-color: #f5f5f5; /* Change background color */
}
```

## Examples

### Standard Textarea

```html
<vc-textarea
  label="Message"
  placeholder="Enter your message"
  hint="Type a message here"
></vc-textarea>
```

### Outlined Variant

```html
<vc-textarea
  label="Comments"
  placeholder="Enter your comments"
  outlined
  hint="Your feedback matters"
></vc-textarea>
```

### With Character Counter and Maximum Length

```html
<vc-textarea
  label="Limited Text"
  counter
  maxlength="100"
  hint="Maximum 100 characters"
></vc-textarea>
```

### Auto-growing Textarea

```html
<vc-textarea
  label="Auto-growing Textarea"
  autogrow
  rows="2"
  maxrows="6"
  hint="Grows up to 6 rows"
></vc-textarea>
```

### Validation States

```html
<vc-textarea
  label="Password"
  error="Password is too short"
></vc-textarea>

<vc-textarea
  label="Bio"
  value="My bio information"
  success="Bio saved successfully"
></vc-textarea>
```

### Clearable Input

```html
<vc-textarea
  label="Clearable Input"
  value="Type something and clear it"
  clearable
  hint="Click the X to clear"
></vc-textarea>
```

## Browser Compatibility

This component works in all modern browsers that support the Web Components standard:

- Chrome/Edge (v67+)
- Firefox (v63+)
- Safari (v12.1+)
- Opera (v54+)

For older browsers, you may need to use polyfills.

## License

MIT