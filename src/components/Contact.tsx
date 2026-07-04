import React, { useState } from 'react';
import { Box, Container, Typography, IconButton, Grid, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/ThemeContext';
import { API_ENDPOINTS } from '../config/api';

const Contact: React.FC = () => {
  const { mode } = useAppTheme();
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Simple client side validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Success
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact submit error:', err);
      setErrorMsg(err.message || 'Failed to send message. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '-20%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '120vw', 
          height: '400px', 
          background: mode === 'light' 
            ? 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.08) 0%, rgba(255,255,255,0) 70%)' 
            : 'radial-gradient(ellipse at center, rgba(0, 242, 254, 0.12) 0%, rgba(5,5,5,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} 
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlignment: 'center', mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
              Connect With <span className="gradient-text">Me</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxW: '600px', mx: 'auto' }}>
              Have an exciting project, a role open, or just want to say hi? Drop me a message below, and let's start a conversation!
            </Typography>
          </Box>

          <Grid container spacing={5} alignItems="stretch">
            {/* Left Column: Contact details */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box 
                className="glass-box" 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  background: mode === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(17, 17, 26, 0.4)',
                  borderColor: mode === 'light' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
                    Contact Information
                  </Typography>

                  {/* Info Row: Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
                    <IconButton sx={{ 
                      backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.08)' : 'rgba(0, 242, 254, 0.08)', 
                      color: 'primary.main', 
                      p: 1.5,
                      '&:hover': { backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(0, 242, 254, 0.15)' } 
                    }}>
                      <EmailIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Email Me</Typography>
                      <Typography 
                        component="a" 
                        href={`mailto:${resumeData.personalInfo.email}`} 
                        variant="body1" 
                        sx={{ color: 'text.primary', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s', '&:hover': { color: 'secondary.main' } }}
                      >
                        {resumeData.personalInfo.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Info Row: Phone */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
                    <IconButton sx={{ 
                      backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.08)' : 'rgba(0, 242, 254, 0.08)', 
                      color: 'primary.main', 
                      p: 1.5,
                      '&:hover': { backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(0, 242, 254, 0.15)' } 
                    }}>
                      <PhoneIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Call Me</Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {resumeData.personalInfo.phone}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Info Row: Location */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 4 }}>
                    <IconButton sx={{ 
                      backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.08)' : 'rgba(0, 242, 254, 0.08)', 
                      color: 'primary.main', 
                      p: 1.5,
                      '&:hover': { backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(0, 242, 254, 0.15)' } 
                    }}>
                      <LocationOnIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>Location</Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {resumeData.personalInfo.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Social Links Section */}
                <Box>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Social Channels
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton 
                      component="a" 
                      href={resumeData.socialLinks.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      sx={{ 
                        backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.08)' : 'rgba(0, 242, 254, 0.08)', 
                        color: 'primary.main', 
                        '&:hover': { backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(0, 242, 254, 0.15)', transform: 'translateY(-3px)' }, 
                        transition: 'all 0.3s ease' 
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton 
                      component="a" 
                      href={resumeData.socialLinks.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      sx={{ 
                        backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.08)' : 'rgba(255, 255, 255, 0.08)', 
                        color: mode === 'light' ? 'primary.main' : 'text.primary', 
                        '&:hover': { backgroundColor: mode === 'light' ? 'rgba(30, 64, 175, 0.15)' : 'rgba(255, 255, 255, 0.15)', transform: 'translateY(-3px)' }, 
                        transition: 'all 0.3s ease' 
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton 
                      component="a" 
                      href={resumeData.socialLinks.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      sx={{ 
                        backgroundColor: 'rgba(37, 211, 102, 0.08)', 
                        color: '#25D366', 
                        '&:hover': { backgroundColor: 'rgba(37, 211, 102, 0.15)', transform: 'translateY(-3px)' }, 
                        transition: 'all 0.3s ease' 
                      }}
                    >
                      <WhatsAppIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.5, mt: 4 }}>
                    © {new Date().getFullYear()} {resumeData.personalInfo.name}. All rights reserved.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Right Column: Contact form */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box 
                className="glass-box" 
                sx={{ 
                  p: { xs: 4, md: 5 }, 
                  height: '100%',
                  background: mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(17, 17, 26, 0.5)',
                  borderColor: mode === 'light' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                }}
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      style={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '20px'
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: 70, color: '#10b981', mb: 3 }} />
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                        Message Sent!
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: '400px' }}>
                        Thank you for reaching out. Your message has been saved in the Supabase database. I will get back to you as soon as possible.
                      </Typography>
                      <Button 
                        variant="outlined" 
                        onClick={() => setSuccess(false)}
                        sx={{ 
                          borderColor: 'primary.main', 
                          color: 'primary.main', 
                          borderRadius: 2,
                          px: 4,
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                            borderColor: 'primary.main',
                          }
                        }}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ height: '100%' }}
                    >
                      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
                        Send Me a Message
                      </Typography>

                      {errorMsg && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                          {errorMsg}
                        </Alert>
                      )}

                      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField 
                              fullWidth
                              required
                              label="Name"
                              variant="outlined"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&:hover fieldset': { borderColor: 'primary.main' },
                                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                              }}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField 
                              fullWidth
                              required
                              label="Email Address"
                              type="email"
                              variant="outlined"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '&:hover fieldset': { borderColor: 'primary.main' },
                                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                },
                                '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                              }}
                            />
                          </Grid>
                        </Grid>

                        <TextField 
                          fullWidth
                          required
                          label="Subject"
                          variant="outlined"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': { borderColor: 'primary.main' },
                              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                          }}
                        />

                        <TextField 
                          fullWidth
                          required
                          label="Message"
                          multiline
                          rows={5}
                          variant="outlined"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': { borderColor: 'primary.main' },
                              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                            },
                            '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                          }}
                        />

                        <Box sx={{ mt: 1 }}>
                          <Button 
                            type="submit" 
                            variant="contained" 
                            disabled={loading}
                            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            sx={{ 
                              background: mode === 'light' ? 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)' : 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
                              color: mode === 'light' ? '#fff' : '#000',
                              fontWeight: 'bold',
                              textTransform: 'none',
                              px: 4,
                              py: 1.5,
                              borderRadius: 2.5,
                              width: { xs: '100%', sm: 'auto' },
                              '&:hover': {
                                background: mode === 'light' ? 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)' : 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                                boxShadow: mode === 'light' ? '0 4px 15px rgba(30, 64, 175, 0.3)' : '0 4px 15px rgba(0, 242, 254, 0.5)',
                              }
                            }}
                          >
                            {loading ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
