/**
 * Portfolio JavaScript - Main functionality
 * Handles navigation, animations, form validation, and interactive elements
 */

class PortfolioApp {
  constructor() {
    this.currentSection = 'home';
    this.isScrolling = false;
    this.animatedElements = new Set();
    
    this.init();
  } 

  init() {
    this.setupEventListeners();
    this.initializeNavigation();
    this.hideLoadingScreen();
    this.setupTypingAnimation();
    this.setupScrollAnimations();
    this.setupTabs();
    this.setupModal();
    this.setupBackToTop();
    this.setupStatCounters();
    this.setupContactForm();
    
    console.log('Portfolio app initialized successfully');
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => this.handleDOMContentLoaded());
    window.addEventListener('scroll', () => this.handleScroll());
    window.addEventListener('resize', () => this.handleResize());
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    const navItems = document.querySelectorAll('.nav-item a');
    navItems.forEach(item => {
      item.addEventListener('click', () => this.closeMobileMenu());
    });
  }

  handleDOMContentLoaded() {
    this.updateActiveNavLink();
    setTimeout(() => {
      this.checkScrollAnimations();
    }, 100);
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    }
  }

  initializeNavigation() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        this.scrollToSection(targetSection);
        this.closeMobileMenu();
      }
    }
  }

  scrollToSection(targetSection) {
    const headerOffset = 80;
    const elementPosition = targetSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  handleScroll() {
    if (!this.isScrolling) {
      window.requestAnimationFrame(() => {
        this.updateActiveNavLink();
        this.checkScrollAnimations();
        this.updateBackToTop();
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection && currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
          link.classList.add('active');
        }
      });
    }
  }

  handleResize() {
    if (window.innerWidth > 768) {
      this.closeMobileMenu();
    }
  }

  setupTypingAnimation() {
    const animatedRole = document.getElementById('animated-role');
    if (!animatedRole) return;

    const roles = [
      'Web Developer',
      'UI/UX Designer',
      'Problem Solver',
      'Creative Thinker',
      'Code Enthusiast'
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typeRole = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        currentCharIndex--;
        animatedRole.textContent = currentRole.substring(0, currentCharIndex);
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentRoleIndex = (currentRoleIndex + 1) % roles.length;
          setTimeout(typeRole, 500);
        } else {
          setTimeout(typeRole, 50);
        }
      } else {
        currentCharIndex++;
        animatedRole.textContent = currentRole.substring(0, currentCharIndex);
        
        if (currentCharIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeRole, 2000);
        } else {
          setTimeout(typeRole, 100);
        }
      }
    };

    setTimeout(typeRole, 1000);
  }

  setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animatedElements.add(entry.target);
            entry.target.classList.add('animate-in');
            
            if (entry.target.classList.contains('skill-progress')) {
              this.animateSkillBar(entry.target);
            }
            
            if (entry.target.classList.contains('stat-number')) {
              this.animateCounter(entry.target);
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      const animatedElements = document.querySelectorAll('.about-card, .project-card, .timeline-item, .skill-progress, .stat-number');
      animatedElements.forEach(el => observer.observe(el));
    }
  }

  checkScrollAnimations() {
    const elements = document.querySelectorAll('.about-card, .project-card, .timeline-item');
    
    elements.forEach(element => {
      if (this.isElementInViewport(element) && !this.animatedElements.has(element)) {
        this.animatedElements.add(element);
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }

  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  animateSkillBar(element) {
    const targetWidth = element.getAttribute('data-width');
    if (targetWidth) {
      setTimeout(() => {
        element.style.width = targetWidth + '%';
      }, 200);
    }
  }

  setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        button.classList.add('active');
        const targetPanel = document.getElementById(targetTab + '-panel');
        if (targetPanel) {
          targetPanel.classList.add('active');
          
          if (targetTab === 'skills') {
            setTimeout(() => {
              const skillBars = targetPanel.querySelectorAll('.skill-progress');
              skillBars.forEach(bar => this.animateSkillBar(bar));
            }, 100);
          }
        }
      });
    });
  }

  setupModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        this.closeModal();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
          this.closeModal();
        }
      });
    }
  }

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  updateBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }

  setupStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animateCounter(entry.target);
              observer.unobserve(entry.target);
            }
          });
        });
        observer.observe(stat);
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    };

    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('form-success');

    // Form validation
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      if (field) {
        field.addEventListener('blur', () => this.validateField(fieldName, field));
        field.addEventListener('focus', () => this.clearFieldError(fieldName));
      }
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      let isValid = true;
      Object.keys(fields).forEach(fieldName => {
        if (!this.validateField(fieldName, fields[fieldName])) {
          isValid = false;
        }
      });

      if (!isValid) return;

      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        form.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset form after delay
        setTimeout(() => {
          successMessage.classList.remove('show');
          form.style.display = 'block';
          form.reset();
        }, 3000);
        
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  validateField(fieldName, field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (!value) {
          isValid = false;
          errorMessage = 'Name is required';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          isValid = false;
          errorMessage = 'Email is required';
        } else if (!emailPattern.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email';
        }
        break;

      case 'subject':
        if (!value) {
          isValid = false;
          errorMessage = 'Subject is required';
        } else if (value.length < 5) {
          isValid = false;
          errorMessage = 'Subject must be at least 5 characters';
        }
        break;

      case 'message':
        if (!value) {
          isValid = false;
          errorMessage = 'Message is required';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = 'Message must be at least 10 characters';
        }
        break;
    }

    if (isValid) {
      this.clearFieldError(fieldName);
      field.classList.add('success');
    } else {
      this.showFieldError(fieldName, errorMessage);
      field.classList.add('error');
    }

    return isValid;
  }

  showFieldError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + '-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  clearFieldError(fieldName) {
    const errorElement = document.getElementById(fieldName + '-error');
    const field = document.getElementById(fieldName);
    
    if (errorElement) {
      errorElement.classList.remove('show');
    }
    
    if (field) {
      field.classList.remove('error', 'success');
    }
  }
}

// Project modal functionality
window.openProjectModal = function(projectId) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalTitle || !modalBody) return;

  const projects = {
    'number-guessing': {
      title: 'Number Guessing Game',
      content: `
        <div class="project-detail">
          <div class="project-overview">
            <h4>Project Overview</h4>
            <p>An interactive console-based number guessing game built with C++. The game generates a random number and challenges the player to guess it within a certain number of attempts.</p>
          </div>
          
          <div class="project-features">
            <h4>Key Features</h4>
            <ul>
              <li>Random number generation</li>
              <li>Input validation and error handling</li>
              <li>Difficulty levels (Easy, Medium, Hard)</li>
              <li>Score tracking system</li>
              <li>Hint system for better user experience</li>
            </ul>
          </div>
          
          <div class="project-tech">
            <h4>Technologies Used</h4>
            <div class="tech-tags">
              <span class="tag">C++</span>
              <span class="tag">STL</span>
              <span class="tag">Console Application</span>
            </div>
          </div>
        </div>
      `
    },
    'snake-water-gun': {
      title: 'Snake Water Gun Game',
      content: `
        <div class="project-detail">
          <div class="project-overview">
            <h4>Project Overview</h4>
            <p>A classic rock-paper-scissors variant implemented in C++ with computer AI and score tracking. Features engaging gameplay with strategic elements.</p>
          </div>
          
          <div class="project-features">
            <h4>Key Features</h4>
            <ul>
              <li>Computer AI with random strategy</li>
              <li>Score tracking and statistics</li>
              <li>Multiple game rounds</li>
              <li>Input validation</li>
              <li>Clear game interface</li>
            </ul>
          </div>
          
          <div class="project-tech">
            <h4>Technologies Used</h4>
            <div class="tech-tags">
              <span class="tag">C++</span>
              <span class="tag">Algorithm Design</span>
              <span class="tag">Game Logic</span>
            </div>
          </div>
        </div>
      `
    },
    'student-management': {
      title: 'Student Management System',
      content: `
        <div class="project-detail">
          <div class="project-overview">
            <h4>Project Overview</h4>
            <p>A comprehensive system for managing student records and grades with data persistence and search functionality. Built to handle academic data efficiently.</p>
          </div>
          
          <div class="project-features">
            <h4>Key Features</h4>
            <ul>
              <li>Student record management</li>
              <li>Grade calculation and tracking</li>
              <li>File-based data persistence</li>
              <li>Search and filter functionality</li>
              <li>Report generation</li>
            </ul>
          </div>
          
          <div class="project-tech">
            <h4>Technologies Used</h4>
            <div class="tech-tags">
              <span class="tag">C++</span>
              <span class="tag">File I/O</span>
              <span class="tag">Data Structures</span>
            </div>
          </div>
        </div>
      `
    },
    'superstock': {
      title: 'SuperStock - UI Design',
      content: `
        <div class="project-detail">
          <div class="project-overview">
            <h4>Project Overview</h4>
            <p>Modern mobile app UI design for a stock trading platform with intuitive user experience and clean interface. Focused on usability and visual appeal.</p>
          </div>
          
          <div class="project-features">
            <h4>Key Features</h4>
            <ul>
              <li>Clean and modern interface</li>
              <li>Intuitive navigation design</li>
              <li>Stock data visualization</li>
              <li>Mobile-first approach</li>
              <li>User-centered design principles</li>
            </ul>
          </div>
          
          <div class="project-tech">
            <h4>Design Tools</h4>
            <div class="tech-tags">
              <span class="tag">Figma</span>
              <span class="tag">UI/UX Design</span>
              <span class="tag">Mobile Design</span>
            </div>
          </div>
        </div>
      `
    },
    'portfolio': {
      title: 'Personal Portfolio Website',
      content: `
        <div class="project-detail">
          <div class="project-overview">
            <h4>Project Overview</h4>
            <p>Responsive portfolio website showcasing work and skills with modern design and smooth animations. Built with performance and user experience in mind.</p>
          </div>
          
          <div class="project-features">
            <h4>Key Features</h4>
            <ul>
              <li>Responsive design</li>
              <li>Smooth animations and transitions</li>
              <li>Contact form with validation</li>
              <li>Project showcase with modals</li>
              <li>Performance optimized</li>
            </ul>
          </div>
          
          <div class="project-tech">
            <h4>Technologies Used</h4>
            <div class="tech-tags">
              <span class="tag">HTML5</span>
              <span class="tag">CSS3</span>
              <span class="tag">JavaScript</span>
              <span class="tag">Responsive Design</span>
            </div>
          </div>
        </div>
      `
    }
  };

  const project = projects[projectId];
  if (project) {
    modalTitle.textContent = project.title;
    modalBody.innerHTML = project.content;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
};

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});