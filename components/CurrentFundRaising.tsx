// @ts-nocheck

"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Target,
  Users,
  Calendar,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

export default function CurrentFundraiser() {
  const [visibleSection, setVisibleSection] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [animatedAmount, setAnimatedAmount] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Static fundraiser data
  const fundraiserData = {
    sectionLabel: "Weekly Donation Challenge",
    title: "Support Our Weekly One Rupee Challenge",
    highlightedTitle: "One Rupee Challenge",
    description: "Join us in making a difference! Donate 1 rupee this week or 100 rupees to celebrate your friend's birthday. Every contribution helps our community initiatives.",
    targetAmount: 10000, // ₹10,000 target
    currentAmount: 7500,  // ₹7,500 raised
    stats: [
      { icon: Users, value: "500+", label: "Donors", color: "emerald" },
      { icon: Calendar, value: "4", label: "Weeks Running", color: "blue" },
      { icon: TrendingUp, value: "2000+", label: "Lives Impacted", color: "purple" },
    ],
  };

  const { targetAmount, currentAmount } = fundraiserData;
  const progressPercentage = (currentAmount / targetAmount) * 100;

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

  useEffect(() => {
    if (visibleSection) {
      const duration = 2000;
      const increment = currentAmount / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= currentAmount) {
          current = currentAmount;
          clearInterval(timer);
        }
        setAnimatedAmount(Math.floor(current));
      }, 16);

      return () => clearInterval(timer);
    }
  }, [visibleSection, currentAmount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progressPercentage}%`,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const formatAmount = (amount: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const getColorClasses = (color: string) => {
    const map = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
    };
    return map[color as keyof typeof map] || map.emerald;
  };

  return (
    <section ref={sectionRef} id="fundraiser" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate={visibleSection ? "visible" : "hidden"}>
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-red-600 font-medium mb-4 border border-red-100">
            <Target className="w-4 h-4" />
            {fundraiserData.sectionLabel}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {fundraiserData.title.replace(fundraiserData.highlightedTitle, '')}
            <span className="text-red-600">{fundraiserData.highlightedTitle}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            {fundraiserData.description}
          </p>
        </motion.div>

        {/* <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-gray-100" whileHover={{ y: -4 }}>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">Progress</h3>
              <div>
                <div className="text-xl font-semibold text-gray-900">{formatAmount(animatedAmount)}</div>
                <p className="text-sm text-red-600">of {formatAmount(targetAmount)}</p>
              </div>
            </div>
            <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
              <motion.div
                className="bg-red-600 h-full rounded-full"
                variants={progressVariants}
                initial="hidden"
                animate={visibleSection ? "visible" : "hidden"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fundraiserData.stats.map((stat: any, index: number) => {
              const { bg, text, border } = getColorClasses(stat.color);
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`p-4 rounded-lg ${bg} ${border} flex items-center gap-3`}
                >
                  <Icon className={`w-6 h-6 ${text}`} />
                  <div>
                    <div className={`text-lg font-semibold ${text}`}>{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
