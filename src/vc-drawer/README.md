# Material 2 Navigation Drawer Web Component

A customizable Material Design 2 navigation drawer implemented as a Web Component. This component provides a sliding drawer that can be used for navigation in web applications, following the Material Design 2 guidelines.

## Features

- Follows Material Design 2 guidelines
- Customizable through attributes
- Responsive design
- Multiple positioning options (left or right)
- Permanent or temporary drawer modes
- Keyboard navigation (ESC to close)
- Custom events for integration
- Shadow DOM encapsulation
- No dependencies

## Installation

1. Download the `vc-drawer.js` file
2. Include it in your HTML file:

```html
<script src="path/to/vc-drawer.js"></script>
```

## Basic Usage

```html
<vc-drawer>
  <div slot="header">
    <div class="drawer-title">App Name</div>
    <div class="drawer-subtitle">user@example.com</div>
  </div>
  
  <a href="#home" class="drawer-item active">
    <span class="drawer-item-icon">🏠</span>
    <span>Home</span>
  </a>
  
  <a href="#profile" class="drawer-item">
    <span class="drawer-item-icon">👤</span>
    <span>Profile</span>
  </a>
</vc-drawer>

<button id="menu-button">Menu</button>

<script>
  const drawer = document.querySelector('vc-drawer');
  const menuButton = document.getElementById('menu-button');
  
  menuButton.addEventListener('click', () => {
    drawer.toggle();
  });
</script>
```

## Attributes

The `<vc-drawer>` component supports the following attributes:

| Attribute  | Description | Default |
|------------|-------------|---------|
| `open`     | Sets the drawer to open state | `false` |
| `permanent` | Makes the drawer permanently visible | `false` |
| `position` | Position of the drawer (`left` or `right`) | `left` |
| `width`    | Width of the drawer | `256px` |
| `overlay`  | Makes the drawer overlay the content instead of pushing it | `false` |

## CSS Custom Properties

You can customize the appearance of the drawer using CSS custom properties:

```css
vc-drawer {
  --drawer-width: 280px;
  --drawer-bg-color: #ffffff;
  --drawer-text-color: rgba(0, 0, 0, 0.87);
  --drawer-secondary-text-color: rgba(0, 0, 0, 0.54);
  --drawer-divider-color: rgba(0, 0, 0, 0.12);
  --drawer-hover-color: rgba(0, 0, 0, 0.04);
  --drawer-active-color: rgba(0, 0, 0, 0.08);
  --drawer-transition-duration: 0.3s;
  --drawer-elevation: 0 8px 10px -5px rgba(0,0,0,0.2), 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12);
}
```

## Methods

The drawer component exposes the following methods:

| Method | Description |
|--------|-------------|
| `open()` | Opens the drawer |
| `close()` | Closes the drawer |
| `toggle()` | Toggles the drawer between open and closed states |

## Events

The drawer component dispatches the following events:

| Event | Description |
|-------|-------------|
| `vc-drawer-connected` | Fired when the drawer is connected to the DOM |
| `vc-drawer-opened` | Fired when the drawer is opened |
| `vc-drawer-closed` | Fired when the drawer is closed |

## Slots

The component provides the following slots:

| Slot | Description |
|------|-------------|
| `header` | Content for the drawer header (usually contains title and subtitle) |
| `(default)` | The main content of the drawer (navigation items) |
| `footer` | Content for the drawer footer |

## CSS Classes for Child Elements

For proper styling, you should use the following CSS classes for child elements:

| Class | Description |
|-------|-------------|
| `drawer-title` | Title element in the header slot |
| `drawer-subtitle` | Subtitle element in the header slot |
| `drawer-item` | Navigation item |
| `drawer-item.active` | Active navigation item |
| `drawer-item-icon` | Icon inside a navigation item |
| `drawer-divider` | Divider between navigation sections |

## Responsive Behavior

To implement responsive behavior, you can toggle the `permanent` attribute based on screen size:

```javascript
window.addEventListener('resize', () => {
  const drawer = document.querySelector('vc-drawer');
  if (window.innerWidth > 1024) {
    drawer.setAttribute('permanent', '');
    drawer.setAttribute('open', '');
  } else {
    drawer.removeAttribute('permanent');
    drawer.close();
  }
});
```

## Browser Support

This component uses modern Web Component standards and should work in all major browsers that support:

- Custom Elements v1
- Shadow DOM v1
- ES6 Classes

## Example

See the `example.html` file for a complete working example.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.