import { motion } from "framer-motion";

function LoginLaunchLoader() {
  return (
    <div
      className="loader-screen"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    >
      <motion.div
        animate={{
          y: [120, -220],
          scale: [1, 1.08, 0.92],
        }}
        transition={{
          duration: 2.8,
          ease: "easeInOut",
        }}
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "120px",
            background:
              "linear-gradient(180deg, rgba(216,140,106,0.7), transparent)",
            margin: "0 auto",
            filter: "blur(10px)",
          }}
        />

        <motion.div
          animate={{
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
          }}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#D88C6A,#B86A4E)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "2rem",
            boxShadow: "0 20px 60px rgba(184,106,78,0.35)",
          }}
        >
          🚀
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: "40px",
          fontSize: "3rem",
          fontWeight: 800,
        }}
      >
        Launching Experience
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "14px",
          color: "#7A5C52",
        }}
      >
        Entering GestureVerse AI...
      </motion.p>
    </div>
  );
}

export default LoginLaunchLoader;