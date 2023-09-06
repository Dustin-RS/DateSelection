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

function updateCalendar() {
    const selectedMonth = monthSelector.selectedIndex;
    const selectedYear = parseInt(yearSelector.value);
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

    let calendarHTML = '<table>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    
    let day = 1;
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
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelector.appendChild(option);
});

years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
});

monthSelector.selectedIndex = selectedDate.getMonth();
yearSelector.value = selectedDate.getFullYear();

prevMonthButton.addEventListener("click", () => {
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
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    if (selectedDate.getMonth() > 11) {
        selectedDate.setMonth(0);
        selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    }
    updateCalendar();
    monthSelector.selectedIndex = selectedDate.getMonth();
    yearSelector.value = selectedDate.getFullYear();
});

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

selectedDateInput.addEventListener("change", () => {
    const inputDate = new Date(selectedDateInput.value);
    if (isValidDate(inputDate)) {
        selectedDate = inputDate;
        updateCalendar();
    } else {
        // Handle invalid date input
        selectedDateInput.classList.add("invalid-input");
        selectedDateInput.value = "Invalid Date";
    }
});

selectedDateInput.addEventListener("focus", () => {
    if (selectedDateInput.classList.contains("invalid-input")) {
        selectedDateInput.classList.remove("invalid-input");
        selectedDateInput.value = "";
    }
});

updateCalendar();
selectedDateInput.value = selectedDate.toLocaleDateString();
