// @ts-nocheck

"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AlertTriangle, Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { apiData } from "@/lib/api";

export default function UrgentHelpAlert() {
  const [visibleSection, setVisibleSection] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Extract data for this component
  const componentData: any = apiData.find((c) => c.component === "UrgentHelpAlert")?.data;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setVisibleSection(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={visibleSection ? "visible" : "hidden"}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-8 py-6">
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                variants={pulseVariants}
                animate={hasAnimated ? "pulse" : {}}
                className="bg-white/20 p-2 rounded-full"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {componentData?.title}
              </h2>
            </motion.div>
          </div>

          <div className="px-8 py-12">
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {componentData?.subtitle}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                {componentData?.description}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-6 mb-8"
            >
              {componentData?.contactMethods.map((method: any, index: number) => (
                <motion.div
                  key={index}
                  className={`bg-${method.color}-50 border border-${method.color}-200 rounded-xl p-6 group hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`bg-${method.color}-600 p-3 rounded-full`}>
                      {method.icon === 'Phone' && <Phone className="w-6 h-6 text-white" />}
                      {method.icon === 'MessageCircle' && <MessageCircle className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.method}</h4>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  <p className={`text-${method.color}-600 font-bold text-lg`}>{method.value}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {componentData?.buttons.map((button: any, index: number) => (
                <motion.a
                  key={index}
                  href={`mailto:hho@rguktong.ac.in?subject=Urgent%20Request%20for%20${encodeURIComponent(button.text || 'Urgent Help')}&body=${encodeURIComponent(`I need urgent assistance regarding ${button.text || 'Urgent Help'}. ${componentData?.description || 'Please provide urgent assistance.'}`)}`}
                  className={`${button.style} font-semibold px-8 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {button.icon === 'ArrowRight' && <ArrowRight className="w-4 h-4" />}
                  {button.icon === 'Clock' && <Clock className="w-4 h-4" />}
                  {button.text}
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 opacity-75"
            animate={hasAnimated ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% 100%'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}