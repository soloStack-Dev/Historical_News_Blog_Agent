import { useRef, useEffect } from "react";
import gsap from "gsap";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image12 from "../assets/image12.png";
import image13 from "../assets/image13.png";

interface GridImage {
  src: string;
  alt: string;
  hoverText?: string;
}

const images: GridImage[] = [
  { src: image1, alt: "Historical Image 1" },
  { src: image2, alt: "The Loch Ness Monster", hoverText: "The Loch Ness Monster" },
  { src: image3, alt: "The Tasmanian Tiger", hoverText: "The Tasmanian Tiger (Thylacine)" },
  { src: image4, alt: "Historical Image 4" },
  { src: image5, alt: "The Giant Squid", hoverText: "The Giant Squid" },
  { src: image6, alt: "Historical Image 6" },
  { src: image7, alt: "The Okapi", hoverText: "The Okapi \u2014 The Animal Once Believed to Be a Myth" },
  { src: image8, alt: "Historical Image 8" },
  { src: image9, alt: "Historical Image 9" },
  { src: image10, alt: "The Fall of the Berlin Wall", hoverText: "The Fall of the Berlin Wall (1989)" },
  { src: image11, alt: "The Birth of the International Red Cross", hoverText: "The Birth of the International Red Cross (1863)" },
  { src: image12, alt: "Historical Image 12" },
  { src: image13, alt: "Historical Image 13" },
];

function GridItem({ image }: { image: GridImage }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !textRef.current) return;

    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(textRef.current, { opacity: 0, y: 20 });
  }, []);

  function handleEnter() {
    if (!overlayRef.current || !textRef.current) return;
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" });
    gsap.to(textRef.current, { opacity: 1, y: 0, duration: 0.4, delay: 0.05, ease: "power2.out" });
  }

  function handleLeave() {
    if (!overlayRef.current || !textRef.current) return;
    gsap.to(textRef.current, { opacity: 0, y: 20, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.05, ease: "power2.in" });
  }

  return (
    <div
      ref={itemRef}
      className="image-grid__item"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img src={image.src} alt={image.alt} className="image-grid__img" />
      {image.hoverText && (
        <div ref={overlayRef} className="image-grid__overlay">
          <div ref={textRef} className="image-grid__text">
            {image.hoverText}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ImageGrid() {
  return (
    <section className="image-grid-section">
      <div className="image-grid-section__header">
        <hr className="image-grid-section__hr" />
        <h2 className="image-grid-section__title">Chronicle Visual Archives</h2>
        <p className="image-grid-section__subtitle">Moments captured across history</p>
        <hr className="image-grid-section__hr" />
      </div>

      <div className="image-grid">
        {images.map((image, i) => (
          <GridItem key={i} image={image} />
        ))}
      </div>
    </section>
  );
}
