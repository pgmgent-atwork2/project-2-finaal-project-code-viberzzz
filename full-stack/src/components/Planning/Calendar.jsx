import "../../css/Calendar.css";
import {
  startOfWeek,
  addDays,
  format,
  getWeek,
  subWeeks,
  addWeeks,
  isSameDay,
} from "date-fns";
import { useState, useMemo } from "react";

const Calendar = ({ items = [] }) => {
  const weekdays = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const startDate = startOfWeek(currentDate, {
    weekStartsOn: 1,
  });

  const weekDates = Array.from({ length: 7 }, (_, index) =>
    addDays(startDate, index),
  );

  const currentMonth = format(startDate, "MMMM yyyy");
  const currentWeek = getWeek(startDate);

  const tasksByDate = useMemo(() => {
    const map = {};
    items.forEach((item) => {
      if (item.status === "gepland" && item.start_datum) {
        const dateKey = format(new Date(item.start_datum), "yyyy-MM-dd");
        if (!map[dateKey]) {
          map[dateKey] = [];
        }
        map[dateKey].push(item);
      }
    });
    return map;
  }, [items]);

  return (
    <section className="calendar-section" aria-labelledby="calendar-heading">
      <h2 id="calendar-heading">Maintenance Calendar</h2>

      <div className="calendar-container">
        <header className="calendar-header">
          <button
            className="calendar-nav-btn"
            aria-label="Previous week"
            onClick={handlePreviousWeek}
          >
            ←
          </button>

          <div className="calendar-title">
            <h3>{currentMonth}</h3>
            <p>Week {currentWeek}</p>
          </div>

          <button
            className="calendar-nav-btn"
            aria-label="Next week"
            onClick={handleNextWeek}
          >
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
          {weekDates.map((date) => {
            const dateKey = format(date, "yyyy-MM-dd");
            const dayTasks = tasksByDate[dateKey] || [];
            return (
              <li key={dateKey} className="calendar-day">
                {format(date, "d")}

                {dayTasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <h4>{task.unit?.naam || "Unit"}</h4>
                    <p>{task.notitie}</p>
                  </div>
                ))}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Calendar;
