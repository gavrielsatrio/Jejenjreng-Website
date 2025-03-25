import { IEvent } from "@/interfaces/models/IEvent";
import { IPage } from "@/interfaces/notions/IPage";

function useNotion() {
  const getUpcomingEvents = async () => {
    const request = await fetch('/api/events/upcoming');
    const response = await request.json();

    return response as Array<IPage<IEvent>>;
  }

  const getPastEvents = async () => {
    const request = await fetch('/api/events/past');
    const response = await request.json();

    return response as Array<IPage<IEvent>>;
  }

  const getAllEvents = async () => {
    const request = await fetch('/api/events');
    const response = await request.json();

    return response as Array<IPage<IEvent>>;
  }

  return {
    getUpcomingEvents,
    getPastEvents,
    getAllEvents
  }
}

export { useNotion }