import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { INote } from '../../@types';
import { RootState } from '..';


export const fetchNotes = createAsyncThunk(
    'fetchNotes',
    async (token: string) => {
        const response = await axios.get('http://localhost:5000/api/notes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    },
)

export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async ({ id, title, content, token }: { id: string, title: string, content: string, token: string }, thunkAPI) => {
        const response = await axios.put(
            `http://localhost:5000/api/notes/${id}`,
            {
                title,
                content
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return response.data;
    }
)

export const createNote = createAsyncThunk(
    'notes/createNote',
    async (token: string, thunkAPI) => {
        const response = await axios.post(
            'http://localhost:5000/api/notes/',
            {
                title: ' ',
                content: ' ',
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return response.data;
    }
)

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async ({ token, id }: { token: string, id: string }, thunkAPI) => {
        const response = await axios.delete(
            `http://localhost:5000/api/notes/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return response.data;
    }
)

interface notesState {
    notes: INote[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    creating: 'idle' | 'processing' | 'succeeded' | 'failed',
    lastCreatedNoteId: string
}

const initialState = {
    notes: [],
    loading: 'idle',
    creating: 'idle',
    lastCreatedNoteId: ''
} satisfies notesState as notesState

// Then, handle actions in your reducers:
const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        resetCreatingState: (state) => {
            state.creating = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state) => {
                state.loading = 'failed';
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                const index = state.notes.findIndex((note) => note._id === action.payload._id)

                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.notes.push(action.payload);
                state.creating = 'succeeded';
                state.lastCreatedNoteId = action.payload._id;
            })
            .addCase(createNote.rejected, (state) => {
                state.creating = 'failed';
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note._id !== action.payload.id)
            })
    },
})

// Other code such as selectors can use the imported `RootState` type
export const { resetCreatingState } = notesSlice.actions
export const selectNotes = (state: RootState) => state.notes;

export default notesSlice.reducer