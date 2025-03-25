'use client';

import { useRouter } from "next/navigation";

import { Event } from "@/components/cards/Event";
import { Container } from "@/components/Container";
import { ChevronLeft } from "@/icons/ChevronLeft";

function Events() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }

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
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
          <Event name="CFXX" date="09/11/2025 - 10/11/2025" location="ICE BSD" type="Mail Order" orderCount={30} packedCount={5} paidCount={9} pendingCount={16} />
        </div>
      </div>
    </Container>
  )
}

export default Events;