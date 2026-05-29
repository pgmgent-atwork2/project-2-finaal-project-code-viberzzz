import Calendar from "../components/Planning/Calendar";
import "../css/Planning.css";

const Planning = () => {
  return (
    <main className="planning-page">
      <header>
        <h1>Maintenance Planning</h1>
        <p>
          Schedule, dispatch and track maintenance for all filtration
          installations.
        </p>
      </header>

      <section aria-label="Task statistics">
        <ul className="stats-grid">
          <li className="stat-card">
            <span className="stat-value">9</span>
            <span className="stat-label">Total Tasks</span>
          </li>
          <li className="stat-card">
            <span className="stat-value">3</span>
            <span className="stat-label">Pending</span>
          </li>
          <li className="stat-card">
            <span className="stat-value">2</span>
            <span className="stat-label">Urgent</span>
          </li>
          <li className="stat-card">
            <span className="stat-value">2</span>
            <span className="stat-label">Completed</span>
          </li>
        </ul>
      </section>

      <section className="search-container">
        <label htmlFor="task-search" className="sr-only">
          Search tasks
        </label>
        <input
          type="search"
          id="task-search"
          placeholder="Search task, unit or technician..."
          className="search-input"
        />
        <fieldset className="filters-row">
          <legend className="sr-only">Filter tasks</legend>

          <label htmlFor="filter-technician" className="sr-only">
            Technician
          </label>
          <select id="filter-technician">
            <option>All technicians</option>
          </select>

          <label htmlFor="filter-installation" className="sr-only">
            Installation
          </label>
          <select id="filter-installation">
            <option>All installations</option>
          </select>

          <label htmlFor="filter-status" className="sr-only">
            Status
          </label>
          <select id="filter-status">
            <option>All statuses</option>
          </select>
        </fieldset>
      </section>
      <Calendar />
    </main>
  );
};

export default Planning;
