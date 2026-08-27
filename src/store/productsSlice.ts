import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types/product";

type ProductsState = {
  items: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
};

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  categories: [],
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const products: Product[] = await response.json();
      return products;
    } catch {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.categories = [
          ...new Set(action.payload.map((product) => product.category)),
        ];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productsSlice.reducer;
