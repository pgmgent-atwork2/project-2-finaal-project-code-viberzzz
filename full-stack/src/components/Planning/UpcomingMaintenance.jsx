import "../../css/UpcomingMaintenance.css";

const UpcomingMaintenance = () => {
  const upcomingTasks = [
    {
      id: 1,
      unit: "Dolfijnenbad A",
      task: "Sand filter rinse",
      technician: "Lazarus The 3rd",
      date: "2026-05-26",
      time: "08:30",
    },
    {
      id: 2,
      unit: "Shark Tank",
      task: "Pump maintenance",
      technician: "Sarah Johnson",
      date: "2026-05-27",
      time: "09:00",
    },
    {
      id: 3,
      unit: "Seal Pool",
      task: "UV system check",
      technician: "Tom Jacobs",
      date: "2026-05-28",
      time: "10:15",
    },
  ];
  return (
    <section className="upcoming-maintenance">
      <div className="maintenance-header">
        <div>
          <h3>Upcoming maintenance</h3>
          <p>Next scheduled tasks across all units</p>
        </div>
        <span className="maintenance-count">{upcomingTasks.length}</span>{" "}
      </div>

      {upcomingTasks.map((task) => (
        <article key={task.id} className="maintenance-item">
          <div className="maintenance-item-content">
            <h4>{task.unit}</h4>

            <p>{task.task}</p>

            <footer className="maintenance-meta">
              <span>{task.technician}</span>

              <time dateTime={task.date}>{task.date}</time>

              <time dateTime={task.time}>{task.time}</time>
            </footer>
          </div>
        </article>
      ))}
    </section>
  );
};

export default UpcomingMaintenance;
