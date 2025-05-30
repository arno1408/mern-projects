import React, { useEffect, useState } from 'react'
import Card_footer from './Card_footer'
import CheckCard from './CheckCard'
import { updateCradInputs } from '../../redux/slices/Card_Inputs';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getWithoutAuth } from '../../pages/destop_L1/server';

const SelectGoals = ({ handleNextClick,handleAlertClick, setCardSection, setHandleTitle }) => {
    const dispatch = useDispatch()
    const allgoals = useSelector(state => state?.Card_inputs.allgoals);
    let user_selected_goals = useSelector(state => state?.Card_inputs.user_selected_goals);

    let GetallGoals_with_selectedGoals = async () => {
        // this func get all goals list and goals added previously then we making checked: true if user select the the goals previously 
        let arr1 = allgoals
        let arr2 = []

        if (allgoals == undefined) {
            await getWithoutAuth("all-goals", (success) => {
                if (success.data.code === 200) {
                    let newgoals = success.data.message.map((goal) => { return { ...goal, checked: false } })
                    arr1 = newgoals
                }
            })
        }

        await getData("user-goal", (success) => {
            if (success?.data?.code === 200) {
                arr2 = success.data.message
                dispatch(updateCradInputs({ user_selected_goals: success.data.message }));
            }
        })


        const updatedArr2 = arr1.map((goal1) => {
            const matchingGoalIndex = arr2.findIndex((goal2) => goal2.goal_id === goal1.id);
            if (matchingGoalIndex !== -1) {
                const { user_data, ...goalWithoutUserData } = goal1;
                return { ...goalWithoutUserData, checked: true };
            } else {
                return { ...goal1, checked: false };
            }
        });

        dispatch(updateCradInputs({ allgoals: updatedArr2 }))

    }


    useEffect(() => {
        GetallGoals_with_selectedGoals()
    }, []);

    const handleCheckboxChange = (selected_checkbox) => {
        const updatedCheckboxes = allgoals.map((checkbox) => {
            return checkbox.id === selected_checkbox.id ? { ...checkbox, checked: !checkbox.checked } : checkbox;
        });

        let anu = updatedCheckboxes.map((onecheck) => {
            if (onecheck.checked) {
                // Check if the goal_name is already present in user_selected_goals
                const existingGoalIndex = user_selected_goals.findIndex(
                    (goal) => goal.goal_name === onecheck.goal_name
                );

                // Only add the goal if it doesn't already exist
                if (existingGoalIndex !== -1) {
                    return user_selected_goals[existingGoalIndex];
                } else {
                    return {
                        goal_id: onecheck.id,
                        is_education: onecheck.is_education,
                        goal_name: onecheck.goal_name,
                        user_data: [],
                    };
                }
            }

            return null;
        });

        // Remove null values from the array
        anu = anu.filter((item) => item !== null);

        dispatch(updateCradInputs({ user_selected_goals: anu }));
        dispatch(updateCradInputs({ allgoals: updatedCheckboxes }));
    };

    return (
        <>
            <div className='select-goal-div small-max-w'>
                <div className=" flex gap-2  flex-wrap">
                    {allgoals?.map((checkbox) => (
                        <CheckCard key={checkbox.goal_name}
                            label={checkbox.goal_name}
                            checked={checkbox.checked}
                            id={checkbox.id}
                            icons={{selected:checkbox?.black_icon,unselected:checkbox?.white_icon}}
                            onchange={(e) => { handleCheckboxChange(checkbox) }}
                        />
                    ))}
                </div>

            </div>
            <Card_footer className='card-footer-w mb-7' title='Enter Details'
                BackonClick={() => { handleNextClick(3) }}
                NextonClick={() => {
                    if (user_selected_goals?.length > 0) {
                        setCardSection(2)
                        // setIsAddNewGoal(true)
                        setHandleTitle({isAddNewGoal:true,review:false,isGoalEditingUpdated: false })
                    } else {

                        handleAlertClick("Please select at least one goal")
                    }
                }}
            />
        </>
    )
}

export default SelectGoals
