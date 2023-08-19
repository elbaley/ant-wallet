import AuthForm from "@/components/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Ant Wallet",
  description: "Register",
};
interface RegisterProps {}

const Register = ({}: RegisterProps) => {
  return <AuthForm mode="register" />;
};

export default Register;
