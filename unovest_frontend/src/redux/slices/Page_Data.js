import { createSlice } from '@reduxjs/toolkit'
const userDetails = JSON.parse(localStorage.getItem('userdetails'))

const initialState = {
    dashboardIntroductor: false,
    moneyPathIntroductor: false,
    is_expired: userDetails?.user_data?.is_expired,
    activate_my_power_expiry:  userDetails?.user_data?.activate_my_power_expiry,
    is_activated_my_power:  userDetails?.user_data?.is_activated_my_power,
    showRevealSummary: {
        status: false,
        id: 0
    }
}

export const Page_Data_slice = createSlice({
    name: 'Page_Data',
    initialState,
    reducers: {
        introductors: (state, action) => {
            return { ...state, ...action.payload }
        },
        SummaryDetails: (state, action) => {
            return { ...state, ...action.payload }
        },
        myPowerExpiry: (state, action) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { introductors, SummaryDetails, myPowerExpiry } = Page_Data_slice.actions

export default Page_Data_slice.reducer