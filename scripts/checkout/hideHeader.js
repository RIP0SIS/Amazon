export function hideHeaderOnScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('.js-checkout-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;  //Y-axis

    if (currentScroll > lastScrollTop) {
      // Scrolling down → hide headers
      header.classList.add('header-hidden');
    } else {
      // Scrolling up → show headers
      header.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative scroll values
  });
}

