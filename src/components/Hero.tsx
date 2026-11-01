import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Box, Button, Container, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import React, { Suspense, lazy } from "react";
import { resumeData, yearsOfExperience } from "../data/resumeData";
import { useAppTheme } from "../theme/useAppTheme";
import profileImg from "../assets/Profile.webp";
import TypewriterText from "./TypewriterText";

// Loaded separately so the particle engine doesn't block the first paint
const ParticleBackground = lazy(() => import("./ParticleBackground"));

interface HeroProps {
  onDownloadClick: () => void;
  // True once the loader and welcome screen are gone, so the typing is actually seen
  introReady: boolean;
}

const NAME_TYPE_SPEED = 120;

const Hero: React.FC<HeroProps> = ({ onDownloadClick, introReady }) => {
  const { mode, accent } = useAppTheme();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const reduceMotion = useReducedMotion();
  const showParticles = isDesktop && !reduceMotion;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const socialLinks = [
    { href: resumeData.socialLinks.linkedin, label: "LinkedIn profile", icon: <LinkedInIcon fontSize="large" />, hover: "primary.main" },
    { href: resumeData.socialLinks.github, label: "GitHub profile", icon: <GitHubIcon fontSize="large" />, hover: "primary.main" },
    { href: resumeData.socialLinks.whatsapp, label: "Chat on WhatsApp", icon: <WhatsAppIcon fontSize="large" />, hover: "#25D366" },
  ];

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        pt: { xs: "90px", md: "110px" },
        pb: { xs: "60px", md: "80px" },
      }}
    >
      {showParticles && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, maxWidth: { md: "600px" } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "4.2rem", md: "7rem" }, lineHeight: 1, mb: 1, fontFamily: '"Tangerine", cursive', fontWeight: 700, letterSpacing: 0 }}
              >
                <TypewriterText text={resumeData.personalInfo.name} start={introReady} startDelay={300} typeSpeed={NAME_TYPE_SPEED} loop pauseMs={4000} deleteSpeed={60} />
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h3"
                component="p"
                sx={{
                  color: 'primary.main',
                  fontFamily: '"Tangerine", cursive',
                  fontWeight: 700,
                  fontSize: { xs: "2.4rem", sm: "2.8rem", md: "3.4rem" },
                  lineHeight: 1.15,
                  letterSpacing: 0,
                  mb: 3,
                }}
              >
                {/* Starts once the name has finished, then keeps typing and erasing */}
                <TypewriterText
                  text={resumeData.personalInfo.role}
                  start={introReady}
                  startDelay={300 + resumeData.personalInfo.name.length * NAME_TYPE_SPEED + 600}
                  typeSpeed={70}
                  loop
                  pauseMs={3000}
                />
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typography
                variant="h6"
                component="p"
                sx={{
                  color: "text.secondary",
                  mb: 6,
                  maxWidth: "600px",
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                Full Stack Engineer with {yearsOfExperience} years of experience building scalable web applications with Python, FastAPI,
                Vue.js, React and Next.js, from API design to cloud deployment.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={() => scrollTo("projects")}
                sx={{ mr: 2, mb: { xs: 2, sm: 0 }, px: 4, py: 1.5, fontSize: "1.1rem" }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => scrollTo("contact")}
                sx={{
                  mr: 2,
                  mb: { xs: 2, sm: 0 },
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Contact Me
              </Button>
              <Button
                variant="text"
                size="large"
                onClick={onDownloadClick}
                startIcon={<CloudDownloadIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: "1.1rem",
                  color: "primary.main",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: accent.soft },
                }}
              >
                Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
                {socialLinks.map((link) => (
                  <IconButton
                    key={link.label}
                    component="a"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    sx={{ color: "text.secondary", "&:hover": { color: link.hover } }}
                  >
                    {link.icon}
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <Box
                component="img"
                src={profileImg}
                alt="Portrait of Ankit Meena"
                width={350}
                height={350}
                fetchPriority="high"
                sx={{
                  width: { xs: 200, sm: 250, md: 350 },
                  height: { xs: 200, sm: 250, md: 350 },
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: `4px solid ${accent.glowStrong}`,
                  boxShadow: `0 0 40px ${mode === 'light' ? accent.glow : accent.glowStrong}`,
                  display: "block",
                }}
              />
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
