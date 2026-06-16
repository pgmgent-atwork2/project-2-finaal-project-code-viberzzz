import { useEffect, useState, useMemo } from "react";
import Calendar from "../components/Planning/Calendar";
import UpcomingMaintenance from "../components/Planning/UpcomingMaintenance";
import OverdueTasks from "../components/Planning/OverdueTasks";
import UpdateOnderhoudModal from "../components/Planning/UpdateOnderhoudModal";
import NewPlanningEntry from "../components/Planning/NewPlanningEntry";
import {
  getOnderhoudItems,
  updateOnderhoudStatus,
} from "../api/onderhoud/api.onderhoud.ts";
import { useAuth } from "../context/auth";
import "../css/Planning.css";

const Planning = () => {
  const { auth } = useAuth();
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    technician: "",
    installation: "",
    status: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOnderhoudItems();
      if (data) setItems(data);
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const counts = {
      total: items.length,
      pending: 0,
      overdue: 0,
      completed: 0,
    };

    items.forEach((item) => {
      if (item.status === "voltooid") {
        counts.completed++;
      } else if (item.status === "gepland") {
        const planDate = new Date(item.start_datum);
        planDate.setHours(0, 0, 0, 0);
        counts[planDate < today ? "overdue" : "pending"]++;
      }
    });
    return counts;
  }, [items]);

  const getUniqueItems = (key, subKey) => {
    const map = new Map();
    items.forEach((item) => {
      if (item[key]?.[subKey] && !map.has(item[key][subKey])) {
        map.set(item[key][subKey], item[key]);
      }
    });
    return Array.from(map.values());
  };

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const lowerSearch = filters.search.toLowerCase();
        const matchSearch =
          !filters.search ||
          item.notitie?.toLowerCase().includes(lowerSearch) ||
          item.unit?.naam?.toLowerCase().includes(lowerSearch) ||
          item.gebruiker?.naam?.toLowerCase().includes(lowerSearch);

        return (
          matchSearch &&
          (!filters.technician || item.gebruiker?.id === filters.technician) &&
          (!filters.installation || item.unit?.id === filters.installation) &&
          (!filters.status || item.status === filters.status)
        );
      }),
    [items, filters],
  );

  const handleUpdateStatus = async (id, newStatus) => {
    await updateOnderhoudStatus(id, newStatus);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const handleEntryCreated = async () => {
    const data = await getOnderhoudItems();
    if (data) setItems(data);
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
          <li className="stat-card stat-card--pending">
            <span className="stat-value">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </li>
          <li className="stat-card stat-card--urgent">
            <span className="stat-value">{stats.overdue}</span>
            <span className="stat-label">Urgent</span>
          </li>
          <li className="stat-card stat-card--completed">
            <span className="stat-value">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </li>
        </ul>
      </section>

      <section className="search-container">
        <input
          type="search"
          id="task-search"
          placeholder="Search task, unit or technician..."
          className="search-input"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          aria-label="Search tasks"
        />
        <fieldset className="filters-row">
          <select
            id="filter-technician"
            value={filters.technician}
            onChange={(e) =>
              setFilters({ ...filters, technician: e.target.value })
            }
            aria-label="Technician"
          >
            <option value="">All technicians</option>
            {getUniqueItems("gebruiker", "id").map((tech) => (
              <option key={tech.id} value={tech.id}>
                {tech.naam}
              </option>
            ))}
          </select>

          <select
            id="filter-installation"
            value={filters.installation}
            onChange={(e) =>
              setFilters({ ...filters, installation: e.target.value })
            }
            aria-label="Installation"
          >
            <option value="">All installations</option>
            {getUniqueItems("unit", "id").map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.naam}
              </option>
            ))}
          </select>

          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            aria-label="Status"
          >
            <option value="">All statuses</option>
            <option value="gepland">Scheduled</option>
            <option value="voltooid">Completed</option>
            <option value="overgeslagen">Skipped</option>
          </select>
        </fieldset>
      </section>

      <Calendar
        items={filteredItems}
        onItemClick={(item) => {
          setSelectedItem(item);
          setShowModal(true);
        }}
      />

      <div className="maintenance-overview">
        <UpcomingMaintenance
          items={filteredItems}
          onItemClick={(item) => {
            setSelectedItem(item);
            setShowModal(true);
          }}
        />
        <OverdueTasks
          items={filteredItems}
          onItemClick={(item) => {
            setSelectedItem(item);
            setShowModal(true);
          }}
        />
      </div>

      {showModal && (
        <UpdateOnderhoudModal
          item={selectedItem}
          onClose={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
          onUpdate={handleUpdateStatus}
        />
      )}

      <NewPlanningEntry
        onEntryCreated={handleEntryCreated}
        isVisible={
          auth?.user?.rol === "supervisor" || auth?.user?.rol === "admin"
        }
      />
    </main>
  );
};

export default Planning;
