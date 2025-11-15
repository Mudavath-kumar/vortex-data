import { Navigation } from "@/components/Navigation";
import { StatsCards } from "@/components/StatsCards";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const revenueData = [
    { month: "Jan", revenue: 4200, target: 4000 },
    { month: "Feb", revenue: 3800, target: 4200 },
    { month: "Mar", revenue: 5100, target: 4500 },
    { month: "Apr", revenue: 4600, target: 4800 },
    { month: "May", revenue: 6200, target: 5200 },
    { month: "Jun", revenue: 7100, target: 6000 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "hsl(var(--primary))" },
    { name: "Fashion", value: 25, color: "hsl(var(--accent))" },
    { name: "Food", value: 20, color: "hsl(var(--secondary))" },
    { name: "Others", value: 20, color: "hsl(var(--muted))" },
  ];

  const activityData = [
    { time: "00:00", users: 120 },
    { time: "04:00", users: 80 },
    { time: "08:00", users: 280 },
    { time: "12:00", users: 420 },
    { time: "16:00", users: 380 },
    { time: "20:00", users: 250 },
  ];

  const metrics = [
    { title: "Total Revenue", value: "$125,430", change: "+12.5%", trend: "up", icon: DollarSign, color: "from-primary to-accent" },
    { title: "Active Users", value: "8,432", change: "+8.2%", trend: "up", icon: Users, color: "from-accent to-secondary" },
    { title: "Conversion Rate", value: "3.24%", change: "-2.1%", trend: "down", icon: Target, color: "from-secondary to-primary" },
    { title: "Avg. Session", value: "4m 32s", change: "+5.7%", trend: "up", icon: Activity, color: "from-primary to-secondary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-2 gradient-text">Dashboard Overview</h1>
            <p className="text-muted-foreground text-lg mb-8">Real-time insights and analytics</p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass p-6 hover:scale-105 transition-transform duration-300 border-border/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">{metric.title}</p>
                      <h3 className="text-3xl font-bold mb-2">{metric.value}</h3>
                      <div className={`flex items-center gap-1 text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {metric.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span>{metric.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center neon-glow`}>
                      <metric.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-6 border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Revenue vs Target
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#revenueGradient)" />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--accent))" strokeDasharray="5 5" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass p-6 border-border/50">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Category Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* User Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="glass p-6 border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                User Activity (24h)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={1}/>
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Bar dataKey="users" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;