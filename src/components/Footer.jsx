import React, { useState, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { fetchCollection } from "../firebase/firebaseUtils";

const Footer = () => {
  const [summary, setSummary] = useState({
    name: "Dr. Kalyani Sadanala, PT",
    profileLinks: {
      linkedin: "https://linkedin.com/in/priyachelli",
      instagram: "https://instagram.com/drpriyachelli",
      email: "priya.chelli@email.com"
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        const aboutData = await fetchCollection('about');
        if (aboutData.length > 0) {
          setSummary({
            name: aboutData[0].name || "Dr. Kalyani Sadanala, PT",
            profileLinks: {
              linkedin: aboutData[0].profileLinks?.linkedin || "https://linkedin.com/in/priyachelli",
              instagram: aboutData[0].profileLinks?.instagram || "https://instagram.com/drpriyachelli",
              email: aboutData[0].profileLinks?.email || "priya.chelli@email.com"
            }
          });
        }
      } catch (error) {
        console.error('Error loading summary data:', error);
        // Fallback to default data
        setSummary({
          name: "Dr. Kalyani Sadanala, PT",
          profileLinks: {
            linkedin: "https://linkedin.com/in/priyachelli",
            instagram: "https://instagram.com/drpriyachelli",
            email: "priya.chelli@email.com"
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadSummaryData();
  }, []);

  if (loading) {
    return (
      <footer id="contact" className="bg-background text-text py-12 relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <p className="text-[8px] sm:text-text-secondary">Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer id="contact" className="bg-background text-text py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-surface/20 to-surface/40"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-heading font-bold gradient-text neon-text mb-2 sm:mb-4">
            Get in Touch
          </h2>
          <p className="text-[10px] sm:text-base text-text-secondary max-w-2xl mx-auto">
            Ready to start your journey? Let's connect and discuss your needs
          </p>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row flex-nowrap gap-3 sm:gap-6 md:overflow-x-auto pb-4 md:scrollbar-hide mb-8 sm:mb-12 max-w-full">
            {/* Contact Info */}
            <div className="md:flex-shrink-0 w-full md:w-[250px]">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Subject-%20Enquiry%20about%20Physiotherapy%20Services%20and%20Appointments&body=Content-%20I%20would%20like%20to%20contact%20you%20regarding%20your%20physiotherapy%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="crypto-card text-center p-2 sm:p-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 neon-glow">
                    <FaEnvelope className="w-5 h-5 text-background sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-[10px] sm:text-xs font-heading font-bold text-text mb-1 sm:mb-2">Email</h3>
                  <span className="text-[8px] sm:text-xs hover:text-primary transition-colors duration-300">
                    example@gmail.com
                  </span>
                </div>
              </a>
            </div>

            {/* Social Links */}
            <div className="md:flex-shrink-0 w-full md:w-[250px]">
              <div className="crypto-card text-center p-2 sm:p-3">
                <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 neon-glow">
                  <FaLinkedin className="w-5 h-5 text-background sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-[10px] sm:text-xs font-heading font-bold text-text mb-1 sm:mb-2">LinkedIn</h3>
                <a
                  href={summary.profileLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[8px] sm:text-xs hover:text-primary transition-colors duration-300"
                >
                  Connect with me
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="md:flex-shrink-0 w-full md:w-[250px]">
              <div className="crypto-card text-center p-2 sm:p-3">
                <div className="w-10 h-10 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-6 neon-glow">
                  <FaInstagram className="w-5 h-5 text-background sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-[10px] sm:text-xs font-heading font-bold text-text mb-1 sm:mb-2">Instagram</h3>
                <a
                  href={summary.profileLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[8px] sm:text-xs hover:text-primary transition-colors duration-300"
                >
                  Follow my journey
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="crypto-card max-w-2xl mx-auto p-3 sm:p-4">
            <h3 className="text-[10px] sm:text-xl font-heading font-bold text-text mb-2 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-[8px] sm:text-text-secondary mb-3 sm:mb-6">
              Book your appointment today and take the first step towards better health
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <button className="glass-button text-[10px] sm:text-base py-1 sm:py-2 px-2 sm:px-4">
                <span className="flex items-center gap-1 sm:gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Book Appointment
                </span>
              </button>
              <button className="btn-success text-[10px] sm:text-base py-1 sm:py-2 px-2 sm:px-4">
                <span className="flex items-center gap-1 sm:gap-2">
                  <FaPhone className="w-2 h-2 sm:w-3 sm:h-3" />
                  Call Now
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 sm:mt-12 pt-3 sm:pt-6 border-t border-glass-border text-center">
          <p className="text-[8px] sm:text-text-secondary">
            © 2024 {summary.name}. All rights reserved. | Built with modern technology
          </p>
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 sm:mt-4">
            <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse sm:w-2 sm:h-2"></div>
            <span className="text-[8px] sm:text-xs text-text-secondary">Live & Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;