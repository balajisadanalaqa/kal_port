import React from "react";
import { reviews } from "../data/reviewData";

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold gradient-text neon-text mb-4">
            Patient Reviews
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            What my patients say about their experience and treatment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, idx) => (
            <div key={idx} className="group" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="crypto-card h-full hover:scale-105 transition-all duration-300">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center neon-glow">
                      <span className="text-lg font-bold text-background">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text text-lg">
                        {review.name}
                      </h3>
                      <p className="text-sm text-text-secondary">{review.treatment}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'text-accent' : 'text-glass-border'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <div className="relative">
                  <svg
                    className="absolute -top-2 -left-2 w-8 h-8 text-primary/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-text-secondary leading-relaxed pl-6">
                    {review.feedback}
                  </p>
                </div>

                {/* Review Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-glass-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-text-secondary">Verified Patient</span>
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {review.rating}/5 Rating
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating Card */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="crypto-card text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-accent"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h3 className="text-2xl font-heading font-bold text-text mb-2">
              Excellent Patient Satisfaction
            </h3>
            <p className="text-text-secondary">
              Based on {reviews.length} verified patient reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;