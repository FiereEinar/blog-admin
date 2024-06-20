import { useState, useEffect } from 'react';

/**
 * greatly paired with toast component from shadcn
 * toast component is a message that appears at the bottom right of the screen
 * i'm using Glitch free tier deployment so the server sleeps if inactive, 
 * so i'm using this every time a page makes a request because it might take long for the server to wake up
 * 
 * @param {boolean} isLoading a state that checks if the api call is still loading, SHOULD BE A STATE
 * @param {number} deadline how many loading seconds do you want to elapse before firing a function
 * @param {Function} fnToRun the function you want to run if a certain seconds(deadline) have elapsed
 */
export default function useLoadingTracker(isLoading, deadline, fnToRun) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [messageShown, setMessageShown] = useState(false);

  useEffect(() => {
    let intervalId = null;

    if (isLoading) {
      intervalId = setInterval(() => {
        setSecondsElapsed((prevSecondsElapsed) => prevSecondsElapsed + 1);
      }, 1000);
    } else {
      setSecondsElapsed(0);
    }

    if (secondsElapsed > deadline && !messageShown) {
      fnToRun();
      setMessageShown(true);
    }

    if (intervalId) return () => clearInterval(intervalId);
  }, [isLoading, secondsElapsed, messageShown, deadline, fnToRun]);
}
