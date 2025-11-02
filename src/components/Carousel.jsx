import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Carousel = ({ slides }) => {
  return (
    <section className="py-12 md:py-20 bg-background relative">
      {/* Background Elements */}
      <div className="absolute top-20 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold gradient-text neon-text mb-4">
            Featured Reviews
          </h2>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
            See what our patients are saying about their experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            loop
            allowTouchMove={true}
            touchStartPreventDefault={false}
            touchMoveStopPropagation={false}
            onTouchStart={(swiper, event) => {
              // Allow vertical scrolling
              if (Math.abs(event.touches[0].clientY - event.touches[0].clientY) > Math.abs(event.touches[0].clientX - event.touches[0].clientX)) {
                event.stopPropagation();
              }
            }}
            className="testimonials-swiper"
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <div className="crypto-card group hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col items-center text-center p-6 md:p-8">
                    {/* Patient Avatar */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 md:mb-6 neon-glow">
                      <span className="text-xl md:text-2xl font-bold text-background">
                        {slide.name.charAt(0)}
                      </span>
                    </div>

                    {/* Review Content */}
                    <div className="relative mb-4 md:mb-6">
                      <svg
                        className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-8 h-8 md:w-10 md:h-10 text-primary/20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-base md:text-lg text-text-secondary leading-relaxed pl-6 md:pl-8">
                        "{slide.review}"
                      </p>
                    </div>

                    {/* Patient Info */}
                    <div className="mb-3 md:mb-4">
                      <h3 className="text-lg md:text-xl font-heading font-bold text-text mb-1">
                        {slide.name}
                      </h3>
                      <p className="text-xs md:text-sm text-text-secondary">Verified Patient</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3 md:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 md:w-5 md:h-5 ${i < slide.rating ? 'text-accent' : 'text-glass-border'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-gradient-success rounded-full">
                      <div className="w-2 h-2 bg-background rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-background">Successfully Treated</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          background: var(--color-primary);
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
          transform: scale(1.2);
        }

        @media (max-width: 768px) {
          .testimonials-swiper .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </section>
  );
};

export default Carousel;