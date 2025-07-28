
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
  const [isCopied, setIsCopied] = useState(false);
  const [siteData, setSiteData] = useState(apiData); // Fallback to static data
  const [isLoading, setIsLoading] = useState(false);
  const [isUrgent, setIsUrgent] = useState(
    // apiData.find((c) => c.component === "AnnouncementsPreview")?.data.announcements.some((a) => a.priority === "high") || false
    false
  ); // Derive urgency from high-priority announcements
  const aboutRef = useRef(null);
  const initiativesRef = useRef(null);
  const eventsRef = useRef(null);
  const impactRef = useRef(null);
  const announcementsRef = useRef(null); // Ref for Announcements section
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
              setIsLoading(false);
              // Update isUrgent based on fetched announcements
              setIsUrgent(
                transformedData.find((c) => c.component === "AnnouncementsPreview")?.data.announcements.some((a) => a.priority === "high") || false
              );
            }
          }
        } catch (error) {
          console.error('Error fetching site data:', error);
        }
      };
      fetchSiteData();
    }, 100);

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
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
      alert("Failed to copy. Please copy manually: " + text);
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

      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
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
              button.text === "Donate" ? (
                <motion.button
                  key={index}
                  onClick={openDonatePopup}
                  className={`px-${button.text === "Donate" ? 6 : 4} py-2 ${button.style} rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer`}
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                >
                  {button.text}
                </motion.button>
              ) : (
                <motion.a
                  key={index}
                  href={`mailto:hho@rguktong.ac.in?subject=Inquiry%20about%20${encodeURIComponent(button.text || 'Support')}&body=${encodeURIComponent(`I am reaching out regarding ${button.text || 'Support'}. Please provide more information.`)}`}
                  className={`px-${button.text === "Donate" ? 6 : 4} py-2 ${button.style} rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer`}
                  whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                >
                  {button.text}
                </motion.a>
              )
            ))}
          </nav>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-red-600 cursor-pointer" /> : <Menu className="w-6 h-6 text-red-600 cursor-pointer" />}
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
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200 cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
              {config.header?.buttons.map((button: any, index: number) => (
                button.text === "Donate" ? (
                  <motion.button
                    key={index}
                    onClick={() => {
                      openDonatePopup();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                  >
                    {button.text}
                  </motion.button>
                ) : (
                  <motion.a
                    key={index}
                    href={`mailto:hho@rguktong.ac.in?subject=Inquiry%20about%20${encodeURIComponent(button.text || 'Support')}&body=${encodeURIComponent(`I am reaching out regarding ${button.text || 'Support'}. Please provide more information.`)} `}
                    className="block w-full text-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {button.text}
                  </motion.a>
                )
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Urgent Help Banner */}
      {isUrgent && siteData.some((c) => c.component === "UrgentHelpAlert") && (
        <motion.div
          className="fixed top-46 left-0 right-0 z-50 bg-red-600 text-white py-3 px-4 sm:px-6 shadow-lg cursor-pointer"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          {...(!shouldReduceMotion && {
            animate: { scale: [1, 1.02, 1], opacity: [1, 0.95, 1] },
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
          })}
          onClick={() => scrollToSection(announcementsRef)}
          role="alert"
          aria-label="Urgent help required banner"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                className="flex-shrink-0"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <HelpCircle className="w-6 h-6 text-white" />
              </motion.div>
              <p className="text-sm sm:text-base font-semibold">
                Immediate Help Required: Support a student in need!{" "}
                <span className="underline hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                  View Announcements
                </span>
              </p>
            </div>
            <motion.button
              className="bg-white text-red-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection(announcementsRef);
              }}
              aria-label="View urgent announcements"
            >
              Act Now
            </motion.button>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-red-700/20 to-orange-300/20"
            aria-hidden="true"
          />
        </motion.div>
      )}

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
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
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
                              className="text-red-600 hover:text-red-700 transition-colors duration-200 cursor-pointer"
                            >
                              {item}
                            </a>
                          ) : (
                            <>
                              {item}
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
          className="fixed inset-0 bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-xl flex items-center justify-center z-50 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-labelledby="donate-popup-title"
          role="dialog"
          tabIndex={-1}
          onKeyDown={(e) => e.key === "Escape" && setIsDonatePopupOpen(false)}
        >
          <motion.div
            className="bg-white/95 rounded-3xl p-6 max-w-5xl w-full relative shadow-2xl border border-gray-100/20 overflow-hidden"
            style={{ backdropFilter: "blur(12px)" }}
            initial={{ y: 150, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 150, opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-red-300/50 via-pink-200/40 to-orange-300/50"
              aria-hidden="true"
            />
            {isCopied && (
              <motion.div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500/90 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => setIsCopied(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied to clipboard!
              </motion.div>
            )}
            <button
              onClick={() => setIsDonatePopupOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 rounded-full p-1.5 bg-white/80 shadow-md cursor-pointer"
              aria-label="Close donate popup"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <motion.div
                className="w-full md:w-1/3 flex flex-col items-center justify-center space-y-6 p-6 bg-white/30 rounded-2xl shadow-inner"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                  className="cursor-pointer"
                >
                  <svg
                    className="w-20 h-20 text-red-700 drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <p className="text-xs font-semibold text-gray-800 mt-2 drop-shadow-sm">Transform Lives</p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                  className="cursor-pointer"
                >
                  <svg
                    className="w-20 h-20 text-orange-700 drop-shadow-md"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                    />
                  </svg>
                  <p className="text-xs font-semibold text-gray-800 mt-2 drop-shadow-sm">Spread Hope</p>
                </motion.div>
              </motion.div>
              <motion.div
                className="w-full md:w-2/3 space-y-6 p-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  className="text-2xl font-extrabold text-gray-900 flex items-center gap-2 drop-shadow-md"
                  variants={itemVariants}
                  id="donate-popup-title"
                >
                  {config.donatePopup?.title}
                  <motion.span
                    className="inline-block"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </motion.span>
                </motion.h2>
                <motion.p
                  key={messageIndex}
                  className="text-gray-800 text-base font-medium text-center bg-gradient-to-r from-red-200/80 to-orange-200/80 p-4 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {config.donatePopup?.motivationalMessages[messageIndex]}
                </motion.p>
                <motion.div className="bg-white/90 p-4 rounded-xl shadow-md" variants={itemVariants}>
                  <h3 className="text-base font-semibold text-red-700 mb-3">Payment Methods</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {config.donatePopup?.paymentMethods.map((detail: any, index: number) => (
                      <motion.div
                        key={index}
                        className="bg-white p-3 rounded-lg border border-gray-100/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                        variants={itemVariants}
                        whileHover={{ y: -5, boxShadow: "0 6px 24px rgba(239, 68, 68, 0.25)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(detail.content.join("\n"))}
                      >
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{detail.label}</h4>
                        {detail.content.map((item: string, idx: number) => (
                          <p key={idx} className="text-gray-600 text-xs flex items-center gap-2">
                            {item}
                          </p>
                        ))}
                        {detail.qr && (
                          <motion.div
                            className="flex justify-center mt-3 cursor-pointer"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={detail.qr}
                              alt="UPI QR Code"
                              className="w-32 h-32 rounded-lg shadow-md border border-gray-100/20 brightness-125"
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                <motion.div className="text-center text-xs text-gray-700" variants={itemVariants}>
                  <p className="bg-gray-50/95 p-3 rounded-lg shadow-sm drop-shadow-sm">
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
            </div>
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
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
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
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-all duration-200 cursor-pointer"
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
      <section ref={announcementsRef} className="relative z-10 bg-gray-50">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <AnnouncementsPreview />
        </motion.div>
      </section>
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
