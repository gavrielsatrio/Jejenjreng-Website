'use client';

import Image from "next/image";
import { useEffect } from "react";

import { Event } from "@/components/cards/Event";
import { Container } from "@/components/Container";

function App() {
  const fetchEvents = async () => {
    
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
        <Image src='/assets/jeje.png' alt="Jeje Portrait" width={1228} height={2160} className="object-contain w-full h-[calc(100%-64px)] p-12" />
      </div>
      <div className="col-span-8 max-h-[calc(100dvh-64px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-3xl">Upcoming Events</h2>
          <a href="/events">Manage all events</a>
        </div>
        <div className="flex flex-col gap-y-6">
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Pickup" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
        </div>

        <div className="flex items-center justify-between mb-6 mt-10">
          <h2 className="font-bold text-3xl">Past Events</h2>
        </div>
        <div className="flex flex-col gap-y-6 mb-16">
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
        </div>
      </div>
    </Container>
  )
}

export default App;