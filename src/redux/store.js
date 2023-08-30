import { configureStore } from '@reduxjs/toolkit';
import { contactBookReducer } from './reducers';
import { userApi } from './query';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
export const store = configureStore({
  reducer: {
    contactBook: contactBookReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApi.middleware),
});
setupListeners(store.dispatch);
