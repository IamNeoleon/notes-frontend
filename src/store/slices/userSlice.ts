import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { IUserInfo } from '../../@types';
import { RootState } from '..';

export const fetchUserInfo = createAsyncThunk(
    'fetchUserInfo',
    async (token: string) => {
        const response = await axios.get('http://localhost:5000/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    },
)

interface IUserInfoState {
    user: IUserInfo | null,
}

const initialState = {
    user: null,
} satisfies IUserInfoState as IUserInfoState


const notesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.user = action.payload
            })
    },
})

export const selectUser = (state: RootState) => state.user.user;
export default notesSlice.reducer