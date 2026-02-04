import useResendOtp from "../../../hooks/resendOtp";
import React, { memo } from "react";

const ResendOtp = () => {
  const { mutate, isPending } = useResendOtp()
    const resendOtpHandler = (even: React.MouseEvent) => {
      even.stopPropagation();
    mutate({email: localStorage.getItem("otp_email")}, { onSuccess: () => console.log("OTP Resend Successfully") });
  } 
  return (
    <button onClick={(e) => resendOtpHandler(e)} disabled={isPending} className="cursor-pointer text-sm font-bold text-red-600 hover:underline">ওটিপি পুনরায় পাঠান (Resend OTP)</button>
  )
}

export default memo(ResendOtp)