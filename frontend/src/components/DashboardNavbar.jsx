
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function DashboardNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Mode 1", path: "/dashboard/mode1" },
    { name: "Mode 2", path: "/dashboard/mode2" },
    { name: "Mode 3", path: "/dashboard/mode3" },
    { name: "Contact", path: "/dashboard/contact" },
    { name: "Logout", path: "/login" },
  ];

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: "24px",
          left: "32px",
          width: "640px",
          maxWidth: "90vw",
          height: "82px",
          zIndex: 9999,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.45)",
          boxShadow: "0 15px 45px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0 22px",
          boxSizing: "border-box",
        }}
      >
        {/* HAMBURGER LEFT */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            background:
              "linear-gradient(135deg,#D88C6A,#B86A4E)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={{
              rotate: menuOpen ? 45 : 0,
              y: menuOpen ? 6 : 0,
            }}
            style={{
              width: "18px",
              height: "2.5px",
              background: "white",
              borderRadius: "999px",
            }}
          />

          <motion.div
            animate={{
              opacity: menuOpen ? 0 : 1,
            }}
            style={{
              width: "18px",
              height: "2.5px",
              background: "white",
              borderRadius: "999px",
            }}
          />

          <motion.div
            animate={{
              rotate: menuOpen ? -45 : 0,
              y: menuOpen ? -6 : 0,
            }}
            style={{
              width: "18px",
              height: "2.5px",
              background: "white",
              borderRadius: "999px",
            }}
          />
        </motion.div>

        {/* LOGO NEXT TO MENU */}
        <Link
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#3E2A24",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#D88C6A,#B86A4E)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.4rem",
                color: "white",
              }}
            >
              🤖
            </div> */}

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 800,
                }}
              >
                GestureVerse AI
              </h3>

              <p
                style={{
                  margin: 0,
                  fontSize: "0.88rem",
                  color: "#7A5C52",
                }}
              >
                Assistive Intelligence
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
{/* SLIDE DRAWER MENU */}
<AnimatePresence>
  {menuOpen && (
    <>
      {/* OVERLAY */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 9998,
          backdropFilter: "blur(6px)",
        }}
      />

      {/* DRAWER */}
      <motion.div
        initial={{ x: -420 }}
        animate={{ x: 0 }}
        exit={{ x: -420 }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "340px",
          height: "100vh",
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRight: "1px solid rgba(255,255,255,0.35)",
          zIndex: 9999,
          boxShadow: "10px 0 50px rgba(0,0,0,0.15)",
          padding: "32px",
          boxSizing: "border-box",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: 800,
              color: "#3E2A24",
            }}
          >
            Navigation
          </h2>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              color: "#3E2A24",
            }}
          >
            ✕
          </motion.div>
        </div>

        {/* MENU ITEMS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {menuItems.map((item, index) => {
            const active =
              location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                }}
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    x: 12,
                    scale: 1.02,
                  }}
                  style={{
                    padding: "18px 20px",
                    borderRadius: "18px",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    background: active
                      ? "linear-gradient(135deg,#D88C6A,#B86A4E)"
                      : "transparent",
                    color: active
                      ? "white"
                      : "#3E2A24",
                  }}
                >
                  {item.name}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </>
  );
}

export default DashboardNavbar;