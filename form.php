<?php
require 'vendor/autoload.php'; // MongoDB library

// MongoDB client connection string
$client = new MongoDB\Client("mongodb+srv://harsh2021800:LJPLjEB4VcSggeTT@cluster0.azxejgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// Select the database and collection
$collection = $client->Harsh->portfolio;

// Initialize variables
$errors = [];
$successMsg = "";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if it's a registration or login request
    if (isset($_POST['register'])) {
        // Registration logic
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $subject = trim($_POST['subject']);
        $message = trim($_POST['message']);

        // Validate name
        if (empty($name)) {
            $errors[] = "Name is required.";
        }

        // Validate email
        if (empty($email)) {
            $errors[] = "Email is required.";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "Invalid email format.";
        }

        // Validate subject
        if (empty($subject)) {
            $errors[] = "Subject is required.";
        }

        // Validate message
        if (empty($message)) {
            $errors[] = "Message is required.";
        }

        // If no validation errors, insert the data into MongoDB
        if (empty($errors)) {
        $insertResult = $collection->insertOne([
            'name' => $name,
            'email' => $email,
            'subject' => $subject,
            'message' => $message
        ]);

        if ($insertResult->getInsertedCount() > 0) {
            $successMsg = "Message sent successfully!";
        } else {
            $errors[] = "Failed to save your message. Please try again.";
        }
    }
    } 
}


?>