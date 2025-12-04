// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');
const formMessage = document.getElementById('formMessage');

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function setLoading(loading) {
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        btnLoader.style.alignItems = 'center';
        btnLoader.style.gap = '8px';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor, insira um email válido.', 'error');
        return;
    }
    
    setLoading(true);
    formMessage.style.display = 'none';
    
    try {
        // Configuração do EmailJS
        // IMPORTANTE: Você precisa configurar no site do EmailJS (https://www.emailjs.com)
        // 1. Crie uma conta gratuita
        // 2. Crie um serviço de email (Gmail, Outlook, etc)
        // 3. Crie um template de email
        // 4. Substitua os valores abaixo pelos seus:
        
        const serviceID = 'YOUR_SERVICE_ID';      // Ex: 'service_xxxxx'
        const templateID = 'YOUR_TEMPLATE_ID';     // Ex: 'template_xxxxx'
        const publicKey = 'YOUR_PUBLIC_KEY';       // Ex: 'xxxxxxxxxxxxx'
        
        // Inicializa EmailJS com sua chave pública
        emailjs.init(publicKey);
        
        // Envia o email
        await emailjs.send(serviceID, templateID, {
            from_name: name,
            from_email: email,
            message: message,
            to_name: 'Jose Sicupira',
            reply_to: email
        });
        
        showMessage(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Em breve entrarei em contato!`, 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        showMessage('Ops! Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente pelo email.', 'error');
    } finally {
        setLoading(false);
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-item, .about-text');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-card, .project-card');
    
    reveals.forEach((reveal, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            setTimeout(() => {
                reveal.style.opacity = '1';
                reveal.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    if (!heroContent) return;
    
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
    } else {
        heroContent.style.transform = 'translateY(0)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add click effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

const glitchName = document.querySelector('.glitch-name');
const glitchText1 = document.querySelector('.glitch-text-1');
const glitchText2 = document.querySelector('.glitch-text-2');
const glitchText3 = document.querySelector('.glitch-text-3');

let currentName = 'Jose Sicupira';
const names = ['Jose Sicupira', 'TekPix', 'Jose Neto', 'JoseNeto5689'];
let nameIndex = 0;

function glitchNameEffect() {
    glitchName.classList.add('glitching');
    
    setTimeout(() => {
        nameIndex = (nameIndex + 1) % names.length;
        currentName = names[nameIndex];
        
        glitchText1.textContent = currentName;
        glitchText2.textContent = currentName;
        glitchText3.textContent = currentName;
        
        setTimeout(() => {
            glitchName.classList.remove('glitching');
        }, 1000);
    }, 500);
}

setInterval(() => {
    glitchNameEffect();
}, 5000);

glitchName.addEventListener('mouseenter', () => {
    if (!glitchName.classList.contains('glitching')) {
        glitchNameEffect();
    }
});


