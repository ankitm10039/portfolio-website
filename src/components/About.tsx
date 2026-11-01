import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/useAppTheme';
import TraceBorder from './TraceBorder';

const highlightIcons = [WebIcon, DeveloperBoardIcon, StorageIcon, AutoAwesomeIcon, EmojiObjectsIcon];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay },
});

const About: React.FC = () => {
  const { accent } = useAppTheme();

  return (
    <Box component="section" id="about" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <motion.div {...reveal()}>
          <Typography variant="h3" component="h2" sx={{ mb: 6, textAlign: 'center' }}>
            About <span className="gradient-text">Me</span>
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Profile Summary */}
          <motion.div {...reveal(0.1)}>
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" component="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
                Professional Highlights
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                {resumeData.profileSummary.map((item, idx) => {
                  const Icon = highlightIcons[idx % highlightIcons.length];
                  return (
                  <Box
                    key={item.title}
                    sx={{
                      width: { xs: '100%', sm: 'calc(50% - 12px)', md: idx < 2 ? 'calc(50% - 12px)' : 'calc(33.333% - 16px)' },
                    }}
                  >
                    <Box
                      className="glass-box trace-card"
                      sx={{
                        p: 4,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 8px 30px ${accent.glow}` },
                      }}
                    >
                      <TraceBorder />
                      <Box sx={{ color: 'secondary.main', mb: 2, '& > svg': { fontSize: '2.5rem' } }} aria-hidden="true">
                        <Icon />
                      </Box>
                      <Typography variant="h6" component="h4" sx={{ color: 'text.primary', mb: 1.5, fontWeight: 700 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.95rem' }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  );
                })}
              </Box>
            </Box>
          </motion.div>

          {/* Core Competencies */}
          <motion.div {...reveal(0.2)}>
            <Box className="glass-box trace-card" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <TraceBorder />
              <Typography variant="h4" component="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Core Competencies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {resumeData.coreCompetencies.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{
                      backgroundColor: accent.chipBg,
                      color: 'text.primary',
                      border: `1px solid ${accent.border}`,
                      fontSize: '1rem',
                      py: 3,
                      px: 2,
                      borderRadius: 0,
                      transition: 'transform 0.2s ease, background-color 0.2s ease',
                      '&:hover': { transform: 'scale(1.05)', backgroundColor: accent.softHover },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Education */}
          <motion.div {...reveal(0.2)}>
            <Box className="glass-box" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <Typography variant="h4" component="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Education
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                {resumeData.academicDetails.map((edu) => (
                  <Box
                    key={edu.degree}
                    className="trace-card"
                    sx={{
                      display: 'flex',
                      gap: 2,
                      p: 3,
                      borderRadius: 0,
                      border: `1px solid ${accent.border}`,
                      backgroundColor: accent.chipBg,
                    }}
                  >
                    <TraceBorder />
                    <SchoolIcon sx={{ color: 'secondary.main', fontSize: '2rem', mt: 0.5 }} aria-hidden="true" />
                    <Box>
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}>
                        {edu.degree}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {edu.institution}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600, mt: 1 }}>
                        {edu.year} · {edu.score}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Certificates */}
          <motion.div {...reveal(0.2)}>
            <Box className="glass-box" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <Typography variant="h4" component="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Certificates
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                {resumeData.certificates.map((cert) => (
                  <Box
                    key={cert.name}
                    className="trace-card"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 3,
                      border: `1px solid ${accent.border}`,
                      borderLeft: '4px solid',
                      borderLeftColor: 'primary.main',
                      backgroundColor: accent.chipBg,
                    }}
                  >
                    <TraceBorder />
                    <WorkspacePremiumIcon sx={{ color: 'secondary.main', fontSize: '2.2rem' }} aria-hidden="true" />
                    <Box>
                      <Typography variant="h6" component="h4" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}>
                        {cert.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {cert.issuer}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Languages */}
          <motion.div {...reveal(0.3)}>
            <Box className="glass-box trace-card" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <TraceBorder />
              <Typography variant="h4" component="h3" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', gap: 4 }}>
                {resumeData.languages.map((lang) => (
                  <Typography key={lang} variant="h6" component="p" sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'secondary.main', mr: 2 }} />
                    {lang}
                  </Typography>
                ))}
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
