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

function AppPage() {
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
    <Container className="bg-primary px-6 pt-6 md:px-12 md:pt-12 min-h-dvh">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 h-fit md:max-h-[calc(100vh-64px)] overflow-y-hidden">
          <h1 className="font-black text-4xl md:text-5xl text-secondary">Jejenjreng</h1>
          <p className="mt-2 md:mt-4 text-secondary/70 text-sm md:text-base">Sampaikanlah dariku, walau hanya satu ayat</p>
          <Image src='/assets/jeje2.png' alt="Jeje Portrait" width={1228} height={2160} className="object-contain md:object-left w-full h-2/3 md:h-[calc(100%-64px)] py-8 px-8 "/>
        </div>
        <div className="col-span-12 md:col-span-8 md:max-h-[calc(100dvh-64px)] md:overflow-y-auto no-scrollbar mt-8 md:mt-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl md:text-3xl text-secondary">Upcoming Events</h2>
            <Link href="/events" className="underline text-secondary text-sm md:text-base">Manage all events</Link>
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
            <h2 className="font-bold text-xl md:text-3xl text-secondary">Past Events</h2>
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
      </div>
    </Container>
  )
}

export default AppPage;