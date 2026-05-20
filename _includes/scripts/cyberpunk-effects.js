/**
 * 赛博朋克风格 - 动画和交互脚本
 * _includes/scripts/cyberpunk-effects.js
 */

(function() {
  'use strict';

  // ============================================
  // 1. 夕阳读取进度条
  // ============================================
  
  function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress-bar';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      width: 0%;
      background: linear-gradient(90deg, #FF6B35, #D946EF, #FFB347);
      box-shadow: 0 0 20px #FF6B35, 0 0 40px rgba(217, 70, 239, 0.5);
      z-index: 1000;
      transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ============================================
  // 2. 夕阳粒子背景
  // ============================================
  
  function initSunsetParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.id = 'sunset-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      opacity: 0.5;
      pointer-events: none;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 150;
    
    // 夕阳色系
    const sunsetColors = ['#FF6B35', '#D946EF', '#FFB347', '#FF1493', '#FFA500'];
    
    // 创建夕阳粒子
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5,
        opacity: Math.random() * 0.6 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: sunsetColors[Math.floor(Math.random() * sunsetColors.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
    
    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // 粒子动画
        particle.opacity += (Math.random() - 0.5) * particle.twinkleSpeed;
        particle.opacity = Math.max(0.1, Math.min(1, particle.opacity));
        
        // 缓慢移动
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 边界反弹
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // 添加光晕
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.stroke();
      });
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
    
    // 窗口调整大小
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ============================================
  // 3. 鼠标跟随夕阳光线效果
  // ============================================
  
  function initMouseFollowLight() {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // 动态背景渐变跟随鼠标 - 使用夕阳色系
      const xPercent = (mouseX / window.innerWidth) * 100;
      const yPercent = (mouseY / window.innerHeight) * 100;
      
      document.body.style.backgroundImage = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, 
          rgba(255, 107, 53, 0.18) 0%, 
          transparent 50%),
        radial-gradient(ellipse at 80% 80%, 
          rgba(217, 70, 239, 0.12) 0%, 
          transparent 50%)
      `;
    });
  }

  // ============================================
  // 4. 卡片3D视差效果
  // ============================================
  
  function initCard3DParallax() {
    const cards = document.querySelectorAll('.item');
    
    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const isNearMouse = Math.abs(e.clientX - cardCenterX) < 300 && 
                           Math.abs(e.clientY - cardCenterY) < 300;
        
        if (isNearMouse) {
          const depth = (index % 3) * 1.5;
          const rotateX = (mouseY * 10) * depth;
          const rotateY = (mouseX * 10) * depth;
          
          card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
          `;
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        }
      });
    });
  }

  // ============================================
  // 5. 波浪涟漪效果
  // ============================================
  
  function initRippleEffect() {
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      const x = e.clientX;
      const y = e.clientY;
      
      ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 50px;
        height: 50px;
        border: 2px solid #FF6B35;
        border-radius: 50%;
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
        pointer-events: none;
        z-index: 999;
        animation: rippleOut 1s cubic-bezier(0.4, 0, 0.6, 1) forwards;
      `;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 1000);
    });
    
    // 添加动画
    if (!document.querySelector('style[data-ripple]')) {
      const style = document.createElement('style');
      style.setAttribute('data-ripple', 'true');
      style.textContent = `
        @keyframes rippleOut {
          from {
            width: 50px;
            height: 50px;
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          to {
            width: 500px;
            height: 500px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // 6. 滚动触发卡片动画
  // ============================================
  
  function initScrollAnimation() {
    const cards = document.querySelectorAll('.item');
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 添加随机闪烁效果
          const randomDelay = Math.random() * 0.2;
          entry.target.style.animation = `cardEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${randomDelay}s forwards`;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    cards.forEach(card => {
      card.style.opacity = '0';
      observer.observe(card);
    });
  }

  // ============================================
  // 7. 霓虹文字闪烁效果
  // ============================================
  
  function initNeonFlicker() {
    const headers = document.querySelectorAll('.item__header');
    
    headers.forEach(header => {
      // 鼠标进入时触发闪烁
      header.addEventListener('mouseenter', () => {
        header.style.animation = 'neonFlicker 0.5s infinite';
      });
      
      header.addEventListener('mouseleave', () => {
        header.style.animation = 'none';
        header.style.textShadow = '0 0 10px #FF6B35, 0 0 20px rgba(217, 70, 239, 0.5), 0 0 30px rgba(255, 107, 53, 0.2)';
      });
    });
    
    // 添加动画
    if (!document.querySelector('style[data-neon]')) {
      const style = document.createElement('style');
      style.setAttribute('data-neon', 'true');
      style.textContent = `
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 
              0 0 10px #FF6B35,
              0 0 20px rgba(217, 70, 239, 0.8);
            opacity: 1;
          }
          20%, 24%, 55% {
            text-shadow: 
              0 0 5px #FF6B35;
            opacity: 0.8;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // 8. 响应式处理
  // ============================================
  
  function handleResponsive() {
    const isMobile = window.innerWidth < 768;
    
    // 移动设备上禁用部分效果以提高性能
    if (isMobile) {
      // 禁用鼠标跟随效果
      const cards = document.querySelectorAll('.item');
      cards.forEach(card => {
        card.style.perspective = 'none';
      });
    }
  }

  // ============================================
  // 9. 点击卡片产生脉冲
  // ============================================
  
  function initCardPulse() {
    const cards = document.querySelectorAll('.item');
    
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.style.animation = 'cardPulse 0.4s ease-out';
        
        setTimeout(() => {
          card.style.animation = 'none';
        }, 400);
      });
    });
    
    // 添加脉冲动画
    if (!document.querySelector('style[data-pulse]')) {
      const style = document.createElement('style');
      style.setAttribute('data-pulse', 'true');
      style.textContent = `
        @keyframes cardPulse {
          0% {
            box-shadow: 
              0 0 30px rgba(255, 107, 53, 0.6),
              0 0 60px rgba(217, 70, 239, 0.4);
          }
          50% {
            box-shadow: 
              0 0 50px rgba(255, 179, 71, 0.4),
              0 0 100px rgba(217, 70, 239, 0.35);
          }
          100% {
            box-shadow: 
              0 0 30px rgba(255, 107, 53, 0.6),
              0 0 60px rgba(217, 70, 239, 0.4);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // 初始化所有效果
  // ============================================
  
  function init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    
    initProgressBar();
    initSunsetParticles();
    initMouseFollowLight();
    initCard3DParallax();
    initRippleEffect();
    initScrollAnimation();
    initNeonFlicker();
    initCardPulse();
    handleResponsive();
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      handleResponsive();
    });
    
    console.log('� Sunset theme effects initialized!');
  }

  // 开始初始化
  init();

})();

// ============================================
// 配置对象 - 夕阳主题
// ============================================

window.CyberpunkConfig = {
  colors: {
    orange: '#FF6B35',
    purple: '#D946EF',
    pink: '#FF1493',
    gold: '#FFB347',
    darkBg: '#1A0F2E'
  },
  
  // 动态更新颜色方案
  updateColors: function(newColors) {
    Object.assign(this.colors, newColors);
  },
  
  // 禁用所有动画
  disableAnimations: function() {
    document.querySelectorAll('style[data-animation]').forEach(style => {
      style.disabled = true;
    });
  },
  
  // 启用所有动画
  enableAnimations: function() {
    document.querySelectorAll('style[data-animation]').forEach(style => {
      style.disabled = false;
    });
  }
};
