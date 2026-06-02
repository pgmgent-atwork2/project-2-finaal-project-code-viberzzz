import { useState } from "react";

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

const maintenanceData = {
  "7days": [
    { day: "Mon", completed: 12, pending: 3 },
    { day: "Tue", completed: 9, pending: 4 },
    { day: "Wed", completed: 15, pending: 2 },
    { day: "Thu", completed: 11, pending: 4 },
    { day: "Fri", completed: 18, pending: 1 },
    { day: "Sat", completed: 7, pending: 4 },
    { day: "Sun", completed: 5, pending: 4 },
  ],

  "30days": [
    { day: "W1", completed: 48, pending: 8 },
    { day: "W2", completed: 52, pending: 6 },
    { day: "W3", completed: 47, pending: 10 },
    { day: "W4", completed: 55, pending: 5 },
  ],

  "90days": [
    { day: "Jan", completed: 185, pending: 28 },
    { day: "Feb", completed: 201, pending: 23 },
    { day: "Mar", completed: 214, pending: 19 },
  ],
};
const MaintenanceActivityChart = () => {
  const [range, setRange] = useState("7days");

  const currentData = maintenanceData[range];

  return (
    <section className="maintenance-card">
      <div className="maintenance-header">
        <h2>Maintenance Activity</h2>

        <select
          className="maintenance-filter"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="30days">Last 90 Days</option>
        </select>
      </div>

      <div className="maintenance-chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={currentData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="completed" stackId="tasks" fill="#22c55e" />
            <Bar dataKey="pending" stackId="tasks" fill="#f59e0b" />{" "}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MaintenanceActivityChart;
