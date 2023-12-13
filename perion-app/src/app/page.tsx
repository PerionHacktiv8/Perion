// In your `Home` component
import React from "react";
import SignInButton from "./components/signInWithAuth";

const Home: React.FC = () => {
  return (
    <main className="bg-gray-900">
      <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
        <div className="text-center">
          <h1 className="text-6xl text-green-100 font-bold cursive leading-none lg:leading-snug home-name">
            Test
          </h1>
          <SignInButton />
        </div>
      </section>
    </main>
  );
};

export default Home;
