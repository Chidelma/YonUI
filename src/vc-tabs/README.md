# Material 2 Tabs Web Component

A lightweight, customizable implementation of Material Design 2 style tabs using Web Components technology.

## Features

- Pure vanilla JavaScript implementation with no dependencies
- Follows Material Design 2 specifications for tabs
- Includes ripple effect on tab selection
- Responsive design with horizontal scrolling for overflow tabs
- Supports programmatic tab selection
- Custom events for detecting tab changes
- Shadow DOM encapsulation for style isolation

## Installation

Simply include the `vc-tabs.js` file in your project:

```html
<script src="path/to/vc-tabs.js"></script>
```

## Basic Usage

```html
<vc-tabs>
  <!-- Tab Headers -->
  <vc-tab slot="tab">TAB 1</vc-tab>
  <vc-tab slot="tab">TAB 2</vc-tab>
  <vc-tab slot="tab">TAB 3</vc-tab>
  
  <!-- Tab Contents -->
  <div slot="content">Content for Tab 1</div>
  <div slot="content">Content for Tab 2</div>
  <div slot="content">Content for Tab 3</div>
</vc-tabs>
```

## API Reference

### `<vc-tabs>` Component

The container component that manages the tab system.

#### Properties and Methods

- `selectTab(index)`: Programmatically select a tab by its index (zero-based)

#### Events

- `tabs-changed`: Fired when a tab is selected
  - Event detail:
    - `selectedIndex`: The index of the selected tab
    - `selectedTab`: Reference to the selected tab element

#### Example event usage:

```javascript
document.querySelector('vc-tabs').addEventListener('tabs-changed', (e) => {
  console.log('Selected tab index:', e.detail.selectedIndex);
});
```

### `<vc-tab>` Component

Individual tab items that are placed within the `<vc-tabs>` container.

#### Attributes

- `active`: Boolean attribute that indicates if the tab is currently selected

#### Events

- `tab-selected`: Fired when this tab is selected

## Styling Customization

The components use Shadow DOM for style encapsulation, but you can customize the appearance using CSS variables in a future version.

For now, if you need to customize the styles, you can modify the component's internal CSS directly in the `vc-tabs.js` file.

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers including:

- Chrome/Edge (version 67+)
- Firefox (version 63+)
- Safari (version 10.1+)
- Opera (version 41+)

For older browsers, you may need to include the Web Components polyfill.

## Examples

See the included `example.html` file for a complete demonstration of the component's capabilities.

## Advanced Usage Examples

### Pre-selecting a tab

```html
<vc-tabs>
  <vc-tab slot="tab">TAB 1</vc-tab>
  <vc-tab slot="tab" active>TAB 2</vc-tab> <!-- This tab will be active by default -->
  <vc-tab slot="tab">TAB 3</vc-tab>
  
  <div slot="content">Content for Tab 1</div>
  <div slot="content">Content for Tab 2</div>
  <div slot="content">Content for Tab 3</div>
</vc-tabs>
```

### Programmatically controlling tabs

```javascript
// Get the tabs component
const tabs = document.querySelector('vc-tabs');

// Select the third tab (index 2)
tabs.selectTab(2);

// Listen for tab changes
tabs.addEventListener('tabs-changed', (e) => {
  console.log('Active tab changed to index:', e.detail.selectedIndex);
});
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.