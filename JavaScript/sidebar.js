// Get references to the necessary elements
const sidebar = document.getElementById('sidebar');
const offcanvasExample = document.getElementById('offcanvasExample');
const productCategoryList = document.getElementById('productCategory').querySelector('ul');

// Add an event listener to the list elements
productCategoryList.addEventListener('click', (event) => {
  // Check if the clicked element is an anchor tag (a)
  if (event.target.tagName === 'A') {
    // Close the offcanvas
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasExample);
    offcanvas.hide();
  }
});

// Optionally (for smoother experience)
// Add event listener to close sidebar when clicking outside of it
document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !offcanvasExample.contains(event.target)) {
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasExample);
    offcanvas.hide();
  }
});

// 

    // Wait for the DOM to be fully loaded
   
