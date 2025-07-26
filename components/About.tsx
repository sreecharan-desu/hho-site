// @ts-nocheck

"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Heart, Lightbulb, Users, Calendar, Target, ArrowRight } from "lucide-react";
import { apiData } from "@/lib/api";

export default function ProfessionalSections() {
  const [visibleSections, setVisibleSections] = useState<any>({});
  const [hasAnimated, setHasAnimated] = useState<any>({
    about: false,
    why: false,
    campaigns: false
  });
  const sectionRefs = {
    about: useRef(null),
    why: useRef(null),
    campaigns: useRef(null)
  };

  const componentData: any = apiData.find(c => c.component === "ProfessionalSections")?.data;
  const events = componentData?.campaigns.events || [];

  useEffect(() => {
    const observers: any = {};
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasAnimated[key]) {
              setVisibleSections((prev: any) => ({ ...prev, [key]: true }));
              setHasAnimated((prev: any) => ({ ...prev, [key]: true }));
            }
          },
          { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
        observers[key].observe(ref.current);
      }
    });
    return () => Object.values(observers).forEach((observer: any) => observer.disconnect());
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.8, type: "spring", stiffness: 100 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <div className="font-sans">
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

      <section ref={sectionRefs.about} id="about" className="py-24 px-6 lg:px-12 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.about ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full text-red-600 font-medium mb-6 shadow-sm border border-red-100/50"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              </motion.div>
              {componentData?.about.sectionLabel}
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight"
            >
              {componentData?.about.title.replace(componentData?.about.highlightedTitle, '')}
              <span className="text-red-600">{componentData?.about.highlightedTitle}</span>
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-32 h-1 bg-gradient-to-r from-red-600/90 to-red-400/90 mx-auto mb-8 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <motion.div
            variants={itemVariants}
            className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-md border border-gray-100/30"
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed text-center font-light">
              {componentData?.about.description.replace('RGUKT Ongole', '')}
              <span className="font-semibold text-gray-800">RGUKT Ongole</span>
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mt-10 pt-8 border-t border-gray-200/50">
              {componentData?.about.stats.map((stat: any, index: number) => (
                <motion.div
                  key={index}
                  className="text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/30"
                  whileHover={{ y: -5, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.05)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-extrabold text-red-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={sectionRefs.why} className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.why ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full text-red-600 font-medium mb-6 shadow-sm border border-red-100/50"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
                <Target className="w-5 h-5" />
              </motion.div>
              {componentData?.why.sectionLabel}
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight"
            >
              {componentData?.why.title.replace(componentData?.why.highlightedTitle, '')}
              <span className="text-red-600">{componentData?.why.highlightedTitle}</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {componentData?.why.description}
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {componentData?.why.pillars.map((item: any, index: number) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-gray-100/30 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-400/20 before:to-transparent before:opacity-0 before:group-hover:opacity-100 before:transition-opacity before:duration-300"
                whileHover={{ y: -5, rotateX: 2, rotateY: 2, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-${item.color}-50 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className={`text-${item.color === 'red' ? 'red' : item.color === 'blue' ? 'blue' : 'green'}-600`}>
                    {item.icon === 'Heart' && <Heart className="w-10 h-10" />}
                    {item.icon === 'Lightbulb' && <Lightbulb className="w-10 h-10" />}
                    {item.icon === 'Users' && <Users className="w-10 h-10" />}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-${item.color === 'red' ? 'red' : item.color === 'blue' ? 'blue' : 'green'}-50 text-${item.color === 'red' ? 'red' : item.color === 'blue' ? 'blue' : 'green'}-600`}>
                    {item.stats}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section ref={sectionRefs.campaigns} id="campaigns" className="py-24 px-6 lg:px-12 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.campaigns ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full text-red-600 font-medium mb-6 shadow-sm border border-red-100/50"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
                <Calendar className="w-5 h-5" />
              </motion.div>
              {componentData?.campaigns.sectionLabel}
            </motion.div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 leading-tight"
            >
              {componentData?.campaigns.title.replace(componentData?.campaigns.highlightedTitle, '')}
              <span className="text-red-600">{componentData?.campaigns.highlightedTitle}</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              {componentData?.campaigns.description}
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {events.map((event: any, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative bg-white/90 backdrop-blur-sm border border-gray-100/30 rounded-3xl overflow-hidden shadow-md"
                whileHover={{ y: -5, rotateX: 2, rotateY: 2, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'active' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          event.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                        }`}
                        animate={event.status === 'active' ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      {event.status === 'active' ? 'Active' : 'Completed'}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      <Target className="w-4 h-4" />
                      {event.impact}
                    </span>
                    <motion.button
                      className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 2 }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400 animate-gradient"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: "200% 100%" }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}