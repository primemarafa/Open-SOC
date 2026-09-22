import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../utils/scoring';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (seconds: number) => void;
  initialTime?: number;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onTimeUpdate, initialTime = 0 }) => {
  const [seconds, setSeconds] = useState(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const newTime = prev + 1;
          if (onTimeUpdate) onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, onTimeUpdate]);

  return (
    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-md border font-mono text-lg transition-all ${
      isRunning 
        ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
        : 'bg-gray-800 border-gray-700 text-gray-400'
    }`}>
      <Clock className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
      <span>{formatTime(seconds)}</span>
    </div>
  );
};

export default Timer;
