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
          background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
          color: '#fff',
          boxShadow: '0 8px 24px rgba(0, 242, 254, 0.4)',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 12px 32px rgba(0, 242, 254, 0.6)',
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
            background: 'rgba(10, 10, 15, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            borderRadius: 3,
            minWidth: { xs: '90vw', sm: '450px' },
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Let's Chat!</Typography>
          <IconButton onClick={handleClose} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#00f2fe' } }}>
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
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: '#00f2fe' },
                    '&.Mui-focused fieldset': { borderColor: '#00f2fe' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#00f2fe' },
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
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: '#00f2fe' },
                    '&.Mui-focused fieldset': { borderColor: '#00f2fe' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#00f2fe' },
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
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: '#00f2fe' },
                    '&.Mui-focused fieldset': { borderColor: '#00f2fe' },
                  },
                  '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#00f2fe' },
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
                background: 'linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)',
                color: '#000',
                fontWeight: 'bold',
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
                  boxShadow: '0 4px 15px rgba(0, 242, 254, 0.4)',
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
