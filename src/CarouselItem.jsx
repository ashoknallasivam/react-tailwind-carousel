/* eslint-disable no-lone-blocks */
import { useState, useRef, useEffect, forwardRef } from "react";
import leftArrow from "./imgs/angle-left.png";
import rightArrow from "./imgs/angle-right.png";

export const CarouselItem = ({ data }) => {
  console.log("item", data);
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
  const buttonRef = useRef({});
  //console.log("buttonRef",buttonRef);
  // Set sate for CardIndex, Card Length and Slider container width
  const [cardIndex, setCardIndex] = useState(0);
  const [cardLength, setCardLength] = useState(data.resources.length);
  const [sliderContainerWidth, setSliderContainerWidth] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState(0);
  const [touchEndPosition, setTouchEndPosition] = useState(0);

  // Calculate the Card Width based on the Total Slider Container width and the element to Show
  let cardWidth = Math.round(sliderContainerWidth / elementsToShow);

  // Logic for Touch Swipe
  const touchStartHandler = (event) => {
    console.log("SwiperStart", event.targetTouches[0].clientX);
    setTouchStartPosition(event.targetTouches[0].clientX);
  };
  const touchMoveHandler = (event) => {
    console.log("SwiperMove", event.targetTouches[0].clientX);
    console.log("SliderWidth", slider.current.style.width);
    console.log("CardRef", cardRef);
    setTouchEndPosition(event.targetTouches[0].clientX);
    const sliderWidth = slider.current.offsetWidth;
    const translateDis =
      ((touchEndPosition - touchStartPosition) / sliderWidth) * 100;
    slider.current.style.transform = `translateX(` + translateDis + `%)`;
    //slider.current.style.animation="[slide-right_1s_ease-in-out]"
    console.log("translateDis", translateDis);
  };
  const touchEndHandler = (event) => {
    //console.log("SwiperEnd",event);
    console.log("touchStartPosition", touchStartPosition);
    console.log("touchEndPosition", touchEndPosition);

    if (touchStartPosition < touchEndPosition && cardIndex > 0) {
      moveNext();
      slider.current.style.transform = `translateX(` + 0 + `%)`;
    }
    if (
      touchStartPosition > touchEndPosition &&
      cardIndex < cardLength - elementsToShow
    ) {
      movePrev();
      slider.current.style.transform = `translateX(` + 0 + `%)`;
    }
  };

  // Logic for Right Arrow
  const keyPressHandler = (event) => {
    buttonReset();

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (cardIndex > 0) {
        moveNext();
      }
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      //console.log("KeyRight")
      //console.log("cardIndex", cardIndex);
      if (cardIndex < cardLength - elementsToShow) {
        movePrev();
      }
      return;
    }
  };

  const isDisabled = (direction) => {
    if (direction === "next") {
      return cardIndex <= 0;
    }
    if (direction === "prev") {
      return cardIndex >= cardLength - elementsToShow;
    }
    return false;
  };

  // Function to reset all the SVG button color
  const buttonReset = () => {
    for (var i = 0; i < cardLength; i++) {
      buttonRef.current[i].current.setAttribute("fill", "black");
    }
  };
  // Function to update the active SVG button
  const activeButton = (index) => {
    buttonRef.current[index].current.setAttribute("fill", "#088F8F");
  };
  // Logic for Left Arrow
  const movePrev = () => {
    buttonReset();
    setCardIndex((prevState) => prevState + 1);
    activeButton(cardIndex + 1);
  };

  // Logic for Right Arrow
  const moveNext = () => {
    buttonReset();
    setCardIndex((prevState) => prevState - 1);
    activeButton(cardIndex - 1);
  };

  const moveCurrent = (newIndex) => {
    //Reset the SVG button
    buttonReset();
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
    activeButton(newIndex);
    console.log("current_current", buttonRef.current[newIndex].current);
    setCardIndex(newIndex);
  };

  // UseEffect to handle the Keypress events
  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [cardIndex]);

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
  }, [cardWidth]);

  return (
    <section>
      <div className="flex">
        {/* Left arrow Div start */}
        <div className="w-2/12 flex items-center">
          <div className="w-full text-right">
            <button
              onClick={moveNext}
              className="p-3 rounded-lg bg-white border border-gray-100 shadow-md mr-5"
              disabled={isDisabled("next")}
            >
              <img src={leftArrow} alt="Previous" />
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
          <ul
            id="slider"
            ref={slider}
            className="flex w-full"
            onTouchStart={(e) => touchStartHandler(e)}
            onTouchMove={(e) => touchMoveHandler(e)}
            onTouchEnd={(e) => touchEndHandler(e)}
          >
            {data.resources.map((resource, index) => {
              return <CardItems item={resource} key={index} ref={cardRef} />;
            })}
          </ul>
        </div>
        {/* Slider Container Div Starts*/}
        {/* Right arrow Div Starts */}
        <div className="w-2/12 flex items-center">
          <div className="w-full">
            <button
              onClick={movePrev}
              className="p-3 rounded-lg bg-white border border-gray-100 shadow-lg ml-5"
              disabled={isDisabled("prev")}
            >
              <img src={rightArrow} alt="Next" />
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
                className="h-3 w-3"
                viewBox="0 0 1536 1536"
                ref={(buttonRef.current[index] ??= { current: null })}
              >
                <path d="M1024 768q0 106-75 181t-181 75t-181-75t-75-181t75-181t181-75t181 75t75 181zM768 224q-148 0-273 73T297 495t-73 273t73 273t198 198t273 73t273-73t198-198t73-273t-73-273t-198-198t-273-73zm768 544q0 209-103 385.5T1153.5 1433T768 1536t-385.5-103T103 1153.5T0 768t103-385.5T382.5 103T768 0t385.5 103T1433 382.5T1536 768z" />
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
const CardItems = forwardRef(function (props, ref) {
  return (
    <li className="w-96 p-5" ref={ref}>
      <div className="border rounded-lg p-5 shadow-md3 h-full">
        <img
          className="h-30 w-full object-cover rounded-md"
          alt={props.item.title}
          src={require(`${props.item.imageUrl}`)}
        />
      </div>
    </li>
  );
});
