# VC-Select Web Component

A Material Design 2 inspired custom select dropdown web component built using native Web Components technology.

## Features

- 🎨 Material Design 2 aesthetics
- 🚫 No dependencies
- 🔄 Two-way data binding
- ⌨️ Keyboard navigation support
- 🎛️ Customizable through attributes
- ♿ Accessible by design
- 🔄 Dynamic option updates

## Installation

1. Download the `vc-select.js` file
2. Include it in your HTML:

```html
<script src="path/to/vc-select.js"></script>
```

## Basic Usage

```html
<vc-select label="Choose an option">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</vc-select>
```

## API

### Attributes

| Attribute    | Description                                | Default Value   |
|--------------|--------------------------------------------|--------------------|
| `value`      | The selected option value                  | `''` (empty string) |
| `disabled`   | Disables the select component              | `false`            |
| `placeholder`| Placeholder text when no option is selected| `'Select an option'`|
| `label`      | Label text displayed above the select      | `''` (empty string) |

### Properties

The component also exposes the following JavaScript properties:

- `value`: Get or set the current selected value
- `disabled`: Get or set the disabled state
- `placeholder`: Get or set the placeholder text
- `label`: Get or set the label text

### Events

- `change`: Fired when selection changes. The event detail contains the new value: `event.detail.value`

## Examples

### Basic Select

```html
<vc-select id="mySelect" label="Basic Select">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</vc-select>
```

### With Placeholder

```html
<vc-select placeholder="Choose a color" label="Favorite Color">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</vc-select>
```

### Disabled Options

```html
<vc-select label="Fruit Selection">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="orange" disabled>Orange (Unavailable)</option>
  <option value="grape">Grape</option>
</vc-select>
```

### Disabled Select

```html
<vc-select disabled label="Disabled Select">
  <option value="one">One</option>
  <option value="two">Two</option>
  <option value="three">Three</option>
</vc-select>
```

### Getting and Setting Values Programmatically

```js
// Get a reference to the select element
const select = document.querySelector('vc-select');

// Get the current value
console.log(select.value);

// Set a new value
select.value = 'option2';

// Listen for changes
select.addEventListener('change', (event) => {
  console.log('New value:', event.detail.value);
});

// Disable the select
select.disabled = true;
```

## Browser Support

Works in all modern browsers that support Web Components:

- Chrome
- Firefox
- Safari
- Edge (Chromium-based)

## Dynamic Options

The component automatically updates when options are added or removed:

```js
// Add a new option dynamically
const newOption = document.createElement('option');
newOption.value = 'new-option';
newOption.textContent = 'Newly Added Option';
document.querySelector('vc-select').appendChild(newOption);
```

## Styling

The component uses Shadow DOM for encapsulation. While the internal styling follows Material Design 2 guidelines, you can affect the outer container using standard CSS:

```css
vc-select {
  width: 300px;
  margin-bottom: 20px;
}
```

## License

MIT