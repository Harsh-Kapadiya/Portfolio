<?php
// ✅ Show PHP errors (for debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ✅ Load Composer dependencies (PHPMailer)
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$errors = [];
$successMsg = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name)) $errors[] = "Name is required.";
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required.";
    if (empty($subject)) $errors[] = "Subject is required.";
    if (empty($message)) $errors[] = "Message is required.";

    if (empty($errors)) {
        $mail = new PHPMailer(true);

        try {
            // ✅ SMTP Config (Gmail)
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'harsh2021800@gmail.com';       // Your Gmail
            $mail->Password   = 'hnrfuosgyudhpeoo';              // Gmail App Password
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;

            // ✅ Email settings
            $mail->setFrom('harsh2021800@gmail.com', 'Portfolio Contact');
            $mail->addAddress('harsh2021800@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = 'New Message from Portfolio';
            $mail->Body    = "
                <h3>New Form Submission</h3>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <p><strong>Subject:</strong> {$subject}</p>
                <p><strong>Message:</strong><br>{$message}</p>
            ";

            if ($mail->send()) {
                $successMsg = "✅ Your message has been sent successfully!";
            } else {
                $errors[] = "❌ Mail Error: " . $mail->ErrorInfo;
            }
        } catch (Exception $e) {
            $errors[] = "❌ PHPMailer Error: " . $mail->ErrorInfo;
        }
    }
}
?>

<!-- ✅ Output the result -->
<?php if (!empty($errors)): ?>
    <div style="color: red; padding: 10px;">
        <strong>Error(s):</strong>
        <ul>
            <?php foreach ($errors as $error): ?>
                <li><?= htmlspecialchars($error) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php elseif ($successMsg): ?>
    <div style="color: green; padding: 10px;">
        <?= htmlspecialchars($successMsg) ?>
    </div>
<?php endif; ?>
