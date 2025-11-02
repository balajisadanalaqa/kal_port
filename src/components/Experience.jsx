import React from "react";
import { experience } from "../data/experienceData";

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text neon-text mb-4">
            Experience
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            My professional journey and expertise in the field
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {experience.map((item, idx) => (
            <div key={idx} className="group" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="crypto-card h-full hover:scale-105 transition-all duration-300">
                <div className="flex items-start gap-6">
                  {/* Experience Icon */}
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center neon-glow flex-shrink-0">
                    <svg className="w-10 h-10 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-text mb-3 group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{item.location}</span>
                      </div>
                      <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
                      <div className="flex items-center gap-2 text-sm text-accent">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{item.years}</span>
                      </div>
                    </div>

                    <p className="text-text-secondary leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Experience Level Indicator */}
                    <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-success' : 'bg-glass-border'}`}></div>
                          ))}
                        </div>
                        <span className="text-xs text-text-secondary">Expert Level</span>
                      </div>
                      <div className="px-3 py-1 bg-gradient-primary rounded-full">
                        <span className="text-xs font-semibold text-background">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;