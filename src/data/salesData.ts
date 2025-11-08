export interface SalesDataPoint {
  month: string;
  sales: number;
  revenue: number;
}

export const salesData2022: SalesDataPoint[] = [
  { month: "Jan", sales: 45000, revenue: 450000 },
  { month: "Feb", sales: 52000, revenue: 520000 },
  { month: "Mar", sales: 48000, revenue: 480000 },
  { month: "Apr", sales: 61000, revenue: 610000 },
  { month: "May", sales: 55000, revenue: 550000 },
  { month: "Jun", sales: 67000, revenue: 670000 },
  { month: "Jul", sales: 72000, revenue: 720000 },
  { month: "Aug", sales: 68000, revenue: 680000 },
  { month: "Sep", sales: 75000, revenue: 750000 },
  { month: "Oct", sales: 81000, revenue: 810000 },
  { month: "Nov", sales: 88000, revenue: 880000 },
  { month: "Dec", sales: 95000, revenue: 950000 },
];

export const salesData2023: SalesDataPoint[] = [
  { month: "Jan", sales: 98000, revenue: 980000 },
  { month: "Feb", sales: 105000, revenue: 1050000 },
  { month: "Mar", sales: 112000, revenue: 1120000 },
  { month: "Apr", sales: 108000, revenue: 1080000 },
  { month: "May", sales: 125000, revenue: 1250000 },
  { month: "Jun", sales: 132000, revenue: 1320000 },
  { month: "Jul", sales: 128000, revenue: 1280000 },
  { month: "Aug", sales: 145000, revenue: 1450000 },
  { month: "Sep", sales: 152000, revenue: 1520000 },
  { month: "Oct", sales: 148000, revenue: 1480000 },
  { month: "Nov", sales: 165000, revenue: 1650000 },
  { month: "Dec", sales: 178000, revenue: 1780000 },
];

export const salesData2024: SalesDataPoint[] = [
  { month: "Jan", sales: 182000, revenue: 1820000 },
  { month: "Feb", sales: 195000, revenue: 1950000 },
  { month: "Mar", sales: 201000, revenue: 2010000 },
  { month: "Apr", sales: 215000, revenue: 2150000 },
  { month: "May", sales: 228000, revenue: 2280000 },
  { month: "Jun", sales: 245000, revenue: 2450000 },
  { month: "Jul", sales: 252000, revenue: 2520000 },
  { month: "Aug", sales: 268000, revenue: 2680000 },
  { month: "Sep", sales: 281000, revenue: 2810000 },
  { month: "Oct", sales: 295000, revenue: 2950000 },
  { month: "Nov", sales: 312000, revenue: 3120000 },
  { month: "Dec", sales: 335000, revenue: 3350000 },
];

export const yearDataMap = {
  2022: salesData2022,
  2023: salesData2023,
  2024: salesData2024,
};

export type Year = keyof typeof yearDataMap;
