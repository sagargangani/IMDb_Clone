// const request = indexedDB.open("userDB", 1);
// let db;

// request.onupgradeneeded = function (event) {
//   db = event.target.result;
//   const objectStore = db.createObjectStore("users", {
//     keyPath: "email",
//     autoIncrement: true,
//   });
//   objectStore.createIndex("users", "users", { unique: true });
// };

// request.onsuccess = function (event) {
//   db = event.target.result;
//   console.log("database log", db);
// };

// request.onerror = function (event) {
//   console.error("Database error: " + event.target.errorCode);
// };

let captchaText = document.getElementById("captcha");
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

let userText = document.getElementById("textBox");
let submitButton = document.getElementById("submitButton");
let output = document.getElementById("output");
let refreshButton = document.getElementById("refreshButton");

var captchaStr = "";

let alphaNums = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

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

function emailExists(email, callback) {
  const transaction = db.transaction(["users"], "readonly");
  console.log("transaction", transaction);
  const objectStore = transaction.objectStore("users");
  const index = objectStore.index("email");
  const request = index.get(email);

  request.onsuccess = function (event) {
    const user = event.target.result;
    callback(!!user); // Callback with a boolean indicating whether the email exists
  };

  request.onerror = function (event) {
    console.error("Error checking if email exists:", event.target.errorCode);
    callback(false); // Assume email doesn't exist in case of an error
  };
}

function generate_captcha() {
  let emptyArr = [];

  for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
  }

  captchaStr = emptyArr.join("");

  ctx.clearRect(0, 0, captchaText.width, captchaText.height);
  ctx.fillText(captchaStr, captchaText.width / 4, captchaText.height / 2);

  output.innerHTML = "";
}

generate_captcha();

function isValidEmail(email) {
  // Simple email validation regex
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// function resetPassword(email) {
//   const newPassword = document.getElementById("newPassword").value;
//   const transaction = db.transaction(["users"], "readwrite");
//   const objectStore = transaction.objectStore("users");

//   const request = objectStore.get(email);

//   request.onsuccess = function (event) {
//     const user = event.target.result;

//     if (user) {
//       user.password = newPassword;
//       const updateRequest = objectStore.put(user);

//       updateRequest.onsuccess = function () {
//         console.log("Password updated successfully");
//       };

//       updateRequest.onerror = function () {
//         console.error("Error updating password:", updateRequest.error);
//       };
//     } else {
//       console.error("User not found");
//     }
//   };

//   request.onerror = function () {
//     console.error("Error getting user:", request.error);
//   };

// }

function continuebutton() {
  const email = document.getElementById("email").value;
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = existingUsers.find((u) => u.email === email);

  if (!user) {
    showAlert(
      "Email not found. Please check your email or register.",
      "danger"
    );
    return;
  }

  const newPassword = document.getElementById("newPassword").value;
  if (newPassword) {
    user.password = newPassword;
    localStorage.setItem("users", JSON.stringify(existingUsers));
    showAlert("Password reset successful!", "success");
  } else {
    showAlert("Error while updating the password.", "danger");
  }
}
function check_captcha() {
  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("newPassword").value;

  if (email.trim() === "") {
    showAlert("email is required", "danger");
    return;
  }

  if (!isValidEmail(email)) {
    showAlert("Invalid email address!", "danger");
    return;
  }
  if (userText.value.length === 0 || userText.value === undefined) {
    showAlert("Please complete captcha!", "danger");
    return;
  }
  if (newPassword.trim() === "") {
    showAlert("New Password is required", "danger");
    return;
  }

  if (userText.value === captchaStr) {
    showAlert("correct Captcha!", "success");
    continuebutton();
  } else {
    showAlert("Incorrect, please try again!", "danger");
  }
}

userText.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    check_captcha();
  }
});

submitButton.addEventListener("click", check_captcha);
refreshButton.addEventListener("click", generate_captcha);
