

// import DashboardNavbar from "../components/DashboardNavbar";
// import {
//   motion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import {
//   HeartPulse,
//   HandHelping,
//   Droplets,
//   Bath,
//   AlertTriangle,
//   BellOff,
//   Play,
//   Square,
//   Cpu,
// } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// function Mode2Page() {
//   const [monitoring, setMonitoring] = useState(false);
//   const [emergency, setEmergency] = useState(false);
//   const [arduinoConnected, setArduinoConnected] = useState(false);
//   const [request, setRequest] = useState(
//   "Waiting for patient request..."
// );

// const [sensorData, setSensorData] = useState({
//   f1: 0,
//   f2: 0,
//   f3: 0,
// });

// const [emergencySuppressed, setEmergencySuppressed] =
//   useState(false);

// const [lastSpokenRequest, setLastSpokenRequest] =
//   useState("");

//   const API_BASE = "http://127.0.0.1:5000/api/mode2";

//   const speechInterval = useRef(null);
//   const audioContextRef = useRef(null);
//   const oscillatorRef = useRef(null);

//   const { scrollY } = useScroll();
//   const bgY = useTransform(scrollY, [0, 1000], ["0%", "35%"]);

//   const bgImage =
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80";

//   const heroImage =
//     "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80";

//   const requests = [
//     {
//       title: "Need Help",
//       icon: <HandHelping size={26} />,
//       message: "Patient needs assistance",
//     },
//     {
//       title: "Need Water",
//       icon: <Droplets size={26} />,
//       message: "Patient needs water",
//     },
//     {
//       title: "Washroom",
//       icon: <Bath size={26} />,
//       message: "Patient needs washroom",
//     },
//   ];

//   const speakEmergency = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel();

//       const utterance = new SpeechSynthesisUtterance(
//         "Emergency! Patient needs immediate assistance!"
//       );

//       utterance.rate = 1;
//       utterance.pitch = 1;

//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const speakRequest = (text) => {
//   if ("speechSynthesis" in window) {
//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.volume = 1;

//     window.speechSynthesis.speak(utterance);
//   }
// };

//   const startBeep = () => {
//     const audioContext = new (
//       window.AudioContext || window.webkitAudioContext
//     )();

//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();

//     oscillator.type = "square";
//     oscillator.frequency.value = 880;
//     gainNode.gain.value = 0.12;

//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);

//     oscillator.start();

//     oscillatorRef.current = oscillator;
//     audioContextRef.current = audioContext;
//   };

//   const stopBeep = () => {
//     if (oscillatorRef.current) {
//       oscillatorRef.current.stop();
//       oscillatorRef.current.disconnect();
//       oscillatorRef.current = null;
//     }

//     if (audioContextRef.current) {
//       audioContextRef.current.close();
//       audioContextRef.current = null;
//     }
//   };

//   const triggerEmergency = () => {
//     if (emergency) return;

//     setEmergency(true);

//     speakEmergency();
//     startBeep();

//     speechInterval.current = setInterval(() => {
//       speakEmergency();
//     }, 5000);
//   };

//   const stopEmergency = async () => {
//     setEmergency(false);
// setEmergencySuppressed(true);

// window.speechSynthesis.cancel();

// if (speechInterval.current) {
//   clearInterval(speechInterval.current);
//   speechInterval.current = null;
// }

// stopBeep();

// await fetch(`${API_BASE}/reset-emergency`);
//   };

//   const fetchStatus = async () => {
//   try {
//     const res = await fetch(`${API_BASE}/status`);
//     const data = await res.json();

//     setMonitoring(data.mode_running);
//     setArduinoConnected(data.arduino_connected);

//     if (data.sensor_data) {
//       setSensorData({
//         f1: data.sensor_data.f1,
//         f2: data.sensor_data.f2,
//         f3: data.sensor_data.f3,
//       });
//     }

//     const currentRequest =
//       data.request && data.request !== ""
//         ? data.request
//         : "Waiting for patient request...";

//     setRequest(currentRequest);


//     if (data.emergency && !emergencySuppressed) {
//       triggerEmergency();
//     }

//     else if (!data.emergency && emergency) {
//       stopEmergency();
//     }

//   } catch (error) {
//     console.error("Mode2 status error:", error);
//   }
// };

//   useEffect(() => {
//     let interval;

//     if (monitoring) {
//       interval = setInterval(() => {
//         fetchStatus();
//       }, 500);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [monitoring, emergency]);

//   const startMonitoring = async () => {
//   await fetch(`${API_BASE}/start`);

//   setMonitoring(true);
//   setEmergencySuppressed(false);
//   setLastSpokenRequest("");

//   fetchStatus();
// };

//   const stopMonitoring = async () => {
//   await fetch(`${API_BASE}/stop`);

//   setMonitoring(false);
//   setRequest("Waiting for patient request...");
//   setArduinoConnected(false);

//   setSensorData({
//     f1: 0,
//     f2: 0,
//     f3: 0,
//   });

//   setLastSpokenRequest("");

//   stopEmergency();
// };


//   useEffect(() => {
//   if (emergency) return;

//   if (request === "Waiting for patient request...") {
//     window.speechSynthesis.cancel();
//     setLastSpokenRequest("");
//     return;
//   }

//   if (request === "EMERGENCY ALERT") {
//     return;
//   }

//   if (request === lastSpokenRequest) {
//     return;
//   }

//   let speechText = "";

//   if (request === "NEED HELP") {
//     speechText = "Patient needs assistance";
//   }

//   else if (request === "NEED WATER") {
//     speechText = "Patient needs water";
//   }

//   else if (request === "NEED WASHROOM") {
//     speechText = "Patient needs washroom assistance";
//   }

//   if (speechText !== "") {
//     window.speechSynthesis.cancel();

//     const utterance = new SpeechSynthesisUtterance(
//       speechText
//     );

//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.volume = 1;

//     window.speechSynthesis.speak(utterance);

//     setLastSpokenRequest(request);
//   }
// }, [request, emergency]);


//   useEffect(() => {
//     return () => {
//       window.speechSynthesis.cancel();

//       if (speechInterval.current) {
//         clearInterval(speechInterval.current);
//       }

//       stopBeep();
//     };
//   }, []);

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         scale: 0.96,
//         y: 80,
//         filter: "blur(16px)",
//       }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//         y: 0,
//         filter: "blur(0px)",
//       }}
//       transition={{
//         duration: 0.9,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="page-container"
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `linear-gradient(rgba(236,248,255,0.82), rgba(245,250,255,0.90)), url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPositionY: bgY,
//         backgroundPositionX: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <DashboardNavbar />

//       <section className="section" style={{ paddingTop: "170px" }}>
//         <div className="container">
//                   {emergency && (
//             <motion.div
//               animate={{
//                 scale: [1, 1.02, 1],
//               }}
//               transition={{
//                 repeat: Infinity,
//                 duration: 0.8,
//               }}
//               style={{
//                 background: "#dc2626",
//                 color: "white",
//                 padding: "24px",
//                 borderRadius: "24px",
//                 textAlign: "center",
//                 fontWeight: 700,
//                 fontSize: "1.2rem",
//                 marginBottom: "24px",
//                 boxShadow:
//                   "0 0 60px rgba(220,38,38,0.45)",
//               }}
//             >
//               🚨 EMERGENCY ALERT ACTIVE 🚨
//             </motion.div>
//           )}

//           {/* HERO */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
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
//                   Smart Patient Assistance
//                 </h1>

//                 <p
//                   style={{
//                     marginTop: "18px",
//                     color: "#7A5C52",
//                   }}
//                 >
//                   Intelligent assistive communication system for
//                   patient care.
//                 </p>
//               </div>

//               <img
//                 src={heroImage}
//                 alt="healthcare"
//                 style={{
//                   width: "100%",
//                   height: "260px",
//                   objectFit: "cover",
//                   borderRadius: "24px",
//                 }}
//               />
//             </div>
//           </motion.div>

//           {/* STATUS */}
//           <div
//             style={{
//               marginTop: "30px",
//               display: "grid",
//               gridTemplateColumns:
//                 "repeat(auto-fit,minmax(260px,1fr))",
//               gap: "20px",
//             }}
//           >
//             <motion.div
//               whileHover={{ y: -8 }}
//               className="glass-card"
//               style={{ padding: "28px" }}
//             >
//               <HeartPulse />
//               <h3 style={{ marginTop: "16px" }}>Monitoring</h3>
//               <div
//   style={{
//     marginTop: "10px",
//     color: "#7A5C52",
//     lineHeight: 1.8,
//   }}
// >
//               <div>{monitoring ? "Active" : "Inactive"}</div>
//               <div>F1: {sensorData.f1}</div>
//               <div>F2: {sensorData.f2}</div>
//               <div>F3: {sensorData.f3}</div>
//             </div>
//             </motion.div>

//             <motion.div
//               whileHover={{ y: -8 }}
//               className="glass-card"
//               style={{ padding: "28px" }}
//             >
//               <HandHelping />
//               <h3 style={{ marginTop: "16px" }}>
//                 Current Request
//               </h3>
//               <p style={{ marginTop: "10px", color: "#7A5C52" }}>
//                 {request}
//               </p>
//             </motion.div>

//             <motion.div
//               whileHover={{ y: -8 }}
//               className="glass-card"
//               style={{
//                 padding: "28px",
//                 textAlign: "center",
//               }}
//             >
//               <Cpu
//                 color={
//                   arduinoConnected ? "#16A34A" : "#F59E0B"
//                 }
//               />

//               <h3 style={{ marginTop: "16px" }}>
//                 Arduino Device
//               </h3>

//               <p
//                 style={{
//                   marginTop: "10px",
//                   color: arduinoConnected
//                     ? "#16A34A"
//                     : "#F59E0B",
//                   fontWeight: 700,
//                 }}
//               >
//                 {arduinoConnected
//                   ? "Connected"
//                   : "Waiting to Connect"}
//               </p>
//             </motion.div>
//           </div>

//           {/* REQUESTS */}
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="glass-card"
//             style={{
//               marginTop: "30px",
//               padding: "34px",
//             }}
//           >
//             <h2>Patient Requests</h2>

//             <div
//               style={{
//                 marginTop: "24px",
//                 display: "grid",
//                 gridTemplateColumns:
//                   "repeat(auto-fit,minmax(220px,1fr))",
//                 gap: "20px",
//               }}
//             >
//               {requests.map((item) => (
//                 <motion.button
//                   key={item.title}
//                   whileHover={{
//                     y: -10,
//                     scale: 1.03,
//                   }}
//                   className="glass-card"
//                   style={{
//                     padding: "28px",
//                     border: "none",
//                     background: "transparent",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {item.icon}
//                   <h3 style={{ marginTop: "16px" }}>
//                     {item.title}
//                   </h3>
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//                     {/* CONTROLS */}
//           <motion.div
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             style={{
//               marginTop: "30px",
//               display: "grid",
//               gridTemplateColumns:
//                 "repeat(auto-fit,minmax(220px,1fr))",
//               gap: "20px",
//             }}
//           >
//             <button
//               className="primary-btn"
//               onClick={startMonitoring}
//             >
//               <Play size={18} /> Start Monitoring
//             </button>

//             <button
//               className="secondary-btn"
//               onClick={stopMonitoring}
//             >
//               <Square size={18} /> Stop Monitoring
//             </button>

//             <button
//               className="primary-btn"
//               onClick={triggerEmergency}
//             >
//               <AlertTriangle size={18} /> Emergency
//             </button>

//             {emergency && (
//               <button
//                 className="secondary-btn"
//                 onClick={stopEmergency}
//               >
//                 <BellOff size={18} /> Stop Alert
//               </button>
//             )}
//           </motion.div>
//          </div>
//       </section>
//     </motion.div>
//   );
// }

// export default Mode2Page;
import DashboardNavbar from "../components/DashboardNavbar";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  HeartPulse,
  HandHelping,
  Droplets,
  Bath,
  AlertTriangle,
  BellOff,
  Play,
  Square,
  Cpu,
  Activity,
  Siren,
} from "lucide-react";

import {
  useState,
  useRef,
  useEffect,
} from "react";

function Mode2Page() {
  const isMobile =
    window.innerWidth < 1000;

  const [monitoring, setMonitoring] =
    useState(false);

  const [emergency, setEmergency] =
    useState(false);

  const [
    arduinoConnected,
    setArduinoConnected,
  ] = useState(false);

  const [request, setRequest] =
    useState(
      "Waiting for patient request..."
    );

  const [sensorData, setSensorData] =
    useState({
      f1: 0,
      f2: 0,
      f3: 0,
    });

  const [
    emergencySuppressed,
    setEmergencySuppressed,
  ] = useState(false);

  const [
    lastSpokenRequest,
    setLastSpokenRequest,
  ] = useState("");

  const API_BASE =
    "http://127.0.0.1:5000/api/mode2";

  const speechInterval =
    useRef(null);

  const audioContextRef =
    useRef(null);

  const oscillatorRef =
    useRef(null);

  const { scrollY } =
    useScroll();

  const bgY = useTransform(
    scrollY,
    [0, 1000],
    ["0%", "35%"]
  );

  const bgImage =
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80";

  const heroImage =
    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80";

  const requests = [
    {
      title: "Need Help",
      icon: <HandHelping size={26} />,
      message:
        "Patient needs assistance",
    },
    {
      title: "Need Water",
      icon: <Droplets size={26} />,
      message:
        "Patient needs water",
    },
    {
      title: "Washroom",
      icon: <Bath size={26} />,
      message:
        "Patient needs washroom",
    },
  ];

  const speakEmergency = () => {
    if (
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          "Emergency! Patient needs immediate assistance!"
        );

      utterance.rate = 1;
      utterance.pitch = 1;

      window.speechSynthesis.speak(
        utterance
      );
    }
  };

  const startBeep = () => {
    const audioContext =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

    const oscillator =
      audioContext.createOscillator();

    const gainNode =
      audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 880;
    gainNode.gain.value = 0.12;

    oscillator.connect(gainNode);
    gainNode.connect(
      audioContext.destination
    );

    oscillator.start();

    oscillatorRef.current =
      oscillator;

    audioContextRef.current =
      audioContext;
  };

  const stopBeep = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const triggerEmergency = () => {
    if (emergency) return;

    setEmergency(true);

    speakEmergency();

    startBeep();

    speechInterval.current =
      setInterval(() => {
        speakEmergency();
      }, 5000);
  };

  const stopEmergency =
    async () => {
      setEmergency(false);

      setEmergencySuppressed(
        true
      );

      window.speechSynthesis.cancel();

      if (
        speechInterval.current
      ) {
        clearInterval(
          speechInterval.current
        );

        speechInterval.current =
          null;
      }

      stopBeep();

      await fetch(
        `${API_BASE}/reset-emergency`
      );
    };

  const fetchStatus =
    async () => {
      try {
        const res = await fetch(
          `${API_BASE}/status`
        );

        const data =
          await res.json();

        setMonitoring(
          data.mode_running
        );

        setArduinoConnected(
          data.arduino_connected
        );

        if (data.sensor_data) {
          setSensorData({
            f1: data.sensor_data.f1,
            f2: data.sensor_data.f2,
            f3: data.sensor_data.f3,
          });
        }

        const currentRequest =
          data.request &&
          data.request !== ""
            ? data.request
            : "Waiting for patient request...";

        setRequest(currentRequest);

        if (
          data.emergency &&
          !emergencySuppressed
        ) {
          triggerEmergency();
        } else if (
          !data.emergency &&
          emergency
        ) {
          stopEmergency();
        }
      } catch (error) {
        console.error(
          "Mode2 status error:",
          error
        );
      }
    };

  useEffect(() => {
    let interval;

    if (monitoring) {
      interval = setInterval(() => {
        fetchStatus();
      }, 500);
    }

    return () => {
      if (interval)
        clearInterval(interval);
    };
  }, [monitoring, emergency]);

  const startMonitoring =
    async () => {
      await fetch(
        `${API_BASE}/start`
      );

      setMonitoring(true);

      setEmergencySuppressed(
        false
      );

      setLastSpokenRequest("");

      fetchStatus();
    };

  const stopMonitoring =
    async () => {
      await fetch(
        `${API_BASE}/stop`
      );

      setMonitoring(false);

      setRequest(
        "Waiting for patient request..."
      );

      setArduinoConnected(false);

      setSensorData({
        f1: 0,
        f2: 0,
        f3: 0,
      });

      setLastSpokenRequest("");

      stopEmergency();
    };
      useEffect(() => {
    if (emergency) return;

    if (
      request ===
      "Waiting for patient request..."
    ) {
      window.speechSynthesis.cancel();
      setLastSpokenRequest("");
      return;
    }

    if (request === "EMERGENCY ALERT") {
      return;
    }

    if (request === lastSpokenRequest) {
      return;
    }

    let speechText = "";

    if (request === "NEED HELP") {
      speechText =
        "Patient needs assistance";
    } else if (
      request === "NEED WATER"
    ) {
      speechText =
        "Patient needs water";
    } else if (
      request === "NEED WASHROOM"
    ) {
      speechText =
        "Patient needs washroom assistance";
    }

    if (speechText !== "") {
      window.speechSynthesis.cancel();

      const utterance =
        new SpeechSynthesisUtterance(
          speechText
        );

      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(
        utterance
      );

      setLastSpokenRequest(request);
    }
  }, [request, emergency]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();

      if (
        speechInterval.current
      ) {
        clearInterval(
          speechInterval.current
        );
      }

      stopBeep();
    };
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 80,
        filter: "blur(16px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="page-container"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(236,248,255,0.82), rgba(245,250,255,0.90)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPositionY: bgY,
        backgroundPositionX:
          "center",
        backgroundRepeat:
          "no-repeat",
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
          {/* EMERGENCY ALERT */}
          {emergency && (
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 0 40px rgba(220,38,38,0.45)",
                  "0 0 80px rgba(220,38,38,0.7)",
                  "0 0 40px rgba(220,38,38,0.45)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
              }}
              style={{
                background:
                  "linear-gradient(135deg,#dc2626,#991b1b)",
                color: "white",
                padding:
                  isMobile
                    ? "18px"
                    : "24px",
                borderRadius:
                  "24px",
                textAlign:
                  "center",
                fontWeight: 800,
                fontSize:
                  isMobile
                    ? "1rem"
                    : "1.2rem",
                marginBottom:
                  "24px",
              }}
            >
              🚨 EMERGENCY ALERT ACTIVE 🚨
            </motion.div>
          )}

          {/* HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
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
                alignItems:
                  "center",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: "12px",
                  }}
                >
                  <HeartPulse />

                  <h1
                    style={{
                      fontSize:
                        isMobile
                          ? "2.3rem"
                          : "4rem",
                    }}
                  >
                    Smart Patient Assistance
                  </h1>
                </div>

                <p
                  style={{
                    marginTop:
                      "18px",
                    color:
                      "#7A5C52",
                    lineHeight:
                      1.8,
                    fontSize:
                      "1.05rem",
                  }}
                >
                  Intelligent assistive communication system for patient care and emergency response.
                </p>
              </div>

              <motion.img
                whileHover={{
                  scale: 1.03,
                }}
                src={heroImage}
                alt="healthcare"
                style={{
                  width: "100%",
                  height:
                    isMobile
                      ? "240px"
                      : "260px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "24px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.10)",
                }}
              />
            </div>
          </motion.div>

          {/* STATUS */}
          <div
            style={{
              marginTop: "30px",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "20px",
            }}
          >            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="glass-card"
              style={{
                padding: "30px",
                boxShadow:
                  "0 18px 45px rgba(0,0,0,0.08)",
              }}
            >
              <motion.div
                animate={
                  monitoring
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                }}
              >
                <HeartPulse
                  size={34}
                  color={
                    monitoring
                      ? "#16A34A"
                      : "#F59E0B"
                  }
                />
              </motion.div>

              <h3
                style={{
                  marginTop: "18px",
                }}
              >
                Monitoring Status
              </h3>

              <div
                style={{
                  marginTop: "14px",
                  color: "#7A5C52",
                  lineHeight: 1.9,
                  fontWeight: 600,
                }}
              >
                <div>
                  Status:{" "}
                  {monitoring
                    ? "Active"
                    : "Inactive"}
                </div>
                <div>
                  F1: {sensorData.f1}
                </div>
                <div>
                  F2: {sensorData.f2}
                </div>
                <div>
                  F3: {sensorData.f3}
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="glass-card"
              style={{
                padding: "30px",
                boxShadow:
                  "0 18px 45px rgba(0,0,0,0.08)",
              }}
            >
              <motion.div
                animate={
                  request !==
                    "Waiting for patient request..." &&
                  !emergency
                    ? {
                        scale: [1, 1.08, 1],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.3,
                }}
              >
                <HandHelping
                  size={34}
                />
              </motion.div>

              <h3
                style={{
                  marginTop: "18px",
                }}
              >
                Current Request
              </h3>

              <p
                style={{
                  marginTop: "14px",
                  color: "#7A5C52",
                  lineHeight: 1.8,
                  fontWeight: 600,
                }}
              >
                {request}
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="glass-card"
              style={{
                padding: "30px",
                textAlign: "center",
                boxShadow:
                  "0 18px 45px rgba(0,0,0,0.08)",
              }}
            >
              <motion.div
                animate={
                  arduinoConnected
                    ? {
                        scale: [1, 1.12, 1],
                      }
                    : {}
                }
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                }}
              >
                <Cpu
                  size={36}
                  color={
                    arduinoConnected
                      ? "#16A34A"
                      : "#F59E0B"
                  }
                />
              </motion.div>

              <h3
                style={{
                  marginTop: "16px",
                }}
              >
                Arduino Device
              </h3>

              <p
                style={{
                  marginTop: "12px",
                  color:
                    arduinoConnected
                      ? "#16A34A"
                      : "#F59E0B",
                  fontWeight: 700,
                }}
              >
                {arduinoConnected
                  ? "Connected"
                  : "Waiting to Connect"}
              </p>
            </motion.div>
          </div>

          {/* PATIENT REQUESTS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="glass-card"
            style={{
              marginTop: "30px",
              padding: isMobile
                ? "26px"
                : "36px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: "12px",
              }}
            >
              <Activity />

              <h2>
                Patient Request Dashboard
              </h2>
            </div>

            <div
              style={{
                marginTop: "26px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
              }}
            >
              {requests.map(
                (item) => (
                  <motion.div
                    key={
                      item.title
                    }
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                    }}
                    className="glass-card"
                    style={{
                      padding:
                        "30px",
                      textAlign:
                        "center",
                      boxShadow:
                        "0 16px 40px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "inline-flex",
                        padding:
                          "16px",
                        borderRadius:
                          "18px",
                        background:
                          "rgba(255,255,255,0.72)",
                      }}
                    >
                      {
                        item.icon
                      }
                    </div>

                    <h3
                      style={{
                        marginTop:
                          "18px",
                      }}
                    >
                      {
                        item.title
                      }
                    </h3>

                    <p
                      style={{
                        marginTop:
                          "12px",
                        color:
                          "#7A5C52",
                        lineHeight:
                          1.7,
                      }}
                    >
                      {
                        item.message
                      }
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* CONTROLS */}
          <motion.div
  initial={{
    opacity: 0,
    y: 60,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : "repeat(4,1fr)",
    gap: "18px",
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
    onClick={startMonitoring}
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
    Start Monitoring
  </motion.button>

  <motion.button
    whileHover={{
      scale: 1.03,
      y: -2,
    }}
    whileTap={{
      scale: 0.98,
    }}
    onClick={stopMonitoring}
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
    Stop Monitoring
  </motion.button>

  <motion.button
    whileHover={{
      scale: 1.03,
      y: -2,
    }}
    whileTap={{
      scale: 0.98,
    }}
    onClick={triggerEmergency}
    style={{
      padding: "16px 18px",
      border: "none",
      borderRadius: "18px",
      background:
        "linear-gradient(135deg,#EF4444,#DC2626)",
      color: "white",
      fontSize: "1rem",
      fontWeight: 700,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      boxShadow:
        "0 14px 28px rgba(220,38,38,0.28)",
    }}
  >
    <AlertTriangle size={18} />
    Emergency Alert
  </motion.button>

  {emergency && (
    <motion.button
      whileHover={{
        scale: 1.03,
        y: -2,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={stopEmergency}
      style={{
        padding: "16px 18px",
        border: "none",
        borderRadius: "18px",
        background:
          "linear-gradient(135deg,#991B1B,#7F1D1D)",
        color: "white",
        fontSize: "1rem",
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        boxShadow:
          "0 14px 28px rgba(127,29,29,0.28)",
      }}
    >
      <BellOff size={18} />
      Stop Alert
    </motion.button>
  )}
</motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default Mode2Page;