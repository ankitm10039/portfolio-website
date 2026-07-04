import React, { useState } from 'react';
import { Box, Fab, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, IconButton, Typography, CircularProgress, Alert } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppTheme } from '../theme/ThemeContext';
import { API_ENDPOINTS } from '../config/api';

const FloatingContact: React.FC = () => {
  const { mode } = useAppTheme();
  const [open, setOpen] = useState(false);
  
  // Form field states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // Reset status after close animation
    setTimeout(() => {
      setErrorMsg(null);
      setSuccess(false);
    }, 300);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

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
        throw new Error(data.error || 'Failed to submit form.');
      }

      setSuccess(true);
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto close dialog after success display
      setTimeout(() => {
        handleClose();
      }, 2500);

    } catch (err: any) {
      console.error('FloatingContact submit error:', err);
      setErrorMsg(err.message || 'Error connecting to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fab 
        color="primary" 
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 40 },
          right: { xs: 24, md: 40 },
          zIndex: 9999,
          background: mode === 'light' ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' : 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
          color: '#fff',
          boxShadow: mode === 'light' ? '0 8px 24px rgba(30, 64, 175, 0.3)' : '0 8px 24px rgba(0, 242, 254, 0.5)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: mode === 'light' ? '0 12px 32px rgba(30, 64, 175, 0.4)' : '0 12px 32px rgba(0, 242, 254, 0.6)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <ChatIcon />
      </Fab>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          className: 'glass-box',
          sx: {
            background: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 17, 26, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${mode === 'light' ? 'rgba(30, 64, 175, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: 3,
            minWidth: { xs: '90vw', sm: '450px' },
            boxShadow: mode === 'light' ? '0 20px 60px rgba(0,0,0,0.1)' : '0 20px 60px rgba(0,0,0,0.4)',
          }
        }}
      >
        <DialogTitle component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'text.primary' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Let's Connect!</Typography>
          <IconButton onClick={handleClose} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} disabled={loading}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DialogContent sx={{ textAlign: 'center', py: 6 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}>
                  Thank you!
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', px: 2 }}>
                  Your message has been received and saved successfully.
                </Typography>
              </DialogContent>
            </motion.div>
          ) : (
            <motion.div
              key="form-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <form onSubmit={handleSendMessage}>
                <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                    {errorMsg && (
                      <Alert severity="error" sx={{ borderRadius: 1.5 }}>
                        {errorMsg}
                      </Alert>
                    )}

                    <TextField 
                      required
                      label="Your Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: 'primary.main' },
                          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                      }}
                    />

                    <TextField 
                      required
                      label="Your Email"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: 'primary.main' },
                          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                      }}
                    />

                    <TextField 
                      required
                      label="Subject"
                      variant="outlined"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: 'primary.main' },
                          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                      }}
                    />

                    <TextField
                      required
                      label="Message"
                      variant="outlined"
                      multiline
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': { borderColor: 'primary.main' },
                          '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
                      }}
                    />
                  </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2.5 }}>
                  <Button onClick={handleClose} sx={{ color: 'text.secondary', textTransform: 'none' }} disabled={loading}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={loading}
                    endIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SendIcon />}
                    sx={{ 
                      background: mode === 'light' ? 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)' : 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
                      color: mode === 'light' ? '#fff' : '#000',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      px: 3,
                      '&:hover': {
                        background: mode === 'light' ? 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)' : 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                        boxShadow: mode === 'light' ? '0 4px 15px rgba(30, 64, 175, 0.3)' : '0 4px 15px rgba(0, 242, 254, 0.5)',
                      }
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </DialogActions>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
};

export default FloatingContact;
