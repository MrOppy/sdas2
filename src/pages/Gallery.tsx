import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Plyr from 'plyr-react';
import { PlayIcon, FilmIcon, PhotoIcon } from '@heroicons/react/24/solid';
import 'plyr-react/plyr.css';

function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [imageCurrentPage, setImageCurrentPage] = useState(1);
  const [videoCurrentPage, setVideoCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const [imagesRes, videosRes] = await Promise.all([
          axios.get('https://dl.dropboxusercontent.com/scl/fi/rgx3ahu12718gw99619fb/image.txt?rlkey=sur1tg6h93zgmzfbgrplfj37g'),
          axios.get('https://dl.dropboxusercontent.com/scl/fi/gncxui3rfgundyez41wvg/video.txt?rlkey=6rojadlbml2ns0zy9i9m2fcpv')
        ]);
        
        setImages(imagesRes.data.split('\n').filter(Boolean));
        setVideos(videosRes.data.split('\n').filter(Boolean));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching media:', error);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  const handleTabChange = (tab: 'images' | 'videos') => {
    setActiveTab(tab);
  };

  const currentItems = activeTab === 'images' ? images : videos;
  const currentPage = activeTab === 'images' ? imageCurrentPage : videoCurrentPage;
  const setCurrentPage = activeTab === 'images' ? setImageCurrentPage : setVideoCurrentPage;
  
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const currentPageItems = currentItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 px-6"
    >
      <div className="flex justify-center mb-12">
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-full p-1.5 flex gap-2"
          whileHover={{ scale: 1.02 }}
        >
          {[
            { id: 'images', icon: PhotoIcon, label: 'Images' },
            { id: 'videos', icon: FilmIcon, label: 'Videos' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => handleTabChange(tab.id as 'images' | 'videos')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-fuchsia-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentPageItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
              >
                {activeTab === 'images' ? (
                  <div className="relative">
                    <img
                      src={item}
                      alt={`Gallery item ${index + 1}`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="aspect-video relative">
                    <Plyr
                      source={{
                        type: 'video',
                        sources: [{ src: item, provider: 'html5' }]
                      }}
                      options={{
                        controls: [
                          'play',
                          'progress',
                          'current-time',
                          'duration',
                          'mute',
                          'volume',
                          'fullscreen'
                        ],
                        displayDuration: true,
                        invertTime: false,
                        toggleInvert: false,
                        clickToPlay: true,
                        hideControls: true,
                        resetOnEnd: true,
                        keyboard: { focused: true, global: true },
                        tooltips: { controls: true, seek: true },
                        seekTime: 10,
                        volume: 1,
                        muted: false,
                        fullscreen: { enabled: true, fallback: true, iosNative: true },
                        storage: { enabled: true, key: 'plyr' }
                      }}
                    />
                    <button
                      onClick={() => handleDownload(item)}
                      className="absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 hover:scale-110 text-white/70 hover:text-white"
                      title="Download Video"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center mt-12 space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <motion.button
              key={i + 1}
              className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 ${
                currentPage === i + 1
                  ? 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white'
                  : 'bg-white/5 hover:bg-white/20'
              }`}
              onClick={() => setCurrentPage(i + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              {i + 1}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Gallery;