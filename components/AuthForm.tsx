"use client";
import Input from "@/components/Input";
import { register, signin } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthFormProps {
  mode: "register" | "signin";
}

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create a new Account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome Back",
  subheader: "Enter your credentials to access your account",
  buttonText: "Sign In",
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const content = mode === "register" ? registerContent : signinContent;
  const initial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initial);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (mode === "register") {
      await register(formState);
    } else {
      await signin(formState);
    }

    setFormState(initial);
    router.replace("/home");
  }

  return (
    <div className="bg-white rounded-lg p-5 shadow-lg">
      <h2 className="font-semibold">{content.header}</h2>
      <h4>{content.subheader}</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {mode === "register" ? (
          <>
            <Input
              value={formState.firstName}
              onChange={(e) =>
                setFormState((old) => ({ ...old, firstName: e.target.value }))
              }
              required
              placeholder="First Name"
            />
            <Input
              value={formState.lastName}
              onChange={(e) =>
                setFormState((old) => ({ ...old, lastName: e.target.value }))
              }
              required
              placeholder="Last Name"
            />
          </>
        ) : null}
        <Input
          value={formState.email}
          onChange={(e) =>
            setFormState((old) => ({ ...old, email: e.target.value }))
          }
          required
          placeholder="E-mail"
        />
        <Input
          value={formState.password}
          onChange={(e) =>
            setFormState((old) => ({ ...old, password: e.target.value }))
          }
          type="password"
          required
          placeholder="Password"
        />

        <div>
          <Link href={content.linkUrl}>
            <span>{content.linkText}</span>
          </Link>
        </div>

        <button
          type="submit"
          className="bg-black text-white p-3 rounded-lg hover:bg-opacity-90"
        >
          {content.buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
