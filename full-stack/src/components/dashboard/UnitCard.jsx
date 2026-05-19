import StatusBadge from "./StatusBadge";

export default function UnitCard({ unit, onClick }) {
  return (
    <>
    <div className="unit-card" onClick={() => onClick(unit)}>
      <div className="unit-card-top">
        <span className="unit-name" style={{ marginRight: "1rem" }}>{unit.naam}</span>
        <StatusBadge status={unit.status} />
      </div>
      <div className="unit-location">{unit.locatie}</div>
      <div className="unit-inspection">Last inspection: {unit.latestWaarde?.gemeten_op ? new Date(unit.latestWaarde.gemeten_op).toLocaleString('nl-NL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }) : 'N/A'}</div>
    </div>
    </>
  );
}
