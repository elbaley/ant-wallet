"use client";
import Input from "@/components/Input";
import { useUser } from "@/context/authProvider";
import { register, signin, updateUser } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AuthFormProps {
  mode: "register" | "signin" | "profileupdate";
}

const authFormContents = {
  register: {
    linkUrl: "/signin",
    linkText: "Already have an account?",
    header: "Create a new Account",
    subheader: "Just a few things to get started",
    buttonText: "Register",
  },
  signin: {
    linkUrl: "/register",
    linkText: "Don't have an account?",
    header: "Welcome Back",
    subheader: "Enter your credentials to access your account",
    buttonText: "Sign In",
  },
  profileupdate: {
    linkUrl: "",
    linkText: "",
    header: "Change Profile Info",
    subheader: "Change your profile info.",
    buttonText: "Update",
  },
};

const AuthForm = ({ mode }: AuthFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useUser();
  const router = useRouter();
  const content = authFormContents[mode];
  const initial = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(
    { ...user, password: "", email: user?.email ? user.email : "" } || initial,
  );

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (mode === "register") {
      await register(formState)
        .then((user) => {
          setUser(user);
          router.replace("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (mode === "signin") {
      await signin(formState)
        .then((user) => {
          setUser(user);
          router.replace("/home");
          console.log(user);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
    } else {
      await updateUser(formState)
        .then((user) => {
          setUser(user);
          router.push("/profile");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setFormState(initial);
  }

  return (
    <div className="bg-white dark:bg-darkSecondary rounded-lg p-5 shadow-lg">
      <h2 className="font-semibold">{content.header}</h2>
      <h4>{content.subheader}</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {mode === "register" || mode === "profileupdate" ? (
          <>
            <Input
              value={formState.firstName as string}
              onChange={(e) =>
                setFormState((old) => ({ ...old, firstName: e.target.value }))
              }
              required
              placeholder="First Name"
            />
            <Input
              value={formState.lastName as string}
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
        {mode !== "profileupdate" ? (
          <Input
            value={formState.password}
            onChange={(e) =>
              setFormState((old) => ({ ...old, password: e.target.value }))
            }
            type="password"
            required
            placeholder="Password"
          />
        ) : null}

        {content.linkUrl ? (
          <div>
            <Link href={content.linkUrl}>
              <span>{content.linkText}</span>
            </Link>
            {errorMessage.length > 0 ? (
              <div className="text-red-500 transition-all">{errorMessage}</div>
            ) : null}
          </div>
        ) : null}
        <button
          type="submit"
          className="bg-black text-white p-3 rounded-lg hover:bg-opacity-90 dark:bg-white dark:text-black"
        >
          {content.buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
