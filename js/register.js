/* Author Name : Avan Panchal
Student Id : C0895319 */

$(document).ready(function () {
  $("#birthYear").datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years",
    autoclose: true,
  });
});
// var db;
// document.addEventListener("DOMContentLoaded", function () {
//   // Open or create a database
//   var request = indexedDB.open("userDB", 1);

//   request.onerror = function (event) {
//     console.log("Database error: " + event.target.errorCode);
//   };

//   request.onsuccess = function (event) {
//     db = event.target.result;
//     console.log("Database opened successfully");
//   };

//   request.onupgradeneeded = function (event) {
//     var db = event.target.result;

//     // Create an object store with auto-incrementing key
//     var objectStore = db.createObjectStore("users", {
//       keyPath: "id",
//       autoIncrement: true,
//     });

//     // Create an index to search users by email
//     objectStore.createIndex("email", "email", { unique: true });

//     console.log("Database setup complete");
//   };
// });

function isValidEmail(email) {
  // Simple email validation regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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

function calculateProgress() {
  var totalFields = 7;
  var completedFields = 0;

  if (
    document.getElementById("name").value.trim() !== "" ||
    document.getElementById("name").value != null
  )
    completedFields++;
  if (document.getElementById("birthYear").value.trim() !== "")
    completedFields++;
  if (document.querySelector('input[name="gender"]:checked') !== null)
    completedFields++;
  if (document.getElementById("comments").value.trim() !== "")
    completedFields++;
  if (document.getElementById("email").value.trim() !== "") completedFields++;
  if (document.getElementById("password").value.trim() !== "")
    completedFields++;
  if (document.getElementById("confirmpassword").value.trim() !== "")
    completedFields++;

  var progress = (completedFields / totalFields) * 100;

  return progress;
}

function updateProgressBar(progress) {
  var progressBar = document.getElementById("progressBar");
  progressBar.style.width = progress + "%";
  progressBar.setAttribute("aria-valuenow", progress);
}

function registerUser() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirmpassword").value;
  var birthYear = document.getElementById("birthYear").value;
  var genderInputs = document.querySelectorAll('input[name="gender"]');
  var selectedGender = Array.from(genderInputs).find((input) => input.checked);
  var comments = document.getElementById("comments").value;
  var progress = calculateProgress();

  // Update the progress bar
  updateProgressBar(progress);

  if (name.trim() === "") {
    showAlert("name is required", "danger");
    return;
  }
  if (!name.match(/[A-Za-z\s]{3,}/)) {
    showAlert(
      "Enter a valid name (at least 3 characters of alphabets)",
      "danger"
    );
    return;
  }
  if (birthYear.trim() === "") {
    showAlert("Year of birth is required", "danger");
    return;
  }
  if (!selectedGender) {
    showAlert("Please select a gender", "danger");
    return;
  }

  if (comments.trim() === "") {
    showAlert("Comment is required", "danger");
    return;
  }

  if (email.trim() === "") {
    showAlert("email is required", "danger");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Invalid email address!", "danger");
    return;
  }

  if (password.trim() === "") {
    showAlert("password is required", "danger");
    return;
  }
  if (confirmPassword.trim() === "") {
    showAlert("confirm password is required", "danger");
    return;
  }

  if (password !== confirmPassword) {
    showAlert("Password and Confirm Password do not match!", "danger");
    return;
  }
  if (password.length < 8) {
    showAlert("Password must be at least 8 characters long!", "danger");
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const isExistingUser = existingUsers.some((user) => user.email === email);

  if (isExistingUser) {
    showAlert("Email already exists. Choose a different email.", "danger");
    return;
  }

  const newUser = { email, password, birthYear, genderInputs };
  existingUsers.push(newUser);

  // Store the updated user list in localStorage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  showAlert("Registration successful!", "success");
  location.href = "../html/login.html";
  document.getElementById("registerForm").reset();

  // var transaction = db.transaction(["users"], "readwrite");
  // var objectStore = transaction.objectStore("users");

  // // Check if the email already exists
  // var emailIndex = objectStore.index("email");
  // var request = emailIndex.get(email);

  // request.onsuccess = function () {
  //   if (request.result) {
  //     showAlert("Email already registered!", "info");
  //     // Clear the form
  //     document.getElementById("registerForm").reset();
  //   } else {
  //     // Add the user to the object store
  //     var user = { name: name, email: email, password: password };
  //     var addUserRequest = objectStore.add(user);

  //     addUserRequest.onsuccess = function () {
  //       showAlert("Registration successful!", "success");
  //       // Clear the form
  //       document.getElementById("registerForm").reset();
  //     };

  //     addUserRequest.onerror = function () {
  //       showAlert("Error adding user to the database", "danger");
  //     };
  //   }
  // };

  // transaction.onerror = function (event) {
  //   console.log("Transaction error: " + event.target.errorCode);
  // };
}

function clearForm() {
  document.getElementById("registerForm").reset();
}

function navigateToPage() {
  location.href = "../html/login.html";
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
}
