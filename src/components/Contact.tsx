import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, IconButton, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import { resumeData } from '../data/resumeData';
import { useAppTheme } from '../theme/useAppTheme';
import { gradientButtonSx } from '../theme/tokens';
import TraceBorder from './TraceBorder';

const { email, phone, location, name } = resumeData.personalInfo;
const firstName = name.split(' ')[0];
const MAIL_SUBJECT = 'Development / Deployment Enquiry';

// Clipboard API needs a secure context; fall back to a hidden textarea elsewhere
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
};

const Contact: React.FC = () => {
  const { accent } = useAppTheme();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    if (await copyText(email)) {
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const infoRows = [
    { icon: <PhoneIcon />, label: 'Call Me', value: phone, href: `tel:${phone.replace(/[^\d+]/g, '')}` },
    { icon: <LocationOnIcon />, label: 'Location', value: location },
  ];

  const socials = [
    { href: resumeData.socialLinks.linkedin, label: 'LinkedIn profile', icon: <LinkedInIcon /> },
    { href: resumeData.socialLinks.github, label: 'GitHub profile', icon: <GitHubIcon /> },
    { href: resumeData.socialLinks.whatsapp, label: 'Chat on WhatsApp', icon: <WhatsAppIcon />, color: '#25D366' },
  ];

  const squareIconSx = {
    width: 48,
    height: 48,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: accent.soft,
    color: 'primary.main',
    border: `1px solid ${accent.border}`,
  };

  return (
    <Box component="section" id="contact" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120vw',
          height: '400px',
          background: `radial-gradient(ellipse at center, ${accent.soft} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Connect With <span className="gradient-text">Me</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '620px', mx: 'auto', fontSize: '1.1rem' }}>
              Have a development or deployment requirement, a role open, or a project in mind? Email {firstName} directly and
              you'll get a reply as soon as possible.
            </Typography>
          </Box>

          <Box className="glass-box trace-card" sx={{ border: `1px solid ${accent.border}`, backgroundColor: accent.chipBg, p: { xs: 3, sm: 5 } }}>
            <TraceBorder />
            {/* Email: the main call to action */}
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 700, letterSpacing: '0.12em' }}>
              Development & Deployment Enquiries
            </Typography>
            <Typography variant="h5" component="p" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
              Email {firstName} at
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: { xs: 1.5, sm: 2 },
                border: `1px solid ${accent.border}`,
                backgroundColor: accent.soft,
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
              }}
            >
              <Box sx={squareIconSx} aria-hidden="true">
                <EmailIcon />
              </Box>
              <Typography
                component="a"
                href={`mailto:${email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  fontSize: { xs: '1.05rem', sm: '1.35rem' },
                  fontWeight: 700,
                  color: 'text.primary',
                  textDecoration: 'none',
                  wordBreak: 'break-all',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {email}
              </Typography>
              <Tooltip title={copied ? 'Copied!' : 'Copy email address'} placement="top">
                <Button
                  onClick={handleCopy}
                  variant="outlined"
                  startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                  aria-live="polite"
                  sx={{
                    flexShrink: 0,
                    width: { xs: '100%', sm: 'auto' },
                    borderColor: accent.border,
                    color: copied ? 'success.main' : 'primary.main',
                    boxShadow: 'none',
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </Tooltip>
            </Box>

            <Button
              component="a"
              href={`mailto:${email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ ...gradientButtonSx(accent), mt: 3, px: 4, py: 1.5, width: { xs: '100%', sm: 'auto' } }}
            >
              Send an Email
            </Button>

            {/* Other ways to reach out */}
            <Box
              sx={{
                mt: 5,
                pt: 4,
                borderTop: `1px solid ${accent.border}`,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr auto' },
                gap: 3,
                alignItems: 'center',
              }}
            >
              {infoRows.map((row) => (
                <Box key={row.label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={squareIconSx} aria-hidden="true">
                    {row.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {row.label}
                    </Typography>
                    {row.href ? (
                      <Typography
                        component="a"
                        href={row.href}
                        sx={{ color: 'text.primary', fontWeight: 600, textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                      >
                        {row.value}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>{row.value}</Typography>
                    )}
                  </Box>
                </Box>
              ))}

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {socials.map((s) => (
                  <IconButton
                    key={s.label}
                    component="a"
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    sx={{
                      ...squareIconSx,
                      color: s.color ?? 'primary.main',
                      transition: 'transform 0.2s ease, background-color 0.2s ease',
                      '&:hover': { backgroundColor: accent.softHover, transform: 'translateY(-3px)' },
                    }}
                  >
                    {s.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;
