import { RootState } from "@/stores";

const getOrders = (state: RootState) => state.orders.orders;
const getShownOrders = (state: RootState) => state.orders.shownOrders;
const getOrdersFilters = (state: RootState) => state.orders.filters;
const getOrdersSort = (state: RootState) => state.orders.sort;
const getIsLoading = (state: RootState) => state.orders.isLoading;

export {
  getOrders,
  getShownOrders,
  getOrdersFilters,
  getOrdersSort,
  getIsLoading
}