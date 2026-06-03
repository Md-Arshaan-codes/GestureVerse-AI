// import DashboardNavbar from "../components/DashboardNavbar";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Cpu,
//   Brain,
//   Globe,
//   MessageCircle,
//   ArrowLeft,
//   MousePointer2,
//   Minimize2,
//   Keyboard,
//   Mouse,
//   Play,
//   Square,
//   Video,
//   VideoOff,
// } from "lucide-react";
// import { useState, useEffect } from "react";

// function Mode3Page() {
//   const API = "http://127.0.0.1:5000";

//   const [activeCommand, setActiveCommand] = useState(null);
//   const [arduinoConnected, setArduinoConnected] = useState(false);
//   const [backendRunning, setBackendRunning] = useState(false);
//   const [pointerActive, setPointerActive] = useState(false);
//   const [videoEnabled, setVideoEnabled] = useState(false);

//   const { scrollY } = useScroll();
//   const bgY = useTransform(scrollY, [0, 1000], ["0%", "35%"]);

//   const bgImage =
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80";

//   const heroImage =
//     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

//   const commands = [
//     {
//       title: "Pointer Control",
//       subtitle: "Cursor Navigation",
//       icon: <MousePointer2 size={34} />,
//       key: "pointer",
//       large: true,
//     },
//     {
//       title: "Chrome",
//       subtitle: "Launch Browser",
//       icon: <Globe size={28} />,
//       key: "chrome",
//     },
//     {
//       title: "WhatsApp",
//       subtitle: "Open Messaging",
//       icon: <MessageCircle size={28} />,
//       key: "whatsapp",
//     },
//     {
//       title: "Left Click",
//       subtitle: "Select Item",
//       icon: <Mouse size={28} />,
//       key: "left_click",
//     },
//     {
//       title: "Right Click",
//       subtitle: "Context Menu",
//       icon: <Mouse size={28} />,
//       key: "right_click",
//     },
//     {
//       title: "Double Click",
//       subtitle: "Open Item",
//       icon: <Mouse size={28} />,
//       key: "double_click",
//     },
//     {
//       title: "Back",
//       subtitle: "Navigate Back",
//       icon: <ArrowLeft size={28} />,
//       key: "back",
//     },
//     {
//       title: "Minimize",
//       subtitle: "Hide Window",
//       icon: <Minimize2 size={28} />,
//       key: "minimize",
//     },
//     {
//       title: "Keyboard",
//       subtitle: "Open Keyboard",
//       icon: <Keyboard size={28} />,
//       key: "keyboard",
//     },
//   ];

//       const startCapturing = async () => {
//       await fetch(`${API}/api/mode3/start`);
//     };

//     const stopCapturing = async () => {
//       await fetch(`${API}/api/mode3/stop`);
//     };

//     const startVideo = async () => {
//       await fetch(`${API}/api/mode3/start-video`);
//     };

//     const stopVideo = async () => {
//       await fetch(`${API}/api/mode3/stop-video`);
//     };

//   useEffect(() => {
//   const interval = setInterval(async () => {
//     try {
//       const res = await fetch(`${API}/api/mode3/status`);
//       const data = await res.json();

//       setBackendRunning(data.running || false);
//       setVideoEnabled(data.video_enabled || false);

//       setArduinoConnected(data.running || false);

//       setPointerActive(
//           data.pointer_active || false
//         );

//       setActiveCommand(
//         data.current_gesture || null
//       );

//     } catch (err) {
//       console.error(err);
//     }
//   }, 800);

//   return () => {
//     clearInterval(interval);
//   };
// }, []);


//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         scale: 0.96,
//         y: 60,
//       }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//         y: 0,
//       }}
//       transition={{
//         duration: 0.8,
//       }}
//       className="page-container"
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `linear-gradient(rgba(236,248,255,0.84), rgba(245,250,255,0.92)), url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPositionY: bgY,
//         backgroundPositionX: "center",
//       }}
//     >
//       <DashboardNavbar />

//       <section className="section" style={{ paddingTop: "170px" }}>
//         <div className="container">
//           {/* HERO */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="glass-card"
//             style={{
//               padding: "40px",
//             }}
//           >
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1.5fr 1fr",
//                 gap: "30px",
//                 alignItems: "center",
//               }}
//             >
//               <div>
//                 <h1 style={{ fontSize: "4rem" }}>
//                   Smart Desktop Automation
//                 </h1>

//                 <p
//                   style={{
//                     marginTop: "16px",
//                     fontSize: "1.1rem",
//                     color: "#7A5C52",
//                     maxWidth: "700px",
//                   }}
//                 >
//                   Control your laptop using real-time hand tracking,
//                   smart glove gestures, MediaPipe cursor mapping,
//                   and intelligent desktop automation.
//                 </p>

//                 {/* STATUS STRIP */}
//                 <div
//                   style={{
//                     marginTop: "28px",
//                     display: "grid",
//                     gridTemplateColumns: "repeat(2,1fr)",
//                     gap: "16px",
//                   }}
//                 >
//                   <div
//                     className="glass-card"
//                     style={{
//                       padding: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "14px",
//                     }}
//                   >
//                     <Cpu
//                       color={
//                         arduinoConnected
//                           ? "#16A34A"
//                           : "#F59E0B"
//                       }
//                     />

//                     <div>
//                       <h4>Arduino</h4>
//                       <p
//                         style={{
//                           color: arduinoConnected
//                             ? "#16A34A"
//                             : "#F59E0B",
//                           fontWeight: 700,
//                         }}
//                       >
//                         {arduinoConnected
//                           ? "Connected"
//                           : "Waiting"}
//                       </p>
//                     </div>
//                   </div>

//                   <div
//                     className="glass-card"
//                     style={{
//                       padding: "18px",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "14px",
//                     }}
//                   >
//                     <Brain
//                       color={
//                         backendRunning ? "#16A34A" : "#F59E0B"
//                       }
//                     />

//                     <div>
//                       <h4>AI Engine</h4>
//                       <p
//                         style={{
//                           color: backendRunning
//                             ? "#16A34A"
//                             : "#F59E0B",
//                           fontWeight: 700,
//                         }}
//                       >
//                        {backendRunning
//                           ? "Active"
//                           : "Stopped"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <motion.img
//                 animate={{
//                   y: [0, -10, 0],
//                 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 4,
//                 }}
//                 src={heroImage}
//                 alt="desktop automation"
//                 style={{
//                   width: "100%",
//                   height: "260px",
//                   objectFit: "cover",
//                   borderRadius: "24px",
//                 }}
//               />
//             </div>
//           </motion.div>

                    
//           <motion.div
//             className="glass-card"
//             style={{
//               marginTop: "30px",
//               padding: "24px",
//               display: "grid",
//               gridTemplateColumns: "repeat(4,1fr)",
//               gap: "16px",
//             }}
//           >
//             <button
//               className="primary-btn"
//               onClick={startCapturing}
//             >
//               <Play size={18} /> Start Capturing
//             </button>

//             <button
//               className="secondary-btn"
//               onClick={stopCapturing}
//             >
//               <Square size={18} /> Stop Capturing
//             </button>

//             <button
//               className="primary-btn"
//               onClick={startVideo}
//             >
//               <Video size={18} /> Start Video
//             </button>

//             <button
//               className="secondary-btn"
//               onClick={stopVideo}
//             >
//               <VideoOff size={18} /> Stop Video
//             </button>
//           </motion.div>


//           {/* COMMAND GRID */}
//           <div
//             style={{
//               marginTop: "30px",
//               display: "grid",
//               gridTemplateColumns: "repeat(3,1fr)",
//               gap: "20px",
//             }}
//           >
//             {commands.map((cmd) => (
//               <motion.div
//                 key={cmd.key}
//                 whileHover={{
//                   y: -10,
//                   scale: 1.03,
//                 }}
//                 className="glass-card"
//                 style={{
//                   padding: "30px",
//                   border:
//                         (
//                           cmd.key === "pointer"
//                             ? pointerActive
//                             : activeCommand === cmd.key.toUpperCase()
//                         )
//                       ? "2px solid #16A34A"
//                       : "2px solid transparent",
//                   boxShadow:
//                         (
//                           cmd.key === "pointer"
//                             ? pointerActive
//                             : activeCommand === cmd.key.toUpperCase()
//                         )
//                           ? "0 0 30px rgba(22,163,74,0.25)"
//                           : "none",
//                   gridColumn: cmd.large ? "span 2" : "span 1",
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 {cmd.icon}

//                 <h3 style={{ marginTop: "16px" }}>
//                   {cmd.title}
//                 </h3>

//                 <p
//                   style={{
//                     marginTop: "10px",
//                     color: "#7A5C52",
//                   }}
//                 >
//                   {cmd.subtitle}
//                 </p>
//               </motion.div>
//             ))}
//           </div>

//           {/* LIVE CAMERA */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="glass-card"
//             style={{
//               marginTop: "30px",
//               padding: "24px",
//               maxWidth: "520px",
//               marginInline: "auto",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 marginBottom: "16px",
//               }}
//             >
//               <h2>Live Hand Tracking</h2>

//               <div
//                 style={{
//                   padding: "8px 16px",
//                   borderRadius: "999px",
//                   background: pointerActive
//                     ? "rgba(22,163,74,0.15)"
//                     : "rgba(245,158,11,0.15)",
//                   color: pointerActive
//                     ? "#16A34A"
//                     : "#F59E0B",
//                   fontWeight: 700,
//                 }}
//               >
//                 {pointerActive ? "ACTIVE" : "STARTING"}
//               </div>
//             </div>

//             {videoEnabled ? (
//   <img
//     src={`${API}/api/mode3/video_feed`}
//     alt="camera stream"
//     style={{
//       width: "100%",
//       height: "320px",
//       borderRadius: "20px",
//       objectFit: "cover",
//     }}
//   />
// ) : (
//               <div
//                 style={{
//                   width: "100%",
//                   height: "320px",
//                   borderRadius: "20px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   background: "rgba(255,255,255,0.5)",
//                   fontWeight: 700,
//                   color: "#7A5C52",
//                 }}
//               >
//                 Video stream stopped
//               </div>
//             )}
//           </motion.div>
//         </div>
//       </section>
//     </motion.div>
//   );
// }

// export default Mode3Page;
import DashboardNavbar from "../components/DashboardNavbar";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cpu,
  Brain,
  Globe,
  MessageCircle,
  ArrowLeft,
  MousePointer2,
  Minimize2,
  Keyboard,
  Mouse,
  Play,
  Square,
  Video,
  VideoOff,
  Activity,
  Monitor,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

function Mode3Page() {
  const API = "http://127.0.0.1:5000";

  const isMobile = window.innerWidth < 1000;

  const [activeCommand, setActiveCommand] =
    useState(null);

  const [
    arduinoConnected,
    setArduinoConnected,
  ] = useState(false);

  const [backendRunning, setBackendRunning] =
    useState(false);

  const [pointerActive, setPointerActive] =
    useState(false);

  const [videoEnabled, setVideoEnabled] =
    useState(false);

  const { scrollY } = useScroll();

  const bgY = useTransform(
    scrollY,
    [0, 1000],
    ["0%", "35%"]
  );

  const bgImage =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80";

  const heroImage =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

  const commands = [
    {
      title: "Pointer Control",
      subtitle: "Cursor Navigation",
      icon: <MousePointer2 size={34} />,
      key: "pointer",
      large: true,
    },
    {
      title: "Chrome",
      subtitle: "Launch Browser",
      icon: <Globe size={28} />,
      key: "chrome",
    },
    {
      title: "WhatsApp",
      subtitle: "Open Messaging",
      icon: <MessageCircle size={28} />,
      key: "whatsapp",
    },
    {
      title: "Left Click",
      subtitle: "Select Item",
      icon: <Mouse size={28} />,
      key: "left_click",
    },
    {
      title: "Right Click",
      subtitle: "Context Menu",
      icon: <Mouse size={28} />,
      key: "right_click",
    },
    {
      title: "Double Click",
      subtitle: "Open Item",
      icon: <Mouse size={28} />,
      key: "double_click",
    },
    {
      title: "Back",
      subtitle: "Navigate Back",
      icon: <ArrowLeft size={28} />,
      key: "back",
    },
    {
      title: "Minimize",
      subtitle: "Hide Window",
      icon: <Minimize2 size={28} />,
      key: "minimize",
    },
    {
      title: "Keyboard",
      subtitle: "Open Keyboard",
      icon: <Keyboard size={28} />,
      key: "keyboard",
    },
  ];

  const startCapturing = async () => {
    await fetch(`${API}/api/mode3/start`);
  };

  const stopCapturing = async () => {
    await fetch(`${API}/api/mode3/stop`);
  };

  const startVideo = async () => {
    await fetch(`${API}/api/mode3/start-video`);
  };

  const stopVideo = async () => {
    await fetch(`${API}/api/mode3/stop-video`);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${API}/api/mode3/status`
        );

        const data = await res.json();

        setBackendRunning(
          data.running || false
        );

        setVideoEnabled(
          data.video_enabled || false
        );

        setArduinoConnected(
          data.running || false
        );

        setPointerActive(
          data.pointer_active || false
        );

        setActiveCommand(
          data.current_gesture || null
        );
      } catch (err) {
        console.error(err);
      }
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 60,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="page-container"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(236,248,255,0.84), rgba(245,250,255,0.92)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPositionY: bgY,
        backgroundPositionX: "center",
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
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="glass-card"
            style={{
              padding: isMobile
                ? "26px"
                : "40px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  isMobile
                    ? "1fr"
                    : "1.5fr 1fr",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <Monitor />

                  <h1
                    style={{
                      fontSize: isMobile
                        ? "2.3rem"
                        : "4rem",
                    }}
                  >
                    Smart Desktop Automation
                  </h1>
                </div>

                <p
                  style={{
                    marginTop: "18px",
                    fontSize: "1.05rem",
                    color: "#7A5C52",
                    lineHeight: 1.8,
                    maxWidth: "700px",
                  }}
                >
                  Control your computer with AI-powered hand tracking,
                  smart glove gestures, cursor automation,
                  and intelligent desktop control.
                </p>

                {/* STATUS STRIP */}
                <div
                  style={{
                    marginTop: "28px",
                    display: "grid",
                    gridTemplateColumns:
                      isMobile
                        ? "1fr"
                        : "repeat(3,1fr)",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      icon: <Cpu size={26} />,
                      title: "Arduino",
                      status: arduinoConnected
                        ? "Connected"
                        : "Waiting",
                      color: arduinoConnected
                        ? "#16A34A"
                        : "#F59E0B",
                    },
                    {
                      icon: <Brain size={26} />,
                      title: "AI Engine",
                      status: backendRunning
                        ? "Active"
                        : "Stopped",
                      color: backendRunning
                        ? "#16A34A"
                        : "#F59E0B",
                    },
                    {
                      icon: <Zap size={26} />,
                      title: "Pointer",
                      status: pointerActive
                        ? "Active"
                        : "Idle",
                      color: pointerActive
                        ? "#16A34A"
                        : "#F59E0B",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                      }}
                      className="glass-card"
                      style={{
                        padding: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        boxShadow:
                          "0 12px 30px rgba(0,0,0,0.06)",
                      }}
                    >
                      <motion.div
                        animate={
                          item.status === "Active" ||
                          item.status === "Connected"
                            ? {
                                scale: [1, 1.1, 1],
                              }
                            : {}
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 1.4,
                        }}
                        style={{
                          color: item.color,
                        }}
                      >
                        {item.icon}
                      </motion.div>

                      <div>
                        <h4>{item.title}</h4>

                        <p
                          style={{
                            color: item.color,
                            fontWeight: 700,
                          }}
                        >
                          {item.status}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.img
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                src={heroImage}
                alt="desktop automation"
                style={{
                  width: "100%",
                  height: isMobile
                    ? "240px"
                    : "280px",
                  objectFit: "cover",
                  borderRadius: "24px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.10)",
                }}
              />
            </div>
          </motion.div>
                    {/* CONTROL PANEL */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="glass-card"
            style={{
              marginTop: "30px",
              padding: isMobile
                ? "20px"
                : "24px",
              boxShadow:
                "0 18px 50px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  isMobile
                    ? "1fr"
                    : "repeat(4,1fr)",
                gap: "16px",
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={startCapturing}
                style={{
                  padding: "16px 18px",
                  border: "none",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#D88C6A,#B86A4E)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow:
                    "0 14px 28px rgba(184,106,78,0.28)",
                }}
              >
                <Play size={18} />
                Start Capture
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={stopCapturing}
                style={{
                  padding: "16px 18px",
                  border: "none",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#9C6B5A,#7A5C52)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow:
                    "0 14px 28px rgba(122,92,82,0.22)",
                }}
              >
                <Square size={18} />
                Stop Capture
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={startVideo}
                style={{
                  padding: "16px 18px",
                  border: "none",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#2563EB,#1D4ED8)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow:
                    "0 14px 28px rgba(37,99,235,0.25)",
                }}
              >
                <Video size={18} />
                Start Video
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={stopVideo}
                style={{
                  padding: "16px 18px",
                  border: "none",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#DC2626,#991B1B)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow:
                    "0 14px 28px rgba(220,38,38,0.25)",
                }}
              >
                <VideoOff size={18} />
                Stop Video
              </motion.button>
            </div>
          </motion.div>

          {/* COMMAND GRID */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            {commands.map((cmd) => {
              const isActive =
                cmd.key === "pointer"
                  ? pointerActive
                  : activeCommand ===
                    cmd.key.toUpperCase();

              return (
                <motion.div
                  key={cmd.key}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="glass-card"
                  style={{
                    padding: "28px",
                    border: isActive
                      ? "2px solid #16A34A"
                      : "2px solid transparent",
                    boxShadow: isActive
                      ? "0 0 35px rgba(22,163,74,0.22)"
                      : "0 14px 35px rgba(0,0,0,0.05)",
                    gridColumn:
                      isMobile
                        ? "span 1"
                        : cmd.large
                        ? "span 2"
                        : "span 1",
                    transition:
                      "all 0.3s ease",
                  }}
                >
                  <motion.div
                    animate={
                      isActive
                        ? {
                            scale: [
                              1,
                              1.08,
                              1,
                            ],
                          }
                        : {}
                    }
                    transition={{
                      repeat:
                        Infinity,
                      duration: 1.2,
                    }}
                  >
                    {cmd.icon}
                  </motion.div>

                  <h3
                    style={{
                      marginTop: "18px",
                    }}
                  >
                    {cmd.title}
                  </h3>

                  <p
                    style={{
                      marginTop: "10px",
                      color: "#7A5C52",
                    }}
                  >
                    {cmd.subtitle}
                  </p>

                  {isActive && (
                    <div
                      style={{
                        marginTop: "14px",
                        display:
                          "inline-block",
                        padding:
                          "8px 14px",
                        borderRadius:
                          "999px",
                        background:
                          "rgba(22,163,74,0.12)",
                        color:
                          "#16A34A",
                        fontWeight:
                          700,
                        fontSize:
                          "0.85rem",
                      }}
                    >
                      ACTIVE
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
                    {/* LIVE CAMERA */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="glass-card"
            style={{
              marginTop: "30px",
              padding: isMobile
                ? "24px"
                : "30px",
              maxWidth: isMobile
                ? "100%"
                : "760px",
              marginInline: "auto",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Activity />

                <h2>
                  Live Hand Tracking
                </h2>
              </div>

              <motion.div
                animate={
                  pointerActive
                    ? {
                        scale: [1, 1.06, 1],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background:
                    pointerActive
                      ? "rgba(22,163,74,0.14)"
                      : "rgba(245,158,11,0.14)",
                  color:
                    pointerActive
                      ? "#16A34A"
                      : "#F59E0B",
                  fontWeight: 700,
                }}
              >
                {pointerActive
                  ? "POINTER ACTIVE"
                  : "INITIALIZING"}
              </motion.div>
            </div>

            {videoEnabled ? (
              <motion.img
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                src={`${API}/api/mode3/video_feed`}
                alt="camera stream"
                style={{
                  width: "100%",
                  height: isMobile
                    ? "260px"
                    : "420px",
                  borderRadius: "22px",
                  objectFit: "cover",
                  boxShadow:
                    "0 18px 45px rgba(0,0,0,0.10)",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: isMobile
                    ? "260px"
                    : "420px",
                  borderRadius: "22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  background:
                    "rgba(255,255,255,0.55)",
                  color: "#7A5C52",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                <VideoOff size={40} />

                <p>
                  Video stream stopped
                </p>
              </div>
            )}
          </motion.div>

          {/* FOOT STATUS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns:
                isMobile
                  ? "1fr"
                  : "repeat(3,1fr)",
              gap: "18px",
            }}
          >
            {[
              {
                title:
                  "Gesture Detection",
                status:
                  backendRunning
                    ? "RUNNING"
                    : "STOPPED",
                color:
                  backendRunning
                    ? "#16A34A"
                    : "#EF4444",
              },
              {
                title:
                  "Video Stream",
                status:
                  videoEnabled
                    ? "LIVE"
                    : "OFFLINE",
                color:
                  videoEnabled
                    ? "#2563EB"
                    : "#EF4444",
              },
              {
                title:
                  "Desktop Control",
                status:
                  pointerActive
                    ? "ACTIVE"
                    : "IDLE",
                color:
                  pointerActive
                    ? "#16A34A"
                    : "#F59E0B",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="glass-card"
                style={{
                  padding: "22px",
                  textAlign:
                    "center",
                  boxShadow:
                    "0 14px 35px rgba(0,0,0,0.06)",
                }}
              >
                <h4>
                  {item.title}
                </h4>

                <p
                  style={{
                    marginTop: "12px",
                    color:
                      item.color,
                    fontWeight: 800,
                    fontSize:
                      "1rem",
                  }}
                >
                  {item.status}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default Mode3Page;