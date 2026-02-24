import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ImageStack.css';

const IMAGES = [
  '/Assets/carousel-pics/pic1_carousel.png',
  '/Assets/carousel-pics/pic2_carousel.png',
  '/Assets/carousel-pics/pic3_carousel.png',
];

/* Each card: where it starts (off-screen below) → where it lands */
const CARDS = [
  { yStart: 800, scaleStart: 0.3, enter: 0.0, settle: 0.3 },
  { yStart: 600, scaleStart: 0.4, enter: 0.2, settle: 0.5 },
  { yStart: 400, scaleStart: 0.6, enter: 0.4, settle: 0.7 },
];

const StackCard = ({ src, card, scrollYProgress, index }) => {
  const isCenter = index > 0;

  const y = useTransform(
    scrollYProgress,
    [card.enter, card.settle, 1],
    [card.yStart, isCenter ? 0 : 0, isCenter ? 0 : 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [card.enter, card.settle],
    [card.scaleStart, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [card.enter, card.enter + 0.05, card.settle],
    [0, 1, 1]
  );

  return (
    <motion.div
      className="image-stack-card"
      style={{ y, scale, opacity }}
    >
      <img src={src} alt="" draggable={false} />
    </motion.div>
  );
};

const ImageStack = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="image-stack-section" ref={sectionRef}>
      <div className="image-stack-sticky">
        <div className="image-stack-container">
          {IMAGES.map((src, i) => (
            <StackCard
              key={i}
              src={src}
              card={CARDS[i]}
              scrollYProgress={scrollYProgress}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageStack;
