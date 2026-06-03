// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { Lock, Mail, User } from "lucide-react";
// import { useState } from "react";
// import { registerUser } from "../services/authService";

// function SignupPage() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const bgImage =
//     "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80";

//   const sideImage =
//     "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80";

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (
//       !name ||
//       !email ||
//       !password ||
//       !confirmPassword
//     ) {
//       setError("Please fill all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (password.length < 6) {
//       setError(
//         "Password must be at least 6 characters"
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await registerUser(
//         name,
//         email,
//         password
//       );

//       if (result.success) {
//         navigate("/login");
//       } else {
//         setError(
//           result.message ||
//             "Account creation failed"
//         );
//       }
//     } catch (err) {
//       setError("Server connection error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         scale: 0.97,
//       }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//       }}
//       transition={{
//         duration: 0.8,
//       }}
//       className="page-container"
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `linear-gradient(rgba(248,244,240,0.86), rgba(250,246,242,0.92)), url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <Navbar />

//       <section
//         className="section"
//         style={{
//           paddingTop: "170px",
//         }}
//       >
//         <div className="container">
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "1.2fr 1fr",
//               gap: "60px",
//               alignItems: "center",
//             }}
//           >
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 x: -80,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               transition={{
//                 duration: 0.9,
//               }}
//             >
//               <h1
//                 style={{
//                   fontSize: "6rem",
//                   lineHeight: 1,
//                   fontWeight: 800,
//                   color: "#3E2A24",
//                 }}
//               >
//                 Create Account
//               </h1>

//               <p
//                 style={{
//                   marginTop: "24px",
//                   fontSize: "1.35rem",
//                   color: "#7A5C52",
//                   maxWidth: "600px",
//                 }}
//               >
//                 Join the cinematic GestureVerse AI ecosystem.
//               </p>

//               <motion.div
//                 whileHover={{
//                   scale: 1.03,
//                 }}
//                 style={{
//                   marginTop: "40px",
//                   borderRadius: "32px",
//                   overflow: "hidden",
//                   boxShadow:
//                     "0 25px 60px rgba(0,0,0,0.15)",
//                 }}
//               >
//                 <img
//                   src={sideImage}
//                   alt="AI Technology"
//                   style={{
//                     width: "100%",
//                     height: "380px",
//                     objectFit: "cover",
//                   }}
//                 />
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{
//                 opacity: 0,
//                 x: 80,
//                 scale: 0.94,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//                 scale: 1,
//               }}
//               transition={{
//                 duration: 0.9,
//               }}
//               className="glass-card"
//               style={{
//                 padding: "60px 50px",
//                 borderRadius: "36px",
//                 minHeight: "720px",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 boxShadow:
//                   "0 20px 60px rgba(0,0,0,0.08)",
//               }}
//             >
//               <h2
//                 style={{
//                   fontSize: "2.5rem",
//                   marginBottom: "35px",
//                   color: "#3E2A24",
//                 }}
//               >
//                 Secure Signup
//               </h2>

//               <form onSubmit={handleSignup}>
//                 <div
//                   style={{
//                     position: "relative",
//                     marginBottom: "24px",
//                   }}
//                 >
//                   <User
//                     size={20}
//                     style={{
//                       position: "absolute",
//                       left: "20px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       color: "#7A5C52",
//                     }}
//                   />

//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) =>
//                       setName(e.target.value)
//                     }
//                     placeholder="Enter Name"
//                     style={{
//                       width: "100%",
//                       padding: "22px 22px 22px 58px",
//                       borderRadius: "22px",
//                       border: "none",
//                       background:
//                         "rgba(225,233,245,0.85)",
//                       fontSize: "1.05rem",
//                       outline: "none",
//                     }}
//                   />
//                 </div>

//                 <div
//                   style={{
//                     position: "relative",
//                     marginBottom: "24px",
//                   }}
//                 >
//                   <Mail
//                     size={20}
//                     style={{
//                       position: "absolute",
//                       left: "20px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       color: "#7A5C52",
//                     }}
//                   />

//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) =>
//                       setEmail(e.target.value)
//                     }
//                     placeholder="Enter Email"
//                     style={{
//                       width: "100%",
//                       padding: "22px 22px 22px 58px",
//                       borderRadius: "22px",
//                       border: "none",
//                       background:
//                         "rgba(225,233,245,0.85)",
//                       fontSize: "1.05rem",
//                       outline: "none",
//                     }}
//                   />
//                 </div>

//                 <div
//                   style={{
//                     position: "relative",
//                     marginBottom: "24px",
//                   }}
//                 >
//                   <Lock
//                     size={20}
//                     style={{
//                       position: "absolute",
//                       left: "20px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       color: "#7A5C52",
//                     }}
//                   />

//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) =>
//                       setPassword(e.target.value)
//                     }
//                     placeholder="Enter Password"
//                     style={{
//                       width: "100%",
//                       padding: "22px 22px 22px 58px",
//                       borderRadius: "22px",
//                       border: "none",
//                       background:
//                         "rgba(225,233,245,0.85)",
//                       fontSize: "1.05rem",
//                       outline: "none",
//                     }}
//                   />
//                 </div>

//                 <div
//                   style={{
//                     position: "relative",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   <Lock
//                     size={20}
//                     style={{
//                       position: "absolute",
//                       left: "20px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       color: "#7A5C52",
//                     }}
//                   />

//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) =>
//                       setConfirmPassword(
//                         e.target.value
//                       )
//                     }
//                     placeholder="Confirm Password"
//                     style={{
//                       width: "100%",
//                       padding: "22px 22px 22px 58px",
//                       borderRadius: "22px",
//                       border: "none",
//                       background:
//                         "rgba(225,233,245,0.85)",
//                       fontSize: "1.05rem",
//                       outline: "none",
//                     }}
//                   />
//                 </div>

//                 {error && (
//                   <div
//                     style={{
//                       marginBottom: "20px",
//                       padding: "14px",
//                       borderRadius: "16px",
//                       background:
//                         "rgba(255,0,0,0.08)",
//                       color: "#B91C1C",
//                       fontWeight: 600,
//                       textAlign: "center",
//                     }}
//                   >
//                     {error}
//                   </div>
//                 )}

//                 <motion.button
//                   whileHover={{
//                     scale: 1.02,
//                     y: -2,
//                   }}
//                   whileTap={{
//                     scale: 0.98,
//                   }}
//                   type="submit"
//                   disabled={loading}
//                   className="primary-btn"
//                   style={{
//                     width: "100%",
//                     padding: "22px",
//                     fontSize: "1.1rem",
//                     borderRadius: "22px",
//                     opacity: loading ? 0.7 : 1,
//                   }}
//                 >
//                   {loading
//                     ? "Creating Account..."
//                     : "Create Account"}
//                 </motion.button>
//               </form>

//               <p
//                 style={{
//                   marginTop: "24px",
//                   textAlign: "center",
//                   color: "#7A5C52",
//                   fontWeight: 500,
//                 }}
//               >
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   style={{
//                     color: "#B86A4E",
//                     fontWeight: 700,
//                     textDecoration: "none",
//                   }}
//                 >
//                   Login
//                 </Link>
//               </p>

//               <p
//                 style={{
//                   marginTop: "20px",
//                   textAlign: "center",
//                   color: "#7A5C52",
//                 }}
//               >
//                 Return to{" "}
//                 <Link
//                   to="/"
//                   style={{
//                     color: "#B86A4E",
//                     fontWeight: 700,
//                     textDecoration: "none",
//                   }}
//                 >
//                   Home
//                 </Link>
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </motion.div>
//   );
// }

// export default SignupPage;

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { registerUser } from "../services/authService";

function SignupPage() {
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 950;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bgImage =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80";

  const sideImage =
    "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80";

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      const result = await registerUser(
        name,
        email,
        password
      );

      if (result.success) {
        navigate("/login");
      } else {
        setError(
          result.message ||
            "Account creation failed"
        );
      }
    } catch (err) {
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="page-container"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(248,244,240,0.86), rgba(250,246,242,0.92)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />

      <section
        className="section"
        style={{
          paddingTop: "170px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "1.2fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            {/* LEFT SIDE */}
            <motion.div
              initial={{
                opacity: 0,
                x: -80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
              }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(rgba(184,106,78,0.15), transparent)",
                  filter: "blur(10px)",
                  position: "absolute",
                  zIndex: 0,
                }}
              />

              <h1
                style={{
                  fontSize: isMobile
                    ? "3.2rem"
                    : "6rem",
                  lineHeight: 1,
                  fontWeight: 800,
                  color: "#3E2A24",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Create Account
              </h1>

              <p
                style={{
                  marginTop: "24px",
                  fontSize: isMobile
                    ? "1.05rem"
                    : "1.35rem",
                  color: "#7A5C52",
                  maxWidth: "600px",
                  lineHeight: 1.8,
                }}
              >
                Join the cinematic GestureVerse AI ecosystem.
              </p>

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                style={{
                  marginTop: "40px",
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={sideImage}
                  alt="AI Technology"
                  style={{
                    width: "100%",
                    height: isMobile
                      ? "280px"
                      : "380px",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* SIGNUP CARD */}
            <motion.div
              initial={{
                opacity: 0,
                x: 80,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
              }}
              className="glass-card"
              style={{
                padding: isMobile
                  ? "40px 28px"
                  : "60px 50px",
                borderRadius: "36px",
                minHeight: "720px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow:
                  "0 20px 60px rgba(0,0,0,0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "160px",
                  height: "160px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(rgba(184,106,78,0.12), transparent)",
                }}
              />

              <h2
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "35px",
                  color: "#3E2A24",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                Secure Signup
              </h2>

              <form onSubmit={handleSignup}>
                                {/* NAME */}
                <div
                  style={{
                    position: "relative",
                    marginBottom: "24px",
                  }}
                >
                  <User
                    size={20}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#7A5C52",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter Name"
                    style={{
                      width: "100%",
                      padding: "22px 22px 22px 58px",
                      borderRadius: "22px",
                      border: "none",
                      background:
                        "rgba(225,233,245,0.88)",
                      fontSize: "1.05rem",
                      outline: "none",
                      transition:
                        "all 0.3s ease",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.03)",
                    }}
                  />
                </div>

                {/* EMAIL */}
                <div
                  style={{
                    position: "relative",
                    marginBottom: "24px",
                  }}
                >
                  <Mail
                    size={20}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#7A5C52",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter Email"
                    style={{
                      width: "100%",
                      padding: "22px 22px 22px 58px",
                      borderRadius: "22px",
                      border: "none",
                      background:
                        "rgba(225,233,245,0.88)",
                      fontSize: "1.05rem",
                      outline: "none",
                      transition:
                        "all 0.3s ease",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.03)",
                    }}
                  />
                </div>

                {/* PASSWORD */}
                <div
                  style={{
                    position: "relative",
                    marginBottom: "24px",
                  }}
                >
                  <Lock
                    size={20}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#7A5C52",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter Password"
                    style={{
                      width: "100%",
                      padding:
                        "22px 58px 22px 58px",
                      borderRadius: "22px",
                      border: "none",
                      background:
                        "rgba(225,233,245,0.88)",
                      fontSize: "1.05rem",
                      outline: "none",
                      transition:
                        "all 0.3s ease",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.03)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "18px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "#7A5C52",
                      zIndex: 2,
                    }}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* CONFIRM PASSWORD */}
                <div
                  style={{
                    position: "relative",
                    marginBottom: "20px",
                  }}
                >
                  <Lock
                    size={20}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#7A5C52",
                      zIndex: 2,
                    }}
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm Password"
                    style={{
                      width: "100%",
                      padding:
                        "22px 58px 22px 58px",
                      borderRadius: "22px",
                      border: "none",
                      background:
                        "rgba(225,233,245,0.88)",
                      fontSize: "1.05rem",
                      outline: "none",
                      transition:
                        "all 0.3s ease",
                      boxShadow:
                        "0 8px 20px rgba(0,0,0,0.03)",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    style={{
                      position: "absolute",
                      right: "18px",
                      top: "50%",
                      transform:
                        "translateY(-50%)",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "#7A5C52",
                      zIndex: 2,
                    }}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* ERROR */}
                {error && (
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
                      marginBottom: "22px",
                      padding: "16px",
                      borderRadius: "18px",
                      background:
                        "rgba(255,0,0,0.08)",
                      color: "#B91C1C",
                      fontWeight: 600,
                      textAlign: "center",
                      boxShadow:
                        "0 8px 20px rgba(255,0,0,0.06)",
                    }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  disabled={loading}
                  className="primary-btn"
                  style={{
                    width: "100%",
                    padding: "22px",
                    fontSize: "1.1rem",
                    borderRadius: "22px",
                    opacity: loading ? 0.75 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="spin"
                      />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </form>

              <p
                style={{
                  marginTop: "24px",
                  textAlign: "center",
                  color: "#7A5C52",
                  fontWeight: 500,
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#B86A4E",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </p>

              <p
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  color: "#7A5C52",
                }}
              >
                Return to{" "}
                <Link
                  to="/"
                  style={{
                    color: "#B86A4E",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Home
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default SignupPage;

              