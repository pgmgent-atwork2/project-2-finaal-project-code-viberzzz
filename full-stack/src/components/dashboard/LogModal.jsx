import { useState } from "react";

export default function LogModal({ units, onClose, onSave }) {
  const [unitId, setUnitId]   = useState(units[0]?.id ?? "");
  const [notes, setNotes]     = useState("");

  function handleSave() {
    const unit = units.find(u => u.id === Number(unitId));
    onSave({ unit, notes, timestamp: new Date().toLocaleString() });
    onClose();
  }

  return (
    <>
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3>Log Entry</h3>
        <p>Record a new inspection or maintenance note.</p>

        <label>Filtration unit</label>
        <select value={unitId} onChange={e => setUnitId(e.target.value)}>
          {units.map(u => (
            <option key={u.id} value={u.id}>{u.naam}</option>
          ))}
        </select>

        <label>Notes</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Describe what was checked or done…"
        />

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save"   onClick={handleSave}>Save log</button>
        </div>
      </div>
    </div>
    </>
  );
}
