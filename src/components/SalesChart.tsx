import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SalesDataPoint } from "@/data/salesData";

interface SalesChartProps {
  data: SalesDataPoint[];
  chartType: "bar" | "line" | "pie";
}

const COLORS = ["#00D9FF", "#9D4EDD", "#FF006E", "#FFBE0B", "#8338EC", "#3A86FF"];

export const SalesChart = ({ data, chartType }: SalesChartProps) => {
  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#9D4EDD" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" opacity={0.3} />
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 30, 0.95)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Legend />
              <Bar dataKey="sales" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00D9FF" />
                  <stop offset="100%" stopColor="#9D4EDD" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" opacity={0.3} />
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 30, 0.95)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: "#00D9FF", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="sales"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 30, 0.95)",
                  border: "1px solid rgba(0, 217, 255, 0.3)",
                  borderRadius: "12px",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      key={chartType}
      className="glass-strong rounded-3xl p-8 h-[600px]"
    >
      <h2 className="text-3xl font-bold mb-6 gradient-text">
        Sales Performance
      </h2>
      {renderChart()}
    </motion.div>
  );
};
