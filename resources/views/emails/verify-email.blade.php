
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background:#f5f7fa; font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0"
           style="padding:40px 15px;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0"
                       style="max-width:550px; background:#ffffff;
                       border-radius:12px; overflow:hidden;">

                    <tr>
                        <td align="center"
                            style="padding:35px 20px 20px;">
                            <h1 style="color:#16A085; margin:0;">
                                MediSwift
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:20px 35px 35px; color:#333;">

                            <h2 style="font-size:23px;">
                                Verify Your Email Address
                            </h2>

                            <p>
                                Hello {{ $user->first_name }},
                            </p>

                            <p style="line-height:1.7; color:#666;">
                                Thank you for registering with MediSwift!
                                Please verify your email address to
                                activate your account.
                            </p>

                            <table cellpadding="0" cellspacing="0"
                                   align="center" style="margin:30px auto;">
                                <tr>
                                    <td bgcolor="#16A085"
                                        style="border-radius:6px;">
                                        <a href="{{ $verificationUrl }}"
                                           style="display:inline-block;
                                           padding:15px 30px;
                                           color:#ffffff;
                                           text-decoration:none;
                                           font-weight:bold;">
                                            Verify Email Address
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="font-size:13px; color:#888;">
                                If you did not create a MediSwift account,
                                you can safely ignore this email.
                            </p>

                            <p style="font-size:13px; color:#888;">
                                Regards,<br>
                                Team MediSwift
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center"
                            style="padding:20px;
                            background:#f5f7fa;
                            color:#999;
                            font-size:12px;">
                            © {{ date('Y') }} MediSwift.
                            All rights reserved.
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
