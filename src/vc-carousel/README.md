# Material 2 Carousel Web Component

A Material Design 2 inspired carousel web component based on Vuetify v3's carousel, built using Web Component technology. This carousel provides a simple, elegant, and customizable way to display content in a slideshow format.

## Features

- Material Design 2 styling and animations
- Touch swipe support
- Keyboard navigation
- Automatic cycling
- Customizable height
- Show/hide navigation arrows
- Show/hide delimiters (dots)
- Show arrows only on hover
- Custom navigation controls support
- Responsive design

## Installation

1. Download the `vc-carousel.js` file to your project.
2. Include it in your HTML file:

```html
<script src="path/to/vc-carousel.js"></script>
```

## Basic Usage

```html
<vc-carousel height="400px">
  <div class="vc-carousel-item" style="background-color: #1976D2;">
    <div>Slide 1 Content</div>
  </div>
  <div class="vc-carousel-item" style="background-color: #388E3C;">
    <div>Slide 2 Content</div>
  </div>
  <div class="vc-carousel-item" style="background-color: #E64A19;">
    <div>Slide 3 Content</div>
  </div>
</vc-carousel>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `height` | String | `'400px'` | Height of the carousel |
| `cycle` | Boolean | `false` | Whether to automatically cycle through slides |
| `interval` | Number | `6000` | Time between cycles in milliseconds (when `cycle` is enabled) |
| `hide-delimiters` | Boolean | `false` | Whether to hide the delimiter dots |
| `hide-arrows` | Boolean | `false` | Whether to hide the navigation arrows |
| `show-arrows-on-hover` | Boolean | `false` | Whether to show the arrows only on hover |

## Methods

The carousel component exposes the following methods:

| Method | Description |
|--------|-------------|
| `next()` | Go to the next slide |
| `prev()` | Go to the previous slide |
| `goTo(index)` | Go to a specific slide by index (0-based) |

Example of using methods:
```javascript
// Get the carousel element
const carousel = document.querySelector('vc-carousel');

// Go to next slide
carousel.next();

// Go to previous slide
carousel.prev();

// Go to specific slide (0-based index)
carousel.goTo(2); // Go to the third slide
```

## Styling

You can style the carousel and its items using CSS:

```css
/* Style the carousel items */
.vc-carousel-item {
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
}

/* Style the content inside carousel items */
.carousel-content {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 24px;
  border-radius: 4px;
  max-width: 80%;
}
```