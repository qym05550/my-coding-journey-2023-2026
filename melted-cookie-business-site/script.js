// Mobile menu toggle
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }));
}

// Order form -> WhatsApp
const form = document.getElementById('orderForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const qty = document.getElementById('qty').value;
    const area = document.getElementById('area').value;
    const notes = document.getElementById('notes').value.trim();

    let msg = `مرحباً، أبي أطلب من MELTED 🍪%0A`;
    msg += `الاسم: ${name}%0A`;
    msg += `الجوال: ${phone}%0A`;
    msg += `عدد الصناديق: ${qty}%0A`;
    msg += `المنطقة: ${area}%0A`;
    if (notes) { msg += `ملاحظات: ${notes}%0A`; }

    // NOTE: real WhatsApp business number removed before publishing publicly — replace with your own.
    const waUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${msg}`;
    window.open(waUrl, '_blank');
  });
}
