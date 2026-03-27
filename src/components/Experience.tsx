import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import WorkIcon from '@mui/icons-material/WorkOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Experience: React.FC = () => {
  return (
    <Box id="experience" sx={{ py: 10, backgroundColor: 'rgba(10, 10, 15, 0.3)' }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" sx={{ mb: 6, textAlign: 'center' }}>
            Career <span className="gradient-text">Journey</span>
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative', ml: { xs: 2, md: 0 } }}>
          {/* Timeline Line */}
          <Box 
            sx={{ 
              position: 'absolute', 
              left: { xs: 0, md: '50%' }, 
              top: 0, 
              bottom: 0, 
              width: '2px', 
              background: 'linear-gradient(to bottom, #00f2fe, #4facfe)',
              transform: { xs: 'none', md: 'translateX(-50%)' },
              opacity: 0.3
            }} 
          />

          {resumeData.careerSummary.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <Box 
                key={idx} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: { xs: 'flex-start', md: isEven ? 'flex-end' : 'flex-start' },
                  pr: { xs: 0, md: isEven ? '50%' : 0 },
                  pl: { xs: 4, md: isEven ? 0 : '50%' },
                  position: 'relative',
                  mb: 6,
                  width: '100%'
                }}
              >
                {/* Timeline Dot */}
                <Box 
                  component={motion.div}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  sx={{ 
                    position: 'absolute', 
                    left: { xs: '-8px', md: 'calc(50% - 8px)' }, 
                    top: '24px', 
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    backgroundColor: '#00f2fe',
                    boxShadow: '0 0 10px #00f2fe, 0 0 20px #4facfe'
                  }} 
                />

                <motion.div
                  initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{ width: '100%', maxWidth: '600px' }}
                >
                  <Box 
                    className="glass-box"
                    sx={{ 
                      p: 3, 
                      ml: { xs: 0, md: isEven ? 0 : 4 },
                      mr: { xs: 0, md: isEven ? 4 : 0 },
                      position: 'relative'
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#00f2fe', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <WorkIcon fontSize="small" /> {exp.role}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: '#fff', mb: 2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" sx={{ color: '#4facfe' }} /> {exp.company}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, mb: 2, flexWrap: 'wrap' }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarMonthIcon sx={{ fontSize: '1.1rem' }} /> {exp.duration}
                      </Typography>
                      {/* @ts-ignore */}
                      {exp.type && (
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {/* @ts-ignore */}
                          <AssignmentIndIcon sx={{ fontSize: '1.1rem' }} /> {exp.type}
                        </Typography>
                      )}
                    </Box>
                    {Array.isArray(exp.description) ? (
                      <Box component="ul" sx={{ color: 'text.secondary', pl: 2, m: 0 }}>
                        {exp.description.map((item: string, i: number) => (
                           <Typography component="li" key={i} variant="body2" sx={{ mb: 1, lineHeight: 1.7, fontSize: '0.95rem' }}>{item}</Typography>
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '0.95rem' }}>
                        {exp.description}
                      </Typography>
                    )}
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
