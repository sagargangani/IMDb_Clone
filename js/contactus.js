/* Author Name : Avan Panchal
Student Id : C0895319 */
function showAlert(message, alertType) {
  var alertDiv = document.createElement("div");
  alertDiv.className =
    "alert alert-" + alertType + " alert-dismissible fade show";
  alertDiv.role = "alert";
  alertDiv.innerHTML =
    message +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

  var container = document.querySelector(".error-message");
  container.insertBefore(alertDiv, container.firstChild);

  window.scrollTo(0, 0);

  // Remove the alert after 3 seconds
  setTimeout(function () {
    alertDiv.remove();
  }, 3000);
}

function isValidEmail(email) {
  // Simple email validation regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function contactus() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("number").value;
  const message = document.getElementById("message").value;

  const phonePattern = /^\d{10}$/;

  if (name.trim() === "" || name === null) {
    showAlert("name is required", "danger");
    return;
  }

  if (email.trim() === "" || email === null) {
    showAlert("email is required", "danger");
    return;
  }
  if (phone.trim() === "" || phone === null) {
    showAlert("phone is required", "danger");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Invalid email address!", "danger");
    return;
  }

  if (!phonePattern.test(phone)) {
    showAlert("Please enter a valid phone number.", "danger");
    return;
  }

  if (message.trim() === "" || message === null) {
    showAlert("message is required", "danger");
    return;
  }

  document.getElementById("contactusForm").reset();

  setTimeout(function () {
    $("#thankYouModal").modal("show");
  }, 1000);
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
}

function toggleMenu() {
  var mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.classList.toggle("active");
}

function navigateToPage() {
  location.href = "../html/login.html";
}
