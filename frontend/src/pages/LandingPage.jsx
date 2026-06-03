import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Wifi,
  Languages,
  HeartPulse,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function LandingPage() {
  const sections = [
    {
      icon: <Brain size={28} />,
      title: "AI Gesture Intelligence",
      desc:
        "Advanced machine learning converts human gestures into intelligent communication experiences in real time.",
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1400&q=80",
    },
    {
      icon: <Wifi size={28} />,
      title: "IoT Powered Connectivity",
      desc:
        "Wireless wearable connectivity with intelligent data streaming creates seamless interaction.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    },
    {
      icon: <Languages size={28} />,
      title: "Speech Translation",
      desc:
        "Convert gestures into multilingual voice outputs for accessible communication experiences.",
      image:
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1400&q=80",
    },
    {
      icon: <HeartPulse size={28} />,
      title: "Assistive Healthcare",
      desc:
        "Empowering patient communication through intelligent assistive emergency systems.",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  const scrollToStory = () => {
    const storySection = document.getElementById("story-section");
    storySection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="page-container">
      <Navbar />

      {/* HERO */}
      <section
        className="section"
        style={{
          paddingTop: "180px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                color: "#D88C6A",
                fontWeight: 700,
                letterSpacing: "2px",
              }}
            >
              FUTURE COMMUNICATION EXPERIENCE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              style={{
                fontSize: "5.5rem",
                lineHeight: 1.02,
                fontWeight: 800,
                marginTop: "24px",
              }}
            >
              Gesture.
              <br />
              Intelligence.
              <br />
              Revolution.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{
                marginTop: "28px",
                fontSize: "1.15rem",
                lineHeight: 1.9,
                color: "#7A5C52",
                maxWidth: "650px",
              }}
            >
              GestureVerse AI transforms communication, automation, and
              assistive healthcare into one cinematic intelligent ecosystem.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              style={{
                marginTop: "36px",
                display: "flex",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/login">
                <button className="primary-btn">
                  Launch Experience
                </button>
              </Link>

              <button
                className="secondary-btn"
                onClick={scrollToStory}
              >
                Explore Features
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <div
            style={{
              position: "relative",
            }}
          >
            <motion.img
              initial={{
                opacity: 0,
                scale: 0.88,
                rotate: -2,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1.1,
              }}
              src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=80"
              alt="hero"
              style={{
                width: "100%",
                borderRadius: "38px",
                boxShadow: "0 35px 90px rgba(120,70,40,0.16)",
              }}
            />

            <motion.div
              animate={{
                y: [0, -16, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="glass-card"
              style={{
                position: "absolute",
                top: "-30px",
                right: "-20px",
                padding: "20px 28px",
                fontWeight: 600,
              }}
            >
              AI Recognition
            </motion.div>

            <motion.div
              animate={{
                y: [0, 14, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="glass-card"
              style={{
                position: "absolute",
                bottom: "40px",
                left: "-20px",
                padding: "20px 28px",
                fontWeight: 600,
              }}
            >
              Real-Time Intelligence
            </motion.div>

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="glass-card"
              style={{
                position: "absolute",
                top: "40%",
                right: "-40px",
                width: "90px",
                height: "90px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#D88C6A",
              }}
            >
              <Sparkles size={34} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY */}
      {sections.map((item, index) => (
        <section
          className="section"
          key={item.title}
          id={index === 0 ? "story-section" : undefined}
        >
          <div
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
              gap: "80px",
              alignItems: "center",
            }}
          >
            {index % 2 === 0 ? (
              <>
                <motion.img
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  initial={{
                    opacity: 0,
                    x: -80,
                    scale: 0.92,
                  }}
                  transition={{
                    duration: 0.9,
                  }}
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    borderRadius: "32px",
                    boxShadow: "0 20px 60px rgba(120,70,40,0.12)",
                  }}
                />

                <motion.div
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  initial={{
                    opacity: 0,
                    x: 80,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >
                  <div
                    className="glass-card"
                    style={{
                      width: "82px",
                      height: "82px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#D88C6A",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h2
                    style={{
                      fontSize: "3.2rem",
                      marginTop: "28px",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      marginTop: "24px",
                      lineHeight: 1.9,
                      color: "#7A5C52",
                      fontSize: "1.08rem",
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  initial={{
                    opacity: 0,
                    x: -80,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >
                  <div
                    className="glass-card"
                    style={{
                      width: "82px",
                      height: "82px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#D88C6A",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h2
                    style={{
                      fontSize: "3.2rem",
                      marginTop: "28px",
                    }}
                  >
                    {item.title}
                  </h2>

                  <p
                    style={{
                      marginTop: "24px",
                      lineHeight: 1.9,
                      color: "#7A5C52",
                      fontSize: "1.08rem",
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>

                <motion.img
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  initial={{
                    opacity: 0,
                    x: 80,
                    scale: 0.92,
                  }}
                  transition={{
                    duration: 0.9,
                  }}
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    borderRadius: "32px",
                    boxShadow: "0 20px 60px rgba(120,70,40,0.12)",
                  }}
                />
              </>
            )}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section">
        <div className="container">
          <motion.div
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            initial={{
              opacity: 0,
              y: 60,
            }}
            className="glass-card"
            style={{
              padding: "90px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "3.8rem",
              }}
            >
              Enter The Intelligent Era
            </h2>

            <p
              style={{
                marginTop: "24px",
                color: "#7A5C52",
                lineHeight: 1.9,
                maxWidth: "760px",
                marginInline: "auto",
              }}
            >
              Experience a premium cinematic ecosystem where AI,
              communication, automation, and healthcare converge.
            </p>

            <div style={{ marginTop: "36px" }}>
              <Link to="/login">
                <button className="primary-btn">
                  Enter Platform <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;