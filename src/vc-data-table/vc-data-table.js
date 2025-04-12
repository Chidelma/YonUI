/**
 * vc-data-table.js
 * A Material Design 2 inspired data table web component
 */

class VcDataTable extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = [];
        this._columns = [];
        this._sortColumn = null;
        this._sortDirection = 'asc';
        this._page = 1;
        this._pageSize = 10;
        this._totalPages = 1;
        this._selectable = false;
        this._selectedRows = new Set();
    }

    static get observedAttributes() {
        return ['selectable', 'page-size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selectable') {
            this._selectable = newValue !== null;
            this.render();
        } else if (name === 'page-size') {
            this._pageSize = parseInt(newValue) || 10;
            this._updatePagination();
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    set data(value) {
        if (Array.isArray(value)) {
            this._data = [...value];
            this._updatePagination();
            this.render();
        }
    }

    get data() {
        return this._data;
    }

    set columns(value) {
        if (Array.isArray(value)) {
            this._columns = [...value];
            this.render();
        }
    }

    get columns() {
        return this._columns;
    }

    get selectedRows() {
        return Array.from(this._selectedRows).map(index => this._data[index]);
    }

    _updatePagination() {
        this._totalPages = Math.ceil(this._data.length / this._pageSize);
        this._page = Math.min(this._page, this._totalPages);
        if (this._page < 1) this._page = 1;
    }

    _sortData() {
        if (this._sortColumn !== null) {
            const sortColumnKey = this._columns[this._sortColumn].key;
            this._data.sort((a, b) => {
                const valueA = a[sortColumnKey];
                const valueB = b[sortColumnKey];

                let comparison = 0;
                if (valueA > valueB) {
                    comparison = 1;
                } else if (valueA < valueB) {
                    comparison = -1;
                }

                return this._sortDirection === 'asc' ? comparison : -comparison;
            });
        }
    }

    _getVisibleData() {
        const start = (this._page - 1) * this._pageSize;
        const end = start + this._pageSize;
        return this._data.slice(start, end);
    }

    _handleHeaderClick(columnIndex) {
        if (this._columns[columnIndex].sortable !== false) {
            if (this._sortColumn === columnIndex) {
                this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this._sortColumn = columnIndex;
                this._sortDirection = 'asc';
            }
            this._sortData();
            this.render();
        }
    }

    _handleRowSelect(rowIndex, checked) {
        const dataIndex = (this._page - 1) * this._pageSize + rowIndex;

        if (checked) {
            this._selectedRows.add(dataIndex);
        } else {
            this._selectedRows.delete(dataIndex);
        }

        this._updateSelectAllCheckbox();
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: { selectedRows: this.selectedRows }
        }));
    }

    _handleSelectAll(checked) {
        const visibleData = this._getVisibleData();
        const baseIndex = (this._page - 1) * this._pageSize;

        for (let i = 0; i < visibleData.length; i++) {
            const dataIndex = baseIndex + i;
            if (checked) {
                this._selectedRows.add(dataIndex);
            } else {
                this._selectedRows.delete(dataIndex);
            }
        }

        this.render();
        this.dispatchEvent(new CustomEvent('selection-change', {
            detail: { selectedRows: this.selectedRows }
        }));
    }

    _handlePageChange(newPage) {
        this._page = newPage;
        this.render();
        this.dispatchEvent(new CustomEvent('page-change', {
            detail: { page: this._page }
        }));
    }

    _updateSelectAllCheckbox() {
        const selectAllCheckbox = this.shadowRoot.querySelector('.select-all-checkbox');
        if (!selectAllCheckbox) return;

        const visibleData = this._getVisibleData();
        const baseIndex = (this._page - 1) * this._pageSize;

        let allSelected = visibleData.length > 0;
        let someSelected = false;

        for (let i = 0; i < visibleData.length; i++) {
            const dataIndex = baseIndex + i;
            if (this._selectedRows.has(dataIndex)) {
                someSelected = true;
            } else {
                allSelected = false;
            }
        }

        if (allSelected) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else if (someSelected) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        }
    }

    render() {
        const styles = `
        :host {
          display: block;
          font-family: Roboto, 'Helvetica Neue', sans-serif;
          color: rgba(0, 0, 0, 0.87);
          background-color: #fff;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th, td {
          padding: 0 16px;
          height: 48px;
          text-align: left;
          font-size: 14px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
          white-space: nowrap;
          position: relative;
        }
        
        th {
          color: rgba(0, 0, 0, 0.54);
          font-weight: 500;
          font-size: 12px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s;
        }
        
        th:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        th.sortable:after {
          content: '';
          opacity: 0;
          margin-left: 4px;
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          vertical-align: middle;
        }
        
        th.sorted-asc:after {
          content: '';
          opacity: 1;
          border-bottom: 5px solid rgba(0, 0, 0, 0.54);
          border-top: 0;
        }
        
        th.sorted-desc:after {
          content: '';
          opacity: 1;
          border-top: 5px solid rgba(0, 0, 0, 0.54);
          border-bottom: 0;
        }
        
        tr:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        .pagination {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 8px 16px;
          font-size: 12px;
          color: rgba(0, 0, 0, 0.54);
        }
        
        .pagination-info {
          margin-right: 16px;
        }
        
        .pagination-controls {
          display: flex;
          align-items: center;
        }
        
        .pagination-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          margin: 0 4px;
          border-radius: 50%;
          border: none;
          background: none;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.54);
          transition: background-color 0.2s;
        }
        
        .pagination-button:hover {
          background-color: rgba(0, 0, 0, 0.04);
        }
        
        .pagination-button:disabled {
          opacity: 0.38;
          cursor: default;
        }
        
        .pagination-button:disabled:hover {
          background-color: transparent;
        }
        
        .checkbox-cell {
          width: 24px;
          padding: 0 12px 0 16px;
        }
        
        input[type="checkbox"] {
          appearance: none;
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border: 2px solid rgba(0, 0, 0, 0.54);
          border-radius: 2px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s, border-color 0.2s;
        }
        
        input[type="checkbox"]:checked {
          background-color: #1976d2;
          border-color: #1976d2;
        }
        
        input[type="checkbox"]:checked:after {
          content: '';
          position: absolute;
          top: 2px;
          left: 6px;
          width: 3px;
          height: 8px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        input[type="checkbox"]:indeterminate {
          background-color: #1976d2;
          border-color: #1976d2;
        }
        
        input[type="checkbox"]:indeterminate:after {
          content: '';
          position: absolute;
          top: 7px;
          left: 3px;
          width: 10px;
          height: 2px;
          background-color: white;
        }
        
        .empty-message {
          padding: 16px;
          text-align: center;
          color: rgba(0, 0, 0, 0.54);
        }
      `;

        const visibleData = this._getVisibleData();
        const startItem = Math.min((this._page - 1) * this._pageSize + 1, this._data.length);
        const endItem = Math.min(startItem + visibleData.length - 1, this._data.length);

        let tableContent = '';

        // Header row
        tableContent += '<tr>';

        if (this._selectable) {
            tableContent += `<th class="checkbox-cell">
          <input type="checkbox" class="select-all-checkbox" ${visibleData.length === 0 ? 'disabled' : ''}>
        </th>`;
        }

        this._columns.forEach((column, index) => {
            const isSorted = this._sortColumn === index;
            const sortClass = isSorted
                ? `sorted-${this._sortDirection}`
                : '';
            const sortableClass = column.sortable !== false ? 'sortable' : '';
            const classAttr = `${sortableClass} ${sortClass}`.trim();

            tableContent += `<th class="${classAttr}" data-column-index="${index}">
          ${column.label || column.key}
        </th>`;
        });

        tableContent += '</tr>';

        // Data rows
        if (visibleData.length === 0) {
            tableContent += `<tr><td colspan="${this._columns.length + (this._selectable ? 1 : 0)}" class="empty-message">No data available</td></tr>`;
        } else {
            visibleData.forEach((item, rowIndex) => {
                const dataIndex = (this._page - 1) * this._pageSize + rowIndex;
                const isSelected = this._selectedRows.has(dataIndex);

                tableContent += '<tr>';

                if (this._selectable) {
                    tableContent += `<td class="checkbox-cell">
              <input type="checkbox" class="row-checkbox" data-row-index="${rowIndex}" ${isSelected ? 'checked' : ''}>
            </td>`;
                }

                this._columns.forEach(column => {
                    const value = item[column.key];
                    const displayValue = column.formatter ? column.formatter(value, item) : value;

                    tableContent += `<td>${displayValue !== undefined ? displayValue : ''}</td>`;
                });

                tableContent += '</tr>';
            });
        }

        const paginationContent = this._data.length > 0 ? `
        <div class="pagination">
          <div class="pagination-info">
            ${startItem}-${endItem} of ${this._data.length}
          </div>
          <div class="pagination-controls">
            <button class="pagination-button" data-page="first" ${this._page === 1 ? 'disabled' : ''}>
              ⟪
            </button>
            <button class="pagination-button" data-page="prev" ${this._page === 1 ? 'disabled' : ''}>
              ⟨
            </button>
            <button class="pagination-button" data-page="next" ${this._page === this._totalPages ? 'disabled' : ''}>
              ⟩
            </button>
            <button class="pagination-button" data-page="last" ${this._page === this._totalPages ? 'disabled' : ''}>
              ⟫
            </button>
          </div>
        </div>
      ` : '';

        this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        <table>
          ${tableContent}
        </table>
        ${paginationContent}
      `;

        // Add event listeners
        if (this._selectable) {
            const selectAllCheckbox = this.shadowRoot.querySelector('.select-all-checkbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.addEventListener('change', e => {
                    this._handleSelectAll(e.target.checked);
                });
            }

            const rowCheckboxes = this.shadowRoot.querySelectorAll('.row-checkbox');
            rowCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', e => {
                    const rowIndex = parseInt(e.target.getAttribute('data-row-index'));
                    this._handleRowSelect(rowIndex, e.target.checked);
                });
            });

            this._updateSelectAllCheckbox();
        }

        const headerCells = this.shadowRoot.querySelectorAll('th[data-column-index]');
        headerCells.forEach(th => {
            th.addEventListener('click', e => {
                const columnIndex = parseInt(e.currentTarget.getAttribute('data-column-index'));
                this._handleHeaderClick(columnIndex);
            });
        });

        const paginationButtons = this.shadowRoot.querySelectorAll('.pagination-button');
        paginationButtons.forEach(button => {
            button.addEventListener('click', e => {
                const action = e.currentTarget.getAttribute('data-page');
                let newPage = this._page;

                switch (action) {
                    case 'first':
                        newPage = 1;
                        break;
                    case 'prev':
                        newPage = this._page - 1;
                        break;
                    case 'next':
                        newPage = this._page + 1;
                        break;
                    case 'last':
                        newPage = this._totalPages;
                        break;
                }

                if (newPage >= 1 && newPage <= this._totalPages && newPage !== this._page) {
                    this._handlePageChange(newPage);
                }
            });
        });
    }
}

// Define the custom element
customElements.define('vc-data-table', VcDataTable);

export default VcDataTable;