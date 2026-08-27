import { useEffect, useState } from "react";

const DEFAULT_DURATION = 5 * 60;

export const useCountdown = (initialTime = DEFAULT_DURATION) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => previousTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const isExpired = timeLeft <= 0;

  const reset = () => {
    setTimeLeft(initialTime);
  };

  return {
    timeLeft,
    formattedTime,
    isExpired,
    reset,
  };
};
