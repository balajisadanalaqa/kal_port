import React, { useState, useEffect } from "react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaCode, FaGithub } from "react-icons/fa";

const fallbackFooterMeta = {
  developer: {
    label: "Developed by",
    linkText: "Click here",
    url: "https://github.com",
    icon: "code"
  }
};

const DeveloperIcon = ({ name }) => {
  const n = (name || "code").toLowerCase();
  if (n === "github") return <FaGithub className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />;
  return <FaCode className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" aria-hidden />;
};

const Footer = () => {
  const fallbackSummary = {
    name: "Dr. Kalyani Sadanala, PT",
    profileLinks: {
      linkedin: "https://linkedin.com/in/priyachelli",
      instagram: "https://instagram.com/drpriyachelli",
      email: "priya.chelli@email.com"
    }
  };

  const [summary, setSummary] = useState(fallbackSummary);
  const [footerMeta, setFooterMeta] = useState(fallbackFooterMeta);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        const [aboutRes, footerRes] = await Promise.all([
          fetch("/data/about.json"),
          fetch("/data/footer.json")
        ]);

        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          setSummary({
            name: aboutData.name || fallbackSummary.name,
            profileLinks: {
              linkedin: aboutData.profileLinks?.linkedin || fallbackSummary.profileLinks.linkedin,
              instagram: aboutData.profileLinks?.instagram || fallbackSummary.profileLinks.instagram,
              email: aboutData.profileLinks?.email || fallbackSummary.profileLinks.email
            }
          });
        } else {
          setSummary(fallbackSummary);
        }

        if (footerRes.ok) {
          const footerData = await footerRes.json();
          const d = footerData?.developer;
          if (d && typeof d.url === "string") {
            setFooterMeta({
              developer: {
                label: d.label || fallbackFooterMeta.developer.label,
                linkText: d.linkText || fallbackFooterMeta.developer.linkText,
                url: d.url,
                icon: d.icon || fallbackFooterMeta.developer.icon
              }
            });
          }
        }
      } catch (error) {
        console.error('Error loading summary data:', error);
        setSummary(fallbackSummary);
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

        <div className="flex justify-center px-1">
          <div className="mb-8 grid w-full max-w-md grid-cols-3 gap-2 sm:mb-12 sm:max-w-2xl sm:gap-4 md:flex md:max-w-none md:flex-nowrap md:justify-center md:gap-6 md:overflow-x-auto md:pb-4 md:scrollbar-hide">
            {/* Email */}
            <div className="min-w-0 md:w-[250px] md:flex-shrink-0">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(summary.profileLinks.email)}&su=${encodeURIComponent("Enquiry about Physiotherapy Services")}&body=${encodeURIComponent("I would like to contact you regarding your physiotherapy services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full min-h-[100px] sm:min-h-0"
              >
                <div className="crypto-card flex h-full min-h-[inherit] flex-col items-center justify-center rounded-xl px-1 py-2 text-center sm:p-3 md:mt-4 md:rounded-2xl">
                  <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-primary neon-glow sm:mb-3 sm:h-10 sm:w-10 md:mb-6 md:h-10 md:w-10">
                    <FaEnvelope className="h-4 w-4 text-background sm:h-5 sm:w-5 md:h-7 md:w-7" />
                  </div>
                  <h3 className="font-heading text-[8px] font-bold leading-tight text-text sm:text-[10px] md:mb-2 md:text-xs">
                    Email
                  </h3>
                  <span className="line-clamp-2 max-w-full break-all text-[7px] text-text-secondary transition-colors duration-300 hover:text-primary sm:text-[8px] md:text-xs">
                    {summary.profileLinks.email}
                  </span>
                </div>
              </a>
            </div>

            {/* LinkedIn */}
            <div className="min-w-0 md:w-[250px] md:flex-shrink-0">
              <a
                href={summary.profileLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full min-h-[100px] sm:min-h-0"
              >
                <div className="crypto-card flex h-full min-h-[inherit] flex-col items-center justify-center rounded-xl px-1 py-2 text-center sm:p-3 md:mt-4 md:rounded-2xl">
                  <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-secondary neon-glow sm:mb-3 sm:h-10 sm:w-10 md:mb-6 md:h-10 md:w-10">
                    <FaLinkedin className="h-4 w-4 text-background sm:h-5 sm:w-5 md:h-7 md:w-7" />
                  </div>
                  <h3 className="font-heading text-[8px] font-bold leading-tight text-text sm:text-[10px] md:mb-2 md:text-xs">
                    LinkedIn
                  </h3>
                  <span className="text-[7px] text-text-secondary transition-colors duration-300 hover:text-primary sm:text-[8px] md:text-xs">
                    <span className="md:hidden">Connect</span>
                    <span className="hidden md:inline">Connect with me</span>
                  </span>
                </div>
              </a>
            </div>

            {/* Instagram */}
            <div className="min-w-0 md:w-[250px] md:flex-shrink-0">
              <a
                href={summary.profileLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full min-h-[100px] sm:min-h-0"
              >
                <div className="crypto-card flex h-full min-h-[inherit] flex-col items-center justify-center rounded-xl px-1 py-2 text-center sm:p-3 md:mt-4 md:rounded-2xl">
                  <div className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-success neon-glow sm:mb-3 sm:h-10 sm:w-10 md:mb-6 md:h-10 md:w-10">
                    <FaInstagram className="h-4 w-4 text-background sm:h-5 sm:w-5 md:h-7 md:w-7" />
                  </div>
                  <h3 className="font-heading text-[8px] font-bold leading-tight text-text sm:text-[10px] md:mb-2 md:text-xs">
                    Instagram
                  </h3>
                  <span className="text-[7px] text-text-secondary transition-colors duration-300 hover:text-primary sm:text-[8px] md:text-xs">
                    <span className="md:hidden">Follow</span>
                    <span className="hidden md:inline">Follow my journey</span>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="text-center">
          <div className="crypto-card max-w-2xl mx-auto p-3 sm:p-4 mt-4">
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
        </div> */}

        {/* Footer Bottom */}
        <div className="mt-8 sm:mt-12 pt-3 sm:pt-6 border-t border-glass-border text-center">
          <p className="text-[8px] sm:text-text-secondary">
            © 2024 {summary.name}. All rights reserved. | Built with modern technology
          </p>

          <a
            href={footerMeta.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${footerMeta.developer.label} — ${footerMeta.developer.linkText}`}
            className="mt-2 inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[7px] text-text-secondary transition-colors hover:bg-surface/60 hover:text-primary sm:mt-3 sm:gap-2 sm:text-xs"
          >
            <span className="font-medium">{footerMeta.developer.label}</span>
            <DeveloperIcon name={footerMeta.developer.icon} />
            <span className="font-semibold text-primary underline decoration-primary/40 underline-offset-2 sm:font-bold">
              {footerMeta.developer.linkText}
            </span>
          </a>

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