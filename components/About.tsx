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

  // Extract data for this component
  const componentData:any = apiData.find(c => c.component === "ProfessionalSections")?.data;
  const events = componentData?.campaigns.events || [];

  useEffect(() => {
    const observers: any = {};
    
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasAnimated[key]) {
              setVisibleSections((prev: any) => ({
                ...prev,
                [key]: true
              }));
              setHasAnimated((prev: any) => ({
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
      Object.values(observers).forEach((observer: any) => observer.disconnect());
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
      transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] }
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
              //@ts-expect-error ---
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-red-600 font-medium mb-4"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              {componentData?.about.sectionLabel}
            </motion.div>
            
            <motion.h2 
              //@ts-expect-error ---
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {componentData?.about.title.replace(componentData?.about.highlightedTitle, '')} 
              <span className="text-red-600">{componentData?.about.highlightedTitle}</span>
            </motion.h2>
            
            <motion.div
              //@ts-expect-error ---
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-8"
            ></motion.div>
          </div>

          <motion.div
            //@ts-expect-error ---
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-50 to-white p-8 sm:p-12 rounded-2xl shadow-lg border border-gray-100"
          >
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed text-center font-light">
              {componentData?.about.description.replace('RGUKT Ongole', '')}
              <span className="font-semibold text-gray-900">RGUKT Ongole</span>
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              {componentData?.about.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
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
              //@ts-expect-error ---
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-red-600 font-medium mb-4 shadow-sm"
            >
              <Target className="w-4 h-4" />
              {componentData?.why.sectionLabel}
            </motion.div>
            
            <motion.h2 
              //@ts-expect-error ---
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              {componentData?.why.title.replace(componentData?.why.highlightedTitle, '')}
              <span className="text-red-600">{componentData?.why.highlightedTitle}</span>
            </motion.h2>
            
            <motion.p
              //@ts-expect-error ---
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {componentData?.why.description}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {componentData?.why.pillars.map((item: any, index: number) => (
              <motion.div
                key={item.title}
                //@ts-expect-error ---
                variants={itemVariants}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200"
                whileHover={{ y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${item.color}-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${item.color === 'red' ? 'red' : item.color === 'blue' ? 'blue' : 'green'}-600`}>
                    {item.icon === 'Heart' && <Heart className="w-10 h-10" />}
                    {item.icon === 'Lightbulb' && <Lightbulb className="w-10 h-10" />}
                    {item.icon === 'Users' && <Users className="w-10 h-10" />}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
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

      <section ref={sectionRefs.campaigns} id="campaigns" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={visibleSections.campaigns ? "visible" : "hidden"}
        >
          <div className="text-center mb-16">
            <motion.div
              //@ts-expect-error ---
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-red-600 font-medium mb-4"
            >
              <Calendar className="w-4 h-4" />
              {componentData?.campaigns.sectionLabel}
            </motion.div>
            
            <motion.h2 
              //@ts-expect-error ---
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
            >
              {componentData?.campaigns.title.replace(componentData?.campaigns.highlightedTitle, '')}
              <span className="text-red-600">{componentData?.campaigns.highlightedTitle}</span>
            </motion.h2>
            
            <motion.p
              //@ts-expect-error ---
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {componentData?.campaigns.description}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event: any, index: number) => (
              <motion.div
                key={index}
                //@ts-expect-error ---
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
