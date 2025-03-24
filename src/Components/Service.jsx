import { motion } from "framer-motion";

export default function ServiceUnderConstruction() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Service Under Construction</h1>
        <p className="text-lg md:text-xl text-gray-400">We are working hard to bring something amazing!</p>
      </motion.div>
    </div>
  );
}
