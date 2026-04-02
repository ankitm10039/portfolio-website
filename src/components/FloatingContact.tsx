import React, { useState } from 'react';
import { Box, Fab, Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { resumeData } from '../data/resumeData';

const FloatingContact: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const bodyContent = `From: ${userEmail}\n\nMessage:\n${description}`;
    const mailtoLink = `mailto:${resumeData.personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    window.location.href = mailtoLink;
    handleClose();
    // clear form
    setUserEmail('');
    setSubject('');
    setDescription('');
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
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(30, 64, 175, 0.3)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 32px rgba(30, 64, 175, 0.4)',
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
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(30, 64, 175, 0.2)',
            borderRadius: 3,
            minWidth: { xs: '90vw', sm: '450px' },
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'text.primary' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Let's Connect!</Typography>
          <IconButton onClick={handleClose} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <form onSubmit={handleSendEmail}>
          <DialogContent dividers sx={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
              <TextField 
                required
                label="Your Email"
                type="email"
                variant="outlined"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                autoFocus
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
            <Button onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.7)', textTransform: 'none' }}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              endIcon={<SendIcon />}
              sx={{ 
                background: 'linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)',
                color: '#fff',
                fontWeight: 'bold',
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
                  boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)',
                }
              }}
            >
              Send Message
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default FloatingContact;
