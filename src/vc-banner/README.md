# Material 2 Banner Web Component

This is a lightweight, framework-agnostic Material Design 2 Banner component built with Web Components.

## Features

- 🎨 Four different banner types: info, warning, error, success
- 🔄 Customizable actions with primary/secondary styling
- ✖️ Optional dismiss button
- 🔔 Event handling for actions and dismissal
- 🖌️ Consistent Material Design 2 styling
- 📱 Responsive design
- 🧩 Zero dependencies - pure vanilla JS

## Installation

### Option 1: Include directly

```html
<script src="vc-banner.js"></script>
```

### Option 2: npm (if published)

```bash
npm install vc-banner
```

Then import in your JavaScript:

```javascript
import 'vc-banner';
```

## Usage

Basic banner:

```html
<vc-banner 
  type="info" 
  message="This is an informational banner">
</vc-banner>
```

Banner with actions:

```html
<vc-banner 
  type="warning" 
  message="Your session is about to expire" 
  actions='[{"label":"Extend Session","action":"extend","primary":true}, {"label":"Logout","action":"logout"}]'>
</vc-banner>
```

Dismissible banner:

```html
<vc-banner 
  type="error" 
  message="There was a problem processing your request" 
  dismissible>
</vc-banner>
```

## API Reference

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `type` | String | `'info'` | Banner type: `'info'`, `'warning'`, `'error'`, or `'success'` |
| `message` | String | `''` | The main text message to display |
| `dismissible` | Boolean | `false` | Whether the banner can be dismissed |
| `actions` | JSON String | `[]` | Array of action objects (see below) |
| `visible` | Boolean | `true` | Whether the banner is displayed |
| `icon` | String | `null` | Custom Material Icon name (defaults based on type) |

### Action Object Properties

```javascript
{
  "label": "Button Text",   // Required: Text to display on the button
  "action": "actionName",   // Required: Identifier for the action
  "primary": true           // Optional: Style as primary button (default: false)
}
```

### Methods

| Method | Description |
|--------|-------------|
| `dismiss()` | Programmatically dismiss the banner |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `dismiss` | None | Fired when the banner is dismissed |
| `action` | `{ action: 'actionName' }` | Fired when an action button is clicked |

## JavaScript API

The component can also be manipulated through JavaScript:

```javascript
// Get a reference to the banner
const banner = document.querySelector('vc-banner');

// Change properties
banner.type = 'success';
banner.message = 'Operation completed successfully';
banner.dismissible = true;
banner.actions = [
  { label: 'View Details', action: 'view', primary: true },
  { label: 'Dismiss', action: 'dismiss' }
];

// Listen for events
banner.addEventListener('action', (e) => {
  console.log('Action clicked:', e.detail.action);
});

banner.addEventListener('dismiss', () => {
  console.log('Banner dismissed');
});

// Programmatically dismiss
banner.dismiss();
```

## Styling

The component uses Shadow DOM for encapsulation but respects your application's font.

## Browser Support

This component works in all browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

For older browsers, you may need to include the Web Components polyfill.

## License

MIT

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.