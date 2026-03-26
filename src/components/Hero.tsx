import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Container, IconButton, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { resumeData } from "../data/resumeData";
import profileImg from "../assets/Profile.png";
import { Typewriter } from 'react-simple-typewriter';
import resumePdf from '../assets/resume/Ankit_Meena_Resume.pdf';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const Hero: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    await loadSlim(engine);
  }, []);

  return (
    <Box
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#00f2fe" },
            links: {
              color: "#4facfe",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: false,
              speed: 1,
              straight: false,
            },
            number: { density: { enable: true, area: 800 }, value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

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
                sx={{ fontSize: { xs: "3.5rem", md: "6rem" }, mb: 1, fontFamily: '"Niconne", cursive' }}
              >
                {resumeData.personalInfo.name}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                  mb: 3,
                  fontWeight: 700,
                  minHeight: { xs: "40px", md: "60px" },
                  display: "flex",
                  alignItems: "center"
                }}
                className="gradient-text"
              >
                <Typewriter
                  words={['Senior Software Engineer', 'Full Stack Developer', 'Technical Architect']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
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
                sx={{
                  color: "text.secondary",
                  mb: 6,
                  maxWidth: "600px",
                  lineHeight: 1.8,
                  fontWeight: 400,
                }}
              >
                An enthusiastic and highly energetic professional with expertise in technical development, focused on creating high revenue-generating products.
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
                onClick={() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                sx={{ mr: 2, mb: { xs: 2, sm: 0 }, px: 4, py: 1.5, fontSize: "1.1rem" }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                sx={{
                  mr: 2,
                  mb: { xs: 2, sm: 0 },
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  borderRadius: 3,
                  borderWidth: 2,
                  "&:hover": { borderWidth: 2 },
                }}
              >
                Contact Me
              </Button>
              <Button
                variant="text"
                size="large"
                component="a"
                href={resumePdf}
                download="Ankit_Meena_Resume.pdf"
                startIcon={<CloudDownloadIcon />}
                sx={{
                  px: 3,
                  py: 1.5,
                  fontSize: "1.1rem",
                  color: "#00f2fe",
                  "&:hover": { backgroundColor: "rgba(0, 242, 254, 0.1)" },
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
                <IconButton
                  component="a"
                  href={resumeData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "#00f2fe" },
                  }}
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
                <IconButton
                  component="a"
                  href={resumeData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "#00f2fe" },
                  }}
                >
                  <GitHubIcon fontSize="large" />
                </IconButton>
                <IconButton
                  component="a"
                  href={resumeData.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "#25D366" },
                  }}
                >
                  <WhatsAppIcon fontSize="large" />
                </IconButton>
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
                alt="Ankit Meena"
                sx={{
                  width: { xs: 200, sm: 250, md: 350 },
                  height: { xs: 200, sm: 250, md: 350 },
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid rgba(0, 242, 254, 0.5)",
                  boxShadow: "0 0 40px rgba(0, 242, 254, 0.4)",
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
