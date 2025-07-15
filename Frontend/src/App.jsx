import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { URLProvider } from "./context/URLContext";
import CreateShortURL from "./components/CreateShortURL";
import Analytics from "./components/Analytics";
import RedirectHandler from "./components/RedirectHandler";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  CssBaseline
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';

function App() {
  return (
    <URLProvider>
      <Router>
        <CssBaseline />
      
        <Box sx={{
          minHeight: '100vh',
          backgroundImage: `
            linear-gradient(rgba(18, 18, 29, 0.1), rgba(18, 18, 29, 0.1)),
            url('/bg.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}>
        

          <AppBar
            position="static"
            elevation={0}
            sx={{
              backgroundColor: 'rgba(28, 28, 30, 0.25)',
              backdropFilter: 'blur(15px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LinkIcon sx={{ mr: 1, color: '#e0e0e0' }} />
                <Typography variant="h6" component="div" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
                  URL Shortener
                </Typography>
              </Box>
              <Box>
                <Button component={Link} to="/" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
                  Create
                </Button>
                <Button component={Link} to="/analytics" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
                  Analytics
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
          
          <Container component="main" maxWidth="md" sx={{ py: 4 }}>
            <Routes>
              <Route path="/" element={<CreateShortURL />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/s/:shortcode" element={<RedirectHandler />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </URLProvider>
  );
}

export default App;
