# vc-file-input

A Material Design 2-inspired file input web component, based on Vuetify v3's v-file-input component. This standalone web component can be used in any web project regardless of framework.

![Material Design File Input Component](https://via.placeholder.com/800x150?text=Material+Design+File+Input+Component)

## Features

- 📁 Single and multiple file selection
- 🎨 Multiple style variants (filled, outlined, plain, underlined, solo)
- 🔧 Highly customizable with props and attributes
- 💎 Chips mode to display selected files as chips
- 📊 Counter to show file count
- 📱 Responsive with different density options
- 🧩 Framework agnostic - works with any web project
- 🎯 File type restrictions with accept attribute
- 🚫 Error states and validation support
- 📝 Rich JavaScript API for programmatic control

## Installation

### Option 1: Direct include

```html
<script src="./vc-file-input.js"></script>
```

### Option 2: NPM (if you publish it)

```bash
npm install vc-file-input
```

Then import it in your JavaScript:

```javascript
import 'vc-file-input';
```

## Basic Usage

```html
<vc-file-input label="Choose File"></vc-file-input>
```

Make sure you have the Material Icons font included in your project for the icons:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Attributes & Properties

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | String | "Choose file" | The label text for the input |
| `placeholder` | String | "" | Placeholder text when no file is selected |
| `multiple` | Boolean | false | Allow multiple file selection |
| `disabled` | Boolean | false | Disable the input |
| `accept` | String | "" | File type filter (e.g., "image/*", ".pdf,.doc") |
| `clearable` | Boolean | true | Show a clear button for removing selected files |
| `persistent-placeholder` | Boolean | false | Keep placeholder visible even when files are selected |
| `prepend-icon` | String | "file_upload" | Material icon name for the prepend icon |
| `counter` | Boolean | false | Show a counter for the number of selected files |
| `chips` | Boolean | false | Display selected files as chips |
| `variant` | String | "filled" | Style variant: "filled", "outlined", "plain", "underlined", "solo" |
| `density` | String | "default" | Density of the input: "default", "comfortable", "compact" |
| `color` | String | "primary" | Theme color: "primary", "secondary", "success", "error", etc. |
| `error` | Boolean | false | Set the input in error state |

## Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `setFiles(files)` | `files`: File or File[] | Programmatically set the selected files |
| `clearFiles()` | - | Clear all selected files |
| `setErrorMessages(messages)` | `messages`: String or String[] | Set error message(s) to display |

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ files: File[] }` | Fired when files are selected or changed |
| `clear` | - | Fired when files are cleared |

## Examples

### Multiple File Selection

```html
<vc-file-input 
  label="Upload Documents" 
  multiple
  counter>
</vc-file-input>
```

### File Type Restrictions

```html
<vc-file-input 
  label="Upload Images" 
  accept="image/*"
  placeholder="Only image files are allowed">
</vc-file-input>
```

### Chips Mode

```html
<vc-file-input 
  label="Select Files" 
  multiple
  chips>
</vc-file-input>
```

### Different Variants

```html
<!-- Filled (default) -->
<vc-file-input label="Filled Variant" variant="filled"></vc-file-input>

<!-- Outlined -->
<vc-file-input label="Outlined Variant" variant="outlined"></vc-file-input>

<!-- Underlined -->
<vc-file-input label="Underlined Variant" variant="underlined"></vc-file-input>

<!-- Solo -->
<vc-file-input label="Solo Variant" variant="solo"></vc-file-input>

<!-- Plain -->
<vc-file-input label="Plain Variant" variant="plain"></vc-file-input>
```

### Error State

```html
<vc-file-input 
  label="Upload Document" 
  error>
</vc-file-input>
```

With JavaScript:

```javascript
// Get reference to the element
const fileInput = document.querySelector('vc-file-input');

// Set error message
fileInput.setErrorMessages('Please upload a valid file');
```

### JavaScript Interaction

```javascript
// Get reference to the element
const fileInput = document.getElementById('my-file-input');

// Listen for change events
fileInput.addEventListener('change', (e) => {
  const files = e.detail.files;
  console.log('Selected files:', files);
});

// Programmatically clear files
fileInput.clearFiles();

// Change properties dynamically
fileInput.label = 'New Label';
fileInput.disabled = true;
fileInput.variant = 'outlined';
```

## Styling

The component uses Shadow DOM to encapsulate styles. You can customize the appearance using CSS custom properties (in a future update) or by extending the component.

## Browser Support

This component uses standard web components APIs and should work in all modern browsers that support:

- Custom Elements v1
- Shadow DOM v1
- ES2015+ (or use a transpiler like Babel)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License