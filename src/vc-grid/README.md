# VC Grid System

A lightweight grid system inspired by Vuetify's v-row and v-col components, implemented as Web Components. This provides a flexible and responsive grid layout system for modern web applications.

## Components

This package includes two custom elements:

1. `<vc-row>` - A container that establishes a flex row (similar to Vuetify's v-row)
2. `<vc-col>` - A column element that works within a row (similar to Vuetify's v-col)

## Installation

Simply include the JavaScript files in your HTML:

```html
<script src="vc-row.js"></script>
<script src="vc-col.js"></script>
```

## Usage

### Basic Grid

```html
<vc-row>
  <vc-col cols="12" md="6" lg="4">
    <div>Column 1</div>
  </vc-col>
  <vc-col cols="12" md="6" lg="4">
    <div>Column 2</div>
  </vc-col>
  <vc-col cols="12" md="12" lg="4">
    <div>Column 3</div>
  </vc-col>
</vc-row>
```

### Dense Grid with No Gutters

```html
<vc-row dense no-gutters>
  <vc-col cols="6">
    <div>Half Width</div>
  </vc-col>
  <vc-col cols="6">
    <div>Half Width</div>
  </vc-col>
</vc-row>
```

## API Reference

### vc-row

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| dense | Boolean | false | Reduces the gutters between columns |
| no-gutters | Boolean | false | Removes the negative margins and padding from columns |
| align | String | 'start' | Vertical alignment of columns (start, end, center, baseline, stretch) |
| justify | String | 'start' | Horizontal distribution of columns (start, end, center, space-between, space-around, space-evenly) |
| wrap | String | (empty) | Controls flex wrapping. Set to 'no-wrap' to prevent wrapping |

### vc-col

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| cols | String | '12' | Number of columns (1-12) to use for all breakpoints |
| sm | String | null | Number of columns on small screens (≥600px) |
| md | String | null | Number of columns on medium screens (≥960px) |
| lg | String | null | Number of columns on large screens (≥1264px) |
| xl | String | null | Number of columns on extra-large screens (≥1904px) |
| offset | String | null | Number of columns to offset the column |
| align | String | 'start' | Vertical alignment of the column's content (start, end, center, baseline, stretch) |
| justify | String | 'start' | Horizontal alignment of the column's content (start, end, center, space-between, space-around, space-evenly) |
| order | String | null | Controls the order of the column (e.g., '1', '2', '3') |

## Breakpoints

The grid system uses the following breakpoints, similar to Vuetify:

- xs: <600px
- sm: ≥600px
- md: ≥960px
- lg: ≥1264px
- xl: ≥1904px

## Example

See `example.html` for a complete demonstration of all features.

## Browser Support

This component uses modern web standards and should work in all browsers that support Web Components (Custom Elements v1).

## License

MIT