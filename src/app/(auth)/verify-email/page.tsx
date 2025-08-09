import { Suspense } from "react";
import OTPForm from "./_components/otp-form";

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPForm />
    </Suspense>
  );
};

export default VerifyEmailPage;
