# Material 2 Top App Bar Web Component

A lightweight, customizable Material Design 2 top app bar implemented as a Web Component.

## Features

- **Follows Material Design 2 Guidelines** - Matches the Material 2 design specification for top app bars
- **Fully Customizable** - Change colors, add actions, customize navigation icons
- **Framework Agnostic** - Works with any framework or no framework at all (vanilla JS)
- **Shadow DOM Encapsulation** - Styles are encapsulated and won't conflict with your application
- **Responsive** - Works on all screen sizes
- **Accessible** - Built with accessibility in mind

## Installation

### Direct Include

```html
<script src="vc-top-app-bar.js"></script>
```

### NPM (if published)

```bash
npm install vc-top-app-bar
```

Then import it in your JavaScript:

```javascript
import 'vc-top-app-bar';
```

## Usage

### Basic Usage

```html
<vc-top-app-bar title="My Application"></vc-top-app-bar>
```

### Attributes

| Attribute  | Type    | Default   | Description                                  |
|------------|---------|-----------|----------------------------------------------|
| `title`    | String  | "App Bar" | The title displayed in the app bar           |
| `color`    | String  | "primary" | Color scheme (primary, secondary, success, danger, warning, info) |
| `elevation`| Boolean | false     | Adds shadow to indicate elevation           |

### Slots

| Slot Name        | Purpose                                      |
|------------------|----------------------------------------------|
| `navigation-icon`| Replaces the default hamburger menu icon     |
| `title-suffix`   | Adds content right after the title           |
| `actions`        | Area for action buttons at the end of the bar |

### Custom Colors

Available color options:
- `primary` (default) - Purple (#6200ee)
- `secondary` - Teal (#03dac6)
- `success` - Green (#4caf50)
- `danger` - Red (#f44336)
- `warning` - Orange (#ff9800)
- `info` - Blue (#2196f3)

```html
<vc-top-app-bar title="Warning" color="warning"></vc-top-app-bar>
```

### Adding Elevation

```html
<vc-top-app-bar title="Elevated App Bar" elevation></vc-top-app-bar>
```

### Adding Action Buttons

```html
<vc-top-app-bar title="App Bar with Actions">
  <div slot="actions">
    <button class="vc-top-app-bar__action-item">
      <!-- SVG icon or content -->
    </button>
    <!-- More action items as needed -->
  </div>
</vc-top-app-bar>
```

### Custom Navigation Icon

```html
<vc-top-app-bar title="Custom Navigation">
  <button slot="navigation-icon" class="vc-top-app-bar__navigation-icon">
    <!-- Your icon here -->
  </button>
</vc-top-app-bar>
```

### Adding Content Next to Title

```html
<vc-top-app-bar title="Inbox">
  <span slot="title-suffix" style="margin-left: 8px;">23 unread</span>
</vc-top-app-bar>
```

## Events

The component emits the following events:

| Event Name        | Detail                                        | Description                      |
|-------------------|-----------------------------------------------|----------------------------------|
| `navigation-click`| `{ originalEvent: MouseEvent }`               | When navigation icon is clicked  |
| `action-click`    | `{ index: Number, originalEvent: MouseEvent }`| When an action item is clicked   |

### Event Handling Example

```javascript
const appBar = document.querySelector('vc-top-app-bar');

appBar.addEventListener('navigation-click', (event) => {
  console.log('Navigation clicked!', event.detail);
  // Toggle sidebar or perform navigation action
});

appBar.addEventListener('action-click', (event) => {
  console.log('Action clicked!', event.detail.index);
  // Handle action based on index
  switch(event.detail.index) {
    case 0:
      console.log('First action clicked');
      break;
    case 1:
      console.log('Second action clicked');
      break;
    // etc.
  }
});
```

## Styling

You can customize the component using CSS Custom Properties:

```css
vc-top-app-bar {
  --vc-top-app-bar-color: #9c27b0; /* Override the background color */
}
```

## Browser Support

This component uses standard web technologies and should work in all modern browsers that support Web Components (Custom Elements v1 and Shadow DOM v1):

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.