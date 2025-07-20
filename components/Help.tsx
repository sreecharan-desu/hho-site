import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Heart, Gift, HandHeart, Gavel, ArrowRight, Users, IndianRupee } from "lucide-react";

export default function ProfessionalHelpSection() {
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
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const helpOptions = [
    {
      icon: <IndianRupee className="w-8 h-8" />,
      title: '₹1 Weekly',
      subtitle: 'Micro Donation',
      desc: 'Contribute just ₹1 every week to create sustainable impact. Small amounts, when pooled together, fund emergency medical assistance.',
      color: 'emerald',
      impact: '₹52/year per person',
      cta: 'Set Up Weekly Giving'
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: '₹100 Birthday',
      subtitle: 'Celebration Giving',
      desc: 'Transform your special day into an opportunity to help others. Contribute ₹100 on your birthday to support education initiatives.',
      color: 'blue',
      impact: 'Funds 2 students\' resources',
      cta: 'Plan Birthday Gift'
    },
    {
      icon: <HandHeart className="w-8 h-8" />,
      title: 'Volunteer',
      subtitle: 'Time & Skills',
      desc: 'Share your expertise and time to mentor students, organize events, or support our administrative operations.',
      color: 'purple',
      impact: '4+ hours/month impact',
      cta: 'Join Our Team'
    },
    {
      icon: <Gavel className="w-8 h-8" />,
      title: 'Kindness Auction',
      subtitle: 'Community Event',
      desc: 'Participate in our unique auction where acts of kindness, services, and handmade items are bid upon to raise funds.',
      color: 'orange',
      impact: 'Quarterly fundraiser',
      cta: 'View Auction Items'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: 'bg-emerald-50',
        icon: 'text-emerald-600',
        border: 'border-emerald-200',
        text: 'text-emerald-600',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      },
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        border: 'border-blue-200',
        text: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        border: 'border-purple-200',
        text: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        border: 'border-orange-200',
        text: 'text-orange-600',
        button: 'bg-orange-600 hover:bg-orange-700'
      }
    };
    return colors[color];
  };

  return (
    <section ref={sectionRef} id="help" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={visibleSection ? "visible" : "hidden"}
      >
        <div className="text-center mb-16">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-red-600 font-medium mb-6 shadow-sm border border-red-100"
          >
            <Users className="w-4 h-4" />
            Get Involved
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            How You Can <span className="text-red-600">Help</span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mb-8"
          ></motion.div>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Choose the way that works best for you. Every contribution, no matter the size, 
            creates meaningful change in our community.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {helpOptions.map((option) => {
            const colorClasses = getColorClasses(option.color);
            
            return (
              <motion.div
                key={option.title}
                variants={itemVariants}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colorClasses.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={colorClasses.icon}>
                      {option.icon}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {option.title}
                    </h3>
                    <p className={`text-sm font-medium ${colorClasses.text} uppercase tracking-wide`}>
                      {option.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                    {option.desc}
                  </p>

                  <div className={`inline-flex items-center gap-2 ${colorClasses.bg} ${colorClasses.border} border px-4 py-2 rounded-full mb-6`}>
                    <div className={`w-2 h-2 ${colorClasses.icon.replace('text-', 'bg-')} rounded-full`}></div>
                    <span className={`text-sm font-semibold ${colorClasses.text}`}>
                      {option.impact}
                    </span>
                  </div>

                  <motion.button
                    className={`w-full ${colorClasses.button} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClasses.icon.replace('text-', 'bg-')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-red-100 mb-8 text-lg max-w-2xl mx-auto">
              Join hundreds of supporters who are already creating positive change. 
              Start with any option above or contact us to explore custom ways to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-white text-red-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
              <motion.button
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-white hover:text-red-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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