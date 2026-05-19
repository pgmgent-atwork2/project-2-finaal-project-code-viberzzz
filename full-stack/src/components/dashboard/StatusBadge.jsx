const STATUS_META = {
  Active:      { color: "#16a34a", bg: "#dcfce7", dot: "#22c55e" },
  Malfunction: { color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
  Maintenance: { color: "#d97706", bg: "#fef3c7", dot: "#f59e0b" },
};

export default function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.Active;
  return (
    <>   
      <span
        className="status-badge"
        style={{ background: meta.bg, color: meta.color }}
      >
        <span className="status-dot" style={{ background: meta.dot }} />
        {status}
      </span>
    </>
  );
}
