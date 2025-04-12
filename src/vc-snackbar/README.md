# vc-snackbar

A Material Design 2 Snackbar implementation using Web Components.

## Features

- Lightweight and framework-agnostic
- Material Design 2 styling
- Customizable positioning (bottom, top, bottom-center, top-center)
- Configurable display duration
- Optional action button with custom handler
- Custom events for tracking snackbar state
- No dependencies

## Installation

Simply include the `vc-snackbar.js` file in your project:

```html
<script src="path/to/vc-snackbar.js"></script>
```

Or use a module bundler:

```javascript
import 'path/to/vc-snackbar.js';
```

## Basic Usage

Add the snackbar component to your HTML:

```html
<vc-snackbar id="snackbar"></vc-snackbar>
```

Then use JavaScript to control it:

```javascript
const snackbar = document.getElementById('snackbar');

// Set properties
snackbar.message = 'Your message here';
snackbar.action = 'UNDO';
snackbar.duration = 5000;
snackbar.position = 'bottom';

// Set action handler
snackbar.setActionHandler(() => {
  console.log('Action clicked!');
});

// Show the snackbar
snackbar.open();

// Manually close it if needed
// snackbar.close();
```

## API

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `message` | String | `''` | The message text to display |
| `action` | String | `''` | The action button text (empty for no button) |
| `duration` | Number | `5000` | Duration in milliseconds before auto-close (use `-1` to disable auto-close) |
| `position` | String | `'bottom'` | Position of the snackbar (`'bottom'`, `'top'`, `'bottom-center'`, `'top-center'`) |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `open()` | None | Shows the snackbar |
| `close()` | None | Hides the snackbar |
| `setActionHandler(handler)` | `handler`: Function | Sets the function to call when the action button is clicked |

### Events

| Event Name | Description |
|------------|-------------|
| `vc-snackbar-open` | Fired when the snackbar is opened |
| `vc-snackbar-close` | Fired when the snackbar is closed |
| `vc-snackbar-action` | Fired when the action button is clicked |

## Example

See `usage-example.html` for a complete demo.

## Attributes

You can also use HTML attributes to configure the snackbar:

```html
<vc-snackbar 
  message="File deleted" 
  action="UNDO" 
  duration="7000" 
  position="bottom"
  open
></vc-snackbar>
```

## Browser Support

This component uses modern Web Component APIs and works in all major browsers that support Custom Elements v1.

## License

MIT