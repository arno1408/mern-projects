// import { CurrencyData } from "../../constants"
import { useDispatch, useSelector } from "react-redux"
import Custume_AreaChart from "../../components/Custume_AreaChart"
import Dashboard_input_card from "../../components/Dashboard_input_card"
import GetStart_Card from "../../components/GetStart_Card"
import Menubar from "../../components/Menubar"
import { updateCradInputs } from "../../redux/slices/Card_Inputs"
import React, { useEffect, useState ,useRef } from "react"
import { token } from "../../Variable"
import { getData, getUserExpenseDetails, getWithoutAuth2, getallcurrencyServer, saveDetails } from "./server"
import { useNavigate } from "react-router"
import { bg_curve, mobile_graphBg, mobile_image } from "../../assets/images"
import { flag_with_circle, triangle_arrow, invite_icon, details_icon, lock_icon, rewarddiamond, addGoalIcon } from "../../assets/Icons"
import RoundedBtn from "../../components/RoundedBtn"
import { ToastContainer, toast } from "react-toastify"
import { alertTitleClasses } from "@mui/material"
import { introductors } from "../../redux/slices/Page_Data"



let AboutArr = [
  { title: "Do you want to retire early?" },
  { title: "Do you want to quit your day job?" },
  { title: "Do you want your money to work for you?" },
]
const Desktop_L1 = () => {
  const dispatch = useDispatch()
  const level_one_inputs = useSelector((state) => state.Card_inputs);
  const dashboardIntroductor = useSelector(state => state?.Page_Data?.dashboardIntroductor)
  const [allCurrency, setallCurrency] = useState([]);
  const [tabs, setTabs] = useState(1)
  const [userReferral, setUserReferral] = useState();
  const [referralMaster, setReferralMaster] = useState();
  const [showInstruction, setShowInstruction] = useState(dashboardIntroductor);
  const userdetail =JSON.parse(localStorage.getItem('userdetails'))

  const modalRef = useRef();
  const navigate = useNavigate();

  const UpdateInput = (e) => {
    if (e.target.name == "current_age" || e.target.name == "work_till_age") {
      if ((+e.target.value) <= 99 && (+e.target.value) >= 0) {
        dispatch(updateCradInputs({ [e.target.name]: e.target.value }))
      }
    }
    else {
      dispatch(updateCradInputs({ [e.target.name]: e.target.value }))
    }
  }
  const saveuserinfo = (e) => {
    e.preventDefault();
    let obj = {};
    obj.current_age = parseInt(level_one_inputs.current_age),
      obj.work_till_age = parseInt(level_one_inputs.work_till_age),
      obj.living_age = 90,
      obj.any_financial_dependents = level_one_inputs.financial_dependents == "true" ? true : false,
      obj.preferred_currency = level_one_inputs.preferred_currency;
    obj.user_auth = token().userdata.id;
    if (obj.current_age < obj.work_till_age) {
      saveDetails("profile", obj, (success) => {
        if (success?.data?.code == 200) {
          navigate('/level-1/quiz')
        } else {
          toast.success(success)
        }
      }, (error) => {
        console.log(error)
      })
    } else {
      toast.warn("Work till age could not be less or same as current age")
    }
  }

  const getallcurrency = () => {
    getallcurrencyServer((success) => {
      if (success.data.code === 200) {
        setallCurrency(success.data.message)
        dispatch(updateCradInputs({ preferred_currency: success.data.message[0].id }))
      } else {
        setallCurrency([])
      }
    }, (error) => {
      setallCurrency([])
    })
  }

  let Tab = ({ title, active, onClick }) => {
    return (
      <div onClick={onClick} className={`flex-1 flex flex-col gap-0.5 items-center justify-center rounded-tr-3xl rounded-tl-3xl  ${active ? "" : 'bg-blue-grey bg-opacity-80'} `}
        style={active ? null : { boxShadow: '0px -3px 10px 0px rgba(8, 10, 48, 0.80) inset' }}
      >
        <p className=" text-center text-light-blue-1 text-lg font-extrabold">{title}</p>
        {/*border-b-2 border-accent-bright-green */}
        {active && <div className="h-0.5 w-[55%]  bg-accent-bright-green rounded-3xl" />}
      </div>
    )
  }

  const getallSavedData = () => {
    getData("user-data-after-signin", (success) => {
      console.log(success)
      dispatch(updateCradInputs(success.data.message))
    }, (error) => {
      console.log(error)
    })
  }

  const fetchUserRefferal=()=>{
    getUserExpenseDetails("mynamecodecoin", success => {
      if(success.data.code === 200){
        setUserReferral(success.data.message);
      }
    }, error => {
      console.log(error)
      toast.warn('Please enter income')
    })
  }

  const fetchRefferalMaster=()=>{
    getWithoutAuth2('referral_coins_master',success =>{
      if(success.data.code === 200){
        // console.log(success.data.message);
        setReferralMaster(success.data.message)
      } 
    }, error =>{
      console.log(error.message);
    })
  }

  useEffect(() => {
    getallcurrency();
    let defaultValue = {
      financial_dependents: true,
      work_till_age: 55
    }
    dispatch(updateCradInputs(defaultValue))
    getallSavedData();
    fetchUserRefferal();
    fetchRefferalMaster();
      }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // setShowInstruction(!showInstruction);
      }
    };
    if (showInstruction) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showInstruction]);

  let currentSlideIndex = 0;
  const carouselItems = document.querySelectorAll('[data-carousel-item]');
  const dot_btn = document.querySelectorAll('[data-carousel-slide-to]');
  const showSlide = (index) => {
    carouselItems.forEach(item => {
      item.classList.add('hidden');
    });
    carouselItems[index].classList.remove('hidden');
    dot_btn.forEach((button, i) => {
      if (index == i) {
        button.classList.add('bg-slate-700');
        button.classList.remove('bg-gray-400');
      }
      else {
        button.classList.add('bg-gray-400');
        button.classList.remove('bg-slate-700');
      }
    })
  };

  const prevButton = () => {
    currentSlideIndex = (currentSlideIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlideIndex);
    togglePrevButtonVisibility(currentSlideIndex);
  };


  const nextButton = () => {
    currentSlideIndex = (currentSlideIndex + 1) % carouselItems.length;
    if (currentSlideIndex ===0) {
      setShowInstruction(!showInstruction)
   } else {
       showSlide(currentSlideIndex);
       togglePrevButtonVisibility(currentSlideIndex);
   }
  };

  const togglePrevButtonVisibility = (index) => {
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');
    if (index === 0) {
      prevButton.classList.add('hidden');
    }
    else if(index ===2){
      nextButton.classList.add('hidden');
    }
     else {
      prevButton.classList.remove('hidden');
      nextButton.classList.remove('hidden');
    }
   
  };
  
const aboutValidation =()=>{
  if(level_one_inputs?.current_age!==undefined){
    { navigate('quiz') }
  }
  else{
    toast("Please enter the current age")
  }
}

const finishClickHandler=()=>{
  setShowInstruction(false);
  dispatch(introductors({dashboardIntroductor: false}))
}

  return (
    <div className="relative min-h-screen dashboard-l1-bg"
    //style={{ background: 'radial-gradient(523.2% 150.83% at 45.58% -25.49%, #9891AD 0%, #538096 22.18%, #3C566E 48.5%, #131529 89.23%)' }}
    >
      <div className="hidden lg:block"><Menubar redirected={"dashboard"} refferalDetails={userReferral} /></div>

      <div className="level-1">

        {/* destop graph */}
        <div className="hidden lg:block h-[45vh]  lg:mt-8 2xl:mt-10 "><Custume_AreaChart /></div>

        {/* mobile graph */}
        <div className="block  h-[12.5rem] md:h-[18.75rem] lg:hidden  relative  w-full" style={{ backgroundImage: `url(${mobile_image})`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 100%" }} >
        <div className="block  h-[12.5rem] md:h-[18.75rem] lg:hidden   " style={{ backgroundImage: `url(${bg_curve})`, backgroundRepeat: 'no-repeat', backgroundSize: "100% 145%" }}>
          <Menubar redirected={"dashboard"} refferalDetails={userReferral} />
          <div className="text-grey-2 max-sm:px-8 px-4 w-fit md:hidden">
            <span className="text-lg font-normal italic">Hi,</span>
            <span className="text-2xl font-black ms-1">{`${userdetail.user_data.full_name.split(' ')[0].charAt(0).toUpperCase()+userdetail.user_data.full_name.split(' ')[0].substr(1)}`} </span>
          </div>
          </div>


          <div className="absolute top-[16%] md:top-[19%]  right-[34%] translate-x-1/2">
            <img src={flag_with_circle} className="w-6" alt="" srcSet="" />

          </div>
          <div className="absolute bottom-[23%] left-[28%] translate-x-1/2">
            <img src={flag_with_circle} className="w-6" alt="" srcSet="" />
          </div>
        </div>



        <div className={`${tabs == 1 ? 'bg-start-quiz-gradient' : 'bg-mob-primary-gradient'} rounded-tr-3xl rounded-tl-3xl lg:bg-tranperent-gradiant`}  >

          {/* mobile tabs  */}
          <div className="flex lg:hidden text-white h-12  relative mb-[30px]" >
            <Tab title='Start Quiz' active={tabs === 1} onClick={() => { setTabs(1) }} />

            <span className=" absolute top-0 left-1/2 -translate-x-1/2 w-10 h-5 ">
              <img src={triangle_arrow} alt="" srcSet="" />
            </span>

            <Tab title='About' active={tabs === 2} onClick={() => { setTabs(2) }} />
          </div>

          {tabs == 1 && <div className="">

            <p className="small-tab-p tabs-p">A few questions before we get <br className="md:hidden" /> started</p>

            <form action="" onSubmit={saveuserinfo} className=" px-10 lg:px-0">
              <div className="mt-3 lg:mt-4 flex flex-wrap gap-6 md:gap-[4.5rem]">

                <div className=" flex-[2] flex flex-wrap gap-3 xl:gap-4 2xl:gap-6">
                  <Dashboard_input_card label='Your Current Age' >
                    <input placeholder="35" type="number" className="input-feild grey grey-shadow"
                      onWheel={(e) => e.target.blur()}
                      onChange={UpdateInput} name="current_age"
                      value={level_one_inputs?.current_age}
                      maxLength="2"
                      required
                    />

                  </Dashboard_input_card>
                  <Dashboard_input_card label='Work Till Age' >
                    <input placeholder="" type="number"
                      name="work_till_age"
                      onChange={UpdateInput}
                      className="input-feild grey grey-shadow"
                      onWheel={(e) => e.target.blur()}
                      value={level_one_inputs?.work_till_age}
                      required
                    />
                  </Dashboard_input_card>
                  <Dashboard_input_card label='Any Financial Dependents?' >
                    <div className=" select-div lite-shadow">
                      <select className="dashboard-select"
                        onChange={UpdateInput}
                        name="financial_dependents"
                        required
                      // onFocus={(e) => { e.target.size = 3 }} onBlur={(e) => { e.target.size = 0 }} onChange={(e) => { e.target.blur(), e.target.size = 1 }}
                      >
                        <option value={true} className="bg-dark-blue bg-opacity-75" selected={level_one_inputs?.financial_dependents == "true" ? true : false}>Yes</option>
                        <option value={false} className="bg-dark-blue bg-opacity-75" selected={level_one_inputs?.financial_dependents == "false" ? true : false}>No</option>
                      </select>
                    </div>
                  </Dashboard_input_card>
                  <Dashboard_input_card label='Preferred Currency' >
                    <div className=" select-div lite-shadow">
                      <select name="preferred_currency" onChange={UpdateInput} className="dashboard-select" required>
                        {allCurrency.map((currency) =>
                          <option key={currency.id} value={currency.id} className="bg-grey-6 lg:p-4  lg:text-lg font-semibold" selected={level_one_inputs?.preferred_currency == currency.id ? true : false}>
                            {`${currency.currency_slug} ${currency.currency_icon} `}
                          </option>)}
                      </select>
                    </div>
                  </Dashboard_input_card>
                </div>


                {/* for mobile */}
                <div className=" lg:hidden ">
                  <p className="text-light-blue-1  text-xs  md:text-sm  font-normal italic px-3 leading-snug tracking-[-0.48px]"> We promise to do the math for you, so you can enjoy financial freedom on this unforgettable journey!</p>

                  <div className="my-4 ">
                    <RoundedBtn label='Get Started'
                      // onClick={() => { navigate('quiz') }}
                      type='submit'
                    />
                  </div>
                </div>

                {/* for destop */}
                <div className="hidden lg:flex flex-1 max-w-[24rem] "> <GetStart_Card type={"submit"} /> </div>
              </div>
            </form>
          </div>}


          {tabs === 2 && <div className="px-10 " >
            <div>
              <div className="p-6 flex flex-col gap-[30px] rounded-2xl"
                style={{ background: "linear-gradient(180deg, rgba(154, 154, 154, 0.20) 0.49%, rgba(154, 154, 154, 0.10) 99.66%)" }}
              >
                {AboutArr?.map((item, index) =>
                  <div key={item.title} className=" justify-start items-start gap-3 flex text-grey-2">
                    <div className="w-[30px] text-center  text-2xl font-black ">{index + 1}</div>
                    <div className="grow shrink basis-0  text-base font-extrabold  leading-[18px]">{item.title}</div>
                  </div>
                )}

                 <p className="text-[#ECECEC]  text-sm max-w-[94%] md:max-w-full  font-normal italic leading-snug tracking-[-0.48px]">
                  Let us do the math for you, so you can enjoy financial freedom. You will never forget this journey. Promise!
                </p>
              </div>

              <div className=" mt-6">
                <RoundedBtn label='Get Started'
                  onClick={aboutValidation}
                // type={props.type}
                />
              </div>
            </div>
          </div>}
        </div>

      {/*-----------------Instruction Model-------------------- */}
      {showInstruction ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="bg-slate-800 opacity-75 absolute inset-0"></div>
              <div className=" relative w-auto my-6 mx-auto max-w-4xl pe-0 lg:pe-5" ref={modalRef}>
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                  <div id="default-carousel" className="relative " data-carousel="slide">
                    <div className="relative overflow-hidden rounded-lg  font-Montserrat">
                      <div className="showInstruction-duration " data-carousel-item>
                        <div className="showInstruction-div ">
                          <h2 className="showInstruction-h2 ">{`Welcome to Basecamp, ${userdetail?.user_data?.full_name?.split(' ')[0].charAt(0).toUpperCase()+ userdetail?.user_data?.full_name?.split(' ')[0]?.substr(1).toLowerCase()}!`}</h2>
                          <p className="showInstruction-p1 py-2 md:py-6">You can see the  <span className="showInstruction-span">FIRE gap </span> (the distance) now but not fathom it. That knowledge lies at the Basecamp</p>
                          <p className="showInstruction-p1">While going to the Basecamp, you get a much better understanding of how the numbers are stacking up for you. And a better view of the challenge ahead - the Summit. </p>
                          <p className="showInstruction-p2 py-2 pb-12 md:py-6">Let’s start?</p>
                        </div>
                      </div>
 
                      <div className="hidden showInstruction-duration " data-carousel-item>
                        <div className="showInstruction-div ">
                          <h2 className="showInstruction-h2 ">{`Welcome to Basecamp, ${ userdetail?.user_data?.full_name?.split(' ')[0].charAt(0).toUpperCase()+ userdetail?.user_data?.full_name?.split(' ')[0]?.substr(1).toLowerCase()}!`}</h2>
                          <p className="showInstruction-p1 py-2 md:py-6">Remember, you can only go through the following <span className="showInstruction-span">Basecamp Quiz</span> screens once. </p>
                          <p className="showInstruction-p2 pb-6">After finishing the Quiz you will be able to make Adjustments to your answers later. </p>
                          <p className="showInstruction-p2 pb-12 md:pb-12 ">If you need to step away, or logout mid-Quiz, your answers will still be saved for when you come back.</p>
                        </div>
                      </div>
 
                      <div className="hidden showInstruction-duration" data-carousel-item>
                        <div className="bg-accent-green rounded-[36px] max-w-[52rem] mx-8 md:mx-20 lg:mx-auto p-5 md:p-6 lg:p-16 ">
                          <h2 className="showInstruction-h2 ">{`Welcome to Basecamp, ${ userdetail?.user_data?.full_name?.split(' ')[0].charAt(0).toUpperCase()+ userdetail?.user_data?.full_name?.split(' ')[0]?.substr(1).toLowerCase()}!`}</h2>
                          <p className="showInstruction-p1 lg:py-9 md:py-6 py-3">You just received<span className="showInstruction-span"> +{userdetail?.coinmaster[0]?.coins} coins</span> for signing up! Add details and reach the dashboard to earn many more. These coins will get you access to myPowers later. </p>
                          <h3 className="font-Montserrat font-bold text-base md:text-xl lg:text-2xl text-gray-800 pb-3 lg:pb-9 md:pb-4">How to Earn Rewards</h3>
                          <div className="flex flex-col md:flex-row  pb-12 gap-3 md:gap-6  ">
                            <div className="flex gap-4 justify-around">
                              <div className=" w-min">
                                <img src={invite_icon} alt="" className="showInstruction-img" />
                                <button className="showInstruction-button "><img src={rewarddiamond} alt="" className="" />+{referralMaster?.length > 0 && referralMaster[0]?.referral_coins}</button>
                                <h2 className="showInstruction-div3-h2 text-center ">Invite</h2>
                                <p className="showInstruction-p3" > 1 Friend</p>
                              </div>
 
                              <div className="w-min ">
                                <img src={addGoalIcon} alt="" className="showInstruction-img" />
                                <button className="showInstruction-button m-auto "><img src={rewarddiamond} alt="" className="" />+{userdetail?.coinmaster[6]?.coins}</button>
                                <h2 className="showInstruction-div3-h2 ml-8 md:ml-5 ">Add Goal</h2>
                                <p className="showInstruction-p3 " > More coins for each added goal</p>
                              </div>
                            </div>
                            <div className="flex gap-4 justify-around">
                              <div className="w-min ">
                                <img src={details_icon} alt="" className="showInstruction-img ml-10 md:m-auto" />
                                <button className="showInstruction-button  "><img src={rewarddiamond} alt="" className="" />+{userdetail?.coinmaster[3]?.coins}</button>
                                <h2 className="showInstruction-div3-h2 pl-4 md:pl-0 ">Add Details</h2>
                                <p className="showInstruction-p3 max-w-[86%] md:max-w-[100%]" > Instead of lumpsums, add Breakdowns in Basecamp</p>
                              </div>
 
                              <div className="w-min ">
                                <img src={lock_icon} alt="" className="showInstruction-img" />
                                <button className="showInstruction-button "><img src={rewarddiamond} alt="" className="w-50" />+{userdetail?.coinmaster[7]?.coins}</button>
                                <h2 className="showInstruction-div3-h2 text-center leading-4 md:leading-7">Complete Basecamp</h2>
                                <p className="showInstruction-p3" >View Money Matters</p>
                              </div>
 
                            </div>
                            <button className="lg:text-lg text-sm bg-gray-800 rounded-2xl border-solid border-slate-400 p-1 lg:p-2 px-4 border-[1px] lg:font-semibold font-medium text-slate-200 absolute lg:bottom-11 bottom-6 left-1/2 translate-x-10 z-30" onClick={() =>finishClickHandler()}>Finish</button>
                          </div>
 
                        </div>
                      </div>
                    </div>
 
                    <div className="absolute z-30 flex -translate-x-1/2 lg:bottom-16 bottom-8 left-1/2 space-x-3 rtl:space-x-reverse">
                      <button type="button" className="showInstruction-btn bg-slate-700 " aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                      <button type="button" className="showInstruction-btn bg-gray-400" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                      <button type="button" className="showInstruction-btn bg-gray-400" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    </div>

                    <button type="button" className="absolute flex  lg:bottom-11 bottom-3 left-1/2 -translate-x-[6rem] justify-center z-30 px-4 cursor-pointer group hidden" data-carousel-prev onClick={prevButton}>
                      <span className="inline-flex justify-center w-10 h-10  ">
                        <svg className="w-2 md:w-4 h-6 text-slate-700 dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button type="button" className="absolute lg:bottom-11 bottom-3  translate-x-[6rem]  z-30 flex  justify-center  px-4 cursor-pointer group right-1/2 " data-carousel-next onClick={nextButton}>
                      <span className="inline-flex justify-center w-10 h-10 ">
                        <svg className="w-2 md:w-4 h-6  text-slate-700 dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </div>
 
                </div>
              </div>
            </div>
          </>
        ) : null}



<ToastContainer hideProgressBar toastStyle={{background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>
      </div>
    </div>
  )
}

export default Desktop_L1