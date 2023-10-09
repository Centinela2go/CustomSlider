import { useState, useRef, useEffect } from "react";
import "./style.css";

export default function Slider() {
  const refSlider = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const [previousSlide, setPreviousSlide] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [autoplayTimeLeft, setAutoplayTimeLeft] = useState(12000);
  const [slides, setSlides] = useState([
    {
      id: 1,
      direction: "",
      isVisible: true,
    },
  ]);

  const slidesInfo = [
    {
      title: "Tienes hasta 30% dscto. en DGO Full",
      description:
        "Lo mejor del streaming y TV por 6 meses con tus Tarjetas Interbank.",
      textButton: "Conoce Mas",
    },
    {
      title: "Descubre el MegaSale de Shopstar",
      description:
        "Dsctos únicos en todas las categorías con tus Tarjetas Interbank",
      textButton: "Ver Mas",
    },
  ];

  const newIndex = (value) => {
    if (value < 1) {
      value = 2;
    }
    if (value > 2) {
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
    setSlides([{ id: index, direction: "left", isVisible: true }]);
    setTimeout(() => {
      setIsDisable(false);
    }, 3000);
  };

  const handleNext = () => {
    if (isDisable) {
      return;
    }
    setAutoplayTimeLeft(12000);
    setIsDisable(true);
    setPreviousSlide(activeSlide);
    const index = newIndex(activeSlide + 1);
    setSlides([{ id: index, direction: "right", isVisible: true }]);
    setTimeout(() => {
      setIsDisable(false);
    }, 3000);
  };

  const handleDot1 = (slideIndex) => {
    if (isDisable || Number(slideIndex) === activeSlide) {
      return;
    }
    setAutoplayTimeLeft(12000);
    setIsDisable(true);
    setPreviousSlide(activeSlide);
    const index = newIndex(Number(slideIndex));
    const direction = index < activeSlide ? "left" : "right";
    setSlides([{ id: index, direction, isVisible: true }]);
    setTimeout(() => {
      setIsDisable(false);
    }, 3000);
  };

  const handleDot = (event) => {
    const slideIndex = event.currentTarget.querySelector(
      ".swiper-pagination-circle-index"
    ).textContent;
    handleDot1(slideIndex);
  };

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
      if (autoplayTimeLeft > 0) {
        setAutoplayTimeLeft(autoplayTimeLeft - 1000); // Resta 1 segundo cada segundo
      } else {
        handleNext();
      }
    }, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [autoplayTimeLeft]);

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
              } ${slide.isVisible ? "visible" : ""}`}
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
        <button
          onClick={handlePrev}
          className="absolute left-0 xl:left-[10%] top-1/2 -mt-5 pl-4 hidden lg:block"
        >
          <img
            src="/images/arrow.png"
            alt="arrow-prev"
            className="rotate-180 h-10"
          />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 xl:right-[10%] top-1/2 -mt-5 pr-4 hidden lg:block"
        >
          <img src="/images/arrow.png" alt="arrow-next" className="h-10" />
        </button>

        <div>
          {[1, 2].map((value) => {
            <div className=""></div>;
          })}
        </div>

        <div className="container-dots-main hidden md:block">
          <div className="container-dots">
            {[1, 2].map((value) => (
              <div
                key={`circle-dot-${value}`}
                className="dot"
                onClick={handleDot}
              >
                <div className="swiper-pagination-circle">
                  <div
                    id={`circle-id-${value}`}
                    className="swiper-pagination-circle-index"
                  >
                    {value}
                  </div>
                  <svg viewBox="0 0 40 40" id={`contador-id-${value}`}>
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
