import axios from 'axios';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

axios.defaults.baseURL = 'https://652ef03e0b8d8ddac0b21b3d.mockapi.io';

export const requestContactsThunk = createAsyncThunk(
  'contacts/requestContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', newContact);
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
      const { data } = await axios.delete(`/contacts/${contactId}`);
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
    // addContact: (state, action) => {
    //   state.contacts = [...state.contacts, action.payload];
    // },
    // deletePost: (state, action) => {
    //   state.contacts = state.contacts.filter(contact => {
    //     return contact.id !== action.payload;
    //   });
    // },
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
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(addContactThunk.rejected, (state, action) => {
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
