import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_goal_data:[],
    selectedGoal:{},
    index:0,
    allGoals:[]
}

export const level_1_data = createSlice({
    name: 'all_level_1_data',
    initialState,
    reducers: {
        all_level_1_data: (state, action) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { all_level_1_data } = level_1_data.actions

export default level_1_data.reducer