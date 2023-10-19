import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const setToken = token => {
  $instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

///////////////////////////////////////////          THUNKS
export const requestRegister = createAsyncThunk(
  'auth/requestRegister',
  async (formData, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/signup', formData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestLogIn = createAsyncThunk(
  'auth/requestLogIn',
  async (formDataLogIn, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/login', formDataLogIn);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestAutoLogin = createAsyncThunk(
  'auth/requestAutoLogin',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      setToken(token);
      const { data } = await $instance.get('/users/current');
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const token = thunkAPI.getState().auth.token;

      if (token) {
        return true;
      }
      return false;
    },
  }
);

export const requestLogOut = createAsyncThunk(
  'auth/requestLogOut',
  async (_, thunkAPI) => {
    try {
      const { data } = await $instance.post('/users/logout');
      setToken('');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  token: null,
  userData: null,
  isLoading: false,
  error: null,
  isSignedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(requestRegister.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestLogIn.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLogIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.token = action.payload.token;
        state.userData = action.payload.user;
      })
      .addCase(requestLogIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestAutoLogin.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestAutoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.userData = action.payload;
      })
      .addCase(requestAutoLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestLogOut.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestLogOut.fulfilled, state => {
        return initialState;
      })
      .addCase(requestLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

////////////////////////////////////////          REDUCER
export const authReducer = authSlice.reducer;

////////////////////////////////////////          SELECTORS
export const selectSignIn = state => state.auth.isSignedIn;



//С чего состоит http/https запрос body,headers,method,url(шлях),params.
