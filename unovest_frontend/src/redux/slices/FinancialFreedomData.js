import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const financialFreedomData = createSlice({
    name: 'financial_freedom_data',
    initialState,
    reducers: {
        all_financial_freedom_data: (state, action) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { all_financial_freedom_data } = financialFreedomData.actions

export default financialFreedomData.reducer