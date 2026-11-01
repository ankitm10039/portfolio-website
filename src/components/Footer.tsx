import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/useAppTheme';

const Footer: React.FC = () => {
  const { accent } = useAppTheme();

  return (
    <Box component="footer" sx={{ py: 4, borderTop: `1px solid ${accent.border}` }}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          // Keep clear of the back-to-top button
          pr: { sm: 12 },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          © {new Date().getFullYear()} {resumeData.personalInfo.name}. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {resumeData.personalInfo.role}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
