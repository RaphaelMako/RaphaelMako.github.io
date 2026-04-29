function submitForm() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // You can add additional validation here if needed

  var successMessage = document.getElementById("successMessage");
  successMessage.innerHTML = "Thank you, " + name + "! Your message has been sent.";

  // Use AJAX to send data to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Handle the server response here
      successMessage.innerHTML = xhr.responseText;
    }
  };

  // Send the data to the server
  xhr.send("name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email) + "&message=" + encodeURIComponent(message));

  // Clear the form fields after submission
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}
