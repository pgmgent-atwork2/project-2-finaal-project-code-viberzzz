import "../../css/Calendar.css";

const Calendar = () => {
  const weekdays = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  const weekDates = [26, 27, 28, 29, 30, 31, 1];

  return (
    <section className="calendar-section" aria-labelledby="calendar-heading">
      <h2 id="calendar-heading">Maintenance Calendar</h2>

      <div className="calendar-container">
        <header className="calendar-header">
          <button className="calendar-nav-btn" aria-label="Previous week">
            ←
          </button>

          <div className="calendar-title">
            <h3>June 2026</h3>
            <p>Week 22</p>
          </div>

          <button className="calendar-nav-btn" aria-label="Next week">
            →
          </button>
        </header>

        {/*WEEKDAYS*/}

        <ol className="weekdays-row" aria-label="Days of the week">
          {weekdays.map((day) => (
            <li key={day.short} className="weekday">
              <abbr title={day.full}>{day.short}</abbr>
            </li>
          ))}
        </ol>

        {/*WEEKDATES*/}
        <ol className="calendar-grid" aria-label="Week days">
          {weekDates.map((date) => (
            <li key={date} className="calendar-day">
              {date}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Calendar;
