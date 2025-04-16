'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

import { fetchPastEvents } from "@/slices/past-events";
import { fetchUpcomingEvents } from "@/slices/upcoming-events";
import { getPastEvents, getIsLoading as getPastEventsIsLoading } from "@/slices/past-events/selector";
import { getUpcomingEvents, getIsLoading as getUpcomingEventsIsLoading } from "@/slices/upcoming-events/selector";

import { Event } from "@/components/cards/Event";
import { Container } from "@/components/Container";
import { SkeletonEvent } from "@/components/skeletons/SkeletonEvent";

function App() {
  const dispatch = useAppDispatch();

  const isUpcomingEventsLoading = useAppSelector(getUpcomingEventsIsLoading);
  const isPastEventsLoading = useAppSelector(getPastEventsIsLoading);
  const upcomingEvents = useAppSelector(getUpcomingEvents);
  const pastEvents = useAppSelector(getPastEvents);

  useEffect(() => {
    dispatch(fetchUpcomingEvents());
    dispatch(fetchPastEvents());
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
          {isUpcomingEventsLoading ? (
            <SkeletonEvent count={2} />
          ) : (
            <>
              {upcomingEvents.map(event => (
                <Event
                  event={event}
                  key={event.notionPageID} />
              ))}
            </>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 mt-10">
          <h2 className="font-bold text-3xl">Past Events</h2>
        </div>
        <div className="flex flex-col gap-y-6 mb-16">
          {isPastEventsLoading ? (
            <SkeletonEvent count={3} />
          ) : (
            <>
              {pastEvents.map(event => (
                <Event
                  event={event}
                  key={event.notionPageID} />
              ))}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default App;