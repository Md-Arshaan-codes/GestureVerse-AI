import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
  ];

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <div
        className="container glass-card"
        style={{
          padding: "18px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "1.4rem",
            color: "#3D2922",
          }}
        >
          GestureVerse AI
        </Link>

        <div className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              style={{
                textDecoration: "none",
                color: "#3D2922",
                fontWeight: 500,
                position: "relative",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            className="glass-card"
            style={{
              marginTop: "14px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "#3D2922",
                }}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;