import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { summary } from "../data/summaryData";

const Footer = () => {
  return (
    <footer id="contact" className="bg-background text-text py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-surface/20 to-surface/40"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text neon-text mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ready to start your journey? Let's connect and discuss your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=example@gmail.com&su=Subject-%20Enquiry%20about%20Physiotherapy%20Services%20and%20Appointments&body=Content-%20I%20would%20like%20to%20contact%20you%20regarding%20your%20physiotherapy%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="crypto-card text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
                <FaEnvelope className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text mb-2">Email</h3>
              <span className="text-text-secondary hover:text-primary transition-colors duration-300">
                example@gmail.com
              </span>
            </div>
          </a>

          {/* Social Links */}
          <div className="crypto-card text-center">
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
              <FaLinkedin className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-heading font-bold text-text mb-2">LinkedIn</h3>
            <a
              href={summary.profileLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-300"
            >
              Connect with me
            </a>
          </div>

          {/* Instagram */}
          <div className="crypto-card text-center">
            <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6 neon-glow">
              <FaInstagram className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-xl font-heading font-bold text-text mb-2">Instagram</h3>
            <a
              href={summary.profileLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary transition-colors duration-300"
            >
              Follow my journey
            </a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="crypto-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-text mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-text-secondary mb-6">
              Book your appointment today and take the first step towards better health
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="glass-button">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Book Appointment
                </span>
              </button>
              <button className="btn-success">
                <span className="flex items-center gap-2">
                  <FaPhone className="w-4 h-4" />
                  Call Now
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-glass-border text-center">
          <p className="text-text-secondary">
            © 2024 {summary.name}. All rights reserved. | Built with modern technology
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-text-secondary">Live & Secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;