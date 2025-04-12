# Material 2 Menu Web Component

A custom web component implementation of Material Design 2 menus that follows the Material Design guidelines. This component provides a simple, accessible, and customizable menu system that can be used in any web application.

## Features

- 🎯 Simple API that matches Material Design 2 patterns
- 🧩 Built as a Web Component for framework-agnostic usage
- 📱 Fully responsive with proper positioning
- ⌨️ Keyboard navigation support
- 🔄 Event-based API for easy integration
- 📐 Multiple positioning options (top-start, top-end, bottom-start, bottom-end)
- 🎨 Material Design styling with proper animations
- 🧰 Support for icons, dividers, and disabled items

## Installation

Simply include the `vc-menu.js` file in your project:

```html
<script src="path/to/vc-menu.js"></script>
```

## Basic Usage

```html
<!-- Define a trigger button -->
<button id="my-menu-trigger">Open Menu</button>

<!-- Define the menu -->
<vc-menu id="my-menu" position="bottom-start">
  <button value="refresh">Refresh</button>
  <button value="settings">Settings</button>
  <hr class="divider">
  <button value="logout">Logout</button>
</vc-menu>

<script>
  // Set up the trigger
  const menuTrigger = document.getElementById('my-menu-trigger');
  const menu = document.getElementById('my-menu');
  
  // Connect trigger to menu
  menu.setTrigger(menuTrigger);
  
  // Listen for selection events
  menu.addEventListener('menu-select', (e) => {
    console.log('Selected:', e.detail.value);
  });
</script>
```

## API Reference

### Properties & Attributes

| Property/Attribute | Type | Default | Description |
|--------------------|------|---------|-------------|
| `position` | String | `bottom-start` | Position of the menu relative to its trigger element. Options: `top-start`, `top-end`, `bottom-start`, `bottom-end` |
| `open` | Boolean | `false` | Whether the menu is currently open |

### Methods

| Method | Description |
|--------|-------------|
| `setTrigger(element)` | Sets the trigger element for the menu |
| `open()` | Opens the menu |
| `close()` | Closes the menu |
| `toggle()` | Toggles the menu's open state |
| `setPosition(position)` | Updates the position of the menu |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `menu-select` | `{ value: string }` | Fired when a menu item is selected |

## Menu Items

The menu items can be defined in several ways:

### Basic Buttons

```html
<vc-menu id="my-menu">
  <button value="option1">Option 1</button>
  <button value="option2">Option 2</button>
</vc-menu>
```

### Items with Icons

```html
<vc-menu id="my-menu">
  <button value="edit">
    <span class="material-icons">edit</span>Edit
  </button>
  <button value="delete">
    <span class="material-icons">delete</span>Delete
  </button>
</vc-menu>
```

### Disabled Items

```html
<vc-menu id="my-menu">
  <button value="enabled">Enabled Option</button>
  <button value="disabled" disabled>Disabled Option</button>
</vc-menu>
```

### Dividers

```html
<vc-menu id="my-menu">
  <button value="option1">Option 1</button>
  <hr class="divider">
  <button value="option2">Option 2</button>
</vc-menu>
```

## Positioning

You can set the position of the menu relative to its trigger element:

```html
<vc-menu id="my-menu" position="top-end">
  <!-- Menu items -->
</vc-menu>
```

Available positions:
- `top-start`: Menu opens above the trigger, aligned to the left
- `top-end`: Menu opens above the trigger, aligned to the right
- `bottom-start`: Menu opens below the trigger, aligned to the left (default)
- `bottom-end`: Menu opens below the trigger, aligned to the right

## Styling

The component comes with default Material Design 2 styling. You can override the styles by targeting the component in your CSS:

```css
vc-menu {
  /* Your custom styles */
}

/* Target parts using ::part() selector */
vc-menu::part(container) {
  /* Custom container styles */
}
```

## Accessibility

The menu component follows accessibility best practices:
- Uses appropriate ARIA roles (`menu` and `menuitem`)
- Supports keyboard navigation (arrow keys, Enter, Escape)
- Automatically focuses the first menu item when opened
- Properly manages focus trapping within the menu

## Browser Support

This component works in all modern browsers that support Web Components:
- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## License

MIT License