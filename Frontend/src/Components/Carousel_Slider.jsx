import React, { useState, useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import '../App.css'; // Ensure this line imports your CSS

export default function Carousel_Slider() {
  const slides = [
    { url: "https://picsum.photos/800/600?random=1" },
    { url: "https://picsum.photos/800/600?random=2" },
    { url: "https://picsum.photos/800/600?random=3" },
    { url: "https://picsum.photos/800/600?random=4" },
    { url: "https://picsum.photos/800/600?random=5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slider-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{ backgroundImage: `url(${slide.url})` }}
          className={`slider-image ${index === currentIndex ? 'active' : ''}`}
        ></div>
      ))}
      <div className="slider-controls px-10">
        <div className="slider-control-left" onClick={prevSlide}>
          <BsChevronCompactLeft size={30} />
        </div>
        <div className="slider-control-right" onClick={nextSlide}>
          <BsChevronCompactRight size={30} />
        </div>
      </div>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
