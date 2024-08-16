"use client";

import React, { useState, useEffect } from 'react';

interface Box {
  title: string;
  description: string;
}

export const ExplanationBoxesIdeciclo = ({ boxes }: { boxes: Box[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [svgCount, setSvgCount] = useState(0);
  const svgWidth = 68; // Width of the SVG in pixels

  useEffect(() => {
    const updateSvgCount = () => {
      const screenWidth = window.innerWidth;
      setSvgCount(Math.ceil(screenWidth / svgWidth));
    };

    updateSvgCount();
    window.addEventListener('resize', updateSvgCount);
    return () => window.removeEventListener('resize', updateSvgCount);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % boxes.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative w-100">
      <section className="relative z-[1] container mx-auto lg:w-4/6 my-5 md:my-6 rounded p-12 overflow-auto">
        {/* Title and buttons */}
        <div className="flex p-6 justify-between items-center mb-4">
          {/* Title */}
          <div className="relative inline-flex items-center justify-center">
            <h1 className="relative inline-flex items-center justify-center px-4 md:px-8 py-2 md:py-4 gap-4 rounded-full bg-[#5AC2E1] shadow-lg text-[#334454] text-center font-lato text-xl md:text-3xl font-black leading-normal z-[0]">
              {boxes[currentIndex].title}
            </h1>
            {/* SVG Background */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 341 80"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[120%] flex-shrink-0  z-[-1]"
              style={{ fill: '#EFC345', filter: 'drop-shadow(0px 6px 8px rgba(0, 0, 0, 0.25))' }}
            >
              <path d="M9.80432 49.4967C9.04999 36.8026 8.77685 25.0274 8.03552 12.6779C7.94931 11.6804 8.02121 10.6478 8.23907 9.75347C8.45697 8.85917 8.80762 8.15768 9.23206 7.76683C10.6514 6.75694 12.1036 5.98883 13.5761 5.46925C16.9707 4.55021 20.4043 3.88966 23.8249 3.71734C50.045 2.36751 76.2522 0.845359 102.498 3.31526C124.258 5.29693 146.069 5.12462 167.828 7.04884C194.035 9.40387 220.203 13.08 246.384 15.952C265.122 18.0198 283.859 19.8387 302.597 21.4088C310.647 22.098 318.724 21.8683 326.775 22.1842C328.283 22.1842 329.792 22.615 331.535 22.9883C332.011 23.2229 332.427 23.8582 332.694 24.7593C332.961 25.6604 333.059 26.756 332.966 27.8133L331.522 59.7497C331.509 60.5938 331.376 61.4076 331.143 62.077C330.91 62.7465 330.587 63.2382 330.221 63.4833C329.538 63.838 328.841 64.0591 328.14 64.1439C299.878 64.8331 271.616 66.3553 243.367 65.9245C212.504 65.465 181.627 63.3971 150.764 61.6739C135.04 60.8123 119.328 58.802 103.604 58.0265C85.6556 57.2224 67.6813 57.8542 49.7199 56.9926C37.2601 56.4182 24.3841 54.5227 11.274 53.0867C10.878 52.9603 10.5143 52.5324 10.246 51.8769C9.97766 51.2214 9.82144 50.3795 9.80432 49.4967Z" />
            </svg>
          </div>

          {/* Buttons */}
          <div className="flex items-center">
            {/* Blue and yellow circles */}
            {boxes.map((_, index) => (
              <div
                key={index}
                className={`w-5 h-5 rounded-full mx-1 cursor-pointer ${
                  index === currentIndex ? 'bg-sky-500' : 'bg-amber-400'
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
            {/* Next button */}
            <button
              onClick={handleNext}
              className=" p-4 rounded-full ml-2 text-lg font-bold leading-none shadow-sm transform scale-y-150">
              {'>'}
            </button>

          </div>
        </div>
        <div className="relative z-[-2] top-[-50px] text-gray-800 p-12 py-24 mx-auto bg-gray-100 shadow-2xl">
          <p className="text-justify">{boxes[currentIndex].description}</p>
        </div>
      </section>
      {/* SVG row array behind the secondary section */}
      <div className="absolute bottom-0 md:top-0 left-0 w-full z-0 ">
        <div className="flex mx-2 md:mx-12  md:translate-y-full" >
          {Array.from({ length: svgCount }).map((_, svgIndex) => (
            <svg
              key={svgIndex}
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="268"
              viewBox="0 0 68 268"
              fill="none"
              className="px-2"
            >
              <path
                d="M67.6863 246.015C67.833 250.383 66.2783 254.644 63.3332 257.946C60.388 261.248 56.2693 263.348 51.8002 263.826C39.4054 265.011 28.312 266.055 17.2806 267.2C6.6004 268.324 2.07628 260.152 1.37391 247.24C0.56825 232.642 0.113775 217.983 0.0931153 203.345C-0.0308293 144.898 -0.0308266 86.4448 0.0931231 27.9848C0.0931233 24.6515 0.361678 21.3182 0.692207 18.0652C0.988921 15.0779 2.07236 12.2152 3.83812 9.75323C5.60387 7.29125 7.99237 5.31295 10.7733 4.00907C20.0281 -0.288083 25.6678 -0.569205 44.7558 1.49905C48.8752 1.98753 52.6892 3.86075 55.5375 6.79441C58.3859 9.72807 60.0892 13.5375 60.3527 17.5632C66.3642 91.418 65.8271 166.578 67.6863 246.015Z"
                fill="#69BFAF"
              />
            </svg>
          ))}
        </div>
      </div>
    </section>
  );
};
