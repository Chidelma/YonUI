 # vc-data-table

A lightweight, customizable Material Design 2 inspired data table web component.

## Features

- 📊 Modern Material Design 2 styling
- 🔄 Sortable columns
- 📱 Responsive layout
- 🔢 Pagination
- ✓ Row selection
- 🎨 Custom cell formatting
- 🔄 Dynamic data updates
- 🏗️ No dependencies - pure web component
- 📦 Small footprint

## Installation

Simply include the `vc-data-table.js` file in your project:

```html
<script src="path/to/vc-data-table.js"></script>
```

## Basic Usage

```html
<!-- Add the web component to your HTML -->
<vc-data-table id="my-table"></vc-data-table>

<script>
  // Get a reference to the table
  const table = document.getElementById('my-table');
  
  // Define columns
  table.columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' }
  ];
  
  // Set data
  table.data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
</script>
```

## Attributes

| Attribute    | Type    | Default | Description                          |
|--------------|---------|---------|--------------------------------------|
| selectable   | boolean | false   | Enable row selection                 |
| page-size    | number  | 10      | Number of rows per page              |

## Properties

| Property     | Type    | Description                            |
|--------------|---------|----------------------------------------|
| columns      | Array   | Define table columns                   |
| data         | Array   | Set table data                         |
| selectedRows | Array   | Get selected rows (read-only)          |

### Column Configuration

Each column object can have the following properties:

| Property  | Type     | Description                              |
|-----------|----------|------------------------------------------|
| key       | string   | Property name in data object             |
| label     | string   | Column header text (optional)            |
| sortable  | boolean  | Whether column is sortable (default: true) |
| formatter | function | Custom formatter function (optional)     |

## Events

| Event           | Detail               | Description                         |
|-----------------|----------------------|-------------------------------------|
| selection-change | { selectedRows }    | Fired when row selection changes    |
| page-change     | { page }             | Fired when page changes             |

## Examples

### Selectable Table

```html
<vc-data-table id="selectable-table" selectable></vc-data-table>

<script>
  const table = document.getElementById('selectable-table');
  
  table.columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' }
  ];
  
  table.data = [
    { id: 1, name: 'Alice Williams', role: 'Developer' },
    { id: 2, name: 'Bob Johnson', role: 'Designer' }
  ];
  
  // Listen for selection changes
  table.addEventListener('selection-change', (e) => {
    console.log('Selected rows:', e.detail.selectedRows);
  });
</script>
```

### Custom Formatting

```html
<vc-data-table id="formatted-table" page-size="5"></vc-data-table>

<script>
  const table = document.getElementById('formatted-table');
  
  table.columns = [
    { key: 'id', label: 'ID' },
    { key: 'product', label: 'Product' },
    { 
      key: 'price', 
      label: 'Price',
      formatter: (value) => `$${value.toFixed(2)}`
    },
    { 
      key: 'inStock', 
      label: 'In Stock',
      formatter: (value) => value ? '✓' : '✗'
    },
    { 
      key: 'rating', 
      label: 'Rating',
      formatter: (value) => '★'.repeat(Math.round(value)) + '☆'.repeat(5 - Math.round(value))
    }
  ];
  
  table.data = [
    { id: 1, product: 'Laptop', price: 999.99, inStock: true, rating: 4.5 },
    { id: 2, product: 'Smartphone', price: 699.99, inStock: true, rating: 4.0 },
    { id: 3, product: 'Headphones', price: 149.99, inStock: false, rating: 3.5 }
  ];
</script>
```

### Dynamic Data Updates

```html
<vc-data-table id="dynamic-table"></vc-data-table>
<button id="add-row-btn">Add Row</button>

<script>
  const table = document.getElementById('dynamic-table');
  
  table.columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' }
  ];
  
  table.data = [
    { id: 1, name: 'Initial Row' }
  ];
  
  // Add a new row dynamically
  document.getElementById('add-row-btn').addEventListener('click', () => {
    const newId = table.data.length + 1;
    table.data = [
      ...table.data,
      { id: newId, name: `New Row ${newId}` }
    ];
  });
</script>
```

## Advanced Customization

### Styling

The component uses Shadow DOM to encapsulate styles. You can customize the appearance by defining CSS variables on the component:

```css
vc-data-table {
  --vc-table-border-radius: 8px;
  --vc-table-header-bg: #f5f5f5;
  --vc-table-row-hover-bg: rgba(0, 0, 0, 0.08);
  --vc-table-selected-row-bg: rgba(25, 118, 210, 0.08);
  --vc-table-sort-icon-color: #1976d2;
  --vc-table-checkbox-color: #1976d2;
}
```

## Performance Considerations

- For large datasets, consider using pagination or virtualization to improve performance
- Use the `formatter` function sparingly for better performance
- When updating data, avoid unnecessary re-renders by using immutable patterns

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Improvements

- Column resizing
- Drag and drop column reordering
- Row expansion
- Virtualized scrolling for large datasets
- Filtering
- Fixed header/columns
- Export functionality (CSV, Excel)
- Keyboard navigation

## License

MIT