// Simple animation initialization
document.addEventListener('DOMContentLoaded', function() {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  
  // Animate header title
  const headerTitle = document.getElementById('header-title');
  if (headerTitle) {
    gsap.to(headerTitle, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
  
  // Animate main heading
  const mainHeading = document.querySelector('.main-heading');
  if (mainHeading) {
    gsap.from(mainHeading, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power2.out'
    });
  }
  
  // Animate welcome text
  const welcomeText = document.querySelector('.welcome');
  if (welcomeText) {
    gsap.from(welcomeText, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
  
  // Animate other main text
  const mainTexts = document.querySelectorAll('.main-text:not(.welcome)');
  if (mainTexts.length > 0) {
    mainTexts.forEach((text, index) => {
      gsap.from(text, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2 + (index * 0.1),
        ease: 'power2.out'
      });
    });
  }
  
  // Animate about section
  const aboutSection = document.querySelector('.About');
  if (aboutSection) {
    gsap.from(aboutSection, {
      scrollTrigger: {
        trigger: aboutSection,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }
});