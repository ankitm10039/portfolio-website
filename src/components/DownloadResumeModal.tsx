import React, { useState, useEffect } from "react";
import { Alert, Backdrop, Box, Button, Typography, TextField, IconButton, InputAdornment } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useAppTheme } from "../theme/useAppTheme";
import { gradientButtonSx } from "../theme/tokens";
import resumePdf from "../assets/Resume/Ankit_Meena.pdf";

const DEFAULT_FILE_NAME = "Ankit_Meena_Resume";

interface DownloadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadResumeModal: React.FC<DownloadResumeModalProps> = ({ isOpen, onClose }) => {
  const { accent } = useAppTheme();
  const [fileName, setFileName] = useState(DEFAULT_FILE_NAME);
  const [error, setError] = useState<string | null>(null);

  // Lock page scroll and allow Escape to close while open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDownload = async () => {
    setError(null);
    try {
      const response = await fetch(resumePdf);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Strip characters that are not allowed in file names, then make sure it ends in .pdf
      let finalName = fileName.trim().replace(/[\\/:*?"<>|]/g, "") || DEFAULT_FILE_NAME;
      if (!finalName.toLowerCase().endsWith(".pdf")) {
        finalName += ".pdf";
      }

      link.setAttribute("download", finalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      onClose();
    } catch (err) {
      console.error("Failed to download resume:", err);
      setError("Download failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          open={isOpen}
          onClick={onClose}
          sx={{
            zIndex: (theme) => theme.zIndex.modal + 10,
            backdropFilter: "blur(12px)",
            backgroundColor: accent.backdrop,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ width: "100%", maxWidth: "480px" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-resume-title"
          >
            <Box
              className="glass-box"
              sx={{
                p: { xs: 3, sm: 4 },
                position: "relative",
                border: `1px solid ${accent.border}`,
                boxShadow: `0 20px 80px ${accent.glow}`,
                backgroundColor: accent.surface,
                borderRadius: 0,
              }}
            >
              <IconButton
                onClick={onClose}
                aria-label="Close"
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                  color: "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": { color: "primary.main", transform: "rotate(90deg)" },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Header Icon */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }} aria-hidden="true">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 0,
                      background: accent.gradientDiagonal,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: `0 8px 20px ${accent.glowStrong}`,
                    }}
                  >
                    <CloudDownloadIcon sx={{ color: accent.contrastText, fontSize: "2rem" }} />
                  </Box>
                </motion.div>
              </Box>

              <Typography id="download-resume-title" variant="h5" component="h2" sx={{ fontWeight: 800, textAlign: "center", mb: 1.5, color: "text.primary" }}>
                Download Resume
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary", mb: 3, lineHeight: 1.5 }}>
                Specify a custom name for the downloaded file below. This is especially helpful for recruiters and hiring managers!
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: 0 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                variant="outlined"
                label="Filename"
                placeholder={DEFAULT_FILE_NAME}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDownload();
                }}
                slotProps={{
                  htmlInput: { maxLength: 120 },
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, userSelect: "none" }}>
                          .pdf
                        </Typography>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    backgroundColor: accent.chipBg,
                    "& fieldset": { borderColor: accent.border },
                    "&:hover fieldset": { borderColor: "secondary.main" },
                    "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: 2 },
                  },
                  "& .MuiInputLabel-root": {
                    color: "text.secondary",
                    "&.Mui-focused": { color: "primary.main" },
                  },
                }}
              />

              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    py: 1.5,
                    borderRadius: 0,
                    borderColor: accent.border,
                    color: "text.primary",
                    boxShadow: "none",
                    "&:hover": { borderColor: "text.primary", backgroundColor: accent.chipBg },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleDownload}
                  sx={{ ...gradientButtonSx(accent), py: 1.5, borderRadius: 0, boxShadow: `0 4px 15px ${accent.glow}` }}
                >
                  Download
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default DownloadResumeModal;
