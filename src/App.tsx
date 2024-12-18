import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollDots from './components/ScrollDots';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import DiscordBot from './pages/DiscordBot';
import Background from './components/Background';

function ScrollDotsWrapper() {
  const location = useLocation();
  return location.pathname === '/' ? <ScrollDots /> : null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen text-white overflow-hidden">
        <Background />
        <div className="relative z-10">
          <Navbar />
          <ScrollDotsWrapper />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/discord-bot" element={<DiscordBot />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  );
}