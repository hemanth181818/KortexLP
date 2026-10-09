import LandingPage from "@/components/lp/landing";
import { SignupProvider } from "@/components/signup/signup-dialog";

export default function Landing() {
  return (
    <SignupProvider>
      <LandingPage />
    </SignupProvider>
  );
}
