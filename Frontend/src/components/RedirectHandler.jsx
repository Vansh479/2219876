import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useURLContext } from "../context/URLContext";
import { CircularProgress, Box, Alert } from "@mui/material";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const { handleRedirect } = useURLContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doRedirect = async () => {
      const { longUrl, error: redirectError } = handleRedirect(shortcode);
      if (redirectError) {
        setError(redirectError);
        setLoading(false);
      } else if (longUrl) {
        window.location.href = longUrl;
      } else {
        setError("Unknown error occurred.");
        setLoading(false);
      }
    };
    doRedirect();
    // eslint-disable-next-line
  }, [shortcode]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return null;
};

export default RedirectHandler;
