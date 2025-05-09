// script.js

document.addEventListener("DOMContentLoaded", function () {
    const timetableButton = document.querySelector(".btn");
    const adminButton = document.querySelector(".btn.secondary");
    const studentLink = document.querySelector(".card:nth-child(1) .link");
    const facultyLink = document.querySelector(".card:nth-child(2) .link");
    const adminLink = document.querySelector(".card:nth-child(3) .link");

    if (timetableButton) {
      timetableButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "dashboard.html"; // Redirect to the dashboard page
      });
    }

    if (adminButton) {
      adminButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "login.html"; // Redirect to the admin login page
      });
    }

    if (studentLink) {
      studentLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "dashboard.html"; // Redirect to the dashboard page
      });
    }

    if (facultyLink) {
      facultyLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "dashboard.html"; // Redirect to the dashboard page
      });
    }

    if (adminLink) {
      adminLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "login.html"; // Redirect to the admin login page
      });
    }
});
