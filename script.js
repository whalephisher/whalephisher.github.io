// Whalephisher Portfolio – Award-level, modern, interactive, and easy to update.
// Handles: theme toggle, nav highlight, smooth scroll, parallax bg, and year update.

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const toggle = document.getElementById('theme-toggle');
    let dark = false;
    toggle.addEventListener('click', () => {
        dark = !dark;
        document.body.classList.toggle('dark', dark);
        toggle.innerHTML = dark ? '🌙' : '☀️';
    });
    toggle.innerHTML = '☀️';

    // Nav highlight on scroll
    const navLinks = document.querySelectorAll('.nav-list a');
    const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    function setActive(id) {
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    }
    const so = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { threshold: 0.5 });
    sections.forEach(s => s && so.observe(s));

    // Parallax bg effect
    const bg = document.getElementById('bg-canvas');
    window.addEventListener('scroll', () => {
        if (!bg) return;
        const y = window.scrollY;
        bg.style.backgroundPosition = `70% ${10 + y * 0.04}% , 20% ${90 - y * 0.03}%`;
    });

    // Smooth scroll for nav
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
