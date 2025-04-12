# Material 2 Timeline Web Component

A lightweight and customizable timeline component inspired by Vuetify v3, built using native Web Components technology. This component provides a material design timeline with various customization options and requires no framework dependencies.

## Features

- 🌈 Multiple timeline alignment options (start, end, center)
- 🔄 Reversible order (newest first or oldest first)
- 🎨 Customizable line color and thickness
- 📏 Dense mode for compact timelines
- 💠 Customizable dots with different sizes, colors, and content
- 🧩 Slot-based content architecture
- 🔌 Framework agnostic - works with vanilla JS or any framework

## Installation

### Option 1: Direct download
Download the `material-timeline.js` file and include it in your project.

```html
<script src="path/to/material-timeline.js"></script>
```

### Option 2: Via CDN (for production use, host on your own CDN)
```html
<script src="https://your-cdn.com/material-timeline.js"></script>
```

### Option 3: npm package (create and publish your own)
```bash
npm install material-timeline-webcomponent
```

Then import in your JavaScript:
```javascript
import 'material-timeline-webcomponent';
```

## Basic Usage

```html
<vc-timeline>
  <vc-timeline-item>
    <div class="your-content">
      <h3>Event Title</h3>
      <p>Event description goes here</p>
    </div>
  </vc-timeline-item>
  
  <vc-timeline-item>
    <div class="your-content">
      <h3>Another Event</h3>
      <p>Another description</p>
    </div>
  </vc-timeline-item>
</vc-timeline>
```

## Props / Attributes

### vc-timeline

| Attribute      | Type    | Default | Description                                   |
|----------------|---------|---------|-----------------------------------------------|
| align          | String  | 'start' | Alignment of content ('start', 'center', 'end') |
| dense          | Boolean | false   | Makes timeline compact                        |
| reverse        | Boolean | false   | Reverses the order of timeline items          |
| side           | String  | 'end'   | Position of timeline line ('start', 'center', 'end') |
| line-thickness | String  | '2px'   | Thickness of timeline line                    |
| line-color     | String  | 'rgba(0, 0, 0, 0.12)' | Color of timeline line        |

### vc-timeline-item

| Attribute | Type    | Default   | Description                                   |
|-----------|---------|-----------|-----------------------------------------------|
| dot-color | String  | 'primary' | Color of the dot (CSS color or predefined: 'primary', 'secondary', 'success', 'info', 'warning', 'error') |
| dot       | String  | ''        | HTML content for the dot                      |
| fill-dot  | Boolean | false     | Whether to fill the dot with the color        |
| hide-dot  | Boolean | false     | Whether to hide the dot                       |
| size      | String  | 'small'   | Size of the dot ('x-small', 'small', 'default', 'large', 'x-large') |

## Slots

### vc-timeline-item

| Slot name | Description                                   |
|-----------|-----------------------------------------------|
| default   | The main content of the timeline item         |
| opposite  | Content to be displayed on the opposite side of the timeline |

## CSS Custom Properties

The component doesn't expose custom properties directly, but you can style elements using CSS selectors or by modifying the component's source code to expose additional custom properties.

## Examples

### Basic Timeline

```html
<vc-timeline>
  <vc-timeline-item dot-color="primary">
    <div class="card">
      <h3>Released Stable Version 1.0</h3>
      <p>Initial stable release with core features implemented.</p>
    </div>
  </vc-timeline-item>
  
  <vc-timeline-item dot-color="success" fill-dot>
    <div class="card">
      <h3>Beta Testing Completed</h3>
      <p>All critical bugs fixed and performance optimized.</p>
    </div>
  </vc-timeline-item>
</vc-timeline>
```

### Dense Timeline with Custom Icons

```html
<vc-timeline dense side="start" line-color="#E91E63" line-thickness="4px">
  <vc-timeline-item dot='<span class="material-icons">code</span>' dot-color="#E91E63" fill-dot>
    <div class="card">
      <h3>Started Development</h3>
      <p>Initial repository setup and architecture planning.</p>
    </div>
  </vc-timeline-item>
  
  <vc-timeline-item dot='<span class="material-icons">design_services</span>' dot-color="#9C27B0" fill-dot>
    <div class="card">
      <h3>UI/UX Design Phase</h3>
      <p>Created wireframes and visual design for the application.</p>
    </div>
  </vc-timeline-item>
</vc-timeline>
```

### Center Aligned with Opposite Content

```html
<vc-timeline side="center" align="center">
  <vc-timeline-item dot-color="error" fill-dot size="large">
    <div slot="opposite" class="date-label">April 10, 2024</div>
    <div class="card">
      <h3>Feature Launch</h3>
      <p>Released new analytics dashboard for all users.</p>
    </div>
  </vc-timeline-item>
  
  <vc-timeline-item dot-color="warning" fill-dot size="large">
    <div slot="opposite" class="date-label">March 22, 2024</div>
    <div class="card">
      <h3>User Testing</h3>
      <p>Conducted A/B testing with focus groups.</p>
    </div>
  </vc-timeline-item>
</vc-timeline>
```

### Reversed Timeline

```html
<vc-timeline reverse line-color="#FF9800">
  <vc-timeline-item dot-color="#FF9800">
    <div class="card">
      <h3>Started Project</h3>
      <p>Initial planning and team assembly.</p>
    </div>
  </vc-timeline-item>
  
  <vc-timeline-item dot-color="#FF9800">
    <div class="card">
      <h3>Development Completed</h3>
      <p>Finished implementing all planned features.</p>
    </div>
  </vc-timeline-item>
</vc-timeline>
```

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers that support the Custom Elements v1 specification:

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, you may need to use polyfills like `@webcomponents/webcomponentsjs`.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request