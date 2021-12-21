import { useEffect, useState } from "react";

export function useNow(refreshInterval: number = 1000): Date {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timerId = setInterval(() => {
      setDate(new Date());
    }, refreshInterval);
    return () => clearTimeout(timerId);
  }, [refreshInterval]);

  return date;
}
