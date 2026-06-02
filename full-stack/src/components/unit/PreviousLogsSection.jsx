import "../../css/previousLogs.css";

function formatDate(date) {
  return new Date(date).toLocaleString("nl-NL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function isValueInRange(value, min, max) {
  if (value === null || value === undefined) return true;
  return value >= min && value <= max;
}

export default function PreviousLogsSection({ logs, range }) {
  if (!logs || logs.length <= 1) {
    return null;
  }

  // Skip the first (latest) log entry
  const previousLogs = logs.slice(1);

  return (
    <div className="previous-logs-section">
      <h2 className="previous-logs-title">Previous data</h2>

      <div className="logs-table-wrapper">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>pH</th>
              <th>Temperatuur (°C)</th>
              <th>Water Level</th>
              <th>Zoutgehalte (ppt)</th>
              <th>Microbiologie</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {previousLogs.map((log, index) => (
              <tr key={log.id || index} className="log-row">
                <td className="log-date">{formatDate(log.gemeten_op)}</td>
                <td className={`log-value ${range && log.ph !== null && !isValueInRange(log.ph, range.ph_min, range.ph_max) ? "out-of-range" : ""}`}>
                  {log.ph !== null ? log.ph.toFixed(2) : "—"}
                </td>
                <td className={`log-value ${range && log.temperatuur !== null && !isValueInRange(log.temperatuur, range.temperatuur_min, range.temperatuur_max) ? "out-of-range" : ""}`}>
                  {log.temperatuur !== null ? log.temperatuur.toFixed(1) : "—"}
                </td>
                <td className={`log-value ${range && log.water_level !== null && !isValueInRange(log.water_level, range.water_level_min, range.water_level_max) ? "out-of-range" : ""}`}>
                  {log.water_level !== null ? log.water_level.toFixed(2) : "—"}
                </td>
                <td className={`log-value ${range && log.zoutgehalte !== null && !isValueInRange(log.zoutgehalte, range.zoutgehalte_min, range.zoutgehalte_max) ? "out-of-range" : ""}`}>
                  {log.zoutgehalte !== null ? log.zoutgehalte.toFixed(1) : "—"}
                </td>
                <td className={`log-value ${range && log.microbiologie !== null && log.microbiologie > range.microbiologie_max ? "out-of-range" : ""}`}>
                  {log.microbiologie !== null ? log.microbiologie.toFixed(2) : "—"}
                </td>
                <td className="log-notes">{log.notitie || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
