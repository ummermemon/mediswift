<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $otp;
    public string $expiryMinutes;

    public function __construct(string $otp)
    {
        $this->otp = $otp;
        $this->expiryMinutes = '5';
    }

    public function build()
    {
        return $this->subject('Your MediSwift Verification Code')
            ->view('emails.otp');
    }
}