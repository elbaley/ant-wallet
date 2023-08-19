import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

interface SigninPageProps {}
export const metadata: Metadata = {
  title: "Sign In - Ant Wallet",
  description: "Sign in",
};

const SigninPage = ({}: SigninPageProps) => {
  return <AuthForm mode="signin" />;
};

export default SigninPage;
