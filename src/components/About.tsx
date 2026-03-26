import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import StorageIcon from '@mui/icons-material/Storage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const About: React.FC = () => {
  return (
    <Box id="about" sx={{ py: 10, position: 'relative' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#00f2fe', textAlign: 'center' }}>
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
                          '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 30px rgba(0,242,254,0.15)' }
                        }}
                      >
                        <Box sx={{ color: '#00f2fe', mb: 2, '& > svg': { fontSize: '2.5rem' } }}>
                          {icons[idx]}
                        </Box>
                        <Typography variant="h6" sx={{ color: '#fff', mb: 1.5, fontWeight: 700 }}>
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box className="glass-box" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#4facfe' }}>
                Core Competencies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {resumeData.coreCompetencies.map((skill, idx) => (
                  <Chip 
                    key={idx}
                    label={skill}
                    component={motion.div}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 242, 254, 0.2)' }}
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      border: '1px solid rgba(0, 242, 254, 0.3)',
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
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Box className="glass-box" sx={{ padding: { xs: '1.5rem', md: '3rem' } }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#00f2fe' }}>
                Languages
              </Typography>
              <Box sx={{ display: 'flex', gap: 4 }}>
                {resumeData.languages.map((lang, idx) => (
                  <Typography key={idx} variant="h6" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00f2fe', mr: 2 }} />
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
