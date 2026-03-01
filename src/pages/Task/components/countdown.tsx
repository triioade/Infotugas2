import { useEffect, useState } from "react";
import { parseISO, differenceInMilliseconds } from "date-fns";

interface Props {
  deadline: string;
}

export default function Countdown({ deadline }: Props) {
  const [timeLeft, setTimeLeft] = useState(
    differenceInMilliseconds(parseISO(deadline), new Date())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(
        differenceInMilliseconds(parseISO(deadline), new Date())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (timeLeft <= 0) {
    return (
      <span className="text-red-500 text-xs">Deadline passed</span>
    );
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <span className="text-xs text-red-600">
      {days}d {hours}h {minutes}m {seconds}s left
    </span>
  );
}

