# Material Design 2 Dialog Web Component

A lightweight, customizable dialog component built with Web Components technology that follows Material Design 2 principles.

## Features

- Pure vanilla JavaScript with no dependencies
- Follows Material Design 2 visual guidelines
- Customizable through CSS variables
- Responsive design
- Keyboard accessibility (ESC to close)
- Support for modal dialogs
- Simple API

## Installation

### Option 1: Download the files directly

1. Download `vc-dialog.js` 
2. Include it in your HTML:

```html
<script src="path/to/vc-dialog.js"></script>
```

### Option 2: Using npm

```bash
npm install vc-dialog
```

And import it in your JavaScript:

```javascript
import 'vc-dialog';
```

## Basic Usage

```html
<!-- Add the dialog component to your HTML -->
<vc-dialog id="myDialog">
  <span slot="title">Dialog Title</span>
  <p>This is the dialog content.</p>
  <div slot="actions">
    <button id="cancelBtn">Cancel</button>
    <button id="confirmBtn" data-primary>Confirm</button>
  </div>
</vc-dialog>

<!-- Add JavaScript to control the dialog -->
<script>
  const dialog = document.getElementById('myDialog');
  
  // Open the dialog
  dialog.open();
  
  // Close the dialog
  document.getElementById('cancelBtn').addEventListener('click', () => {
    dialog.close();
  });
  
  document.getElementById('confirmBtn').addEventListener('click', () => {
    // Do something when confirmed
    console.log('Action confirmed!');
    dialog.close();
  });
</script>
```

## API

### HTML Attributes

| Attribute | Description |
|-----------|-------------|
| `open`    | When present, the dialog is visible |
| `modal`   | When present, the dialog cannot be closed by clicking outside or pressing ESC |

### Slots

| Slot Name | Description |
|-----------|-------------|
| `title`   | The dialog title |
| (default) | The dialog content |
| `actions` | The dialog action buttons |

### Methods

| Method  | Description |
|---------|-------------|
| `open()`| Opens the dialog |
| `close()`| Closes the dialog |

### Events

| Event Name | Description |
|------------|-------------|
| `vc-dialog-open` | Fired when the dialog is opened |
| `vc-dialog-close` | Fired when the dialog is closed |

### CSS Custom Properties

You can customize the appearance of the dialog by setting these CSS variables:

```css
vc-dialog {
  --vc-dialog-width: 280px;
  --vc-dialog-max-width: 80vw;
  --vc-dialog-max-height: 80vh;
  --vc-dialog-border-radius: 4px;
  --vc-dialog-bg-color: #ffffff;
  --vc-dialog-text-color: rgba(0, 0, 0, 0.87);
  --vc-dialog-secondary-text-color: rgba(0, 0, 0, 0.6);
  --vc-dialog-divider-color: rgba(0, 0, 0, 0.12);
  --vc-dialog-scrim-color: rgba(0, 0, 0, 0.32);
  --vc-dialog-elevation: /* Your custom box-shadow */;
  --vc-dialog-title-font-size: 20px;
  --vc-dialog-content-font-size: 16px;
}
```

## Examples

### Simple Dialog

```html
<vc-dialog id="simpleDialog">
  <span slot="title">Simple Dialog</span>
  <p>This is a basic dialog with a single action button.</p>
  <button slot="actions" id="closeSimpleDialog">Close</button>
</vc-dialog>

<script>
  const simpleDialog = document.getElementById('simpleDialog');
  
  // Open dialog
  simpleDialog.open();
  
  // Close dialog when button is clicked
  document.getElementById('closeSimpleDialog').addEventListener('click', () => {
    simpleDialog.close();
  });
</script>
```

### Confirmation Dialog

```html
<vc-dialog id="confirmDialog">
  <span slot="title">Confirm Action</span>
  <p>Are you sure you want to perform this action? This cannot be undone.</p>
  <div slot="actions">
    <button id="cancelConfirmDialog">Cancel</button>
    <button id="confirmAction" data-primary>Confirm</button>
  </div>
</vc-dialog>

<script>
  const confirmDialog = document.getElementById('confirmDialog');
  
  // Open dialog
  confirmDialog.open();
  
  // Cancel button
  document.getElementById('cancelConfirmDialog').addEventListener('click', () => {
    confirmDialog.close();
  });
  
  // Confirm button
  document.getElementById('confirmAction').addEventListener('click', () => {
    // Do something when confirmed
    console.log('Action confirmed!');
    confirmDialog.close();
  });
</script>
```

### Modal Dialog

```html
<vc-dialog id="customDialog" modal>
  <span slot="title">Modal Dialog</span>
  <p>This is a modal dialog that can only be closed by clicking a button.</p>
  <div slot="actions">
    <button id="closeModalDialog" data-primary>Understood</button>
  </div>
</vc-dialog>

<script>
  const customDialog = document.getElementById('customDialog');
  
  // Open dialog
  customDialog.open();
  
  // Close button
  document.getElementById('closeModalDialog').addEventListener('click', () => {
    customDialog.close();
  });
</script>
```

## Event Handling

```javascript
// Listen for dialog events
document.querySelectorAll('vc-dialog').forEach(dialog => {
  dialog.addEventListener('vc-dialog-open', (e) => {
    console.log('Dialog opened:', e.target.id);
  });
  
  dialog.addEventListener('vc-dialog-close', (e) => {
    console.log('Dialog closed:', e.target.id);
  });
});
```

## Browser Support

This component works in all browsers that support [Web Components](https://caniuse.com/custom-elementsv1):
- Chrome
- Firefox
- Edge
- Safari
- Opera

For older browsers, you may need to use polyfills for Web Components.

## License

MIT