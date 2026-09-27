// Replace these two values before publishing. WhatsApp: country code + number, digits only.
const siteSettings = {
  whatsappNumber: '',
  facebookPageName: 'Karenode',
  facebookPageUrl: ''
};
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'فتح القائمة');
}));
const whatsappLink = document.querySelector('#whatsapp-link');
const phone = siteSettings.whatsappNumber.replace(/\D/g, '');
if (phone) {
  const message = encodeURIComponent('أهلاً Karenode، عاوز أعرف تفاصيل كورس التخسيس أو المنتجات المتاحة.');
  whatsappLink.href = `https://wa.me/${phone}?text=${message}`;
  whatsappLink.textContent = 'راسلنا على واتساب بيزنس ←';
  whatsappLink.removeAttribute('aria-disabled');
  document.querySelector('#phone-display').textContent = `+${phone}`;
  document.querySelector('#footer-phone').textContent = `واتساب بيزنس: +${phone}`;
  document.querySelectorAll('.order-link').forEach(link => {
    const item = link.dataset.product;
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(`أهلاً Karenode، عاوز أعرف تفاصيل ${item}.`)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  whatsappLink.target = '_blank';
  whatsappLink.rel = 'noopener noreferrer';
} else {
  whatsappLink.addEventListener('click', event => event.preventDefault());
}
const fbLink = document.querySelector('#facebook-link');
const fbName = siteSettings.facebookPageName.trim() || 'Karenode';
document.querySelector('#facebook-name').textContent = `اسم الصفحة: ${fbName}`;
document.querySelector('#contact-facebook').textContent = fbName + (siteSettings.facebookPageUrl ? '' : ' — رابط الصفحة يُضاف هنا');
document.querySelector('#footer-facebook').textContent = `فيسبوك: ${fbName}`;
if (siteSettings.facebookPageUrl) {
  fbLink.href = siteSettings.facebookPageUrl;
  fbLink.textContent = `تابعنا على ${fbName} ↗`;
  fbLink.removeAttribute('aria-disabled');
  fbLink.target = '_blank';
  fbLink.rel = 'noopener noreferrer';
} else {
  fbLink.addEventListener('click', event => event.preventDefault());
}
document.querySelector('#year').textContent = new Date().getFullYear();

// Gentle pointer-follow tilt, with a stationary view for touch and reduced motion.
const heroVisual = document.querySelector('#hero-visual');
if (heroVisual && matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let frame = 0;
  heroVisual.addEventListener('pointermove', event => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      heroVisual.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
      heroVisual.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`);
    });
  });
  heroVisual.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    heroVisual.style.setProperty('--tilt-x', '0deg');
    heroVisual.style.setProperty('--tilt-y', '0deg');
  });
}
