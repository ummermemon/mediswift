<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\URL;

class CustomVerifyEmail extends VerifyEmail
{
    protected string $appRedirectUrl;

    public function __construct(string $appRedirectUrl)
    {
        $this->appRedirectUrl = $appRedirectUrl;
    }

    public function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
                'redirect' => $this->appRedirectUrl,
            ]
        );
    }

    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verify Your MediSwift Account')
            ->view('emails.verify-email', [
                'user' => $notifiable,
                'verificationUrl' => $verificationUrl,
            ]);
    }
}