// src/app/components/signInWithAuth.tsx
"use client";
import React from "react";
import { signInWithGoogle } from "../db/config/Sign-InFunction";
import { signInWithGithub } from "../db/config/Sign-InFunction";
import { signInWithFacebook } from "../db/config/Sign-InFunction";


const SignInButton: React.FC = () => {
  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Signed in user:", user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignInWithGithub = async () => {
    try {
      const user = await signInWithGithub();
      console.log("Signed in user:", user);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      const user = await signInWithFacebook();
      console.log("Signed in user:", user);
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-4"
        onClick={handleSignInWithGoogle}
      >
        Sign in with Google
      </button>
      <br></br>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded gap-4"
        onClick={handleSignInWithGithub}
      >
        Sign in with Github
      </button>
      <br></br>
      <button
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded gap-4"
        onClick={handleSignInWithFacebook}
      >
        Sign in with Facebook
      </button>
    </div>
  );
};

export default SignInButton;
