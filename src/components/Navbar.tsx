import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Image, Bot } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-50 pt-5">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div className="bg-black/30 backdrop-blur-lg rounded-full px-8 py-4 border border-white/20 flex justify-center">
          <ul className="flex items-center gap-12">
            <NavLink to="/" icon={<Home className="w-6 h-6" />} isActive={location.pathname === '/'} />
            <NavLink to="/gallery" icon={<Image className="w-6 h-6" />} isActive={location.pathname === '/gallery'} />
            <NavLink to="/discord-bot" icon={<Bot className="w-6 h-6" />} isActive={location.pathname === '/discord-bot'} />
          </ul>
        </motion.div>
      </motion.nav>
    </div>
  );
}

function NavLink({ to, icon, isActive }: { to: string; icon: React.ReactNode; isActive: boolean }) {
  return (
    <Link to={to}>
      <motion.li
        className={`relative p-3 cursor-pointer ${isActive ? 'text-fuchsia-400' : 'text-white'}`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
        {isActive && (
          <motion.div
            className="absolute inset-0 border-2 border-fuchsia-400 rounded-lg"
            layoutId="navbar-active"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
      </motion.li>
    </Link>
  );
}

export default Navbar;