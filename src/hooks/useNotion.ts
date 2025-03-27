import { IPage } from "@/interfaces/notions/IPage";
import { IEvent } from "@/interfaces/models/IEvent";

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

  const getEvent = async (notionPageID: string) => {
    const request = await fetch(`/api/events/${notionPageID}`);
    const response = await request.json();

    return response as IPage<IEvent>;
  }

  return {
    getUpcomingEvents,
    getPastEvents,
    getAllEvents,
    getEvent
  }
}

export { useNotion }