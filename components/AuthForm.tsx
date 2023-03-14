import emailIcon from "@/public/email_envelope_mail_send_icon.svg";
import lockIcon from "@/public/lock_locker_icon.svg";
import { FormEvent, useState } from "react";
import InputContainer from "./InputContainer";
import { useRouter } from "next/router";
import { RegisterResponse, User } from "@/models/customTypes";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

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
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isLogin, setIslogin] = useState<boolean>(true);
  const router = useRouter();

  // Toggles the current authentication mode between login and signup
  const authModeHandler = () => {
    setIslogin((prevIsLogin) => !prevIsLogin);
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredConfirmPassword("");
  };

  // Handles the form submission
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: User = { enteredEmail, enteredPassword };

    // Form validation
    if (
      enteredEmail?.trim().length === 0 ||
      enteredPassword?.trim().length === 0
    ) {
      toast.error("Please enter the information");
      return;
    }

    // User authentication
    if (!isLogin) {
      if (enteredPassword !== enteredConfirmPassword) {
        toast.error("Passwords does not match");
        return;
      }
      try {
        // Register a new user
        const response: RegisterResponse = await registerUser(userData);
        toast.success(
          "Registeration was successful! You can login with your info!"
        );
        setIslogin(true);
      } catch (error) {
        let msg = (error as Error).message;
        toast.error(msg);
      }
    } else {
      // Handel user signIn  after the authentication process.
      const result = await signIn("credentials", {
        redirect: false,
        enteredEmail,
        enteredPassword,
      });

      // If the authentication was successful, redirect the user to weather page.
      if (!result?.error) {
        router.replace("/weather");
      }

      // If the authentication failed, show the error.
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
        value={enteredEmail}
        onChangedHandler={setEnteredEmail}
        placeholder="Please enter your email ..."
        iconAlt="email icon"
        iconsrc={emailIcon}
      />
      <InputContainer
        type="password"
        value={enteredPassword}
        onChangedHandler={setEnteredPassword}
        placeholder="Please enter your password"
        iconAlt="lock icon"
        iconsrc={lockIcon}
      />
      {!isLogin && (
        <InputContainer
          type="password"
          value={enteredConfirmPassword}
          onChangedHandler={setEnteredConfirmPassword}
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
