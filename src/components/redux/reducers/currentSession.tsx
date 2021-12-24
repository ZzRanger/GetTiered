import { createSlice } from "@reduxjs/toolkit";

const initialState = { active: "untitled" };
export const currentSession = createSlice({
    name: "active",
    initialState,
    reducers: {
        /**
         * Changes active tierlist
         * @param state tierlist state
         * @param action string: new name of tierlist
         */
        changeSession: (state,action) => {
            state.active = action.payload
        }
    }
});

export const { changeSession } = currentSession.actions;

export default currentSession.reducer;