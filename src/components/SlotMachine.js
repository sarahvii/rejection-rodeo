import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Button from './Button';
import Slot from './Slot';
import Fireworks from '@fireworks-js/react';

const SlotMachine = () => {
    const [outcomes, setOutcomes] = useState(['', '', '']);
    const [isSpinning, setIsSpinning] = useState(false);
    const [ghostedCount, setGhostedCount] = useState(0);
    const [tumbleweedCount, setTumbleweedCount] = useState(0);
    const [jackpotCount, setJackpotCount] = useState(0);
    const [cricketCount, setCricketCount] = useState(0);
    const [showFireworks, setShowFireworks] = useState(false); 
    const [rejectedCount, setRejectedCount] = useState(0); 
    const [spinCount, setSpinCount] = useState(0);

    const weightedOutcomes = useMemo(() => [
      ...Array(200).fill('Ghosted'),
      ...Array(100).fill('Tumbleweed'),
      ...Array(100).fill('Crickets'),
      ...Array(50).fill('Rejected'),
      ...Array(200).fill('Jackpot')
    ], []);

    const getRandomOutcome = useCallback(() => {
        const randomIndex = Math.floor(Math.random() * weightedOutcomes.length);
        return weightedOutcomes[randomIndex];
      }, [weightedOutcomes]);



    const handleSpinClick = () => {
        setIsSpinning(true);
      
        setTimeout(() => {
            setIsSpinning(false);
            const newOutcomes = Array.from({ length: 3 }, getRandomOutcome);
            setOutcomes(newOutcomes);

            // Increment spinCount
            setSpinCount(prevSpinCount => prevSpinCount + 1);


            // Check if all outcomes are the same
            const isAllSame = newOutcomes.every(outcome => outcome === newOutcomes[0]);

      
          // Update counters based on outcomes
          if (isAllSame) {
            if (newOutcomes[0] === 'Ghosted') {
              setGhostedCount(prevCount => prevCount + 1);
            } else if (newOutcomes[0] === 'Tumbleweed') {
              setTumbleweedCount(prevCount => prevCount + 1);
            } else if (newOutcomes[0] === 'Crickets') {
              setCricketCount(prevCount => prevCount + 1);
            } else if (newOutcomes[0] === 'Rejected') {
              setRejectedCount(prevCount => prevCount + 1);
            } else if (newOutcomes[0] === 'Jackpot') {
              setJackpotCount(prevCount => prevCount + 1);
          
              if (jackpotCount === 0) {
                setShowFireworks(true);
                setTimeout(() => {
                  setShowFireworks(false);
                }, 5000);
              }
            }
          }
          setIsSpinning(false);
        }, 1000);
      };

//   useEffect to handle forced 3-match
  useEffect(() => {
    if (spinCount >= 0 && spinCount % 10 === 0) {
      const matchingOutcome = getRandomOutcome();
      const setMatchThree = [matchingOutcome, matchingOutcome, matchingOutcome]
      setOutcomes(setMatchThree);
      setSpinCount(prevSpinCount => prevSpinCount + 1);

            // Check if all outcomes are the same
            const isAllSame = [matchingOutcome, matchingOutcome, matchingOutcome].every(
                outcome => outcome === matchingOutcome
              );
        
              // Update counters based on outcomes
              if (isAllSame) {
                if (matchingOutcome === 'Ghosted') {
                  setGhostedCount(prevCount => prevCount + 1);
                } else if (matchingOutcome === 'Tumbleweed') {
                  setTumbleweedCount(prevCount => prevCount + 1);
                } else if (matchingOutcome === 'Crickets') {
                  setCricketCount(prevCount => prevCount + 1);
                } else if (matchingOutcome === 'Rejected') {
                  setRejectedCount(prevCount => prevCount + 1);
                } else if (matchingOutcome === 'Jackpot') {
                  setJackpotCount(prevCount => prevCount + 1);
        
                  if (jackpotCount === 0) {
                    setShowFireworks(true);
                    setTimeout(() => {
                      setShowFireworks(false);
                    }, 5000);
                  }
                }
              }
            }

  }, [spinCount, getRandomOutcome, jackpotCount]);
    

  return (
    <div className="slot-machine">
    <h1>Rejection Rodeo</h1>
    <div className="fireworks-container">
      {showFireworks && <Fireworks />}
    </div>
      <div className="slots">
        {outcomes.map((outcome, index) => (
        <Slot
        key={index}
        outcome={outcome}
        isSpinning={isSpinning}
        isAllSame={outcomes.every((o) => o === outcomes[0])} // Calculate isAllSame for each outcome
      />
        ))}
      </div>
      <Button onClick={handleSpinClick} isSpinning={isSpinning} />
      <div className="counters">
      <p>👻 Ghosted: {ghostedCount}</p>
      <p>🦗 Crickets: {cricketCount}</p>    
      <p>🌾 Tumbleweed: {tumbleweedCount}</p>  
      <p>😢 Rejected: {rejectedCount}</p>
      <p>📞 Interview!: {jackpotCount}</p>
    </div>

    </div>
  );
};

export default SlotMachine;

