import React from "react";

import { Badge } from "../Badge"
import { EventType } from "@/types/EventType";
import { Box, Calendar, Map, Truck } from "@/icons"

interface EventProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  type: EventType;
  date: string;
  location: string;
  orderCount: number;
  packedCount: number;
  paidCount: number;
  pendingCount: number;
}

function Event({ name, type, date, location, orderCount, packedCount, paidCount, pendingCount, className = '' }: EventProps) {
  return (
    <a href={`/events/${name.toLowerCase()}`} className={`border border-[#C8C8C8] rounded-lg shadow-sm bg-white p-6 flex items-center gap-x-6 ${className}`}>
      {type === 'Pickup' ? (
        <Box className="p-4 size-14 fill-red-500/80 box-border rounded-full bg-red-500/10 flex-none" />
      ) : (
        <Truck className="p-4 size-14 fill-blue-500/80 box-border rounded-full bg-blue-500/10 flex-none" />
      )}
      <div className="grow self-start">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold text-xl">{name}</h3>
            <div className="flex items-center gap-x-2 mt-2">
              <Calendar className="fill-black/60 size-4" />
              <p className="text-black/60 font-medium text-sm">{date}</p>
            </div>
            <div className="flex items-center gap-x-2 mt-1">
              <Map className="fill-black/60 size-4" />
              <p className="text-black/60 font-medium text-sm">{location}</p>
            </div>
          </div>
          <Badge className="bg-sky-500/20 text-sky-500 font-semibold italic self-start flex-none">{type}</Badge>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge className="bg-orange-500/20 text-orange-500">{orderCount} orders</Badge>
          <Badge className="bg-emerald-500/20 text-emerald-500">{packedCount} packed</Badge>
          <Badge className="bg-blue-500/20 text-blue-500">{paidCount} paid</Badge>
          <Badge className="bg-red-500/20 text-red-500">{pendingCount} pending</Badge>
        </div>
      </div>
    </a>
  )
}

export { Event }