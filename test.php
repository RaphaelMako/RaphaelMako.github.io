<?php
$to = "makoto.sorensen@gmail.com";
$subject = "Test Email";
$message = "This is a test email.";
$headers = "From: webmaster@example.com";

mail($to, $subject, $message, $headers);
?>
