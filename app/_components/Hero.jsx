import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="text-white bg-slate-950 ">
        <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:h-screen lg:items-center">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-4xl">
              Effortlessly Create Smart Forms with AI:
              <span className="sm:block">
                Transform Your Data Collection Today
              </span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 sm:text-xl/relaxed">
              "Automate, Customize, and Streamline Your Form Building Process
              with Cutting-Edge AI Technology"
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded bg-gradient-to-r from-blue-500 to-purple-600 hover:bg-none hover:text-white focus:outline-none focus:ring active:text-opacity-75 hover:shadow-md hover:shadow-purple-600 sm:w-auto"
                href="/dashboard"
              >
                Create Form
              </Link>
              <Link
                className="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
