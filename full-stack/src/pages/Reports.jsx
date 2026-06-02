import ReportsHeader from "../components/Reports/ReportsHeader";
import RecentLogsTable from "../components/Reports/RecentLogsTable";
import PHTrendChart from "../components/Reports/PHTrendChart";
function Reports() {
  return (
    <div>
      <ReportsHeader />
      <RecentLogsTable />
      <PHTrendChart />
    </div>
  );
}

export default Reports;
