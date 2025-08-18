// Handles search functionality (via button click or Enter key)
export function productSearch () {

  // Trigger search on button click
  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;

      if (search != '') {
        window.location.href = `amazon.html?search=${search}`;
      } else {
        window.location.href = `amazon.html`;
      }
    });

  // Trigger search when user presses "Enter" in search bar
  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      const search = document.querySelector('.js-search-bar').value;

      if (event.key === 'Enter') {
        if (search != '') {
          window.location.href = `amazon.html?search=${search}`;
        } else {
          window.location.href = `amazon.html`;
        }
      }
    });
}

export default productSearch;
