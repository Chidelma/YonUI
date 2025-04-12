# Material 2 Card Web Component (vc-card)

A lightweight, customizable web component that implements Material Design 2 Card patterns. This component is framework-agnostic and can be used in any web project.

## Features

- Follows Material Design 2 Card specifications
- Supports various card types: basic, media, and action cards
- Configurable elevation levels (1-5) or outlined style
- Customizable with slots for content and actions
- Responsive design
- Framework-agnostic (works with any or no framework)
- No dependencies

## Installation

### Option 1: Download the files directly

1. Download `vc-card.js` from this repository
2. Include it in your HTML file

```html
<script src="path/to/vc-card.js"></script>
```

### Option 2: Via npm (if you're publishing this)

```bash
npm install vc-card
```

Then import it in your JavaScript:

```javascript
import 'vc-card';
```

## Usage

Once the component is included in your project, you can use it in your HTML:

### Basic Card

```html
<vc-card title="Card Title" subtitle="Secondary text" elevation="1">
  <div slot="content">
    This is the content of the card.
  </div>
  <div slot="actions">
    <button>Action</button>
  </div>
</vc-card>
```

### Media Card

```html
<vc-card 
  title="Media Card" 
  subtitle="With top image" 
  image="path/to/image.jpg"
  elevation="2">
  <div slot="content">
    Content with an image.
  </div>
  <div slot="actions">
    <button>Share</button>
    <button>Learn More</button>
  </div>
</vc-card>
```

### Outlined Card

```html
<vc-card title="Outlined Card" subtitle="No elevation" outlined>
  <div slot="content">
    This card uses the outlined style.
  </div>
  <div slot="actions">
    <button>Action</button>
  </div>
</vc-card>
```

## API

### Attributes

| Attribute   | Type      | Default | Description                                       |
|-------------|-----------|---------|---------------------------------------------------|
| `title`     | String    | `''`    | The title of the card                             |
| `subtitle`  | String    | `''`    | The subtitle of the card                          |
| `elevation` | Number    | `1`     | The elevation level (1-5)                         |
| `outlined`  | Boolean   | `false` | Whether to use outlined style (no elevation)      |
| `image`     | String    | `''`    | URL to the image to be displayed at the card top  |

### Slots

| Slot       | Description                                                |
|------------|------------------------------------------------------------|
| `content`  | The main content of the card                               |
| `actions`  | Area for action buttons (typically at the bottom of card)  |

## Styling

You can customize the appearance of the card by targeting the component with CSS variables (coming in a future update) or by using the shadow parts API.

### Example: Customizing the card appearance using CSS

```css
/* To be implemented in future versions */
vc-card {
  --vc-card-border-radius: 8px;
  --vc-card-primary-color: #0066cc;
  --vc-card-background-color: #f9f9f9;
}
```

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Examples

See the `example.html` file for comprehensive examples showcasing various card styles and configurations.

## License

MIT

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request