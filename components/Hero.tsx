import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Heart, Shield, Users, Play, Pause } from "lucide-react";
import Image from "next/image";

interface EnhancedHeroSectionProps {
  openDonatePopup: () => void; // Add prop type for the callback
}

export default function EnhancedHeroSection({ openDonatePopup }: EnhancedHeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const intervalRef = useRef<any | null>(null);
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? -10 : -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroMessages = [
    {
      title: "Small Acts. Big Impact",
      subtitle: "Together, we create hope and support during life's most challenging moments. Join our community dedicated to making a meaningful difference.",
      cta: "Start Making a Difference"
    },
    {
      title: "Every Drop Counts",
      subtitle: "Your generosity creates ripples of change that reach far beyond what you can imagine. Be part of something bigger.",
      cta: "Join the Movement"
    },
    {
      title: "Building Tomorrow",
      subtitle: "Through compassion and community action, we're creating lasting solutions for those who need it most.",
      cta: "Build With Us"
    }
  ];

  const startSlideshow = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroMessages.length);
    }, 7000);
  }, [heroMessages.length]);

  const pauseSlideshow = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => {
      if (prev) {
        pauseSlideshow();
      } else {
        startSlideshow();
      }
      return !prev;
    });
  }, [startSlideshow, pauseSlideshow]);

  const goToSlide = useCallback((index: any) => {
    setCurrentSlide(index);
    if (isPlaying) {
      startSlideshow();
    }
  }, [isPlaying, startSlideshow]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPlaying && isVisible) {
      startSlideshow();
    } else {
      pauseSlideshow();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isVisible, startSlideshow, pauseSlideshow]);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingComplete(true), shouldReduceMotion ? 200 : 1500);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  const handleMouseEnter = useCallback(() => {
    if (isPlaying) pauseSlideshow();
  }, [isPlaying, pauseSlideshow]);

  const handleMouseLeave = useCallback(() => {
    if (isPlaying) startSlideshow();
  }, [isPlaying, startSlideshow]);

  const pulseAnimation = shouldReduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.03, 1], opacity: [1, 0.9, 1] },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-red-50/30"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white px-4 py-2 rounded-md shadow-lg"
      >
        Skip to main content
      </a>

      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(220,38,38,0.03)_2px,transparent_0)] bg-[length:40px_40px]"
          animate={{ backgroundPosition: ["0 0", "40px 40px", "0 0"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {!shouldReduceMotion && isVisible && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-50/20 via-transparent to-red-50/20"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-red-100/50"
                style={{ left: `${15 + (i * 12)}%`, top: `${15 + (i * 12)}%` }}
                animate={{
                  y: [-12, 12, -12],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.7, 1.3, 0.7]
                }}
                transition={{
                  duration: 8 + i * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </div>

      <motion.section
        className="relative pt-28 pb-20 px-4 sm:px-8 lg:px-12 text-center min-h-screen flex items-center justify-center"
        style={{ y, opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.3 : 1, ease: [0.32, 0, 0.1, 1] }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="main"
        aria-label="Hero section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mx-auto mb-12 w-40 h-40 flex items-center justify-center"
            initial={{ scale: shouldReduceMotion ? 1 : 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 1.2,
              ease: [0.32, 0, 0.1, 1],
              delay: shouldReduceMotion ? 0 : 0.6
            }}
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.08, filter: "brightness(1.1)" }}
            role="img"
            aria-label="Charity organization logo"
          >
            <img
              src="/logo.png"
              alt="Charity organization logo"
              className="w-32 h-32 object-contain drop-shadow-lg"
              {...pulseAnimation}
            />
          </motion.div>

          <div className="mb-12" role="region" aria-live="polite" aria-label="Hero messages slideshow">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -30 }}
                transition={{ duration: 0.7, ease: [0.32, 0, 0.1, 1] }}
                className="space-y-8"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-wide">
                  {heroMessages[currentSlide].title.split(' ').map((word, index) => (
                    <motion.span
                      key={`${currentSlide}-${index}`}
                      className={word.includes('Big') || word.includes('Drop') || word.includes('Tomorrow') ? 'text-red-600' : ''}
                      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.5,
                        delay: shouldReduceMotion ? 0 : 0.2 + index * 0.06,
                        ease: [0.32, 0, 0.1, 1]
                      }}
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
                  {heroMessages[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 0.8 }}
          >
            <motion.button
              onClick={openDonatePopup} // Call the callback to open Donate popup
              className="group relative inline-flex items-center px-10 py-5 text-lg font-bold rounded-xl bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/60 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, y: shouldReduceMotion ? 0 : -4 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.96 }}
              aria-label={`${heroMessages[currentSlide].cta} - Open donation popup`}
            >
              <Heart className="w-6 h-6 mr-3" />
              {heroMessages[currentSlide].cta}
            </motion.button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-10 text-gray-500 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 1.2 }}
          >
            {[
              { icon: Shield, text: "Registered Charity", color: "text-green-500" },
              { icon: Users, text: "Community Driven", color: "text-blue-500" },
              { icon: Heart, text: "Transparent Impact", color: "text-purple-500" }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 1.3 + index * 0.1 }}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.07 }}
              >
                <item.icon className={`w-6 h-6 ${item.color}`} />
                <span className="text-base font-semibold group-hover:text-gray-700 transition-colors">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 1.6 }}
          >
            <button
              onClick={togglePlayPause}
              className="p-3 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/60"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause className="w-5 h-5 text-gray-600" /> : <Play className="w-5 h-5 text-gray-600" />}
            </button>
            <div className="flex gap-3" role="tablist" aria-label="Slide navigation">
              {heroMessages.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/60 ${
                    index === currentSlide ? 'bg-red-500 w-10' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => goToSlide(index)}
                  role="tab"
                  aria-selected={index === currentSlide}
                  aria-label={`Go to slide ${index + 1}: ${heroMessages[index].title}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 1.9 }}
          >
            <motion.div
              animate={{ y: shouldReduceMotion ? 0 : [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-base mb-3">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div id="main-content" className="sr-only">Main content starts here</div>
    </div>
  );
}