import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import layoutService from './layoutService'

const initialState = {
  isSidebarOpen: false,
}

// Login user
export const toggleSidebar = createAsyncThunk('layout/toggleSidebar', (user, thunkAPI) => {
  layoutService.toggleSidebar()
})

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleSidebar.fulfilled, (state) => {
        state.isSidebarOpen = !state.isSidebarOpen
      })
  }
})

export const { reset } = layoutSlice.actions
export default layoutSlice.reducer