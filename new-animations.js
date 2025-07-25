// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
});

function initAnimations() {
  // Animate header title
  animateHeaderTitle();
  
  // Animate main heading and text with blur effect
  animateBlurTexts();
  
  // Animate feature cards
  animateFeatureCards();
  
  // Animate about section
  animateAboutSection();
}

function animateHeaderTitle() {
  const headerTitle = document.getElementById('header-title');
  if (!headerTitle) return;
  
  // Apply gradient animation (CSS handles this)
  
  // Add a subtle pulse animation
  gsap.to(headerTitle, {
    scale: 1.05,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
}

function animateBlurTexts() {
  // Animate main heading with blur effect
  const mainHeading = document.querySelector('.main-heading');
  if (mainHeading) {
    new BlurTextAnimation(mainHeading, {
      animateBy: 'words',
      direction: 'left-to-right',
      delay: 300,
      stepDuration: 0.08,
      blurAmount: '8px',
      initialOpacity: 0.1
    });
  }
  
  // Animate welcome text
  const welcomeText = document.querySelector('.welcome');
  if (welcomeText) {
    new BlurTextAnimation(welcomeText, {
      animateBy: 'characters',
      direction: 'random',
      delay: 100,
      stepDuration: 0.04
    });
  }
  
  // Animate other main text
  const mainTexts = document.querySelectorAll('.main-text:not(.welcome)');
  if (mainTexts.length > 0) {
    mainTexts.forEach((text, index) => {
      new BlurTextAnimation(text, {
        animateBy: 'words',
        direction: 'left-to-right',
        delay: 500 + (index * 200),
        stepDuration: 0.06
      });
    });
  }
}

function animateFeatureCards() {
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length === 0) return;
  
  featureCards.forEach((card, index) => {
    // Animate card entrance
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top bottom-=100',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power2.out'
    });
    
    // Animate card title with blur effect
    const cardTitle = card.querySelector('.card-title');
    if (cardTitle) {
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom-=150',
        onEnter: () => {
          new BlurTextAnimation(cardTitle, {
            animateBy: 'words',
            direction: 'random',
            delay: 300 + (index * 100),
            stepDuration: 0.07
          });
        },
        once: true
      });
    }
    
    // Animate card text with blur effect
    const cardText = card.querySelector('.card-text');
    if (cardText) {
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom-=150',
        onEnter: () => {
          new BlurTextAnimation(cardText, {
            animateBy: 'words',
            direction: 'left-to-right',
            delay: 500 + (index * 100),
            stepDuration: 0.05
          });
        },
        once: true
      });
    }
  });
}

function animateAboutSection() {
  const aboutSection = document.querySelector('.About');
  if (!aboutSection) return;
  
  // Animate section entrance
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
  
  // Animate about heading with blur effect
  const aboutHeading = aboutSection.querySelector('.About-left-heading');
  if (aboutHeading) {
    ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top bottom-=150',
      onEnter: () => {
        new BlurTextAnimation(aboutHeading, {
          animateBy: 'characters',
          direction: 'random',
          delay: 200,
          stepDuration: 0.04
        });
      },
      once: true
    });
  }
  
  // Animate about text with blur effect
  const aboutText = aboutSection.querySelector('.About-left-text');
  if (aboutText) {
    ScrollTrigger.create({
      trigger: aboutSection,
      start: 'top bottom-=150',
      onEnter: () => {
        new BlurTextAnimation(aboutText, {
          animateBy: 'words',
          direction: 'left-to-right',
          delay: 400,
          stepDuration: 0.06
        });
      },
      once: true
    });
  }
}