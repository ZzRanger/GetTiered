import { createSlice } from "@reduxjs/toolkit";

const initialState = { active: "untitled" };
export const currentSession = createSlice({
    name: "active",
    initialState,
    reducers: {
        /* action.payload() => {current:string} */
        changeSession: (state,action) => {
            state.active = action.payload();
        }
    }
});

export const { changeSession } = currentSession.actions;

export default currentSession.reducer;