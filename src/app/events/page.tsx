'use client';

import { useRouter } from "next/navigation";
import { useNotion } from "@/hooks/useNotion";
import { useEffect, useState } from "react";

import { IPage } from "@/interfaces/notions/IPage";
import { IEvent } from "@/interfaces/models/IEvent";

import { getDateRange } from "@/utils/notions/Date";

import { Event } from "@/components/cards/Event";
import { Container } from "@/components/Container";
import { ChevronLeft } from "@/icons/ChevronLeft";
import { ComponentState } from "@/states/ComponentState";

interface EventsPageState extends ComponentState {
  events: Array<IPage<IEvent>>,
}

function Events() {
  const router = useRouter();
  const { getAllEvents } = useNotion();

  const [data, setData] = useState<EventsPageState>({
    loading: true,
    events: []
  });

  const fetchEvents = async () => {
    setData(prev => ({
      ...prev,
      loading: true
    }));

    const events = await getAllEvents();

    setData(prev => ({
      ...prev,
      loading: false,
      events
    }));
  }

  const handleBack = () => {
    router.back();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container className="bg-[#FAFAFA] min-h-dvh px-16 py-16">
      <div className="col-span-12">
        <div className="flex items-center gap-x-1 w-fit cursor-pointer" onClick={handleBack}>
          <ChevronLeft className="size-6" />
          <span>Back</span>
        </div>
        <h1 className="font-bold text-3xl mt-6">All Events</h1>
        <p className="mt-2">New events can be added from Notion</p>

        <div className="grid grid-cols-2 mt-6 gap-6">
          {data.events.map(event => (
            <Event
              name={event.properties['Name'].title[0].plain_text}
              date={getDateRange(event.properties['Event Date'].date, 'DD/MM/YYYY')}
              location={event.properties['Location'].rich_text.reduce((prev, curr) => `${prev} ${curr.plain_text}`, '')}
              type={event.properties['Type'].select.name}
              orderCount={30}
              packedCount={5}
              paidCount={9}
              pendingCount={16}
              key={event.id} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Events;