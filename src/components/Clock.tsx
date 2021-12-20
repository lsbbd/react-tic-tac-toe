import React, { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearTimeout(timerId);
  }, []);

  return <h2>{date.toLocaleTimeString()}</h2>;
}
