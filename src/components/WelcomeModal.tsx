import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Backdrop, Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useEffect } from "react";
import TypewriterText from "./TypewriterText";
import { useAppTheme } from "../theme/useAppTheme";
import { yearsOfExperience } from "../data/resumeData";

interface WelcomeModalProps {
  open: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ open, onClose }) => {
  const { accent } = useAppTheme();
  const reduceMotion = useReducedMotion();

  // Lock page scroll and allow Escape to dismiss while the modal is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <Backdrop
          open={open}
          onClick={onClose}
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 10,
            backdropFilter: "blur(12px)",
            backgroundColor: accent.backdrop,
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
            transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
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
                border: `1px solid ${accent.border}`,
                boxShadow: `0 20px 80px ${accent.glow}`,
                borderRadius: 0,
              }}
            >
              <motion.span
                aria-hidden="true"
                animate={reduceMotion ? undefined : { rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                style={{ fontSize: "96px", lineHeight: 1, marginBottom: "1rem", display: "inline-block", transformOrigin: "70% 70%" }}
              >
                👋
              </motion.span>

              <Typography
                id="welcome-title"
                variant="h3"
                component="h2"
                sx={{
                  color: "text.primary",
                  mb: 3,
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: '"Tangerine", cursive',
                  fontWeight: 700,
                  fontSize: { xs: "3.2rem", md: "4.2rem" },
                }}
              >
                <TypewriterText text="Welcome to My Profile!" startDelay={600} typeSpeed={70} />
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary", mb: 5, fontSize: "1.2rem", lineHeight: 1.6 }}>
                I'm Ankit, a Full Stack Developer with {yearsOfExperience}+ years of experience building digital products.
                Ready to explore my journey?
              </Typography>

              <Button
                variant="outlined"
                size="large"
                onClick={onClose}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  borderColor: "primary.main",
                  color: "primary.main",
                  borderWidth: 2,
                  borderRadius: 0,
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "transparent",
                    background: accent.gradient,
                    color: accent.contrastText,
                    transform: "translateY(-3px)",
                    boxShadow: `0 12px 30px ${accent.glowStrong}`,
                  },
                }}
              >
                Explore My Profile
              </Button>
            </Box>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
