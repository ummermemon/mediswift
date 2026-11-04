<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;

class MailerService
{
    public static function sendOtp($email, $otp)
    {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();

            $mail->Host = env('MAIL_HOST');
            $mail->SMTPAuth = true;

            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');

            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = env('MAIL_PORT', 587);

            $mail->setFrom(
                env('MAIL_FROM_ADDRESS'),
                env('MAIL_FROM_NAME', 'MediSwift')
            );

            $mail->addAddress($email);

            $mail->isHTML(true);
            $mail->Subject = 'MediSwift Email Verification';

            $mail->Body = "
                <h2>Welcome to MediSwift!</h2>
                <p>Your email verification OTP is:</p>
                <h1>$otp</h1>
                <p>This OTP expires in 5 minutes.</p>
            ";

            $mail->send();

            return true;

        } catch (\Exception $e) {
            \Log::error('Mailer Error: ' . $mail->ErrorInfo);
            return false;
        }
    }
}