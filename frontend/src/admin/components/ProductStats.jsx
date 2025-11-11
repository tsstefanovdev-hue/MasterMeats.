import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect } from "react";
import { useProductStore } from "../../stores/useProductStore";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

const ProductStats = () => {
  const { products = [], fetchAllProducts, loading } = useProductStore();

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchAllProducts();
    }
  }, [fetchAllProducts, products]);

  // Prepare chart data safely
  const priceData = Array.isArray(products)
    ? products.map((p) => ({
        name: p.name || "Unnamed",
        price: p.pricePerKg || 0,
      }))
    : [];

  const categoryCount = Array.isArray(products)
    ? Object.entries(
        products.reduce((acc, p) => {
          const category = p.category || "Uncategorized";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <motion.div
      className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-accent/10 backdrop-blur-md border border-accent/30 rounded-3xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Bar Chart */}
      <div className="bg-accent/20 backdrop-blur-md p-6 rounded-2xl border border-accent/30 shadow-lg">
        <h3 className="text-lg font-semibold text-secondary mb-4">
          Product Price Overview
        </h3>
        {loading && products.length === 0 ? (
          <p className="text-secondary/60 text-center py-8">Loading chart...</p>
        ) : priceData.length === 0 ? (
          <p className="text-secondary/60 text-center py-8">
            No products available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 20, 0.8)",
                  border: "1px solid #333",
                  borderRadius: "0.75rem",
                }}
              />
              <Bar dataKey="price" fill="#34d399" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Pie Chart */}
      <div className="bg-accent/20 backdrop-blur-md p-6 rounded-2xl border border-accent/30 shadow-lg">
        <h3 className="text-lg font-semibold text-secondary mb-4">
          Products per Category
        </h3>
        {loading && products.length === 0 ? (
          <p className="text-secondary/60 text-center py-8">Loading chart...</p>
        ) : categoryCount.length === 0 ? (
          <p className="text-secondary/60 text-center py-8">
            No category data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryCount}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryCount.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20, 20, 20, 0.8)",
                  border: "1px solid #333",
                  borderRadius: "0.75rem",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default ProductStats;
