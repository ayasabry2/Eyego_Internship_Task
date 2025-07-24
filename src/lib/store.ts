import { createSlice, configureStore } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
}

interface AuthState {
  user: { id: number; name: string; email: string } | null;
  isAuthenticated: boolean;
}

interface DataState {
  items: Product[];
  filters: { title: string; category: string };
  sort: { field: string; order: 'asc' | 'desc' };
  currentPage: number;
  itemsPerPage: number;
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false } as AuthState,
  reducers: {
    login: (state, action: { payload: { id: number; name: string; email: string } }) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});


const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    filters: { title: '', category: '' },
    sort: { field: 'title', order: 'asc' },
    currentPage: 1,
    itemsPerPage: 5,
  } as DataState,
  reducers: {
    setFilters: (state, action: { payload: { title: string; category: string } }) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    setSort: (state, action: { payload: { field: string; order: 'asc' | 'desc' } }) => {
      state.sort = action.payload;
    },
    setPage: (state, action: { payload: number }) => {
      state.currentPage = action.payload;
    },
    setItems: (state, action: { payload: Product[] }) => {
      state.items = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { setFilters, setSort, setPage, setItems } = dataSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;