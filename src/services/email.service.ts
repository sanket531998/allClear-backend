import { apiInstance } from "..";

export const sendEmail = async (email: string, message: number) => {
  const sendSmtpEmail = {
    sender: { name: "All Clear", email: "sanket.naukarkar@gmail.com" },
    to: [{ email: email }],
    subject: "OTP for all clear verification",
    htmlContent: `<h3>Hi ${email} your otp for verification is ${message} </h3>`,
  };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent:", response);

    return response;
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
