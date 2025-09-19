import React, { useEffect, useRef } from "react";
import { useMousePosition } from "../hooks/useAnimations";
import "./CustomCursor.css";

const CustomCursor = () => {
  const mousePosition = useMousePosition();
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const isTouch = useRef(false);

  useEffect(() => {
    // Check if device supports touch
    isTouch.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouch.current) {
      // Hide custom cursor on touch devices
      if (cursorRef.current) cursorRef.current.style.display = "none";
      if (trailRef.current) trailRef.current.style.display = "none";
      return;
    }

    // Hide default cursor
    document.body.style.cursor = "none";

    // Handle mouse enter/leave for interactive elements
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("hover");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("hover");
      }
    };

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .portfolio-card, .about-tab, .skill-tag, .tech-tag"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.body.style.cursor = "auto";
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    if (isTouch.current) return;

    if (cursorRef.current) {
      cursorRef.current.style.left = mousePosition.x + "px";
      cursorRef.current.style.top = mousePosition.y + "px";
    }

    if (trailRef.current) {
      // Add slight delay for trail effect
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = mousePosition.x + "px";
          trailRef.current.style.top = mousePosition.y + "px";
        }
      }, 50);
    }
  }, [mousePosition]);

  if (isTouch.current) {
    return null; // Don't render on touch devices
  }

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
};

export default CustomCursor;
