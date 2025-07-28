
// @ts-nocheck

"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bell, Clock, MapPin } from "lucide-react";

export default function AnnouncementsPreview() {
  const [visibleSection, setVisibleSection] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Static announcements data
  const announcements = [
    {
      id: "1",
      title: "Weekly One Rupee Challenge",
      message: "Join our Weekly One Rupee Challenge! Donate just 1 rupee this week to support our community initiatives. Every small contribution makes a big impact!",
      priority: "high",
      time: "Ongoing",
      location: "Online",
    },
    {
      id: "2",
      title: "Celebrate Your Friend's Birthday",
      message: "Is it your friend's birthday this week? Make it special by donating 100 rupees in their honor to support our cause!",
      priority: "medium",
      time: "This Week",
      location: "Online",
    },
  ];

  // Static section metadata
  const sectionData = {
    sectionLabel: "Campaign Updates",
    title: "Join Our Donation Challenges",
    highlightedTitle: "Donation Challenges",
    loadingMessage: "Loading announcements...",
    errorMessage: "Failed to load announcements.",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setVisibleSection(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8, type: "spring", stiffness: 100 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors: any = {
      high: "border-l-red-500 bg-red-50/90",
      medium: "border-l-blue-500 bg-blue-50/90",
      low: "border-l-green-500 bg-green-50/90",
    };
    return colors[priority] || colors.low;
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-12 bg-gray-50 font-sans">
      <style jsx global>{`
        .animate-gradient {
          background-size: 200% 100%;
          animation: gradientShift 3s linear infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={visibleSection ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full text-red-600 font-medium mb-6 shadow-sm border border-red-100/50"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
              <Bell className="w-5 h-5" />
            </motion.div>
            {sectionData.sectionLabel}
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            {sectionData.title.replace(sectionData.highlightedTitle, '')}
            <span className="text-red-600">{sectionData.highlightedTitle}</span>
          </h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-red-600/90 to-red-400/90 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              variants={itemVariants}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-md border-l-4 ${getPriorityColor(
                announcement.priority
              )} overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-${announcement.priority}-400/20 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-300`}
              whileHover={{ y: -4, rotateX: 3, rotateY: 3, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)" }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {announcement.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{announcement.message}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-red-600" />
                    <span>{announcement.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{announcement.location}</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
