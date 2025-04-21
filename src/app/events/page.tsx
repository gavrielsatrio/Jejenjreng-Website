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

  const isLoading = useAppSelector(getIsLoading);
  const events = useAppSelector(getEvents);

  const handleBack = () => {
    router.back();
  }

  useEffect(() => {
    dispatch(fetchEvents());
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