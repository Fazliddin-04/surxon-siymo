import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

/* 
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi14.webp&w=2048&q=75
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi84.webp&w=2048&q=75
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi74.webp&w=2048&q=75
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi64.webp&w=2048&q=75
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi54.webp&w=2048&q=75
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi44.webp&w=2048&q=75
  https://billz.uz/_next/image?url=%2Fimages%2Fwhy-billz%2Fi34.webp&w=2048&q=75
  https://billz.uz/uz/why-billz/goods-accounting
  https://billz.uz/_next/image?url=https%3A%2F%2Fbillzwp.billz.work%2Fwp-content%2Fuploads%2F2022%2F06%2F5-5.webp&w=2048&q=75
*/

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const logout = createAsyncThunk('auth/logout', (user, thunkAPI) => {
  authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer