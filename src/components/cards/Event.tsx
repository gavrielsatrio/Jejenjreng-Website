import slug from "slug";
import Link from "next/link";
import React from "react";

import { IEvent } from "@/interfaces/models/IEvent";

import { Badge } from "@/components/Badge"
import { EventType } from "@/enums/EventType";
import { OrderStatus } from "@/enums/OrderStatus";
import { Box, Calendar, Map, Truck } from "@/icons"

interface EventProps extends React.HTMLAttributes<HTMLDivElement> {
  event: IEvent;
}

function Event({ event, className = '' }: EventProps) {
  return (
    <Link href={`/events/${slug(event.name)}/${slug(event.type)}/${event.notionPageID}`} className={`rounded-lg shadow-md bg-secondary-lighter hover:bg-secondary-lighter/95 p-5 md:p-6 flex flex-col gap-y-4 md:flex-row md:items-center md:gap-x-6 ${className}`}>
      {event.type === EventType.PICK_UP ? (
        <Box className="p-3 md:p-4 size-12 md:size-14 fill-primary/80 box-border rounded-full bg-primary/15 flex-none" />
      ) : (
        <Truck className="p-3 md:p-4 size-12 md:size-14 fill-primary/80 box-border rounded-full bg-primary/15 flex-none" />
      )}
      <div className="grow self-start">
        <div className="flex justify-between">
          <div>
            <h3 className="font-extrabold text-lg md:text-xl text-primary">{event.name}</h3>
            <div className="flex items-center gap-x-2 mt-2">
              <Calendar className="fill-primary-light size-4 flex-none" />
              <p className="text-primary-light font-medium text-xs md:text-sm">{event.date}</p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <Map className="fill-primary-light size-4 flex-none" />
              <p className="text-primary-light font-medium text-xs md:text-sm">{event.location}</p>
            </div>
          </div>
          <Badge className="bg-indigo-500/20 text-indigo-500 font-semibold italic self-start flex-none text-xs md:text-sm">{event.type}</Badge>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge className="bg-primary-light/20 text-primary-light">{event.orders.length} orders</Badge>
          <Badge className="bg-emerald-500/20 text-emerald-500">{event.orders.filter(order => order.status === OrderStatus.DELIVERED).length} delivered</Badge>
          <Badge className="bg-yellow-900/20 text-yellow-900">{event.orders.filter(order => order.status === OrderStatus.PACKED).length} packed</Badge>
          <Badge className="bg-blue-500/20 text-blue-500">{event.orders.filter(order => order.status === OrderStatus.PAID).length} paid</Badge>
          <Badge className="bg-amber-500/20 text-amber-500">{event.orders.filter(order => order.status === OrderStatus.INVOICE_SENT).length} invoice sent</Badge>
          <Badge className="bg-red-500/20 text-red-500">{event.orders.filter(order => order.status === OrderStatus.PENDING).length} pending</Badge>
        </div>
      </div>
    </Link>
  )
}

export { Event }