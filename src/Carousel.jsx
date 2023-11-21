import React from "react";
import { CarouselItem } from "./CarouselItem";

export const Carousel = () => {
  return (
    <div className="carousel">
      <div className="inner">
        {" "}
        <CarouselItem className="w-full" />
      </div>{" "}
    </div>
  );
};
