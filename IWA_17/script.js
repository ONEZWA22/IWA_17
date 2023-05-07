// scripts.js

const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    
    const getDaysInMonth = (date) =>
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
    // Only edit below
    
    const createArray = (length) => {
      const result = [];
    
      for (let i = 0; i < length; i++) {
        result.push(null);
      }
    
      return result;
    };
    
    const createData = () => {
      const current = new Date();
      current.setDate(1);
    
      const startDay = current.getDay();
      const daysInMonth = getDaysInMonth(current);
    
      const weeks = createArray(5);
      let value = null;
    
      for (let weekIndex in weeks) {
        const days = createArray(7);
        value = {
          week: Number(weekIndex) + 1,
          days: days,
        };
    
        for (let dayIndex in days) {
          const day = Number(dayIndex) - startDay + 1;
          const isValid = day > 0 && day <= daysInMonth;
    
          days[dayIndex] = {
            dayOfWeek: Number(dayIndex) + 1,
            value: isValid ? day : '',
          };
        }
    
        weeks[weekIndex] = value;
      }
    
      return weeks;
    };
    
    const addCell = (existing, classString, value) => {
      const result = /* html */ `
        <td class="${classString}">
          ${value}
        </td>
        ${existing}
      `;
      return result;
    };
    
    const createHtml = (data) => {
      let result = '';
    
      for (let { week, days } of data) {
        let inner = '';
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`);
    
        for (let { dayOfWeek, value } of days) {
          let classString = 'table__cell';
          const today = new Date();
          const isToday = today.getDate() === value && today.getMonth() === current.getMonth();
          const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
          const isAlternate = week % 2 === 0;
    
          if (isToday) classString += ' table__cell_today';
          if (isWeekend) classString += ' table__cell_weekend';
          if (isAlternate) classString += ' table__cell_alternate';
    
          inner = addCell(inner, classString, value);
        }
    
        result += `<tr>${inner}</tr>`;
      }
    
      return result;
    };
    
    // Only edit above
    
    const current = new Date();
    document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
    
    const data = createData();
    document.querySelector('[data-content]').innerHTML = createHtml(data);
    
    