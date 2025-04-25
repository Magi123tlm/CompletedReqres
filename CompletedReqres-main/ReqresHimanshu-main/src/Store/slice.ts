import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type SingleUserType = {
  data: User;
  support: {
    url: string;
    text: string;
  };
};

export type EntireData = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];

  support: {
    url: string;
    text: string;
  };
};

export type CreatedUser = {
  name: string;
  job: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FormValue = {
  name: string;
  job: string;
};

export type AuthUser = {
  email: string;
  password: string;
  token?: string;
  id?: string;
};

type MyState = {
  entireData: EntireData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  singleUser: User | null;
  createdUsers: CreatedUser[] | [];
  formValue: FormValue;
  updateId: string;
  authUsers: AuthUser[] | [];
  authForm: Omit<AuthUser, 'token' | 'id'>;
  loginUser: AuthUser | null;
  loginForm: Omit<AuthUser, 'token' | 'id'>;
};

const initialState: MyState = {
  entireData: null,
  status: 'idle',
  error: null,
  singleUser: null,
  createdUsers: [],
  formValue: { name: '', job: '' },
  updateId: '',
  authUsers: [],
  authForm: { email: '', password: '' },
  loginUser: null,
  loginForm: { email: '', password: '' },
};

export const fetchListUser = createAsyncThunk(
  'fetchSlice/fetchListUser',
  async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data; //entireData or User is returned
  }
);

export const fetchSingleUser = createAsyncThunk(
  'fetchSlice/fetchSingleUser',
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('___Error___');
      }
      const data = await response.json();
      if (Object.keys(data).length === 0) {
        return;
      }
      return data; //entireData or User is returned
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`${error.message}`);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const createUserThunk = createAsyncThunk<
  CreatedUser,
  string,
  { state: RootState }
>('fetchSlice/createUserThunk', async (url: string, { getState }) => {
  const {
    user: {
      formValue: { name, job },
    },
  } = getState();
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        job,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    return error;
  }
});

export const updateUserThunk = createAsyncThunk<
  CreatedUser,
  { url: string },
  { state: RootState }
>('fetchSlice/updateUserThunk', async ({ url }, { getState }) => {
  const {
    user: {
      formValue: { name, job },
      updateId,
    },
  } = getState();
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        job,
        updateId,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: unknown) {
    return error;
  }
});

export const registerUserThunk = createAsyncThunk<
  AuthUser,
  { url: string },
  { state: RootState }
>(
  'fetchSlice/registerUserThunk',
  async ({ url }, { getState, rejectWithValue }) => {
    const {
      user: {
        authForm: { email, password },
      },
    } = getState();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log('register Data', data);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`${error}`);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const loginUserThunk = createAsyncThunk<
  AuthUser,
  { url: string },
  { state: RootState }
>(
  'fetchSlice/loginUserThunk',
  async ({ url }, { getState, rejectWithValue }) => {
    const {
      user: {
        loginForm: { email, password },
      },
    } = getState();
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log('login Data', data);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`${error}`);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const mySlice = createSlice({
  name: 'fetchSlice',
  initialState,
  reducers: {
    createNewUser: (state, action: PayloadAction<CreatedUser>) => {
      state.createdUsers = [...state.createdUsers, action.payload];
    },
    setFormValue: (state, action: PayloadAction<Partial<FormValue>>) => {
      state.formValue = { ...state.formValue, ...action.payload };
    },
    setUpdateId: (state, action: PayloadAction<string>) => {
      state.updateId = action.payload;
    },
    setAuthForm: (state, action: PayloadAction<Partial<AuthUser>>) => {
      state.authForm = { ...state.authForm, ...action.payload };
    },
    setLoginForm: (state, action: PayloadAction<Partial<AuthUser>>) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchListUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      fetchListUser.fulfilled,
      (state, action: PayloadAction<EntireData>) => {
        state.status = 'succeeded';
        state.entireData = action.payload;
      }
    );
    builder.addCase(fetchListUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Fetching Failed';
    });
    builder.addCase(fetchSingleUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      fetchSingleUser.fulfilled,
      (state, action: PayloadAction<SingleUserType>) => {
        state.status = 'succeeded';
        state.singleUser = action.payload.data;
      }
    );
    builder.addCase(fetchSingleUser.rejected, (state, action) => {
      state.status = 'failed';
      console.log(action.error);
      state.error = action.error.message ?? 'Fetching Failed';
    });
    builder.addCase(createUserThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      createUserThunk.fulfilled,
      (state, action: PayloadAction<CreatedUser>) => {
        state.status = 'succeeded';
        state.createdUsers = [...state.createdUsers, action.payload];
        console.log('new user created', state.createdUsers);
      }
    );
    builder.addCase(createUserThunk.rejected, (state, action) => {
      state.status = 'failed';
      console.log(action.error);
      state.error = action.error.message ?? 'Fetching Failed';
    });
    builder.addCase(updateUserThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      updateUserThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          name?: string;
          job?: string;
          updateId?: string;
          updatedAt?: string;
        }>
      ) => {
        state.status = 'succeeded';
        // state.updateId = '';
        // delete action.payload.updateId;
        state.createdUsers = state.createdUsers.map((user) => {
          if (user.id === action.payload.updateId) {
            delete action.payload.updateId;
            user = { ...user, ...action.payload };
          }
          return user;
        });
      }
    );
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.status = 'failed';
      console.log(action.error);
      state.error = action.error.message ?? 'Fetching Failed';
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      registerUserThunk.fulfilled,
      (state, action: PayloadAction<AuthUser>) => {
        state.status = 'succeeded';
        state.authUsers = [
          ...state.authUsers,
          {
            ...state.authForm,
            ...action.payload,
          },
        ];
        console.log('new user registered', state.authUsers);
      }
    );
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.status = 'failed';
      console.log(action);
      state.error = (action.payload as string) ?? 'Fetching Failed';
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      loginUserThunk.fulfilled,
      (state, action: PayloadAction<{ token?: string }>) => {
        console.log(typeof action.payload.token);
        state.status = 'succeeded';
        state.loginUser = {
          ...state.loginUser,
          ...state.loginForm,
          ...action.payload,
        };
        console.log('user login success in builder', state.loginUser);
      }
    );
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.status = 'failed';
      console.log(action);
      state.error = (action.payload as string) ?? 'Fetching Failed';
    });
  },
});

export const {
  createNewUser,
  setFormValue,
  setUpdateId,
  setAuthForm,
  setLoginForm,
} = mySlice.actions;
export default mySlice.reducer;
