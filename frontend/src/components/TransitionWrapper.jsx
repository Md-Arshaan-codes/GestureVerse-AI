import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

function TransitionWrapper({ children }) {
  return (
    <>
      <AnimatedBackground />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 50,
          filter: "blur(16px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 1.03,
          y: -40,
          filter: "blur(14px)",
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default TransitionWrapper;