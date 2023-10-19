import { $instance } from './authSlice';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const requestContactsThunk = createAsyncThunk(
  'contacts/requestContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.get('/contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const isSignedIn = thunkAPI.getState().auth.isSignedIn;

      if (isSignedIn) {
        return true;
      }
      return false;
    },
  }
);

export const requestAddContactThunk = createAsyncThunk(
  'contacts/requestAddContactThunk',
  async (contactData, thunkAPI) => {
    try {
      const { data } = await $instance.post('/contacts', contactData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { data } = await $instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: [],
  filter: '',
  isLoading: false,
  error: null,
};

const phoneBookSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(requestContactsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(requestContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestAddContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestAddContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(requestAddContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(contact => {
          return contact.id !== action.payload.id;
        });
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setFilter } = phoneBookSlice.actions;

export const selectContacts = state => state.phoneBook.contacts;
export const selectFilter = state => state.phoneBook.filter;
export const selectIsLoading = state => state.phoneBook.isLoading;
export const selectError = state => state.phoneBook.error;

export const phoneBookReducer = phoneBookSlice.reducer;
