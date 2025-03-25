'use client';

import { useRouter } from "next/navigation"

import { Badge } from "@/components/Badge"
import { Order } from "@/components/cards/Order"
import { Container } from "@/components/Container"
import { Calendar, Map, ChevronLeft } from "@/icons"

function Event() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

  return (
    <Container className="bg-[#FAFAFA] min-h-dvh px-16 py-16">
      <div className="col-span-12 flex flex-col">
        <div className="flex items-center gap-x-1 w-fit cursor-pointer" onClick={handleBack}>
          <ChevronLeft className="size-6" />
          <span>Back</span>
        </div>
        <h1 className="font-bold text-3xl mt-6">CFXX</h1>
        <div className="flex items-center gap-x-2 mt-3">
          <Calendar className="fill-black/60 size-4" />
          <p className="text-black/60 font-medium text-sm">09/11/2025 - 10/11/2025</p>
        </div>
        <div className="flex items-center gap-x-2 mt-2">
          <Map className="fill-black/60 size-4" />
          <p className="text-black/60 font-medium text-sm">ICE BSD</p>
        </div>
        <Badge className="bg-sky-500/20 text-sky-500 font-semibold italic self-start flex-none mt-6">Pickup</Badge>

        <h3 className="mt-8 text-xl font-bold">Orders List</h3>
        <div className="grid grid-cols-2 mt-4 gap-6">
          <Order  />
        </div>
      </div>
    </Container>
  )
}

export default Event;