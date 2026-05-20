/**
 * 极简现代风格 - 动画和交互脚本
 * _includes/scripts/modern-effects.js
 */

(function() {
  'use strict';

  // ============================================
  // 1. 平滑滚动视差效果
  // ============================================
  
  function initParallaxScroll() {
    const heroSection = document.querySelector('.layout--home');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroSection.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    });
  }

  // ============================================
  // 2. 卡片交错进入动画
  // ============================================
  
  function initCardStaggerAnimation() {
    const articles = document.querySelectorAll('.item');
    
    articles.forEach((item, index) => {
      // 初始状态
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      
      // 添加延迟动画
      setTimeout(() => {
        item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 80);
    });
  }

  // ============================================
  // 3. 滚动触发卡片动画
  // ============================================
  
  function initScrollTriggerAnimation() {
    const articles = document.querySelectorAll('.item');
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
      });
    }, observerOptions);
    
    articles.forEach(article => {
      observer.observe(article);
    });
  }

  // ============================================
  // 4. 导航栏背景变化
  // ============================================
  
  function initHeaderBackgroundChange() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.15)';
      } else {
        header.style.background = 'rgba(15, 23, 42, 0.8)';
        header.style.boxShadow = 'none';
      }
    });
  }

  // ============================================
  // 5. 搜索框焦点效果
  // ============================================
  
  function initSearchFocus() {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-input');
    
    if (searchButton) {
      searchButton.addEventListener('click', () => {
        if (searchInput) {
          searchInput.focus();
          searchInput.style.transform = 'scale(1.05)';
        }
      });
    }
    
    if (searchInput) {
      searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
      });
      
      searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.boxShadow = 'none';
      });
    }
  }

  // ============================================
  // 6. 导航链接激活状态
  // ============================================
  
  function initNavLinkActive() {
    const navLinks = document.querySelectorAll('.navigation__item a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      if (link.href.includes(currentPath)) {
        link.parentElement.classList.add('navigation__item--active');
      }
    });
  }

  // ============================================
  // 7. 平滑滚动到顶部按钮
  // ============================================
  
  function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.id = 'scroll-to-top';
    scrollButton.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366F1, #EC4899);
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
      z-index: 999;
      pointer-events: none;
    `;
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.pointerEvents = 'auto';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.pointerEvents = 'none';
      }
    });
    
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    scrollButton.addEventListener('hover', () => {
      scrollButton.style.transform = 'scale(1.1)';
    });
  }

  // ============================================
  // 8. 响应式菜单处理
  // ============================================
  
  function initResponsiveMenu() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // 创建菜单切换按钮
    if (window.innerWidth < 768) {
      const menuButton = document.createElement('button');
      menuButton.className = 'menu-toggle';
      menuButton.innerHTML = '☰';
      menuButton.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        color: #6366F1;
        font-size: 1.5rem;
        cursor: pointer;
      `;
      
      if (window.innerWidth < 768) {
        menuButton.style.display = 'block';
      }
      
      header.querySelector('.main').appendChild(menuButton);
    }
  }

  // ============================================
  // 9. 文章卡片悬停阴影
  // ============================================
  
  function initCardShadowEffect() {
    const articles = document.querySelectorAll('.item');
    
    articles.forEach(article => {
      article.addEventListener('mouseenter', () => {
        article.style.boxShadow = '0 20px 60px rgba(99, 102, 241, 0.3)';
      });
      
      article.addEventListener('mouseleave', () => {
        article.style.boxShadow = '0 0 0 rgba(99, 102, 241, 0)';
      });
    });
  }

  // ============================================
  // 10. 计数器动画（用于统计数据）
  // ============================================
  
  function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const animate = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      };
      
      // 当元素进入视口时开始动画
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animate();
          observer.unobserve(counter);
        }
      });
      
      observer.observe(counter);
    });
  }

  // ============================================
  // 11. 添加必要的CSS样式
  // ============================================
  
  function injectStyles() {
    if (!document.querySelector('style[data-modern-theme]')) {
      const style = document.createElement('style');
      style.setAttribute('data-modern-theme', 'true');
      style.textContent = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .item {
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .item:nth-child(1) { animation-delay: 0.08s; }
        .item:nth-child(2) { animation-delay: 0.16s; }
        .item:nth-child(3) { animation-delay: 0.24s; }
        .item:nth-child(4) { animation-delay: 0.32s; }
        .item:nth-child(5) { animation-delay: 0.40s; }
        .item:nth-child(6) { animation-delay: 0.48s; }
        .item:nth-child(7) { animation-delay: 0.56s; }
        .item:nth-child(8) { animation-delay: 0.64s; }
        .item:nth-child(9) { animation-delay: 0.72s; }
        .item:nth-child(10) { animation-delay: 0.80s; }
        .item:nth-child(11) { animation-delay: 0.88s; }
        .item:nth-child(12) { animation-delay: 0.96s; }

        /* 按钮悬停效果 */
        button {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        button:hover {
          transform: translateY(-2px);
        }

        /* 链接效果 */
        a {
          transition: color 0.3s ease;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          #scroll-to-top {
            bottom: 20px !important;
            right: 20px !important;
            width: 44px !important;
            height: 44px !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // 初始化主函数
  // ============================================
  
  function init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    injectStyles();
    initParallaxScroll();
    initCardStaggerAnimation();
    initScrollTriggerAnimation();
    initHeaderBackgroundChange();
    initSearchFocus();
    initNavLinkActive();
    initScrollToTop();
    initResponsiveMenu();
    initCardShadowEffect();
    initCounterAnimation();
    
    console.log('✨ Modern theme effects initialized!');
  }

  // 开始初始化
  init();

})();

// ============================================
// 配置对象
// ============================================

window.ModernThemeConfig = {
  primaryColor: '#6366F1',
  secondaryColor: '#EC4899',
  accentColor: '#8B5CF6',
  
  // 自定义颜色
  setColors: function(primary, secondary, accent) {
    this.primaryColor = primary;
    this.secondaryColor = secondary;
    this.accentColor = accent;
  }
};
