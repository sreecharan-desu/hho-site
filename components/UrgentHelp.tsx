import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { AlertTriangle, Phone, MessageCircle, Clock, ArrowRight } from "lucide-react";

export default function UrgentHelpAlert() {
  const [visibleSection, setVisibleSection] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-50 to-orange-50">
      <motion.div 
        className="max-w-4xl mx-auto"
              // @ts-expect-error ---

        variants={containerVariants}
        initial="hidden"
        animate={visibleSection ? "visible" : "hidden"}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-red-100">
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-8 py-6">
            <motion.div
              // @ts-expect-error ---

              variants={itemVariants}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
              // @ts-expect-error ---

                variants={pulseVariants}
                animate={hasAnimated ? "pulse" : {}}
                className="bg-white/20 p-2 rounded-full"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Urgent Help Alert
              </h2>
            </motion.div>
          </div>

          <div className="px-8 py-12">
            <motion.div
              // @ts-expect-error ---

              variants={itemVariants}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                A student needs immediate support
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                We have received an urgent request for assistance. If you can help or know someone who can, 
                please reach out to us immediately.
              </p>
            </motion.div>

            <motion.div
              // @ts-expect-error ---

              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-6 mb-8"
            >
              <motion.div
                className="bg-red-50 border border-red-200 rounded-xl p-6 group hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-red-600 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Now</h4>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </div>
                <p className="text-red-600 font-bold text-lg">+91 79819 37656</p>
              </motion.div>

              <motion.div
                className="bg-blue-50 border border-blue-200 rounded-xl p-6 group hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Send Message</h4>
                    <p className="text-sm text-gray-600">Quick response</p>
                  </div>
                </div>
                <p className="text-blue-600 font-semibold">hho@rguktong.ac.in</p>
              </motion.div>
            </motion.div>

            <motion.div
              // @ts-expect-error ---
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                className="bg-red-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Request Help Now
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                className="border-2 border-red-600 text-red-600 font-semibold px-8 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Clock className="w-4 h-4" />
                Emergency Guidelines
              </motion.button>
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