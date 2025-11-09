import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { yearDataMap, Year } from "@/data/salesData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Target } from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const Analytics = () => {
  const [selectedYear, setSelectedYear] = useState<Year>(2024);
  const data = yearDataMap[selectedYear];

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgSales = Math.round(totalSales / data.length);
  const maxSales = Math.max(...data.map((item) => item.sales));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Advanced Analytics</h1>
              <p className="text-muted-foreground">Deep insights into sales performance</p>
            </div>

            <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(Number(val) as Year)}>
              <SelectTrigger className="w-40 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: "Total Sales", value: totalSales.toLocaleString(), icon: TrendingUp },
              { title: "Revenue", value: `$${(totalRevenue / 1000000).toFixed(1)}M`, icon: DollarSign },
              { title: "Avg Sales", value: avgSales.toLocaleString(), icon: Users },
              { title: "Peak Sales", value: maxSales.toLocaleString(), icon: Target },
            ].map((stat, idx) => (
              <Card key={idx} className="glass-strong border-border/50 neon-glow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-strong rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">Combined Analysis</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ComposedChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#A0AEC0" />
                  <YAxis stroke="#A0AEC0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(20, 20, 30, 0.95)",
                      border: "1px solid rgba(0, 217, 255, 0.3)",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#00D9FF" radius={[8, 8, 0, 0]} />
                  <Line type="monotone" dataKey="revenue" stroke="#9D4EDD" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-strong rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">Trend Analysis</h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#9D4EDD" stopOpacity={0.1} />
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
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#00D9FF"
                    strokeWidth={2}
                    fill="url(#salesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
