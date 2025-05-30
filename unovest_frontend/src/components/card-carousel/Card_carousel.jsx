import { useEffect, useRef, useState } from "react"
import Fifth_card from "../quize-card/cards/Fifth_card"
import First_card from "../quize-card/cards/First_card"
import Fourth_card from "../quize-card/cards/Fourth_card"
import Second_card from "../quize-card/cards/Second_card"
import Sixth_card from "../quize-card/cards/Sixth_card"
import Third_Card from "../quize-card/cards/Third_Card"
import "./Card_carousel.css"
import { Flag, Flag3x, white_Flag, Flag_0, Flag_1, Flag_2, Flag_3, Flag_4, Flag_5, Flag_6 } from "../../assets/images";
import Fifth_card_updated from "../quize-card/cards/Fifth_card_updated"
import { getData } from "../../pages/destop_L1/server"
import { useDispatch, useSelector } from 'react-redux'
import { activeIndexNumber, updateCradInputs } from "../../redux/slices/Card_Inputs"
import { ToastContainer, toast } from 'react-toastify';
import Add_btn from "../Add_btn"
import DeleteConfirmation from "../notifierModal/DeleteConfirmation"
import 'react-toastify/dist/ReactToastify.css';
import { IMAGEBACKENDURL } from "../../Variable"

let PositionArray = [
    {
        id: 1,
        transform: 'translate3d(0%, -8%, 17px) scale(1)',
        boxShadow: "1px 1px 20px white",
        // height: "100%", 
        zIndex: '6',
        filter: 'none',
        flaggerPosition: {
            id: 1,
            width: '4rem',
            zIndex: '-1',
            top: '-3rem'
        }
    },
    {
        id: 2,
        transform: 'translate3d(14%, -0.7%, -100px) scale(0.94)',
        //  height: "94%", 
        boxShadow: "1px 1px 20px white",
        zIndex: '5',
        filter: 'none',
        flaggerPosition: {
            id: 2,
            width: '4.5rem',
            zIndex: '-1',
            top: '-3.2rem'
        }
    },
    {
        id: 3,
        transform: 'translate3d(25%, -0.4%, -100px) scale(0.88)',
        // height: "88%", 
        boxShadow: "1px 1px 20px white",
        zIndex: '4',
        filter: 'none',
        flaggerPosition: {
            id: 3,
            width: '5rem',
            zIndex: '-1',
            top: '-3.8rem'
        }
    },
    {
        id: 4,
        transform: 'translate3d(35%, -0.1%, -100px) scale(0.82)',
        // height: "82%", 
        boxShadow: "1px 1px 20px white",
        zIndex: '3',
        filter: 'none',
        flaggerPosition: {
            id: 4,
            width: '6rem',
            zIndex: '-1',
            top: '-4.3rem'
        }
    },
    {
        id: 5,
        transform: 'translate3d(43%, -0.25%, -100px) scale(0.75)',
        // height: "75%", 
        boxShadow: "1px 1px 20px white",
        zIndex: '2',
        filter: 'none',
        flaggerPosition: {
            id: 5,
            width: '6.5rem',
            zIndex: '-1',
            top: '-4.5rem',
            scale: '75'
        }
    },
    {
        id: 6,
        transform: 'translate3d(49%, 0.55%, 17px) scale(0.69)',
        // height: "69%", 
        boxShadow: "1px 1px 20px white",
        zIndex: '1',
        filter: 'none',
        flaggerPosition: {
            id: 6,
            width: '7.5rem',
            zIndex: '-1',
            top: '-5rem',
            scale: '75'
        }
    },
]


const Card_carousel = ({ }) => {
    const dispatch = useDispatch()
    const inputRefs = useRef([]);
    const [activecard, setActivecard] = useState(0);
    const [toastType, setToastType] = useState(null);
    const deleteConfirmation = useSelector((state) => state?.Card_inputs?.deleteConfirmation);
    const allmodels = useSelector((state) => state.Card_inputs)
    const confirmationText = "Are you sure you want to delete"

    let SliderCard = ({ style, className, id, children }) => {
        return (
            <label
                for={id}
                id={`slide${id}`}
                className={`block absolute left-0 right-0 carusal-card mx-auto rounded-[20px] ${className}`} style={style}>
                {children}
            </label>
        )
    }

    const handleAlertClick=(alert,type, position='bottom-right',width=null,inner_position=null )=>{
        setToastType(type)
        if (type === 'error') {
            toast.error(alert)
        } else if (type === 'success') {
            toast.success(alert)
        } else if(type == 'message'){
            toast(alert, {position:position,style:{background:'transparent'},hideProgressBar:true})
        }else if(type == 'custom'){
            toast(alert, {position:position,style:{background:'transparent',width:width,right:inner_position},hideProgressBar:true})
        }
        else {
            toast.warn(alert)
        }
    }

    const handleNextClick = (index, alert = "") => {

        dispatch(activeIndexNumber(index))
        setActivecard(index)
        inputRefs.current[index].checked = true;
    };

    const getallSavedData = () => {
        getData("user-data-after-signin", (success) => {
            dispatch(updateCradInputs(success.data.message))
        }, (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("userdetails")).user_data;
        if (userdata?.login_form_number == null) {
            handleNextClick(0)
        } else {
            handleNextClick(userdata?.login_form_number - 1)
        }
        getallSavedData();
    }, [])

    const Flagger = ({ cardPostion, index }) => {
        return (
            <div key={cardPostion.id} style={{ zIndex: cardPostion.zIndex, width: cardPostion.width, top: cardPostion.top }} className={`back-${index} flagger-container absolute ${activecard == index ? 'active' : 'hidden'} top-[${cardPostion.top}] left-1/2 aspect-square -translate-x-12`}>
                <img src={Flag_6}
                    alt="" />
            </div>
        )
    }

    const cancelHandler = () => {
        dispatch(updateCradInputs({ deleteConfirmation: false }))
    }

    const deleteHandler=()=>{
        dispatch(updateCradInputs({isDelete: true, deleteConfirmation: false}))
    }

       //---------------naviagate goal through button---------------//
       const goalNavigator=(goal,index)=>{
        const filterData = allmodels?.user_selected_goals?.filter(list => list.goal_id == goal.id)
        const hasUserData = filterData.length > 0? filterData[0]?.user_data : []

            const updatedGoal = {
                index: index, 
                goal_id: goal.id,
                goal_name: goal.goal_name,
                is_education: goal.is_education,
                user_data: []
            }
         
            dispatch(updateCradInputs({goalNavigation: updatedGoal, isNewGoalSelected: true, isNewGoalListOpen: false}))
       }

       const GoalMenuList=()=>{
            return activecard == 4 && (
                <div>
                    <div className="absolute z-40 w-full h-full rounded-2xl shadow-highlight-card bg-slate-800 bg-opacity-80 ring-slate-200 ring-inset">
                        <div className={`goal-list-hover`}>
                            {allmodels?.allgoals.length > 0 && allmodels?.allgoals.map((list, index) => (
                                <button key={list.id} className=' text-slate-200 bg-gray-700 hover:bg-slate-800 hover:text-slate-300 ps-2 py-2 text-left 2xl:text-base lg:text-sm rounded-3xl w-[200px] flex gap-2' onClick={() => goalNavigator(list, index)}>
                                    <span ><img src={`${IMAGEBACKENDURL}${list?.white_icon}`} alt="" width={20} height={20} /></span>
                                    {list?.goal_name}
                                </button>
                            ))}
                            <br />
                        </div>

                        <div className="add-btn-hover ">
                            <Add_btn label='Add New Goal' labelclassName="text-slate-800" iconClassName="text-slate-800" onClick={(e) => {
                                e.preventDefault();
                                dispatch(updateCradInputs({ isNewGoalSelected: false, isNewGoalListOpen: false }))
                            }} />
                        </div>
                    </div>

                    <div className="flex gap-1 justify-center absolute bottom-36 right-44 bg-emerald-300 rounded-2xl ">
                        <Add_btn label='Add New Goal' labelclassName="text-slate-800" iconClassName="text-slate-800" onClick={() => {
                            setGoalList(false)
                        }} />
                    </div>
                </div>
        )
    }

    const cardComponents = [
        <First_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Second_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Third_Card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Fourth_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Fifth_card_updated handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Sixth_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
    ];

    return (
        <div className={`card-carousal-div`}>
            {/* card parent caontainer */}
            <div className={`cards-main-container card-carousal-subdiv`}>
                {PositionArray?.map((cardPostion, i) => (
                    <input
                        key={cardPostion.id}
                        className="hidden"
                        type="radio"
                        name="slider"
                        id={`s${i + 1}`}
                        defaultChecked={i === 0}
                        // onChange={(e) => {setActivecard(i); e.preventDefault();} }
                        ref={(input) => (inputRefs.current[i] = input)}
                    />
                ))}

                {PositionArray?.map((cardPostion, i) => (
                    <>

                        <label
                            key={cardPostion.id}
                            id={`s${i + 1}`} className={`block absolute left-0 right-0 carusal-card mx-auto rounded-[20px] ${i === activecard ? `activer` : `nonActive`} s${i + 1}`}
                            style={cardPostion}
                        >
                            <Flagger cardPostion={cardPostion.flaggerPosition} index={i} />

                            {cardComponents[i]}
                        </label>
                    </>
                ))}
                  {allmodels?.isNewGoalListOpen && <GoalMenuList/>} 
            </div>
            {deleteConfirmation && <DeleteConfirmation text={confirmationText} open={deleteConfirmation} toggleModal={cancelHandler} handlerCancel={cancelHandler} actionHandler={deleteHandler} property_name={allmodels?.triggerFromGoal ? allmodels?.goal_name : allmodels?.loan_name}/>}
            <ToastContainer hideProgressBar toastStyle={{background:"#BCFBE4", color:"#0F3A4D", fontFamily:"Montserrat"}}/>

        </div>
    )
}

export default Card_carousel