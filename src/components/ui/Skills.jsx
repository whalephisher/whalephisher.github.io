import React, { useEffect, useRef } from "react";
import { skillsData } from "../../data/portfolioData";
import "./Skills.css";

const Skills = () => {
  const skillsRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const tags = skillsRef.current?.querySelectorAll(".skill-tag");
    const canvas = canvasRef.current;
    if (!tags || !canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particle system
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.005;
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = '#3cbbb1';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create dynamic skill network animation
    const createSkillNetwork = () => {
      const networkParticles = [];
      for (let i = 0; i < 50; i++) {
        networkParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }

      const animateNetwork = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw network particles
        networkParticles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Draw particle
          ctx.fillStyle = 'rgba(60, 187, 177, 0.3)';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          // Draw connections
          networkParticles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.strokeStyle = `rgba(60, 187, 177, ${0.2 * (1 - distance / 100)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
            }
          });
        });

        // Draw and update explosion particles
        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          particles[i].draw();
          if (particles[i].life <= 0) {
            particles.splice(i, 1);
          }
        }

        requestAnimationFrame(animateNetwork);
      };

      animateNetwork();
    };

    createSkillNetwork();

    // Animate skill tags with magnetic field effect
    tags.forEach((tag, i) => {
      tag.style.opacity = "0";
      tag.style.transform = "translateY(-30px) rotate(10deg) scale(0)";
      tag.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";

      // Add hover effect with particles
      tag.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - canvasRect.left;
        const y = rect.top + rect.height / 2 - canvasRect.top;

        // Create particle burst
        for (let j = 0; j < 15; j++) {
          particles.push(new Particle(x, y));
        }
      });

      setTimeout(() => {
        tag.style.opacity = "1";
        tag.style.transform = "translateY(0) rotate(0deg) scale(1)";
      }, 60 * i);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="skills-container" ref={skillsRef}>
      <canvas ref={canvasRef} className="skills-canvas" />
      <div className="skills-tags">
        {skillsData.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
