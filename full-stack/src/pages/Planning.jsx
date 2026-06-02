import { useEffect, useState } from "react";
import Calendar from "../components/Planning/Calendar";
import UpcomingMaintenance from "../components/Planning/UpcomingMaintenance";
import OverdueTasks from "../components/Planning/OverdueTasks";
import { getOnderhoudItems } from "../api/onderhoud/api.onderhoud.ts";
import "../css/Planning.css";

const Planning = () => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    overdue: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOnderhoudItems();
      console.log("Onderhoud items from API:", data);
      if (data) {
        setItems(data);
        calculateStats(data);
      }
    };
    fetchData();
  }, []);

  const calculateStats = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let pending = 0;
    let overdue = 0;
    let completed = 0;

    data.forEach((item) => {
      if (item.status === "voltooid") {
        completed++;
      } else if (item.status === "gepland") {
        const planDate = new Date(item.start_datum);
        planDate.setHours(0, 0, 0, 0);
        if (planDate < today) {
          overdue++;
        } else {
          pending++;
        }
      }
    });

    setStats({
      total: data.length,
      pending,
      overdue,
      completed,
    });
  };

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
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </li>
          <li className="stat-card">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </li>
          <li className="stat-card">
            <span className="stat-value">{stats.overdue}</span>
            <span className="stat-label">Urgent</span>
          </li>
          <li className="stat-card">
            <span className="stat-value">{stats.completed}</span>
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
      <Calendar items={items} />

      <div className="maintenance-overview">
        <UpcomingMaintenance items={items} />
        <OverdueTasks items={items} />
      </div>
    </main>
  );
};

export default Planning;
