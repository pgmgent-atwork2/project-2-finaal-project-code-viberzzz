import StatusBadge from "./StatusBadge";
import WaterParameters from "./WaterParameters";

const UnitDetailModal = ({ unit, onClose, onViewDetails }) => {
  if (!unit) return null;

  const range = Array.isArray(unit.waarden_range)
    ? unit.waarden_range[0]
    : unit.waarden_range;

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
          <button className="btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitDetailModal;
