import { createAsyncThunk, createSlice, current, nanoid } from '@reduxjs/toolkit'
import { loginA, fetchUsers, postUser } from './userApi'
import { Password } from '@mui/icons-material'

const initialState = {
  type: "guest",
  arrUser: [],
  currentUser: null,
  status: "idle",
}

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (thunkAPI) => {
    const res = fetchUsers()
    return res
  },
)

export const login = createAsyncThunk(
  'users/login',
  async (dataUser, thunkAPI) => {
    const res = loginA(dataUser)
    debugger
    console.log("res", res);
    return res
  },
)

export const addUser = createAsyncThunk(
  'users/addUser',
  async (newUser, thunkAPI) => {
    const res = postUser(newUser);
    return res;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.type = "guest"
      state.status = "idle"
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.arrUser = payload
        state.status = "fulfilled"
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.currentUser = payload
        if (state.currentUser.password == "123")
          state.type = "manager"
        else {
          if (state.currentUser != null)
            state.type = "user"
          else
            state.type = "guest"
        }
        state.status = "fulfilled"
      })
  },
})



export const { setCurrentUser, logOut } = userSlice.actions

export default userSlice.reducer