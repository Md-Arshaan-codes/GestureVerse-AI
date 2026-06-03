import { motion } from "framer-motion";

function AnimatedBackground() {
  return (
    <div className="ambient-bg">
      <motion.div
        className="ambient-orb orb-1"
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="ambient-orb orb-2"
        animate={{
          x: [0, -70, 0],
          y: [0, 90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="ambient-orb orb-3"
        animate={{
          x: [0, 40, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default AnimatedBackground;