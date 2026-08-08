import { useEffect, useState, useRef } from "react";

export default function useAuctionTimer(onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        clearInterval(interval);
        setRunning(false);
        setTimeout(() => {
          onTimeUpRef.current?.();
        }, 0);
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, timerKey]);

  const startTimer = () => {
    setTimeLeft(20);
    setRunning(true);
    setTimerKey((k) => k + 1);
  };

  const resetTimer = () => {
    setTimeLeft(20);
    setRunning(true);
    setTimerKey((k) => k + 1);
  };

  const stopTimer = () => {
    setRunning(false);
    setTimeLeft(20);
  };

  return {
    timeLeft,
    running,
    startTimer,
    resetTimer,
    stopTimer,
  };
}