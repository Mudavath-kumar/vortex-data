-- Create sales_data table
CREATE TABLE IF NOT EXISTS public.sales_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  year INTEGER NOT NULL,
  month TEXT NOT NULL,
  sales INTEGER NOT NULL,
  revenue INTEGER NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  region TEXT NOT NULL DEFAULT 'Global',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sales_data ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (since this is a demo dashboard)
CREATE POLICY "Sales data is viewable by everyone" 
ON public.sales_data 
FOR SELECT 
USING (true);

-- Create policy for public insert (for demo purposes)
CREATE POLICY "Sales data can be inserted by everyone" 
ON public.sales_data 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_sales_year ON public.sales_data(year);
CREATE INDEX idx_sales_month ON public.sales_data(month);
CREATE INDEX idx_sales_category ON public.sales_data(category);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_sales_data_updated_at
BEFORE UPDATE ON public.sales_data
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for 2022
INSERT INTO public.sales_data (year, month, sales, revenue, category, region) VALUES
(2022, 'Jan', 45000, 450000, 'Electronics', 'North America'),
(2022, 'Feb', 52000, 520000, 'Electronics', 'North America'),
(2022, 'Mar', 48000, 480000, 'Electronics', 'North America'),
(2022, 'Apr', 61000, 610000, 'Electronics', 'North America'),
(2022, 'May', 55000, 550000, 'Electronics', 'North America'),
(2022, 'Jun', 67000, 670000, 'Electronics', 'North America'),
(2022, 'Jul', 72000, 720000, 'Electronics', 'North America'),
(2022, 'Aug', 68000, 680000, 'Electronics', 'North America'),
(2022, 'Sep', 75000, 750000, 'Electronics', 'North America'),
(2022, 'Oct', 81000, 810000, 'Electronics', 'North America'),
(2022, 'Nov', 88000, 880000, 'Electronics', 'North America'),
(2022, 'Dec', 95000, 950000, 'Electronics', 'North America');

-- Insert sample data for 2023
INSERT INTO public.sales_data (year, month, sales, revenue, category, region) VALUES
(2023, 'Jan', 98000, 980000, 'Electronics', 'North America'),
(2023, 'Feb', 105000, 1050000, 'Electronics', 'North America'),
(2023, 'Mar', 112000, 1120000, 'Electronics', 'North America'),
(2023, 'Apr', 108000, 1080000, 'Electronics', 'North America'),
(2023, 'May', 125000, 1250000, 'Electronics', 'North America'),
(2023, 'Jun', 132000, 1320000, 'Electronics', 'North America'),
(2023, 'Jul', 128000, 1280000, 'Electronics', 'North America'),
(2023, 'Aug', 145000, 1450000, 'Electronics', 'North America'),
(2023, 'Sep', 152000, 1520000, 'Electronics', 'North America'),
(2023, 'Oct', 148000, 1480000, 'Electronics', 'North America'),
(2023, 'Nov', 165000, 1650000, 'Electronics', 'North America'),
(2023, 'Dec', 178000, 1780000, 'Electronics', 'North America');

-- Insert sample data for 2024
INSERT INTO public.sales_data (year, month, sales, revenue, category, region) VALUES
(2024, 'Jan', 182000, 1820000, 'Electronics', 'North America'),
(2024, 'Feb', 195000, 1950000, 'Electronics', 'North America'),
(2024, 'Mar', 201000, 2010000, 'Electronics', 'North America'),
(2024, 'Apr', 215000, 2150000, 'Electronics', 'North America'),
(2024, 'May', 228000, 2280000, 'Electronics', 'North America'),
(2024, 'Jun', 245000, 2450000, 'Electronics', 'North America'),
(2024, 'Jul', 252000, 2520000, 'Electronics', 'North America'),
(2024, 'Aug', 268000, 2680000, 'Electronics', 'North America'),
(2024, 'Sep', 281000, 2810000, 'Electronics', 'North America'),
(2024, 'Oct', 295000, 2950000, 'Electronics', 'North America'),
(2024, 'Nov', 312000, 3120000, 'Electronics', 'North America'),
(2024, 'Dec', 335000, 3350000, 'Electronics', 'North America');