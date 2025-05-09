document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  // Traditional login form
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "admin123";

    if (username === validUsername && password === validPassword) {
      loginMessage.style.color = "green";
      loginMessage.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "upload.html";
      }, 1500);
    } else {
      loginMessage.style.color = "red";
      loginMessage.textContent = "Invalid username or password.";
    }
  });
});

// ✅ Google Sign-In callback must be on global scope
window.handleCredentialResponse = function (response) {
  const idToken = response.credential;

  // Send token to backend for verification
  fetch("http://localhost:5000/api/auth/google-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ token: idToken })
  })
    .then(res => res.json())
    .then(data => {
      if (data.name) {
        const loginMessage = document.getElementById("loginMessage");
        loginMessage.style.color = "green";
        loginMessage.textContent = `Welcome, ${data.name}! Redirecting...`;

        setTimeout(() => {
          window.location.href = "upload.html";
        }, 1500);
      } else {
        throw new Error("Login failed");
      }
    })
    .catch((err) => {
      console.error("Google login error:", err); // for debugging
      const loginMessage = document.getElementById("loginMessage");
      loginMessage.style.color = "red";
      loginMessage.textContent = "Google login failed. Please try again.";
    });
};
