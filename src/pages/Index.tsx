import { useState, useMemo } from "react";
import { Hero3D } from "@/components/Hero3D";
import { DashboardControls } from "@/components/DashboardControls";
import { SalesChart } from "@/components/SalesChart";
import { StatsCards } from "@/components/StatsCards";
import { yearDataMap, Year } from "@/data/salesData";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState<Year>(2024);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [filterValue, setFilterValue] = useState<number>(0);

  const filteredData = useMemo(() => {
    const data = yearDataMap[selectedYear];
    return data.filter((item) => item.sales >= filterValue);
  }, [selectedYear, filterValue]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with 3D */}
      <Hero3D />

      {/* Dashboard Section */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Controls */}
        <DashboardControls
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          chartType={chartType}
          onChartTypeChange={setChartType}
          filterValue={filterValue}
          onFilterChange={setFilterValue}
        />

        {/* Stats Cards */}
        <StatsCards data={filteredData} />

        {/* Chart */}
        <SalesChart data={filteredData} chartType={chartType} />
      </div>
    </div>
  );
};

export default Index;
