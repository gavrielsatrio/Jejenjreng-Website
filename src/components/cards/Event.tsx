import slug from "slug";
import Link from "next/link";
import React from "react";

import { getDateRange } from "@/utils/notions/Date";

import { IEvent } from "@/interfaces/models/IEvent";

import { Badge } from "@/components/Badge"
import { Box, Calendar, Map, Truck } from "@/icons"
import { OrderStatus } from "@/enums/OrderStatus";

interface EventProps extends React.HTMLAttributes<HTMLDivElement> {
  notionPageID: string;
  event: IEvent;
}

function Event({ notionPageID, event, className = '' }: EventProps) {
  return (
    <Link href={`/events/${slug(`${event['Name'].title[0].plain_text} ${event['Type'].select.name}`)}?pageID=${notionPageID}`} className={`border border-[#C8C8C8] rounded-lg shadow-sm bg-white p-6 flex items-center gap-x-6 ${className}`}>
      {event['Type'].select.name === 'Pickup' ? (
        <Box className="p-4 size-14 fill-red-500/80 box-border rounded-full bg-red-500/10 flex-none" />
      ) : (
        <Truck className="p-4 size-14 fill-blue-500/80 box-border rounded-full bg-blue-500/10 flex-none" />
      )}
      <div className="grow self-start">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-xl">{event['Name'].title[0].plain_text}</h3>
            <div className="flex items-center gap-x-2 mt-2">
              <Calendar className="fill-black/50 size-4 flex-none" />
              <p className="text-black/50 font-medium text-sm">{getDateRange(event['Event Date'].date, 'DD/MM/YYYY')}</p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <Map className="fill-black/50 size-4 flex-none" />
              <p className="text-black/50 font-medium text-sm">{event['Location'].rich_text.reduce((prev, curr) => `${prev} ${curr.plain_text}`, '')}</p>
            </div>
          </div>
          <Badge className="bg-indigo-500/20 text-indigo-500 font-semibold italic self-start flex-none">{event['Type'].select.name}</Badge>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge className="bg-orange-500/20 text-orange-500">{event["Orders"].length} orders</Badge>
          <Badge className="bg-emerald-500/20 text-emerald-500">{event["Orders"].filter(order => order.status === OrderStatus.PACKED).length} packed</Badge>
          <Badge className="bg-blue-500/20 text-blue-500">{event["Orders"].filter(order => order.status === OrderStatus.PAID).length} paid</Badge>
          <Badge className="bg-red-500/20 text-red-500">{event["Orders"].filter(order => order.status === OrderStatus.PENDING).length} pending</Badge>
        </div>
      </div>
    </Link>
  )
}

export { Event }