import { useState, useEffect } from "react";
import { getFiltratieUnits } from "../../api/filtratie_unit/api.filtratie_unit.ts";
import "../../css/ReportsHeader.css";

const ReportsHeader = ({ onFilterChange, onExportPdf }) => {
  const [timePeriod, setTimePeriod] = useState("7");
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      const data = await getFiltratieUnits();
      if (data) {
        setUnits(data);
      }
    };
    fetchUnits();
  }, []);

  useEffect(() => {
    // Notify parent when filters change
    if (onFilterChange) {
      onFilterChange({ timePeriod, selectedUnit });
    }
  }, [timePeriod, selectedUnit, onFilterChange]); // onFilterChange is now stable (memoized in parent)

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  return (
    <section className="reports-header">
      <div className="reports-header-left">
        <h1>Reports & Analytics</h1>

        <p>
          Trends, water quality and maintenance activity across all
          installations.
        </p>
      </div>

      <div className="reports-header-right">
        <select value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="90">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>

        <select value={selectedUnit} onChange={handleUnitChange}>
          <option value="all">All Installations</option>
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.naam}
            </option>
          ))}
        </select>

        <button onClick={onExportPdf}>Export PDF</button>
      </div>
    </section>
  );
};

export default ReportsHeader;
