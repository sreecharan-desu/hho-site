
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Target,
  Users,
  Calendar,
  TrendingUp,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import { apiData } from "@/lib/api";

export default function CurrentFundraiser() {
  const [visibleSection, setVisibleSection] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [animatedAmount, setAnimatedAmount] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Extract data for this component
  const componentData:any = apiData.find(c => c.component === "CurrentFundraiser")?.data;
  const targetAmount = componentData?.targetAmount || 0;
  const currentAmount = componentData?.currentAmount || 0;
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

  const progressVariants: any = {
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

  const stats = componentData?.stats || [];

  const getColorClasses = (color: string) => {
    const map = {
      emerald: { bg: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200" },
      blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
      purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-200" },
    };
    return map[color as keyof typeof map];
  };

  return (
    <section ref={sectionRef} id="fundraiser" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div className="max-w-7xl mx-auto" variants={containerVariants} initial="hidden" animate={visibleSection ? "visible" : "hidden"}>
        {/* @ts-expect-error --- */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-red-600 font-medium mb-4 border border-red-100">
            <Target className="w-4 h-4" />
            {componentData?.sectionLabel}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {componentData?.title.replace(componentData?.highlightedTitle, '')}
            <span className="text-red-600">{componentData?.highlightedTitle}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            {componentData?.description}
          </p>
        </motion.div>
        {/* @ts-expect-error --- */}

        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 border border-gray-100" whileHover={{ y: -4 }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {stats.map((stat: any) => {
              const { bg, text, border } = getColorClasses(stat.color);
              return (
                // @ts-expect-error ---
                <motion.div key={stat.title} variants={itemVariants} className={`p-4 rounded-lg border ${border}`}>
                  <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                    <div className={text}>
                      {stat.icon === 'Users' && <Users className="w-6 h-6" />}
                      {stat.icon === 'Calendar' && <Calendar className="w-6 h-6" />}
                      {stat.icon === 'TrendingUp' && <TrendingUp className="w-6 h-6" />}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{stat.value}</h3>
                  <p className={`text-sm ${text}`}>{stat.title}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {componentData?.buttons.map((button: any, index: number) => (
              <motion.button
                key={index}
                className={button.text === 'Donate' ? "bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 flex items-center gap-2" : "border border-red-600 text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white flex items-center gap-2"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {button.icon === 'IndianRupee' && <IndianRupee className="w-4 h-4" />}
                {button.icon === 'ArrowRight' && <ArrowRight className="w-4 h-4" />}
                {button.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
        {/* @ts-expect-error --- */}

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <div className="bg-red-600 text-white rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">{componentData?.ctaSection.title}</h3>
            <p className="text-sm max-w-xl mx-auto">{componentData?.ctaSection.description}</p>
            <div className="flex gap-3 justify-center mt-4">
              {componentData?.ctaSection.buttons.map((button: any, index: number) => (
                <motion.button
                  key={index}
                  className={`font-medium px-4 py-2 rounded-lg ${button.style} hover:bg-gray-100 transition-colors duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
