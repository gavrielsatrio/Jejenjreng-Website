import { RootState } from "@/stores";

const getProducts = (state: RootState) => state.products.products;
const getIsError = (state: RootState) => state.products.isError;
const getIsLoading = (state: RootState) => state.products.isLoading;

export {
  getProducts,
  getIsError,
  getIsLoading
}