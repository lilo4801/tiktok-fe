import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accountApi } from '~/services';

export const getMe = createAsyncThunk('user/getMe', async (params, thunkApi) => {
    // const res = await accountApi.getMe();

    await setTimeout(() => {
        console.log('getting');
    }, 3000);
    return {
        id: 1,
        nickname: 'lilo4801',
        username: 'lilo4801',
    };
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        loading: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
    },
});

const { reducer: userReducer } = userSlice;

export default userReducer;
