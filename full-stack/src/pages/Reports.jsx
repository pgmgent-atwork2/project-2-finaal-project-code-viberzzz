import { useState, useCallback } from "react";
import ReportsHeader from "../components/Reports/ReportsHeader";
import RecentLogsTable from "../components/Reports/RecentLogsTable";
import PHTrendChart from "../components/Reports/PHTrendChart";
import TemperatureTrendChart from "../components/Reports/TemperatureTrendChart";
import MaintenanceActivityChart from "../components/Reports/MaintenanceActivityChart";
import WaterQualityChart from "../components/Reports/WaterQualityChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../css/Reports.css";

function Reports() {
  const [filters, setFilters] = useState({
    timePeriod: "7",
    selectedUnit: "all",
  });

  const [filteredLogs, setFilteredLogs] = useState([]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Seapark Reports Export", 14, 20);

    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

    autoTable(doc, {
      startY: 40,

      head: [
        [
          "Unit",
          "pH",
          "Temp",
          "Water",
          "Micro",
          "Salt",
          "Status",
          "Date",
          "Technician",
        ],
      ],

      body: filteredLogs.map((log) => [
        log.titel,
        log.ph.toFixed(1),
        log.temperatuur.toFixed(1),
        log.waterniveau.toFixed(1),
        log.microbiologie.toFixed(1),
        log.zoutgehalte.toFixed(2),
        log.status,
        new Date(log.gemaakt_op).toLocaleString("nl-BE"),
        log.technicus?.naam || "Unknown",
      ]),
    });

    doc.save("seapark-report.pdf");
  };

  return (
    <main className="reports-page">
      <ReportsHeader
        onFilterChange={handleFilterChange}
        onExportPdf={handleExportPdf}
      />{" "}
      <RecentLogsTable filters={filters} onLogsFiltered={setFilteredLogs} />
      <section className="report-charts" aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="charts-heading">
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
