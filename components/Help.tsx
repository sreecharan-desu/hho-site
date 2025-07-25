
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect, JSX } from "react";
import {
  Heart,
  Gift,
  HandHeart,
  Gavel,
  ArrowRight,
  Users,
  IndianRupee,
  LucideIcon,
} from "lucide-react";
import { apiData } from "@/lib/api";


const getColorClasses = (color: string) => {
  const classes = {
    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      border: "border-emerald-200",
      text: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700",
      hoverBg: "hover:bg-emerald-50/80",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-200",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      hoverBg: "hover:bg-blue-50/80",
    },
    purple: {
      bg: "bg-purple-50",
      icon: "text-purple-600",
      border: "border-purple-200",
      text: "text-purple-600",
      button: "bg-purple-600 hover:bg-purple-700",
      hoverBg: "hover:bg-purple-50/80",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "text-orange-600",
      border: "border-orange-200",
      text: "text-orange-600",
      button: "bg-orange-600 hover:bg-orange-700",
      hoverBg: "hover:bg-orange-50/80",
    },
  };
  return classes[color as keyof typeof classes];
};

export default function ProfessionalHelpSection() {
  const [visibleSection, setVisibleSection] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Extract data for this component
  const componentData:any = apiData.find(c => c.component === "ProfessionalHelpSection")?.data;
  const helpOptions = componentData?.helpOptions || [];

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
      transition: {
        staggerChildren: 0.15,
        duration: 0.7,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.32, 0, 0.1, 1] },
    },
  };

  const pulseAnimation = shouldReduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] },
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <section
      ref={sectionRef}
      id="help"
      className="py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-red-50/30" aria-hidden="true" />
      {!shouldReduceMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-red-100/40"
              style={{ left: `${15 + (i * 15)}%`, top: `${15 + (i * 15)}%` }}
              animate={{
                y: [-12, 12, -12],
                opacity: [0.2, 0.5, 0.2],
                scale: [0.7, 1.1, 0.7],
              }}
              transition={{
                duration: 7 + i * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        animate={visibleSection ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            // @ts-expect-error ---
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/90 px-5 py-2.5 rounded-full text-red-600 font-medium mb-8 shadow-md border border-red-100"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05, filter: "brightness(1.1)" }}
          >
            <Users className="w-5 h-5" />
            {componentData?.sectionLabel}
          </motion.div>

          <motion.h2
            // @ts-expect-error ---
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight"
          >
            {componentData?.title.replace(componentData?.highlightedTitle, '')}
            <span className="text-red-600">{componentData?.highlightedTitle}</span>
          </motion.h2>

          <motion.div
            // @ts-expect-error ---
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-10"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, ease: [0.32, 0, 0.1, 1] }}
          />

          <motion.p
            // @ts-expect-error ---
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            {componentData?.description}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          {helpOptions.map((option: any) => {
            const color = getColorClasses(option.color);
            return (
              <motion.div
                key={option.title}
                // @ts-expect-error ---
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)" }}
                className={`relative bg-white rounded-2xl shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 min-h-[400px] flex flex-col justify-between ${color.hoverBg}`}
              >
                <div className="p-6 flex-grow">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 ${color.bg} rounded-2xl mb-6`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.1, filter: "brightness(1.2)" }}
                  >
                    <div className={color.icon}>
                      {option.icon === 'IndianRupee' && <IndianRupee className="w-8 h-8" />}
                      {option.icon === 'Gift' && <Gift className="w-8 h-8" />}
                      {option.icon === 'HandHeart' && <HandHeart className="w-8 h-8" />}
                      {option.icon === 'Gavel' && <Gavel className="w-8 h-8" />}
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className={`text-sm font-medium ${color.text} uppercase tracking-wide mb-4`}>
                    {option.subtitle}
                  </p>

                  <p className="text-gray-600 leading-relaxed mb-6 text-base flex-grow">{option.description}</p>

                  <div
                    className={`inline-flex items-center gap-2 ${color.bg} ${color.border} border px-4 py-2 rounded-full mb-6`}
                  >
                    {/*@ts-ignore */}
                    <motion.div
                      className={`w-2.5 h-2.5 ${color.icon.replace("text-", "bg-")} rounded-full`}
                      {...pulseAnimation}
                    />
                    <span className={`text-sm font-semibold ${color.text}`}>
                      {option.impact}
                    </span>
                  </div>
                </div>

                <motion.button
                  className={`w-full ${color.button} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md`}
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                >
                  {option.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>

                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${color.icon.replace("text-", "bg-")} transform scale-x-0 hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          // @ts-expect-error ---
          variants={itemVariants}
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
            <motion.h3
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {componentData?.ctaSection.title}
            </motion.h3>
            <motion.p
              className="text-lg sm:text-xl text-red-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {componentData?.ctaSection.description}
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {componentData?.ctaSection.buttons.map((button: any, index: number) => (
                <motion.button
                  key={index}
                  className={`font-semibold px-8 py-3 rounded-xl ${button.style} transition-colors duration-300`}
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                >
                  {button.text}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
