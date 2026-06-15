import { useState, useEffect } from "react";
import { createOnderhoud } from "../../api/onderhoud/api.onderhoud.ts";
import { API } from "../../lib/supabaseClient";
import "../../css/NewPlanningEntry.css";

const NewPlanningEntry = ({ onEntryCreated = () => {}, isVisible = true }) => {
  const [formData, setFormData] = useState({
    unit_id: "",
    toegewezen_aan: "",
    start_datum: "",
    frequentie: "",
    end_date: "",
    notitie: "",
  });

  const [units, setUnits] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch units
        const { data: unitsData, error: unitsError } = await API.from(
          "filtratie_unit",
        ).select("id, naam");
        if (unitsError) throw unitsError;
        setUnits(unitsData || []);

        // Fetch users
        const { data: usersData, error: usersError } = await API.from(
          "gebruiker",
        ).select("id, naam");
        if (usersError) throw usersError;
        setUsers(usersData || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load units and users");
      }
    };

    if (showForm) {
      fetchData();
    }
  }, [showForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!formData.unit_id || !formData.toegewezen_aan || !formData.start_datum || !formData.frequentie) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      const result = await createOnderhoud({
        unit_id: formData.unit_id,
        toegewezen_aan: formData.toegewezen_aan,
        start_datum: formData.start_datum,
        frequentie: formData.frequentie,
        notitie: formData.notitie,
        ...(formData.end_date && { end_date: formData.end_date }),
      });

      if (result) {
        setFormData({
          unit_id: "",
          toegewezen_aan: "",
          start_datum: "",
          frequentie: "",
          end_date: "",
          notitie: "",
        });
        setShowForm(false);
        onEntryCreated();
      } else {
        setError("Failed to create maintenance entry");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <section className="new-planning-entry">
      {!showForm ? (
        <button
          className="new-entry-btn"
          onClick={() => setShowForm(true)}
          aria-label="Create new maintenance entry"
        >
          + New Planning Entry
        </button>
      ) : (
        <div className="new-entry-form-container">
          <h3>Create New Maintenance Entry</h3>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="new-entry-form">
            <div className="form-group">
              <label htmlFor="unit_id">Unit *</label>
              <select
                id="unit_id"
                name="unit_id"
                value={formData.unit_id}
                onChange={handleChange}
                required
              >
                <option value="">Select a unit</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.naam}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="toegewezen_aan">Assigned Technician *</label>
              <select
                id="toegewezen_aan"
                name="toegewezen_aan"
                value={formData.toegewezen_aan}
                onChange={handleChange}
                required
              >
                <option value="">Select a technician</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.naam}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="start_datum">Start Date *</label>
              <input
                type="date"
                id="start_datum"
                name="start_datum"
                value={formData.start_datum}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="frequentie">Frequency *</label>
              <select
                id="frequentie"
                name="frequentie"
                value={formData.frequentie}
                onChange={handleChange}
                required
              >
                <option value="none">None</option>
                <option value="dagelijks">Daily</option>
                <option value="wekelijks">Weekly</option>
                <option value="maandelijks">Monthly</option>
              </select>
            </div>

            {formData.frequentie && (
              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="notitie">Notes</label>
              <textarea
                id="notitie"
                name="notitie"
                value={formData.notitie}
                onChange={handleChange}
                placeholder="Add any notes about this maintenance task"
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowForm(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Entry"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default NewPlanningEntry;
