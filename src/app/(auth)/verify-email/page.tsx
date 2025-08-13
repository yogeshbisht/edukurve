import { Suspense } from "react";
import OTPForm from "./_components/otp-form";

const VerifyEmailPage = () => {
  return (
    <Suspense>
      <OTPForm />
    </Suspense>
  );
};

export default VerifyEmailPage;
