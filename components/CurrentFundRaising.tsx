import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Target, Users, Calendar, TrendingUp, IndianRupee, ArrowRight } from "lucide-react";

export default function CurrentFundraiser() {
  const [visibleSection, setVisibleSection] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const sectionRef = useRef(null);

  const targetAmount = 340000;
  const currentAmount = 204000;
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
      transition: { staggerChildren: 0.15, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progressPercentage}%`,
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  const stats = [
    { icon: <Users className="w-6 h-6" />, title: "Contributors", value: "150+", color: "emerald" },
    { icon: <Calendar className="w-6 h-6" />, title: "Days Left", value: "28", color: "blue" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Progress", value: `${progressPercentage.toFixed(0)}%`, color: "purple" }
  ];

  const getColorClasses = (color) => ({
    emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
    blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
    purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" }
  })[color];

  return (
    <section ref={sectionRef} id="fundraiser" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate={visibleSection ? "visible" : "hidden"}>
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-red-600 font-medium mb-4 border border-red-100">
            <Target className="w-4 h-4" />
            Active Campaign
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Fundraiser: <span className="text-red-600">Aavirbhav 2025</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Support Aavirbhav 2025 to create unforgettable memories for RGUKT Ongole students.
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-gray-100" whileHover={{ y: -4 }}>
          {/* Progress */}
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

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => {
              const { bg, text, border } = getColorClasses(stat.color);
              return (
                <motion.div key={stat.title} variants={itemVariants} className={`p-4 rounded-lg border ${border}`}>
                  <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                    <div className={text}>{stat.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
                  <p className={`text-sm ${text}`}>{stat.title}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IndianRupee className="w-4 h-4" />
              Donate
            </motion.button>
            <motion.button
              className="border border-red-600 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              All Fundraisers
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Impact Message */}
        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="bg-red-600 text-white rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Every Contribution Counts!</h3>
            <p className="text-sm max-w-xl mx-auto">
              Your support ensures Aavirbhav 2025 creates lasting memories for our RGUKT Ongole community.
            </p>
            <div className="flex gap-3 justify-center mt-4">
              <motion.button
                className="bg-white text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact
              </motion.button>
              <motion.button
                className="border border-white text-white font-medium px-4 py-2 rounded-lg hover:bg-white hover:text-red-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}