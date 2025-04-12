# Material Design 2 Progress Indicator

A customizable Material Design 2 progress indicator built as a Web Component. This component provides both determinate and indeterminate progress indicators that follow the Material Design 2 guidelines.

## Features

- **Lightweight** - No dependencies, just vanilla JavaScript
- **Customizable** - Easy to change colors, size, and behavior
- **Responsive** - Adapts to container width
- **Accessible** - Built with web accessibility in mind
- **Easy to use** - Simple API with both attribute and property access

## Installation

Simply include the JavaScript file in your project:

```html
<script src="vc-progress-indicator.js"></script>
```

## Usage

### Basic Usage

```html
<!-- Determinate progress indicator (default) -->
<vc-progress-indicator value="30" max="100"></vc-progress-indicator>

<!-- Indeterminate progress indicator -->
<vc-progress-indicator indeterminate></vc-progress-indicator>
```

### Customizing Colors

```html
<!-- Custom colors -->
<vc-progress-indicator 
  value="60" 
  color="#e91e63" 
  track-color="#ffcdd2">
</vc-progress-indicator>
```

### JavaScript API

You can also create and manipulate the progress indicator using JavaScript:

```javascript
// Create a new progress indicator
const progressIndicator = document.createElement('vc-progress-indicator');
progressIndicator.value = 40;
progressIndicator.style.setProperty('--progress-height', '6px'); // Custom height
document.body.appendChild(progressIndicator);

// Update the value
progressIndicator.value = 75;

// Toggle indeterminate state
progressIndicator.indeterminate = true;
```

## API Reference

### Attributes

| Attribute      | Type      | Default   | Description                                 |
|----------------|-----------|-----------|---------------------------------------------|
| `value`        | Number    | `0`       | Current progress value                      |
| `max`          | Number    | `100`     | Maximum value (100% progress)               |
| `indeterminate`| Boolean   | `false`   | Whether to show indeterminate animation     |
| `color`        | String    | `#6200ee` | Color of the progress bar                   |
| `track-color`  | String    | `#e0e0e0` | Color of the track background               |

### CSS Custom Properties

| Property           | Default   | Description                     |
|--------------------|-----------|----------------------------------|
| `--progress-height`| `4px`     | Height of the progress indicator |
| `--progress-color` | `#6200ee` | Color of the progress bar        |
| `--track-color`    | `#e0e0e0` | Color of the track background    |

### JavaScript Properties and Methods

| Property/Method   | Type      | Description                                           |
|-------------------|-----------|-------------------------------------------------------|
| `value`           | Number    | Get or set the current progress value                 |
| `max`             | Number    | Get or set the maximum value                          |
| `indeterminate`   | Boolean   | Get or set whether progress is indeterminate          |
| `updateProgress()`| Method    | Manually update the progress (called automatically)   |

## Browser Support

This component uses standard Web Components APIs and should work in all modern browsers:

- Chrome
- Firefox
- Safari
- Edge

## Example

See [example.html](example.html) for a complete demonstration of all features.

## License

MIT