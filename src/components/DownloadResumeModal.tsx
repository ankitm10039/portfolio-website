import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useAppTheme } from "../theme/ThemeContext";
import resumePdf from "../assets/Resume/Ankit_Meena.pdf";

interface DownloadResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadResumeModal: React.FC<DownloadResumeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { mode } = useAppTheme();
  const [fileName, setFileName] = useState("Ankit_Meena_Resume");

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleDownload = async () => {
    try {
      const response = await fetch(resumePdf);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      let finalName = fileName.trim();
      if (!finalName) {
        finalName = "Ankit_Meena_Resume";
      }

      // Automatically append .pdf extension if not present
      if (!finalName.toLowerCase().endsWith(".pdf")) {
        finalName += ".pdf";
      }

      link.setAttribute("download", finalName);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error("Failed to download resume:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          open={isOpen}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 9999,
            backdropFilter: "blur(12px)",
            backgroundColor:
              mode === "light"
                ? "rgba(255, 255, 255, 0.85)"
                : "rgba(5, 5, 10, 0.8)",
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
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            style={{ width: "100%", maxWidth: "480px" }}
          >
            <Box
              className="glass-box"
              sx={{
                p: { xs: 3, sm: 4 },
                position: "relative",
                border: `1px solid ${
                  mode === "light"
                    ? "rgba(30, 64, 175, 0.15)"
                    : "rgba(0, 242, 254, 0.3)"
                }`,
                boxShadow:
                  mode === "light"
                    ? "0 20px 80px rgba(30, 64, 175, 0.1)"
                    : "0 20px 80px rgba(0, 242, 254, 0.2)",
                backgroundColor:
                  mode === "light"
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(17, 17, 26, 0.85)",
                borderRadius: 4,
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={onClose}
                aria-label="close"
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                  color: "text.secondary",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "primary.main",
                    transform: "rotate(90deg)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Header Icon */}
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      background:
                        mode === "light"
                          ? "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)"
                          : "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow:
                        mode === "light"
                          ? "0 8px 20px rgba(30, 64, 175, 0.3)"
                          : "0 8px 20px rgba(0, 242, 254, 0.4)",
                    }}
                  >
                    <CloudDownloadIcon
                      sx={{
                        color: mode === "light" ? "#fff" : "#050505",
                        fontSize: "2rem",
                      }}
                    />
                  </Box>
                </motion.div>
              </Box>

              {/* Title & Desc */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  textAlign: "center",
                  mb: 1.5,
                  color: "text.primary",
                }}
              >
                Download Resume
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  mb: 3,
                  lineHeight: 1.5,
                }}
              >
                Specify a custom name for the downloaded file below. This is especially helpful for recruiters and hiring managers!
              </Typography>

              {/* Input Field */}
              <TextField
                fullWidth
                variant="outlined"
                label="Filename"
                placeholder="Ankit_Meena_Resume"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleDownload();
                  }
                }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 600,
                            userSelect: "none",
                          }}
                        >
                          .pdf
                        </Typography>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  mb: 4,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    backgroundColor:
                      mode === "light"
                        ? "rgba(0, 0, 0, 0.02)"
                        : "rgba(255, 255, 255, 0.02)",
                    "& fieldset": {
                      borderColor:
                        mode === "light"
                          ? "rgba(30, 64, 175, 0.2)"
                          : "rgba(0, 242, 254, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor:
                        mode === "light" ? "primary.main" : "secondary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor:
                        mode === "light" ? "primary.main" : "primary.main",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "text.secondary",
                    "&.Mui-focused": {
                      color: "primary.main",
                    },
                  },
                }}
              />

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={onClose}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    borderColor:
                      mode === "light"
                        ? "rgba(30, 64, 175, 0.4)"
                        : "rgba(255, 255, 255, 0.1)",
                    color: "text.primary",
                    "&:hover": {
                      borderColor: "text.primary",
                      backgroundColor:
                        mode === "light"
                          ? "rgba(0, 0, 0, 0.02)"
                          : "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleDownload}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    background:
                      mode === "light"
                        ? "linear-gradient(90deg, #1e40af 0%, #3b82f6 100%)"
                        : "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
                    color: mode === "light" ? "#fff" : "#050505",
                    fontWeight: 700,
                    boxShadow:
                      mode === "light"
                        ? "0 4px 15px rgba(30, 64, 175, 0.2)"
                        : "0 4px 15px rgba(0, 242, 254, 0.3)",
                    "&:hover": {
                      background:
                        mode === "light"
                          ? "linear-gradient(90deg, #15318a 0%, #2563eb 100%)"
                          : "linear-gradient(90deg, #00d2dd 0%, #3598eb 100%)",
                      boxShadow:
                        mode === "light"
                          ? "0 6px 20px rgba(30, 64, 175, 0.35)"
                          : "0 6px 20px rgba(0, 242, 254, 0.5)",
                    },
                  }}
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
