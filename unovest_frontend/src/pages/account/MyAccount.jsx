import React, { useEffect, useState } from 'react'
// import MyAccountSidebar from './MyAccountSidebar'
import MyAccountCards from './components/MyAccountCards'
import MyAccountHead from './components/MyAccountHead'
import MyAccountTabs from './components/MyAccountTabs'
import MyAccountSidebar from '../../components/sidebar/Sidebar'
import MobileNavigation from '../../components/MobileNavigation';
import Menubar from '../../components/Menubar'
import { useDispatch, useSelector } from 'react-redux'
import { updateCradInputs } from '../../redux/slices/Card_Inputs'
import { getUserExpenseDetails } from '../destop_L1/server'
import My_power_sidebar from '../../components/my-power/My_power_sidebar';
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import Myrewards from './components/myRewards/Myrewards'
import { updateMy_powersidebar } from '../../redux/slices/My_powersidebar'
import { Support } from '../../assets/Icons'

const MyAccount = (Card) => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userDetails = JSON.parse(localStorage.getItem('userdetails'))
  const page_data = useSelector((state) => state.Page_Data);
  console.log(page_data,'lio');
  const currentSidebarSection = useSelector(state => state?.My_powersidebar.currentSidebarSection);
  useEffect(() => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    fetchUserRefferal();
  },[])

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
}, [window.innerWidth]);

  const fetchUserRefferal=()=>{
    getUserExpenseDetails("mynamecodecoin", success => {
        if(success.data.code === 200){
            dispatch(updateCradInputs({refferal_user:success.data.message}))
        }
    }, error => {
        console.log(error)
        // handleAlertClick('please Enter income','error')
    })
}

  const userReferral = useSelector((state) => state?.Card_inputs?.refferal_user)
  let ChangeSection = (number) => {
    if (location.pathname == '/my-account') {
      navigate('/level-1/quiz/result/insides/my-power/');
      dispatch(updateMy_powersidebar({ currentSection: number }));
      dispatch(updateMy_powersidebar({ currentSidebarSection:0 }));
    }
}
let ChangeMyaccountSidebar = (number) => {
  dispatch(updateMy_powersidebar({ currentSidebarSection: number }));
}

  const handleMenuClick = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className='bg-secondary-gradient'>
      <Menubar redirected={"my_profile"} refferalDetails={userReferral} />
      <div className='flex justify-between  max-h-screen overflow-y-scroll hide-scrollbar'>
        <div className="absolute z-10 hidden md:block">
          {(page_data?.is_activated_my_power===true && page_data?.is_expired===false) && <My_power_sidebar />}
        </div>
        <div className="absolute z-10 mt-5 md:hidden">
          {(page_data?.is_activated_my_power===true && page_data?.is_expired===false) && <MobileNavigation ChangeSection={ChangeSection}/>}
        </div>
        <div className={`max-w-[74.563rem] h-[calc(100vh-100px)] overflow-y-scroll hide-scrollbar  mt-10 ${currentSidebarSection == 0 ?'mx-auto':''}`}>
          {isMobile && <div className='text-slate-200 absolute top-20 ps-2' onClick={() => navigate(-1)}><BsFillArrowLeftCircleFill size={'1.5em'}/></div>}
          {currentSidebarSection ==0 &&<MyAccountTabs/>} 
        </div>
        <div className='absolute z-10 hidden md:block right-0 '>
          <MyAccountSidebar ChangeSection={ChangeMyaccountSidebar}/>
        </div>
        <>
          {currentSidebarSection === 1 && <MyAccountTabs className='mx-auto mt-10'/>}
          {/* {currentSidebarSection=== 2 && <Upgarde/>}  */}
          {currentSidebarSection === 3 && <Myrewards/>}
          {/* {currentSidebarSection === 4 && <AboutUs />}
          {currentSidebarSection === 5 && <Support />} */}
        </>
      </div>
    </div>
  
  )
}

export default MyAccount


{/* <MyAccountCards>
              <MyAccountHead>Personal Details</MyAccountHead>
            </MyAccountCards> */}

// import Sidebar from './components/sidebar/Sidebar'
// import MyAccountTabs from './components/MyAccountTabs'

// const Card = ({ children }) => (
//   <div className="p-6 rounded-[30px] bg-red-50">
//       {children}
//   </div>
// );
