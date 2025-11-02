import React from "react";
import { summary } from "../data/summaryData";
import { reviews } from "../data/reviewData";

const NavBarBackground = () => {
  // Duplicate reviews for a seamless scrolling effect
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="fixed top-0 left-0 w-full h-14 z-10 pointer-events-none select-none overflow-hidden">
      {/* Animated Background - Same as Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <div className="absolute top-2 left-2 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse-glow"></div>
        <div className="absolute top-2 right-2 w-20 h-20 bg-secondary/10 rounded-full blur-xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-accent/5 rounded-full blur-xl animate-pulse-glow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Scrolling Images Background - Scaled down for NavBar */}
      <div className="absolute inset-0 w-full h-full flex items-center overflow-hidden">
        <div className="flex gap-2 animate-navbar-slide opacity-20 blur-sm" style={{ minWidth: '200%' }}>
          {duplicatedReviews.concat(duplicatedReviews).map((review, idx) => (
            <img
              key={idx}
              src={`https://picsum.photos/seed/${review.name.replace(/\s/g, '')}/100/100`}
              alt={review.name}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg object-cover shadow-sm"
              draggable="false"
            />
          ))}
        </div>
      </div>

      {/* Profile Image - Scaled down for NavBar */}
      <div className="absolute top-2 left-4 flex items-center gap-2 opacity-30">
        <img
          src="https://i.pravatar.cc/150?u=drchelli"
          alt={summary.name}
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-primary/20 object-cover shadow-sm"
        />
        <span className="text-xs md:text-sm font-heading font-bold gradient-text opacity-60">
          {summary.short_name}
        </span>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
    </div>
  );
};

export default NavBarBackground;