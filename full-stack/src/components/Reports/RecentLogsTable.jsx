import { useState, useEffect } from "react";
import { getRapporten } from "../../api/reports/api.onderhoud.ts";
import "../../css/RecentLogsTable.css";

const RecentLogsTable = ({ filters }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const data = await getRapporten();
      if (data) {
        setLogs(data);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    // Apply filters whenever logs or filters change
    let filtered = [...logs];

    // Filter by time period
    if (filters.timePeriod !== "all") {
      const daysAgo = parseInt(filters.timePeriod);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      
      filtered = filtered.filter(log => 
        new Date(log.gemaakt_op) >= cutoffDate
      );
    }

    // Filter by unit
    if (filters.selectedUnit !== "all") {
      filtered = filtered.filter(log => log.unit_id === filters.selectedUnit);
    }

    setFilteredLogs(filtered);
  }, [logs, filters]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('nl-NL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'actief':
        return 'ok';
      case 'onderhoud_nodig':
        return 'warning';
      case 'storing':
        return 'critical';
      default:
        return '';
    }
  };

  return (
    <section className="logs-card">
      <h2>Recent Logs</h2>
      <p className="logs-subtitle">Latest sensor and technician readings ({filteredLogs.length} logs)</p>

      <table className="logs-table">
        <thead>
          <tr>
            <th>Unit</th>
            <th>pH</th>
            <th>Temp °C</th>
            <th>Waterniveau</th>
            <th>Microbiologie</th>
            <th>Zoutgehalte</th>
            <th>Status</th>
            <th>Datum</th>
            <th>Technicus</th>
            <th>Notities</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>Geen logs beschikbaar</td>
            </tr>
          ) : (
            filteredLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.titel}</td>
                <td>{log.ph.toFixed(1)}</td>
                <td>{log.temperatuur.toFixed(1)}</td>
                <td>{log.waterniveau.toFixed(1)}</td>
                <td>{log.microbiologie.toFixed(1)}</td>
                <td>{log.zoutgehalte.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(log.status)}`}>
                    {log.status}
                  </span>
                </td>
                <td>{formatDate(log.gemaakt_op)}</td>
                <td>{log.technicus?.naam || 'Onbekend'}</td>
                <td>{log.notities || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default RecentLogsTable;
