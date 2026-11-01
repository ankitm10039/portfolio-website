import { Box, Container, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import type { IconType } from "react-icons";
import {
  FaAws,
  FaBitbucket,
  FaBrain,
  FaCode,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaLock,
  FaNodeJs,
  FaPython,
  FaReact,
  FaVuejs,
  FaBug,
  FaUsers,
  FaTachometerAlt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFlask,
  SiGitlab,
  SiGooglebigquery,
  SiGooglegemini,
  SiGithubcopilot,
  SiGraphql,
  SiJenkins,
  SiJira,
  SiJsonwebtokens,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNuxt,
  SiOpenai,
  SiClaude,
  SiPinia,
  SiPostgresql,
  SiPostman,
  SiPrimevue,
  SiPydantic,
  SiPytest,
  SiQuasar,
  SiRedux,
  SiSqlalchemy,
  SiSqlite,
  SiTailwindcss,
  SiTrivy,
  SiTypescript,
  SiVuetify,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { resumeData } from "../data/resumeData";
import { useAppTheme } from "../theme/useAppTheme";
import type { AccentTokens } from "../theme/tokens";
import TraceBorder from './TraceBorder';

// `color: undefined` means "use the current text color" so the icon stays visible in both themes
const skillIcons: Record<string, { icon: IconType; color?: string }> = {
  "python": { icon: FaPython, color: "#3776AB" },
  "typescript": { icon: SiTypescript, color: "#3178C6" },
  "javascript": { icon: FaJs, color: "#F7DF1E" },
  "sql": { icon: FaDatabase, color: "#4479A1" },
  "html": { icon: FaHtml5, color: "#E34F26" },
  "css": { icon: FaCss3Alt, color: "#1572B6" },
  "fastapi": { icon: SiFastapi, color: "#009688" },
  "pydantic": { icon: SiPydantic, color: "#E92063" },
  "sqlalchemy": { icon: SiSqlalchemy, color: "#D71F00" },
  "flask": { icon: SiFlask },
  "node.js": { icon: FaNodeJs, color: "#339933" },
  "express.js": { icon: SiExpress },
  "restful apis": { icon: FaCode, color: "#0ea5e9" },
  "graphql": { icon: SiGraphql, color: "#E10098" },
  "microservices": { icon: FaCode, color: "#8b5cf6" },
  "vue.js 3": { icon: FaVuejs, color: "#4FC08D" },
  "nuxt.js": { icon: SiNuxt, color: "#00DC82" },
  "pinia": { icon: SiPinia, color: "#FFD859" },
  "vuex": { icon: FaVuejs, color: "#4FC08D" },
  "vuetify": { icon: SiVuetify, color: "#1867C0" },
  "quasar": { icon: SiQuasar, color: "#1976D2" },
  "primevue": { icon: SiPrimevue, color: "#41B883" },
  "react.js": { icon: FaReact, color: "#61DAFB" },
  "next.js": { icon: SiNextdotjs },
  "redux": { icon: SiRedux, color: "#764ABC" },
  "tailwind css": { icon: SiTailwindcss, color: "#06B6D4" },
  "azure ad sso (msal)": { icon: VscAzure, color: "#0078D4" },
  "jwt": { icon: SiJsonwebtokens },
  "rbac": { icon: FaLock, color: "#f59e0b" },
  "cloud security posture": { icon: FaLock, color: "#10b981" },
  "cel rule engine": { icon: FaCode, color: "#6366f1" },
  "pip-audit": { icon: FaPython, color: "#3776AB" },
  "trivy": { icon: SiTrivy, color: "#1904DA" },
  "postgresql": { icon: SiPostgresql, color: "#4169E1" },
  "ms sql server": { icon: FaDatabase, color: "#CC2927" },
  "mongodb": { icon: SiMongodb, color: "#47A248" },
  "mysql": { icon: SiMysql, color: "#4479A1" },
  "sqlite": { icon: SiSqlite, color: "#0F80CC" },
  "azure": { icon: VscAzure, color: "#0078D4" },
  "aws": { icon: FaAws, color: "#FF9900" },
  "gcp (bigquery)": { icon: SiGooglebigquery, color: "#669DF6" },
  "docker": { icon: SiDocker, color: "#2496ED" },
  "docker compose": { icon: SiDocker, color: "#2496ED" },
  "ci/cd": { icon: FaGithub },
  "jenkins": { icon: SiJenkins, color: "#D24939" },
  "gitlab ci": { icon: SiGitlab, color: "#FC6D26" },
  "git": { icon: FaGitAlt, color: "#F05032" },
  "bitbucket": { icon: FaBitbucket, color: "#2684FF" },
  "llm integration": { icon: FaBrain, color: "#FF6F00" },
  "gemini api": { icon: SiGooglegemini, color: "#8E75B2" },
  "github copilot": { icon: SiGithubcopilot },
  "chatgpt": { icon: SiOpenai },
  "claude": { icon: SiClaude, color: "#D97757" },
  "dataiku": { icon: FaBrain, color: "#2AB1AC" },
  "pytest": { icon: SiPytest, color: "#0A9EDC" },
  "postman": { icon: SiPostman, color: "#FF6C37" },
  "code reviews": { icon: FaGithub },
  "debugging": { icon: FaBug, color: "#ef4444" },
  "performance optimization": { icon: FaTachometerAlt, color: "#10b981" },
  "agile/scrum": { icon: FaUsers, color: "#6366f1" },
  "jira": { icon: SiJira, color: "#0052CC" },
};

const SkillIcon: React.FC<{ skill: string }> = ({ skill }) => {
  const match = skillIcons[skill.toLowerCase()] ?? { icon: FaCode, color: "#888888" };
  const Icon = match.icon;
  return <Icon color={match.color ?? "currentColor"} style={{ marginRight: "8px", flexShrink: 0 }} aria-hidden="true" />;
};

interface SkillCategoryProps {
  title: string;
  skills: string[];
  delay: number;
  accent: AccentTokens;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills, delay, accent }) => (
  <Box sx={{ height: "100%" }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      style={{ height: "100%" }}
    >
      <Paper
        className="glass-box trace-card"
        sx={{
          p: { xs: 3, md: 4 },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: `0 10px 30px ${accent.glow}`,
          },
        }}
      >
        <TraceBorder />
        <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: 700, color: "primary.main" }}>
          {title}
        </Typography>
        <Box component="ul" sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center", listStyle: "none", p: 0, m: 0 }}>
          {skills.map((skill) => (
            <Box
              component="li"
              key={skill}
              sx={{
                display: "flex",
                alignItems: "center",
                background: accent.chipBg,
                px: 2,
                py: 1,
                borderRadius: 0,
                border: `1px solid ${accent.chipBorder}`,
                color: "text.primary",
                fontSize: "0.95rem",
                fontWeight: 500,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: accent.soft,
                  borderColor: "primary.main",
                  color: "primary.main",
                },
              }}
            >
              <SkillIcon skill={skill} />
              {skill}
            </Box>
          ))}
        </Box>
      </Paper>
    </motion.div>
  </Box>
);

const Skills: React.FC = () => {
  const { accent } = useAppTheme();

  return (
    <Box component="section" id="skills" sx={{ py: 10, position: "relative" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 8, textAlign: "center" }}>
            Technical <span className="gradient-text">Skills</span>
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4 }}>
          {resumeData.technicalSkills.map((group, idx) => (
            <SkillCategory key={group.title} title={group.title} skills={group.skills} delay={(idx % 2) * 0.1} accent={accent} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
