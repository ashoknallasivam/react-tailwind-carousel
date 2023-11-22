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
  // Set the number of Cards to Display based on the view port
  if (windowSize.width <= 480) {
    elementsToShow = 1;
  } else if (windowSize.width > 480 && windowSize.width <= 768) {
    elementsToShow = 2;
  } else if (windowSize.width > 1024) {
    elementsToShow = 3;
  }

  // Create Reference for Slider Container, Slider and Card Components
  const sliderContainer = useRef(null);
  const slider = useRef(null);
  const cardRef = useRef();

  // Set sate for CardIndex, Card Length and Slider container width
  const [cardIndex, setCardIndex] = useState(0);
  const [cardLength, setCardLength] = useState(data.resources.length);
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);

  // Calculate the Card Width based on the Total Slider Container width and the element to Show
  let cardWidth = sliderContainerWidth / elementsToShow;

  // Logic for Left Arrow
  const movePrev = () => {
    //console.log("Prev" );
    console.log("cardIndexPrev", cardIndex);
    if (cardIndex < cardLength - elementsToShow) {
      setCardIndex(cardIndex + 1);
    }
  };

  // Logic for Right Arrow
  const moveNext = () => {
    //console.log("Next");
    console.log("cardIndexNext", cardIndex);
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    }
  };

  const moveCurrent = (newIndex) => {
    // Dot buttons will work only when button is greater than one and less the last 2 buttons
    if (newIndex === cardLength - 1 || newIndex === cardLength - 2) {
      console.log("elementsToShow", elementsToShow);
      console.log("newIndex", newIndex);
      if (elementsToShow === 2) {
        newIndex = cardLength - elementsToShow;
      } else if (elementsToShow === 3) {
        newIndex = cardLength - elementsToShow;
      }
    }
    setCardIndex(newIndex);
  };

  // UseEffect to move the slider to the particular Index
  useEffect(() => {
    console.log("Index", cardIndex);
    if (cardIndex <= 0) {
      slider.current.style.marginLeft = "0px";
    } else if (cardIndex < cardLength) {
      slider.current.style.marginLeft = -cardWidth * cardIndex - 1 + "px";
    }
  }, [cardIndex]);

  // UseEffect to set the slider width
  useEffect(() => {
    // Get the Slider Container Width from the Container Ref ans set in state
    setSliderContainerWidth(sliderContainer.current.clientWidth);
    // Set style for the slider (width,transition,transition duration) using its reference
    slider.current.style.width = cardLength * cardWidth + "px";
    slider.current.style.transition = "margin";
    slider.current.style.transitionDuration = "1s";
    // Set style for Card Element using its reference
    cardRef.current.style.width = cardWidth + "px";
  }, [cardWidth]);

  return (
    <section>
      <div className="flex">
        {/* Left arrow Div start */}
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
        {/* Left arrow Div Ends */}
        {/* Slider Container Div Starts*/}
        <div
          id="sliderContainer"
          ref={sliderContainer}
          className="w-10/12 overflow-hidden"
        >
          {/* Outer Place Holder Div for Slider Items (Actuall Slider)*/}
          <ul id="slider" ref={slider} className="flex w-full">
            {data.resources.map((resource, index) => {
              return <Item item={resource} key={index} ref={cardRef} />;
            })}
          </ul>
        </div>
        {/* Slider Container Div Starts*/}
        {/* Right arrow Div Starts */}
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
        {/* Right arrow Div Ends */}
      </div>
      {/* Bottom Dots Div Starts */}
      <div className="flex justify-center items-center space-x-5">
        {data.resources.map((_, index) => (
          <div className="w-4 h-4 rounded-full cursor-pointer">
            <button
              key={index}
              className="flex"
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
      {/* Bottom Dots Div Starts */}
    </section>
  );
};

// Creating a Ref for Each Cards using forwardRef
const Item = forwardRef(function (props, ref) {
  return (
    <li className="w-96 p-5" ref={ref}>
      <div className="border rounded-lg p-5 h-full">
        <img
          className="h-30 w-full object-cover rounded-md"
          alt={props.item.title}
          src={require(`${props.item.imageUrl}`)}
        />
      </div>
    </li>
  );
});
