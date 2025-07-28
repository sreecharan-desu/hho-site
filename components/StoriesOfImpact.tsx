
// @ts-nocheck

"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Testimonial = {
  name: string;
  avatar: string; // First letter of the name
  content: string;
  handle?: string;
  role: string;
  avatarBg: string;
};

const StoriesOfImpact: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // List of roles to be randomly assigned (except for SreeCharan)
  const roles = [
    "Community Volunteer",
    "Local Supporter",
    "Campaign Advocate",
    "Youth Leader",
    "Village Coordinator",
    "Fundraising Enthusiast",
    "Social Worker",
    "Community Organizer",
  ];

  // Shuffle roles function
  const shuffleRoles = (roles: string[]): string[] => {
    const shuffled = roles
    return shuffled;
  };

  const shuffledRoles = shuffleRoles(roles);

  // Static testimonial data (15 testimonials)
  const testimonials: Testimonial[][] = [
    [
   {
        name: "Anil Kumar",
        avatar: "A",
        avatarBg: "bg-pink-600",
        role: shuffledRoles[6],
        content:
          "I donate 1 rupee every week because it adds up to real impact. My 100 Rs donation for my friend's birthday supported local healthcare. Join us in this movement!",
      },
      {
        name: "Ravi Teja",
        avatar: "R",
        avatarBg: "bg-gray-600",
        role: shuffledRoles[7],
        content:
          "The Weekly One Rupee Challenge is a fantastic way to give back. My small contributions have helped provide clean water, and I donated 100 Rs for my friend's birthday to celebrate together.",
      },
  
      {
        name: "Kavya",
        avatar: "K",
        avatarBg: "bg-blue-600",
        role: shuffledRoles[0],
        content:
          "The Weekly One Rupee Challenge is a game-changer! My small donations have supported healthcare in our villages, and donating 100 Rs for my sister's birthday felt so rewarding. Let's keep the momentum going!",
      },
      {
        name: "Leladhar",
        avatar: "L",
        avatarBg: "bg-green-600",
        role: shuffledRoles[1],
        content:
          "I joined the Weekly One Rupee Challenge because it's so easy to make a difference. My 1 rupee contributions have helped provide clean water, and I donated 100 Rs for my friend's birthday to spread joy.",
      },
      {
        name: "Devi Sri Prasad",
        avatar: "D",
        avatarBg: "bg-purple-600",
        role: shuffledRoles[2],
        content:
          "The simplicity of donating 1 rupee weekly inspired me to join this challenge. I also gave 100 Rs for my colleague's birthday, supporting our community projects. Every rupee counts!",
      },
      {
        name: "Sai Kumar",
        avatar: "S",
        avatarBg: "bg-orange-600",
        role: shuffledRoles[3],
        content:
          "I love how the Weekly One Rupee Challenge makes giving accessible. My donations have supported local education, and donating 100 Rs for my friend's birthday was a heartfelt gesture.",
      },
    ],
    [
      {
        name: "Chakra Varshini",
        avatar: "C",
        avatarBg: "bg-teal-600",
        role: shuffledRoles[4],
        content:
          "Joining the Weekly One Rupee Challenge has been fulfilling. My small contributions help fund community initiatives, and I donated 100 Rs for my best friend's birthday to make it special.",
      },
      {
        name: "Deepthi",
        avatar: "D",
        avatarBg: "bg-indigo-600",
        role: shuffledRoles[5],
        content:
          "The Weekly One Rupee Challenge showed me how small acts can create big change. I donated 100 Rs for my cousin's birthday, and it felt amazing to contribute to our cause.",
      },
          {
        name: "SreeCharan",
        avatar: "S",
        avatarBg: "bg-red-600",
        handle: "@SreeCharanDesu",
        role: "Head Representative and Contributor",
        content:
          "As the head of this initiative, I'm proud to lead the Weekly One Rupee Challenge. My weekly 1 rupee donations have helped fund local schools, and I donated 100 Rs for my friend's birthday to celebrate meaningfully. Visit my site at sreecharandesu.in to join our mission!",
      },
     
      {
        name: "Sravani",
        avatar: "S",
        avatarBg: "bg-yellow-600",
        role: shuffledRoles[7],
        content:
          "The Weekly One Rupee Challenge is so easy to participate in! My weekly donations support clean water projects, and I gave 100 Rs for my friend's birthday to celebrate with purpose.",
      },
      {
        name: "Prasad",
        avatar: "P",
        avatarBg: "bg-cyan-600",
        role: shuffledRoles[0], // Cycle roles if needed
        content:
          "I was amazed at how much impact 1 rupee can have! My weekly donations and a 100 Rs birthday gift for my friend have helped fund community schools. Let's do this together!",
      },
    ],
    [
      {
        name: "Harika",
        avatar: "H",
        avatarBg: "bg-rose-600",
        role: shuffledRoles[1],
        content:
          "The Weekly One Rupee Challenge makes giving back so simple. My donations have supported local initiatives, and I donated 100 Rs for my friend's birthday to make it meaningful.",
      },
      {
        name: "Vijay",
        avatar: "V",
        avatarBg: "bg-amber-600",
        role: shuffledRoles[2],
        content:
          "I joined the Weekly One Rupee Challenge to support our community. Donating 100 Rs for my friend's birthday was a special way to contribute to our cause. Every rupee helps!",
      },
      {
        name: "Swathi",
        avatar: "S",
        avatarBg: "bg-lime-600",
        role: shuffledRoles[3],
        content:
          "The Weekly One Rupee Challenge is a brilliant idea! My weekly contributions and a 100 Rs birthday donation have supported healthcare projects. Join us today!",
      },
      {
        name: "Kiran",
        avatar: "K",
        avatarBg: "bg-violet-600",
        role: shuffledRoles[4],
        content:
          "Donating 1 rupee weekly is so easy, and it adds up to big change. I gave 100 Rs for my friend's birthday, helping fund clean water initiatives. Let's keep it going!",
      },
      {
        name: "Padma",
        avatar: "P",
        avatarBg: "bg-emerald-600",
        role: shuffledRoles[5],
        content:
          "The Weekly One Rupee Challenge is inspiring! My weekly donations and a 100 Rs birthday gift have supported local education. It's a small act with a big impact!",
      },
    ],
  ];

  // Static section metadata
  const sectionData = {
    title: "Stories from Our Weekly One Rupee Challenge",
    highlightedTitle: "One Rupee Challenge",
    description:
      "Hear from our supporters in Andhra Pradesh who are making a difference with their weekly 1 rupee donations and special 100 rupee contributions for friends' birthdays.",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.7,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.32, 0, 0.1, 1] },
    },
  };

  const pulseAnimation = shouldReduceMotion
    ? {}
    : {
        animate: { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] },
        transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-red-50/30" aria-hidden="true" />
      {!shouldReduceMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-red-100/40"
              style={{ left: `${15 + (i * 15)}%`, top: `${15 + (i * 15)}%` }}
              animate={{
                y: [-12, 12, -12],
                opacity: [0.2, 0.5, 0.2],
                scale: [0.7, 1.1, 0.7],
              }}
              transition={{
                duration: 7 + i * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="max-w-7xl mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight"
          >
            {sectionData.title.replace(sectionData.highlightedTitle, '')}
            <span className="text-red-600">{sectionData.highlightedTitle}</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {sectionData.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-32 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto mt-10"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, ease: [0.32, 0, 0.1, 1] }}
          />
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((column, columnIndex) => (
            <motion.div
              key={columnIndex}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              {column.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.05)",
                    ...(testimonial.name === "SreeCharan" ? { borderColor: "rgba(220, 38, 38, 0.5)" } : {}),
                  }}
                  className={`bg-white p-6 rounded-2xl border shadow-lg min-h-[250px] flex flex-col justify-between ${
                    testimonial.name === "SreeCharan" ? "border-red-200 bg-red-50/30" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start mb-6">
                    <motion.div
                      className={`w-12 h-12 rounded-full ${testimonial.avatarBg} flex items-center justify-center text-white font-bold text-lg mr-4 flex-shrink-0`}
                      {...(testimonial.name === "SreeCharan" ? { animate: { scale: [1, 1.1, 1], opacity: [1, 0.85, 1] }, transition: { duration: 1.5, repeat: Infinity } } : pulseAnimation)}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div className="min-w-0 flex-grow">
                      <h4 className="font-semibold text-gray-900 text-base">
                        {testimonial.name === "SreeCharan" ? (
                          <a
                            href="https://sreecharandesu.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            {testimonial.name}
                          </a>
                        ) : (
                          testimonial.name
                        )}
                      </h4>
                      {testimonial.handle && (
                        <p className="text-gray-500 text-xs">{testimonial.handle}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed flex-grow">
                    {testimonial.content.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className={pIndex > 0 ? "mt-3" : ""}>
                        {paragraph.split("@").map((part, partIndex) => {
                          if (partIndex === 0) return part;
                          const [mention, ...rest] = part.split(" ");
                          return (
                            <span key={partIndex}>
                              <span className="text-red-600 font-medium">@{mention}</span>
                              {rest.length > 0 && ` ${rest.join(" ")}`}
                            </span>
                          );
                        })}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StoriesOfImpact;
