import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import "../../css/OverdueTasks.css";

const OverdueTasks = ({ items = [] }) => {
  const overdueTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return items
      .filter((item) => {
        if (item.status !== "gepland") return false;
        const planDate = new Date(item.start_datum);
        planDate.setHours(0, 0, 0, 0);
        return planDate < today;
      })
      .sort((a, b) => new Date(a.start_datum) - new Date(b.start_datum));
  }, [items]);

  return (
    <section className="overdue-tasks">
      <div className="overdue-header">
        <div>
          <h3>Overdue tasks</h3>
          <p>Require immediate attention</p>
        </div>

        <span className="overdue-count">{overdueTasks.length}</span>
      </div>

      {overdueTasks.length === 0 ? (
        <p style={{ padding: "20px", color: "#64748b" }}>
          No overdue tasks - great job!
        </p>
      ) : (
        overdueTasks.map((item) => (
          <article key={item.id} className="overdue-item">
            <h4>{item.notitie}</h4>

            <p className="overdue-unit">{item.unit?.naam || "Unknown Unit"}</p>

            <footer className="overdue-meta">
              <span role="status" aria-live="polite">
                Overdue by{" "}
                {formatDistanceToNow(new Date(item.start_datum), {
                  addSuffix: false,
                })}
              </span>
            </footer>
          </article>
        ))
      )}
    </section>
  );
};

export default OverdueTasks;
