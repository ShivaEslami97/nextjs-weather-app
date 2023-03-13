import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import { FormEvent, useRef, useState } from "react";
import InputContainer from "./InputContainer";
import { useRouter } from "next/router";
import { RegisterResponse, User } from "@/models/customTypes";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";

async function registerUser(userData: User) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

const AuthForm = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPassInputRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIslogin] = useState<boolean>(true);
  const router = useRouter();
  const { data: session } = useSession();

  const authModeHandler = () => {
    setIslogin((prevIsLogin) => !prevIsLogin);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredConfirmPassword = confirmPassInputRef.current?.value;
    const userData: User = { enteredEmail, enteredPassword };

    // validation
    if (
      enteredEmail?.trim().length === 0 ||
      enteredPassword?.trim().length === 0
    ) {
      toast.error("Please enter the information");
      return;
    }

    // user auth
    if (!isLogin) {
      if (enteredPassword !== enteredConfirmPassword) {
        toast.error("Passwords does not match");
        return;
      }
      try {
        const response: RegisterResponse = await registerUser(userData);
        router.push("/weather");
      } catch (error) {
        let msg = (error as Error).message;
        toast.error(msg);
      }
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        enteredEmail,
        enteredPassword,
      });
      if (!result?.error) {
        // set some auth state
        router.replace("/weather");
      }
      if (result?.error) {
        let msg = result?.error;
        toast.error(msg);
      }
    }
  };

  return (
    <form className="auth__form" onSubmit={submitHandler}>
      <InputContainer
        type="email"
        ref={emailInputRef}
        placeholder="Please enter your email ..."
        iconAlt="email icon"
        iconsrc={emailIcon}
      />
      <InputContainer
        type="password"
        ref={passwordInputRef}
        placeholder="Please enter your password"
        iconAlt="lock icon"
        iconsrc={lockIcon}
      />
      {!isLogin && (
        <InputContainer
          type="password"
          ref={confirmPassInputRef}
          placeholder="Confirm your password"
          iconAlt="lock icon"
          iconsrc={lockIcon}
        />
      )}
      <button className="auth__btn">
        {isLogin ? "Login" : "Create Account"}
      </button>
      <div className="auth__mode">
        {isLogin ? "Dont you have an account?" : "Login with existing account"}
        <button
          className="text-primary ml-2"
          type="button"
          onClick={authModeHandler}
        >
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
