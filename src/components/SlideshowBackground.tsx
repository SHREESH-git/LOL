import { useState, useEffect } from "react";
import mentalHealthMeditation from "@/assets/mental-health-meditation.jpg";
import mentalHealthSupportGroup from "@/assets/mental-health-support-group.jpg";
import mentalHealthJournaling from "@/assets/mental-health-journaling.jpg";
import mentalHealthCounseling from "@/assets/mental-health-counseling.jpg";
import heroImage from "@/assets/hero-mental-health.jpg";

const images = [mentalHealthMeditation, mentalHealthSupportGroup, mentalHealthJournaling, mentalHealthCounseling, heroImage];

interface SlideshowBackgroundProps {
  className?: string;
}

export const SlideshowBackground = ({ className = "" }: SlideshowBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-0");

  useEffect(() => {
    // Preload first image
    const firstImage = new Image();
    firstImage.onload = () => {
      setIsLoaded(true);
      setFadeClass("opacity-100");
    };
    firstImage.src = images[0];

    const interval = setInterval(() => {
      setFadeClass("opacity-0");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFadeClass("opacity-100");
    }, 8000); // Change image every 8 seconds with seamless transitions

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden animate-fade-in ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
            index === currentIndex ? `${fadeClass} scale-100` : "opacity-0 scale-105"
          }`}
        >
          <img
            src={image}
            alt={`Mental health support slideshow ${index + 1}`}
            className="w-full h-full object-cover object-center transition-transform duration-[3000ms] ease-out"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}
      
      {/* Multi-layer overlay for optimal text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-primary-glow/30 to-accent/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/10" />
      <div className="absolute inset-0 bg-gradient-hero/60" />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-hero animate-pulse" />
      )}
    </div>
  );
};