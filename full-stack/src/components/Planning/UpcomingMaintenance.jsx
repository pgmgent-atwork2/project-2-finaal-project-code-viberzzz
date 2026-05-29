import "../../css/UpcomingMaintenance.css";

const UpcomingMaintenance = () => {
  return (
    <section className="upcoming-maintenance">
      <div className="maintenance-header">
        <div>
          <h3>Upcoming maintenance</h3>
          <p>Next scheduled tasks across all units</p>
        </div>

        <span className="maintenance-count">5</span>
      </div>

      <article className="maintenance-item">
        <div className="maintenance-item-content">
          <h4>Dolfijnenbad A</h4>
          <p>Sand filter rinse</p>
          <footer className="maintenance-meta">
            <span>Lazarus The 3rd</span>
            <time dateTime="2026-05-26">2026-05-26</time>
            <time dateTime="08:30">08:30</time>
          </footer>
        </div>
      </article>
    </section>
  );
};

export default UpcomingMaintenance;
