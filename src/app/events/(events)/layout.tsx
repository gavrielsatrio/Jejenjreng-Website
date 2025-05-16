import { Metadata } from "next";
import EventsPage from "./page";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jejenjreng Website - Events',
    description: 'Sampaikanlah dariku, walau hanya satu ayat'
  }
}

export default function EventsPageLayout() {
  return <EventsPage/>;
}