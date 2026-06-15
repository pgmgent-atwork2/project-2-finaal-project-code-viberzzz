import StatusBadge from "./StatusBadge";
import WaterParameters from "./WaterParameters";

const UnitDetailModal = ({ unit, onClose, onViewDetails, onDelete, onEdit, isAdmin }) => {
  if (!unit) return null;

  const range = Array.isArray(unit.waarden_range)
    ? unit.waarden_range[0]
    : unit.waarden_range;

  const handleDelete = () => {
    if (window.confirm(`Weet je zeker dat je "${unit.naam}" wilt verwijderen? Dit kan niet ongedaan worden gemaakt.`)) {
      onDelete(unit.id);
    }
  };

  const handleEdit = () => {
    onEdit(unit);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{unit.naam}</h3>
        <p>{unit.locatie}</p>
        <StatusBadge status={unit.status} />
        <p style={{ marginTop: 14 }}>
          Last inspection:{" "}
          {unit.latestWaarde?.gemeten_op
            ? new Date(unit.latestWaarde.gemeten_op).toLocaleString("nl-NL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : "N/A"}
        </p>

        {range && <WaterParameters waarde={unit.latestWaarde} range={range} />}

        <div className="modal-actions" style={{ marginTop: 20 }}>
          <button className="btn-save" onClick={() => onViewDetails(unit)}>
            View Details
          </button>
          {isAdmin && (
            <>
              <button 
                className="btn-edit" 
                onClick={handleEdit}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "#2563eb"}
                onMouseOut={(e) => e.target.style.background = "#3b82f6"}
              >
                Edit Unit
              </button>
              <button 
                className="btn-delete" 
                onClick={handleDelete}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => e.target.style.background = "#b91c1c"}
                onMouseOut={(e) => e.target.style.background = "#dc2626"}
              >
                Delete Unit
              </button>
            </>
          )}
          <button className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailModal;
