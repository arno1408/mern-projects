import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numerical_format : 'lakhs',
}
export const statistical_Data_slice = createSlice({
    name: 'statistical_Data',
    initialState: initialState,
    reducers: {
        updateStatisticalData: (state, action) => {
            return { ...state, ...action.payload }
        },
    }

})
export const { updateStatisticalData } = statistical_Data_slice.actions

export default statistical_Data_slice.reducer