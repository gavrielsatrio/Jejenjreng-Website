import { RootState } from "@/stores";

const getOrders = (state: RootState) => state.orders.orders;
const getIsLoading = (state: RootState) => state.orders.isLoading;

export {
  getOrders,
  getIsLoading
}