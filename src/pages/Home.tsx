import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Gamepad2, Music, User, Mail, Globe, Code, Heart, Facebook, Instagram, Youtube, MessageSquare } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const games = [
  { name: "Genshin Impact", image: "https://images.unsplash.com/photo-1669831588632-ee6ff06e5b29", platform: "PC/Mobile" },
  { name: "GTA Online", image: "https://images.unsplash.com/photo-1604846887565-640d2f52d564", platform: "PC" },
  { name: "Wuthering Waves", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e", platform: "PC/Mobile" },
  { name: "Honkai Star Rail", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679", platform: "PC/Mobile" },
  { name: "Free Fire", image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc", platform: "Mobile" },
  { name: "Brawlhalla", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", platform: "PC" },
];

const socialLinks = [
  { 
    icon: Facebook, 
    color: "from-blue-500/20 to-blue-600/20 hover:from-blue-500 hover:to-blue-600", 
    url: "#",
    label: "Facebook"
  },
  { 
    icon: MessageSquare, 
    color: "from-indigo-500/20 to-indigo-600/20 hover:from-indigo-500 hover:to-indigo-600", 
    url: "#",
    label: "Discord"
  },
  { 
    icon: Instagram, 
    color: "from-pink-500/20 to-purple-600/20 hover:from-pink-500 hover:to-purple-600", 
    url: "#",
    label: "Instagram"
  },
  { 
    icon: Youtube, 
    color: "from-red-500/20 to-red-600/20 hover:from-red-500 hover:to-red-600", 
    url: "#",
    label: "YouTube"
  },
];

const roles = ["Web Developer", "Gamer", "Music Enthusiast"];

function Home() {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  useEffect(() => {
    let currentText = "";
    let currentIndex = 0;
    const role = roles[roleIndex];

    const typeTimer = setInterval(() => {
      if (currentIndex <= role.length) {
        setRoleText(role.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          if (roleIndex < roles.length - 1) {
            setRoleIndex(prev => prev + 1);
          } else {
            setRoleIndex(0);
          }
          setIsTyping(true);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIcon(false);
      } else {
        setShowScrollIcon(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div 
        className="h-screen flex flex-col items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="text-center space-y-6"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h1 className="text-7xl font-bold mb-4">
            <span className="text-white">Hi, I'm </span>
            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.span
                className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                MR. OPPY
              </motion.span>
            </motion.span>
          </h1>
          <motion.p 
            className="text-2xl font-bold tracking-wide text-fuchsia-400"
            animate={{ 
              textShadow: ["0 0 10px #e879f9", "0 0 20px #e879f9", "0 0 10px #e879f9"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {roleText}
            <AnimatePresence>
              {isTyping && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </AnimatePresence>
          </motion.p>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center space-x-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${social.color} blur-md transition-all duration-300 opacity-75 group-hover:opacity-100`} />
                  <div className="relative p-3 rounded-full backdrop-blur-sm bg-white/10">
                    <Icon className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <motion.span
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll Icon */}
        {showScrollIcon && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        className="min-h-screen py-20 px-6 relative"
        initial={{ opacity: 0 }}
        animate={aboutInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: -50 }}
            animate={aboutInView ? { y: 0 } : {}}
          >
            <motion.h2 
              className="text-5xl font-bold mb-4 bg-gradient-to-r from-fuchsia-400 to-purple-600 text-transparent bg-clip-text"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              About Me
            </motion.h2>
            <p className="text-xl text-gray-300">Get to know me better</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AboutCard 
              icon={<User className="w-8 h-8" />}
              title="Personal Info"
              items={[
                { label: "Name", value: "MR. OPPY" },
                { label: "Age", value: "25" },
                { label: "Location", value: "Tokyo, Japan" },
                { label: "Gender", value: "Male" },
              ]}
            />
            <AboutCard 
              icon={<Code className="w-8 h-8" />}
              title="Professional"
              items={[
                { label: "Study", value: "Computer Science" },
                { label: "Focus", value: "Web Development" },
                { label: "Experience", value: "5+ Years" },
                { label: "Status", value: "Freelancer" },
              ]}
            />
            <AboutCard 
              icon={<Heart className="w-8 h-8" />}
              title="Interests"
              items={[
                { label: "Gaming", value: "RPG & Action" },
                { label: "Music", value: "Production & Mix" },
                { label: "Art", value: "Digital & Anime" },
                { label: "Tech", value: "Latest Trends" },
              ]}
            />
          </div>

          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ y: 50 }}
            animate={aboutInView ? { y: 0 } : {}}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Started my journey in tech with a passion for creating digital experiences.
                Specialized in web development while exploring various aspects of computer science.
                Currently focusing on building innovative solutions and learning new technologies.
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/10 to-purple-600/10 pointer-events-none" />
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <div className="space-y-4">
                <a href="mailto:contact@example.com" className="flex items-center space-x-3 text-lg hover:text-fuchsia-400 transition-colors">
                  <Mail className="w-6 h-6" />
                  <span>contact@example.com</span>
                </a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-lg hover:text-fuchsia-400 transition-colors">
                  <Globe className="w-6 h-6" />
                  <span>www.example.com</span>
                </a>
              </div>
              <div className="absolute inset-0 bg-gradient-to-bl from-purple-400/10 to-fuchsia-600/10 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Games Section */}
      <motion.section 
        className="min-h-screen py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Gamepad2 className="w-8 h-8 mr-3 text-fuchsia-400" />
            <h2 className="text-4xl font-bold">Games I Play</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.name}
                className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative h-48">
                  <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold">{game.name}</h3>
                    <p className="text-sm text-fuchsia-400">{game.platform}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Music Section */}
      <motion.section
        className="min-h-screen py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-12">
            <Music className="w-8 h-8 mr-3 text-fuchsia-400" />
            <h2 className="text-4xl font-bold">Favorite Tracks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <motion.div
                key={id}
                className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: id * 0.1 }}
                viewport={{ once: true }}
              >
                <iframe
                  src={`https://open.spotify.com/embed/track/${id}`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function AboutCard({ icon, title, items }: { 
  icon: React.ReactNode; 
  title: string; 
  items: { label: string; value: string; }[];
}) {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="text-fuchsia-400">{icon}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-sm text-fuchsia-400 mb-1">{item.label}</div>
            <div className="text-lg">{item.value}</div>
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/5 to-purple-600/5 pointer-events-none" />
    </motion.div>
  );
}

export default Home;