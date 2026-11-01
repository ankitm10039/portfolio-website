import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/useAppTheme';
import ShowcaseCarousel from './projects/ShowcaseCarousel';

// Featured projects first, original order otherwise
const projects = [...resumeData.projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

const Projects: React.FC = () => {
  const { accent } = useAppTheme();

  return (
    <Box component="section" id="projects" sx={{ py: 10, backgroundColor: accent.sectionTint }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
            Featured <span className="gradient-text">Projects</span>
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
            Some of the impactful products I've worked on.
          </Typography>
        </motion.div>

        <ShowcaseCarousel projects={projects} />
      </Container>
    </Box>
  );
};

export default Projects;
