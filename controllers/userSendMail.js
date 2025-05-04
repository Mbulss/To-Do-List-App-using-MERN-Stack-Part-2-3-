import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const userSendMail = (to, url, titleTxt, btnTxt, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config)

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Todo Team Mail Support",
        html: `<!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    @media screen {
                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                    }

                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                    }
                    }

                    body,
                    table,
                    td,
                    a {
                    -ms-text-size-adjust: 100%;
                    /* 1 */
                    -webkit-text-size-adjust: 100%;
                    /* 2 */
                    }

                    table,
                    td {
                    mso-table-rspace: 0pt;
                    mso-table-lspace: 0pt;
                    }

                    img {
                    -ms-interpolation-mode: bicubic;
                    }

                    a[x-apple-data-detectors] {
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    }

                    div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                    }

                    body {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    }

                    table {
                    border-collapse: collapse !important;
                    }

                    a {
                    color: #1a82e2;
                    }

                    img {
                    height: auto;
                    line-height: 100%;
                    text-decoration: none;
                    border: 0;
                    outline: none;
                    }

                    .countdown {
                    font-size: 16px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    color: #ff0000;
                    }
                </style>
                </head>

                <body style="background-color: #e9ecef;">

                <!-- start preheader -->
                <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                    Email Confirmation Notification
                </div>
                <!-- end preheader -->

                <!-- start body -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">

                    <!-- start logo -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                            <a href="#" target="_blank" style="display: inline-block;">
                                <!-- <img src="logo-url-here" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;"> -->
                            </a>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                    <!-- end logo -->

                    <!-- start hero -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">${titleTxt}</h1>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                    <!-- end hero -->

                    <!-- start copy block -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Click the button below to confirm your email.</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start button -->
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center" bgcolor="#004ac2" style="border-radius: 6px;">
                                        <a href="${url}" target="_blank" style="display: inline-block; padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${btnTxt}</a>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        <!-- end button -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">If that doesn't work, you can click the following link below:</p>
                            <p style="margin: 0;"><a href="${url}" target="_blank">Click this link</a></p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Thanks,<br>-- Todo Support Team --</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        </table>
                    </td>
                    </tr>
                    <!-- end copy block -->

                    <!-- start footer -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start permission -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">You received this email because we received a request for your account in our website. If you didn't request, you can safely delete this email.</p>
                            </td>
                        </tr>
                        <!-- end permission -->

                        <!-- start unsubscribe -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">Todo list App</p>
                            </td>
                        </tr>
                        <!-- end unsubscribe -->

                        </table>
                    </td>
                    </tr>
                    <!-- end footer -->

                </table>
                <!-- end body -->

                </body>
                </html>
`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return err
        return info
    })
}