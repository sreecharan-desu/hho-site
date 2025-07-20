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

export default function HHOFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Gallery", href: "#gallery" },
    { name: "Our Team", href: "#team" },
    { name: "RGUKT Ongole", href: "#rgukt" },
    { name: "Contact", href: "#contact" }
  ];

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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px"
          }}
        />
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">HHO</h3>
                <p className="text-sm text-red-400">Helping Hands Organization</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students and building communities at RGUKT Ongole. We believe in the power of collective support and sustainable change through education, emergency aid, and skill development.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((ach, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
                >
                  <div className="text-red-400">{ach.icon}</div>
                  <span className="text-sm font-medium">{ach.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-red-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-red-400 flex items-center gap-2 group transition-all"
                  >
                    <ArrowUp className="w-3 h-3 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-red-400" />
              Get in Touch
            </h4>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">{info.icon}</div>
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

        {/* Divider */}
        <div className="border-t border-gray-700 mb-12" />

        {/* Social & Subscribe */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <h4 className="text-white font-semibold">Follow Us:</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800 rounded-full text-gray-400 ${social.color} transition-all border border-gray-700 hover:border-gray-600`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Subscribe to updates..."
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="text-center mt-12 pt-8 border-t border-gray-700 text-sm text-gray-500 select-none">
          © 2025 Helping Hands Organization - RGUKT Ongole. All rights reserved.
          <span className="mx-2">|</span>
          <span className="inline-flex items-center gap-1">
            Made with
            <span className="relative w-4 h-4 inline-block">
              <svg
                className="absolute inset-0 animate-pulse"
                viewBox="0 0 24 24"
                fill="#ef4444"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 
                  4.5 2.09C13.09 3.81 14.76 3 
                  16.5 3 19.58 3 22 5.42 22 8.5c0 
                  3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </span>
            <span>by</span>
            <a
  href="https://sreecharandesu.in"
  target="_blank"
  rel="noopener noreferrer"
  className="font-semibold text-gray-300 not-italic tracking-wide hover:underline transition"
>
  SreeCharan Desu
</a>

            <span className="sr-only">for HHO</span>
          </span>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        className={`fixed bottom-8 right-8 p-3 bg-red-600 text-white rounded-full shadow-2xl hover:bg-red-700 transition-all z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </footer>
  );
}
