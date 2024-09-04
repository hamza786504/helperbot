<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

if ($data === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON data.']);
    exit();
}

$name = htmlspecialchars($data['f_name'] . ' ' . $data['l_name']);
$email = htmlspecialchars($data['email']);
$phone = htmlspecialchars($data['tel']);
$company = htmlspecialchars($data['company']);
$role = htmlspecialchars($data['role']);
$interest = htmlspecialchars($data['interest']);

$adminEmailSent = sendAdminEmail($name, $email, $phone, $company, $role, $interest);

$response = array();
if ($adminEmailSent) {
    $response['status'] = 'success';
    $response['message'] = 'Email sent successfully.';
} else {
    $response['status'] = 'error';
    $response['message'] = 'There was an issue sending the email.';
}

echo json_encode($response);

function sendAdminEmail($name, $email, $phone, $company, $role, $interest)
{
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'hamza786504@gmail.com';
        $mail->Password = '';  // Please write your application code here to send email
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('hamza786504@gmail.com', 'hamza');
        $mail->addAddress('sales@academyofrobotics.co.uk', 'Academyofrobotics');

        $mail->isHTML(true);
        $mail->Subject = 'HelperBot: New Form Submission';
        $mail->Body = '<p>New form submission details:</p>' .
            '<table border="1" cellpadding="5" cellspacing="0">' .
            '<tr><td>Name:</td><td>' . $name . '</td></tr>' .
            '<tr><td>Email:</td><td>' . $email . '</td></tr>' .
            '<tr><td>Phone:</td><td>' . $phone . '</td></tr>' .
            '<tr><td>Company:</td><td>' . $company . '</td></tr>' .
            '<tr><td>Role:</td><td>' . $role . '</td></tr>' .
            '<tr><td>Interest:</td><td>' . $interest . '</td></tr>' .
            '</table>';

        $mail->Body .= '<p>Thank you for your interest!</p>';
        $mail->Body .= '<p>Regards,<br>Helper Bot</p>';

        return $mail->send();
    } catch (Exception $e) {
        return false;
    }
}
