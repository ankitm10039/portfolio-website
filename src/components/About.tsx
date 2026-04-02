import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/ThemeContext';

const About: React.FC = () => {
  const { mode } = useAppTheme();
  return (
    <Box id="about" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" sx={{ mb: 6, textAlign: 'center' }}>
            About <span className="gradient-text">Me</span>
          </Typography>
        </motion.div>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
                Professional Highlights
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
                {resumeData.profileSummary.map((item: any, idx) => {
                  const icons = [ <WebIcon />, <DeveloperBoardIcon />, <StorageIcon />, <AutoAwesomeIcon />, <EmojiObjectsIcon /> ];
                  return (
                    <Box 
                      key={idx}
                      sx={{ 
                        width: { xs: '100%', sm: 'calc(50% - 12px)', md: idx < 2 ? 'calc(50% - 12px)' : 'calc(33.333% - 16px)' } 
                      }}
                    >
                      <Box 
                        className="glass-box"
                        sx={{ 
                          p: 4, 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': { 
                            transform: 'translateY(-5px)', 
                            boxShadow: mode === 'light' 
                              ? '0 8px 30px rgba(30, 64, 175, 0.15)' 
                              : '0 8px 30px rgba(0, 242, 254, 0.25)' 
                          }
                        }}
                      >
                        <Box sx={{ color: 'secondary.main', mb: 2, '& > svg': { fontSize: '2.5rem' } }}>
                          {icons[idx]}
                        </Box>
                        <Typography variant="h6" sx={{ color: 'text.primary', mb: 1.5, fontWeight: 700 }}>
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box className="glass-box" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Core Competencies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {resumeData.coreCompetencies.map((skill, idx) => (
                  <Chip 
                    key={idx}
                    label={skill}
                    component={motion.div}
                    whileHover={{ scale: 1.05, backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(0, 242, 254, 0.2)' }}
                    sx={{ 
                      backgroundColor: mode === 'light' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                      color: 'text.primary',
                      border: `1px solid ${mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(0, 242, 254, 0.3)'}`,
                      fontSize: '1rem',
                      py: 3,
                      px: 2,
                      borderRadius: 3
                    }}
                  />
                ))}
              </Box>
            </Box>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box className="glass-box" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', gap: 4 }}>
                {resumeData.languages.map((lang, idx) => (
                  <Typography key={idx} variant="h6" sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
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
