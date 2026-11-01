import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import WorkIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAppTheme } from '../theme/useAppTheme';
import TraceBorder from './TraceBorder';

const Experience: React.FC = () => {
  const { mode, accent } = useAppTheme();
  const dotColor = mode === 'light' ? '#1e40af' : '#00f2fe';

  return (
    <Box component="section" id="experience" sx={{ py: 10, backgroundColor: accent.sectionTint }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 6, textAlign: 'center' }}>
            Career <span className="gradient-text">Journey</span>
          </Typography>
        </motion.div>

        <Box component="ol" sx={{ position: 'relative', ml: { xs: 2, md: 0 }, listStyle: 'none', p: 0 }}>
          {/* Timeline Line */}
          <Box
            aria-hidden="true"
            sx={{
              position: 'absolute',
              left: { xs: 0, md: '50%' },
              top: 0,
              bottom: 0,
              width: '2px',
              background: accent.gradient.replace('90deg', 'to bottom'),
              transform: { xs: 'none', md: 'translateX(-50%)' },
              opacity: mode === 'light' ? 0.3 : 0.5,
            }}
          />

          {resumeData.careerSummary.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Box
                component="li"
                key={`${exp.company}-${exp.duration}`}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: isEven ? 'flex-end' : 'flex-start' },
                  pr: { xs: 0, md: isEven ? '50%' : 0 },
                  pl: { xs: 4, md: isEven ? 0 : '50%' },
                  position: 'relative',
                  mb: 6,
                  width: '100%',
                }}
              >
                {/* Timeline Dot */}
                <Box
                  component={motion.div}
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  sx={{
                    position: 'absolute',
                    left: { xs: '-8px', md: 'calc(50% - 8px)' },
                    top: '24px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                    boxShadow: `0 0 10px ${accent.glowStrong}, 0 0 20px ${accent.glow}`,
                  }}
                />

                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ width: '100%', maxWidth: '600px' }}
                >
                  <Box
                    className="glass-box trace-card"
                    sx={{
                      p: 3,
                      ml: { xs: 0, md: isEven ? 0 : 4 },
                      mr: { xs: 0, md: isEven ? 4 : 0 },
                      position: 'relative',
                    }}
                  >
                    <TraceBorder />
                    <Typography variant="h6" component="h3" sx={{ color: 'primary.main', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <WorkIcon fontSize="small" aria-hidden="true" /> {exp.role}
                    </Typography>
                    <Typography variant="subtitle1" component="p" sx={{ color: 'text.primary', mb: 2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" sx={{ color: 'secondary.main' }} aria-hidden="true" /> {exp.company}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarMonthIcon sx={{ fontSize: '1.1rem' }} aria-hidden="true" /> {exp.duration}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AssignmentIndIcon sx={{ fontSize: '1.1rem' }} aria-hidden="true" /> {exp.type}
                      </Typography>
                    </Box>
                    <Box component="ul" sx={{ color: 'text.secondary', pl: 2, m: 0 }}>
                      {exp.description.map((item) => (
                        <Typography component="li" key={item} variant="body2" sx={{ mb: 1, lineHeight: 1.7, fontSize: '0.95rem' }}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
