// ============================================
//  FARSI LABAN — Interactive Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  // ---- Hamburger menu ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on nav link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });


  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link:not(.nav-cta)').forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.style.color = 'var(--blue-vibrant)';
      }
    });
  }, { passive: true });


  // ---- Back to Top ----
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ---- Intersection Observer for AOS-style animations ----
  const animatedEls = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || 0;
        setTimeout(() => {
          el.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedEls.forEach(el => observer.observe(el));


  // ---- Flavor Card hover tilt effect ----
  document.querySelectorAll('.flavor-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX = ((y - centerY) / centerY) * -4;
      const rotY = ((x - centerX) / centerX) * 4;
      card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ---- Bowl card hover ripple ----
  document.querySelectorAll('.bowl-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute; border-radius: 50%;
        background: rgba(255,255,255,0.4);
        width: 10px; height: 10px;
        transform: scale(0);
        pointer-events: none;
        animation: ripple-anim 0.6s ease-out forwards;
      `;
      const rect = card.getBoundingClientRect();
      ripple.style.left = `${e.clientX - rect.left - 5}px`;
      ripple.style.top = `${e.clientY - rect.top - 5}px`;
      card.style.position = 'relative';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Add ripple animation keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(20); opacity: 0; }
    }
  `;
  document.head.appendChild(style);


  // ---- Gallery lightbox effect ----
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');

      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        background: rgba(10, 20, 60, 0.95);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; transition: opacity 0.3s ease;
        cursor: pointer; padding: 40px;
        backdrop-filter: blur(8px);
      `;

      const imgClone = document.createElement('img');
      imgClone.src = img.src;
      imgClone.alt = img.alt;
      imgClone.style.cssText = `
        max-width: 90vw; max-height: 85vh;
        border-radius: 16px;
        box-shadow: 0 40px 100px rgba(0,0,0,0.5);
        transform: scale(0.9);
        transition: transform 0.3s ease;
      `;

      const captionEl = document.createElement('div');
      captionEl.textContent = caption ? caption.textContent : '';
      captionEl.style.cssText = `
        position: fixed; bottom: 40px; left: 50%;
        transform: translateX(-50%);
        color: white; font-family: Outfit, sans-serif;
        font-size: 1rem; font-weight: 600;
        background: rgba(255,255,255,0.1);
        padding: 10px 28px; border-radius: 50px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
      `;

      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = `
        position: fixed; top: 24px; right: 32px;
        background: rgba(255,255,255,0.1);
        color: white; border: 1px solid rgba(255,255,255,0.3);
        width: 44px; height: 44px; border-radius: 50%;
        font-size: 1rem; cursor: pointer;
        transition: background 0.2s;
      `;
      closeBtn.addEventListener('mouseover', () => { closeBtn.style.background = 'rgba(255,255,255,0.25)'; });
      closeBtn.addEventListener('mouseout', () => { closeBtn.style.background = 'rgba(255,255,255,0.1)'; });

      lightbox.appendChild(imgClone);
      lightbox.appendChild(captionEl);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);

      // Prevent scroll
      document.body.style.overflow = 'hidden';

      // Animate in
      requestAnimationFrame(() => {
        lightbox.style.opacity = '1';
        imgClone.style.transform = 'scale(1)';
      });

      const close = () => {
        lightbox.style.opacity = '0';
        imgClone.style.transform = 'scale(0.9)';
        document.body.style.overflow = '';
        setTimeout(() => lightbox.remove(), 300);
      };

      lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
      closeBtn.addEventListener('click', close);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
    });
  });


  // ---- Smooth counter animation for stats ----
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        const isPlus = target.includes('+');
        const isK = target.includes('k');
        const num = parseFloat(target);
        let current = 0;
        const duration = 1500;
        const step = num / (duration / 16);

        const timer = setInterval(() => {
          current += step;
          if (current >= num) {
            current = num;
            clearInterval(timer);
          }
          let display = Math.floor(current).toString();
          if (isK) display = (current / 1000).toFixed(0) + 'k';
          el.textContent = display + (isPlus ? '+' : '');
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => {
    const text = el.textContent;
    const isK = text.includes('k');
    if (isK) {
      el.setAttribute('data-target', parseFloat(text) * 1000);
    } else {
      el.setAttribute('data-target', parseFloat(text));
    }
    counterObserver.observe(el);
  });


  // ---- Story images parallax ----
  window.addEventListener('scroll', () => {
    const storySection = document.getElementById('story');
    if (!storySection) return;
    const rect = storySection.getBoundingClientRect();
    const windowH = window.innerHeight;
    if (rect.top < windowH && rect.bottom > 0) {
      const progress = (windowH - rect.top) / (windowH + rect.height);
      const imgMain = storySection.querySelector('.story-img-main img');
      const imgSec = storySection.querySelector('.story-img-secondary img');
      if (imgMain) imgMain.style.transform = `scale(1.06) translateY(${-progress * 20}px)`;
      if (imgSec) imgSec.style.transform = `scale(1.06) translateY(${progress * 14}px)`;
    }
  }, { passive: true });


  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ---- Order box animated border ----
  document.querySelectorAll('.order-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
      box.style.borderColor = 'rgba(255,255,255,0.4)';
    });
    box.addEventListener('mouseleave', () => {
      box.style.borderColor = 'rgba(255,255,255,0.18)';
    });
  });


  // ---- Page load animation ----
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Trigger hero animations after short delay
    setTimeout(() => {
      document.querySelectorAll('.hero [data-aos]').forEach(el => {
        el.classList.add('aos-animate');
      });
    }, 200);
  });

});
