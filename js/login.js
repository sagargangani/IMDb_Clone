function navigateToPage() {
  location.href = "../html/register.html";
}

// const request = indexedDB.open("userDB", 1);
// let db;

// request.onupgradeneeded = function (event) {
//   console.log("event data", event);
//   db = event.target.result;
//   const objectStore = db.createObjectStore("users", { keyPath: "email" });
//   objectStore.createIndex("password", "password", { unique: false });
// };

// request.onsuccess = function (event) {
//   db = event.target.result;
// };

// request.onerror = function (event) {
//   console.error("Database error: " + event.target.errorCode);
// };

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

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = existingUsers.find((u) => u.email === email);

  if (!user) {
    showAlert(
      "Email not found. Please check your email or register.",
      "danger"
    );
    return;
  }

  if (user.password === password) {
    showAlert("Login successful!", "success");
    document.getElementById("registerForm").reset();
    // You can redirect to a dashboard or perform other actions after login.
  } else {
    showAlert("Incorrect password. Please try again.", "danger");
  }

  // const transaction = db.transaction(["users"], "readonly");
  // const objectStore = transaction.objectStore("users");
  // const index = objectStore.index("email");
  // // const request = objectStore.get(email);
  // const request = index.get(email);
  // request.onsuccess = function (event) {
  //   const user = event.target.result;
  //   if (user) {
  //     if (user.password === password && user.email === email) {
  //       showAlert("Login successful!", "success");
  //       document.getElementById("loginForm").reset();
  //     } else {
  //       showAlert("Invalid email or password.", "danger");
  //     }
  //   } else {
  //     showAlert("Invalid email or password.", "danger");
  //   }
  // };

  // request.onerror = function (event) {
  //   showAlert("Error accessing database.", "danger");
  // };
}
