import ReportsHeader from "../components/Reports/ReportsHeader";
import RecentLogsTable from "../components/Reports/RecentLogsTable";
import PHTrendChart from "../components/Reports/PHTrendChart";
import TemperatureTrendChart from "../components/Reports/TemperatureTrendChart";
import MaintenanceActivityChart from "../components/Reports/MaintenanceActivityChart";
import WaterQualityChart from "../components/Reports/WaterQualityChart";

function Reports() {
  return (
    <div>
      <ReportsHeader />
      <RecentLogsTable />
      <PHTrendChart />
      <TemperatureTrendChart />
      <MaintenanceActivityChart />
      <WaterQualityChart />
    </div>
  );
}

export default Reports;
