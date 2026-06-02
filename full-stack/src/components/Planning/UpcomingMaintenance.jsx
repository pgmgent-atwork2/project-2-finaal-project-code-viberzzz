import { useMemo } from "react";
import { format } from "date-fns";
import "../../css/UpcomingMaintenance.css";

const UpcomingMaintenance = ({ items = [] }) => {
  const upcomingItems = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return items
      .filter((item) => {
        if (item.status !== "gepland") return false;
        const planDate = new Date(item.start_datum);
        planDate.setHours(0, 0, 0, 0);
        return planDate >= today;
      })
      .sort((a, b) => new Date(a.start_datum) - new Date(b.start_datum))
      .slice(0, 5);
  }, [items]);

  return (
    <section className="upcoming-maintenance">
      <div className="maintenance-header">
        <div>
          <h3>Upcoming maintenance</h3>
          <p>Next scheduled tasks across all units</p>
        </div>

        <span className="maintenance-count">{upcomingItems.length}</span>
      </div>

      {upcomingItems.length === 0 ? (
        <p style={{ padding: "20px", color: "#64748b" }}>
          No upcoming maintenance scheduled
        </p>
      ) : (
        upcomingItems.map((item) => (
          <article key={item.id} className="maintenance-item">
            <div className="maintenance-item-content">
              <h4>{item.unit?.naam || "Unknown Unit"}</h4>
              <p>{item.notitie}</p>
              <footer className="maintenance-meta">
                <span>{item.gebruiker?.naam || "Unassigned"}</span>
                <time dateTime={item.start_datum}>
                  {format(new Date(item.start_datum), "yyyy-MM-dd")}
                </time>
              </footer>
            </div>
          </article>
        ))
      )}
    </section>
  );
};

export default UpcomingMaintenance;
