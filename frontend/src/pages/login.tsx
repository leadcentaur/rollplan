import LoginForm from "@/components/site/auth/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Login() {

  return (
    <LoginForm onDismiss={() => {}} onSignUpInsteadClicked={() => {}} onForgotPasswordClicked={() => {}}/>
  );
}
