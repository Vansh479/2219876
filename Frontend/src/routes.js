import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateShortURL from './components/CreateShortURL';
import RedirectHandler from './components/RedirectHandler';
import Analytics from './components/Analytics';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateShortURL />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}
