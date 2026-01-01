// LOGIN VALIDATION
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const username = loginForm.querySelector("input[type='text']").value.trim();
      const password = loginForm.querySelector("input[type='password']").value.trim();

      const validUsername = "najwa";
      const validPassword = "1234";

      if (username === validUsername && password === validPassword) {

        localStorage.setItem("loggedInUser", "Najwa");

        window.location.href = "dashboard.html";

      } else {
        const errorMsg = document.getElementById("loginError");
        if (errorMsg) {
          errorMsg.classList.remove("d-none");
        }
      }
    });
  }