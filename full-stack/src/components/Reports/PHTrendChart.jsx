import { useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../../css/PHTrendChart.css";

const phData = {
  "7days": [
    { day: "Mon", dolphin: 8.1, seaLions: 7.9, stormPool: 8.2 },
    { day: "Tue", dolphin: 8.0, seaLions: 7.8, stormPool: 8.1 },
    { day: "Wed", dolphin: 8.2, seaLions: 8.0, stormPool: 8.3 },
    { day: "Thu", dolphin: 8.1, seaLions: 7.9, stormPool: 8.2 },
    { day: "Fri", dolphin: 8.3, seaLions: 8.1, stormPool: 8.4 },
    { day: "Sat", dolphin: 8.2, seaLions: 8.0, stormPool: 8.3 },
    { day: "Sun", dolphin: 8.1, seaLions: 7.9, stormPool: 8.2 },
  ],

  "30days": [
    { day: "W1", dolphin: 8.0, seaLions: 7.8, stormPool: 8.1 },
    { day: "W2", dolphin: 8.2, seaLions: 7.9, stormPool: 8.3 },
    { day: "W3", dolphin: 8.1, seaLions: 8.0, stormPool: 8.2 },
    { day: "W4", dolphin: 8.3, seaLions: 8.1, stormPool: 8.4 },
  ],

  "90days": [
    { day: "Jan", dolphin: 8.0, seaLions: 7.8, stormPool: 8.1 },
    { day: "Feb", dolphin: 8.1, seaLions: 7.9, stormPool: 8.2 },
    { day: "Mar", dolphin: 8.3, seaLions: 8.0, stormPool: 8.4 },
  ],
};

const PHTrendChart = () => {
  const [range, setRange] = useState("7days");

  const currentData = phData[range];
  return (
    <section className="chart-card">
      <div className="chart-header">
        <h2>pH Trend</h2>

        <select
          className="ph-filter"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      <div className="reports-ph-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <YAxis domain={[7.5, 8.5]} tickLine={false} axisLine={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="dolphin"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="seaLions"
              stroke="#10b981"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="stormPool"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default PHTrendChart;
