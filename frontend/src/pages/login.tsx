import LoginForm from "@/components/site/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";

export default function Login() {

  return (
    <LoginForm onDismiss={() => {}} onSignUpInsteadClicked={() => {}} onForgotPasswordClicked={() => {}}/>
  );
}
