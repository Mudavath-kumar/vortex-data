import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart3, Users } from "lucide-react";
import { SalesDataPoint } from "@/data/salesData";

interface StatsCardsProps {
  data: SalesDataPoint[];
}

export const StatsCards = ({ data }: StatsCardsProps) => {
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgSales = Math.round(totalSales / data.length);
  const growth = data.length > 1 
    ? Math.round(((data[data.length - 1].sales - data[0].sales) / data[0].sales) * 100)
    : 0;

  const stats = [
    {
      title: "Total Sales",
      value: totalSales.toLocaleString(),
      icon: BarChart3,
      gradient: "from-cyan-500 to-blue-500",
      glow: "neon-glow",
    },
    {
      title: "Total Revenue",
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      gradient: "from-purple-500 to-pink-500",
      glow: "neon-glow-accent",
    },
    {
      title: "Average Sales",
      value: avgSales.toLocaleString(),
      icon: Users,
      gradient: "from-pink-500 to-rose-500",
      glow: "neon-glow-hot",
    },
    {
      title: "Growth Rate",
      value: `${growth}%`,
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-500",
      glow: "neon-glow",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className={`glass-strong rounded-2xl p-6 ${stat.glow} cursor-pointer transition-all`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-sm text-muted-foreground mb-2">{stat.title}</h3>
          <p className="text-3xl font-bold gradient-text">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};
