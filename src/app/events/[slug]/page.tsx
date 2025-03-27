'use client';

import { useNotion } from "@/hooks/useNotion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"

import { IEvent } from "@/interfaces/models/IEvent";

import { Order } from "@/components/cards/Order";
import { Badge } from "@/components/Badge"
import { Skeleton } from "@/components/skeletons/Skeleton";
import { Container } from "@/components/Container"
import { SkeletonOrder } from "@/components/skeletons/SkeletonOrder";
import { ComponentState } from "@/states/ComponentState";
import { Calendar, Map, ChevronLeft } from "@/icons"

import { getDateRange } from "@/utils/notions/Date";

interface EventDetailPageState extends ComponentState {
  event: IEvent;
}

function Event() {
  const router = useRouter();
  const { getEvent } = useNotion();
  const searchParams = useSearchParams();
  const notionPageID = searchParams.get('pageID');

  const [data, setData] = useState<EventDetailPageState>({
    loading: true,
    event: {
      'Name': {
        id: '',
        type: '',
        title: []
      },
      'Event Date': {
        id: '',
        type: '',
        date: {
          start: '',
          end: ''
        }
      },
      'Location': {
        id: '',
        type: '',
        rich_text: []
      },
      'Type': {
        id: '',
        type: '',
        select: {
          id: '',
          color: '',
          name: 'Pickup'
        }
      },
      "Link GForm": {
        id: '',
        type: '',
        rich_text: []
      },
      "Link Spreadsheet": {
        id: '',
        type: '',
        rich_text: []
      },
      "Orders": []
    }
  });

  const handleBack = () => {
    router.back();
  }

  const fetchEvent = async () => {
    if (!notionPageID) {
      return;
    }

    setData(prev => ({
      ...prev,
      loading: true
    }));

    const eventPage = await getEvent(notionPageID);
    const event = eventPage.properties;

    setData(prev => ({
      ...prev,
      loading: false,
      event
    }));
  }

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <Container className="bg-[#FAFAFA] min-h-dvh px-16 py-16">
      <div className="col-span-12 flex flex-col">
        <div className="flex items-center gap-x-1 w-fit cursor-pointer" onClick={handleBack}>
          <ChevronLeft className="size-6" />
          <span>Back</span>
        </div>
        {data.loading ? (
          <>
            <Skeleton className="h-8 w-64 mt-6" />
            <Skeleton className="h-3 w-48 mt-4" />
            <Skeleton className="h-3 w-40 mt-2" />
            <Skeleton className="h-5 w-24 mt-6" />
          </>
        ) : (
          <>
            <h1 className="font-bold text-3xl mt-6">{data.event['Name'].title[0].plain_text}</h1>
            <div className="flex items-center gap-x-2 mt-3">
              <Calendar className="fill-black/60 size-4" />
              <p className="text-black/60 font-medium text-sm">{getDateRange(data.event['Event Date'].date, 'DD/MM/YYYY')}</p>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <Map className="fill-black/60 size-4" />
              <p className="text-black/60 font-medium text-sm">{data.event['Location'].rich_text.reduce((prev, curr) => `${prev} ${curr.plain_text}`, '')}</p>
            </div>
            <Badge className="bg-indigo-500/20 text-indigo-500 font-semibold italic self-start flex-none mt-6">{data.event['Type'].select.name}</Badge>
          </>
        )}

        <h3 className="mt-8 text-xl font-bold">Orders List</h3>
        <div className="grid grid-cols-2 mt-4 gap-6">
          {data.loading ? (
            <SkeletonOrder count={6} />
          ) : (
            <>
              {data.event["Orders"].map(order => (
                <Order order={order} key={order.timestamp} />
              ))}
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Event;