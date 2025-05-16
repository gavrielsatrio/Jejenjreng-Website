import { Metadata } from "next";
import EventPage from "./page";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jejenjreng Website - Event',
    description: 'Sampaikanlah dariku, walau hanya satu ayat'
  }
}

export default function EventPageLayout() {
  return <EventPage/>
}