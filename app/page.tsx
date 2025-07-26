// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart,
  Users,
  ArrowRight,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Shield,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  DollarSign,
  MessageCircle,
  Edit,
  Phone,
  Mail,
  MapPin,
  Copy,
  Share2,
} from "lucide-react";
import { motion, useReducedMotion, useAnimationControls } from "framer-motion";
import EnhancedHeroSection from "@/components/Hero";
import ProfessionalSections from "@/components/About";
import ProfessionalHelpSection from "@/components/Help";
import AnnouncementsPreview from "@/components/Announcements";
import CurrentFundraiser from "@/components/CurrentFundRaising";
import HHOFooter from "@/components/Footer";
import StoriesOfImpact from "@/components/StoriesOfImpact";
import { apiData } from "@/lib/api";
import DriveGallery from "@/components/ImagesGallery";

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    Heart,
    Users,
    ArrowRight,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Globe,
    Shield,
    Lightbulb,
    CheckCircle,
    HelpCircle,
    DollarSign,
    MessageCircle,
    Edit,
    Phone,
    Mail,
    MapPin,
    Copy,
    Share2,
  };
  return iconMap[iconName] || HelpCircle;
};

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
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [siteData, setSiteData] = useState(apiData); // Fallback to static data
  const [isLoading, setIsLoading] = useState(false);
  const aboutRef = useRef(null);
  const initiativesRef = useRef(null);
  const eventsRef = useRef(null);
  const impactRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimationControls();

  // Fetch data from API after predefined data is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchSiteData = async () => {
        try {
          const response = await fetch('https://api.hhoadmin.sreecharandesu.in');
          if (response.ok) {
            const data = await response.json();
            // Validate that the data contains required fields
            if (
              data &&
              data.hero &&
              data.about &&
              data.announcements &&
              data.help &&
              data.campaigns &&
              data.impact &&
              data.gallery &&
              data.homepage
            ) {
              // Transform the data to match the expected format
              const transformedData = [
                { component: "EnhancedHeroSection", data: data.hero },
                { component: "ProfessionalSections", data: data.about },
                { component: "AnnouncementsPreview", data: data.announcements },
                { component: "ProfessionalHelpSection", data: data.help },
                { component: "CurrentFundraiser", data: data.campaigns },
                { component: "StoriesOfImpact", data: data.impact },
                { component: "DriveGallery", data: data.gallery },
                { component: "HomePage", data: data.homepage },
              ];
              setSiteData(transformedData);
              setIsLoading(false); // Only set to false if valid data is received
            }
          }
        } catch (error) {
          console.error('Error fetching site data:', error);
          // Do not set isLoading to false; keep using apiData
        }
      };
      fetchSiteData();
    }, 100); // Small delay to ensure initial render with apiData

    return () => clearTimeout(timer);
  }, []);

  // Extract data for this component
  const componentData: any = siteData.find((c) => c.component === "HomePage")?.data;
  const config = {
    header: componentData?.header,
    helpPopup: componentData?.helpPopup,
    donatePopup: componentData?.donatePopup,
    confirmationModal: componentData?.confirmationModal,
  };

  // Get icon components
  const HelpIcon = getIconComponent(config.helpPopup?.icon || "HelpCircle");
  const DonateIcon = getIconComponent(config.donatePopup?.icon || "DollarSign");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % (config.donatePopup?.motivationalMessages?.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [config.donatePopup]);

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
    const websiteUrl = window.location.href;
    const shareText = `I just donated ₹${donationAmount} to Helping Hands Organization! Join me in supporting their cause: ${websiteUrl}`;
    if (donationAmount < 100) {
      alert("Please enter a valid donation amount before sharing.");
      return;
    }
    if (navigator.share) {
      navigator
        .share({
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
      navigator.clipboard
        .writeText(shareText)
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
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const pulseAnimation = shouldReduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] },
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
      };

  const bounceAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt={config.header?.logoAlt} className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-red-600">{config.header?.brand}</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {config.header?.navItems.map((item: any) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(eval(item.ref))}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            {config.header?.buttons.map((button: any, index: number) => (
              <motion.a
                key={index}
                href={`mailto:hho@rguktong.ac.in?subject=Inquiry%20about%20${encodeURIComponent(button.text || 'Support')}&body=${encodeURIComponent(`I am reaching out regarding ${button.text || 'Support'}. Please provide more information.`)}`}
                className={`px-${button.text === "Donate" ? 6 : 4} py-2 ${button.style} rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer`}
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
              >
                {button.text}
              </motion.a>
            ))}
          </nav>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-red-600" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 py-4 space-y-3">
              {config.header?.navItems.map((item: any) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(eval(item.ref));
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-red-600 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              {config.header?.buttons.map((button: any, index: number) => (
                <motion.a
                  key={index}
                  href={`mailto:hho@rguktong.ac.in?subject=Inquiry%20about%20${encodeURIComponent(button.text || 'Support')}&body=${encodeURIComponent(`I am reaching out regarding ${button.text || 'Support'}. Please provide more information.`)}`}
                  className="block w-full text-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {button.text}
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Help Popup */}
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
              <HelpIcon className="w-7 h-7 text-red-600" />
              {config.helpPopup?.title}
            </motion.h2>
            <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
              {config.helpPopup?.details.map((detail: any, index: number) => {
                const DetailIcon = getIconComponent(detail.icon || "HelpCircle");
                return (
                  <motion.div key={index} className="flex items-start gap-3" variants={itemVariants}>
                    {detail.icon && <DetailIcon className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />}
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm mb-1">{detail.label}</h5>
                      {detail.content.map((item: string, idx: number) => (
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
                );
              })}
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
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3"
              initial="hidden"
              animate={controls}
              variants={bounceAnimation}
              id="donate-popup-title"
            >
              <DonateIcon className="w-7 h-7 text-red-600" />
              {config.donatePopup?.title}
            </motion.h2>
            <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
              <motion.p
                key={messageIndex}
                className="text-gray-700 text-lg font-medium text-center bg-red-100/50 p-4 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {config.donatePopup?.motivationalMessages[messageIndex]}
              </motion.p>
              <motion.div className="bg-red-50 p-6 rounded-xl" variants={itemVariants}>
                <h3 className="text-xl font-semibold text-red-600 mb-4">Payment Methods</h3>
                <div className="grid grid-cols-1 gap-4">
                  {config.donatePopup?.paymentMethods.map((detail: any, index: number) => (
                    <motion.div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                    >
                      <h4 className="font-medium text-gray-900 mb-2">{detail.label}</h4>
                      {detail.content.map((item: string, idx: number) => (
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
              <motion.div className="text-center text-sm text-gray-600" variants={itemVariants}>
                <p>
                  {config.donatePopup?.donationMessageTemplate
                    .replace("{amount}", donationAmount.toString())
                    .replace("{recurring}", isRecurring ? "monthly" : "")
                    .replace(
                      "{impact}",
                      donationAmount >= 5000
                        ? config.donatePopup?.impactMessages["5000+"]
                        : donationAmount >= 1000
                        ? config.donatePopup?.impactMessages["1000-4999"]
                        : config.donatePopup?.impactMessages.default
                    )
                    .replace("{donorName}", donorName || "Friend")}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Confirmation Modal */}
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
            <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              </motion.div>
              <motion.h2 className="text-2xl font-bold text-gray-900 mb-4" id="confirmation-title" variants={itemVariants}>
                {config.confirmationModal?.title}
              </motion.h2>
              <motion.p className="text-gray-600 mb-6" variants={itemVariants}>
                {config.confirmationModal?.message.replace("{amount}", donationAmount.toString())}
              </motion.p>
              <motion.a
                href={`mailto:hho@rguktong.ac.in?subject=Donation%20Confirmation&body=${encodeURIComponent(`I have donated ₹${donationAmount}. ${config.confirmationModal?.message.replace("{amount}", donationAmount.toString()) || 'Thank you for processing my donation.'}`)}`}
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
                onClick={() => setIsConfirmationOpen(false)}
              >
                {config.confirmationModal?.button}
              </motion.a>
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
      <motion.section className="relative z-10 bg-gray-50" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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
      <section ref={initiativesRef} className="relative z-10">
        <motion.div
          className="w-full px-0 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <DriveGallery />
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
      <motion.div className="relative z-10" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <HHOFooter />
      </motion.div>
    </div>
  );
}