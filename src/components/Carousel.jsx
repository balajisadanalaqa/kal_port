import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Carousel = ({ slides }) => {
  return (
    <section className="py-14 md:py-20 bg-background relative">
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-4xl font-heading font-extrabold text-text mb-10 md:mb-14">
          What Patients Say
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          loop
          allowTouchMove
          className="testimonials-swiper"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-2xl border border-border bg-surface/80 p-6 md:p-10 shadow-md">
                <p className="text-lg md:text-xl font-semibold text-text leading-relaxed mb-6">
                  "{slide.review}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-text text-base md:text-lg">
                    {slide.name}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 md:w-6 md:h-6 ${i < slide.rating ? 'text-accent' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(0,0,0,0.2);
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.2s ease;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: var(--color-primary, #0ea5e9);
          transform: scale(1.15);
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