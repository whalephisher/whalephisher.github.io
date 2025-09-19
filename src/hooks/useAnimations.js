import { useEffect, useRef, useState } from 'react';

// Custom hook for intersection observer animations
export const useScrollAnimation = (options = {}) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', once = true } = options;

    useEffect(() => {
        const element = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, we can optionally stop observing
                    if (once !== false) {
                        observer.unobserve(entry.target);
                    }
                } else if (once === false) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin,
                ...options
            }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, once, options]);

    return [ref, isVisible];
};

// Custom hook for typewriter effect with scroll reset
export const useTypewriter = (text, speed = 50, startDelay = 0) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const [shouldRestart, setShouldRestart] = useState(0);

    useEffect(() => {
        if (!text) return;

        let timeoutId;
        let currentIndex = 0;
        let isCancelled = false;

        // Always reset when effect runs
        setDisplayText('');
        setIsTyping(false);
        setShowCursor(false);

        const startTyping = () => {
            if (isCancelled) return;

            setIsTyping(true);
            setShowCursor(true);

            const typeNextChar = () => {
                if (isCancelled) return;

                if (currentIndex < text.length) {
                    setDisplayText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeoutId = setTimeout(typeNextChar, speed);
                } else {
                    setIsTyping(false);
                    // Keep cursor blinking briefly after typing is done
                    timeoutId = setTimeout(() => {
                        if (!isCancelled) {
                            setShowCursor(false);
                        }
                    }, 1000);
                }
            };

            typeNextChar();
        };

        timeoutId = setTimeout(startTyping, startDelay);

        return () => {
            isCancelled = true;
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [text, speed, startDelay, shouldRestart]);

    // Function to restart the typewriter effect
    const restart = () => {
        setShouldRestart(prev => prev + 1);
    };

    return { displayText, isTyping, showCursor, restart };
};

// Custom hook for typewriter effect with scroll detection
export const useScrollTypewriter = (text, speed = 50, startDelay = 0, options = {}) => {
    const [ref, isVisible] = useScrollAnimation({
        once: false, // Allow retriggering
        threshold: 0.1, // Very low threshold for better detection
        rootMargin: '50px 0px -50px 0px', // Start earlier, stop later
        ...options
    });
    const { displayText, isTyping, showCursor, restart } = useTypewriter(text, speed, startDelay);

    useEffect(() => {
        if (isVisible) {
            // Immediately restart when coming into view
            restart();
        }
    }, [isVisible, restart]);

    return { ref, displayText, isTyping, showCursor };
};

// Custom hook for smooth scroll to element
export const useSmoothScroll = () => {
    const scrollToElement = (elementId, offset = 0) => {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return scrollToElement;
};

// Custom hook for mouse position tracking
export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return mousePosition;
};

// Custom hook for parallax effect
export const useParallax = (speed = 0.5) => {
    const [offset, setOffset] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const scrolled = window.pageYOffset;
                const elementTop = ref.current.getBoundingClientRect().top + scrolled;
                const windowHeight = window.innerHeight;

                // Only apply parallax when element is in view
                if (scrolled + windowHeight > elementTop && scrolled < elementTop + ref.current.offsetHeight) {
                    setOffset((scrolled - elementTop) * speed);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return [ref, offset];
};