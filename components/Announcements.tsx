import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Bell, Clock, MapPin } from "lucide-react";

export default function AnnouncementsPreview() {
  const [visibleSection, setVisibleSection] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has run
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setVisibleSection(true);
          setHasAnimated(true); // Mark as animated to prevent re-animation
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]); // Add hasAnimated to dependencies

  const announcements = [
    {
      id: 1,
      title: "Daily Aerobic Sessions",
      message: "New aerobic sessions start at 6 AM daily. Join us for a healthy start to your day!",
      time: "6:00 AM",
      location: "Main Ground",
      priority: "high",
    },
    {
      id: 2,
      title: "HHO Desks Installation",
      message: "HHO desks coming soon to every academic block for better student support.",
      time: "Coming Soon",
      location: "All Academic Blocks",
      priority: "medium",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "border-l-red-500 bg-red-50",
      medium: "border-l-blue-500 bg-blue-50",
      low: "border-l-green-500 bg-green-50",
    };
    return colors[priority];
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={visibleSection ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-red-600 font-medium mb-4 shadow-sm border border-red-100">
            <Bell className="w-4 h-4" />
            Latest Updates
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Announcements <span className="text-red-600">Preview</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto"></div>
        </motion.div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              variants={itemVariants}
              className={`group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${getPriorityColor(
                announcement.priority
              )} overflow-hidden`}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
                  {announcement.title}
                </h3>

                {/* Message */}
                <p className="text-gray-700 mb-4 leading-relaxed">{announcement.message}</p>

                {/* Meta Information */}
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

              {/* Hover Effect */}
              <div className="absolute top-0 right-0 w-0 h-0 group-hover:w-full group-hover:h-full bg-gradient-to-br from-red-50 to-transparent transition-all duration-500 opacity-0 group-hover:opacity-50"></div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.button
            className="bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Announcements
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}