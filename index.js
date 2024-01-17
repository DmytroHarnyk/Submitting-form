const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> 
    Email: ${email.value}<br> 
    Phone Number: ${phone.value}<br> 
    Message: ${mess.value}<br>`;

  Email.send({
    SecureToken: "5b4edf66-37b0-41dc-bbb5-03a09c75a6a4",
    Host: "smtp.elasticemail.com",
    Username: "projects.foruse@gmail.com",
    Password: "A96F526487F1D8BD420247C3C4E5C08F7865",
    To: "projects.foruse@gmail.com",
    From: "projects.foruse@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emeilRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const errorTxtEmail = document.querySelector(".error-email");

  if (!email.value.match(emeilRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerHTML = "Enter a valid email adress";
    } else {
      errorTxtEmail.innerHTML = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !mess.classList.contains("error")
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});
