import React from 'react';

type Testimonial = {
  name: string;
  avatar: string;
  content: string;
  handle?: string;
  role?: string;
  avatarBg?: string;
};

const StoriesOfImpact: React.FC = () => {
  const testimonials: Testimonial[][] = [
    [
      {
        name: "Deepika Reddy",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        content: "HHO gave me a platform to contribute meaningfully to rural education drives. The volunteers are passionate, and the programs are well-structured."
      },
      {
        name: "Mohan Krishna",
        handle: "@mohan_k",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        content: "Seamless coordination, impactful outcomes. Being a part of HHO helped me connect with people and purpose."
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
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">See why our people love HHO</h2>
          <p className="text-gray-600 text-lg">Read the impact we've had from people.</p>
          <button className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Get started →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-6">
              {column.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-start mb-4">
                    {testimonial.avatar.startsWith('http') ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${testimonial.avatarBg || 'bg-gray-700'} flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0`}>
                        {testimonial.avatar}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                      {testimonial.handle && (
                        <p className="text-gray-500 text-xs">{testimonial.handle}</p>
                      )}
                      {testimonial.role && (
                        <p className="text-gray-500 text-xs">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {testimonial.content.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className={pIndex > 0 ? 'mt-3' : ''}>
                        {paragraph.split('@').map((part, partIndex) => {
                          if (partIndex === 0) return part;
                          const [mention, ...rest] = part.split(' ');
                          return (
                            <span key={partIndex}>
                              <span className="text-red-600 font-medium">@{mention}</span>
                              {rest.length > 0 && ` ${rest.join(' ')}`}
                            </span>
                          );
                        })}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-gray-600 hover:text-red-600 transition-colors font-medium">
            Show more
          </button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-8">Trusted by fast-growing organizations around the world</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <span className="text-gray-400 font-semibold">PageList</span>
            <span className="text-gray-400 font-semibold">storyblok</span>
            <span className="text-gray-400 font-semibold">Antimetal</span>
            <span className="text-gray-400 font-semibold">tumstry</span>
            <span className="text-gray-400 font-semibold">okteto</span>
            <span className="text-gray-400 font-semibold">MER</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesOfImpact;
