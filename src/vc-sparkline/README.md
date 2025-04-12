# Material 2 Sparklines Web Component

A lightweight, customizable sparkline web component inspired by Vuetify v3's sparkline component. This component uses modern Web Component technology to create reusable, framework-agnostic sparklines for your web applications.

## Features

- **Multiple chart types**: Trend lines, bar charts, and area charts
- **Customizable styles**: Colors, gradients, line thickness, and more
- **Smooth curves**: Optional bezier curve smoothing
- **Auto-drawing animation**: Animated line drawing effect
- **Labels**: Optional data point labels
- **Responsive**: Automatically adjusts to container size
- **Framework-agnostic**: Works with any framework or vanilla JavaScript
- **No dependencies**: Zero external dependencies

## Installation

Simply include the `vc-sparkline.js` file in your project:

```html
<script src="path/to/vc-sparkline.js"></script>
```

## Basic Usage

```html
<vc-sparkline value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]"></vc-sparkline>
```

## Examples

### Trend Line (Default)

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  color="primary"
  height="100"
  line-width="2"
></vc-sparkline>
```

### Smooth Line

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  color="info"
  smooth="true"
  height="100"
></vc-sparkline>
```

### Bar Chart

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  color="success"
  type="bar"
  height="100"
></vc-sparkline>
```

### Area Chart

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  color="warning"
  fill="true"
  type="area"
  height="100"
></vc-sparkline>
```

### With Labels

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  labels='["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]'
  color="error"
  show-labels="true"
  height="120"
></vc-sparkline>
```

### With Gradient

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  gradient='["#E040FB", "#00BCD4"]'
  gradient-direction="right"
  fill="true"
  smooth="true"
  height="100"
></vc-sparkline>
```

### Auto Draw Animation

```html
<vc-sparkline
  value='[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]'
  color="#673AB7"
  auto-draw="true"
  auto-draw-duration="1500"
  smooth="true"
  height="100"
></vc-sparkline>
```

### Dynamic Data

```html
<vc-sparkline
  id="dynamicSparkline"
  value='[5, 5, 5, 5, 5, 5, 5, 5, 5, 5]'
  color="#2196F3"
  smooth="true"
  fill="true"
  fill-opacity="0.3"
  height="100"
></vc-sparkline>

<script>
  const sparkline = document.getElementById('dynamicSparkline');
  const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
  sparkline.setAttribute('value', JSON.stringify(newData));
  
  // Alternatively, you can set the value property directly
  sparkline.value = newData;
</script>
```

## API Reference

### Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `autoDraw` | `auto-draw` | Boolean | `true` | Enables the auto-drawing animation |
| `autoDrawDuration` | `auto-draw-duration` | Number | `2000` | Duration of the auto-drawing animation in milliseconds |
| `autoDrawEasing` | `auto-draw-easing` | String | `'ease'` | Easing function for the auto-drawing animation |
| `color` | `color` | String | `'primary'` | Color of the sparkline. Can be a named color (primary, secondary, success, info, warning, error) or any valid CSS color |
| `gradient` | `gradient` | Array | `null` | Array of colors for gradient. Example: `["#E040FB", "#00BCD4"]` |
| `gradientDirection` | `gradient-direction` | String | `'top'` | Direction of gradient. Options: `'top'`, `'right'`, `'bottom'`, `'left'` |
| `height` | `height` | Number | `75` | Height of the sparkline in pixels |
| `labels` | `labels` | Array | `[]` | Array of labels for data points. If not provided, values will be used as labels |
| `lineWidth` | `line-width` | Number | `2` | Width of the sparkline in pixels |
| `padding` | `padding` | Number | `8` | Padding around the sparkline in pixels |
| `showLabels` | `show-labels` | Boolean | `false` | Whether to show labels above data points |
| `smooth` | `smooth` | Boolean | `false` | Whether to smooth the line using bezier curves |
| `type` | `type` | String | `'trend'` | Type of sparkline. Options: `'trend'`, `'bar'`, `'area'` |
| `value` | `value` | Array | `[]` | Array of numeric values for the sparkline |
| `fill` | `fill` | Boolean | `false` | Whether to fill the area under the sparkline |
| `fillColor` | `fill-color` | String | `undefined` | Color for the fill. If not provided, the line color will be used |
| `fillOpacity` | `fill-opacity` | Number | `0.2` | Opacity of the fill |

### Methods

| Method | Description |
|--------|-------------|
| `value` | Getter/setter for the value property. Can be used to programmatically update the sparkline data. |

### Events

The component doesn't emit any custom events, but you can listen to standard DOM events like `click` on the component.

## Styling

The component uses shadow DOM to encapsulate its styles, so it won't be affected by global CSS. However, you can adjust the appearance using the provided properties.

For predefined colors, the following are available:
- `primary`: #1976D2
- `secondary`: #424242
- `success`: #4CAF50
- `info`: #2196F3
- `warning`: #FFC107
- `error`: #FF5252

## Advanced Usage

### Programmatic Updates

You can programmatically update the sparkline data:

```javascript
const sparkline = document.querySelector('vc-sparkline');

// Using the value property
sparkline.value = [1, 5, 2, 7, 4, 3];

// Or using setAttribute
sparkline.setAttribute('value', JSON.stringify([1, 5, 2, 7, 4, 3]));
```

### Custom Styling with CSS Variables

While the component handles most styling internally, you can wrap it in a container and style that:

```html
<div class="sparkline-container">
  <vc-sparkline value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]"></vc-sparkline>
</div>

<style>
  .sparkline-container {
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>
```

## Browser Support

This component uses modern Web Component APIs and should work in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Integration with Frameworks

### Vue

```vue
<template>
  <div>
    <vc-sparkline :value="chartData"></vc-sparkline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: [0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5]
    }
  },
  mounted() {
    // Make sure to load the component script
    if (!customElements.get('vc-sparkline')) {
      const script = document.createElement('script');
      script.src = '/path/to/vc-sparkline.js';
      document.head.appendChild(script);
    }
  }
}
</script>
```

### React

```jsx
import React, { useEffect, useRef } from 'react';

// Make sure to import the component
import './path/to/vc-sparkline.js';

function SparklineExample() {
  const sparklineRef = useRef(null);
  const data = [0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5];

  useEffect(() => {
    if (sparklineRef.current) {
      // React stringifies the array automatically
      sparklineRef.current.setAttribute('value', JSON.stringify(data));
    }
  }, [data]);

  return (
    <vc-sparkline 
      ref={sparklineRef}
      color="primary"
      smooth="true"
      height="100"
    ></vc-sparkline>
  );
}

export default SparklineExample;
```

### Angular

```typescript
// In your component
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sparkline-example',
  template: `
    <vc-sparkline #sparkline
      [attr.color]="'primary'"
      [attr.smooth]="'true'"
      [attr.height]="'100'"
    ></vc-sparkline>
  `,
})
export class SparklineExampleComponent implements OnInit {
  @ViewChild('sparkline') sparklineRef: ElementRef;
  
  ngOnInit() {
    // Load the web component
    const script = document.createElement('script');
    script.src = '/path/to/vc-sparkline.js';
    document.head.appendChild(script);
  }
  
  ngAfterViewInit() {
    if (this.sparklineRef.nativeElement) {
      const data = [0, 2, 5, 9, 5, 10, 3, 5, 0, 7, 5];
      this.sparklineRef.nativeElement.setAttribute('value', JSON.stringify(data));
    }
  }
}
```

## License

MIT License

## Acknowledgements

This component is inspired by the Vuetify v3 Sparkline component but reimplemented as a standalone Web Component without any dependencies.