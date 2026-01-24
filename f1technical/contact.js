document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let message = document.getElementById("message").value.trim();
  let response = document.getElementById("response");

  if (!name || !message) {
    response.textContent = "Please fill out all fields.";
    response.style.color = "red";
  } else {
    response.textContent = "Thanks for getting in contact! " + name + " — we'll get back to you shortly!";
    response.style.color = "green";
    this.reset();
  }
});
