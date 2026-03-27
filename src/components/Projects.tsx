import React from 'react';
import { Box, Container, Typography, Card, CardContent, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';

const Projects: React.FC = () => {
  return (
    <Box id="projects" sx={{ py: 10, backgroundColor: 'rgba(10, 10, 15, 0.3)' }}>
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
                      boxShadow: '0 8px 32px rgba(0, 242, 254, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 2, width: 50, height: 5, background: 'linear-gradient(to right, #00f2fe, #4facfe)', borderRadius: 2 }} />
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#fff' }}>
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
                              bgcolor: 'rgba(0, 242, 254, 0.05)', 
                              color: '#4facfe', 
                              border: '1px solid rgba(0, 242, 254, 0.2)',
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
