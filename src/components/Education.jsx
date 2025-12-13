import React from "react";
import { education } from "../data/educationData";
import EducationBg from "../assets/images/education-bg.jpg"; // Import the background image

const Education = () => {
  return (
                                                <section id="education" className="px-4 relative bg-background min-h-screen flex flex-col mt-4 sm:mt-0">
                                                  {/* Background image container */}
                                                  <div
                                                    className="absolute inset-0 z-0"
                                                    style={{ backgroundImage: `url(${EducationBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                  ></div>
                                                  {/* Optional: Add an overlay for better text readability */}
                                                  {/* <div className="absolute inset-0 bg-black opacity-60 z-0"></div> */}
                                                  <div className="flex-grow flex flex-col justify-end">
                                                    <div className="relative z-10 max-w-6xl mx-auto pb-2 sm:pb-4 md:pb-24 mt-4 sm:mt-0">
                                                      <h2 className="text-3xl md:text-4xl font-bold text-center text-white neon-text-blue mb-2 sm:mb-4 md:mb-10 mt-4 sm:mt-0" data-aos="fade-up">
                                                        My <span className="gradient-text">Education</span>
                                                      </h2>
                                    
                                                      <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-5xl mx-auto mt-4 sm:mt-0">
                                                        {education.map((item, idx) => (
                                                          <div key={idx} className="group" data-aos="fade-up" data-aos-delay={idx * 100}>
                                                            <div className="crypto-card h-[100px] sm:h-[120px] hover:scale-105 transition-all duration-300 p-2 sm:p-3">
                                                              <div className="flex items-start gap-2 sm:gap-3">
                                                                {/* Education Icon/Image Placeholder */}
                                                                <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center neon-glow flex-shrink-0">
                                                                  <svg className="w-4 h-4 text-background sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                                                  </svg>
                                                                </div>

                                                                <div className="flex-1">
                                                                  <h3 className="text-[10px] sm:text-xs font-heading font-bold text-text mb-0.5 group-hover:text-primary transition-colors">
                                                                    {item.degree}
                                                                  </h3>
                                                                  <p className="text-[10px] sm:text-xs font-medium text-text-secondary mb-0.5">
                                                                    {item.institute}
                                                                  </p>
                                                                  <p className="text-[10px] sm:text-xs text-primary mb-1">
                                                                    {item.duration}
                                                                  </p>
                                                                  <p className="text-[10px] sm:text-xs text-text-secondary leading-relaxed hidden">
                                                                    {item.description}
                                                                  </p>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ))}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </section>  );
};

export default Education;
