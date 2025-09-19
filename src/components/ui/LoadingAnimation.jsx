import React, { useState, useEffect } from "react";
import { useScrollAnimation } from "../../hooks/useAnimations";
import "./LoadingAnimation.css";

const LoadingAnimation = ({
  isLoading,
  type = "skeleton",
  delay = 0,
  children,
}) => {
  const [showContent, setShowContent] = useState(false);
  const { elementRef, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, delay]);

  if (isLoading || !showContent) {
    switch (type) {
      case "skeleton":
        return (
          <div ref={elementRef} className="loading-skeleton">
            <div className="skeleton-item"></div>
          </div>
        );

      case "pulse":
        return (
          <div ref={elementRef} className="loading-pulse">
            <div className="pulse-circle"></div>
            <div className="pulse-circle"></div>
            <div className="pulse-circle"></div>
          </div>
        );

      case "spinner":
        return (
          <div ref={elementRef} className="loading-spinner">
            <div className="spinner"></div>
          </div>
        );

      case "wave":
        return (
          <div ref={elementRef} className="loading-wave">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        );

      case "dots":
        return (
          <div ref={elementRef} className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );

      default:
        return (
          <div ref={elementRef} className="loading-skeleton">
            <div className="skeleton-item"></div>
          </div>
        );
    }
  }

  return (
    <div
      ref={elementRef}
      className={`content-wrapper ${isVisible ? "animate-in" : ""}`}
    >
      {children}
    </div>
  );
};

// Image Loading Component
export const ImageLoader = ({
  src,
  alt,
  className,
  loadingType = "skeleton",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`image-loader ${className || ""}`}>
      <LoadingAnimation isLoading={isLoading} type={loadingType}>
        {hasError ? (
          <div className="image-error">
            <span>Failed to load image</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </LoadingAnimation>
    </div>
  );
};

// Content Loading Component
export const ContentLoader = ({
  isLoading,
  children,
  type = "skeleton",
  minHeight = "200px",
}) => {
  return (
    <div style={{ minHeight }}>
      <LoadingAnimation isLoading={isLoading} type={type}>
        {children}
      </LoadingAnimation>
    </div>
  );
};

// Page Loading Component
export const PageLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="page-loader">
      <div className="page-loader-content">
        <div className="logo-loader">
          <div className="logo-text">G</div>
          <div className="loading-ring"></div>
        </div>
        <div className="loading-text">Loading...</div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
