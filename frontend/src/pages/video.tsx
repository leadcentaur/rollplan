import React from "react";
import loginVideo from "../assets/videos/loginMatchA.mp4";
import Video from "./video1.mp4";

export default function Videopage(){
     return (
      <div className="relative">
        <div className="bg-hero-section bg-no-repeat h-screen">
          <video autoPlay loop muted className="absolute inset-0 object-cover h-full w-full xl:h-auto">
            <source
              src="video1.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0">
            <div className="sm:text-5xl text-4xl font-thin sm:my-56 my-32 mx-16 text-center text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores cum nobis reprehenderit sequi explicabo at.
            </div>
          </div>
        </div>
        </div>
     );
}