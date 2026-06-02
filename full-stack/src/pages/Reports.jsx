import ReportsHeader from "../components/Reports/ReportsHeader";
import RecentLogsTable from "../components/Reports/RecentLogsTable";
import PHTrendChart from "../components/Reports/PHTrendChart";
import TemperatureTrendChart from "../components/Reports/TemperatureTrendChart";
function Reports() {
  return (
    <div>
      <ReportsHeader />
      <RecentLogsTable />
      <PHTrendChart />
      <TemperatureTrendChart />
    </div>
  );
}

export default Reports;
