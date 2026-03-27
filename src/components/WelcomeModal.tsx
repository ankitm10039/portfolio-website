import CelebrationIcon from "@mui/icons-material/Celebration";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    // Generate random coordinates to dodge the cursor (X: -150 to 150, Y: -80 to 80)
    const newX = Math.floor(Math.random() * 300) - 150;
    const newY = Math.floor(Math.random() * 160) - 80;
    setBtnPos({ x: newX, y: newY });
  };

  // Add overflow hidden to body when modal is open to prevent scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          open={isOpen}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 9999,
            // Deep blur effect on everything behind the modal
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(5, 5, 10, 0.75)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.4 } }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              delay: 0.2,
            }}
          >
            <Box
              className="glass-box"
              sx={{
                p: { xs: 4, md: 6 },
                maxWidth: "650px",
                width: "90vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                border: "1px solid rgba(0, 242, 254, 0.3)",
                boxShadow: "0 20px 80px rgba(0,242,254,0.15)",
                borderRadius: 4,
              }}
            >
              {/* Animated 3D Waving Hand Emoji */}
              <motion.img
                src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
                alt="Waving Hand"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                style={{
                  width: "120px",
                  height: "120px",
                  marginBottom: "1rem",
                  filter: "drop-shadow(0 10px 20px rgba(0,242,254,0.3))",
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "#fff",
                  mb: 3,
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: '"Niconne", cursive',
                }}
              >
                <Typewriter
                  words={["Welcome to My Profile!"]}
                  loop={1}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  delaySpeed={1000}
                />
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 5,
                  fontSize: "1.2rem",
                  lineHeight: 1.6,
                }}
              >
                I'm Ankit, a Senior Full Stack Developer shaping the future of
                digital products. Ready to explore my journey?
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: { xs: 2, md: 3 },
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleClose}
                  endIcon={<CelebrationIcon />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    borderColor: "#00f2fe",
                    color: "#00f2fe",
                    borderWidth: 2,
                    borderRadius: "24px", // This creates the rounded-lg effect
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "transparent",
                      background:
                        "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
                      color: "#000",
                      transform: "translateY(-3px)",
                      boxShadow: "0 12px 30px rgba(0, 242, 254, 0.6)",
                    },
                  }}
                >
                  Yes, I am impressed with your profile
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
