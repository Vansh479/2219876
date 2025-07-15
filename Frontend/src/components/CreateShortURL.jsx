import React, { useState } from "react";
import { useURLContext } from "../context/URLContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Stack
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CreateShortURL = () => {
  const { createShortURL } = useURLContext();
  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validity, setValidity] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setCopied(false);
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    const { shortCode, error: createError } = createShortURL({
      longUrl: longUrl.trim(),
      validityMinutes: validity,
      customCode: customCode.trim() || undefined,
    });
    if (createError) {
      setError(createError);
    } else {
      setResult(`${window.location.origin}/s/${shortCode}`);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&:hover fieldset': { borderColor: '#fff' },
      '&.Mui-focused fieldset': { borderColor: '#fff' },
    },
    '& .MuiInputLabel-root': { color: '#b0bec5' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#fff' },
  };

  return (
   
    <Paper
      elevation={6}
      sx={{
        padding: { xs: 3, sm: 4 },
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        backgroundColor: 'rgba(30, 30, 40, 0.25)',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
      }}
    >

      <Typography variant="h5" gutterBottom sx={{ color: '#e0e0e0', fontWeight: 'bold', textAlign: 'center' }}>
        Shorten Your Link
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Stack spacing={2}>
          <TextField
            label="Long URL"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            fullWidth
            autoFocus
            placeholder="https://example.com/very/long/url"
            sx={textFieldStyles} // Apply shared styles
          />
          <TextField
            label="Custom Shortcode (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            inputProps={{ maxLength: 12 }}
            fullWidth
            placeholder="e.g. myCustom123"
            sx={textFieldStyles} // Apply shared styles
          />
          <TextField
            label="Validity (minutes)"
            value={validity}
            onChange={(e) => setValidity(e.target.value.replace(/[^0-9]/g, ""))}
            fullWidth
            placeholder="Defaults to 30"
            InputProps={{ inputProps: { min: 1, max: 1440 } }}
            sx={textFieldStyles} // Apply shared styles
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              padding: '12px 0',
              fontWeight: 'bold',
              backgroundColor: '#e0e0e0',
              color: '#12121d',
              '&:hover': { backgroundColor: '#fff' }
            }}
          >
            Shorten URL
          </Button>
        </Stack>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {result && (
        <Alert severity="success" sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Box sx={{ flexGrow: 1 }}>
            <strong>Short URL:</strong> {result}
          </Box>
          <InputAdornment position="end">
            <IconButton onClick={handleCopy} edge="end" color={copied ? "success" : "default"}>
              <ContentCopyIcon />
            </IconButton>
          </InputAdornment>
          {copied && (
            <Typography variant="caption" color="success.main" sx={{ ml: 1 }}>
              Copied!
            </Typography>
          )}
        </Alert>
      )}
    </Paper>
  );
};

export default CreateShortURL;
