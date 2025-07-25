// BlurTextAnimation class - similar to reactbits.dev/text-animations/blur-text
class BlurTextAnimation {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      text: element.textContent,
      animateBy: options.animateBy || 'words', // 'words', 'characters'
      direction: options.direction || 'random', // 'left-to-right', 'right-to-left', 'random'
      delay: options.delay || 0,
      stepDuration: options.stepDuration || 0.05,
      blurAmount: options.blurAmount || '5px',
      initialOpacity: options.initialOpacity || 0.3
    };
    
    this.init();
  }
  
  init() {
    // Clear the element
    this.element.innerHTML = '';
    this.element.classList.add('blur-text-container');
    
    // Split text based on animateBy option
    let items = [];
    if (this.options.animateBy === 'words') {
      items = this.options.text.split(' ').map(word => word + ' ');
    } else {
      items = this.options.text.split('');
    }
    
    // Create spans for each item
    this.spans = items.map((item, index) => {
      const span = document.createElement('span');
      span.textContent = item;
      span.classList.add('blur-text-item');
      span.style.opacity = this.options.initialOpacity;
      span.style.filter = `blur(${this.options.blurAmount})`;
      this.element.appendChild(span);
      return span;
    });
    
    // Determine animation order based on direction
    let order = [...Array(this.spans.length).keys()];
    if (this.options.direction === 'right-to-left') {
      order.reverse();
    } else if (this.options.direction === 'random') {
      order = this.shuffleArray(order);
    }
    
    // Animate each item
    order.forEach((itemIndex, orderIndex) => {
      setTimeout(() => {
        this.spans[itemIndex].style.opacity = '1';
        this.spans[itemIndex].style.filter = 'blur(0px)';
      }, this.options.delay + orderIndex * (this.options.stepDuration * 1000));
    });
  }
  
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }
}