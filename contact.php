<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Replace with your email address
    $to = "makoto.sorensen@gmail.com";
    $subject = "New Contact Form Submission";
    $headers = "From: $email";

    // You can customize the email message format here
    $emailBody = "Name: $name\nEmail: $email\n\n$message";

    // Send the email
    $success = mail($to, $subject, $emailBody, $headers);

    if ($success) {
        echo "Thank you, $name! Your message has been sent.";
    } else {
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // If the request method is not POST, deny access
    http_response_code(403);
    echo "Access Forbidden";
}
?>
