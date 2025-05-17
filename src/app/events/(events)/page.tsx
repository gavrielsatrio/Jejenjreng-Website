'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { fetchEvents } from "@/slices/events";
import { getEvents, getIsLoading } from "@/slices/events/selector";

import { Event } from "@/components/cards/Event";
import { Container } from "@/components/Container";
import { ChevronLeft } from "@/icons/ChevronLeft";
import { SkeletonEvent } from "@/components/skeletons/SkeletonEvent";

function EventsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const events = useAppSelector(getEvents);
  const isLoading = useAppSelector(getIsLoading);

  const handleBack = () => {
    router.back();
  }

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <Container className="bg-primary px-12 pt-12">
      <div className="min-h-dvh">
        <div className="flex items-center gap-x-1 w-fit cursor-pointer" onClick={handleBack}>
          <ChevronLeft className="size-6 fill-secondary" />
          <span className="text-secondary">Back</span>
        </div>
        <h1 className="font-bold text-3xl mt-6 text-secondary">All Events</h1>
        <p className="mt-2 text-secondary/70">New events can be added from Notion</p>

        <div className="grid grid-cols-2 mt-6 gap-6">
          {isLoading ? (
            <SkeletonEvent count={6} />
          ) : (
            <>
              {events.map(event => (
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

export default EventsPage;