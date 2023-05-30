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
    { src: GES, alt: 'BC', cl: 'w-[200px] lg:w-[300px]' },
    { src: Booths, alt: 'BC', cl: 'w-[200px] lg:w-[300px]' },
    { src: PlumbingWorld, alt: 'BC', cl: 'w-[200px] lg:w-[300px] bg-black' },
    { src: MPM, alt: 'BC', cl: 'w-[200px] lg:w-[300px]' },
    { src: ThermoKing, alt: 'BC', cl: 'w-[200px] lg:w-[300px]' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Adjust the duration (in milliseconds) for each image

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCurrentIndex(0); // Reset index to show the first image on small screens
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
    <h1 className="text-bold text-black text-xl mb-5">Our Sponsors</h1>
    <div className="overflow-hidden">    
      <div className={`flex ${window.innerWidth <= 768 ? 'justify-center' : 'justify-between'} items-center lg:space-x-12 ml-4 lg:ml-0 h-[150px] lg:h-[250px]`}  ref={carouselRef}>
        {images.map((image, index) => (
          <img
            key={index}
            className={image.cl + (window.innerWidth <= 768 && index !== currentIndex ? ' hidden' : '')}
            alt={image.alt}
            src={image.src}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Sponsors;