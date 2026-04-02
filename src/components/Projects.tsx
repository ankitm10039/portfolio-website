import React from 'react';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/ThemeContext';

const Projects: React.FC = () => {
  const { mode } = useAppTheme();
  return (
    <Box id="projects" sx={{ py: 10, backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.03)' : 'rgba(0, 242, 254, 0.03)' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" sx={{ mb: 2, textAlign: 'center' }}>
            Featured <span className="gradient-text">Projects</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 8, textAlign: 'center', color: 'text.secondary' }}>
            Some of the impactful products I've worked on.
          </Typography>
        </motion.div>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {resumeData.projects.map((project, idx) => (
            <Box key={idx}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ height: '100%' }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: mode === 'light' 
                        ? '0 8px 32px rgba(30, 64, 175, 0.1)' 
                        : '0 8px 32px rgba(0, 242, 254, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 2, width: 50, height: 5, background: mode === 'light' ? 'linear-gradient(to right, #1e40af, #3b82f6)' : 'linear-gradient(to right, #00f2fe, #4facfe)', borderRadius: 2 }} />
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3, flexGrow: 1 }}>
                      {project.description}
                    </Typography>
                    {/* @ts-ignore */}
                    {project.techStack && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
                        {/* @ts-ignore */}
                        {project.techStack.map((tech: string, i: number) => (
                          <Chip 
                            key={i} 
                            label={tech} 
                            size="small" 
                            sx={{ 
                               bgcolor: mode === 'light' ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0.05)', 
                               color: 'primary.main', 
                               border: `1px solid ${mode === 'light' ? 'rgba(30, 64, 175, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
                               fontSize: '0.75rem',
                               fontWeight: 600,
                               borderRadius: 1
                             }} 
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
