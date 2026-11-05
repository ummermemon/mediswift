
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MediSwift - Email Verification</title>
</head>

<body style="
    margin: 0;
    padding: 0;
    background-color: #F4F5FA;
    font-family: Arial, Helvetica, sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0"
    style="background-color: #F4F5FA; padding: 35px 12px;">
    <tr>
        <td align="center">

            <table width="100%" cellpadding="0" cellspacing="0"
                style="
                    max-width: 520px;
                    background-color: #FFFFFF;
                    border-radius: 16px;
                    overflow: hidden;
                ">

                <!-- Logo Header -->
                <tr>
                    <td align="center" style="
                        background-color: #FFFFFF;
                        padding: 30px 20px 24px;
                        border-bottom: 1px solid #EEEEF5;
                    ">
                        <img
                            src="{{ asset('assets/images/logo/logo.png') }}"
                            alt="MediSwift"
                            width="190"
                            style="
                                display: block;
                                width: 190px;
                                max-width: 100%;
                                height: auto;
                                margin: 0 auto;
                            "
                        >
                    </td>
                </tr>

                <!-- Main Content -->
                <tr>
                    <td style="padding: 35px 30px 30px;">

                        <h2 style="
                            margin: 0 0 14px;
                            color: #20243A;
                            font-size: 24px;
                            font-weight: 700;
                        ">
                            Verify Your Email
                        </h2>

                        <p style="
                            margin: 0 0 26px;
                            color: #646B7C;
                            font-size: 15px;
                            line-height: 1.7;
                        ">
                            Hello,
                            <br><br>
                            Welcome to MediSwift! We're happy to have you
                            with us. Please use the verification code below
                            to verify your email address and continue.
                        </p>

                        <!-- OTP Container -->
                        <table width="100%" cellpadding="0"
                            cellspacing="0">
                            <tr>
                                <td align="center" style="
                                    background-color: #F2F0FF;
                                    border: 1px dashed #7568E8;
                                    border-radius: 12px;
                                    padding: 25px 12px;
                                ">

                                    <p style="
                                        margin: 0 0 12px;
                                        color: #706A9D;
                                        font-size: 12px;
                                        font-weight: 600;
                                        letter-spacing: 2px;
                                        text-transform: uppercase;
                                    ">
                                        Your Verification Code
                                    </p>

                                    <h1 style="
                                        margin: 0;
                                        color: #5145CD;
                                        font-size: 36px;
                                        font-weight: 700;
                                        letter-spacing: 8px;
                                    ">
                                        {{ $otp }}
                                    </h1>

                                </td>
                            </tr>
                        </table>

                        <!-- Expiration Notice -->
                        <table width="100%" cellpadding="0"
                            cellspacing="0" style="margin-top: 24px;">
                            <tr>
                                <td width="30" valign="top">
                                    <span style="
                                        color: #5145CD;
                                        font-size: 17px;
                                    ">
                                        &#9200;
                                    </span>
                                </td>

                                <td>
                                    <p style="
                                        margin: 0;
                                        color: #646B7C;
                                        font-size: 14px;
                                        line-height: 1.6;
                                    ">
                                        This verification code will expire
                                        in <strong> {{ $expiryMinutes }}
                                        minutes.</strong>
                                    </p>
                                </td>
                            </tr>
                        </table>

                        <p style="
                            margin: 24px 0 0;
                            color: #646B7C;
                            font-size: 14px;
                            line-height: 1.7;
                        ">
                            <strong style="color: #303448;">
                                Security reminder:
                            </strong>
                            Never share your verification code with anyone.
                            MediSwift will never ask you to share your OTP.
                        </p>

                        <p style="
                            margin: 20px 0 0;
                            color: #9297A6;
                            font-size: 13px;
                            line-height: 1.6;
                        ">
                            If you didn't request this verification code,
                            you can safely ignore this email.
                        </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="
                        background-color: #F8F8FC;
                        padding: 24px 20px;
                        border-top: 1px solid #EEEEF5;
                    ">

                        <p style="
                            margin: 0 0 8px;
                            color: #5145CD;
                            font-size: 14px;
                            font-weight: 700;
                        ">
                            MediSwift
                        </p>

                        <p style="
                            margin: 0 0 10px;
                            color: #777B8C;
                            font-size: 12px;
                        ">
                            Your Healthcare, Simplified.
                        </p>

                        <p style="
                            margin: 0;
                            color: #A0A4B0;
                            font-size: 11px;
                            line-height: 1.6;
                        ">
                            &copy; {{ date('Y') }} MediSwift.
                            All rights reserved.
                            <br>
                            This is an automated email. Please do not reply.
                        </p>

                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
