import "../../css/RecentLogsTable.css";

const RecentLogsTable = () => {
  const logs = [
    {
      id: 1,
      unit: "Dolfijnenbad A",
      ph: 8.1,
      temp: 14.6,
      chlorine: 0.62,
      status: "OK",
      date: "2026-05-26 08:12",
      technician: "Kobe Brynat",
    },
    {
      id: 2,
      unit: "Zeeleeuwen B",
      ph: 7.8,
      temp: 14.2,
      chlorine: 0.55,
      status: "Warning",
      date: "2026-05-26 07:55",
      technician: "Stephen Curry",
    },
    {
      id: 3,
      unit: "Orkanenbassin C",
      ph: 8.3,
      temp: 15.1,
      chlorine: 0.71,
      status: "OK",
      date: "2026-05-26 07:30",
      technician: "Kevin Durant",
    },
    {
      id: 4,
      unit: "Robbeneiland D",
      ph: 7.5,
      temp: 13.8,
      chlorine: 0.48,
      status: "Critical",
      date: "2026-05-25 22:14",
      technician: "LeBron James",
    },
    {
      id: 5,
      unit: "Dolfijnenbad A",
      ph: 8.0,
      temp: 14.5,
      chlorine: 0.6,
      status: "OK",
      date: "2026-05-25 20:02",
      technician: "Kyrie Irving",
    },
  ];
  return (
    <section className="logs-card">
      <h2>Recent Logs</h2>
      <p className="logs-subtitle">Latest sensor and technician readings</p>

      <table className="logs-table">
        <thead>
          <tr>
            <th>Unit</th>
            <th>pH</th>
            <th>Temp °C</th>
            <th>Chlorine</th>
            <th>Status</th>
            <th>Date</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.unit}</td>
              <td>{log.ph}</td>
              <td>{log.temp}</td>
              <td>{log.chlorine}</td>
              <td>
                <span className={`status-badge ${log.status.toLowerCase()}`}>
                  {log.status}
                </span>
              </td>{" "}
              <td>{log.date}</td>
              <td>{log.technician}</td>
            </tr>
          ))}
        </tbody>{" "}
      </table>
    </section>
  );
};

export default RecentLogsTable;
