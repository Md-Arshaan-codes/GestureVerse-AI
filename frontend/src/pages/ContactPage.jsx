import DashboardNavbar from "../components/DashboardNavbar";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Upload,
  Loader2,
  FileText,
} from "lucide-react";
import { useState } from "react";

function ContactPage() {
  const isMobile = window.innerWidth < 950;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [statusMessage, setStatusMessage] =
    useState("");

  const [isSuccess, setIsSuccess] =
    useState(false);

  const { scrollY } = useScroll();

  const bgY = useTransform(
    scrollY,
    [0, 1000],
    ["0%", "35%"]
  );

  const bgImage =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80";

  const heroImage =
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file =
      e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    if (
      file.type.startsWith(
        "image/"
      )
    ) {
      setPreviewUrl(
        URL.createObjectURL(file)
      );
    } else {
      setPreviewUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setIsSuccess(false);
      setStatusMessage(
        "Please fill all mandatory fields."
      );
      return;
    }

    try {
      setLoading(true);

      const payload =
        new FormData();

      payload.append(
        "name",
        formData.name
      );

      payload.append(
        "email",
        formData.email
      );

      payload.append(
        "subject",
        formData.subject
      );

      payload.append(
        "message",
        formData.message
      );

      if (selectedImage) {
        payload.append(
          "attachment",
          selectedImage
        );
      }

      const response =
        await fetch(
          "http://127.0.0.1:5000/api/contact/send",
          {
            method: "POST",
            body: payload,
          }
        );

      const data =
        await response.json();

      if (data.success) {
        setIsSuccess(true);

        setStatusMessage(
          "Message sent successfully."
        );

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        setSelectedImage(null);
        setPreviewUrl("");
      } else {
        setIsSuccess(false);

        setStatusMessage(
          data.message ||
            "Failed to send message."
        );
      }
    } catch (err) {
      setIsSuccess(false);

      setStatusMessage(
        "Server connection error."
      );
    } finally {
      setLoading(false);
    }
  };

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
          {/* HERO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 60,
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
                ? "28px"
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
                    : "1.3fr 1fr",
                gap: "30px",
                alignItems:
                  "center",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize:
                      isMobile
                        ? "2.6rem"
                        : "4rem",
                    lineHeight: 1.1,
                  }}
                >
                  Let's Connect
                </h1>

                <p
                  style={{
                    marginTop:
                      "20px",
                    color:
                      "#7A5C52",
                    lineHeight: 1.8,
                    fontSize:
                      isMobile
                        ? "1rem"
                        : "1.05rem",
                  }}
                >
                  Reach out for
                  collaborations,
                  technical
                  discussions,
                  deployment
                  support, project
                  demonstrations,
                  and innovation
                  partnerships.
                </p>
              </div>

              <motion.img
                whileHover={{
                  scale: 1.03,
                }}
                src={heroImage}
                alt="contact"
                style={{
                  width: "100%",
                  height:
                    isMobile
                      ? "240px"
                      : "280px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "28px",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.10)",
                }}
              />
            </div>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{
              opacity: 0,
              y: 70,
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
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                icon: <Mail />,
                text: "support@gestureverseai.com",
              },
              {
                icon: <MapPin />,
                text: "Project Development Lab",
              },
              {
                icon: <Phone />,
                text: "+91 XXXXX XXXXX",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="glass-card"
                style={{
                  padding: "30px",
                  textAlign:
                    "center",
                  boxShadow:
                    "0 18px 45px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    display:
                      "inline-flex",
                    padding:
                      "14px",
                    borderRadius:
                      "18px",
                    background:
                      "rgba(255,255,255,0.72)",
                  }}
                >
                  {item.icon}
                </div>

                <p
                  style={{
                    marginTop:
                      "18px",
                    color:
                      "#7A5C52",
                    fontWeight: 600,
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{
              opacity: 0,
              y: 80,
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
              marginTop: "40px",
              padding: isMobile
                ? "28px"
                : "50px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                fontSize:
                  isMobile
                    ? "2rem"
                    : "2.5rem",
              }}
            >
              Send a Message
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              style={{
                marginTop:
                  "30px",
                display:
                  "grid",
                gap: "22px",
              }}
            >
                            <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Your Name *"
                onChange={handleChange}
                className="contact-input"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Your Email *"
                onChange={handleChange}
                className="contact-input"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                placeholder="Subject *"
                onChange={handleChange}
                className="contact-input"
              />

              <textarea
                name="message"
                rows={6}
                value={formData.message}
                placeholder="Your Message *"
                onChange={handleChange}
                className="contact-input"
              />

              {/* ATTACHMENT */}
              <motion.label
                whileHover={{
                  scale: 1.02,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="glass-card"
                style={{
                  padding: "24px",
                  cursor: "pointer",
                  textAlign: "center",
                  border:
                    "2px dashed rgba(184,106,78,0.25)",
                  background:
                    "rgba(255,255,255,0.55)",
                }}
              >
                <Upload size={26} />

                <p
                  style={{
                    marginTop: "12px",
                    fontWeight: 700,
                  }}
                >
                  Upload Image / Attachment
                </p>

                <p
                  style={{
                    marginTop: "6px",
                    color: "#7A5C52",
                    fontSize: "0.95rem",
                  }}
                >
                  Click to attach supporting files
                </p>

                <input
                  type="file"
                  hidden
                  onChange={
                    handleImageUpload
                  }
                />
              </motion.label>

              {/* PREVIEW */}
              {selectedImage && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="glass-card"
                  style={{
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="preview"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "16px",
                        display: "flex",
                        justifyContent:
                          "center",
                        alignItems:
                          "center",
                        background:
                          "rgba(255,255,255,0.75)",
                      }}
                    >
                      <FileText
                        size={34}
                      />
                    </div>
                  )}

                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        marginBottom:
                          "8px",
                      }}
                    >
                      Attachment Ready
                    </p>

                    <p
                      style={{
                        color:
                          "#7A5C52",
                        fontSize:
                          "0.95rem",
                        wordBreak:
                          "break-word",
                      }}
                    >
                      {
                        selectedImage.name
                      }
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STATUS */}
              {statusMessage && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  style={{
                    padding: "18px",
                    borderRadius:
                      "18px",
                    textAlign:
                      "center",
                    fontWeight: 700,
                    background:
                      isSuccess
                        ? "rgba(34,197,94,0.12)"
                        : "rgba(239,68,68,0.12)",
                    color:
                      isSuccess
                        ? "#15803D"
                        : "#B91C1C",
                    boxShadow:
                      isSuccess
                        ? "0 10px 25px rgba(34,197,94,0.08)"
                        : "0 10px 25px rgba(239,68,68,0.08)",
                  }}
                >
                  {statusMessage}
                </motion.div>
              )}

              {/* BUTTON */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                type="submit"
                disabled={loading}
                className="primary-btn"
                style={{
                  padding: "18px",
                  fontSize: "1.05rem",
                  opacity:
                    loading
                      ? 0.75
                      : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  gap: "12px",
                }}
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="spin"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          
          {/* SOCIAL */}
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
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "18px" : "28px",
              flexWrap: "wrap",
              paddingBottom: "40px",
            }}
          >
            {[
              { symbol: "f", link: "#" },
              { symbol: "▶", link: "#" },
              { symbol: "X", link: "#" },
              { symbol: "in", link: "#" },
            ].map((item, i) => (
              <motion.a
                key={i}
                whileHover={{
                  scale: 1.18,
                  y: -5,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: isMobile ? "1.2rem" : "1.6rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  fontFamily: "Arial, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.symbol}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default ContactPage;