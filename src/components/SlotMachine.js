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
    const [juniorCount, setJuniorCount] = useState(0);
    const [showFireworks, setShowFireworks] = useState(false); 
    const [rejectedCount, setRejectedCount] = useState(0); 
    const [spinCount, setSpinCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false); 


    const weightedOutcomes = useMemo(() => [
      ...Array(200).fill('Ghosted'),
      ...Array(50).fill('Tumbleweed'),
      ...Array(50).fill('Crickets'),
      ...Array(50).fill('Rejected'),
      ...Array(100).fill('Junior'),
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
            } else if (newOutcomes[0] === 'Junior') {
              setJuniorCount(prevCount => prevCount + 1);
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

      useEffect(() => {
        setIsMounted(true);
        return () => {
          setIsMounted(false);
        };
      }, []);

        //   useEffect to handle forced 3-match
        useEffect(() => {
            if (isMounted && spinCount >= 0 && spinCount % 10 === 0) {
              const matchingOutcome = getRandomOutcome();
              const setMatchThree = [matchingOutcome, matchingOutcome, matchingOutcome];
              setOutcomes(setMatchThree);
              setSpinCount(prevSpinCount => prevSpinCount + 1);
          
              // Check if all outcomes are the same
              const isAllSame = setMatchThree.every(outcome => outcome === matchingOutcome);
          
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
                } else if (matchingOutcome[0] === 'Junior') {
                  setRejectedCount(prevCount => prevCount + 1);
                } else if (matchingOutcome === 'Jackpot') {
                  setJackpotCount(prevCount => {
                    // Show fireworks every time the jackpot count is incremented
                    setShowFireworks(true);
                    setTimeout(() => {
                        setShowFireworks(false);
                    }, 5000);
                    return prevCount + 1;
                    });
                }
                }
            }
            }, [isMounted, spinCount, getRandomOutcome, setJackpotCount]);



    

  return (
    <div className="slot-machine">
    <h1>Rejection Rodeo</h1>
    <p>A day in the life of a job seeking junior developer</p>
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
      <p>👶 Junior role wants 5+ years experience: {juniorCount}</p>
      <p>📞 Interview!: {jackpotCount}</p>
    </div>

    </div>
  );
};

export default SlotMachine;

