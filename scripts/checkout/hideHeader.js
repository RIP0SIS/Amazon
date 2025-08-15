export function hideHeaderOnScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('.js-checkout-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
      // Hide header when scrolling down
      header.classList.add('header-hidden');
    } else {
      // Show header when scrolling up
      header.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
  });
}
