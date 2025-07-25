export const apiData = [
  {
    component: "ProfessionalSections",
    data: {
      about: {
        title: "About HHO",
        highlightedTitle: "HHO",
        description: "A student-led nonprofit at RGUKT Ongole, dedicated to providing financial assistance for health challenges, empowering education, and fostering community support through sustainable initiatives.",
        stats: [
          { value: "2024", label: "Established" },
          { value: "500+", label: "Students Helped" },
          { value: "₹5L+", label: "Funds Raised" }
        ],
        sectionLabel: "About Our Organization"
      },
      why: {
        title: "Why HHO Matters",
        highlightedTitle: "Matters",
        description: "Our three core pillars drive meaningful change in our community",
        sectionLabel: "Our Impact Areas",
        pillars: [
          {
            icon: "Heart",
            title: "Compassion",
            description: "Supporting students in medical emergencies with immediate financial assistance and emotional support.",
            color: "red",
            stats: "50+ Cases Resolved"
          },
          {
            icon: "Lightbulb",
            title: "Education",
            description: "Empowering through WhatsApp mentorship groups, academic resources, and career guidance.",
            color: "blue",
            stats: "10+ Study Groups"
          },
          {
            icon: "Users",
            title: "Community",
            description: "Building unity through eco-friendly events, cultural programs, and collaborative initiatives.",
            color: "green",
            stats: "1000+ Participants"
          }
        ]
      },
      campaigns: {
        title: "Ongoing & Past Campaigns",
        highlightedTitle: "Campaigns",
        description: "Discover the initiatives that are creating lasting impact in our community",
        sectionLabel: "Our Initiatives",
        events: [
          {
            name: "Emergency Medical Fund",
            date: "Ongoing",
            description: "Providing immediate financial assistance to students facing medical emergencies and family health crises.",
            impact: "₹2.5L+ Raised",
            status: "active"
          },
          {
            name: "Education Support Initiative",
            date: "Jan 2024 - Ongoing",
            description: "WhatsApp mentorship groups and academic resources for underprivileged students.",
            impact: "500+ Students Helped",
            status: "active"
          },
          {
            name: "Eco-Friendly Community Drive",
            date: "Dec 2023",
            description: "Sustainable campus initiatives including tree plantation and waste management programs.",
            impact: "1000+ Trees Planted",
            status: "completed"
          }
        ]
      }
    }
  },
  {
    component: "AnnouncementsPreview",
    data: {
      sectionLabel: "Latest Updates",
      title: "Announcements",
      highlightedTitle: "Announcements",
      announcements: [
        {
          id: 1,
          title: "Daily Aerobic Sessions",
          message: "New aerobic sessions start at 6 AM daily. Join us for a healthy start to your day!",
          time: "6:00 AM",
          location: "Main Ground",
          priority: "high"
        },
        {
          id: 2,
          title: "HHO Desks Installation",
          message: "HHO desks coming soon to every academic block for better student support.",
          time: "Coming Soon",
          location: "All Academic Blocks",
          priority: "medium"
        }
      ],
      loadingMessage: "Loading announcements...",
      errorMessage: "Failed to load, showing mock data."
    }
  },
  {
    component: "CurrentFundraiser",
    data: {
      sectionLabel: "Active Campaign",
      title: "Fundraiser: Aavirbhav 2025",
      highlightedTitle: "Aavirbhav 2025",
      description: "Support Aavirbhav 2025 to create unforgettable memories for RGUKT Ongole students.",
      targetAmount: 340000,
      currentAmount: 204000,
      stats: [
        { icon: "Users", title: "Contributors", value: "150+", color: "emerald" },
        { icon: "Calendar", title: "Days Left", value: "28", color: "blue" },
        { icon: "TrendingUp", title: "Progress", value: "60%", color: "purple" }
      ],
      ctaSection: {
        title: "Every Contribution Counts!",
        description: "Your support ensures Aavirbhav 2025 creates lasting memories for our RGUKT Ongole community.",
        buttons: [
          { text: "Contact", style: "bg-white text-red-600" },
          { text: "Learn More", style: "border border-white text-white" }
        ]
      },
      buttons: [
        { text: "Donate", icon: "IndianRupee" },
        { text: "All Fundraisers", icon: "ArrowRight" }
      ]
    }
  },
  {
    component: "ProfessionalHelpSection",
    data: {
      sectionLabel: "Get Involved",
      title: "How You Can Help",
      highlightedTitle: "Help",
      description: "Choose the way that works best for you. Every contribution, no matter the size, creates meaningful change in our community.",
      helpOptions: [
        {
          icon: "IndianRupee",
          title: "₹1 Weekly",
          subtitle: "Micro Donation",
          description: "Contribute just ₹1 every week to create sustainable impact. Small amounts, when pooled together, fund emergency medical assistance.",
          color: "emerald",
          impact: "₹52/year per person",
          cta: "Set Up Weekly Giving"
        },
        {
          icon: "Gift",
          title: "₹100 Birthday",
          subtitle: "Celebration Giving",
          description: "Transform your special day into an opportunity to help others. Contribute ₹100 on your birthday to support education initiatives.",
          color: "blue",
          impact: "Funds 2 students' resources",
          cta: "Plan Birthday Gift"
        },
        {
          icon: "HandHeart",
          title: "Volunteer",
          subtitle: "Time & Skills",
          description: "Share your expertise and time to mentor students, organize events, or support our administrative operations.",
          color: "purple",
          impact: "4+ hours/month impact",
          cta: "Join Our Team"
        },
        {
          icon: "Gavel",
          title: "Kindness Auction",
          subtitle: "Community Event",
          description: "Participate in our unique auction where acts of kindness, services, and handmade items are bid upon to raise funds.",
          color: "orange",
          impact: "Quarterly fundraiser",
          cta: "View Auction Items"
        }
      ],
      ctaSection: {
        title: "Ready to Make a Difference?",
        description: "Join hundreds of supporters who are already creating positive change. Start with any option above or contact us to explore custom ways to help.",
        buttons: [
          { text: "Contact Us", style: "bg-white text-red-600" },
          { text: "Learn More", style: "border-2 border-white text-white" }
        ]
      }
    }
  },
  {
    component: "EnhancedHeroSection",
    data: {
      heroMessages: [
        {
          title: "Small Acts. Big Impact",
          highlightedWords: ["Big"],
          subtitle: "Together, we create hope and support during life's most challenging moments. Join our community dedicated to making a meaningful difference.",
          cta: "Start Making a Difference"
        },
        {
          title: "Every Drop Counts",
          highlightedWords: ["Drop"],
          subtitle: "Your generosity creates ripples of change that reach far beyond what you can imagine. Be part of something bigger.",
          cta: "Join the Movement"
        },
        {
          title: "Building Tomorrow",
          highlightedWords: ["Tomorrow"],
          subtitle: "Through compassion and community action, we're creating lasting solutions for those who need it most.",
          cta: "Build With Us"
        }
      ],
      features: [
        { icon: "Shield", text: "Registered Charity", color: "text-green-500" },
        { icon: "Users", text: "Community Driven", color: "text-blue-500" },
        { icon: "Heart", text: "Transparent Impact", color: "text-purple-500" }
      ],
      scrollPrompt: "Scroll to explore",
      accessibility: {
        skipLink: "Skip to main content",
        logoAlt: "Charity organization logo"
      }
    }
  },
  {
    component: "StoriesOfImpact",
    data: {
      title: "See why people love HHO",
      highlightedTitle: "HHO",
      description: "Read the impact we’ve had from people across communities.",
      ctaButton: "Get started →",
      testimonials: [
        [
          {
            name: "Deepika Reddy",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            content: "HHO gave me a platform to contribute meaningfully to rural education drives. The volunteers are passionate, and the programs are well-structured."
          },
          {
            name: "Suma Rao",
            handle: "@suma.rao93",
            avatar: "S",
            avatarBg: "bg-red-700",
            content: "I’ve volunteered with a few NGOs before, but HHO stands out for how deeply they care about people. Their disaster relief efforts were organized and compassionate."
          },
          {
            name: "Rahul D",
            handle: "@rahuld_ongole",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
            content: "From ration drives to health camps, HHO works where it matters most. Proud to support their vision. Their local impact in Andhra Pradesh is unmatched."
          }
        ],
        [
          {
            name: "Anjali M",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
            content: "The women's health initiative by HHO was a turning point in my village. They didn't just donate, they educated and empowered."
          },
          {
            name: "Faraz M",
            handle: "@farazm",
            avatar: "F",
            avatarBg: "bg-blue-500",
            content: "I hosted a blood donation drive with HHO. The transparency, the support, and the follow-ups were world-class. This is how all NGOs should operate."
          },
          {
            name: "Chandrika S.",
            role: "School Teacher, Ongole",
            avatar: "C",
            avatarBg: "bg-green-600",
            content: "They brought notebooks, shoes, and most importantly, hope. Our students now look forward to learning again. Thank you, HHO."
          }
        ],
        [
          {
            name: "Vikrant Reddy",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
            content: "A friend introduced me to HHO during a cyclone relief campaign. I never imagined grassroots help could be this efficient."
          },
          {
            name: "Lavanya Devi",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
            content: "HHO made it so easy to get involved. I helped distribute sanitary kits across two districts, and everything was perfectly planned. It felt good to give back with a team that truly cares."
          },
          {
            name: "Abhay Kumar",
            handle: "@abhaykumar12",
            avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face",
            content: "Joined one of their food distribution drives and was blown away by the dedication. HHO isn’t just another NGO — it’s a family."
          }
        ]
      ]
    }
  },
  {
    component: "UrgentHelpAlert",
    data: {
      title: "Urgent Help Alert",
      description: "We have received an urgent request for assistance. If you can help or know someone who can, please reach out to us immediately.",
      subtitle: "A student needs immediate support",
      contactMethods: [
        {
          method: "Call Now",
          description: "Available 24/7",
          value: "+91 79819 37656",
          icon: "Phone",
          color: "red"
        },
        {
          method: "Send Message",
          description: "Quick response",
          value: "hho@rguktong.ac.in",
          icon: "MessageCircle",
          color: "blue"
        }
      ],
      buttons: [
        { text: "Request Help Now", icon: "ArrowRight", style: "bg-red-600 text-white" },
        { text: "Emergency Guidelines", icon: "Clock", style: "border-2 border-red-600 text-red-600" }
      ]
    }
  },
  {
    component: "HomePage",
    data: {
      header: {
        logoAlt: "HHO Logo",
        brand: "HHO",
        navItems: [
          { name: "About", ref: "aboutRef" },
          { name: "Initiatives", ref: "initiativesRef" },
          { name: "Events", ref: "eventsRef" },
          { name: "Impact", ref: "impactRef" }
        ],
        buttons: [
          { text: "Donate", style: "bg-red-600 text-white" },
          { text: "Need Help", style: "bg-red-600 text-white" }
        ]
      },
      helpPopup: {
        title: "Need Help?",
        icon: "HelpCircle",
        details: [
          {
            icon: "MapPin",
            label: "Address",
            content: ["Santhanutalapadu, 523225", "Andhra Pradesh, India"]
          },
          {
            icon: "Phone",
            label: "Phone",
            content: ["+91 79819 37656"]
          },
          {
            icon: "Mail",
            label: "Email",
            content: ["hho@rguktong.ac.in"],
            link: "mailto:hho@rguktong.ac.in"
          }
        ]
      },
      donatePopup: {
        title: "Support Our Cause",
        icon: "DollarSign",
        motivationalMessages: [
          "Your donation can change lives! Every contribution brings hope and support.",
          "Together, we can make a difference—donate today!",
          "Every small act of kindness creates a ripple of hope. Be the change!"
        ],
        paymentMethods: [
          {
            label: "Bank Transfer",
            content: [
              "Account Name: Helping Hands Organization",
              "Bank: State Bank of India",
              "Account Number: 1234567890",
              "IFSC Code: SBIN0001234",
              "Branch: Santhanutalapadu"
            ]
          },
          {
            label: "UPI Payment",
            content: ["UPI ID: 7981937656@okbizaxis"],
            qr: "/upi-qr.png"
          },
          {
            label: "Other Methods",
            content: [
              "PayPal: donate@hho.org",
              "Google Pay: +91 79819 37656"
            ]
          }
        ],
        donationStats: {
          totalDonations: 15000,
          goal: 50000
        },
        donationMessageTemplate: "Your donation of ₹{amount} {recurring} will help us {impact}. Thank you, {donorName}!",
        impactMessages: {
          "5000+": "transform communities",
          "1000-4999": "make a big impact",
          default: "support our cause"
        }
      },
      confirmationModal: {
        title: "Thank You for Your Donation!",
        message: "Your contribution of ₹{amount} will make a significant impact. We’ll send you a confirmation email soon.",
        button: "Close"
      }
    }
  },
  {
    component: "DriveGallery",
    data: {
      images: [
        {
          id: "1",
          url: "/images/hho/medical_camp_1.jpg",
          title: "Medical Camp 2024.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/medical_camp_1_download.jpg"
        },
        {
          id: "2",
          url: "/images/hho/education_workshop_1.jpg",
          title: "Education Workshop Jan 2024.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/education_workshop_1_download.jpg"
        },
        {
          id: "3",
          url: "/images/hho/tree_plantation_2023.jpg",
          title: "Tree Plantation Drive 2023.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/tree_plantation_2023_download.jpg"
        },
        {
          id: "4",
          url: "/images/hho/aavirbhav_2025.jpg",
          title: "Aavirbhav 2025 Fundraiser.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/aavirbhav_2025_download.jpg"
        },
        {
          id: "5",
          url: "/images/hho/community_event_1.jpg",
          title: "Community Unity Event.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/community_event_1_download.jpg"
        },
        {
          id: "6",
          url: "/images/hho/health_camp_2.jpg",
          title: "Health Camp Ongole.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/health_camp_2_download.jpg"
        },
        {
          id: "7",
          url: "/images/hho/mentorship_session.jpg",
          title: "Student Mentorship Session.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/mentorship_session_download.jpg"
        },
        {
          id: "8",
          url: "/images/hho/food_distribution.jpg",
          title: "Food Distribution Drive.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/food_distribution_download.jpg"
        },
        {
          id: "9",
          url: "/images/hho/blood_donation.jpg",
          title: "Blood Donation Camp 2024.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/blood_donation_download.jpg"
        },
        {
          id: "10",
          url: "/images/hho/sanitary_kit_distribution.jpg",
          title: "Sanitary Kit Distribution.jpg",
          width: 400,
          height: 300,
          downloadUrl: "/images/hho/sanitary_kit_distribution_download.jpg"
        }
      ]
    }
  }
];