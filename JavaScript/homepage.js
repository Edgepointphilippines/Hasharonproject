
  const navLinks = document.querySelectorAll('#navbar ul a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight'));
      offcanvas.hide();
    });
  });
