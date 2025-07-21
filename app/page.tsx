
"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, Users, ArrowRight, Menu, X, ChevronLeft, ChevronRight, Globe, Shield, Lightbulb, CheckCircle, HelpCircle, DollarSign, MessageCircle, Edit, Phone, Mail, MapPin, Copy, Share2 } from "lucide-react";
import { motion, useReducedMotion, useAnimationControls } from "framer-motion";
import EnhancedHeroSection from "@/components/Hero";
import ProfessionalSections from "@/components/About";
import ProfessionalHelpSection from "@/components/Help";
import AnnouncementsPreview from "@/components/Announcements";
import CurrentFundraiser from "@/components/CurrentFundRaising";
import HHOFooter from "@/components/Footer";
import StoriesOfImpact from "@/components/StoriesOfImpact";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [isDonatePopupOpen, setIsDonatePopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(1000);
  const [messageIndex, setMessageIndex] = useState(0);
  const [donorName, setDonorName] = useState(""); // New state for donor name
  const [donorEmail, setDonorEmail] = useState(""); // New state for donor email
  const [isRecurring, setIsRecurring] = useState(false); // New state for recurring donation
  const aboutRef = useRef(null);
  const initiativesRef = useRef(null);
  const eventsRef = useRef(null);
  const impactRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();

  const config = [
    {
      type: "contact",
      title: "Need Help?",
      icon: HelpCircle,
      details: [
        {
          icon: MapPin,
          label: "Address",
          content: ["Santhanutalapadu, 523225", "Andhra Pradesh, India"],
        },
        {
          icon: Phone,
          label: "Phone",
          content: ["+91 79819 37656"],
        },
        {
          icon: Mail,
          label: "Email",
          content: ["hho@rguktong.ac.in"],
          link: "mailto:hho@rguktong.ac.in",
        },
      ],
      supportOptions: [
        {
          icon: Edit,
          label: "Submit a Ticket",
          action: () => alert("Ticket form opened!"),
        },
        {
          icon: MessageCircle,
          label: "Live Chat",
          action: () => alert("Live chat initiated!"),
        },
      ],
    },
    {
      type: "donate",
      title: "Support Our Cause",
      icon: DollarSign,
      details: [
        {
          icon: null,
          label: "Motivational Messages",
          content: [
            "Your donation can change lives! Every contribution brings hope and support.",
            "Together, we can make a difference—donate today!",
            "Every small act of kindness creates a ripple of hope. Be the change!",
          ],
        },
        {
          icon: null,
          label: "Bank Transfer",
          content: [
            "Account Name: Helping Hands Organization",
            "Bank: State Bank of India",
            "Account Number: 1234567890",
            "IFSC Code: SBIN0001234",
            "Branch: Santhanutalapadu",
          ],
        },
        {
          icon: null,
          label: "UPI Payment",
          content: ["UPI ID: 7981937656@okbizaxis"],
          qr: "/upi-qr.png",
        },
        {
          icon: null,
          label: "Other Methods",
          content: [
            "PayPal: donate@hho.org",
            "Google Pay: +91 79819 37656",
          ],
        },
      ],
      donationStats: {
        totalDonations: 15000,
        goal: 50000,
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % config.find((c) => c.type === "donate").details.find((d) => d.label === "Motivational Messages").content.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsHelpPopupOpen(false);
        setIsDonatePopupOpen(false);
        setIsConfirmationOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const openDonatePopup = () => {
    setIsDonatePopupOpen(true);
  };
  const shareSupport = () => {
    const websiteUrl = window.location.href; // Get the current URL
    const shareText = `I just donated ₹${donationAmount} to Helping Hands Organization! Join me in supporting their cause: ${websiteUrl}`;
    
    // Optional: Check if a donation amount is set to avoid misleading share messages
    if (donationAmount < 100) {
      alert("Please enter a valid donation amount before sharing.");
      return;
    }
  
    if (navigator.share) {
      navigator.share({
        title: "Support Helping Hands Organization",
        text: shareText,
        url: websiteUrl,
      })
      .then(() => console.log("Content shared successfully"))
      .catch((error) => {
        console.error("Error sharing content:", error);
        alert("Failed to share. Please copy this link: " + shareText);
      });
    } else {
      // Fallback: Copy to clipboard instead of just showing an alert
      navigator.clipboard.writeText(shareText)
        .then(() => alert("Link copied to clipboard! Paste it to share."))
        .catch(() => alert("Failed to copy. Please manually copy: " + shareText));
    }
  };
  const validateDonation = () => {
    if (donationAmount < 100) {
      alert("Please enter an amount of at least ₹100.");
      return false;
    }
    if (!donorName.trim()) {
      alert("Please enter your name.");
      return false;
    }
    if (!donorEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.32, 0, 0.1, 1] },
    },
  };

  const pulseAnimation = shouldReduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] },
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
      };

  const bounceAnimation = {
    animate: { y: [0, -10, 0], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-red-50/30" aria-hidden="true" />
      {!shouldReduceMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-red-100/40"
              style={{ left: `${20 + (i * 15)}%`, top: `${20 + (i * 15)}%` }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}

      {/* Header (unchanged) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="HHO Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-red-600">HHO</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "About", ref: aboutRef },
              { name: "Initiatives", ref: initiativesRef },
              { name: "Events", ref: eventsRef },
              { name: "Impact", ref: impactRef },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsDonatePopupOpen(true); }}
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
            >
              Donate
            </a>
            <button
              onClick={() => setIsHelpPopupOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
            >
              Need Help
            </button>
          </nav>
          <button className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-red-600" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 py-4 space-y-3">
              {[
                { name: "About", ref: aboutRef },
                { name: "Initiatives", ref: initiativesRef },
                { name: "Events", ref: eventsRef },
                { name: "Impact", ref: impactRef },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-red-600 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setIsDonatePopupOpen(true); }}
                className="block w-full text-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
              >
                Donate
              </a>
              <button
                onClick={() => setIsHelpPopupOpen(true)}
                className="block w-full text-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
              >
                Need Help
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Help Popup (unchanged) */}
      {isHelpPopupOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-labelledby="help-popup-title"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e) => e.key === "Escape" && setIsHelpPopupOpen(false)}
        >
          <motion.div
            className="bg-white/95 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-xl border border-gray-100"
            style={{ backdropFilter: "blur(8px)" }}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent rounded-2xl" aria-hidden="true" />
            {!shouldReduceMotion && (
              <div className="absolute inset-0" aria-hidden="true">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-red-100/30"
                    style={{ left: `${20 + (i * 20)}%`, top: `${20 + (i * 20)}%` }}
                    animate={{
                      y: [-5, 5, -5],
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.7, 1.1, 0.7],
                    }}
                    transition={{
                      duration: 4 + i * 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
            <button
              onClick={() => setIsHelpPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors duration-200"
              aria-label="Close help popup"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"
              initial="hidden"
              animate={controls}
              variants={bounceAnimation}
              id="help-popup-title"
            >
              <HelpCircle className="w-7 h-7 text-red-600" />
              Need Help?
            </motion.h2>
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {config.find((c) => c.type === "contact").details.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  variants={itemVariants}
                >
                  {detail.icon && <detail.icon className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />}
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">{detail.label}</h5>
                    {detail.content.map((item, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail.link && idx === detail.content.length - 1 ? (
                          <a
                            href={detail.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700 transition-colors duration-200"
                          >
                            {item}
                          </a>
                        ) : (
                          <>
                            {item}
                            <button
                              onClick={() => copyToClipboard(item)}
                              className="ml-2 text-gray-400 hover:text-red-600"
                              aria-label={`Copy ${detail.label}`}
                            >
                              <Copy className="w-4 h-4 inline" />
                            </button>
                          </>
                        )}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
             
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Donate Popup */}
      {isDonatePopupOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-labelledby="donate-popup-title"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e) => e.key === "Escape" && setIsDonatePopupOpen(false)}
        >
          <motion.div
            className="bg-white/90 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl border border-gray-200"
            style={{ backdropFilter: "blur(10px)" }}
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 to-transparent rounded-3xl" aria-hidden="true" />
            {!shouldReduceMotion && (
              <div className="absolute inset-0" aria-hidden="true">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-red-200/40"
                    style={{ left: `${15 + (i * 25)}%`, top: `${15 + (i * 25)}%` }}
                    animate={{
                      y: [-8, 8, -8],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 5 + i * 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            )}
            <button
              onClick={() => setIsDonatePopupOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors duration-200"
              aria-label="Close donate popup"
            >
              <X className="w-6 h-6" />
            </button>
  
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                key={messageIndex}
                className="text-gray-700 text-lg font-medium text-center bg-red-100/50 p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {config.find((c) => c.type === "donate").details.find((d) => d.label === "Motivational Messages").content[messageIndex]}
              </motion.p>
    
              <motion.div className="bg-red-50 p-6 rounded-xl" variants={itemVariants}>
                <h3 className="text-xl font-semibold text-red-600 mb-4">Payment Methods</h3>
                <div className="grid grid-cols-1 gap-4">
                  {config.find((c) => c.type === "donate").details
                    .filter((d) => d.label !== "Motivational Messages")
                    .map((detail, index) => (
                      <motion.div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                      >
                        <h4 className="font-medium text-gray-900 mb-2">{detail.label}</h4>
                        {detail.content.map((item, idx) => (
                          <p key={idx} className="text-gray-600 text-sm flex items-center gap-2">
                            {item}
                            <button
                              onClick={() => copyToClipboard(item)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                              aria-label={`Copy ${detail.label}`}
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </p>
                        ))}
                        {detail.qr && (
                          <div className="flex justify-center mt-3">
                            <img src={detail.qr} alt="UPI QR Code" className="w-40 h-40 rounded-lg shadow-sm" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                </div>
         
              </motion.div>
              <motion.div className="space-y-4" variants={itemVariants}>
            
                <motion.button
                  onClick={shareSupport}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share your support"
                >
                  <Share2 className="w-5 h-5" />
                  Share Your Support
                </motion.button>
              </motion.div>
              <motion.div className="text-center text-sm text-gray-600" variants={itemVariants}>
                <p>
                  Your donation of ₹{donationAmount} {isRecurring ? "monthly" : ""} will help us {donationAmount >= 5000 ? "transform communities" : donationAmount >= 1000 ? "make a big impact" : "support our cause"}. Thank you, {donorName || "Friend"}!
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Confirmation Modal (unchanged) */}
      {isConfirmationOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-labelledby="confirmation-title"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e) => e.key === "Escape" && setIsConfirmationOpen(false)}
        >
          <motion.div
            className="bg-white/95 rounded-2xl p-6 sm:p-8 max-w-md w-full relative shadow-xl border border-gray-100"
            style={{ backdropFilter: "blur(8px)" }}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <button
              onClick={() => setIsConfirmationOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors duration-200"
              aria-label="Close confirmation modal"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold text-gray-900 mb-4"
                id="confirmation-title"
                variants={itemVariants}
              >
                Thank You for Your Donation!
              </motion.h2>
              <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
                Your contribution of ₹{donationAmount} will make a significant impact. We’ll send you a confirmation email soon.
              </motion.p>
              <motion.button
                onClick={() => setIsConfirmationOpen(false)}
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <EnhancedHeroSection openDonatePopup={openDonatePopup} />
      <section ref={aboutRef} className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProfessionalSections />
        </motion.div>
      </section>

      <motion.section
        className="relative z-10 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnnouncementsPreview />
        </div>
      </motion.section>

      <section ref={initiativesRef} className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProfessionalHelpSection />
        </motion.div>
      </section>

      <section ref={impactRef} className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <StoriesOfImpact />
        </motion.div>
      </section>

      <section ref={eventsRef} className="relative z-10 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <CurrentFundraiser />
        </motion.div>
      </section>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <HHOFooter />
      </motion.div>
    </div>
  );
}