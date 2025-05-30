import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_loans_outstandings: 0,
    user_selected_goals: []
}
export const card_inputs_slice = createSlice({
    name: 'card_inputs',
    initialState: initialState,
    reducers: {
        updateCradInputs: (state, action) => {
            return { ...state, ...action.payload }
        },
        activeIndexNumber: (state, action) => {
            return { ...state, indexNumber : action.payload }
        },
        resetCradInputs: () => { initialState }
    }

})
export const { updateCradInputs, activeIndexNumber, resetCradInputs } = card_inputs_slice.actions

export default card_inputs_slice.reducer