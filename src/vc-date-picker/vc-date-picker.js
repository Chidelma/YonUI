/**
 * Material 2 Date Picker Web Component
 * 
 * A customizable date picker component built using Web Component standards
 * with Material Design 2 styling.
 */
class VcDatePicker extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Default values
        this._value = '';
        this._min = '';
        this._max = '';
        this._label = 'Select date';
        this._disabled = false;
        this._required = false;
        this._currentMonth = new Date();
        this._selectedDate = null;
        this._isOpen = false;

        // Bind methods
        this._handleInputClick = this._handleInputClick.bind(this);
        this._handleDocumentClick = this._handleDocumentClick.bind(this);
        this._handlePrevMonthClick = this._handlePrevMonthClick.bind(this);
        this._handleNextMonthClick = this._handleNextMonthClick.bind(this);
        this._handleDateClick = this._handleDateClick.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleTodayClick = this._handleTodayClick.bind(this);
        this._handleClearClick = this._handleClearClick.bind(this);
    }

    static get observedAttributes() {
        return ['value', 'min', 'max', 'label', 'disabled', 'required'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'value':
                this._value = newValue || '';
                // Make sure we handle the case where newValue might be falsy
                try {
                    this._selectedDate = newValue ? new Date(newValue) : null;
                    // Validate that the date is valid
                    if (this._selectedDate && isNaN(this._selectedDate.getTime())) {
                        console.warn('Invalid date provided:', newValue);
                        this._selectedDate = null;
                    }
                } catch (e) {
                    console.error('Error parsing date:', e);
                    this._selectedDate = null;
                }

                // Only call _updateInputValue if shadowRoot is already attached
                if (this.shadowRoot && this.shadowRoot.querySelector('.date-input')) {
                    this._updateInputValue();
                }
                break;
            case 'min':
                this._min = newValue || '';
                break;
            case 'max':
                this._max = newValue || '';
                break;
            case 'label':
                this._label = newValue || 'Select date';
                if (this.shadowRoot && this.shadowRoot.querySelector('.date-input-label')) {
                    this.shadowRoot.querySelector('.date-input-label').textContent = this._label;
                }
                break;
            case 'disabled':
                this._disabled = newValue !== null;
                if (this.shadowRoot && this.shadowRoot.querySelector('.date-input')) {
                    this.shadowRoot.querySelector('.date-input').disabled = this._disabled;
                }
                break;
            case 'required':
                this._required = newValue !== null;
                if (this.shadowRoot && this.shadowRoot.querySelector('.date-input')) {
                    this.shadowRoot.querySelector('.date-input').required = this._required;
                }
                break;
        }
    }

    connectedCallback() {
        // Create initial DOM
        this._render();

        // Safely get elements and add event listeners
        const inputWrapper = this.shadowRoot.querySelector('.date-input-wrapper');
        const prevMonthBtn = this.shadowRoot.querySelector('.prev-month');
        const nextMonthBtn = this.shadowRoot.querySelector('.next-month');
        const dateInput = this.shadowRoot.querySelector('.date-input');
        const todayBtn = this.shadowRoot.querySelector('.today-btn');
        const clearBtn = this.shadowRoot.querySelector('.clear-btn');

        if (inputWrapper) {
            inputWrapper.addEventListener('click', this._handleInputClick);
        }

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', this._handlePrevMonthClick);
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', this._handleNextMonthClick);
        }

        if (dateInput) {
            dateInput.addEventListener('change', this._handleInputChange);
        }

        if (todayBtn) {
            todayBtn.addEventListener('click', this._handleTodayClick);
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', this._handleClearClick);
        }

        document.addEventListener('click', this._handleDocumentClick);

        // Set initial month if value is provided
        if (this._value) {
            try {
                const date = new Date(this._value);
                if (!isNaN(date.getTime())) {
                    this._selectedDate = date;
                    this._currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                } else {
                    console.warn('Invalid date value:', this._value);
                    this._selectedDate = null;
                }
            } catch (e) {
                console.error('Error parsing date:', e);
                this._selectedDate = null;
            }
        }

        this._updateCalendar();
        this._updateInputValue();
    }

    disconnectedCallback() {
        // Remove event listeners
        document.removeEventListener('click', this._handleDocumentClick);
        this.shadowRoot.querySelector('.date-input-wrapper').removeEventListener('click', this._handleInputClick);
        this.shadowRoot.querySelector('.prev-month').removeEventListener('click', this._handlePrevMonthClick);
        this.shadowRoot.querySelector('.next-month').removeEventListener('click', this._handleNextMonthClick);
        this.shadowRoot.querySelector('.date-input').removeEventListener('change', this._handleInputChange);
        this.shadowRoot.querySelector('.today-btn').removeEventListener('click', this._handleTodayClick);
        this.shadowRoot.querySelector('.clear-btn').removeEventListener('click', this._handleClearClick);
    }

    _render() {
        this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            font-family: Roboto, 'Helvetica Neue', sans-serif;
            position: relative;
            min-width: 210px;
          }
          
          .date-input-wrapper {
            position: relative;
            margin-top: 16px;
          }
          
          .date-input {
            width: 100%;
            height: 56px;
            border: 1px solid rgba(0, 0, 0, 0.38);
            border-radius: 4px;
            padding: 0 16px;
            font-size: 16px;
            background: transparent;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            cursor: pointer;
          }
          
          .date-input:focus {
            border-color: #6200ee;
            box-shadow: 0 0 0 1px #6200ee;
          }
          
          .date-input:disabled {
            background: rgba(0, 0, 0, 0.04);
            border-color: rgba(0, 0, 0, 0.26);
            color: rgba(0, 0, 0, 0.38);
            cursor: not-allowed;
          }
          
          .date-input-label {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(0, 0, 0, 0.6);
            pointer-events: none;
            transition: all 0.2s;
          }
          
          .date-input-wrapper.has-value .date-input-label,
          .date-input:focus + .date-input-label {
            top: 0;
            transform: translateY(-50%) scale(0.75);
            background: white;
            padding: 0 4px;
            color: #6200ee;
          }
          
          .calendar-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(0, 0, 0, 0.54);
            pointer-events: none;
          }
          
          .calendar-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            z-index: 1000;
            display: none;
            width: 280px;
            background: white;
            border-radius: 4px;
            box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 
                       0 8px 10px 1px rgba(0,0,0,.14), 
                       0 3px 14px 2px rgba(0,0,0,.12);
            overflow: hidden;
          }
          
          .calendar-dropdown.open {
            display: block;
          }
          
          .calendar-header {
            background: #6200ee;
            color: white;
            padding: 16px;
            text-align: center;
          }
          
          .month-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 16px;
            color: rgba(0, 0, 0, 0.87);
          }
          
          .month-nav button {
            background: transparent;
            border: none;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .month-nav button:hover {
            background: rgba(0, 0, 0, 0.04);
          }
          
          .month-name {
            font-weight: 500;
            font-size: 14px;
          }
          
          .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding: 8px;
          }
          
          .weekday {
            text-align: center;
            font-size: 12px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
            margin-bottom: 4px;
          }
          
          .date-cell {
            height: 36px;
            width: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 50%;
            font-size: 13px;
            margin: 2px 0;
          }
          
          .date-cell:hover {
            background: rgba(0, 0, 0, 0.04);
          }
          
          .date-cell.selected {
            background: #6200ee;
            color: white;
          }
          
          .date-cell.today {
            border: 1px solid #6200ee;
          }
          
          .date-cell.disabled {
            color: rgba(0, 0, 0, 0.38);
            cursor: default;
          }
          
          .date-cell.disabled:hover {
            background: transparent;
          }
          
          .date-cell.other-month {
            color: rgba(0, 0, 0, 0.38);
          }
          
          .calendar-actions {
            display: flex;
            justify-content: flex-end;
            padding: 8px 16px;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
          }
          
          .calendar-actions button {
            background: transparent;
            border: none;
            color: #6200ee;
            font-weight: 500;
            text-transform: uppercase;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 14px;
            letter-spacing: 0.5px;
            border-radius: 4px;
          }
          
          .calendar-actions button:hover {
            background: rgba(98, 0, 238, 0.04);
          }
        </style>
        
        <div class="date-input-wrapper">
          <input type="text" class="date-input" readonly ${this._disabled ? 'disabled' : ''} ${this._required ? 'required' : ''}>
          <span class="date-input-label">${this._label}</span>
          <span class="calendar-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </span>
        </div>
        
        <div class="calendar-dropdown">
          <div class="calendar-header">
            <div class="selected-date"></div>
          </div>
          
          <div class="month-nav">
            <button class="prev-month">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <div class="month-name"></div>
            <button class="next-month">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
          
          <div class="calendar-grid">
            <div class="weekday">S</div>
            <div class="weekday">M</div>
            <div class="weekday">T</div>
            <div class="weekday">W</div>
            <div class="weekday">T</div>
            <div class="weekday">F</div>
            <div class="weekday">S</div>
            <!-- Date cells will be added dynamically -->
          </div>
          
          <div class="calendar-actions">
            <button class="clear-btn">Clear</button>
            <button class="today-btn">Today</button>
          </div>
        </div>
      `;
    }

    _updateCalendar() {
        // Make sure we have a valid currentMonth
        if (!this._currentMonth || isNaN(this._currentMonth.getTime())) {
            this._currentMonth = new Date(); // Use current date as fallback
        }

        const monthElement = this.shadowRoot.querySelector('.month-name');
        if (monthElement) {
            const monthName = this._currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
            monthElement.textContent = monthName;
        }

        // Update header selected date
        const selectedDateElement = this.shadowRoot.querySelector('.selected-date');
        if (selectedDateElement) {
            if (this._selectedDate && !isNaN(this._selectedDate.getTime())) {
                try {
                    const formattedDate = this._selectedDate.toLocaleDateString('default', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    selectedDateElement.textContent = formattedDate;
                } catch (e) {
                    console.error('Error formatting date:', e);
                    selectedDateElement.textContent = 'Invalid date';
                }
            } else {
                selectedDateElement.textContent = 'No date selected';
            }
        }

        // Clear existing date cells (except for weekday headers)
        const calendarGrid = this.shadowRoot.querySelector('.calendar-grid');
        if (!calendarGrid) {
            console.error('Calendar grid element not found');
            return; // Exit if we can't find the calendar grid
        }

        const weekdayElements = calendarGrid.querySelectorAll('.weekday');
        calendarGrid.innerHTML = '';

        // Add weekday headers back
        weekdayElements.forEach(weekday => {
            calendarGrid.appendChild(weekday);
        });

        // Make sure we have a valid currentMonth
        if (!this._currentMonth || isNaN(this._currentMonth.getTime())) {
            this._currentMonth = new Date(); // Use current date as fallback
        }

        // Get current month data
        const year = this._currentMonth.getFullYear();
        const month = this._currentMonth.getMonth();

        // Get the first day of the month
        let firstDay, firstDayIndex;
        try {
            firstDay = new Date(year, month, 1);
            firstDayIndex = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
        } catch (e) {
            console.error('Error creating first day of month:', e);
            firstDay = new Date();
            firstDayIndex = firstDay.getDay();
        }

        // Get the last day of the month
        let lastDay, lastDate;
        try {
            lastDay = new Date(year, month + 1, 0);
            lastDate = lastDay.getDate();
        } catch (e) {
            console.error('Error creating last day of month:', e);
            lastDay = new Date();
            lastDate = 30; // Fallback to 30 days
        }

        // Get the last day of the previous month
        let prevMonthLastDay, prevMonthLastDate;
        try {
            prevMonthLastDay = new Date(year, month, 0);
            prevMonthLastDate = prevMonthLastDay.getDate();
        } catch (e) {
            console.error('Error creating last day of previous month:', e);
            prevMonthLastDay = new Date();
            prevMonthLastDate = 30; // Fallback to 30 days
        }

        // Get today's date
        let today, todayFormatted;
        try {
            today = new Date();
            todayFormatted = today.toISOString().split('T')[0];
        } catch (e) {
            console.error('Error formatting today\'s date:', e);
            todayFormatted = '';
        }

        // Min and max dates validation
        let minDate = null;
        let maxDate = null;

        if (this._min) {
            try {
                minDate = new Date(this._min);
                if (isNaN(minDate.getTime())) {
                    console.warn('Invalid min date:', this._min);
                    minDate = null;
                }
            } catch (e) {
                console.error('Error parsing min date:', e);
                minDate = null;
            }
        }

        if (this._max) {
            try {
                maxDate = new Date(this._max);
                if (isNaN(maxDate.getTime())) {
                    console.warn('Invalid max date:', this._max);
                    maxDate = null;
                }
            } catch (e) {
                console.error('Error parsing max date:', e);
                maxDate = null;
            }
        }

        // Days from previous month
        for (let i = firstDayIndex; i > 0; i--) {
            const prevDate = prevMonthLastDate - i + 1;
            const dateObj = new Date(year, month - 1, prevDate);
            const dateFormatted = dateObj.toISOString().split('T')[0];

            const isDisabled = (minDate && dateObj < minDate) || (maxDate && dateObj > maxDate);

            const cell = document.createElement('div');
            cell.classList.add('date-cell', 'other-month');
            if (isDisabled) cell.classList.add('disabled');
            cell.textContent = prevDate;
            cell.dataset.date = dateFormatted;

            if (!isDisabled) {
                cell.addEventListener('click', this._handleDateClick);
            }

            calendarGrid.appendChild(cell);
        }

        // Days of current month
        for (let i = 1; i <= lastDate; i++) {
            const dateObj = new Date(year, month, i);
            const dateFormatted = dateObj.toISOString().split('T')[0];

            const isToday = dateFormatted === todayFormatted;
            const isSelected = this._selectedDate &&
                dateObj.getDate() === this._selectedDate.getDate() &&
                dateObj.getMonth() === this._selectedDate.getMonth() &&
                dateObj.getFullYear() === this._selectedDate.getFullYear();
            const isDisabled = (minDate && dateObj < minDate) || (maxDate && dateObj > maxDate);

            const cell = document.createElement('div');
            cell.classList.add('date-cell');
            if (isToday) cell.classList.add('today');
            if (isSelected) cell.classList.add('selected');
            if (isDisabled) cell.classList.add('disabled');
            cell.textContent = i;
            cell.dataset.date = dateFormatted;

            if (!isDisabled) {
                cell.addEventListener('click', this._handleDateClick);
            }

            calendarGrid.appendChild(cell);
        }

        // Days from next month
        const totalCells = 42; // 6 rows of 7 days
        const remainingCells = totalCells - (firstDayIndex + lastDate);

        for (let i = 1; i <= remainingCells; i++) {
            const dateObj = new Date(year, month + 1, i);
            const dateFormatted = dateObj.toISOString().split('T')[0];

            const isDisabled = (minDate && dateObj < minDate) || (maxDate && dateObj > maxDate);

            const cell = document.createElement('div');
            cell.classList.add('date-cell', 'other-month');
            if (isDisabled) cell.classList.add('disabled');
            cell.textContent = i;
            cell.dataset.date = dateFormatted;

            if (!isDisabled) {
                cell.addEventListener('click', this._handleDateClick);
            }

            calendarGrid.appendChild(cell);
        }
    }

    _updateInputValue() {
        const input = this.shadowRoot.querySelector('.date-input');
        const wrapper = this.shadowRoot.querySelector('.date-input-wrapper');

        // First check if this._selectedDate is not null before trying to call getTime()
        if (this._selectedDate !== null && this._selectedDate !== undefined) {
            // Then check if it's a valid date
            if (!isNaN(this._selectedDate.getTime())) {
                const formattedDate = this._formatDate(this._selectedDate);
                input.value = formattedDate;
                wrapper.classList.add('has-value');
            } else {
                input.value = '';
                wrapper.classList.remove('has-value');
            }
        } else {
            input.value = '';
            wrapper.classList.remove('has-value');
        }
    }

    _formatDate(date) {
        if (!date) return '';

        try {
            // First verify it's a valid date
            if (isNaN(date.getTime())) {
                console.warn('Invalid date object in _formatDate');
                return '';
            }

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${month}/${day}/${year}`;
        } catch (e) {
            console.error('Error formatting date:', e);
            return '';
        }
    }

    _parseDate(dateStr) {
        if (!dateStr) return null;

        // Try MM/DD/YYYY format
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            const month = parseInt(parts[0], 10) - 1;
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);

            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        // Try other formats using native Date parsing
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            return date;
        }

        return null;
    }

    _handleInputClick(event) {
        if (this._disabled) return;

        event.stopPropagation();
        this._toggleCalendar();
    }

    _handleDocumentClick(event) {
        const dropdown = this.shadowRoot.querySelector('.calendar-dropdown');
        const isClickInside = event.composedPath().includes(this);

        if (!isClickInside && dropdown.classList.contains('open')) {
            this._closeCalendar();
        }
    }

    _toggleCalendar() {
        const dropdown = this.shadowRoot.querySelector('.calendar-dropdown');

        if (dropdown.classList.contains('open')) {
            this._closeCalendar();
        } else {
            this._openCalendar();
        }
    }

    _openCalendar() {
        const dropdown = this.shadowRoot.querySelector('.calendar-dropdown');
        dropdown.classList.add('open');
        this._isOpen = true;

        // If there's a selected date, update current month to match it
        if (this._selectedDate) {
            this._currentMonth = new Date(
                this._selectedDate.getFullYear(),
                this._selectedDate.getMonth(),
                1
            );
        }

        this._updateCalendar();
    }

    _closeCalendar() {
        const dropdown = this.shadowRoot.querySelector('.calendar-dropdown');
        dropdown.classList.remove('open');
        this._isOpen = false;
    }

    _handlePrevMonthClick(event) {
        event.stopPropagation();

        this._currentMonth = new Date(
            this._currentMonth.getFullYear(),
            this._currentMonth.getMonth() - 1,
            1
        );

        this._updateCalendar();
    }

    _handleNextMonthClick(event) {
        event.stopPropagation();

        this._currentMonth = new Date(
            this._currentMonth.getFullYear(),
            this._currentMonth.getMonth() + 1,
            1
        );

        this._updateCalendar();
    }

    _handleDateClick(event) {
        event.stopPropagation();

        const dateStr = event.currentTarget.dataset.date;
        const date = new Date(dateStr);

        this._selectedDate = date;
        this._value = dateStr;

        // Update the attribute
        this.setAttribute('value', dateStr);

        // Update the display
        this._updateCalendar();
        this._updateInputValue();

        // Dispatch change event
        this._dispatchChangeEvent();

        // Close the calendar
        this._closeCalendar();
    }

    _handleInputChange(event) {
        const value = event.target.value;
        const date = this._parseDate(value);

        if (date) {
            this._selectedDate = date;
            this._value = date.toISOString().split('T')[0];
            this.setAttribute('value', this._value);
            this._dispatchChangeEvent();
        } else if (value === '') {
            this._selectedDate = null;
            this._value = '';
            this.removeAttribute('value');
            this._dispatchChangeEvent();
        }

        this._updateInputValue();
    }

    _handleTodayClick(event) {
        event.stopPropagation();

        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];

        // Check if today is within allowed range
        let minDate = null;
        let maxDate = null;

        if (this._min) {
            minDate = new Date(this._min);
            if (isNaN(minDate.getTime())) minDate = null;
        }

        if (this._max) {
            maxDate = new Date(this._max);
            if (isNaN(maxDate.getTime())) maxDate = null;
        }

        if ((minDate && today < minDate) || (maxDate && today > maxDate)) {
            return;
        }

        this._selectedDate = today;
        this._value = dateStr;
        this._currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Update the attribute
        this.setAttribute('value', dateStr);

        // Update the display
        this._updateCalendar();
        this._updateInputValue();

        // Dispatch change event
        this._dispatchChangeEvent();

        // Close the calendar
        this._closeCalendar();
    }

    _handleClearClick(event) {
        event.stopPropagation();

        this._selectedDate = null;
        this._value = '';

        // Update the attribute
        this.removeAttribute('value');

        // Update the display
        this._updateCalendar();
        this._updateInputValue();

        // Dispatch change event
        this._dispatchChangeEvent();

        // Close the calendar
        this._closeCalendar();
    }

    _dispatchChangeEvent() {
        const event = new CustomEvent('change', {
            detail: {
                value: this._value,
                date: this._selectedDate
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }

    // Public API
    get value() {
        return this._value;
    }

    set value(val) {
        if (val === this._value) return;

        if (val) {
            try {
                const date = new Date(val);
                if (!isNaN(date.getTime())) {
                    this._value = val;
                    this._selectedDate = date;
                    this.setAttribute('value', val);
                } else {
                    console.warn('Invalid date format:', val);
                    this._value = '';
                    this._selectedDate = null;
                    this.removeAttribute('value');
                }
            } catch (e) {
                console.error('Error parsing date:', e);
                this._value = '';
                this._selectedDate = null;
                this.removeAttribute('value');
            }
        } else {
            this._value = '';
            this._selectedDate = null;
            this.removeAttribute('value');
        }

        // Only update if the component is connected to the DOM
        if (this.isConnected && this.shadowRoot) {
            this._updateInputValue();
            if (this._isOpen) {
                this._updateCalendar();
            }
        }
    }

    get label() {
        return this._label;
    }

    set label(val) {
        this._label = val;
        this.setAttribute('label', val);
    }

    get min() {
        return this._min;
    }

    set min(val) {
        this._min = val;
        this.setAttribute('min', val);
    }

    get max() {
        return this._max;
    }

    set max(val) {
        this._max = val;
        this.setAttribute('max', val);
    }

    get disabled() {
        return this._disabled;
    }

    set disabled(val) {
        this._disabled = Boolean(val);
        if (this._disabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get required() {
        return this._required;
    }

    set required(val) {
        this._required = Boolean(val);
        if (this._required) {
            this.setAttribute('required', '');
        } else {
            this.removeAttribute('required');
        }
    }
}

// Define the custom element
customElements.define('vc-date-picker', VcDatePicker);

export default VcDatePicker;