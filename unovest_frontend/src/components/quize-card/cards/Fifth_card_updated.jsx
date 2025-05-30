import { useEffect, useState } from "react";
import QuestionCard from "../../QuestionCard";
import SelectGoals from "../SelectGoals";
import Goals_list from "../Goals_list";
import Fifth_section2 from "./Fifth_section2";
import YourComponent from "./YourComponent";
// import Eduaction_form from "./Eduaction_form";
// import Other_goal_form from "./Other_goal_form";
// import YourComponent from "./YourComponent";

const Fifth_card_updated = ({ handleNextClick,handleAlertClick }) => {
    const [cardSection, setCardSection] = useState(1);
    const [handleTitle, setHandleTitle] =useState({
        review: false,
        isAddNewGoal: false,
        isGoalEditingUpdated: false
    });
  

    return (
        <div className='card card-5  '>
            <QuestionCard number='5' label="What do you want your money to do for you?"
                subtitle={handleTitle?.isAddNewGoal? 'Enter Goal Details':handleTitle?.isGoalEditingUpdated? 'Edit Goal Details': handleTitle?.review ? 'Review Summary of Goals' : 'Select as many as you want'}
            />

            {/* <YourComponent selectedGoals={selectedGoals} /> */}

            <div className="card-body cards-scroll hide-scrollbar fifth-card-py">

                {/* card first section */}
                {cardSection === 1 &&
                    <SelectGoals handleNextClick={handleNextClick}
                        setCardSection={setCardSection}
                        handleAlertClick={handleAlertClick}
                        setHandleTitle={setHandleTitle}
                    />
                }


                {cardSection === 2 ?
                    <Fifth_section2
                        setCardSection={setCardSection}
                        handleNextClick={handleNextClick}
                        handleAlertClick={handleAlertClick}
                        setHandleTitle={setHandleTitle}
                    />    
                    : null
                }

                {/* card third section */}
                {cardSection === 3 &&
                    <Goals_list
                        goalsInfo={goalsInfo}
                        handleNextClick={handleNextClick}
                        setCardSection={setCardSection}
                        handleAlertClick={handleAlertClick}
                    // setBackword_flow={setBackword_flow}
                    />
                }
            </div>


        </div>
    )
}

export default Fifth_card_updated
