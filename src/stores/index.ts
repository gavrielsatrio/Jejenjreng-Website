import { configureStore } from "@reduxjs/toolkit";

import { event } from "@/slices/event";
import { order } from "@/slices/order";
import { events } from "@/slices/events";
import { orders } from "@/slices/orders";
import { products } from "@/slices/products";
import { pastEvents } from "@/slices/past-events";
import { upcomingEvents } from "@/slices/upcoming-events";

export const makeStore = () => {
  return configureStore({
    reducer: {
      event: event.reducer,
      events: events.reducer,
      upcomingEvents: upcomingEvents.reducer,
      pastEvents: pastEvents.reducer,
      order: order.reducer,
      orders: orders.reducer,
      products: products.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']