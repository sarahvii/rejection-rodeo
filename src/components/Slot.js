import React from 'react';
import { useSpring, animated } from 'react-spring';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GiTumbleweed } from 'react-icons/gi';
import { TbGhost2 } from 'react-icons/tb';
import { GiCricket } from 'react-icons/gi';
import { TbMoodCry } from 'react-icons/tb';

const Slot = ({ outcome, isSpinning, isAllSame }) => {
    const spinProps = useSpring({
      to: { transform: 'rotate(3600deg)' },
      from: { transform: 'rotate(0deg)' },
      config: { duration: 1000 },
      reset: isSpinning,
      reverse: false,
    });

// Map outcome names to icon components
const iconMap = {
    Tumbleweed: <GiTumbleweed size={50} />, 
    Jackpot: <BsFillTelephoneFill size={50} />, 
    Ghosted: <TbGhost2 size={50} />, 
    Rejected: <TbMoodCry size={50} />,
    Crickets: <GiCricket size={50} />, 
  };

  const getIconComponent = (outcome) => {
    return iconMap[outcome] || null;
  };
  console.log(outcome);
  
    return (
        <animated.div
        className={`slot ${isAllSame ? 'matched' : ''}`}
        style={spinProps}
      >
        {getIconComponent(outcome)}
      </animated.div>
    );
  };

export default Slot;
