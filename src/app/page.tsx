"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Home from "./Home";
import HomeMbl from "./HomeMbl";

interface WindowDimensions {
  width: number;
  height: number;
}
export default function Page() {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: innerWidth,
        height: innerHeight,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[100dvh] w-[100dvw] md:h-screen md:w-screen overflow-hidden flex flex-col">
      <div className="h-max w-full text-8xl md:text-9xl font-Rowdies text-center relative top-20 md:flex md:justify-center md:items-center animate-fade-up animate-duration-[2000ms]">
        <div className="bg-gradient-to-r from-fancy-bg-blue-dark via-fancy-green to-fancy-yellow-dark inline-block text-transparent bg-clip-text ">
          SWAP
        </div>
      </div>
      {!windowDimensions.width ? (
        <Loading />
      ) : windowDimensions.width > 992 ? (
        <Home />
      ) : (
        <HomeMbl />
      )}
    </div>
  );
}
