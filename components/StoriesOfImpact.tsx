
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { apiData } from "@/lib/api";

type Testimonial = {
  name: string;
  avatar: string;
  content: string;
  handle?: string;
  role?: string;
  avatarBg?: string;
};

const StoriesOfImpact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Extract data for this component
  const componentData:any = apiData.find(c => c.component === "StoriesOfImpact")?.data;
  const testimonials: Testimonial[][] = componentData?.testimonials || [];

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
    <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden">
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
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            // @ts-expect-error ---
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight"
          >
            {componentData?.title.replace(componentData?.highlightedTitle, '')}
            <span className="text-red-600">{componentData?.highlightedTitle}</span>
          </motion.h2>

          <motion.p
            // @ts-expect-error ---
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {componentData?.description}
          </motion.p>

          <motion.button
            // @ts-expect-error ---
            variants={itemVariants}
            className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md"
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
          >
            {componentData?.ctaButton}
          </motion.button>

          <motion.div
            // @ts-expect-error ---
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-10"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, ease: [0.32, 0, 0.1, 1] }}
          />
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              {column.map((testimonial, index) => (
                <motion.div
                  key={index}
                  // @ts-expect-error ---
                  variants={itemVariants}
                  whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)" }}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg min-h-[250px] flex flex-col justify-between"
                >
                  <div className="flex items-start mb-6">
                    {testimonial.avatar.startsWith("http") ? (
                      // @ts-expect-error ---
                      <motion.img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 flex-shrink-0"
                        {...pulseAnimation}
                      />
                    ) : (
                      // @ts-expect-error ---
                      <motion.div
                        className={`w-12 h-12 rounded-full ${testimonial.avatarBg || "bg-gray-700"} flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0`}
                        {...pulseAnimation}
                      >
                        {testimonial.avatar}
                      </motion.div>
                    )}
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-semibold text-gray-900 text-base">{testimonial.name}</h4>
                      {testimonial.handle && (
                        <p className="text-gray-500 text-xs">{testimonial.handle}</p>
                      )}
                      {testimonial.role && (
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed flex-grow">
                    {testimonial.content.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className={pIndex > 0 ? "mt-3" : ""}>
                        {paragraph.split("@").map((part, partIndex) => {
                          if (partIndex === 0) return part;
                          const [mention, ...rest] = part.split(" ");
                          return (
                            <span key={partIndex}>
                              <span className="text-red-600 font-medium">@{mention}</span>
                              {rest.length > 0 && ` ${rest.join(" ")}`}
                            </span>
                          );
                        })}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StoriesOfImpact;
