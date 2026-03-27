import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { resumeData } from '../data/resumeData';

const Contact: React.FC = () => {
  return (
    <Box id="contact" sx={{ py: 8, position: 'relative', overflow: 'hidden' }}>
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '-50%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '100vw', 
          height: '200px', 
          background: 'radial-gradient(ellipse at center, rgba(0,242,254,0.1) 0%, rgba(5,5,5,0) 70%)',
          pointerEvents: 'none'
        }} 
      />
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Box className="glass-box" sx={{ p: { xs: 4, md: 8 }, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Get in <span className="gradient-text">Touch</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 6, maxWidth: '500px', mx: 'auto' }}>
              I'm always open to discussing web development work or partnership opportunities. Let's build something amazing together.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 4, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                <IconButton sx={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe', '&:hover': { backgroundColor: 'rgba(0, 242, 254, 0.2)' } }}>
                  <EmailIcon />
                </IconButton>
                <Typography 
                  component="a" 
                  href={`mailto:${resumeData.personalInfo.email}`} 
                  variant="body2" 
                  sx={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s', '&:hover': { color: '#00f2fe' } }}
                >
                  {resumeData.personalInfo.email}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                <IconButton sx={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe', '&:hover': { backgroundColor: 'rgba(0, 242, 254, 0.2)' } }}>
                  <PhoneIcon />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#fff' }}>{resumeData.personalInfo.phone}</Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                <IconButton sx={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe', '&:hover': { backgroundColor: 'rgba(0, 242, 254, 0.2)' } }}>
                  <LocationOnIcon />
                </IconButton>
                <Typography variant="body2" sx={{ color: '#fff' }}>{resumeData.personalInfo.location}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 6 }}>
              <IconButton component="a" href={resumeData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" sx={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe', '&:hover': { backgroundColor: 'rgba(0, 242, 254, 0.2)', transform: 'translateY(-3px)' }, transition: 'all 0.3s ease' }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton component="a" href={resumeData.socialLinks.github} target="_blank" rel="noopener noreferrer" sx={{ backgroundColor: 'rgba(0, 242, 254, 0.1)', color: '#00f2fe', '&:hover': { backgroundColor: 'rgba(0, 242, 254, 0.2)', transform: 'translateY(-3px)' }, transition: 'all 0.3s ease' }}>
                <GitHubIcon />
              </IconButton>
              <IconButton component="a" href={resumeData.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" sx={{ backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25D366', '&:hover': { backgroundColor: 'rgba(37, 211, 102, 0.2)', transform: 'translateY(-3px)' }, transition: 'all 0.3s ease' }}>
                <WhatsAppIcon />
              </IconButton>
            </Box>


            <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.6, mt: 4 }}>
              © {new Date().getFullYear()} {resumeData.personalInfo.name}. All rights reserved.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
