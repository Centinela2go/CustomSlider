import { useState, useRef, useEffect } from "react";
import "./style.css";

export default function Slider({ slidesInfo }) {
  const refSlider = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [autoplayTimeLeft, setAutoplayTimeLeft] = useState(12000);
  const [progress, setProgress] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  const [slides, setSlides] = useState([
    {
      id: 1,
      direction: "",
    },
  ]);

  const newIndex = (value) => {
    const numSlides = Number(slidesInfo.length);
    if (value < 1) {
      value = numSlides;
    }
    if (value > numSlides) {
      value = 1;
    }
    setActiveSlide(value);
    return value;
  };

  const handlePrev = () => {
    if (isDisable) {
      return;
    }
    setAutoplayTimeLeft(12000);
    setIsDisable(true);
    setPreviousSlide(activeSlide);
    const index = newIndex(activeSlide - 1);
    setSlides([{ id: index, direction: "left" }]);
    setTimeout(() => {
      setIsDisable(false);
    }, 3000);
  };

  const handleNext = () => {
    if (isDisable) {
      return;
    }

    setAutoplayTimeLeft(12000);
    setCurrentTime(0);
    setIsDisable(true);
    setPreviousSlide(activeSlide);
    const index = newIndex(activeSlide + 1);
    setSlides([{ id: index, direction: "right" }]);
    setTimeout(() => {
      setIsDisable(false);
    }, 3000);
  };

  const handleDot = () => {
    const slideIndex = Number(event.target.id.slice(-1));
    if (isDisable || Number(slideIndex) === activeSlide) {
      return;
    }
    setAutoplayTimeLeft(12000);
    setCurrentTime(0);
    setIsDisable(true);
    setPreviousSlide(activeSlide);
    const index = newIndex(slideIndex);
    const direction = index < activeSlide ? "left" : "right";
    setSlides([{ id: index, direction }]);
    setTimeout(() => {
      setIsDisable(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      const numSlides = Number(slidesInfo.length);
      const dots = document.querySelector(".container-dots-main");
      dots.style.setProperty("--widthdots", `${40 * numSlides}px`);
      dots.style.setProperty("--margindots", `-${20 * numSlides}px`);
      const dots1 = document.querySelector(".dots-mobile");
      dots1.style.setProperty("--widthdotsmobile", `${20 * numSlides}px`);
      dots1.style.setProperty("--margindotsmobile", `-${10 * numSlides}px`);
    };
  }, []);

  let ini = null;

  const handleMouseDown = (event) => {
    ini = event.clientX;
    window.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = (event) => {
    var valorAbsoluto = Math.abs(ini - event.clientX);
    if (valorAbsoluto >= 2) {
      if (ini - event.clientX < 0) {
        handlePrev();
      } else {
        handleNext();
      }

      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!document.hidden) {
        if (autoplayTimeLeft > 0) {
          setAutoplayTimeLeft(autoplayTimeLeft - 1000);
        } else {
          handleNext();
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [autoplayTimeLeft]);

  useEffect(() => {
    const duration = 12000;
    const frameRate = 60;

    const intervalId = setInterval(() => {
      const progressCircle = document.getElementById(
        `contador-id-${activeSlide}`
      );
      if (!document.hidden) {
        if (progressCircle) {
          setProgress(true);
          if (progress) {
            const newCurrentTime = currentTime + 1000 / frameRate;
            setCurrentTime(newCurrentTime);
            const elapsed = newCurrentTime / duration;
            progressCircle.style.setProperty("--progress", elapsed);
          }
        }
      } else {
        setProgress(false);
      }
    }, 1000 / frameRate);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime]);

  useEffect(() => {
    if (previousSlide) {
      const progressCircle = document.getElementById(
        `contador-id-${previousSlide}`
      );
      progressCircle.style.setProperty("--progress", 1);
    }

    return () => {};
  }, [activeSlide]);

  return (
    <>
      <div className="relative">
        <div className="slider" ref={refSlider} onMouseDown={handleMouseDown}>
          {previousSlide ? (
            <div
              key={`slide-id-active`}
              className={`slide slide-${previousSlide}`}
            >
              <div className="information">
                <h2 className="title">{slidesInfo[previousSlide - 1].title}</h2>
                <div>
                  <p className="description">
                    {slidesInfo[previousSlide - 1].description}
                  </p>
                  <button className="button-info">
                    {slidesInfo[previousSlide - 1].textButton}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {slides.map((slide) => (
            <div
              key={`slide-id-${slide.id}`}
              className={`slide slide-${slide.id} animation-${
                slide.direction
              } ${slide.isVisible ? "" : ""}`}
            >
              <div className="information">
                <h2
                  className={`title ${previousSlide ? "animation-title" : ""}`}
                >
                  {slidesInfo[slide.id - 1].title}
                </h2>
                <div>
                  <p
                    className={`description ${
                      previousSlide ? "animation-description" : ""
                    }`}
                  >
                    {slidesInfo[slide.id - 1].description}
                  </p>
                  <button
                    className={`button-info ${
                      previousSlide ? "animation-button" : ""
                    }`}
                  >
                    {slidesInfo[slide.id - 1].textButton}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handlePrev} className="btn-prev">
          <img
            src="/images/arrow.png"
            alt="arrow-prev"
            className="rotate-180 h-10"
          />
        </button>
        <button onClick={handleNext} className="btn-next">
          <img src="/images/arrow.png" alt="arrow-next" className="h-10" />
        </button>

        <div className={`dots-mobile`}>
          <div className={`relative flex w-full justify-between`}>
            {slidesInfo.map((value, index) => (
              <div
                className={`w-4 h-4 bg-white rounded-full cursor-pointer ${
                  activeSlide === index + 1 ? "" : "opacity-50"
                }`}
                key={`dot-mobile-${index + 1}`}
                id={`dot-id-mobile-${index + 1}`}
                onClick={handleDot}
              ></div>
            ))}
          </div>
        </div>

        <div className="container-dots-main">
          <div className="container-dots">
            {slidesInfo.map((value, index) => (
              <div
                key={`circle-dot-${index + 1}`}
                id={`circle-id-dot-${index + 1}`}
                className="dot"
                onClick={handleDot}
              >
                <div
                  className={`swiper-pagination-circle ${
                    activeSlide === index + 1 ? "" : "opacity-50"
                  }`}
                >
                  <div
                    id={`circle-id-${index + 1}`}
                    className="swiper-pagination-circle-index"
                  >
                    {index + 1}
                  </div>
                  <svg viewBox="0 0 40 40" id={`contador-id-${index + 1}`}>
                    <circle cx="20" cy="20" r="18"></circle>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
