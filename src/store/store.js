import { configureStore } from '@reduxjs/toolkit';
import { filter } from './filter/filterSlice';
import { contactsApi } from './contacts/contactsSlice';

export const store = configureStore({
  reducer: {
    filter: filter,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
