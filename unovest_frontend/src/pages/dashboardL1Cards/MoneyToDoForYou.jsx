import React, { useEffect, useState } from 'react'
import MoneyDoFor from '../../components/rangepickers/MoneyDoFor'
import RangeInput from '../../components/rangepickers/RangeInput';
import Rewards_icon from '../../components/my-power/sidebar-icons/Rewards_icon';
import House_Icon from '../../components/my-power/sidebar-icons/House_Icon';
import Unique_experience from '../../components/my-power/sidebar-icons/Unique_experience';
import { TbPlaneTilt } from "react-icons/tb";
import { RiEdit2Line } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FaCar, FaPlus } from "react-icons/fa";
import { FaGraduationCap } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux'
import { all_level_1_data } from '../../redux/slices/Level_1_all_data';
import useFetchPortfolio from '../../useFetchPortfolio/useFetchPortfolio';
import SelectDropdown from '../../components/select-dropdown/SelectDropdown';
import { changeNumbertoComma, formatNumberWithCommas } from '../../Variable';
import { deleteData, getData, getWithoutAuth, saveDetails, updateDetails } from '../destop_L1/server';
import { all_financial_freedom_data } from '../../redux/slices/FinancialFreedomData';
import { CurrencyData } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import Tooltip from '../../components/tooltip/Tooltip';
import DeleteConfirmation from '../../components/notifierModal/DeleteConfirmation';

const MoneyToDoForYou = () => {
    const dispatch = useDispatch();
    const [rangeValue, setrangeValue] = useState(0);
    const [section, setsection] = useState(1);
    const [isMobileEdit, setIsMobileEdit] = useState(false);
    const [mobileSection, setMobilesection] = useState(0);

    const selectedGoal = useSelector((state) => state.level_1_data?.selectedGoal)
    const selectedIndex = useSelector((state) => state.level_1_data?.index)
    const [index, setindex] = useState(selectedIndex || 0);
    const [goalSelctIndex, setGoalSelectedIndex] = useState([1]);
    const [isMobile, setIsMobile] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] =  useState(false);
    const [deleteIndex, setDeleteIndex] =  useState({});

    const [newGoal, setNewGoal] = useState({
        user_goal_name: "",
        cost_per_year: 0,
        purchase_year: '2028',
        course_duration: 1
    });
    
    const goalList = useSelector((state) => state.level_1_data.user_goal_data)
    const allGoalsList = useSelector((state) => state.level_1_data?.allGoals)
    const numerictype = useSelector(state => state?.statistical_Data?.numerical_format)
    const allmodels = useSelector(state => state?.Card_inputs);
    const userdetails = JSON.parse(localStorage.getItem('userdetails'));
    const page_data = useSelector((state) => state.Page_Data);
    const [goal, setgoal] = useState([]);

    const {result_chart_data} = useFetchPortfolio(goal?.cost_per_year,goal?.course_duration,goal?.purchase_year,rangeValue,goalList);
    console.log(result_chart_data,"chart"); 
  
    useEffect(() => {
          if (window.innerWidth < 768) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
      }, [window.innerWidth]); 

    useEffect(() => {
        if (goalList?.length <= 0) {
            setsection(2)
        }
        if( goalList && goalList?.length > 0){
            const initialData = goalList?.map(list => {
                return {...list, 
                    catergory: list.goal_id == 1 ? 'Education'
                        : list.goal_id == 2 ? 'Property'
                            : list.goal_id == 3 ? 'Travel' :
                                list.goal_id == 4 ? 'Wedding'
                                    : list.goal_id == 5 ? 'Vehicle'
                                        : 'Unique Experience',
                    icons: list.goal_id == 1 ? <FaGraduationCap color={"#B0C3F5"} />
                        : list.goal_id == 2 ? <House_Icon stroke={"#B0C3F5"} />
                            : list.goal_id == 3 ? <TbPlaneTilt stroke={"#B0C3F5"} />
                                : list.goal_id == 4 ? <CiHeart color='#B0C3F5' />
                                    : list.goal_id == 5 ? <FaCar stroke={"#B0C3F5"} color='#B0C3F5' />
                                        : <Unique_experience stroke={"#B0C3F5"} />
                }
            })

            const initialGoal = typeof selectedGoal == 'object' && selectedGoal.hasOwnProperty('goal_id')? selectedGoal: null;
            setgoal(initialGoal || initialData[0])
        }
        if(goalList == null){
            setsection(2)
        }
        getAllData();
    }, []);


    // get all data
    const getAllData=async()=>{
        await getWithoutAuth("all-goals", (success) => {
            if (success.data.code === 200) {
                dispatch(all_level_1_data({allGoals:success.data.message}))
            }
        }, (err) => {
            console.log(err);
        })
    }


    // for updating the goals
    const clickEdit = (obj, i,id ) => {
        console.log(obj, 'object');
        const getGoalList = goalListWithCategory.filter((list) => list.id == id)
        setgoal(...getGoalList)
        setDeleteIndex(obj);
        setrangeValue(obj.emi_amount)
        setindex(i)
        setrangeValue(0)
        if(isMobile){
            setIsMobileEdit(true)
        }
    }

    //for delete confirmation click
    const clickDeleteConfirmation = (obj, i,id) => {
        setDeleteConfirmation(true);
        setDeleteIndex(obj);
        const getGoalList = goalListWithCategory.filter((list) => list.id == id)
        setgoal(...getGoalList)
        // clickDelete(goal, goal?.id)
    }

    // for deleting the goals
    const clickDelete = async(obj, id) =>{
        if (index != goalListWithCategory.length - 1) {
            setgoal(goalListWithCategory[index + 1])
            setindex(index + 1)
        }

        const updatedListAfterDelete = goalListWithCategory.filter((list) => list.id !== id)
        dispatch(all_level_1_data({ user_goal_data: updatedListAfterDelete, selectedGoal: goalListWithCategory[index + 1], index: index + 1}))
       await deleteData("user-goal", id, (success) => {
            if (success.data.code === 200) {
                toast.success(success.data.status_message)
                back();
                if(updatedListAfterDelete?.length <=0){
                    // getGoalCalculations();
                    setsection(2);
                }
                getData("user-goal", (success) => {
                    if (success.data.code === 200) {
                      
                        setTimeout(() => {
                            getGoalCalculations();
                        }, 1000);
                        console.log(success.data.message,'delete get success');
                        setrangeValue(0)
                        // setallLoans(success.data.message)
                    } else {
                        // setsection(2);
                        // setallLoans([])
                    }
                },(error) =>{
                    // setsection(2);
                    console.log(error);
                  
                })
            }
        }, (error) => {
            // setsection(2);
            // console.log(error)
        })
    }

    const back = () => {
        if (index != 0) {
            setgoal(goalListWithCategory[index - 1])
            setindex(index - 1)
        }
    }
    const next = async () => {
        let Id = goal?.id;
        console.log(Id,'get');
        //------------------for setting next goal on update---------------//
        if (index != goalListWithCategory.length - 1) {
            setgoal(goalListWithCategory[index + 1])
            setindex(index + 1)
        }
        
        if((goal.hasOwnProperty('user_goal_name') && goal['user_goal_name'] !== '')
        && (goal.hasOwnProperty('course_duration') && goal['course_duration'] !== 0)
        && (goal.hasOwnProperty('purchase_year') && goal['purchase_year'] !== 0)
        && (goal.hasOwnProperty('cost_per_year') && Number(goal['cost_per_year']) !== 0)
        ){
           if(goal['purchase_year'] >= new Date().getFullYear()){
            
            let payload = { 
            "user_goal_name": goal.user_goal_name,
            "purchase_year": +goal.purchase_year,
            "course_duration": +goal.course_duration,
            "cost_per_year": +goal.cost_per_year
             }

                await updateDetails(Id, "user-goal", payload, (success) => {
                    if (success.data.code === 200) {
                        console.log(success.data,'ok');
                        toast.success(success.data.status_message)
                        getData("user-goal", (success) => {
                            if (success.data.code === 200) {
                                const updatedList = goalListWithCategory?.map((list) => list.id == goal.id? goal: list)
                                dispatch(all_level_1_data({ user_goal_data: updatedList, selectedGoal:goalListWithCategory[index + 1] , index:index + 1 }))
                           
                                setrangeValue(0)
                                setTimeout(() => {
                                    getGoalCalculations(); 
                                }, 1000);
                              
                                // setallLoans(success.data.message)
                            } else {
                                setsection(2);
                                // setallLoans([])
                            }
                        },(error) =>{
                            setsection(2);
                            console.log(error);
                        
                        })
                    }
                })
           }else{
            toast.warn('Purchase year should be greater than current year')
           }
        }else{
            toast.warn('Please fill all the input fields')
        }

       

    }

    const handleInputChange = (e) => {
        // const { name, value } = e.target;
        let temp = { ...goal };
        // Applying validation based on the input name
        if (e.target.name === 'user_goal_name') {
            temp[e.target.name] = e.target.value;
            setgoal(temp);
        } else if (e.target.name === 'cost_per_year') {
            // Validate cost_per_year input and set rangeValue accordingly
            temp[e.target.name] = +e.target.value.replace(/,/g, '');
            setrangeValue(+e.target.value.replace(/,/g, ''));
            setgoal(temp);
        } else {
            // For other inputs like course_duration and purchase_year, ensure numeric values
            if (/^\d*\.?\d*$/.test(e.target.value)){
                temp[e.target.name] = +e.target.value;
                setgoal(temp);
            }
        }
        temp['isEdit_goal'] = true
        
        let arr = [...goalList];
        const index = arr.indexOf(goal);
        arr[index] = temp;
        dispatch(all_level_1_data({ user_goal_data: arr }));
    };
    
  
  
    // to handle new goal
    const newGoalHandler=(e)=>{
        // debugger;
        let newGoalInput = {...newGoal}
        const{name,value} = e.target;
        if(e.target.name === 'purchase_year'){
            if (/^\d{0,4}$/.test(e.target.value)) {
                setNewGoal({
                    ...newGoal,
                    [name]: value.replace(/,/g, '')
                })
            }
        } else if(e.target.name === 'course_duration'){
            if (/^\d{0,2}$/.test(e.target.value)) {
                setNewGoal({
                    ...newGoal,
                    [name]: +value
                })
            }
        } 
        else if(e.target.name === 'cost_per_year'){
            newGoalInput[e.target.name] = +e.target.value.replace(/,/g, '')
            setrangeValue(+newGoalInput.cost_per_year)
            setNewGoal(newGoalInput)
           
        }
        else if(e.target.name === 'user_goal_name'){
            setNewGoal({
                ...newGoal,
                [name]:value
            })
        }else{
           
            setNewGoal({
                ...newGoal,
                [name]:+value
            })
        }
        
    }
  
    const CurrencyFinder=()=>{
        // const userdetails = JSON.parse(localStorage.getItem('userdetails'));
        // const numerictype = userdetails?.user_data?.numerical_format || 'lakhs';
        if(numerictype == 'millions'){
            return <FaDollarSign />;
        } else if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
          return selectedCurrency;
        } else{
            return <FaIndianRupeeSign />;
          }
      }
   
    // check and uncheck of goal Cards
    const goalCheckHandler=(goalId)=>{
    //-------------------------------for selecting one at a time------------------------------   
        setGoalSelectedIndex((prevSelectedGoalId) =>
        prevSelectedGoalId === goalId ? null : [goalId]
        );
    //--------------------------- to reset the value on goal Change------------------
        setNewGoal({
            ...newGoal,
            user_goal_name: '',
            cost_per_year:0,
            purchase_year: 0,
            course_duration: 1
        })
        setrangeValue(0);
        setMobilesection(2);
    }
    
    // check if goal Id is present to toggle the goals
    const isGoalSelected =(goalId)=> {
        return goalSelctIndex.includes(goalId);
    } 

    // change placeholder based on goal select index
    const goalDetailSelector=()=>{
        const getGoalId = goalSelctIndex[0];
        switch (getGoalId) {
            case 1:
            return {
                placeHolder:'Enter Education',
                icon: <FaGraduationCap color='#B0C3F5' />,
                id: 1
            } 
            
            case 3: 
            return {
                placeHolder:"Enter Travels",
                icon: <TbPlaneTilt color='#B0C3F5' />,
                id: 3
            }

            case 2: 
            return {
                placeHolder:"Enter Property",
                icon: <House_Icon stroke='#B0C3F5' />,
                id: 2
            } 

            case 4:
            return {
                placeHolder:"Enter Wedding",
                icon: <CiHeart color='#B0C3F5' />,
                id: 4
            } 

            case 5:
            return {
                placeHolder:"Enter Vehicle",
                icon: <FaCar color='#B0C3F5' />,
                id: 5
            } 

            default: 
            return {
                placeHolder:'Enter Unique Experience',
                icon: <Unique_experience stroke='#B0C3F5'/>,
                id: 6
            } 
        }
    }
   

    // add new to goalList
    const addNewGoalToList = async() =>{
        if((newGoal.hasOwnProperty('user_goal_name') && newGoal['user_goal_name'] !== '')
        && (newGoal.hasOwnProperty('course_duration') && newGoal['course_duration'] !== 0)
        && (newGoal.hasOwnProperty('purchase_year') && newGoal['purchase_year'] !== 0)
        && (newGoal.hasOwnProperty('cost_per_year') && newGoal['cost_per_year'] !== 0)
        && (Number(rangeValue) !== 0)
        ){
            if(newGoal['purchase_year'] >= (new Date().getFullYear()-1)){
                 
                let payload = {
                "user_goal_name": newGoal.user_goal_name,
                "purchase_year":  +newGoal.purchase_year,
                "course_duration": +newGoal.course_duration,
                "cost_per_year":  +rangeValue,
                "login_form_number": 5,
                 goal_id: goalDetailSelector()?.id
            }
            console.log(payload,'payload');
       
            await saveDetails("user-goal", payload, (success) => {
                console.log(success,'success');
                if (success.data.code == 200) {
                    toast.success(success.data.status_message)
                    let responce = success.data.message
                    console.log(responce,'response');
                    if(goalList?.length > 0){
                        const temp = [...goalList, responce]
                        dispatch(all_level_1_data({ user_goal_data: temp }))
                        setgoal(responce);
                    }else{
                       let temp=[responce];
                       setgoal(responce);
                        dispatch(all_level_1_data({ user_goal_data: temp }))
                        setsection(1);
                    }
                    setTimeout(() => {
                        getGoalCalculations();     
                    }, 1000);
                    // getGoalCalculations();     
                    setNewGoal({})
                    setrangeValue(0)
                    setsection(1);
                   
                }
            }, (error) => {
                console.log(error)
            })
            }else{
                toast.warn('Purchase year should be greater than current year')
            }  
        }else {
            toast.warn('Please fill all the input fields')
        }
       

    }

    const getGoalCalculations=async()=>{
       await saveDetails("goalcalculation", {}, (success) => {
            console.log(success,'success goal');
            dispatch(all_financial_freedom_data(success.data.message))
        }, (error) => {
            console.log(error)
            // dispatch(all_financial_freedom_data({}))
        })
    }

    // add goal type to each goal in the goal List
    const goalListWithCategory = goalList?.map(list => {
        return {...list, 
            catergory: list.goal_id == 1 ? 'Education'
                : list.goal_id == 2 ? 'Property'
                    : list.goal_id == 3 ? 'Travel' :
                        list.goal_id == 4 ? 'Wedding'
                            : list.goal_id == 5 ? 'Vehicle'
                                : 'Unique Experience',
            icons: list.goal_id == 1 ? <FaGraduationCap color={"#B0C3F5"} />
                : list.goal_id == 2 ? <House_Icon stroke={"#B0C3F5"} />
                    : list.goal_id == 3 ? <TbPlaneTilt stroke={"#B0C3F5"} />
                        : list.goal_id == 4 ? <CiHeart color='#B0C3F5' />
                            : list.goal_id == 5 ? <FaCar stroke={"#B0C3F5"} color='#B0C3F5' />
                                : <Unique_experience stroke={"#B0C3F5"} />
                               
        }
    })

    const allGoalListwithIcons = allGoalsList?.map(list => {
        return {
            ...list,
            icons: list.id == 1 ? <FaGraduationCap color={isGoalSelected(list.id)?"black":"#B0C3F5"} />
                : list.id == 2 ? <House_Icon stroke={isGoalSelected(list.id)?"black":"#B0C3F5"} />
                    : list.id == 3 ? <TbPlaneTilt color={isGoalSelected(list.id)?"black":"#B0C3F5"} />
                        : list.id == 4 ? <CiHeart color={isGoalSelected(list.id)?"black":"#B0C3F5"} />
                            : list.id == 5 ? <FaCar color={isGoalSelected(list.id)?"black":"#B0C3F5"} />
                                : <Unique_experience stroke={isGoalSelected(list.id)?"black":"#B0C3F5"} />
        }
    })

      // select handler to get the selected goal  
      const onSelectHandler = (value) =>{
        const getGoalList = goalListWithCategory.filter((list) => list.id == value.id)
        setgoal(...getGoalList);
    }
    

    const MoneyToDoForYouDesktop=()=>{
        return(
            section === 1 ?
                (<div className='flex max-lg:flex-col flex-wrap md:flex-nowrap lg:max-h-[320px]'>
                    <div className=' w-full rounded-br-[20px] max-lg:pb-5' style={{ background: "radial-gradient(869.97% 109.42% at 315.67% 129.74%, #9891AD 0%, #538096 14.18%, #3C566E 54.79%, #131529 89.23%)" }}>
                        <div className='overflow-y-scroll max-h-[320px] pr-12 pt-12 mx-12  mr-0 rounded-[15px] flex flex-col gap-3'>
                            {goalListWithCategory?.length > 0 &&
                                goalListWithCategory.map((goal, index) => {
                                    return(
                                        <div className={`w-full flex justify-between ps-5 pe-4 py-3 rounded-[20px] ${goal?.goal_id === goal.id ? "border border-desk-purple" : ""}`} style={{ boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)", background: "rgba(236, 236, 236, 0.20)" }}>
                                            <div className='flex gap-2 items-center'>
                                                <span className='scale-125'>{goal?.icons}</span>
                                                <p className='text-grey-2 lg:text-lg md:text-base'>{goal?.user_goal_name}</p>
                                            </div>
                                            <div className='flex gap-4'>
                                                <button className='text-desk-light-blue-2 scale-125' onClick={() => clickEdit(goal, index, goal?.id)}><RiEdit2Line /></button>
                                                <button className='text-desk-light-blue-2 scale-125' onClick={() => clickDeleteConfirmation(goal, index,goal?.id) }><RiDeleteBin6Line /></button>
                                            </div>
                                        </div>
                                    )})}
                        </div>
                    </div>
                    <div className=' p-12 pb-0 mb-8 w-full overflow-y-scroll max-h-[320px]'>
                        <div className='flex flex-col gap-2 '>
                            <div className='md:mx-10 flex flex-col gap-6'>
                                <div className='flex justify-between gap-6 items-center lg:min-w-[480px] max-lg:w-full'>
                                    {/* Select Dropdown Component */}
                                    <SelectDropdown
                                        options={goalListWithCategory || []}
                                        onSelect={onSelectHandler}
                                        selectedValue={goal}
                                        containerClassName={'bg-grey-0 bg-opacity-30 text-indigo-300 rounded-2xl lg:text-lg md:text-base font-medium'}
                                        name={'goal_id'}
                                        iconMap={true}
                                        disable={page_data?.is_expired}
                                        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                                    />
                                    {/* Delete Button */}
                                    <button disabled={page_data?.is_expired} className={`${page_data?.is_expired && 'opacity-80 bg-gray-700'} p-3 rounded-[15px] shadow border border-indigo-300 backdrop-blur-xl text-desk-light-blue-2`} onClick={() =>  setDeleteConfirmation(true)}>
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                        
                                <div>
                                    <p className='text-zinc-400 lg:text-base md:text-sm font-medium font-["Montserrat"] leading-[21.12px] mb-2 text-left'>Name of the Goal</p>
                                    <input
                                        className='input-border-none px-4 py-1 bg-zinc-300 bg-opacity-10 rounded-[15px] border border-indigo-300 w-full text-indigo-300 lg:text-xl text-lg font-medium font-["Montserrat"] leading-relaxed'
                                        value={goal?.user_goal_name}
                                        name='user_goal_name'
                                        onChange={handleInputChange}
                                        onInput={handleInputChange}
                                        placeholder={goalDetailSelector().placeHolder}
                                    />
                                </div>


                                <div className='flex w-full justify-between gap-3 items-baseline'>
                                    <div className='flex-grow'>
                                        <div className='flex justify-between items-center text-grey-3'>
                                            <p className='text-zinc-400 lg:text-base md:text-sm font-medium font-["Montserrat"] leading-[21.12px] mb-2 text-left'>Cost Per Year</p>
                                            <div className='border flex items-center text-desk-light-blue-2 border-desk-light-blue-2 px-4 py-2 text-lg rounded-2xl'>
                                                <span><CurrencyFinder /></span>
                                                <input 
                                                name='cost_per_year' 
                                                className='input-border-none bg-transparent lg:w-36 w-32 font-Work_Sans font-normal lg:text-lg md:text-base ' 
                                                value={changeNumbertoComma(goal?.cost_per_year? goal?.cost_per_year.toString() : '', numerictype)} 
                                                onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <RangeInput name="cost_per_year" className='progress w-full' value={isNaN(goal?.cost_per_year) == false? goal?.cost_per_year: 0 } min="0" max="100000000" style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(goal?.cost_per_year || 0) / 100000000 * 100}%, #676767 ${(goal?.cost_per_year || 0) / 100000000 * 100}%, #676767 100%)` }} onChange={handleInputChange} />
                                    </div>

                                </div>
                                {/* EMI Amount */}
                                
                                {(goal?.goal_id === 1 || goal?.catergory === 'Education') && (
                                    <div className='flex w-full justify-between gap-3 items-baseline'>
                                        <div className='flex-grow'>
                                            <div className='flex justify-between items-center text-grey-3'>
                                                <p className='text-grey-3  lg:text-base md:text-sm font-medium font-["Montserrat"]'>{"Course Duration"}</p>
                                                <div className='border flex items-center text-desk-light-blue-2 border-desk-light-blue-2 px-4 py-2 text-lg rounded-2xl' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                    <input type="text"
                                                        // autoFocus
                                                        name='course_duration'
                                                        value={goal?.course_duration}
                                                        className={`input-border-none bg-transparent w-12 text-center font-semibold`}
                                                        onChange={handleInputChange}
                                                        maxLength={2}
                                                        max={10}
                                                        min={0}
                                                        
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <RangeInput name="course_duration" className='progress w-full' value={goal?.course_duration} min={0} max={10} style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(goal?.course_duration || 0) * 10}%, #676767 ${(goal?.course_duration || 0) * 10}%, #676767 100%)` }} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/* EMI Ends in year */}
                                <div className='flex gap-6 items-center justify-between'>
                                    <div className='min-w-[144px]'>
                                        <p className='text-grey-3  lg:text-base md:text-sm font-medium font-["Montserrat"] text-start'>{"Start Year"}</p>
                                    </div>

                                    <div className='flex items-center bg-grey-4 w-[94px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-[15px] rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                        <input type="text"
                                            // autoFocus
                                            name='purchase_year'
                                            value={goal?.purchase_year}
                                            onChange={handleInputChange}
                                            className={`w-full text-center font-semibold font-Work_Sans input-border-none bg-transparent text-xl leading-3`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className='w-max mx-auto px-4 py-3 bg-indigo-300 rounded-2xl text-cyan-950 text-base font-bold font-["Montserrat"] leading-[21.12px]' onClick={next}>
                                Update and Next
                            </button>


                        </div>
                    </div>
                </div>) :
                section === 2 ?
                    (<div className="px-9 py-6 md:p-16 md:mx-16 min-h-[320px]">
                        <div className='flex w-full flex-col items-center gap-[42px] md:gap-10 justify-center'>
                            <p className='text-center font-Montserrat text-sm md:text-lg font-normal md:font-bold text-grey-2 md:leading-snug italic md:not-italic mx-12 mt-14 md:mt-0 leading-[18.48px]'>Add some Life Goals & plan your life ahead</p>
                            <button onClick={() => {
                                setsection(3);
                                setGoalSelectedIndex([1]);
                                setNewGoal({
                                    ...newGoal,
                                    course_duration: 1,
                                    user_goal_name: '',
                                    purchase_year: 0,
                                    cost_per_year: 0
                                });
                                setrangeValue(0)
                            }} className='text-indigo-300 md:text-dark-blue py-3 md:bg-desk-purple rounded-2xl text-base font-semibold flex items-center justify-between border md:border-none border-indigo-300'>
                                <p className='pr-6 pl-14 text-lg'>Add Goal</p> <span className='inline-block ml-4 pr-3 '> <FiPlus className='text-indigo-300 md:text-dark-blue font-bold' /> </span>
                            </button>
                        </div>
                    </div>) :
                    section === 3 ?
                        (<div className='flex flex-wrap md:flex-nowrap'>
                            <div className=' w-full flex-wrap rounded-br-[20px]' style={{ background: "radial-gradient(262.97% 226.42% at 228.67% 115.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 0.18%, rgb(60, 86, 110) 54.79%, rgb(19, 21, 41) 77.23%)" }}>
                                <div className="p-2 md:py-4 md:m-16">
                                    <p className='text-slate-300 italic mb-2 text-left'>Select Goal Type</p>
                                    <div className='flex flex-wrap items-center gap-1 md:gap-3 justify-center'>
                                        {allGoalListwithIcons.length > 0 && allGoalListwithIcons.map(list =>{
                                                const {icons, goal_name,id} =  list
                                                return (
                                                    <div onClick={() => goalCheckHandler(id)} className={`${isGoalSelected(id) ? ' bg-desk-purple' : 'bg-gray-600 bg-opacity-20'} border border-slate-400 px-2 py-2 md:px-4 md:py-6 rounded-2xl flex items-center gap-2 min-w-full md:min-w-[200px]`} style={{ flex: "0 1 calc(50% - 12px)" }}>
                                                        <div className='flex gap-1 items-center'>
                                                            <span className='scale-125'>{icons}</span>
                                                            <span className={`${isGoalSelected(id) ? 'text-slate-800' : 'text-gray-300'} text-lg text-nowrap font-normal font-['Montserrat'] leading-[18.48px]`}>{goal_name}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className='py-6 px-8 md:p-12 w-full'>
                                <div className='flex flex-col gap-2 '>
                                    <div className='md:mx-10 flex flex-col gap-5'>
                                        <p className='italic text-zinc-400 text-sm font-normal text-left'>Enter Goal Details..</p>
                                        <div className='flex flex-wrap md:flex-nowrap justify-between items-center gap-6 text-grey-3'>
                                            <p>Name of the Goal</p>
                                            <input 
                                            name='user_goal_name' 
                                            onChange={newGoalHandler} 
                                            placeholder={goalDetailSelector().placeHolder} 
                                            value={newGoal.user_goal_name} 
                                            className='text-xl px-4 flex-1 font-semibold input-border-none py-2 rounded-2xl border border-indigo-300 text-desk-light-blue-2 bg-zinc-300 bg-opacity-10' 
                                            />
                                        </div>
                                        <div className='flex w-full justify-between gap-3 items-baseline'>
                                            <div className='flex-grow'>
                                                <div className='flex justify-between items-center text-grey-3'>
                                                    <p>{"Today’s Cost"}</p>
                                                    <div className='max-w-[160px] flex items-center border bg-zinc-300 bg-opacity-10 px-4 py-2 rounded-2xl leading-[0.6] border-desk-light-blue-2 text-desk-light-blue-2' >
                                                        <span><CurrencyFinder /> </span>
                                                        <input name='cost_per_year'
                                                            className='bg-transparent input-border-none max-w-34 text-xl font-semibold'
                                                            onChange={newGoalHandler}
                                                            value={formatNumberWithCommas(rangeValue || 0)}
                                                            defaultValue={`${rangeValue}`} />
                                                    </div>
                                                </div>
                                                <RangeInput name='cost_per_year' className='progress w-full' value={rangeValue || 0} min="0" max="100000000" style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(rangeValue || 0) / 100000000 * 100}%, #676767 ${(rangeValue || 0) / 100000000 * 100}%, #676767 100%)` }} onChange={newGoalHandler} />
                                            </div>

                                        </div>
                                        {/* EMI Amount */}
                                        {goalSelctIndex.includes(1) && (
                                            <div className='flex gap-6 items-center justify-between'>
                                                <div className='min-w-[144px]'>
                                                    <p className='text-grey-3'>{"Course Duration"}</p>
                                                </div>
                                                <div className="flex-grow">
                                                    <RangeInput name="course_duration" className='progress w-full' value={newGoal?.course_duration} min={0} max={4} style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(newGoal?.course_duration || 0) * 25}%, #676767 ${(newGoal?.course_duration || 0) * 25}%, #676767 100%)` }} onChange={newGoalHandler} />
                                                </div>
                                                <div className='flex items-center bg-grey-4 w-[76px] py-1.5 border text-desk-purple border-desk-purple px-4 rounded-2xl font-Work_Sans input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                    <input type="text"
                                                        // autoFocus
                                                        name='course_duration'
                                                        value={newGoal?.course_duration}
                                                        className={`w-full font-semibold text-center font-Work_Sans input-border-none bg-transparent text-lg`}
                                                        onChange={newGoalHandler}
                                                        maxLength={2}
                                                        max={10}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* EMI Ends in year */}
                                        <div className='flex gap-6 items-center justify-between'>
                                            <div className='min-w-[144px]'>
                                                <p className='text-grey-3'>{"Year of Purchase"}</p>
                                            </div>
                                            <div className='flex items-center bg-grey-4 w-[76px] py-1.5 border text-desk-purple border-desk-purple px-4 rounded-2xl font-Work_Sans input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                <input type="text"
                                                    name='purchase_year'
                                                    value={newGoal.purchase_year}
                                                    onChange={newGoalHandler}
                                                    // autoFocus
                                                    className={`w-full text-center font-semibold font-Work_Sans input-border-none bg-transparent text-lg`}
                                                />
                                            </div>
                                        </div>

                                        <button onClick={addNewGoalToList} className='mx-auto px-4 py-2 bg-indigo-300 rounded-2xl text-cyan-950 text-lg font-bold font-["Montserrat"]'>
                                            Add & View All
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>)
                        : null
        )
    }

    const MoneyToDoForYouMobile = () => {
        return (
            section === 1 ?
            //---------------for update goal------------------------//
                isMobileEdit ? (
                    <div className='p-8 pb-0 mb-8 w-full overflow-y-scroll max-h-[320px]'>
                        <div className='flex flex-col gap-2 '>
                            <div className='md:mx-10 flex flex-col gap-4'>
                                <div className='flex' onClick={() => setIsMobileEdit(false)}>
                                    <button className='me-2 flex gap-2 cursor-pointer text-desk-purple'>
                                        {"<"}
                                    </button>
                                    <span className='text-desk-purple text-sm'>Back</span>
                                </div>
                                <div>
                                    <div className='flex gap-3 justify-between items-center mb-2'>
                                        <div className='flex gap-1 items-center'>
                                            <span>{goalDetailSelector().icon}</span>
                                            <p className='text-zinc-400 text-sm font-medium font-["Montserrat"] leading-[21.12px] text-left'>Name of the Goal</p>
                                        </div>
                                        {/* Delete Button */}
                                        <button disabled={page_data?.is_expired} className={`${page_data?.is_expired && 'opacity-60 bg-gray-700'} p-2  rounded-3xl shadow border border-indigo-300 backdrop-blur-xl text-desk-light-blue-2`} onClick={() => setDeleteConfirmation(true)}>
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                    <input autoFocus
                                        className='input-border-none px-4 py-1 bg-zinc-300 bg-opacity-10 rounded-[15px] border border-indigo-300 w-full text-indigo-300 text-lg font-medium font-["Montserrat"] leading-relaxed'
                                        value={goal?.user_goal_name}
                                        name='user_goal_name'
                                        onChange={handleInputChange}
                                        onInput={handleInputChange}
                                        placeholder={goalDetailSelector().placeHolder}
                                    />

                                </div>
                                <div className='flex justify-between gap-6 items-center'>
                                    {/* Select Dropdown Component */}
                                    <div className='w-full'>
                                        <p className='text-zinc-400 text-sm font-medium font-["Montserrat"] w-full leading-[21.12px] mb-2 text-left'>Goal type</p>
                                        <SelectDropdown
                                        options={goalListWithCategory}
                                        onSelect={onSelectHandler}
                                        selectedOption={goal}
                                        containerClassName={'bg-grey-0 bg-opacity-20 text-indigo-300 rounded-2xl text-base font-medium'}
                                        name={'goal_id'}
                                        iconMap={true}
                                        disable={page_data?.is_expired}
                                        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                                    />
                                    </div>

                                </div>
                                {/* Cost Per Year */}
                                <div className='flex justify-between gap-3 items-baseline'>
                                    <div className='w-full'>
                                        <div className='flex justify-between items-center text-grey-3'>
                                            <p className='text-sm'>Cost Per Year</p>
                                            <div className='flex items-center gap-1 border text-desk-light-blue-2 border-desk-light-blue-2 px-4 py-2 rounded-2xl leading-[0.6]'>
                                                <span><CurrencyFinder /></span>
                                                <input 
                                                name='cost_per_year' 
                                                className='input-border-none bg-transparent max-md:max-w-[70px] font-semibold' 
                                                value={changeNumbertoComma(goal.cost_per_year? goal.cost_per_year.toString() : '', numerictype)} 
                                                onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <RangeInput name="cost_per_year" className='progress w-full' value={isNaN(goal?.cost_per_year)== false?goal?.cost_per_year: 0} min="0" max="1000000" style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(goal?.cost_per_year || 0) / 1000000 * 100}%, #676767 ${(goal?.cost_per_year || 0) / 1000000 * 100}%, #676767 100%)` }} onChange={handleInputChange} />
                                    </div>

                                </div>
                                {/* EMI Amount */}
                                {(goal?.goal_id === 1 || goal.catergory === 'Education') && (
                                    <div className='flex justify-between gap-3 items-baseline'>
                                        <div className='w-full'>
                                            <div className='flex justify-between items-center text-grey-3'>
                                              <p className='text-sm'>{"Course Duration"}</p>
                                                <div className='flex items-center gap-1 border text-desk-light-blue-2 border-desk-light-blue-2 px-4 py-2 rounded-2xl leading-[0.6]' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                    <input type="text"
                                                        // autoFocus
                                                        name='course_duration'
                                                        value={goal?.course_duration}
                                                        className={`input-border-none bg-transparent max-md:max-w-[30px] text-center font-semibold`}
                                                        onChange={handleInputChange}
                                                        maxLength={2}
                                                        max={10}
                                                        min={0}
                                                    />
                                                </div>
                                            </div>
                                                <RangeInput name="course_duration" className='progress w-full' value={goal?.course_duration} min={0} max={4} style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(goal?.course_duration || 0) * 25}%, #676767 ${(goal?.course_duration || 0) * 25}%, #676767 100%)` }} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                )}
                                {/* EMI Ends in year */}
                                <div className='flex gap-2 items-center justify-between'>
                                    <div className='min-w-[100px]'>
                                        <p className='text-grey-3 text-start text-sm'>{"Start Year"}</p>
                                    </div>

                                    <div className='flex items-center bg-grey-4 w-[80px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-[15px] rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                        <input type="text"
                                            // autoFocus
                                            name='purchase_year'
                                            value={goal?.purchase_year}
                                            onChange={handleInputChange}
                                            className={`w-full text-center font-semibold min-w-14 font-Work_Sans input-border-none bg-transparent text-base leading-3`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className='px-4 py-2 md:bg-desk-purplew-max mx-auto my-6 text-cyan-950 text-base font-bold bg-indigo-300 rounded-2xl' onClick={next}>
                                Update and Next
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-wrap md:flex-nowrap max-h-[320px] border-2 rounded-b-3xl border-solid shadow-2xl border-desk-purple'>
                        <div className=' w-full rounded-b-3xl' style={{ background: "radial-gradient(869.97% 109.42% at 315.67% 129.74%, #9891AD 0%, #538096 14.18%, #3C566E 54.79%, #131529 89.23%)" }}>
                            <div className='overflow-y-auto max-h-[320px] py-4 px-6 rounded-3xl flex flex-col gap-3'>
                                <div className="w-full bg-transparent rounded-[15px] shadow justify-start items-center gap-4 inline-flex">
                                    <button className="w-full flex items-center justify-between px-4 py-3 text-center text-blue-200 border-2 border-blue-200 rounded-2xl p-2 text-lg font-semibold font-['Montserrat'] leading-snug" onClick={() => {
                                        setMobilesection(1);
                                        setsection(3);
                                    }}>
                                        <span>Add A Goal</span> <span><FaPlus /></span>
                                    </button>
                                </div>
                                {goalListWithCategory &&
                                    goalListWithCategory.map((goal, index) => {
                                        const { icons } = goal;
                                        return (
                                            <div className={`w-full flex justify-between ps-5 pe-4 py-3 rounded-[20px] ${goal.goal_id === goal.id ? "border border-desk-purple" : ""}`} style={{ boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)", background: "rgba(236, 236, 236, 0.20)" }}>
                                                <div className='flex items-center gap-2'>
                                                    <span>{icons}</span>
                                                    <p className='text-grey-2'>{goal?.user_goal_name}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <button className='text-desk-light-blue-2' onClick={() => clickEdit(goal, index, goal?.id)}><RiEdit2Line /></button>
                                                    <button className='text-desk-light-blue-2' onClick={() => clickDeleteConfirmation(goal, index, goal?.id )}><RiDeleteBin6Line /></button>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                ) :
                section === 2 ?
                 //---------------Add goal Button------------------------//
                    <div className="px-9 py-6 md:p-16 md:mx-16 min-h-[320px]">
                        <div className='flex w-full flex-col items-center gap-[42px] md:gap-10 justify-center'>
                            <p className='text-center font-Montserrat text-sm md:text-lg font-normal md:font-bold text-grey-3 md:leading-snug italic md:not-italic mx-8 mt-14 md:mt-0 leading-[18.48px]'>Add some Life Goals & plan your life ahead</p>
                            <button onClick={() => {
                                setsection(3);
                                setGoalSelectedIndex([1]);
                                setNewGoal({
                                    ...newGoal,
                                    course_duration: 1,
                                    user_goal_name: '',
                                    purchase_year: 0,
                                    cost_per_year: 0
                                });
                                setrangeValue(0)
                            }} className='text-indigo-300 md:text-dark-blue py-3 md:bg-desk-purple rounded-2xl text-base font-semibold flex items-center justify-between border md:border-none border-indigo-300'>
                                <p className='pr-6 pl-14'>Add A Goal</p> <span className='inline-block ml-4 pr-3 '> <FiPlus className='text-indigo-300 md:text-dark-blue font-bold' /> </span>
                            </button>
                        </div>
                    </div> :
                    section === 3 ?
                      //---------------goal List------------------------//
                        <div className='flex flex-wrap md:flex-nowrap'>
                            {mobileSection == 1 ? (
                                <div className=' w-full flex-wrap rounded-br-[20px]' style={{ background: "radial-gradient(262.97% 226.42% at 228.67% 115.74%, rgb(152, 145, 173) 0%, rgb(83, 128, 150) 0.18%, rgb(60, 86, 110) 54.79%, rgb(19, 21, 41) 77.23%)" }}>
                                    <div className="p-6 py-6 pb-8">
                                        <p className='text-gray-300 italic mb-2 text-left ms-1 text-sm'>Select Goal Type</p>
                                        <div className='flex px-2 flex-wrap items-center gap-1 md:gap-3 justify-center'>
                                            {allGoalListwithIcons.length > 0 && allGoalListwithIcons.map(list => {
                                                const { icons, goal_name, id } = list
                                                return (
                                                    <div onClick={() => goalCheckHandler(id)} className={`${isGoalSelected(id) ? ' bg-desk-purple' : 'bg-gray-600 bg-opacity-20'} border border-slate-400 px-2 py-2 md:px-4 md:py-6 rounded-2xl flex items-center gap-2 min-w-full md:min-w-[200px]`} style={{ flex: "0 1 calc(50% - 12px)" }}>
                                                        <div className='flex gap-1 items-center'>
                                                            <span>{icons}</span>
                                                            <span className={`${isGoalSelected(id) ? 'text-slate-800' : 'text-gray-300'} text-md font-normal font-['Montserrat'] leading-[18.48px]`}>{goal_name}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                 //---------------Add Goal------------------------//
                                <div className='py-6 px-8 md:p-12 w-full'>
                                    <div className='flex flex-col gap-2 '>
                                        <div className='md:mx-10 flex flex-col gap-5'>
                                            <div className='flex justify-between items-center'>
                                                <p className='italic text-zinc-400 text-sm font-normal text-left'>Enter Goal Details..</p>
                                                <div className='flex' onClick={() => { goalList?.length > 0 ? setsection(1) : setsection(2) }}>
                                                    <button className='me-2 flex gap-2 cursor-pointer text-desk-purple' >
                                                        {"<"}
                                                    </button>
                                                    <span className='text-desk-purple text-sm'>Back</span>
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap md:flex-nowrap justify-between items-center gap-2 text-grey-3'>
                                                <div className='flex gap-1 items-center'>
                                                    <span>{goalDetailSelector().icon}</span>
                                                    <p className='text-sm'>Name of the Goal</p>
                                                </div>
                                                <input name='user_goal_name'
                                                    onChange={newGoalHandler}
                                                    placeholder={goalDetailSelector().placeHolder}
                                                    value={newGoal.user_goal_name}
                                                    className='text-base font-semibold px-4 flex-1 input-border-none py-2 md:py-1 rounded-3xl border border-indigo-300 text-desk-light-blue-2 bg-zinc-300 bg-opacity-10'
                                                />
                                            </div>
                                            <div className='flex w-full justify-between gap-3 items-baseline'>
                                                <div className='flex-grow'>
                                                    <div className='flex justify-between items-center text-grey-3'>
                                                        <p className='text-sm'>{"Today’s Cost"}</p>
                                                        <div className='max-w-[160px] flex items-center border bg-zinc-300 bg-opacity-10 px-4 py-2 rounded-2xl leading-[0.6] border-desk-light-blue-2 text-desk-light-blue-2' >
                                                            <span><CurrencyFinder /> </span>
                                                            <input 
                                                                name='cost_per_year'
                                                                className='font-semibold bg-transparent input-border-none max-w-24'
                                                                onChange={newGoalHandler}
                                                                // value={formatNumberWithCommas(rangeValue)}
                                                                value={ changeNumbertoComma(Number(rangeValue).toString() || '', numerictype)}
                                                                defaultValue={`${rangeValue}`} />
                                                        </div>
                                                    </div>
                                                    <RangeInput name='cost_per_year' className='progress w-full' value={rangeValue} min="0" max="100000000" style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(rangeValue || 0) / 100000000 * 100}%, #676767 ${(rangeValue || 0) / 100000000 * 100}%, #676767 100%)` }} onChange={newGoalHandler} />
                                                </div>

                                            </div>
                                            {/* EMI Amount */}
                                            {goalSelctIndex.includes(1) && (
                                                <div >
                                                    <div className='flex justify-between items-center'>
                                                        <p className='text-grey-3 text-sm'>{"Course Duration"}</p>
                                                        <div className='flex items-center  w-[60px] py-[8px] border text-desk-light-blue-2 border-desk-light-blue-2 px-[15px] rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                            <input type="text"
                                                                // autoFocus
                                                                name='course_duration'
                                                                value={newGoal?.course_duration}
                                                                className={`w-full text-center font-semibold font-Work_Sans input-border-none bg-transparent text-base leading-3`}
                                                                onChange={newGoalHandler}
                                                                maxLength={2}
                                                                max={10}
                                                                min={0}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <RangeInput name="course_duration" className='progress w-full' value={newGoal?.course_duration} min={0} max={4} style={{ background: `linear-gradient(to right, #B0C3F5 0%, #B0C3F5 ${(newGoal?.course_duration || 0) * 25}%, #676767 ${(newGoal?.course_duration || 0) * 25}%, #676767 100%)` }} onChange={newGoalHandler} />
                                                    </div>
                                                </div>
                                            )}

                                            {/* EMI Ends in year */}
                                            <div className='flex gap-6 items-center justify-between'>
                                                <div className='min-w-[144px]'>
                                                    <p className='text-grey-3 text-sm'>{"Year of Purchase"}</p>
                                                </div>
                                                <div className='flex items-center bg-grey-4 w-[76px] py-[8px] border text-desk-purple border-desk-purple px-[15px] rounded-2xl font-normal font-Work_Sans text-xs input-border-none' style={{ lineHeight: "20px", background: "#DCDCDC1A" }}>
                                                    <input type="text"
                                                        name='purchase_year'
                                                        value={newGoal.purchase_year}
                                                        onChange={newGoalHandler}
                                                        // autoFocus
                                                        className={`w-full text-center font-semibold font-Work_Sans input-border-none bg-transparent text-base leading-3`}
                                                    />
                                                </div>
                                            </div>

                                            <button onClick={addNewGoalToList} className='w-max mx-auto px-4 py-2 bg-indigo-300 rounded-2xl text-cyan-950 text-base font-bold font-["Montserrat"] leading-[21.12px]'>
                                                Add & View All
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        : null
        )
    }

    const toolTipArray=
    [{
        id: 1,
        tooltipId: 'edit',
        message: 'edit'
    },{
        id: 2,
        tooltipId: 'delete',
        message: 'delete'
    }]

    const cancelHandler = () => {
        setDeleteConfirmation(false);
        // dispatch(updateCradInputs({ deleteConfirmation: false }))
    }

    const deleteHandler=()=>{
        clickDelete(goal, goal?.id)
        // clickDelete(deleteIndex, deleteIndex?.id)
        setDeleteConfirmation(false);
    }

    const showBackButton = ( section == 3 && isMobile == false) ? true: false 
    const confirmationText = "Are you sure you want to delete"
    return (
        <div className='w-full rounded-3xl overflow-hidden '>
            <MoneyDoFor heading={"What do you want your Money to do for you?"} isBack={isMobile == false && showBackButton} list={goalList} amount={'5,72,58,582'} style={{ background: "#B0C3F5", textAlign: "center" }} addbtn={true} setsection={setsection}>
                {isMobile ?MoneyToDoForYouMobile() : MoneyToDoForYouDesktop()}
                 <ToastContainer hideProgressBar toastStyle={{background:"#b4daf6", width:isMobile?'80vw':'100%', color:"#0F3A4D", fontFamily:"Montserrat"}}/>
            </MoneyDoFor>
            {toolTipArray?.map(tip =>(
                <div key={tip.id}>
                    <Tooltip
                        id={tip.tooltipId} 
                        backgroundColor={'#232E41 '}
                        message={tip.message}
                        opacity={1}
                    />
                </div>
            ))}
               {deleteConfirmation && <DeleteConfirmation containerClass={'bg-indigo-200'} rightButtonClass='text-indigo-200' text={confirmationText} open={deleteConfirmation} toggleModal={cancelHandler} handlerCancel={cancelHandler} actionHandler={deleteHandler} property_name={`${goal.catergory}:${goal.user_goal_name}`}/>}
        </div>
    )
}

export default MoneyToDoForYou

  // useEffect(() =>{
    //     const temp = [...goalList ];

    //     let updatedGoalList = temp.map(goals => {
    //         return {...goals, cost_per_year : NumericBaseFormatConversion(goals.cost_per_year)}
    //     });

    //     dispatch(all_level_1_data({user_goal_data:updatedGoalList}))
    // },[numerictype]);

// const iconMap = [
//     {
//         id: 1,
//         catergory: 'Travel',
//         icon:  <TbPlaneTilt color='white' />
//     },
//     {
//         id: 2,
//         catergory: 'Property',
//         icon: <House_Icon stroke={"#fff"} />
//     },
//     {
//         id: 3,
//         catergory: 'Vehicle',
//         icon: <FaCar stroke={"#fff"} color='white'/>
//     },
//     {
//         id: 5,
//         catergory: 'Wedding',
//         icon:   <CiHeart color='white' />
//     },
//     {
//         id: 6,
//         catergory: 'Unique Experience',
//         icon:  <Unique_experience stroke={"#ECECEC"} />
//     },
//     {
//         id: 7,
//         catergory: 'Education',
//         icon:   <Rewards_icon stroke={"#fff"} />
//     }
// ]
