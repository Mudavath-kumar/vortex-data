import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero3D } from "@/components/Hero3D";
import { StatsCards } from "@/components/StatsCards";
import { yearDataMap, Year } from "@/data/salesData";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, LineChart as LineIcon, PieChart as PieIcon, TrendingUp, Activity, Download, Zap, Target, Globe } from "lucide-react";
import { exportToCSV, exportToPDF } from "@/utils/exportUtils";
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

  const handleExportCSV = () => {
    exportToCSV(filteredData, `sales-data-${selectedYear}`);
  };

  const handleExportPDF = () => {
    exportToPDF("dashboard-content", `dashboard-${selectedYear}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
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
              <div className="flex gap-2">
                <Button onClick={handleExportCSV} variant="secondary" className="flex-1 rounded-xl">
                  <Download className="w-5 h-5 mr-2" />
                  CSV
                </Button>
                <Button onClick={handleExportPDF} variant="secondary" className="flex-1 rounded-xl">
                  <Download className="w-5 h-5 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <StatsCards data={filteredData} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          key={chartType}
          id="dashboard-content"
          className="glass-strong rounded-3xl p-8 h-[600px] mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">Sales Performance</h2>
          {renderChart()}
        </motion.div>

        {/* New Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-time Analytics",
                description: "Get instant insights with live data updates and real-time monitoring of your sales metrics."
              },
              {
                icon: Target,
                title: "Predictive Insights",
                description: "Leverage AI-powered predictions to forecast trends and make data-driven decisions."
              },
              {
                icon: Globe,
                title: "Global Scale",
                description: "Track performance across multiple regions and markets with comprehensive global analytics."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="glass-strong rounded-3xl p-8 text-center neon-glow cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "Vortex Analytics transformed how we understand our sales data. The insights are incredible!",
                author: "Sarah Johnson",
                role: "CEO, TechCorp"
              },
              {
                quote: "The real-time dashboards and predictive analytics have been game-changing for our business.",
                author: "Michael Chen",
                role: "VP Sales, InnovateCo"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                className="glass-strong rounded-3xl p-8 neon-glow-accent"
              >
                <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass-strong rounded-3xl p-12 text-center neon-glow"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Ready to Transform Your Analytics?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of companies using Vortex Analytics to make better decisions
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-xl neon-glow text-lg px-8">
              Get Started Free
            </Button>
            <Button size="lg" variant="secondary" className="rounded-xl text-lg px-8">
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
