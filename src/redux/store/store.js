import { configureStore } from '@reduxjs/toolkit';
import { contacts } from '../contacts/contacts-reducer';
import { filter } from '../filter/filter-reducer';

export const store = configureStore({
  reducer: {
    contacts,
    filter,
  },
});
