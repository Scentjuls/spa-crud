import { ReactElement, Suspense, useEffect, useState } from "react";
import { Shemmer } from "../Shemmer/Shemmer";
import { baseUrl } from "../../services";
import { useNavigate } from "react-router-dom";
import { EventList } from "../../interfaces";

export const EventsList = (): ReactElement => {
  const [events, setEvents] = useState<EventList[]>([]);

  const dateChange = (date: string) => {
    const dateObject = new Date(date);
    const day = dateObject.getUTCDate().toString().padStart(2, "0");
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getUTCFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetch(baseUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/");
        }
        if (!response.ok) {
          throw new Error(`There is a network error ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);
  return (
    <Suspense fallback={<Shemmer />}>
      <ul className="grid grid-cols-3 gap-4">
        {events.map((event: EventList) => (
          <li
            className="mx-auto max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
            key={event.id}
          >
            <p>{event.name}</p>
            <p>{event.availability ? "true" : "false"}</p>
            <p>{dateChange(event.day)}</p>
          </li>
        ))}
      </ul>
    </Suspense>
  );
};
