import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../../css/WaterQualityChart.css";

const waterQualityData = [
  {
    day: "Mon",
    turbidity: 0.5,
    chlorine: 0.6,
    oxygen: 8.0,
  },
  {
    day: "Tue",
    turbidity: 0.6,
    chlorine: 0.6,
    oxygen: 8.0,
  },
  {
    day: "Wed",
    turbidity: 0.6,
    chlorine: 0.5,
    oxygen: 7.8,
  },
  {
    day: "Thu",
    turbidity: 0.5,
    chlorine: 0.5,
    oxygen: 7.5,
  },
  {
    day: "Fri",
    turbidity: 0.6,
    chlorine: 0.6,
    oxygen: 7.4,
  },
  {
    day: "Sat",
    turbidity: 0.6,
    chlorine: 0.6,
    oxygen: 7.6,
  },
  {
    day: "Sun",
    turbidity: 0.5,
    chlorine: 0.5,
    oxygen: 8.0,
  },
];

const PHTrendChart = () => {
  return (
    <section className="water-quality-card">
      <div className="water-quality-header">
        <h2>Water Quality</h2>
        <select className="water-quality-filter">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      <div className="water-quality-chart-content">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={waterQualityData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" tickLine={false} axisLine={false} />

            <YAxis domain={[7.5, 8.5]} tickLine={false} axisLine={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="turbidity"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="chlorine"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="oxygen"
              stroke="#22c55e"
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
