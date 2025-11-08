import { useState, useMemo, useEffect } from "react";
import { Hero3D } from "@/components/Hero3D";
import { StatsCards } from "@/components/StatsCards";
import { yearDataMap, Year, SalesDataPoint } from "@/data/salesData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, LineChart as LineIcon, PieChart as PieIcon, TrendingUp, Activity, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#00D9FF", "#9D4EDD", "#FF006E", "#FFBE0B", "#8338EC", "#3A86FF"];

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<Year>(2024);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "area" | "radar">("bar");
  const [filterValue, setFilterValue] = useState<number>(0);

  const salesData = yearDataMap[selectedYear];

  const filteredData = useMemo(() => {
    return salesData.filter((item) => item.sales >= filterValue);
  }, [salesData, filterValue]);

  const renderChart = () => {
    const tooltipStyle = {
      backgroundColor: "rgba(20, 20, 30, 0.95)",
      border: "1px solid rgba(0, 217, 255, 0.3)",
      borderRadius: "12px",
    };

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity={1} />
                  <stop offset="100%" stopColor="#9D4EDD" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" opacity={0.3} />
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Bar dataKey="sales" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" opacity={0.3} />
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#00D9FF"
                strokeWidth={3}
                dot={{ fill: "#00D9FF", r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="sales"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {filteredData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#9D4EDD" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2A3E" opacity={0.3} />
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#00D9FF"
                strokeWidth={2}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "radar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={filteredData}>
              <PolarGrid stroke="#2A2A3E" />
              <PolarAngleAxis dataKey="month" stroke="#A0AEC0" />
              <PolarRadiusAxis stroke="#A0AEC0" />
              <Radar
                name="Sales"
                dataKey="sales"
                stroke="#00D9FF"
                fill="#00D9FF"
                fillOpacity={0.5}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero3D />

      <div id="dashboard-content" className="relative z-10 container mx-auto px-4 py-16">
        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-strong rounded-3xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Label className="text-lg font-semibold text-foreground">Select Year</Label>
              <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(Number(val) as Year)}>
                <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-foreground">Chart Type</Label>
              <div className="flex gap-2">
                {[
                  { type: "bar" as const, icon: BarChart3 },
                  { type: "line" as const, icon: LineIcon },
                  { type: "pie" as const, icon: PieIcon },
                  { type: "area" as const, icon: TrendingUp },
                  { type: "radar" as const, icon: Activity },
                ].map(({ type, icon: Icon }) => (
                  <Button
                    key={type}
                    onClick={() => setChartType(type)}
                    variant={chartType === type ? "default" : "secondary"}
                    size="icon"
                    className={`rounded-xl ${
                      chartType === type ? "neon-glow bg-primary" : "bg-secondary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="filter" className="text-lg font-semibold text-foreground">
                Min Sales Filter
              </Label>
              <Input
                id="filter"
                type="number"
                value={filterValue}
                onChange={(e) => setFilterValue(Number(e.target.value))}
                className="bg-secondary/50 border-border/50 rounded-xl"
                placeholder="0"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-semibold text-foreground">Actions</Label>
              <Button variant="secondary" className="w-full rounded-xl">
                <Download className="w-5 h-5 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </motion.div>

        <StatsCards data={filteredData} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          key={chartType}
          className="glass-strong rounded-3xl p-8 h-[600px]"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">Sales Performance</h2>
          {renderChart()}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
