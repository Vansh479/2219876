import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Box,
  Chip,
  Stack
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";

const URLCard = ({ url }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const shortUrl = `${window.location.origin}/s/${url.shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleVisit = () => {
    navigate(`/s/${url.shortCode}`);
  };

  return (
    <Card sx={{ mb: 2, borderLeft: url.expired ? '6px solid #f44336' : '6px solid #4caf50' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
            {shortUrl}
          </Typography>
          <Tooltip title={copied ? "Copied!" : "Copy short URL"}>
            <IconButton onClick={handleCopy} color={copied ? "success" : "default"}>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, wordBreak: 'break-all' }}>
          <strong>Original:</strong> {url.longUrl}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip
            label={url.expired ? "Expired" : "Active"}
            color={url.expired ? "error" : "success"}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`Visits: ${url.visitCount}`}
            color="primary"
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`Created: ${new Date(url.createdAt).toLocaleString()}`}
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label={`Expires: ${new Date(url.expiresAt).toLocaleString()}`}
            size="small"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            endIcon={<OpenInNewIcon />}
            onClick={handleVisit}
            disabled={url.expired}
          >
            Visit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default URLCard;
