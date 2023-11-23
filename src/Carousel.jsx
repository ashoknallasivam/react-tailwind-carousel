import React from "react";
import { CarouselItem } from "./CarouselItem";

// Data
import data from "./data.json";

export const Carousel = () => {
  return (
    <>
      <h3 className="flex text-2xl justify-center items-center font-semibold text-teal-700 p-5">
        React-Tailwind simple Carousel
      </h3>
      <div className="carousel">
        <div className="inner">
          {" "}
          <CarouselItem className="w-full" data={data} />
        </div>{" "}
      </div>
    </>
  );
};
