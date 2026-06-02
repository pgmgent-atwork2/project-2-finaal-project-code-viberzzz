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

const temperatureData = [
  {
    day: "Mon",
    dolphin: 14.6,
    seaLions: 13.8,
    stormPool: 15.1,
  },
  {
    day: "Tue",
    dolphin: 14.8,
    seaLions: 14.0,
    stormPool: 15.2,
  },
  {
    day: "Wed",
    dolphin: 14.7,
    seaLions: 13.9,
    stormPool: 15.0,
  },
  {
    day: "Thu",
    dolphin: 14.5,
    seaLions: 13.7,
    stormPool: 14.9,
  },
  {
    day: "Fri",
    dolphin: 14.4,
    seaLions: 13.6,
    stormPool: 14.8,
  },
  {
    day: "Sat",
    dolphin: 14.3,
    seaLions: 13.5,
    stormPool: 14.7,
  },
  {
    day: "Sun",
    dolphin: 14.6,
    seaLions: 13.8,
    stormPool: 15.0,
  },
];

const PHTrendChart = () => {
  return (
    <section className="chart-card">
      <div className="chart-header">
        <h2>Temperature Trend</h2>

        <select className="chart-filter">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <div className="reports-ph-chart">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <YAxis domain={[13, 16]} tickLine={false} axisLine={false} />

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
