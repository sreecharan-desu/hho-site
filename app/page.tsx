"use client";

import { useState, useEffect, useRef } from 'react';
import { Heart, Users, ArrowRight, Menu, X, ChevronLeft, ChevronRight, Globe, Shield, Lightbulb, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedHeroSection from '@/components/Hero';
import ProfessionalSections from '@/components/About';
import ProfessionalHelpSection from '@/components/Help';
import AnnouncementsPreview from '@/components/Announcements';
import CurrentFundraiser from '@/components/CurrentFundRaising';
import HHOFooter from '@/components/Footer';
import StoriesOfImpact from '@/components/StoriesOfImpact';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const aboutRef = useRef(null);
  const initiativesRef = useRef(null);
  const eventsRef = useRef(null);
  const impactRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineEvents = [
    { date: 'Jan 2, 2018', event: 'HHO Ongole established with a vision', icon: <Users className="w-5 h-5 text-white" /> },
    { date: 'Oct 7, 2023', event: 'Officially registered as NGO', icon: <Shield className="w-5 h-5 text-white" /> },
    { date: 'Jan 2024', event: 'Weekly ₹1 concept introduced', icon: <Heart className="w-5 h-5 text-white" /> },
    { date: 'Feb 2024', event: '₹100 per birthday initiative launched', icon: <CheckCircle className="w-5 h-5 text-white" /> },
    { date: 'Apr 2024', event: 'Books collection drive success', icon: <Globe className="w-5 h-5 text-white" /> },
    { date: 'May 2024', event: 'Summer Initiative transforms lives', icon: <Lightbulb className="w-5 h-5 text-white" /> },
    { date: 'Jan 26, 2025', event: 'Sponsored washing machines for divyangjan students', icon: <Heart className="w-5 h-5 text-white" /> },
  ];

  const events = [
    { name: 'Ornate Cultural Festival', date: 'March 21-22, 2024', description: 'A vibrant celebration raising ₹45,000 for student welfare.', impact: '₹45,000 raised' },
    { name: 'Avigna Fun Games', date: 'September 2024', description: 'Community bonding through engaging games and activities.', impact: '200+ participants' },
    { name: 'Ekadantha Unity Fest', date: 'September 2024', description: 'Celebrating unity through creativity and cultural expression.', impact: '15 communities united' },
    { name: 'Semi Christmas Festival', date: 'December 2024', description: 'Spreading festive joy across all age groups.', impact: '300+ families reached' },
    { name: 'Aavirbhav Innovation', date: 'January 2025', description: 'Showcasing brilliant student talent and breakthrough innovations.', impact: '25 innovations showcased' },
    { name: 'Ornate Pre-Events', date: 'February 2025', description: 'Building anticipation for the main cultural extravaganza.', impact: 'Community excited' },
  ];

  const initiatives = [
    { title: 'Health & Wellness', items: ['Aerobic dance sessions at 6 AM', 'Zumba dance sessions', '21 days digital detox challenge'] },
    { title: 'Education & Growth', items: ['WhatsApp groups for aptitude', 'Waste books redistribution', 'Student startup mentorship'] },
    { title: 'Community Support', items: ['COVID-19 grocery support', 'Leftover shoe distribution', 'Summer relief initiatives'] },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Final Year Student', quote: 'HHO was there when my family needed medical support. Their swift response saved us from a crisis.', avatar: '👩‍🎓' },
    { name: 'Rajesh Kumar', role: 'Alumni', quote: 'The sense of community HHO creates is incredible. It\'s more than an organization - it\'s a family.', avatar: '👨‍💼' },
    { name: 'Anita Reddy', role: 'Parent', quote: 'Knowing HHO supports our children gives us peace of mind. They truly care about student welfare.', avatar: '👩‍🏫' },
  ];

  const stats = [
    { label: 'Lives Transformed', value: '2,500+', icon: <Heart className="w-6 h-6 text-red-600" /> },
    { label: 'Funds Mobilized', value: '₹3,40,000', icon: <Globe className="w-6 h-6 text-red-600" /> },
    { label: 'Active Volunteers', value: '180+', icon: <Users className="w-6 h-6 text-red-600" /> },
    { label: 'Success Stories', value: '45+', icon: <CheckCircle className="w-6 h-6 text-red-600" /> },
  ];

  const scrollToSection = (ref:any) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="HHO Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-red-600">HHO</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'About', ref: aboutRef },
              { name: 'Initiatives', ref: initiativesRef },
              { name: 'Events', ref: eventsRef },
              { name: 'Impact', ref: impactRef },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <a
              href="/donate"
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              Donate
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-red-600" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 py-4 space-y-3">
              {[
                { name: 'About', ref: aboutRef },
                { name: 'Initiatives', ref: initiativesRef },
                { name: 'Events', ref: eventsRef },
                { name: 'Impact', ref: impactRef },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  {item.name}
                </button>
              ))}
              <a
                href="/donate"
                className="block w-full text-center px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
              >
                Donate
              </a>
            </div>
          </div>
        )}
      </header>

      <EnhancedHeroSection />

      <ProfessionalSections/>
      <AnnouncementsPreview/>

      <ProfessionalHelpSection/>
      <StoriesOfImpact/>
      <CurrentFundraiser/>

      

      <HHOFooter/>
    </div>
  );
}