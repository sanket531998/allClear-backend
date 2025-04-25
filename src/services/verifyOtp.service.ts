import { UnAuthorizedException } from "../execptions/unauthorized";

export const verifyOtpService = async (
  userSentOtp: number,
  apiResponseOtp: number
) => {
  try {
    if (userSentOtp === apiResponseOtp) {
    } else {
      throw new UnAuthorizedException("Incorrect OTP", 404, 404);
    }
  } catch (error) {
    throw new UnAuthorizedException("Incorrect OTP", 404, 404);
  }
};
