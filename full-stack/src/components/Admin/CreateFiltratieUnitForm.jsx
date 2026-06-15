import { useState, useEffect } from "react";
import { createFiltratieUnit, filtratieUnitUpdate } from "../../api/filtratie_unit/api.filtratie_unit.ts";
import "../../css/CreateFiltratieUnitForm.css";

export default function CreateFiltratieUnitForm({ onSuccess, onCancel, editUnit = null }) {
  const isEditMode = !!editUnit;
  
  const [formData, setFormData] = useState({
    naam: "",
    locatie: "",
    status: "actief",
    ph_min: 6.8,
    ph_max: 8.2,
    water_level_min: 0.5,
    water_level_max: 1.5,
    temperatuur_min: 20,
    temperatuur_max: 28,
    zoutgehalte_min: 1.020,
    zoutgehalte_max: 1.026,
    microbiologie_max: 100,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Populate form when editing
  useEffect(() => {
    if (editUnit) {
      const range = Array.isArray(editUnit.waarden_range) 
        ? editUnit.waarden_range[0] 
        : editUnit.waarden_range;

      setFormData({
        naam: editUnit.naam || "",
        locatie: editUnit.locatie || "",
        status: editUnit.status || "actief",
        ph_min: range?.ph_min || 6.8,
        ph_max: range?.ph_max || 8.2,
        water_level_min: range?.water_level_min || 0.5,
        water_level_max: range?.water_level_max || 1.5,
        temperatuur_min: range?.temperatuur_min || 20,
        temperatuur_max: range?.temperatuur_max || 28,
        zoutgehalte_min: range?.zoutgehalte_min || 1.020,
        zoutgehalte_max: range?.zoutgehalte_max || 1.026,
        microbiologie_max: range?.microbiologie_max || 100,
      });
    }
  }, [editUnit]);

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
      const waardenRangeData = {
        ph_min: parseFloat(formData.ph_min),
        ph_max: parseFloat(formData.ph_max),
        water_level_min: parseFloat(formData.water_level_min),
        water_level_max: parseFloat(formData.water_level_max),
        temperatuur_min: parseFloat(formData.temperatuur_min),
        temperatuur_max: parseFloat(formData.temperatuur_max),
        zoutgehalte_min: parseFloat(formData.zoutgehalte_min),
        zoutgehalte_max: parseFloat(formData.zoutgehalte_max),
        microbiologie_max: parseFloat(formData.microbiologie_max),
      };

      let result;
      
      if (isEditMode) {
        // Update existing unit
        result = await filtratieUnitUpdate(editUnit.id, {
          naam: formData.naam,
          locatie: formData.locatie,
          status: formData.status,
          waardenRange: waardenRangeData,
        });
      } else {
        // Create new unit
        result = await createFiltratieUnit({
          naam: formData.naam,
          locatie: formData.locatie,
          status: formData.status,
          waardenRange: waardenRangeData,
        });
      }

      if (result) {
        onSuccess && onSuccess(result);
      } else {
        setError(isEditMode ? "Failed to update filtratie unit" : "Failed to create filtratie unit");
      }
    } catch (err) {
      console.error(`Error ${isEditMode ? "updating" : "creating"} filtratie unit:`, err);
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-unit-form-overlay">
      <div className="create-unit-form-container">
        <div className="create-unit-form-header">
          <h2>{isEditMode ? "Filtratie Unit Bewerken" : "Nieuwe Filtratie Unit"}</h2>
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
                <label htmlFor="water_level_min">Water Level Min (m) *</label>
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
                <label htmlFor="water_level_max">Water Level Max (m) *</label>
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
              {isSubmitting 
                ? (isEditMode ? "Opslaan..." : "Aanmaken...") 
                : (isEditMode ? "Wijzigingen Opslaan" : "Unit Aanmaken")
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
