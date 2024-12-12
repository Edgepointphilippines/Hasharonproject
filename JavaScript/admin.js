const typeOfUser = document.getElementById('typeOfUser');
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default form submission

  if (typeOfUser.value === 'admin') {
    window.location.href = './dashboard/dashboard.html'; // Redirect to dashboard.html
  } else  {
    window.location.href = 'Homepage.html';

    // Handle the User login (e.g., submit the form to Homepage.html)
    // You can use the form's default action here:
    // document.querySelector('form').submit();
  }
});