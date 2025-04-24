"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ExamDurationProps = {
  duration: number;
  onTimerEnd?: () => void;
  onTimechange?: (date: Date) => void;
};

export default function ExamDuration({
  duration,
  onTimerEnd,
  onTimechange,
}: ExamDurationProps) {
  // State
  const [date, setDate] = useState(new Date(0).setMinutes(duration));

  // Effects
  useEffect(() => {
    const timerId = setInterval(() => {
      setDate((prev) => {
        const currentDate = new Date(prev);

        // Check if the time is up
        if (currentDate.getMinutes() === 0 && currentDate.getSeconds() === 0) {
          onTimerEnd?.();

          window.clearInterval(timerId);

          return Date.now();
        }

        // Invoke time handler on each iteration
        onTimechange?.(currentDate);

        return currentDate.setSeconds(currentDate.getSeconds() - 1);
      });
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [onTimerEnd, onTimechange]);

  return (
    <div className="flex items-center leading-none gap-1.5 text-green-600 ">
      {/* Icon */}
      <Image
        src={"/assets/clock.png"}
        alt="Clock Icon"
        width={15}
        height={0}
        className="-mt-1"
      />
      <span className="font-semibold">
        {Intl.DateTimeFormat("en-US", {
          minute: "2-digit",
          second: "2-digit",
        }).format(date)}
      </span>
    </div>
  );
}
