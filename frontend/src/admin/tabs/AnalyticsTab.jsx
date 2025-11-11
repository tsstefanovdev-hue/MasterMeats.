import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../lib/axios.js";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";
import AnalyticsCard from "./AnalyticsCard";
import ProductStats from "..components/ProductStats.jsx";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[40vh] text-xl font-semibold text-secondary animate-pulse">
        Loading analytics...
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 text-secondary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={FaUsers}
          accent="emerald"
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={FaBoxOpen}
          accent="lime"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={FaShoppingCart}
          accent="cyan"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`€${analyticsData.totalRevenue.toLocaleString()}`}
          icon={FaDollarSign}
          accent="orange"
        />
      </div>

      <motion.div
        className="bg-accent/20 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-accent/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="h-48 flex justify-center items-center text-secondary/70">
          <ProductStats />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsTab;
