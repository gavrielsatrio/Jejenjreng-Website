import { configureStore } from "@reduxjs/toolkit";

import { event } from "@/slices/event";
import { orders } from "@/slices/orders";
import { events } from "@/slices/events";
import { pastEvents } from "@/slices/past-events";
import { upcomingEvents } from "@/slices/upcoming-events";

export const makeStore = () => {
  return configureStore({
    reducer: {
      event: event.reducer,
      events: events.reducer,
      upcomingEvents: upcomingEvents.reducer,
      pastEvents: pastEvents.reducer,
      orders: orders.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']