/* ==========================================
   FARSI LABAN — JavaScript
   Scroll animations, navbar, mobile menu
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- Mobile hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ---- Intersection Observer for animations ---- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  /* ---- Smooth active nav link highlighting ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.background = '';
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.background = 'var(--blue-100)';
            link.style.color = 'var(--blue-600)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ---- Staggered card entrance ---- */
  const cards = document.querySelectorAll('.flavour-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }, i * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.97)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    cardObserver.observe(card);
  });

  /* ---- Gallery image stagger ---- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
        }, i * 120);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)';
    galleryObserver.observe(item);
  });

  /* ---- Counter animation for stats ---- */
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        if (text === '∞' || text.includes('+') || text.includes('%')) {
          // Just animate opacity/scale for these special ones
          el.style.transform = 'scale(0.5)';
          el.style.opacity = '0';
          el.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease';
          requestAnimationFrame(() => {
            el.style.transform = 'scale(1)';
            el.style.opacity = '1';
          });
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  /* ---- Parallax subtle effect on hero ---- */
  const heroBlobBg = document.querySelector('.hero-bg-blobs');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBlobBg) {
      heroBlobBg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  }, { passive: true });

  /* ---- Float card tilt effect ---- */
  document.querySelectorAll('.float-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  });

  /* ---- Story images parallax ---- */
  const storySection = document.querySelector('.story');
  const storyImg1 = document.querySelector('.story-img-1');
  const storyImg2 = document.querySelector('.story-img-2');

  if (storySection && storyImg1 && storyImg2) {
    window.addEventListener('scroll', () => {
      const rect = storySection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = 1 - (rect.bottom / (window.innerHeight + storySection.offsetHeight));
        storyImg1.style.transform = `translateY(${progress * -20}px)`;
        storyImg2.style.transform = `translateY(${progress * 20}px)`;
      }
    }, { passive: true });
  }

});
