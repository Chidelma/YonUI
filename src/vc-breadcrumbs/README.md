# Material Breadcrumbs Web Component

A Material Design 2 Breadcrumbs web component inspired by Vuetify v3, implemented using standard Web Component technology.

## Features

- Lightweight with zero dependencies
- CSS customized for Material Design 2 style
- Follows accessibility best practices
- Custom divider support
- Dark theme support
- Disabled items
- Active state management
- Semantic HTML structure
- Support for dynamic updates

## Installation

Simply include the JavaScript file in your project:

```html
<script src="material-breadcrumbs.js"></script>
```

## Basic Usage

```html
<vc-breadcrumbs>
  <vc-breadcrumb-item href="/">Home</vc-breadcrumb-item>
  <vc-breadcrumb-item href="/products">Products</vc-breadcrumb-item>
  <vc-breadcrumb-item>Electronics</vc-breadcrumb-item>
</vc-breadcrumbs>
```

## API Reference

### `<vc-breadcrumbs>` Component

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `divider` | String | `/` | The divider character shown between breadcrumb items |
| `dark` | Boolean | `false` | Enables dark theme styling |

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `divider` | String | Gets or sets the divider character |

### `<vc-breadcrumb-item>` Component

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `href` | String | - | The URL the breadcrumb links to |
| `disabled` | Boolean | `false` | Disables the breadcrumb item |
| `active` | Boolean | `false` | Manually mark an item as active (otherwise last item is automatically active) |

## Examples

### Custom Divider

```html
<vc-breadcrumbs divider=">">
  <vc-breadcrumb-item href="/">Home</vc-breadcrumb-item>
  <vc-breadcrumb-item href="/blog">Blog</vc-breadcrumb-item>
  <vc-breadcrumb-item>How to Use Web Components</vc-breadcrumb-item>
</vc-breadcrumbs>
```

### With Disabled Item

```html
<vc-breadcrumbs>
  <vc-breadcrumb-item href="/">Home</vc-breadcrumb-item>
  <vc-breadcrumb-item disabled>Categories</vc-breadcrumb-item>
  <vc-breadcrumb-item href="/products/tech">Technology</vc-breadcrumb-item>
  <vc-breadcrumb-item>Smartphones</vc-breadcrumb-item>
</vc-breadcrumbs>
```

### Dark Theme

```html
<div class="dark-theme">
  <vc-breadcrumbs dark>
    <vc-breadcrumb-item href="/">Home</vc-breadcrumb-item>
    <vc-breadcrumb-item href="/account">Account</vc-breadcrumb-item>
    <vc-breadcrumb-item>Settings</vc-breadcrumb-item>
  </vc-breadcrumbs>
</div>
```

### Manual Active State

```html
<vc-breadcrumbs>
  <vc-breadcrumb-item href="/">Home</vc-breadcrumb-item>
  <vc-breadcrumb-item href="/dashboard">Dashboard</vc-breadcrumb-item>
  <vc-breadcrumb-item href="/dashboard/reports" active>Reports</vc-breadcrumb-item>
  <vc-breadcrumb-item>Annual Summary</vc-breadcrumb-item>
</vc-breadcrumbs>
```

## Accessibility

This component follows accessibility best practices:
- Uses proper semantic HTML with `<nav>`, `<ol>`, and `<li>` elements
- Includes appropriate ARIA attributes (`aria-label`, `aria-current`, `aria-hidden`)
- Maintains sufficient color contrast in both light and dark themes
- Supports keyboard navigation

## Browser Support

This component uses standard Web Component APIs and should work in all modern browsers including:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT