import { useState, useEffect, useRef } from 'react';
import GES from '../../../assets/images/GES.jpg';
import Booths from '../../../assets/images/Booths.jpg';
import PlumbingWorld from '../../../assets/images/PlumbingWorld.png';
import MPM from '../../../assets/images/MPM.jpg';
import ThermoKing from '../../../assets/images/ThermoKing.jpg';

const Sponsors = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const images = [
      { src: GES, alt: 'BC', cl:"w-[150px] lg:w-[300px]" },
      { src: Booths, alt: 'BC', cl:"w-[150px] lg:w-[300px]" },
      { src: PlumbingWorld, alt: 'BC', cl:"w-[150px] lg:w-[300px] bg-black" },
      { src: MPM, alt: 'BC', cl:"w-[150px] lg:w-[300px]" },
      { src: ThermoKing, alt: 'BC', cl:"w-[150px] lg:w-[300px]" },
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Adjust the duration (in milliseconds) for each image
  
      return () => clearInterval(interval);
    }, []);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    useEffect(() => {
      const scrollPosition = currentIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scroll({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }, [currentIndex]);
  
    return (
      <div className="overflow-hidden">
        <div className="flex overflow-x-auto lg:justify-center items-center space-x-12 ml-4 lg:ml-0" ref={carouselRef}>
          {images.map((image, index) => (
            <img
              key={index}
              className={image.cl}
              alt={image.alt}
              src={image.src}
            />
          ))}
        </div>
      </div>
  )
}

export default Sponsors