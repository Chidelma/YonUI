# Material 2 OTP Input Web Component

A lightweight, customizable OTP (One-Time Password) input web component inspired by Vuetify v3's OTP Input. Built using native Web Component technology with no dependencies.

## Features

- 🚀 Zero dependencies
- 🎨 Material Design 2 styling
- ✅ Works with any framework (or no framework)
- 📱 Mobile-friendly with numeric keyboard
- ⌨️ Keyboard navigation support
- 📋 Paste functionality
- 🛠️ Highly customizable
- 🔒 Password mode support
- 🔄 Loading state
- ♿ Accessibility friendly

## Installation

### 1. Include the script in your HTML

```html
<script src="path/to/material-otp-input.js"></script>
```

### 2. Use the web component in your HTML

```html
<vc-otp-input length="6"></vc-otp-input>
```

## Basic Usage

```html
<!-- Basic OTP input with 6 digits -->
<vc-otp-input length="6"></vc-otp-input>

<!-- OTP input with initial value -->
<vc-otp-input length="4" value="1234"></vc-otp-input>

<!-- OTP input with autofocus -->
<vc-otp-input length="6" autofocus></vc-otp-input>

<!-- Password mode -->
<vc-otp-input length="4" type="password"></vc-otp-input>

<!-- Disabled state -->
<vc-otp-input length="6" disabled></vc-otp-input>

<!-- Loading state -->
<vc-otp-input length="6" loading></vc-otp-input>
```

## JavaScript API

### Accessing the Web Component

```javascript
// Get the OTP input element
const otpInput = document.querySelector('vc-otp-input');

// Get the current value
const value = otpInput.value;

// Set a new value
otpInput.value = '123456';

// Clear the input
otpInput.clear();

// Focus the first input
otpInput.focus();

// Change the length dynamically
otpInput.length = 8;

// Enable/disable the component
otpInput.disabled = true; // or false

// Change loading state
otpInput.loading = true; // or false
```

### Event Handling

```javascript
// Listen for value changes
otpInput.addEventListener('change', (event) => {
  console.log('Value:', event.detail.value);
  console.log('Complete:', event.detail.complete);
});
```

## Attributes

| Attribute    | Type      | Default | Description                                   |
|--------------|-----------|---------|-----------------------------------------------|
| `length`     | Number    | 6       | Number of input fields                        |
| `value`      | String    | ''      | Current value of the OTP input                |
| `autofocus`  | Boolean   | false   | Automatically focus the first input on mount  |
| `placeholder`| String    | '•'     | Placeholder shown in empty inputs             |
| `disabled`   | Boolean   | false   | Disable all inputs                            |
| `type`       | String    | 'text'  | Input type ('text' or 'password')             |
| `loading`    | Boolean   | false   | Show loading animation                        |

## Methods

| Method     | Parameters | Description                                   |
|------------|------------|-----------------------------------------------|
| `clear()`  | None       | Clears all inputs and focuses the first field |
| `focus()`  | None       | Focuses the first input field                 |

## Events

| Event     | Detail                         | Description                       |
|-----------|--------------------------------|-----------------------------------|
| `change`  | `{ value: string, complete: boolean }` | Fired when value changes       |

## Styling

You can customize the appearance of the OTP input by targeting the component in your CSS:

```css
/* Custom styling for the OTP input */
vc-otp-input {
  --otp-input-gap: 12px;             /* Gap between inputs */
  --otp-input-background: #f0f0f0;   /* Input background color */
  --otp-input-focused-background: #e1f5fe; /* Focused input background */
  --otp-input-text-color: #212121;   /* Text color */
  --otp-input-border-radius: 8px;    /* Input border radius */
  --otp-input-height: 60px;          /* Input height */
  --otp-input-width: 48px;           /* Input width */
  --otp-input-font-size: 24px;       /* Font size */
  --otp-input-caret-color: #2196f3;  /* Cursor color */
}
```

## Browser Support

- Chrome (and Chromium-based browsers like Edge)
- Firefox
- Safari
- Any modern browser that supports Web Components

## License

MIT