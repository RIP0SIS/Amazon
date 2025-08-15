export function hideHeaderOnScroll() {
  let lastScrollTop = 0;
  const header = document.querySelector('.js-amazon-header');
  const secondHeader = document.querySelector('.js-amazon-second-header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
      // Hide headers when scrolling down
      header.classList.add('header-hidden');
      secondHeader.classList.add('header-hidden');
    } else {
      // Show headers when scrolling up
      header.classList.remove('header-hidden');
      secondHeader.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values
  });
}

hideHeaderOnScroll();
