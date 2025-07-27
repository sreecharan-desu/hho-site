// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Globe,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  Calendar,
  Award,
  Linkedin,
  Facebook,
  Twitter,
  Instagram
} from "lucide-react";
import { motion } from "framer-motion";

// Obfuscated name computation
const sr3x0r = (function () {
  const chars = ['S','r','e','e','C','h','a','r','a','n',' ','D','e','s','u'];
  return () => chars.join('');
})();

// Hash function for tamper protection
const computeHash = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
};

export default function HHOFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Tamper protection
  useEffect(() => {
    const expectedName = sr3x0r();
    const expectedHash = 1214823905;
    if (computeHash(expectedName) !== expectedHash) {
      throw new Error('Critical: Unauthorized modification detected.');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://linkedin.com/in/helping-hands-organization-rgukt-ongole-02826b178",
      color: "hover:text-blue-400"
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: "https://facebook.com/iiit.ongole.hho",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      href: "https://instagram.com/helping_hands_rgukt.ongole",
      color: "hover:text-pink-400"
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/hhoiiitong",
      color: "hover:text-blue-400"
    }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5 text-red-400" />,
      title: "Address",
      details: ["Santhanutalapadu, 523225", "Andhra Pradesh, India"]
    },
    {
      icon: <Phone className="w-5 h-5 text-red-400" />,
      title: "Phone",
      details: ["+91 79819 37656"]
    },
    {
      icon: <Mail className="w-5 h-5 text-red-400" />,
      title: "Email",
      details: ["hho@rguktong.ac.in"]
    }
  ];

  const achievements = [
    { icon: <Users className="w-4 h-4" />, text: "500+ Students Helped" },
    { icon: <Heart className="w-4 h-4" />, text: "₹10L+ Funds Raised" },
    { icon: <Award className="w-4 h-4" />, text: "5+ Years of Service" },
    { icon: <Calendar className="w-4 h-4" />, text: "50+ Events Organized" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden font-sans">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_2px,transparent_0)] bg-[length:50px_50px]"
        animate={{ backgroundPosition: ["0 0", "50px 50px"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />
      <div className="relative z-10 py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">HHO</h3>
                <p className="text-sm text-red-400">Helping Hands Organization</p>
              </div>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Empowering students and building communities at RGUKT Ongole. We believe in the power of collective support and sustainable change through education, emergency aid, and skill development.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700/50 cursor-pointer"
                  whileHover={{ y: -3, boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
                    <div className="text-red-400">{ach.icon}</div>
                  </motion.div>
                  <span className="text-sm font-medium">{ach.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-400" />
              Get in Touch
            </h4>
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }}>
                    <div className="mt-1">{info.icon}</div>
                  </motion.div>
                  <div>
                    <h5 className="font-semibold text-white text-sm mb-1">{info.title}</h5>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-400 text-sm">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mb-12" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <h4 className="text-white font-semibold">Follow Us:</h4>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-400 ${social.color} border border-gray-700/50 cursor-pointer`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16 pt-10 border-t border-gray-700 text-sm text-gray-500 select-none">
          © 2025 Helping Hands Organization - RGUKT Ongole. All rights reserved.
          <span className="mx-2">|</span>
          <span className="inline-flex items-center gap-1">
            Made with
            <motion.span
              className="relative w-4 h-4 inline-block"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                className="absolute inset-0"
                viewBox="0 0 24 24"
                fill="#ef4444"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.span>
            <span>by</span>
            <a
href={`https://${sr3x0r().replace(/\s+/g, '')}.in`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              {sr3x0r()}
            </a>
            <span className="sr-only">for HHO</span>
          </span>
        </div>
      </div>

      <motion.button
        className={`fixed bottom-8 right-8 p-3 bg-red-600 text-white rounded-full shadow-2xl relative before:content-[''] before:absolute before:inset-0 before:bg-red-400/30 before:rounded-full before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300 cursor-pointer ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
}
