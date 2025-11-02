import React from "react";
import { education } from "../data/educationData";

const Education = () => {
  return (
    <section id="education" className="py-10 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text neon-text mb-4">
            Education
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            My academic journey and qualifications that shape my expertise
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Background images for education section, spanning full screen width */}
          <div className="absolute inset-0 z-0 w-screen h-full left-1/2 -translate-x-1/2 overflow-hidden flex">
            {/* Use two images side by side for full coverage */}
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
              alt="Education background 1"
              className="w-1/2 h-full object-cover opacity-100"
            />
            <img
              src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80"
              alt="Education background 2"
              className="w-1/2 h-full object-cover opacity-100"
            />
            {/*
            // Example setup for using local asset images in the future:
            // import eduBg1 from '../assets/images/education-bg-1.jpg';
            // import eduBg2 from '../assets/images/education-bg-2.jpg';
            // <img src={eduBg1} ... />
            // <img src={eduBg2} ... />
            */}
          </div>

          {/* Timeline Line removed */}

          <div className="space-y-12">
            {education.map((item, idx) => (
              <div key={idx} className="relative" data-aos="fade-up" data-aos-delay={idx * 100}>
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background neon-glow"></div>

                {/* Content Card */}
                <div className={`ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'} md:w-5/12`}>
                  <div className="crypto-card group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-black opacity-100 mb-2 group-hover:text-primary transition-colors">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-black opacity-100 mb-3">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                          <span>{item.institute}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-accent opacity-100 mb-4">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{item.duration}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center neon-glow">
                        <svg className="w-6 h-6 text-background" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-black opacity-100 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-glass-border">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-success rounded-full"></div>
                        ))}
                      </div>
                      <span className="text-xs text-black opacity-100">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;