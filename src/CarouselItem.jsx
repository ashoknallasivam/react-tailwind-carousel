/* eslint-disable no-lone-blocks */
import { useState, useRef, useEffect, forwardRef } from "react";
import leftArrow from "./imgs/angle-left.png";
import rightArrow from "./imgs/angle-right.png";

// Data
import data from "./data.json";

export const CarouselItem = ({ item }) => {
  // the size of the window in the beginning
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // useEffect hook to listen to the window resize event
  useEffect(() => {
    window.onresize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  let elementsToShow = 3;

  if (windowSize.width <= 480) {
    elementsToShow = 1;
  } else if (windowSize.width > 480 && windowSize.width <= 768) {
    elementsToShow = 2;
  } else if (windowSize.width > 1024) {
    elementsToShow = 3;
  }

  //console.log("Width & Height", windowSize.width);
  const sliderContainer = useRef(null); // create the ref for Slider Container
  const slider = useRef(null); // create the ref for Slider
  const elementRef = useRef(); // create the ref for Slider Element cards
  const [cardIndex, setCardIndex] = useState(0); // set state for CardIndex using Dot button
  const [cardLength, setCardLength] = useState(0);
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);

  let cardWidth = sliderContainerWidth / elementsToShow;
  console.log("sliderContainerWidth", sliderContainerWidth);
  console.log("cardLength", cardLength);
  console.log("elementsToShow", elementsToShow);
  console.log("cardWidth", cardWidth);

  const movePrev = () => {
    //console.log("Prev" );
    console.log(
      "Intitial Margin",
      Math.ceil(+slider.current.style.marginLeft.slice(0, -2))
    );
    console.log("Max margin", cardWidth * (cardLength - elementsToShow));
    if (
      Math.ceil(+slider.current.style.marginLeft.slice(0, -2)) !=
      -cardWidth * (cardLength - elementsToShow)
    )
      slider.current.style.marginLeft =
        +slider.current.style.marginLeft.slice(0, -2) - cardWidth + "px";
  };

  const moveNext = () => {
    //console.log("Next");
    console.log(
      "Intitial Margin",
      Math.ceil(+slider.current.style.marginLeft.slice(0, -2))
    );
    if (+Math.ceil(slider.current.style.marginLeft.slice(0, -2)) !== 0)
      slider.current.style.marginLeft =
        +slider.current.style.marginLeft.slice(0, -2) + cardWidth + "px";
  };

  const moveCurrent = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= cardLength) {
      newIndex = cardLength - 1;
    }
    setCardIndex(newIndex);
  };

  useEffect(() => {
    console.log("Index", cardIndex);
    if (cardIndex <= 0) {
      slider.current.style.marginLeft = "0px";
    } else if (cardIndex < cardLength) {
      slider.current.style.marginLeft = -cardWidth * cardIndex - 1 + "px";
    }
  }, [cardIndex]);

  useEffect(() => {
    // after mounting
    // Get the Slider Container Width from the Container Ref ans set in state

    let sliderContainerWidth = sliderContainer.current.clientWidth;
    setSliderContainerWidth(sliderContainerWidth);
    // Set the Card length in state
    setCardLength(data.resources.length);

    //slider.current.style.width = cardLength*cardWidth+'px';
    // console.log("width",elementsToShow*cardWidth+'px');

    console.log("sliderContainer", sliderContainer.current); // logs <div sliderContainer></div>
    console.log("slider", slider.current); // logs <ul slider></ul>
    console.log("cards", elementRef.current); // logs <li cards></li>

    slider.current.style.width = cardLength * cardWidth + "px";
    slider.current.style.transition = "margin";
    slider.current.style.transitionDuration = "1s";
    console.log("width", cardLength * cardWidth + "px");
    elementRef.current.style.width = cardWidth + "px";
  }, [cardWidth]);

  return (
    <section>
      <div className="flex">
        <div className="w-2/12 flex items-center">
          <div className="w-full text-right">
            <button
              onClick={movePrev}
              className="p-3 rounded-lg bg-white border border-gray-100 shadow-lg mr-5"
            >
              <img src={leftArrow} alt="" />
            </button>
          </div>
        </div>
        {/* Slider Container Div */}
        <div
          id="sliderContainer"
          ref={sliderContainer}
          className="w-10/12 overflow-hidden"
        >
          {/* Outer Place Holder Div for Slider Items (Actuall Slider)*/}
          <ul id="slider" ref={slider} className="flex w-full">
            {data.resources.map((resource, index) => {
              return <Item item={resource} key={index} ref={elementRef} />;
            })}
          </ul>
        </div>
        <div className="w-2/12 flex items-center">
          <div className="w-full">
            <button
              onClick={moveNext}
              className="p-3 rounded-lg bg-white border border-gray-100 shadow-lg ml-5"
            >
              <img src={rightArrow} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-5">
        {data.resources.map((_, index) => (
          <div className="w-4 h-4 rounded-full cursor-pointer">
            <button
              key={index}
              className="flex"
              aria-label={`View Image ${index + 1}`}
              //onClick={moveCurrent(index)}
              onClick={() => moveCurrent(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 1536 1536"
              >
                <path
                  fill="currentColor"
                  d="M1024 768q0 106-75 181t-181 75t-181-75t-75-181t75-181t181-75t181 75t75 181zM768 224q-148 0-273 73T297 495t-73 273t73 273t198 198t273 73t273-73t198-198t73-273t-73-273t-198-198t-273-73zm768 544q0 209-103 385.5T1153.5 1433T768 1536t-385.5-103T103 1153.5T0 768t103-385.5T382.5 103T768 0t385.5 103T1433 382.5T1536 768z"
                />
              </svg>
            </button>
          </div>
        ))}{" "}
      </div>
    </section>
  );
};

const Item = forwardRef(function (props, ref) {
  return (
    <li className="w-96 p-5" ref={ref}>
      <div className="border rounded-lg p-5 h-full">
        <img
          className="h-30 w-full object-cover rounded-md"
          alt={props.item.alt}
          src={require(`${props.item.imageUrl}`)}
        />
      </div>
    </li>
  );
});