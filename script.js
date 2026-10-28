// Menu com fundo ao rolar + barra de progresso
const nav = document.getElementById('nav');
const progress = document.getElementById('progress');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (window.scrollY / max) * 100 + '%';
}, { passive: true });

// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// Efeito de digitação no cargo
const typed = document.getElementById('typed');
const phrases = ['Desenvolvedor de Sistemas', 'Integrações & APIs', 'Automação de processos', 'Soluções para logística'];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  let p = 0, i = phrases[0].length, deleting = true;
  const tick = () => {
    const word = phrases[p];
    i += deleting ? -1 : 1;
    typed.textContent = word.slice(0, i);
    let delay = deleting ? 40 : 80;
    if (!deleting && i === word.length) { deleting = true; delay = 2200; }
    else if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 2500);
}

// Animação de entrada
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Destaca no menu a seção atual
const links = [...menu.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

// Copiar e-mail
const copyBtn = document.getElementById('copyEmail');
copyBtn.addEventListener('click', async () => {
  const label = copyBtn.querySelector('span');
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    label.textContent = 'E-mail copiado!';
  } catch {
    location.href = 'mailto:' + copyBtn.dataset.email;
  }
  setTimeout(() => (label.textContent = 'Copiar e-mail'), 2000);
});

document.getElementById('year').textContent = new Date().getFullYear();
