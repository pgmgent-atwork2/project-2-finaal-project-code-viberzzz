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
import "../../css/PhChart.css";
const data = [
  { date: "Apr 20", ph: 7.8 },
  { date: "Apr 25", ph: 7.9 },
  { date: "Apr 30", ph: 8.0 },
  { date: "May 5", ph: 8.05 },
  { date: "May 10", ph: 8.06 },
  { date: "May 15", ph: 7.6 },
  { date: "May 16", ph: 7.8 },
];

export default function PHChart() {
  const [range, setRange] = useState("30days");
  const [unit, setUnit] = useState("dolphin");

  return (
    <div className="ph-chart-card">
      <div className="ph-chart-header">
        <h2 className="ph-chart-title">Average pH</h2>

        <div className="ph-chart-filters">
          <select
            className="ph-chart-select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="dolphin">Dolphin Tank</option>
            <option value="seal">Seal Zone</option>
            <option value="main">Main Filter</option>
            <option value="quarantine">Quarantine Unit</option>
          </select>

          <select
            className="ph-chart-select"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="30days">Last 30 days</option>
            <option value="3months">Last 3 months</option>
            <option value="1year">Last year</option>
          </select>
        </div>
      </div>

      <div className="ph-chart-content">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis domain={[6.5, 9]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="ph"
              stroke="#0891b2"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
