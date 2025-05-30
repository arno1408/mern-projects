import { useEffect, useState } from 'react';
import QuestionCard from '../../QuestionCard'
import CheckCard from '../CheckCard';
import Card_input from '../Card_input';
import Small_round_btn from '../../Small_round_btn';
import Add_btn from '../../Add_btn';
import { FaChevronRight } from 'react-icons/fa';
import Card_footer from '../Card_footer';
import Edit_goals from '../Edit_goals';
import { getWithoutAuth } from '../../../pages/destop_L1/server';
import { useDispatch, useSelector } from 'react-redux';
import { updateCradInputs } from '../../../redux/slices/Card_Inputs';
 
const Fifth_card = ({ handleNextClick }) => {
    const [educationIndex, seteducationIndex] = useState(0);
    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: 'Education', checked: true },
        { id: 2, label: 'Property', checked: false },
        { id: 3, label: 'Vehicle', checked: false },
        { id: 4, label: 'Travel', checked: false },
        { id: 5, label: 'Wedding', checked: false },
        { id: 6, label: 'Unique Experience', checked: false },
    ]);
    const [goalsList, setgoalsList] = useState([]);
    // const [mygoals, setMygoals] = useState([
    //     { goalName: 'Graduation' },
    //     { goalName: 'Post Graduation' },
    //     { goalName: 'Graduation' },
    //     { goalName: 'Post Graduation' },
    //     { goalName: 'Refurbishing' },
    //     { goalName: 'Home' },
    //     { goalName: 'Wedding' }
    // ])
    const allgoals = useSelector((state) => state?.Card_inputs?.allgoals ? state?.Card_inputs?.allgoals : []);
    const [currentgoal, setCurrentgoal] = useState(-1)
    const [cardSection, setCardSection] = useState(1)
    const [selectedGoals, setselectedGoals] = useState([])
    const [index, setindex] = useState(0)
    const [mainindex, setmainindex] = useState(0)
    const [goal, setgoal] = useState({});
    const [addedGoals, setAddedgoals] = useState([]);
    const allmodels = useSelector((state) => state.Card_inputs)
    const dispatch = useDispatch();
 
 
    // const handleCheckboxChange = (id) => {
    //     const updatedCheckboxes = checkboxes.map((checkbox) =>
    //         checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
    //     );
    //     setCheckboxes(updatedCheckboxes);
    // };
    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = allgoals.map((goal) =>
            goal.id === id ? { ...goal, checked: !goal.checked } : goal
        );
        console.log(updatedCheckboxes, "updatedCheckboxesupdatedCheckboxes")
        dispatch(updateCradInputs({ allgoals: updatedCheckboxes }))
        let newselectedGoals = updatedCheckboxes.filter((goal) => goal.checked)
        setselectedGoals(newselectedGoals)
 
        updatedCheckboxes.forEach((check, i) => {
            if (check.is_education == true) {
                seteducationIndex(i - 1);
                console.log(i)
            }
        })
 
    };
 
 
    let Green_btn = ({ onClick }) => {
        return (
            <div onClick={onClick} className="w-[104px] h-[46px] bg-emerald-300 rounded-[30px]  cursor-pointer flex justify-center items-center shadow-[0px_2px_10px_0px_rgba(103,234,179,0.60)] border border-accent-bright-green">
                <FaChevronRight size={25} className=' text-dark-blue' />
            </div>
        )
    }
 
    useEffect(() => {
        getWithoutAuth("all-goals", (success) => {
            if (success.data.code === 200) {
                let newgoals = success.data.message.map((goal) => { return { ...goal, checked: false } })
                dispatch(updateCradInputs({ allgoals: newgoals }))
            } else {
                dispatch(updateCradInputs({ allgoals: [] }))
            }
        }, (error) => {
            console.log(error)
        })
    }, []);
 
    // useEffect(() => {
    //     const newgoal = selectedGoals[index]
    //     setgoal(newgoal)
    // }, [index]);
 
    const updateInput = (e) => {
        if (e.target.name == "purchase_year") {
            if (/^\d{0,4}$/.test(e.target.value)) {
                setgoal((pre) => ({ ...pre, [e.target.name]: e.target.value }));
            }
        } else {
            setgoal((pre) => ({ ...pre, [e.target.name]: e.target.value }));
        }
    }
 
    const addGoal = () => {
        let previous_goals = [...addedGoals, goal];
        setAddedgoals(previous_goals);
        setgoal({});
        // setmainindex
        setindex(index + 1);
    }
 
    const goBack = () => {
        if (index == 0) {
            setCardSection(1)
        } else if ("course_duration" in addedGoals[index - 1]) {
            setmainindex(educationIndex)
            let currentgoal = addedGoals[index - 1];
            setgoal(currentgoal);
            setindex(index - 1)
        } else {
            setmainindex(mainindex - 1);
            let currentgoal = addedGoals[index - 1];
            setgoal(currentgoal);
            setindex(index - 1)
        }
    }
 
 
 
    const goNext = () => {
        if (mainindex == selectedGoals.length) {
            setCardSection(3)
        } else if ("course_duration" in addedGoals[index + 1]) {
            setmainindex(educationIndex)
            let currentgoal = addedGoals[index + 1];
            setgoal(currentgoal);
            setindex(index + 1)
        } else {
            setmainindex(mainindex + 1);
            let currentgoal = addedGoals[index + 1];
            setgoal(currentgoal);
            setindex(index + 1)
        }
    }
 
    const CurrencyFinder=()=>{
        if(allmodels?.preferred_currency){
          const selectedCurrency = CurrencyData?.find(currency => currency.currencyIndex == allmodels?.preferred_currency).symbol
          return selectedCurrency;
        }else{
          return '₹';
        }
      }
 
    console.log(addedGoals, "Addedgoals")
    console.log(selectedGoals);
    console.log(goal)
   
    return (
        <div className='card card-5  '>
            <QuestionCard number='5' label="What do you want your money to do for you?"
                subtitle={cardSection === 3 ? 'Review Summary of Goals' : 'Enter Goal Details'}
            />
 
            <div className="card-body pt-[50px] pb-[70px] flex flex-col gap-8  justify-between">
 
                {/* card first section */}
                {cardSection === 1 &&
                    <>
                        <div className='max-w-[440px] '>
                            <div className=" flex gap-2 md:flex-wrap ">
                                {allgoals && allgoals?.map((goal, i) => (
                                    <CheckCard key={i}
                                        label={goal.goal_name}
                                        checked={goal.checked}
                                        id={goal.id}
                                        onchange={(e) => { handleCheckboxChange(goal.id) }}
                                    />
                                ))}
                            </div>
 
                        </div>
                        <Card_footer className='mx-auto max-w-[280px] md:max-w-[350px] mb-7 ' title='Enter Details'
                            BackonClick={() => { handleNextClick(3) }}
                            NextonClick={() => { setCardSection(2) }}
                        />
                    </>
                }
 
                {/* other form  section */}
                {cardSection === 2 && selectedGoals[mainindex]?.is_education == false ?
                    <>
                        {/* <div className='w-full max-w-[400px] mx-auto'>
                            <div className="px-4  pt-4 pb-12 rounded-[30px] bg-card-gradiant"
                                style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' }}
                            >
                                <div className="flex flex-col gap-5 ">
                                    <div className=" w-full flex justify-center items-end gap-5">
                                        <div className="w-9 h-10 relative bg-red-600"></div>
                                        <p className="text-center text-accent-bright-green text-2xl font-bold  leading-[28.80px] tracking-[-0.48px]">Vehicle 1/1</p>
                                    </div>
 
                                    <div className="pl-1 flex flex-col gap-6">
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label invisible">₹</p>
                                            <div className=" flex-1">
                                                <p className="card-label">Name the Goal</p>
                                                <Card_input type='text' className='py-3 px-4' placeholder='eg- SUV ' onChange={(e) => { }} />
                                            </div>
                                        </div>
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label invisible ">₹</p>
                                            <div className=" flex-1">
                                                <p className="card-label">Year of Purchase</p>
                                                <Card_input className='py-3 px-4' placeholder='YYYY' onChange={(e) => { }} />
                                            </div>
                                        </div>
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label pb-1">₹</p>
                                            <div className=" flex-1">
                                                <p className="card-label">Cost per Year (Today’s cost)</p>
                                                <Card_input className='py-3 px-4' placeholder='12345678' onChange={(e) => { }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className='w-full max-w-[400px] mx-auto'>
                            <div className="px-4  pt-4 pb-12 rounded-[30px] bg-card-gradiant"
                                style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' }}
                            >
                                <div className="flex flex-col gap-5 ">
                                    <div className=" w-full flex justify-center items-end gap-5">
                                        <div className="w-9 h-10 relative bg-red-600"></div>
                                        <p className="text-center text-accent-bright-green text-2xl font-bold  leading-[28.80px] tracking-[-0.48px]">Vehicle 1/1</p>
                                    </div>
 
                                    <div className="pl-1 flex flex-col gap-6">
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label invisible"><CurrencyFinder/></p>
                                            <div className=" flex-1">
                                                <p className="card-label">Name the Goal</p>
                                                <Card_input type='text' className='py-3 px-4' placeholder='eg- SUV ' name={"user_goal_name"} onChange={updateInput} value={goal?.user_goal_name ? goal?.user_goal_name : ""} />
                                            </div>
                                        </div>
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label invisible "><CurrencyFinder/></p>
                                            <div className=" flex-1">
                                                <p className="card-label">Year of Purchase</p>
                                                <Card_input className='py-3 px-4' placeholder='YYYY' name={"purchase_year"} onChange={updateInput} value={goal?.purchase_year ? goal?.purchase_year : ""} />
                                            </div>
                                        </div>
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label pb-1"><CurrencyFinder/></p>
                                            <div className=" flex-1">
                                                <p className="card-label">Cost per Year (Today’s cost)</p>
                                                <Card_input className='py-3 px-4' placeholder='12345678' name={"cost_per_year"} onChange={updateInput} value={goal?.cost_per_year ? goal?.cost_per_year : ""} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
 
                        <div className="w-full max-w-[400px] mx-auto flex gap-8 items-center justify-between">
                            <Small_round_btn onClick={goBack} />
                            <Add_btn className='flex-1' label={selectedGoals[mainindex].goal_name}
                                onClick={addGoal}
                            />
                            <Green_btn onClick={goNext} />
                        </div >
                    </>
                    : null}
 
 
                {/*  graduation form section */}
                {cardSection === 2 && selectedGoals[mainindex]?.is_education == true ?
                    <>
                        <div className='w-full max-w-[400px] mx-auto'>
                            <div className="px-4  pt-4 pb-12 rounded-[30px] bg-card-gradiant"
                                style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' }}
                            >
                                <div className="flex flex-col gap-5 ">
                                    <div className=" w-full flex justify-center items-end gap-5">
                                        <div className="w-9 h-10 relative bg-red-600"></div>
                                        <p className="text-center text-accent-bright-green text-2xl font-bold  leading-[28.80px] tracking-[-0.48px]">Education  1/2</p>
                                    </div>
 
                                    <div className="pl-1 flex flex-col gap-6">
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label invisible"><CurrencyFinder/></p>
                                            <div className=" flex-1">
                                                <p className="card-label">Name the Goal</p>
                                                <Card_input type='text' className='py-3 px-4' placeholder='education' name={"user_goal_name"} onChange={updateInput} value={goal?.user_goal_name ? goal?.user_goal_name : ""} />
                                            </div>
                                        </div>
 
                                        <div className=" flex gap-4 items-end pl-5 justify-between">
                                            <div className="max-w-[150px]">
                                                <div className=" flex-1">
                                                    <p className="card-label">Start Year</p>
                                                    <Card_input className='py-3 px-4' name={"purchase_year"} placeholder='YYYY' onChange={updateInput} value={goal?.purchase_year ? goal?.purchase_year : ""} />
                                                </div>
                                            </div>
                                            <div className="max-w-[150px]">
                                                <div className=" flex-1">
                                                    <p className="card-label">Course <br />Duration</p>
                                                    <span className="text-grey-2 text-xs">(Number of Years)</span>
                                                    <Card_input className='py-3 px-4' placeholder='' name={"course_duration"} onChange={updateInput} value={goal?.course_duration ? goal?.course_duration : ""} />
                                                </div>
                                            </div>
                                        </div>
 
                                        <div className=" flex gap-2 items-end">
                                            <p className="card-label pb-1"><CurrencyFinder/></p>
                                            <div className=" flex-1">
                                                <p className="card-label">Cost per Year (Today’s cost)</p>
                                                <Card_input className='py-3 px-4' name={"cost_per_year"} placeholder='12345678' onChange={updateInput} value={goal?.cost_per_year ? goal?.cost_per_year : ""} />
                                            </div>
                                        </div>
 
                                    </div>
                                </div>
                            </div>
                        </div>
 
                        <div className="w-full max-w-[400px] mx-auto flex gap-8 items-center justify-between">
                            {/* <Small_round_btn onClick={() => setCardSection(1)} /> */}
                            <Small_round_btn onClick={goBack} />
                            <Add_btn className='flex-1' label={selectedGoals[mainindex].goal_name}
                                onClick={addGoal}
                            />
                            {/* <Green_btn onClick={() => setCardSection(3)} /> */}
                            <Green_btn onClick={goNext} />
                        </div >
                    </>
                    : null
                }
 
 
 
 
 
                {/* card third section */}
                {cardSection === 3 &&
                    <>
                        <div className='w-full max-w-[400px]  mx-auto'>
                            <div className="p-4 pr-1 rounded-[30px] bg-card-gradiant"
                                style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.50) inset' }}
                            >
                                <div className="flex flex-col gap-2 h-[340px] overflow-y-scroll pe-1 ">
                                {goalsList?.map((goal, i) =>
                                    (
                                        <Edit_goals key={goal.user_goal_name + i}
                                            EditOnClick={() => setCurrentgoal(i)}
                                            obj={goal}
                                            name={goal.user_goal_name}
                                            disabled={!(currentgoal === i)}
                                            // edit={editGoal}
                                        />
                                    )
                                    )}
                                </div>
                            </div>
 
                            <div className=" w-fit min-w-[175px] mx-auto mt-5">
                                <Add_btn className='w-full' label='Add New Goal' onClick={() => {
                                    setCardSection(2)
                                }} />
                            </div>
 
                        </div>
 
                        <Card_footer className='w-full max-w-[280px] md:max-w-[350px] mx-auto' title='Next'
                            BackonClick={() => { setCardSection(2) }}
                            NextonClick={() => { handleNextClick(5) }}
                        />
                    </>
                }
            </div>
 
 
        </div>
    )
}
 
export default Fifth_card