import { useEffect, useRef, useState } from "react"
import First_card from "../quize-card/cards/First_card"
import Second_card from "../quize-card/cards/Second_card"
import Third_Card from "../quize-card/cards/Third_Card"
import { mobile_carousal_mountain } from "../../assets/Icons"
import "./card_carousal_mobile.css"
import FirstCardMobile from "./quiz-cards/FirstCardMobile"
import Fourth_card from "../quize-card/cards/Fourth_card";
import Fifth_card_updated from "../quize-card/cards/Fifth_card_updated";
import Sixth_card from "../quize-card/cards/Sixth_card";
import { getData } from "../../pages/destop_L1/server"
import { ToastContainer, toast } from 'react-toastify';
import DeleteConfirmation from "../notifierModal/DeleteConfirmation";
import { activeIndexNumber, updateCradInputs } from "../../redux/slices/Card_Inputs"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { Flag_mountain, mountain } from "../../assets/images";
import Card_footer_greenbtn from "../quize-card/Card_footer_greenbtn";
import Plus_Green_btn from "../quize-card/Plus_Green_btn";
import { BACKENDURL, IMAGEBACKENDURL } from "../../Variable"

const PositionArray = [
    { id: 0, transform: 'translate3d(0%, 0%, 17px)', width: "100%", zIndex: '6', opacity: 0.2, checked: false },
    { id: 1, transform: 'translate3d(0%, -2%, 100px)', width: "93%", zIndex: '5', opacity: 0.5, checked: false },
    { id: 2, transform: 'translate3d(0%, -3.5%, 100px)', width: "87%", zIndex: '4', opacity: 0.6, checked: false },
    { id: 3, transform: 'translate3d(0%, -5%, 100px)', width: "80%", zIndex: '3', opacity: 0.7, checked: false },
    { id: 4, transform: 'translate3d(0%, -6.4%, 100px)', width: "75%", zIndex: '2', opacity: 0.73, checked: false },
    { id: 5, transform: 'translate3d(0%, -7.7%, 17px)', width: "69%", zIndex: '1', opacity: 0.75, checked: false },
]
const flagOpacity = [

    { opacity: 0.3 },
    { opacity: 0.7 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
    { opacity: 1 },
]
const Card_carousel_Mobile = () => {
    const dispatch = useDispatch()
    const mobinputRefs = useRef([]);
    const [activeCard, setActivecard] = useState(0);
    const [toastType, setToastType] = useState(null);
    const allmodels = useSelector((state) => state.Card_inputs)
    const deleteConfirmation = useSelector((state) => state?.Card_inputs?.deleteConfirmation);
    const confirmationText = "Are you sure you want to delete"
    // let SliderCard = ({ style, className, id, children }) => {
    //     return (
    //         <label htmlFor={id}
    //             onClick={() => setactiveCard(+id.split("s")[1])}
    //             className={`${className} mobile-carusal-card block w-full h-full mx-auto rounded-tr-[20px] rounded-tl-[20px] absolute left-0 right-0 overflow-hidden mob-swiper`}
    //             // pb-[94px]
    //             style={style}>
    //             {children}
    //         </label>
    //     )
    // }
    const handleNextClick = (index) => {
        dispatch(activeIndexNumber(index))
        // mobinputRefs.current[index].checked = true;
        setActivecard(index)
    };


    const handleAlertClick = (alert, type, position = 'top-right', width , inner_position = null) => {
        setToastType(type)
        if (type === 'error') {
            toast.error(alert)
        } else if (type === 'success') {
            toast.success(alert)
        } else if (type == 'message') {
            toast(alert, { position: position, style: { background: 'transparent' }, hideProgressBar: true })
        } else if (type == 'custom') {
            toast(alert, { position: position, style: { background: 'transparent', width: width, right: inner_position }, hideProgressBar: true })
        }
        else {
            toast.warn(alert)
        }
    }
    const cancelHandler = () => {
        dispatch(updateCradInputs({ deleteConfirmation: false }))
    }

    const deleteHandler = () => {
        dispatch(updateCradInputs({ isDelete: true, deleteConfirmation: false }))
    }

    //---------------naviagate goal through button---------------//

    const goalNavigator = (goal, index) => {
        const filterData = allmodels?.user_selected_goals?.filter(list => list.goal_id == goal.id)
        const hasUserData = filterData.length > 0 ? filterData[0]?.user_data : []

        const updatedGoal = {
            index: index,
            goal_id: goal.id,
            goal_name: goal.goal_name,
            is_education: goal.is_education,
            user_data: []
        }
        dispatch(updateCradInputs({ goalNavigation: updatedGoal, isNewGoalSelected: true, isNewGoalListOpen: false }))
    }



    const GoalMenuList = () => {

        return activeCard == 4 && (
            <div>
                <div className="absolute z-40 w-full h-full rounded-2xl shadow-highlight-card bg-slate-800 bg-opacity-80 ring-slate-200 ring-inset">
                    <div className={`flex flex-col gap-1 justify-center items-start absolute  goal-List `}>
                        {allmodels?.allgoals.length > 0 && allmodels?.allgoals.map((list, index) => (
                            <button key={list.id} className=' text-slate-200 bg-gray-700 hover:bg-slate-800 hover:text-slate-300 ps-2 py-2 text-left text-md rounded-3xl w-[200px] flex gap-2' onClick={() => goalNavigator(list, index)}>
                                <span ><img src={`${IMAGEBACKENDURL}${list?.white_icon}`} alt="" width={20} height={20} /></span>
                                {list?.goal_name}
                            </button>
                        ))}
                        <br />
                    </div>

                    <div className="flex gap-1 justify-center absolute green-Plus  md:right-80 bg-emerald-300 rounded-2xl ">
                        <Plus_Green_btn label='Add New Goal' labelclassName="text-slate-800" iconClassName="text-slate-800" onClick={(e) => {
                            e.preventDefault();
                            dispatch(updateCradInputs({ isNewGoalSelected: false, isNewGoalListOpen: false }))
                        }} />
                    </div>
                </div>

                <div className="flex gap-1 justify-center absolute bottom-36 right-44 bg-emerald-300 rounded-2xl ">
                    <Plus_Green_btn label='Add New Goal' labelclassName="text-slate-800" iconClassName="text-slate-800" onClick={() => {
                        setGoalList(false)
                    }} />
                </div>
            </div>
        )
    }

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

    const cardComponents = [
        <First_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Second_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Third_Card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Fourth_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Fifth_card_updated handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
        <Sixth_card handleNextClick={handleNextClick} handleAlertClick={handleAlertClick} />,
    ];

    return (
        <div className="h-[calc(100vh-40px)] overflow-hidden">
            <div className=" flex items-end justify-center h-full w-full">
                <div className="relative w-full h-[78vh] max-w-md ">
                    <div className="flex justify-center  w-full absolute right-[-23px] top-[-114px] ">
                        <img
                            src={Flag_mountain}
                            alt=""
                            className="opacity-[0.1] transition-opacity duration-500   "
                            style={{ opacity: flagOpacity[activeCard].opacity }}
                        />
                    </div>

                    <div className="flex justify-center  w-full absolute right-2 top-[-65px] ">
                        <img
                            src={mountain}
                            alt=""
                            className="opacity-[0.1] transition-opacity duration-500  "
                            style={{ opacity: PositionArray[activeCard].opacity, zIndex: PositionArray[activeCard].zIndex }}
                        />
                    </div>

                    {PositionArray.map((cardPosition, i) => {   
                        return (
                            <input
                                key={cardPosition.id}
                                className="hidden"
                                type="radio"
                                name="slider"
                                id={`mobileslide${i + 1}`}
                                defaultChecked={i === activeCard}
                                checked={i == activeCard}
                            // ref={(input) => (mobinputRefs.current[i] = input)}
                            />
                        )
                    })}

                    {PositionArray.map((cardPosition, i) => (
                        <label
                            key={cardPosition.id}
                            htmlFor={`mobileslide${i + 1}`}
                            className={`mobileslide${i + 1} mobile-carusal-card block w-full h-full mx-auto rounded-tr-[20px] rounded-tl-[20px] absolute left-0 right-0 overflow-hidden mob-swiper `}
                            style={cardPosition}
                            // onClick={() => setActivecard(i)}
                        >
                            {cardComponents[i]}
                        </label>
                    ))}
                    {allmodels?.isNewGoalListOpen && <GoalMenuList />}
                </div>
            </div>
            {deleteConfirmation && <DeleteConfirmation text={confirmationText} open={deleteConfirmation} toggleModal={cancelHandler} handlerCancel={cancelHandler} actionHandler={deleteHandler} property_name={allmodels?.triggerFromGoal ? allmodels?.goal_name : allmodels?.loan_name} />}

            <ToastContainer hideProgressBar toastStyle={{ background: "#BCFBE4", color: "#0F3A4D", fontFamily: "Montserrat" }} />
        </div>
    )
}

export default Card_carousel_Mobile