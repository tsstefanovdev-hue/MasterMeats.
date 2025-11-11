import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value, icon: Icon, accent }) => (
  <motion.div
    className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-${accent}-500/70 to-${accent}-700/70 shadow-md border border-${accent}-400/30 p-6 flex flex-col justify-between h-32 text-white`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.03 }}
  >
    <div className="flex justify-between items-center z-10">
      <div>
        <p className="text-sm uppercase font-semibold opacity-80">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <Icon className="text-white/90 w-10 h-10 opacity-80" />
    </div>
  </motion.div>
);

export default AnalyticsCard;
