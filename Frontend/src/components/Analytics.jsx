import React from "react";
import { useURLContext } from "../context/URLContext";
import URLCard from "./URLCard";
import { Typography, Box, Container } from "@mui/material";

const Analytics = () => {
  const { getAnalytics } = useURLContext();
  const urls = getAnalytics();

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        URL Analytics
      </Typography>
      {urls.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
          No URLs have been shortened yet.
        </Typography>
      ) : (
        <Box sx={{ mt: 2 }}>
          {urls.map((url) => (
            <URLCard key={url.shortCode} url={url} />
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Analytics;
