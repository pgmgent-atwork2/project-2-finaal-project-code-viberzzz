import "../../css/OverdueTasks.css";
const OverdueTasks = () => {
  return (
    <section className="overdue-tasks">
      <div className="overdue-header">
        <div>
          <h3>Overdue tasks</h3>
          <p>Require immediate attention</p>
        </div>

        <span className="overdue-count">2</span>
      </div>
      <article className="overdue-item">
        <h4>Sand Filter Inspection</h4>

        <p className="overdue-unit">Dolphin Pool A</p>

        <footer className="overdue-meta">
          <span role="status" aria-live="polite">
            Overdue by 3 days
          </span>
        </footer>
      </article>
    </section>
  );
};

export default OverdueTasks;
