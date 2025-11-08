import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Year } from "@/data/salesData";
import { BarChart3, LineChart, PieChart } from "lucide-react";

interface DashboardControlsProps {
  selectedYear: Year;
  onYearChange: (year: Year) => void;
  chartType: "bar" | "line" | "pie";
  onChartTypeChange: (type: "bar" | "line" | "pie") => void;
  filterValue: number;
  onFilterChange: (value: number) => void;
}

export const DashboardControls = ({
  selectedYear,
  onYearChange,
  chartType,
  onChartTypeChange,
  filterValue,
  onFilterChange,
}: DashboardControlsProps) => {
  const years: Year[] = [2022, 2023, 2024];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="glass-strong rounded-3xl p-8 mb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Year Selector */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-foreground">
            Select Year
          </Label>
          <div className="flex gap-3">
            {years.map((year) => (
              <motion.div key={year} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => onYearChange(year)}
                  variant={selectedYear === year ? "default" : "secondary"}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedYear === year
                      ? "neon-glow bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {year}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chart Type Toggle */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold text-foreground">
            Chart Type
          </Label>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onChartTypeChange("bar")}
                variant={chartType === "bar" ? "default" : "secondary"}
                className={`px-6 py-3 rounded-xl transition-all ${
                  chartType === "bar"
                    ? "neon-glow bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onChartTypeChange("line")}
                variant={chartType === "line" ? "default" : "secondary"}
                className={`px-6 py-3 rounded-xl transition-all ${
                  chartType === "line"
                    ? "neon-glow bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <LineChart className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onChartTypeChange("pie")}
                variant={chartType === "pie" ? "default" : "secondary"}
                className={`px-6 py-3 rounded-xl transition-all ${
                  chartType === "pie"
                    ? "neon-glow bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <PieChart className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Filter Input */}
        <div className="space-y-3">
          <Label htmlFor="filter" className="text-lg font-semibold text-foreground">
            Min Sales Filter
          </Label>
          <Input
            id="filter"
            type="number"
            value={filterValue}
            onChange={(e) => onFilterChange(Number(e.target.value))}
            className="bg-secondary/50 border-border/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary transition-all"
            placeholder="0"
          />
        </div>
      </div>
    </motion.div>
  );
};
