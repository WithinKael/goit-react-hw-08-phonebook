import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer } from './phoneBookReducer';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
  },
});
