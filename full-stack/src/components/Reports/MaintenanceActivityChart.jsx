import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../../css/MaintenanceActivityChart.css";

const maintenanceData = [
  {
    day: "Mon",
    completed: 12,
    pending: 3,
  },
  {
    day: "Tue",
    completed: 9,
    pending: 4,
  },
  {
    day: "Wed",
    completed: 15,
    pending: 2,
  },
  {
    day: "Thu",
    completed: 11,
    pending: 4,
  },
  {
    day: "Fri",
    completed: 18,
    pending: 1,
  },
  {
    day: "Sat",
    completed: 7,
    pending: 4,
  },
  {
    day: "Sun",
    completed: 5,
    pending: 4,
  },
];
const PHTrendChart = () => {
  return (
    <section className="maintenance-card">
      <div className="maintenance-header">
        <h2>Maintenance Activity</h2>

        <select className="maintenance-filter">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <div className="maintenance-chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="completed" stackId="tasks" fill="#22c55e" />
              <Bar dataKey="pending" stackId="tasks" fill="#f59e0b" />{" "}
            </BarChart>
          </ResponsiveContainer>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PHTrendChart;
