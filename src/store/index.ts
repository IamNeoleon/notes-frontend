import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import notesSlice from './slices/notesSlice'
import userSlice from './slices/userSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        notes: notesSlice,
        user: userSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch