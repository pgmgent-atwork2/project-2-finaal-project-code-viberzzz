import "../../css/OverdueTasks.css";
const OverdueTasks = () => {
  const overdueTasks = [
    {
      id: 1,
      title: "Sand Filter Inspection",
      unit: "Dolphin Pool A",
      overdueDays: 3,
    },
    {
      id: 2,
      title: "Pump Maintenance",
      unit: "Shark Tank",
      overdueDays: 5,
    },
    {
      id: 3,
      title: "UV System Check",
      unit: "Seal Pool",
      overdueDays: 2,
    },
  ];

  return (
    <section className="overdue-tasks">
      <div className="overdue-header">
        <div>
          <h3>Overdue tasks</h3>
          <p>Require immediate attention</p>
        </div>
        <span className="overdue-count">{overdueTasks.length}</span>{" "}
      </div>
      {overdueTasks.map((task) => (
        <article key={task.id} className="overdue-item">
          <h4>{task.title}</h4>

          <p className="overdue-unit">{task.unit}</p>

          <div className="overdue-meta">
            <span role="status" aria-live="polite">
              Overdue by {task.overdueDays} days
            </span>
          </div>
        </article>
      ))}
    </section>
  );
};

export default OverdueTasks;
