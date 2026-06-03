import DashboardNavbar from "../components/DashboardNavbar";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Mic,
  Play,
  Cpu,
  Volume2,
  Languages,
  Pause,
  Trash2,
  Activity,
  Radio,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

function Mode1Page() {
  const isMobile = window.innerWidth < 1100;

  const [language, setLanguage] =
    useState("English");

  const [capturing, setCapturing] =
    useState(false);

  const [speechActive, setSpeechActive] =
    useState(false);

  const [
    lastSpokenText,
    setLastSpokenText,
  ] = useState("");

  const [outputText, setOutputText] =
    useState("Waiting for gesture...");

  const [
    translatedOutput,
    setTranslatedOutput,
  ] = useState("Waiting for gesture...");

  const [
    arduinoConnected,
    setArduinoConnected,
  ] = useState(false);

  const [sensorText, setSensorText] =
    useState("No sensor data");

  const [sensorData, setSensorData] =
    useState(null);

  const audioRef = useRef(null);

  const API_BASE =
    "http://127.0.0.1:5000/api/mode1";

  const languageMap = {
    English: "en",
    Hindi: "hi",
    Arabic: "ar",
    French: "fr",
    Spanish: "es",
    Urdu: "ur",
  };

  const translateText = async (
    text,
    targetLang
  ) => {
    try {
      if (
        !text ||
        text === "Waiting for gesture..."
      ) {
        setTranslatedOutput(
          "Waiting for gesture..."
        );
        return;
      }

      if (targetLang === "en") {
        setTranslatedOutput(text);
        return;
      }

      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text
        )}`
      );

      const data = await res.json();

      const translated =
        data[0]
          ?.map((item) => item[0])
          .join("");

      setTranslatedOutput(
        translated || text
      );
    } catch (error) {
      console.error(
        "Translation error:",
        error
      );

      setTranslatedOutput(text);
    }
  };

  const { scrollY } = useScroll();

  const bgY = useTransform(
    scrollY,
    [0, 1000],
    ["0%", "35%"]
  );

  const bgImage =
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80";

  const waveform = [
    30, 55, 40, 75, 48, 68, 35, 60, 42,
  ];

  const fetchStatus = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/status`
      );

      const data = await res.json();

      setArduinoConnected(
        data.arduino_connected
      );

      setCapturing(data.running);

      if (
        data.prediction &&
        data.prediction.trim() !== ""
      ) {
        const detectedGesture =
          data.prediction.toUpperCase();

        setOutputText(detectedGesture);
      } else {
        setOutputText(
          "Waiting for gesture..."
        );

        setTranslatedOutput(
          "Waiting for gesture..."
        );
      }

      if (data.sensor_data) {
        const s = data.sensor_data;

        setSensorData(s);

        setSensorText(
          `F1: ${s.f1} | F2: ${s.f2} | F3: ${s.f3}
X: ${s.x} | Y: ${s.y} | Z: ${s.z}`
        );
      } else {
        setSensorText("No sensor data");
        setSensorData(null);
      }
    } catch (error) {
      console.error(
        "Status fetch error:",
        error
      );
    }
  };

  useEffect(() => {
    let interval;

    if (capturing) {
      interval = setInterval(() => {
        fetchStatus();
      }, 500);
    }

    return () => {
      if (interval)
        clearInterval(interval);
    };
  }, [capturing]);

  useEffect(() => {
    const selectedLang =
      languageMap[language] || "en";

    translateText(
      outputText,
      selectedLang
    );
  }, [outputText, language]);

  const startCapture = async () => {
    try {
      await fetch(`${API_BASE}/start`);
      setCapturing(true);
      fetchStatus();
    } catch (error) {
      console.error(
        "Start capture error:",
        error
      );
    }
  };

  useEffect(() => {
    const speakCurrentGesture =
      async () => {
        if (
          !speechActive ||
          !outputText ||
          outputText ===
            "Waiting for gesture..." ||
          outputText === lastSpokenText
        ) {
          return;
        }

        try {
          const selectedLang =
            languageMap[language] || "en";

          const res = await fetch(
            `${API_BASE}/speak`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                language:
                  selectedLang,
              }),
            }
          );

          const data =
            await res.json();

          if (
            data.success &&
            audioRef.current
          ) {
            setLastSpokenText(
              outputText
            );

            audioRef.current.src = `${API_BASE}/audio?t=${Date.now()}`;

            await audioRef.current.play();
          }
        } catch (error) {
          console.error(error);
        }
      };

    speakCurrentGesture();
  }, [
    outputText,
    speechActive,
    language,
  ]);

  const stopCapture = async () => {
    try {
      await fetch(`${API_BASE}/stop`);

      setCapturing(false);

      setOutputText(
        "Waiting for gesture..."
      );

      setTranslatedOutput(
        "Waiting for gesture..."
      );
    } catch (error) {
      console.error(
        "Stop capture error:",
        error
      );
    }
  };

  const startSpeech = async () => {
    try {
      if (
        !outputText ||
        outputText ===
          "Waiting for gesture..."
      ) {
        return;
      }

      setSpeechActive(true);
    } catch (error) {
      console.error(
        "Speech error:",
        error
      );
    }
  };

  const stopSpeech = async () => {
    try {
      await fetch(
        `${API_BASE}/stop-speech`
      );

      setSpeechActive(false);

      setLastSpokenText("");

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch (error) {
      console.error(
        "Stop speech error:",
        error
      );
    }
  };

  const clearAll = async () => {
    try {
      await fetch(`${API_BASE}/clear`);

      setCapturing(false);
      setSpeechActive(false);

      setOutputText(
        "Waiting for gesture..."
      );

      setTranslatedOutput(
        "Waiting for gesture..."
      );

      setArduinoConnected(false);

      setSensorText("No sensor data");

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } catch (error) {
      console.error(
        "Clear error:",
        error
      );
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={() => {
          if (speechActive) {
            setLastSpokenText("");
          }
        }}
      />
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
          backgroundPositionX: "center",
          backgroundRepeat: "no-repeat",
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
                  ? "28px"
                  : "42px",
                textAlign: "center",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.08)",
              }}
            >
              <h1
                style={{
                  fontSize:
                    isMobile
                      ? "2.5rem"
                      : "3.5rem",
                }}
              >
                AI Gesture Translation
              </h1>

              <p
                style={{
                  marginTop: "14px",
                  color: "#7A5C52",
                  fontSize: "1.05rem",
                }}
              >
                Real-time smart glove communication system
              </p>
            </motion.div>

            {/* MAIN GRID */}
            <div
              style={{
                marginTop: "30px",
                display: "grid",
                gridTemplateColumns:
                  isMobile
                    ? "1fr"
                    : "1.7fr 1.3fr",
                gap: "24px",
              }}
            >
              {/* LEFT PANEL */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="glass-card"
                style={{
                  padding: "28px",
                }}
              >
                <h2
                  style={{
                    fontSize: "2.2rem",
                    marginBottom: "22px",
                  }}
                >
                  Gesture Detection View
                </h2>

                <div
                  style={{
                    position: "relative",
                    borderRadius: "30px",
                    overflow: "hidden",
                    height: "360px",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
                    alt="gesture detection"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      left: "24px",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background:
                        "rgba(0,0,0,0.65)",
                      backdropFilter:
                        "blur(12px)",
                      display: "flex",
                      flexDirection:
                        "column",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      color: "white",
                    }}
                  >
                    <motion.div
                      animate={
                        capturing
                          ? {
                              scale: [
                                1,
                                1.25,
                                1,
                              ],
                              opacity: [
                                1,
                                0.6,
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
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius:
                          "50%",
                        background:
                          capturing
                            ? "#22C55E"
                            : "#EF4444",
                      }}
                    />

                    <span
                      style={{
                        marginTop:
                          "10px",
                        fontSize:
                          "0.8rem",
                        fontWeight:
                          700,
                      }}
                    >
                      {capturing
                        ? "LIVE"
                        : "STOP"}
                    </span>
                  </div>
                </div>

                {/* WAVEFORM PANEL */}
                <div
                  style={{
                    marginTop: "28px",
                    borderRadius: "28px",
                    padding: isMobile
                      ? "28px"
                      : "50px",
                    background:
                      "linear-gradient(135deg, rgba(216,140,106,0.08), rgba(255,255,255,0.7))",
                    textAlign: "center",
                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      gap: "12px",
                    }}
                  >
                    <Mic size={38} />

                    <motion.div
                      animate={
                        speechActive
                          ? {
                              scale: [
                                1,
                                1.12,
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
                      <Radio
                        size={28}
                        color={
                          speechActive
                            ? "#B86A4E"
                            : "#7A5C52"
                        }
                      />
                    </motion.div>
                  </div>

                  <div
                    style={{
                      marginTop: "34px",
                      display: "flex",
                      justifyContent:
                        "center",
                      gap: "12px",
                      alignItems:
                        "end",
                      height: "170px",
                    }}
                  >
                    {waveform.map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          animate={
                            capturing ||
                            speechActive
                              ? {
                                  height:
                                    [
                                      h *
                                        2,
                                      h *
                                        3,
                                      h *
                                        2,
                                    ],
                                }
                              : {
                                  height: `${h * 2}px`,
                                }
                          }
                          transition={{
                            repeat:
                              Infinity,
                            duration:
                              1 +
                              i *
                                0.12,
                          }}
                          style={{
                            width:
                              "18px",
                            height: `${h * 2}px`,
                            borderRadius:
                              "20px",
                            background:
                              "linear-gradient(180deg,#D88C6A,#B86A4E)",
                          }}
                        />
                      )
                    )}
                  </div>

                  <p
                    style={{
                      marginTop:
                        "24px",
                      color:
                        "#7A5C52",
                      fontWeight:
                        700,
                      fontSize:
                        "1.2rem",
                    }}
                  >
                    {capturing
                      ? "Listening for gesture input..."
                      : "Capture stopped"}
                  </p>
                </div>

                {/* DETECTED OUTPUT */}
                <div
                  style={{
                    marginTop: "28px",
                    padding: isMobile
                      ? "28px"
                      : "36px",
                    borderRadius: "24px",
                    background:
                      "rgba(255,255,255,0.68)",
                    textAlign: "center",
                    boxShadow:
                      "0 16px 40px rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      gap: "10px",
                    }}
                  >
                    <Activity />

                    <h3
                      style={{
                        fontSize:
                          "1.8rem",
                      }}
                    >
                      Detected Gesture Output
                    </h3>
                  </div>

                  <motion.h1
                    animate={
                      capturing
                        ? {
                            scale: [
                              1,
                              1.03,
                              1,
                            ],
                          }
                        : {}
                    }
                    transition={{
                      repeat:
                        Infinity,
                      duration: 2,
                    }}
                    style={{
                      marginTop:
                        "20px",
                      fontSize:
                        isMobile
                          ? "2.4rem"
                          : "4rem",
                      fontWeight:
                        800,
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {capturing
                      ? outputText
                      : "---"}
                  </motion.h1>
                </div>
              </motion.div>

              {/* RIGHT PANEL */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 70,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="glass-card"
                style={{
                  padding: "28px",
                  display: "flex",
                  flexDirection:
                    "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <h2>
                    Speech Output
                  </h2>

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: "12px",
                      flexWrap:
                        "wrap",
                    }}
                  >
                    <Languages />

                    <select
                      value={language}
                      onChange={(e) =>
                        setLanguage(
                          e.target.value
                        )
                      }
                      style={{
                        padding:
                          "14px 18px",
                        borderRadius:
                          "16px",
                        border:
                          "1px solid rgba(0,0,0,0.08)",
                        background:
                          "white",
                        fontSize:
                          "1rem",
                        fontWeight:
                          600,
                        outline:
                          "none",
                        cursor:
                          "pointer",
                      }}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Arabic</option>
                      <option>French</option>
                      <option>Spanish</option>
                      <option>Urdu</option>
                    </select>

                    <div
                      style={{
                        padding:
                          "12px 18px",
                        borderRadius:
                          "999px",
                        background:
                          capturing ||
                          speechActive
                            ? "#D88C6A"
                            : "rgba(216,140,106,0.18)",
                        color:
                          capturing ||
                          speechActive
                            ? "white"
                            : "#7A5C52",
                        fontWeight:
                          700,
                      }}
                    >
                      {capturing ||
                      speechActive
                        ? "ACTIVE"
                        : "IDLE"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "26px",
                    padding: isMobile
                      ? "24px"
                      : "36px",
                    borderRadius: "28px",
                    border:
                      "1px solid rgba(216,140,106,0.25)",
                    background:
                      "rgba(255,255,255,0.45)",
                    minHeight: "420px",
                  }}
                >
                  <p
                    style={{
                      color: "#7A5C52",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Output in {language}
                  </p>

                  <motion.h1
                    animate={
                      speechActive
                        ? {
                            scale: [
                              1,
                              1.02,
                              1,
                            ],
                          }
                        : {}
                    }
                    transition={{
                      repeat:
                        Infinity,
                      duration: 1.8,
                    }}
                    style={{
                      marginTop: "40px",
                      fontSize:
                        isMobile
                          ? "2.2rem"
                          : "3rem",
                      lineHeight: 1.2,
                      wordBreak:
                        "break-word",
                    }}
                  >
                    {translatedOutput}
                  </motion.h1>

                  <div
                    style={{
                      marginTop: "50px",
                      padding: "20px",
                      borderRadius: "18px",
                      background:
                        "rgba(216,140,106,0.08)",
                    }}
                  >
                    <h3>
                      Flex Sensor Output
                    </h3>

                    <p
                      style={{
                        marginTop:
                          "10px",
                        color:
                          "#7A5C52",
                        lineHeight:
                          1.8,
                        whiteSpace:
                          "pre-line",
                      }}
                    >
                      {capturing
                        ? sensorText
                        : "No sensor data"}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                    display: "grid",
                    gap: "14px",
                  }}
                >
                  <motion.div
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                    }}
                    className="glass-card"
                    style={{
                      padding: "22px",
                      textAlign:
                        "center",
                    }}
                  >
                    <Cpu
                      size={34}
                      color={
                        arduinoConnected
                          ? "#16A34A"
                          : "#F59E0B"
                      }
                    />

                    <h4
                      style={{
                        marginTop:
                          "14px",
                      }}
                    >
                      Arduino Connection
                    </h4>

                    <p
                      style={{
                        marginTop:
                          "10px",
                        color:
                          arduinoConnected
                            ? "#16A34A"
                            : "#F59E0B",
                        fontWeight:
                          700,
                      }}
                    >
                      {arduinoConnected
                        ? "Connected"
                        : "Waiting to Connect"}
                    </p>
                  </motion.div>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    display: "grid",
                    gridTemplateColumns:
                      isMobile
                        ? "1fr"
                        : "repeat(2,1fr)",
                    gap: "14px",
                  }}
                >
                  <button
                    className="primary-btn"
                    onClick={startCapture}
                  >
                    <Play size={18} />
                    Start Capture
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={stopCapture}
                  >
                    <Pause size={20} />
                    Stop Capture
                  </button>

                  <button
                    className="primary-btn"
                    onClick={startSpeech}
                  >
                    <Volume2 size={18} />
                    Start Speech
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={stopSpeech}
                  >
                    <Pause size={20} />
                    Stop Speech
                  </button>

                  <button
                    className="secondary-btn"
                    style={{
                      gridColumn:
                        isMobile
                          ? "span 1"
                          : "span 2",
                    }}
                    onClick={clearAll}
                  >
                    <Trash2 size={16} />
                    Clear System
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default Mode1Page;