import { createSlice } from '@reduxjs/toolkit';

const account = createSlice({
    name: 'accounts',
    initialState: [],
    reducers: {
        addAccount: (state, action) => {
            state.push(action.payload);
        },
    },
});

const { reducer, actions } = account;

export const { addAccount } = actions;
export default reducer;
