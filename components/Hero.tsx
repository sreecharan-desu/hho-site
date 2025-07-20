import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function EnhancedHeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true); // Mark as animated on first render
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(220,38,38,0.08)_1px,transparent_0)] bg-[length:40px_40px]" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-red-50/30 via-transparent to-red-50/30"
          animate={hasAnimated ? {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <section 
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center min-h-[85vh] flex items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mx-auto mb-12 w-32 h-32 flex items-center justify-center"
            initial={hasAnimated ? false : { scale: 0.5, opacity: 0 }}
            animate={hasAnimated ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 100 100"
              className="drop-shadow-lg"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
                strokeDasharray="219.9"
                strokeDashoffset="0"
                strokeLinecap="round"
                initial={hasAnimated ? false : { strokeDashoffset: 219.9 }}
                animate={hasAnimated ? { strokeDashoffset: 0 } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              <motion.g
                initial={hasAnimated ? false : { scale: 0, opacity: 0 }}
                animate={hasAnimated ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                style={{ transformOrigin: "50px 50px" }}
              >
                <rect x="46" y="36" width="8" height="28" fill="#dc2626" rx="4" />
                <rect x="36" y="46" width="28" height="8" fill="#dc2626" rx="4" />
              </motion.g>

              <motion.circle
                cx="50"
                cy="25"
                r="2"
                fill="#ef4444"
                animate={hasAnimated ? { rotate: 360 } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              Small Acts.{" "}
              <span className="text-red-600">Big Impact</span>
            </h1>
          </motion.div>

          <motion.div
            initial={hasAnimated ? false : { opacity: 0, y: 20 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Together, we create hope and support during life's most challenging moments. 
              Join our community dedicated to making a meaningful difference.
            </p>
          </motion.div>

          <motion.div
            initial={hasAnimated ? false : { opacity: 0, y: 30 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {[
              { text: "Donate Now", href: "/donate", primary: true },
              { text: "Get Involved", href: "/get-involved", primary: false },
              { text: "Request Help", href: "/request-help", primary: false }
            ].map((button, index) => (
              <motion.a
                key={button.text}
                href={button.href}
                className={`inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-sm ${
                  button.primary
                    ? "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl"
                    : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50"
                }`}
                whileHover={{ 
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ scale: 0.98 }}
                initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.1 + index * 0.1,
                }}
              >
                {button.text}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={hasAnimated ? false : { opacity: 0 }}
            animate={hasAnimated ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Registered Charity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Transparent Funding</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium">Community Driven</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}