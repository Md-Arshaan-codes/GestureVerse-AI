import DashboardNavbar from "../components/DashboardNavbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ArshaanPhoto from "../assets/team/Arshaan.jpeg";
import Nishtha from "../assets/team/Nishtha.jpeg";
import Ravindra from "../assets/team/Ravindra.jpeg";
import {
  Brain,
  HeartPulse,
  Monitor,
  Users,
  ArrowRight,
  Cpu,
  Shield,
  Copyright,
} from "lucide-react";

function DashboardPage() {
  const userName =
  localStorage.getItem("user_name") ||
  sessionStorage.getItem("user_name") ||
  "Innovator";
  const isMobile = window.innerWidth < 900;
  const teamMembers = [
  {
    name: "Mohammad Arshaan",
    role: "AI / Frontend Integration",
    desc:
      "Responsible for AI system design, frontend experience, UI interactions, and complete project integration.",
    image:ArshaanPhoto,
    linkedin: "https://www.linkedin.com/in/mohammad-arshaan-380716252/",
  },
  {
    name: "Nishtha Rawat",
    role: "IoT / Hardware Engineer",
    desc:
      "Handled glove hardware integration, sensor calibration, ESP32 communication, and embedded system connectivity.",
    image: Nishtha,
    linkedin: "https://www.linkedin.com/in/nishtha-rawat-626679286",
    
  },
  {
    name: "Ravindra Rajak",
    role: "ML / Backend Developer",
    desc:
      "Developed ML prediction pipeline, backend APIs, model optimization, and intelligent automation logic.",
    image: Ravindra,
    linkedin: "https://www.linkedin.com/in/ravindra-rajak-558094250",
  },
];

  const modes = [
    {
      title: "Mode 1 — Sign Language Translation",
      icon: <Brain size={28} />,
      image:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
      desc:
        "Real-time AI gesture recognition converts smart glove inputs into meaningful text and multilingual speech output, enabling communication support for speech and hearing-impaired users.",
      link: "/dashboard/mode1",
    },
    {
      title: "Mode 2 — Patient Assistance System",
      icon: <HeartPulse size={28} />,
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
      desc:
        "Designed for paralytic and mobility-impaired patients with emergency alerts, caregiver assistance requests, water requests, washroom requests, and voice-enabled emergency communication.",
      link: "/dashboard/mode2",
    },
    {
      title: "Mode 3 — Computer Automation",
      icon: <Monitor size={28} />,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      desc:
        "Transforms gesture commands into computer actions including mouse control, keyboard automation, productivity shortcuts, and assistive digital interaction.",
      link: "/dashboard/mode3",
    },
  ];

  return (
    <div
      className="page-container"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(240,248,255,0.88), rgba(248,250,255,0.92)), url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <DashboardNavbar />

      <section
        className="section"
        style={{
          paddingTop: "170px",
        }}
      >
        <div className="container">
          {/* HERO */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card"
            style={{
              padding: isMobile ? "35px" : "60px",
              textAlign: "center",
              boxShadow:
                "0 25px 70px rgba(0,0,0,0.10)",
              position: "relative",
              overflow: "hidden",
            }}
          >

            <motion.div
  animate={{
    rotate: 360,
  }}
  transition={{
    duration: 18,
    repeat: Infinity,
    ease: "linear",
  }}
  style={{
    position: "absolute",
    top: "-60px",
    right: "-60px",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background:
      "radial-gradient(rgba(184,106,78,0.15), transparent)",
    filter: "blur(20px)",
  }}
/>
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              style={{
                display: "inline-flex",
                padding: "18px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.72)",
                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Cpu size={44} />
            </motion.div>

            <p
              style={{
                marginTop: "22px",
                color: "#B86A4E",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "1px",
              }}
            >
              WELCOME BACK, {userName.toUpperCase()}
            </p>

            <h1
              style={{
                fontSize: isMobile ? "2.4rem" : "4rem",
                marginTop: "20px",
                lineHeight: 1.15,
                fontWeight: 800,
              }}
            >
              GestureVerse AI
            </h1>

            <p
              style={{
                marginTop: "18px",
                color: "#7A5C52",
                maxWidth: "900px",
                marginInline: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              A multi-functional AI-powered assistive system integrating sign language translation,
              patient communication, and gesture-based computer automation.
            </p>

            <div
                  style={{
                    marginTop: "32px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "18px",
                    flexWrap: "wrap",
                  }}
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="primary-btn"
                    onClick={() =>
                      document
                        .getElementById("modes-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }
                    style={{
                      padding: "16px 26px",
                    }}
                  >
                    Explore Modes <ArrowRight />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() =>
                      document
                        .getElementById("team-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        })
                    }
                    style={{
                      padding: "16px 26px",
                      borderRadius: "16px",
                      border: "none",
                      background:
                        "rgba(255,255,255,0.75)",
                      cursor: "pointer",
                      fontWeight: 700,
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    Meet the Team
                  </motion.button>
                </div>
          </motion.div>

<div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "20px",
  }}
>
  {[
    {
      icon: <Brain />,
      title: "AI Powered",
      value: "Machine Learning",
    },
    {
      icon: <Shield />,
      title: "Healthcare Ready",
      value: "Assistive Support",
    },
    {
      icon: <Users />,
      title: "Team Project",
      value: "3 Contributors",
    },
  ].map((item, i) => (
    <motion.div
            key={i}
            whileHover={{
              y: -14,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
      onClick={() => {
        if (item.title === "Team Project") {
          document
            .getElementById("team-section")
            ?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }
      }}
      className="glass-card"
      style={{
        padding: "30px",
        cursor:
          item.title === "Team Project"
            ? "pointer"
            : "default",
        boxShadow:
          "0 18px 45px rgba(0,0,0,0.08)",
        transition:
          "all 0.3s ease",
      }}
    >
      <div
          style={{
            display: "inline-flex",
            padding: "14px",
            borderRadius: "18px",
            background:
              "rgba(255,255,255,0.72)",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.05)",
          }}
        >
          {item.icon}
        </div>

      <h3
        style={{
          marginTop: "18px",
          fontSize: "1.2rem",
        }}
      >
        {item.title}
      </h3>

      
              <p
        style={{
          marginTop: "12px",
          color: "#7A5C52",
          fontWeight: 600,
        }}
      >
      
        {item.value}
      </p>
    </motion.div>
  ))}
</div>

          {/* MODES */}
          <div 
          id="modes-section"
          style={{ marginTop: "80px" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "40px",
              }}
            >
              Explore System Modes
            </h2>

            {modes.map((mode, i) => (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    y: -10,
                  }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card"
               style={{
                    marginBottom: "45px",
                    overflow: "hidden",
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.10)",
                    transition:
                      "all 0.3s ease",
                  }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                              ? "1fr"
                              : "1.2fr 1fr",                    
                    gap: "30px",
                    alignItems: "center",
                  }}
                >
                  <motion.img
                        whileHover={{
                          scale: 1.06,
                        }}
                        transition={{
                          duration: 0.4,
                        }}
                        src={mode.image}
                        alt={mode.title}
                        style={{
                          width: "100%",
                          height: "420px",
                          objectFit: "cover",
                        }}
                      />

                  <div style={{ padding: "30px" }}>
                    <div
                      style={{
                        display: "inline-flex",
                        padding: "14px",
                        borderRadius: "18px",
                        background:
                          "rgba(255,255,255,0.75)",
                        boxShadow:
                          "0 10px 25px rgba(0,0,0,0.06)",
                      }}
                    >
                      {mode.icon}
                    </div>

                    <h2
                      style={{
                        marginTop: "18px",
                        fontSize: "2rem",
                      }}
                    >
                      {mode.title}
                    </h2>

                    <p
                      style={{
                        marginTop: "18px",
                        color: "#7A5C52",
                        lineHeight: 1.8,
                      }}
                    >
                      {mode.desc}
                    </p>

                    <Link to={mode.link}>
                      <motion.button
                              whileHover={{
                                scale: 1.05,
                                y: -3,
                              }}
                              whileTap={{
                                scale: 0.98,
                              }}
                        className="primary-btn"
                        style={{ marginTop: "24px" }}
                      >
                        Explore Mode <ArrowRight />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* TEAM */}
          <motion.div
          id="team-section"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: "80px" }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                marginBottom: "30px",
              }}
            >
              Meet Our Team
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "24px",
              }}
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                          y: -16,
                          scale: 1.03,
                        }}
                  className="glass-card"
                  style={{
                        padding: "34px",
                        textAlign: "center",
                        boxShadow:
                          "0 18px 50px rgba(0,0,0,0.10)",
                      }}
                >
                  <motion.img
                    whileHover={{
                      scale: 1.08,
                      rotate: 2,
                    }}
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      margin: "0 auto",
                      display: "block",
                      border: "5px solid rgba(255,255,255,0.8)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                    }}
                  />

                  <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  }}
>
  <h3
    
  style={{
    margin: 0,
    fontSize: "1.3rem",
    fontWeight: 700,
  }}
  >
  
    {member.name}
  </h3>

  <motion.a
    href={member.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{
      scale: 1.18,
      rotate: 8,
    }}
    whileTap={{
      scale: 0.95,
    }}
    style={{
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background:
        "linear-gradient(135deg,#0077B5,#005582)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textDecoration: "none",
      color: "white",
      boxShadow:
        "0 4px 12px rgba(0,119,181,0.25)",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontSize: "0.85rem",
        fontWeight: 800,
        fontFamily: "Arial",
      }}
    >
      in
    </span>
  </motion.a>
</div>

                  <p
                    style={{
                      marginTop: "12px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      letterSpacing: "0.3px",
                      color: "#B86A4E",
                    }}
                  >
                    {member.role}
                  </p>

                  <p
  style={{
    marginTop: "16px",
    color: "#7A5C52",
    lineHeight: 1.8,
    fontSize: "0.98rem",
  }}
>
  {member.desc}
</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
<motion.footer
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  style={{
    marginTop: "60px",
    padding: isMobile
          ? "24px 20px"
          : "32px 60px",
    background: "rgba(255,255,255,0.92)",
    borderTop: "1px solid rgba(0,0,0,0.08)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "30px",
    }}
  >
    {/* SOCIAL ICONS */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
      }}
    >
      {["f", "▶","X", "in"].map(
        (icon, i) => (
          <motion.a
            key={i}
            whileHover={{
              scale: 1.2,
              y: -3,
            }}
            href="#"
            style={{
              color: "black",
              textDecoration: "none",
              fontSize: "1.8rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "28px",
            }}
          >
            {icon}
          </motion.a>
        )
      )}
    </div>

    {/* RIGHT SIDE */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "50px",
        flexWrap: "wrap",
        fontSize: "1.05rem",
      }}
    >
      <motion.a
        whileHover={{ y: -2 }}
        href="#"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        Terms of Use
      </motion.a>

      <motion.a
        whileHover={{ y: -2 }}
        href="#"
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        Privacy Policy
      </motion.a>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "black",
        }}
      >
        <Copyright size={16} />
        2026 GestureVerse AI Glove Project
      </div>
    </div>
  </div>
</motion.footer>
    </div>
  );
}

export default DashboardPage;

