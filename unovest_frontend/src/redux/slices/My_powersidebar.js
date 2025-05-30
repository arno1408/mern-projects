import { createSlice } from "@reduxjs/toolkit";
import Assumptions_icon from "../../components/my-power/sidebar-icons/Assumptions_icon";
import Cashflow_icon from "../../components/my-power/sidebar-icons/Cashflow_icon";
import Networth_icon from "../../components/my-power/sidebar-icons/Networth_icon";
import Goals_icon from "../../components/my-power/sidebar-icons/Goals_icon";
import Premium_icon from "../../components/my-power/sidebar-icons/Premium_icon";
import Money_Matters from "../../components/my-power/sidebar-icons/Money_Matters";
import Insights_icon from "../../components/my-power/sidebar-icons/Insights_icon";
import Rewards_icon from "../../components/my-power/sidebar-icons/Rewards_icon";
import Whatif_icon from "../../components/my-power/sidebar-icons/Whatif_icon";
import Advisor_icon from "../../components/my-power/sidebar-icons/Advisor_icon";
import user_icon  from "../../assets/Icons/User_invite.png"

import A_icon from "../../components/my-power/sidebar-icons/A_icon";
import B_icon from "../../components/my-power/sidebar-icons/B_icon";
import C_icon from "../../components/my-power/sidebar-icons/C_icon";
import { MdPersonOutline } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { PiStarFour } from "react-icons/pi";
import { RiGift2Line } from "react-icons/ri";
import { LuInbox } from "react-icons/lu";

const initialState = {
    sidebar_bottom_list: [
        { id: 1, icon: Assumptions_icon, text: "Assumptions", active: false, my: true },
        { id: 2, icon: Cashflow_icon, text: "Cashflow", active: false, my: true },
        { id: 3, icon: Networth_icon, text: "Networth", active: false, my: true },
        { id: 4, icon: Goals_icon, text: "Goals", active: false, my: true },
        { id: 5, icon: Premium_icon, text: "Premium", active: false, my: true },
    ],
    sidebar_top_list : [
        // { icon: Money_Matters, text: "Collapse", active: false, my: false },
        {id:0, icon: Money_Matters, text: "Money Matters", active: true, my: false },
        {id:1, icon: Insights_icon, text: "Insights", active: false, my: true },
        {id:2, icon: Rewards_icon, text: "Rewards", active: false, my: true },
        {id:3, icon: Whatif_icon, text: "Whatifs", active: false, my: true },
        // {id:3, icon: Advisor_icon, text: "Advisor", active: false, my: true },
        // { icon: Insights_icon, text: "Powers", active: true, my: true },
      ],
      sidebar_myAccount_list : [
        {id:0, icon:MdPersonOutline, text: "Account Setting", active: true, my: false,disabled:'' },
        {id:1, icon:PiStarFour, text: "Upgrade", active: false, my: true ,className:true ,disabled:'disabled'},
        {id:2, icon:RiGift2Line, text: "Rewards", active: false, my: true ,disabled:''},
        {id:3, icon: GoHome, text: "About us", active: false, my: true ,className:true ,disabled:'disabled'},
        {id:4, icon: LuInbox, text: "Support", active: false, my: true ,className:true ,disabled:'disabled'},
      ],
    sidebar_mobile_list:[
        {id:1, Icon:Assumptions_icon, text: 'Assumptions',backgroundColor:'bg-accent-green',textColor:'text-accent-green',iconColor:'#BCFBE4', active: false },
        {id:2, Icon:Assumptions_icon, text: 'Rates',backgroundColor:'bg-accent-green',textColor:'text-accent-green' ,iconColor:'#BCFBE4',active: false },
        {id:3, Icon:Cashflow_icon, text: 'Money In',backgroundColor:'bg-aqua',textColor:'text-aqua' ,iconColor:'#A1FBF6',active: false },
        {id:4, Icon:Cashflow_icon, text: 'Money Out',backgroundColor:'bg-aqua',textColor:'text-aqua' ,iconColor:'#A1FBF6',active: false },
        {id:5, Icon:Networth_icon, text: 'What you OWN',backgroundColor:'bg-desk-light-blue-2',textColor:'text-desk-light-blue-2' ,iconColor:'#B4DAF6',active: false },
        {id:6, Icon:Networth_icon, text: 'What you OWE',backgroundColor:'bg-desk-light-blue-2',textColor:'text-desk-light-blue-2' ,iconColor:'#B4DAF6',active: false },
        {id:7, Icon:Goals_icon, text: 'Goals',backgroundColor:'bg-desk-purple',textColor:'text-desk-purple' ,iconColor:'#B0C3F5',active: false },
        {id:8, Icon:Premium_icon, text: 'Premium',backgroundColor:'bg-desk-purple',textColor:'text-desk-purple' ,iconColor:'#B0C3F5',active: false },
    ],  
    whatif_bottom_list:[
        {id:1,icon:A_icon,backgroundColor:'accent-green',fill:'#BCFBE4',active:false},
        {id:2,icon:B_icon,backgroundColor:'aqua',fill:'#A1FBF6',active:false},
        {id:3,icon:C_icon,backgroundColor:'desk-purple',fill:'#B0C3F5',active:false},
    ],
    currentSection: 2,
    currentSidebarSection:0,
    isCaseSelected: false, 

}
export const My_powersidebar_slice = createSlice({
    name: 'My_powersidebar',
    initialState: initialState,
    reducers: {
        updateMy_powersidebar: (state, action) => {
            return { ...state, ...action.payload }
        },
        resetMy_powersidebar: () => { 
           return initialState 
        }       
    }

})
export const { updateMy_powersidebar, resetMy_powersidebar,toggleCaseSelection } = My_powersidebar_slice.actions

export default My_powersidebar_slice.reducer