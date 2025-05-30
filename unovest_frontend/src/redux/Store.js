import { configureStore } from "@reduxjs/toolkit";
import card_inputs_slice from "./slices/Card_Inputs";
import My_powersidebar_slice from "./slices/My_powersidebar";
import level_1_data from "./slices/Level_1_all_data";
import financialFreedomData from "./slices/FinancialFreedomData";
import Page_Data from "./slices/Page_Data";
import statistical_Data from "./slices/Statistical_Data";

export const Store = configureStore({
    reducer: {
        Card_inputs: card_inputs_slice,
        My_powersidebar: My_powersidebar_slice,
        level_1_data: level_1_data,
        financialFreedomData: financialFreedomData,
        Page_Data: Page_Data,
        statistical_Data: statistical_Data
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})