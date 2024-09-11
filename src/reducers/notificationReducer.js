import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    message: null,
    type: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return { message: action.payload.message, type: action.payload.type }
        },
        clearNotification: () => {
            return { message: null, type: '' }
        }
    }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer