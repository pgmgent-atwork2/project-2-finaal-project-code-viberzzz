import { useState } from "react";
import { createFiltratieUnit } from "../../api/filtratie_unit/api.filtratie_unit.ts";
import "../../css/CreateFiltratieUnitForm.css";

export default function CreateFiltratieUnitForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    naam: "",
    locatie: "",
    status: "actief",
    ph_min: 6.8,
    ph_max: 8.2,
    water_level_min: 50,
    water_level_max: 150,
    temperatuur_min: 20,
    temperatuur_max: 28,
    zoutgehalte_min: 1.020,
    zoutgehalte_max: 1.026,
    microbiologie_max: 100,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const unitData = {
        naam: formData.naam,
        locatie: formData.locatie,
        status: formData.status,
        waardenRange: {
          ph_min: parseFloat(formData.ph_min),
          ph_max: parseFloat(formData.ph_max),
          water_level_min: parseFloat(formData.water_level_min),
          water_level_max: parseFloat(formData.water_level_max),
          temperatuur_min: parseFloat(formData.temperatuur_min),
          temperatuur_max: parseFloat(formData.temperatuur_max),
          zoutgehalte_min: parseFloat(formData.zoutgehalte_min),
          zoutgehalte_max: parseFloat(formData.zoutgehalte_max),
          microbiologie_max: parseFloat(formData.microbiologie_max),
        },
      };

      const result = await createFiltratieUnit(unitData);

      if (result) {
        onSuccess && onSuccess(result);
      } else {
        setError("Failed to create filtratie unit");
      }
    } catch (err) {
      console.error("Error creating filtratie unit:", err);
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-unit-form-overlay">
      <div className="create-unit-form-container">
        <div className="create-unit-form-header">
          <h2>Nieuwe Filtratie Unit</h2>
          <button className="close-btn" onClick={onCancel} type="button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-unit-form">
          {error && <div className="error-message">{error}</div>}

          <section className="form-section">
            <h3>Unit Informatie</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="naam">Naam *</label>
                <input
                  type="text"
                  id="naam"
                  name="naam"
                  value={formData.naam}
                  onChange={handleChange}
                  required
                  placeholder="Bijv. Dolfijnenbad A"
                />
              </div>

              <div className="form-group">
                <label htmlFor="locatie">Locatie *</label>
                <input
                  type="text"
                  id="locatie"
                  name="locatie"
                  value={formData.locatie}
                  onChange={handleChange}
                  required
                  placeholder="Bijv. Sector Noord · Hal 3"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="actief">Actief</option>
                <option value="onderhoud_nodig">Onderhoud Nodig</option>
                <option value="storing">Storing</option>
              </select>
            </div>
          </section>

          <section className="form-section">
            <h3>Waarden Range</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ph_min">pH Min *</label>
                <input
                  type="number"
                  id="ph_min"
                  name="ph_min"
                  value={formData.ph_min}
                  onChange={handleChange}
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ph_max">pH Max *</label>
                <input
                  type="number"
                  id="ph_max"
                  name="ph_max"
                  value={formData.ph_max}
                  onChange={handleChange}
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="temperatuur_min">Temperatuur Min (°C) *</label>
                <input
                  type="number"
                  id="temperatuur_min"
                  name="temperatuur_min"
                  value={formData.temperatuur_min}
                  onChange={handleChange}
                  step="0.1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="temperatuur_max">Temperatuur Max (°C) *</label>
                <input
                  type="number"
                  id="temperatuur_max"
                  name="temperatuur_max"
                  value={formData.temperatuur_max}
                  onChange={handleChange}
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="water_level_min">Water Level Min (cm) *</label>
                <input
                  type="number"
                  id="water_level_min"
                  name="water_level_min"
                  value={formData.water_level_min}
                  onChange={handleChange}
                  step="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="water_level_max">Water Level Max (cm) *</label>
                <input
                  type="number"
                  id="water_level_max"
                  name="water_level_max"
                  value={formData.water_level_max}
                  onChange={handleChange}
                  step="1"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zoutgehalte_min">Zoutgehalte Min *</label>
                <input
                  type="number"
                  id="zoutgehalte_min"
                  name="zoutgehalte_min"
                  value={formData.zoutgehalte_min}
                  onChange={handleChange}
                  step="0.001"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="zoutgehalte_max">Zoutgehalte Max *</label>
                <input
                  type="number"
                  id="zoutgehalte_max"
                  name="zoutgehalte_max"
                  value={formData.zoutgehalte_max}
                  onChange={handleChange}
                  step="0.001"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="microbiologie_max">Microbiologie Max *</label>
              <input
                type="number"
                id="microbiologie_max"
                name="microbiologie_max"
                value={formData.microbiologie_max}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Aanmaken..." : "Unit Aanmaken"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
