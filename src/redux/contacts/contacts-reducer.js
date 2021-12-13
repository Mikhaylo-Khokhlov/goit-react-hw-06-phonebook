import { createReducer } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  localstorageContacts,
} from './contacts-actions';
import shortid from 'shortid';

export const contacts = createReducer([], {
  [addContact]: (state, { payload }) => [
    ...state,
    { id: shortid.generate(), name: payload.name, number: payload.number },
  ],
  [localstorageContacts]: (_, { payload }) => payload,
  [deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload.contactId),
});
