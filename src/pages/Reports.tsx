import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingUp } from "lucide-react";
import { yearDataMap, Year } from "@/data/salesData";
import { exportToCSV, exportToPDF, exportToJSON } from "@/utils/exportUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Reports = () => {
  const [selectedYear, setSelectedYear] = useState<Year>(2024);
  const data = yearDataMap[selectedYear];

  const handleExportCSV = () => {
    exportToCSV(data, `sales-report-${selectedYear}`);
  };

  const handleExportJSON = () => {
    exportToJSON(data, `sales-report-${selectedYear}`);
  };

  const handleExportPDF = () => {
    exportToPDF("report-content", `sales-report-${selectedYear}`);
  };

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
              <h1 className="text-4xl font-bold gradient-text mb-2">Sales Reports</h1>
              <p className="text-muted-foreground">Detailed sales data and insights</p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleExportCSV} className="rounded-xl neon-glow">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button onClick={handleExportJSON} variant="secondary" className="rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                JSON
              </Button>
              <Button onClick={handleExportPDF} variant="secondary" className="rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <FileText className="w-6 h-6 text-primary" />
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
          </div>

          <div id="report-content" className="glass-strong rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Sales Data {selectedYear}</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, idx) => {
                  const growth = idx > 0 
                    ? ((item.sales - data[idx - 1].sales) / data[idx - 1].sales * 100).toFixed(1)
                    : "0.0";
                  return (
                    <TableRow key={item.month}>
                      <TableCell className="font-medium">{item.month}</TableCell>
                      <TableCell className="text-right">{item.sales.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${(item.revenue / 1000000).toFixed(2)}M</TableCell>
                      <TableCell className="text-right">{growth}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
