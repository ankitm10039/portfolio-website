import { Box, Container, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import {
  FaAws,
  FaBitbucket,
  FaBrain,
  FaCloud,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaGitlab,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import { resumeData } from "../data/resumeData";

const getIconForSkill = (skill: string) => {
  const s = skill.toLowerCase();
  if (s.includes("html"))
    return <FaHtml5 color="#E34F26" style={{ marginRight: "8px" }} />;
  if (s.includes("css"))
    return <FaCss3Alt color="#1572B6" style={{ marginRight: "8px" }} />;
  if (s.includes("javascript") || s.includes("js"))
    return <FaJs color="#F7DF1E" style={{ marginRight: "8px" }} />;
  if (s.includes("json"))
    return <FaCode color="#ffffff" style={{ marginRight: "8px" }} />;
  if (s.includes("react") || s.includes("next"))
    return <FaReact color="#61DAFB" style={{ marginRight: "8px" }} />;
  if (s.includes("vue") || s.includes("nuxt") || s.includes("quasar"))
    return <FaVuejs color="#4FC08D" style={{ marginRight: "8px" }} />;
  if (s.includes("node") || s.includes("express"))
    return <FaNodeJs color="#339933" style={{ marginRight: "8px" }} />;
  if (s.includes("python"))
    return <FaPython color="#3776AB" style={{ marginRight: "8px" }} />;
  if (s.includes("mysql") || s.includes("sql") || s.includes("database"))
    return <FaDatabase color="#4479A1" style={{ marginRight: "8px" }} />;
  if (
    s.includes("tensor") ||
    s.includes("scikit") ||
    s.includes("machine learning") ||
    s.includes("artificial") ||
    s.includes("ai") ||
    s.includes("ml")
  )
    return <FaBrain color="#FF6F00" style={{ marginRight: "8px" }} />;
  if (s.includes("github"))
    return <FaGithub color="#ffffff" style={{ marginRight: "8px" }} />;
  if (s.includes("gitlab"))
    return <FaGitlab color="#FCA121" style={{ marginRight: "8px" }} />;
  if (s.includes("bitbucket"))
    return <FaBitbucket color="#205081" style={{ marginRight: "8px" }} />;
  if (s.includes("git"))
    return <FaGitAlt color="#F05032" style={{ marginRight: "8px" }} />;
  if (s.includes("heroku") || s.includes("cloud"))
    return <FaCloud color="#430098" style={{ marginRight: "8px" }} />;
  if (s.includes("aws") || s.includes("amazon"))
    return <FaAws color="#FF9900" style={{ marginRight: "8px" }} />;

  return <FaCode color="#888888" style={{ marginRight: "8px" }} />;
};

const Skills: React.FC = () => {
  const { languages, frameworks, tools } = resumeData.technicalSkills;

  const SkillCategory = ({
    title,
    skills,
    delay,
  }: {
    title: string;
    skills: string[];
    delay: number;
  }) => (
    <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "30%" } }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay }}
        style={{ height: "100%" }}
      >
        <Paper
          className="glass-box"
          sx={{
            p: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 10px 30px rgba(0, 242, 254, 0.2)",
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 700, color: "#00f2fe" }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            {skills.map((skill, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.05)",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(0, 242, 254, 0.2)",
                    borderColor: "#00f2fe",
                  },
                }}
              >
                {getIconForSkill(skill)}
                {skill}
              </Box>
            ))}
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );

  return (
    <Box id="skills" sx={{ py: 10, position: "relative" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" sx={{ mb: 8, textAlign: "center" }}>
            Technical <span className="gradient-text">Skills</span>
          </Typography>
        </motion.div>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
            }}
          >
            <SkillCategory title="Languages" skills={languages} delay={0.1} />
            <SkillCategory title="Tools & Cloud" skills={tools} delay={0.3} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: { xs: "100%", lg: "85%" } }}>
              <SkillCategory
                title="Frameworks & Tech"
                skills={frameworks}
                delay={0.5}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
