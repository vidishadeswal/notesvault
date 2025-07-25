// Rotating Text Animation - inspired by reactbits.dev/text-animations/rotating-text
class RotatingTextAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      texts: options.texts || [element.textContent],
      rotationInterval: options.rotationInterval || 2000,
      initialOpacity: options.initialOpacity || 0,
      initialY: options.initialY || '100%',
      exitY: options.exitY || '-120%',
      staggerDuration: options.staggerDuration || 0.05,
      loop: options.loop !== undefined ? options.loop : true,
      ...options
    };
    
    this.currentIndex = 0;
    this.isAnimating = false;
    this.init();
  }
  
  init() {
    // Create container for the rotating text
    this.container = document.createElement('div');
    this.container.className = 'rotating-text-container';
    this.container.style.position = 'relative';
    this.container.style.display = 'inline-block';
    this.container.style.overflow = 'hidden';
    this.container.style.height = this.element.offsetHeight + 'px';
    
    // Replace the original element with our container
    this.element.parentNode.replaceChild(this.container, this.element);
    
    // Start the rotation
    this.showText(this.currentIndex);
    
    if (this.options.loop) {
      this.startRotation();
    }
  }
  
  showText(index) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    // Create text element
    const textElement = document.createElement('div');
    textElement.className = 'rotating-text-item';
    textElement.style.position = 'absolute';
    textElement.style.top = '0';
    textElement.style.left = '0';
    textElement.style.width = '100%';
    textElement.style.opacity = this.options.initialOpacity;
    textElement.style.transform = `translateY(${this.options.initialY})`;
    
    // Split text into characters or words
    const text = this.options.texts[index];
    const characters = text.split('');
    
    characters.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      span.style.opacity = this.options.initialOpacity;
      span.style.transform = `translateY(${this.options.initialY})`;
      textElement.appendChild(span);
    });
    
    // Add to container
    this.container.appendChild(textElement);
    
    // Animate in
    const spans = textElement.querySelectorAll('span');
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: this.options.staggerDuration,
      ease: 'power2.out',
      onComplete: () => {
        this.isAnimating = false;
      }
    });
    
    // Store current text element
    this.currentTextElement = textElement;
  }
  
  hideCurrentText() {
    if (!this.currentTextElement) return Promise.resolve();
    
    return new Promise(resolve => {
      const spans = this.currentTextElement.querySelectorAll('span');
      gsap.to(spans, {
        opacity: 0,
        y: this.options.exitY,
        duration: 0.4,
        stagger: this.options.staggerDuration,
        ease: 'power2.in',
        onComplete: () => {
          if (this.currentTextElement && this.currentTextElement.parentNode) {
            this.currentTextElement.parentNode.removeChild(this.currentTextElement);
          }
          resolve();
        }
      });
    });
  }
  
  async rotateText() {
    if (this.isAnimating) return;
    
    await this.hideCurrentText();
    
    this.currentIndex = (this.currentIndex + 1) % this.options.texts.length;
    this.showText(this.currentIndex);
  }
  
  startRotation() {
    this.rotationInterval = setInterval(() => {
      this.rotateText();
    }, this.options.rotationInterval);
  }
  
  stopRotation() {
    clearInterval(this.rotationInterval);
  }
}

// Initialize rotating text animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const typeWriterText = document.getElementById('typeWriterText');
  if (typeWriterText) {
    new RotatingTextAnimation(typeWriterText, {
      texts: ['Subject', 'Branch', 'Semester', 'Topic', 'Category'],
      rotationInterval: 3000,
      initialY: '30px',
      exitY: '-30px',
      staggerDuration: 0.03,
      initialOpacity: 0
    });
  }
});