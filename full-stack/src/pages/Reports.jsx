import { useState, useCallback } from "react";
import ReportsHeader from "../components/Reports/ReportsHeader";
import RecentLogsTable from "../components/Reports/RecentLogsTable";
import PHTrendChart from "../components/Reports/PHTrendChart";
import TemperatureTrendChart from "../components/Reports/TemperatureTrendChart";
import MaintenanceActivityChart from "../components/Reports/MaintenanceActivityChart";
import WaterQualityChart from "../components/Reports/WaterQualityChart";
import "../css/Reports.css";

function Reports() {
  const [filters, setFilters] = useState({
    timePeriod: "7",
    selectedUnit: "all"
  });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <main className="reports-page">
      <ReportsHeader onFilterChange={handleFilterChange} />
      <RecentLogsTable filters={filters} />
      <section className="report-charts" aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="sr-only">
          Report Charts
        </h2>
        <PHTrendChart />
        <TemperatureTrendChart />
        <MaintenanceActivityChart />
        <WaterQualityChart />
      </section>
    </main>
  );
}

export default Reports;
