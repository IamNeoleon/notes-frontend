import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../@types';
import { RootState } from '..';


export const fetchAuth = createAsyncThunk(
    'auth/fetchAuth',
    async (user: IUser) => {
        const response = await axios.post<{ token: string }>('http://localhost:5000/api/auth/login', {
            email: user.email,
            password: user.password,
        });

        return response.data;
    },
)

interface authState {
    token: string,
    username: string,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    token: '',
    loading: 'idle',
    username: '',
} satisfies authState as authState

// Then, handle actions in your reducers:
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        quit: (state) => {
            state.token = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.token = action.payload.token;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.loading = 'failed';
            });
    },
})

// Other code such as selectors can use the imported `RootState` type
export const { quit } = authSlice.actions
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer