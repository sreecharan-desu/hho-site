import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Heart, Lightbulb, Users, Calendar, Target, ArrowRight } from "lucide-react";

export default function ProfessionalSections() {
  const [visibleSections, setVisibleSections] = useState({});
  const [hasAnimated, setHasAnimated] = useState({
    about: false,
    why: false,
    campaigns: false
  });
  const sectionRefs = {
    about: useRef(null),
    why: useRef(null),
    campaigns: useRef(null)
  };

  const events = [
    {
      name: "Emergency Medical Fund",
      date: "Ongoing",
      description: "Providing immediate financial assistance to students facing medical emergencies and family health crises.",
      impact: "₹2.5L+ Raised",
      status: "active"
    },
    {
      name: "Education Support Initiative",
      date: "Jan 2024 - Ongoing",
      description: "WhatsApp mentorship groups and academic resources for underprivileged students.",
      impact: "500+ Students Helped",
      status: "active"
    },
    {
      name: "Eco-Friendly Community Drive",
      date: "Dec 2023",
      description: "Sustainable campus initiatives including tree plantation and waste management programs.",
      impact: "1000+ Trees Planted",
      status: "completed"
    }
  ];

  useEffect(() => {
    const observers = {};
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasAnimated[key]) {
              setVisibleSections(prev => ({
                ...prev,
                [key]: true
              }));
              setHasAnimated(prev => ({
                ...prev,
                [key]: true
              }));
            }
          },
          { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
        observers[key].observe(ref.current);
      }
    });

    return () => {
      Object.values(observers).forEach(observer => observer.disconnect());
    };
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div>
      <section ref={sectionRefs.about} id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.about ? "visible" : "hidden"}
        >
          <div className="text-center mb-12">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-red-600 font-medium mb-4"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              About Our Organization
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              About <span className="text-red-600">HHO</span>
            </motion.h2>
            
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-8"
            ></motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-100"
          >
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed text-center font-light">
              A student-led nonprofit at <span className="font-semibold text-gray-900">RGUKT Ongole</span>, 
              dedicated to providing financial assistance for health challenges, empowering education, 
              and fostering community support through sustainable initiatives.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">2024</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">₹5L+</div>
                <div className="text-sm text-gray-600">Funds Raised</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={sectionRefs.why} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.why ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-red-600 font-medium mb-4 shadow-sm"
            >
              <Target className="w-4 h-4" />
              Our Impact Areas
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              Why HHO <span className="text-red-600">Matters</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our three core pillars drive meaningful change in our community
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Heart className="w-10 h-10" />, 
                title: 'Compassion', 
                desc: 'Supporting students in medical emergencies with immediate financial assistance and emotional support.',
                color: 'red',
                stats: '50+ Cases Resolved'
              },
              { 
                icon: <Lightbulb className="w-10 h-10" />, 
                title: 'Education', 
                desc: 'Empowering through WhatsApp mentorship groups, academic resources, and career guidance.',
                color: 'blue',
                stats: '10+ Study Groups'
              },
              { 
                icon: <Users className="w-10 h-10" />, 
                title: 'Community', 
                desc: 'Building unity through eco-friendly events, cultural programs, and collaborative initiatives.',
                color: 'green',
                stats: '1000+ Participants'
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200"
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${item.color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${item.color === 'red' ? 'red' : item.color === 'blue' ? 'blue' : 'green'}-600`}>
                    {item.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                
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

      <section ref={sectionRefs.campaigns} id="campaigns" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.campaigns ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-red-600 font-medium mb-4"
            >
              <Calendar className="w-4 h-4" />
              Our Initiatives
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              Ongoing & Past <span className="text-red-600">Campaigns</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover the initiatives that are creating lasting impact in our community
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'active' 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        event.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                      }`}></div>
                      {event.status === 'active' ? 'Active' : 'Completed'}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{event.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300">
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
                
                <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}