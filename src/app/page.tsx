'use client';

import Link from "next/link";
import Image from "next/image";
import { useNotion } from "@/hooks/useNotion";
import { useEffect, useState } from "react";

import { IPage } from "@/interfaces/notions/IPage";
import { IEvent } from "@/interfaces/models/IEvent";

import { Event } from "@/components/cards/Event";
import { Container } from "@/components/Container";
import { SkeletonEvent } from "@/components/skeletons/SkeletonEvent";
import { ComponentState } from "@/states/ComponentState";

interface AppPageState extends ComponentState {
  upcomingEvents: Array<IPage<IEvent>>,
  pastEvents: Array<IPage<IEvent>>
}

function App() {
  const { getUpcomingEvents, getPastEvents } = useNotion();

  const [data, setData] = useState<AppPageState>({
    loading: true,
    upcomingEvents: [],
    pastEvents: []
  });

  const fetchEvents = async () => {
    setData(prev => ({
      ...prev,
      loading: true
    }));

    const [upcomingEvents, pastEvents] = await Promise.all([await getUpcomingEvents(), await getPastEvents()]);

    setData(prev => ({
      ...prev,
      loading: false,
      upcomingEvents,
      pastEvents
    }));
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container className="bg-[#FAFAFA] min-h-dvh px-16 pt-16">
      <title>Jejenjreng Website</title>

      <div className="col-span-4 max-h-[calc(100vh-64px)] overflow-y-hidden">
        <h1 className="font-black text-5xl">Jejenjreng</h1>
        <p className="mt-4 text-black/60">Sampaikanlah dariku, walau hanya satu ayat</p>
        <Image src='/assets/jeje2.png' alt="Jeje Portrait" width={1228} height={2160} className="object-contain object-left w-full h-[calc(100%-64px)] py-8 px-4" />
      </div>
      <div className="col-span-8 max-h-[calc(100dvh-64px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-3xl">Upcoming Events</h2>
          <Link href="/events" className="underline">Manage all events</Link>
        </div>
        <div className="flex flex-col gap-y-6">
          {data.loading ? (
            <SkeletonEvent count={2} />
          ) : (
            <>
              {data.upcomingEvents.map(eventPage => (
                <Event
                  notionPageID={eventPage.id}
                  event={eventPage.properties}
                  key={eventPage.id} />
              ))}
            </>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 mt-10">
          <h2 className="font-bold text-3xl">Past Events</h2>
        </div>
        <div className="flex flex-col gap-y-6 mb-16">
          {data.loading ? (
            <SkeletonEvent count={3} />
          ) : (
            <>
              {data.pastEvents.map(eventPage => (
                <Event
                  notionPageID={eventPage.id}
                  event={eventPage.properties}
                  key={eventPage.id} />
              ))}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default App;