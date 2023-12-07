function showAlert(message, alertType) {
  var alertDiv = document.createElement("div");
  alertDiv.className =
    "alert alert-" + alertType + " alert-dismissible fade show";
  alertDiv.role = "alert";
  alertDiv.innerHTML =
    message +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';

  var container = document.querySelector(".container");
  container.insertBefore(alertDiv, container.firstChild);

  window.scrollTo(0, 0);

  // Remove the alert after 3 seconds
  setTimeout(function () {
    alertDiv.remove();
  }, 3000);
}

function contactus() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const phonePattern = /^\d{10}$/;

  if (name.trim() === "" && name === null) {
    showAlert("name is required", "danger");
    return;
  }

  if (email.trim() === "" && email === null) {
    showAlert("email is required", "danger");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Invalid email address!", "danger");
    return;
  }

  if (phonePattern.test(phone)) {
    showAlert("Phone number is valid.", "success");
  } else {
    showAlert("Please enter a valid phone number.", "danger");
  }

  if (message.trim() === "" && message === null) {
    showAlert("message is required", "danger");
    return;
  }
}
