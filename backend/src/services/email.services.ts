import { transporter } from "../config/mail.ts";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmailOptions) => {
  await transporter.sendMail({
    from: `"GroupBox" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
