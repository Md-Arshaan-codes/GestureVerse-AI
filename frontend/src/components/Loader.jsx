import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="loader-screen">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="loader-ring"
      />

      <motion.div
        animate={{
          y: [50, -120],
          scale: [1, 1.08, 0.95],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="loader-rocket"
      >
        🚀
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="loader-title"
      >
        GestureVerse AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="loader-subtitle"
      >
        Launching intelligent experience...
      </motion.p>
    </div>
  );
}

export default Loader;