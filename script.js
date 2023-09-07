const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const monthSelector = document.getElementById("month-selector");
const yearSelector = document.getElementById("year-selector");
const calendar = document.getElementById("calendar");
const selectedDateInput = document.getElementById("selected-date");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

let selectedDate = new Date();

function updateCalendar(day_in=1) {
	// Updates calendarHtml in every action
    const selectedMonth = monthSelector.selectedIndex;
    const selectedYear = parseInt(yearSelector.value);
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    let calendarHTML = '<table>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    
    let day = day_in;
    for (let i = 0; i < 6; i++) {
        calendarHTML += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth) {
                calendarHTML += '<td></td>';
            } else if (day <= daysInMonth) {
                const date = new Date(selectedYear, selectedMonth, day);
                const currentDate = new Date();
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                const isCurrentYear = date.getFullYear() === currentDate.getFullYear();
                const isToday = isCurrentMonth && isCurrentYear && day === currentDate.getDate();
                const isSelected = selectedDate.toDateString() === date.toDateString();
				// Depended on className the style of cell will be changing for selected date and non-selected
                const classNames = [];
                if (isToday) classNames.push("today");
                if (isSelected) classNames.push("selected");

                calendarHTML += `<td class="${classNames.join(' ')}">${day}</td>`;
                day++;
            } else {
                calendarHTML += '<td></td>';
            }
        }
        calendarHTML += '</tr>';
        if (day > daysInMonth) break;
    }
    calendarHTML += '</table>';
    calendar.innerHTML = calendarHTML;
	
	// Set for each sell EventListener which will change selected date depended on click
    const calendarDays = calendar.querySelectorAll("td");
    calendarDays.forEach(dayElement => {
        dayElement.addEventListener("click", () => {
            const day = parseInt(dayElement.textContent);
            selectedDate = new Date(selectedYear, selectedMonth, day);
            updateCalendar();
            selectedDateInput.value = selectedDate.toLocaleDateString();
        });
    });
}

months.forEach((month, index) => {
	// Month list
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelector.appendChild(option);
});

years.forEach(year => {
	// Year list
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
});

monthSelector.selectedIndex = selectedDate.getMonth();
yearSelector.value = selectedDate.getFullYear();

prevMonthButton.addEventListener("click", () => {
	//EventListener for prevMonthButton which will decrement the month number
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    if (selectedDate.getMonth() < 0) {
        selectedDate.setMonth(11);
        selectedDate.setFullYear(selectedDate.getFullYear() - 1);
    }
    updateCalendar();
    monthSelector.selectedIndex = selectedDate.getMonth();
    yearSelector.value = selectedDate.getFullYear();
});

nextMonthButton.addEventListener("click", () => {
	//EventListener for nextMonthButton which will increment the month number
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    if (selectedDate.getMonth() > 11) {
        selectedDate.setMonth(0);
        selectedDate.setFullYear(selectedDate.getFullYear() + 1);

    }
    updateCalendar();
    monthSelector.selectedIndex = selectedDate.getMonth();
    yearSelector.value = selectedDate.getFullYear();
});


updateCalendar();
selectedDateInput.value = selectedDate.toLocaleDateString();
