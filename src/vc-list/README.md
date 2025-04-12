# Material 2 Lists Web Component (`vc-list`)

A lightweight, customizable implementation of Material Design 2 Lists using native Web Components technology.

## Features

- Pure vanilla JavaScript - no dependencies required
- Follows Material Design 2 styling guidelines
- Supports single-line and two-line list items
- Avatar support for list items
- Interactive lists with click events
- Dense mode for compact layouts
- Divider support between list items
- Customizable through attributes and slots
- Fully encapsulated with Shadow DOM

## Installation

Simply include the `vc-list.js` file in your project:

```html
<script src="path/to/vc-list.js"></script>
```

## Basic Usage

```html
<vc-list>
  <vc-list-item>
    <span slot="primary">List item 1</span>
  </vc-list-item>
  <vc-list-item>
    <span slot="primary">List item 2</span>
  </vc-list-item>
  <vc-list-item>
    <span slot="primary">List item 3</span>
  </vc-list-item>
</vc-list>
```

## List Attributes

The `<vc-list>` component supports the following attributes:

| Attribute    | Type    | Default | Description                                  |
|--------------|---------|---------|----------------------------------------------|
| `two-line`   | Boolean | false   | Enable two-line list items                   |
| `avatar`     | Boolean | false   | Enable avatar display in list items          |
| `interactive`| Boolean | false   | Make list items interactive (clickable)      |
| `dense`      | Boolean | false   | Use a more compact list layout               |
| `dividers`   | Boolean | false   | Show dividers between list items             |

## List Item Attributes

The `<vc-list-item>` component supports:

| Attribute    | Type    | Default | Description                          |
|--------------|---------|---------|--------------------------------------|
| `selected`   | Boolean | false   | Mark the list item as selected       |

## Slots

### vc-list-item slots:

| Slot Name    | Description                                          |
|--------------|------------------------------------------------------|
| `primary`    | Primary text content (required)                      |
| `secondary`  | Secondary text content (visible when `two-line` is enabled) |
| `avatar`     | Avatar content (visible when `avatar` is enabled)    |
| `meta`       | Metadata content (displayed at the end of the item)  |

## Events

| Event Name         | Description                             | Event Detail                      |
|--------------------|-----------------------------------------|-----------------------------------|
| `vc-list-item-click` | Fired when a list item is clicked (when `interactive` is enabled) | `{ item, index }` |

## Examples

### Single-line List

```html
<vc-list>
  <vc-list-item>
    <span slot="primary">List item 1</span>
  </vc-list-item>
  <vc-list-item>
    <span slot="primary">List item 2</span>
  </vc-list-item>
</vc-list>
```

### Two-line List

```html
<vc-list two-line>
  <vc-list-item>
    <span slot="primary">List item with secondary text</span>
    <span slot="secondary">Secondary text</span>
  </vc-list-item>
  <vc-list-item>
    <span slot="primary">Another list item</span>
    <span slot="secondary">More secondary text</span>
  </vc-list-item>
</vc-list>
```

### List with Avatars

```html
<vc-list avatar>
  <vc-list-item>
    <div slot="avatar" class="avatar">A</div>
    <span slot="primary">Alice Johnson</span>
  </vc-list-item>
  <vc-list-item>
    <div slot="avatar" class="avatar">B</div>
    <span slot="primary">Bob Smith</span>
  </vc-list-item>
</vc-list>
```

### Interactive List with Event Handling

```html
<vc-list interactive>
  <vc-list-item>
    <span slot="primary">Clickable item 1</span>
  </vc-list-item>
  <vc-list-item>
    <span slot="primary">Clickable item 2</span>
  </vc-list-item>
</vc-list>

<script>
  document.addEventListener('vc-list-item-click', (event) => {
    console.log('List item clicked:', event.detail);
    
    // Select the clicked item
    const item = event.detail.item;
    item.setAttribute('selected', '');
  });
</script>
```

### Dense List with Dividers and Metadata

```html
<vc-list dense dividers>
  <vc-list-item>
    <span slot="primary">Inbox</span>
    <span slot="meta" class="material-icons">mail</span>
  </vc-list-item>
  <vc-list-item>
    <span slot="primary">Starred</span>
    <span slot="meta" class="material-icons">star</span>
  </vc-list-item>
</vc-list>
```

## Styling

The component uses Shadow DOM, so styling should be done using CSS custom properties (upcoming in future versions) or by creating custom styles for the elements that are placed in slots.

## Browser Support

This component uses modern Web Component features including Custom Elements and Shadow DOM. It should work in all modern browsers that support these features.

## License

MIT