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
import { Link } from "react-router-dom";
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
              <Link key={idx} to="/features">
                <motion.div
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
              </Link>
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
              <Link key={idx} to="/about">
                <motion.div
                  initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  className="glass-strong rounded-3xl p-8 neon-glow-accent cursor-pointer hover:scale-105 transition-transform"
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
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Simple, Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                features: ["Up to 10 users", "Basic analytics", "Email support", "1GB storage"],
                highlighted: false
              },
              {
                name: "Professional",
                price: "$99",
                period: "/month",
                features: ["Up to 100 users", "Advanced analytics", "Priority support", "10GB storage", "Custom reports"],
                highlighted: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                features: ["Unlimited users", "Full analytics suite", "24/7 support", "Unlimited storage", "API access", "Dedicated manager"],
                highlighted: false
              }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + idx * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`glass-strong rounded-3xl p-8 ${
                  plan.highlighted ? "neon-glow border-2 border-primary" : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="text-center mb-4">
                    <span className="px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-center mb-2">{plan.name}</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full rounded-xl ${plan.highlighted ? "neon-glow" : ""}`}
                  variant={plan.highlighted ? "default" : "secondary"}
                  asChild
                >
                  <Link to={plan.name === "Enterprise" ? "/contact" : "/pricing"}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mb-12"
        >
          <div className="glass-strong rounded-3xl p-12">
            <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Active Users", value: "50K+" },
                { label: "Countries", value: "120+" },
                { label: "Data Points", value: "1B+" },
                { label: "Uptime", value: "99.9%" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + idx * 0.05, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Seamless Integrations</h2>
          <div className="glass-strong rounded-3xl p-8">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
              {["Salesforce", "HubSpot", "Slack", "Google Analytics", "Shopify", "Stripe"].map((integration, idx) => (
                <Link key={idx} to="/integrations">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.95 + idx * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-full aspect-square rounded-2xl bg-secondary/50 flex items-center justify-center font-semibold text-sm text-center p-3 cursor-pointer hover:bg-secondary transition-colors"
                  >
                    {integration}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold gradient-text mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How does the free trial work?",
                a: "Start with a 14-day free trial, no credit card required. Access all features and cancel anytime."
              },
              {
                q: "Can I change my plan later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "Is my data secure?",
                a: "We use enterprise-grade encryption and security measures. Your data is always protected and backed up."
              },
              {
                q: "Do you offer custom solutions?",
                a: "Yes, our Enterprise plan includes custom solutions tailored to your specific business needs."
              }
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                className="glass-strong rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="glass-strong rounded-3xl p-12 text-center neon-glow mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Ready to Transform Your Analytics?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of companies using Vortex Analytics to make better decisions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-xl neon-glow text-lg px-8" asChild>
              <Link to="/pricing">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-xl text-lg px-8" asChild>
              <Link to="/contact">Schedule Demo</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="glass-strong rounded-3xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold gradient-text">Vortex</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Next-generation analytics platform for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2024 Vortex Analytics. All rights reserved.
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
