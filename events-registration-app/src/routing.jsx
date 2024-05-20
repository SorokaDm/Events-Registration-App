import { createBrowserRouter } from "react-router-dom";
import EventsList from "./components/EventsList";
import EventRegistration from "./components/EventRegistration";
import EventParticipants from "./components/EventParticipants";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EventsList />,
  },
  {
    path: "/event_registration",
    element: <EventRegistration />,
  },
  {
    path: "/event_participants",
    element: <EventParticipants />,
  },
]);
