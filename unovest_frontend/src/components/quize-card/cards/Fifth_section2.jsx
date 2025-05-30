import React, { useEffect, useState } from "react";
import Eduaction_form from "./Eduaction_form";
import Other_goal_form from "./Other_goal_form";
import { useDispatch, useSelector } from "react-redux";
import Card_footer from "../Card_footer";
import {
  delete_icon,
  diamond,
  gray_delete,
  gray_edit,
  pensil,
} from "../../../assets/Icons";
import { updateCradInputs } from "../../../redux/slices/Card_Inputs";
import {
  deleteData,
  getData,
  saveDetails,
  updateDetails,
} from "../../../pages/destop_L1/server";
import Add_btn from "../../Add_btn";
import { CurrencyData } from "../../../constants";
import { toast } from "react-toastify";
import Card_footer_greenbtn from "../Card_footer_greenbtn";
import Tooltip from "../../tooltip/Tooltip";

let ListCrad = ({ goal_name, deleteonClick, editonClick }) => {
  const toolTipData = [
    {
      id: 1,
      tooltipId: "edit_loan",
      message: "Edit Loan",
    },
    {
      id: 2,
      tooltipId: "delete_loan",
      message: "Delete Loan",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between rounded-[15px]  lg:rounded-[20px] 2xl:py-4 lg:py-3 pl-7 pr-4 py-3 gap-3 bg-transparent border-[1px] border-blue-grey lg:border-none  lg:bg-grey-2 lg:bg-opacity-20 me-3 lg:me-0">
        <div className=" text-grey-2 text-sm lg:text-lg font-normal lg:font-semibold  flex-1">
          {goal_name}
        </div>
        <span
          data-tooltip-id="edit_loan"
          onClick={editonClick}
          className=" cursor-pointer"
        >
          <img src={pensil} alt="" srcSet="" className="hidden lg:block" />
          <img src={gray_edit} alt="" srcSet="" className="lg:hidden block" />
        </span>
        <span
          data-tooltip-id="delete_loan"
          onClick={deleteonClick}
          className=" cursor-pointer"
        >
          <img src={delete_icon} alt="" srcSet="" className="hidden lg:block" />
          <img src={gray_delete} alt="" srcSet="" className="lg:hidden block" />
        </span>
      </div>
      {toolTipData.map((list) => (
        <Tooltip
          id={list.tooltipId}
          message={list.message}
          backgroundColor={"#232E41"}
          opacity={1}
        />
      ))}
    </>
  );
};

const Fifth_section2 = ({
  setCardSection,
  setHandleTitle,
  handleNextClick,
  handleAlertClick,
}) => {
  const dispatch = useDispatch();
  let user_selected_goals = useSelector(
    (state) => state?.Card_inputs.user_selected_goals
  );
  const [goalList, setGoalList] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState({
    user_goal_name: false,
    cost_per_year: false,
    purchase_year: false,
    course_duration: false,
  });
  const allmodels = useSelector((state) => state.Card_inputs);
  useEffect(() => {
    setData(user_selected_goals);
  }, [user_selected_goals]);

  const [currentData, setCurrentData] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputData, setInputData] = useState({
    user_goal_name: "",
    purchase_year: "",
    cost_per_year: "",
    course_duration: 1,
  });
  const [showSave, setShowSave] = useState(false);
  const [editIndex, setEditIndex] = useState({
    dataIndex: null,
    userIndex: null,
  });
  const [editGoalInfo, setEditGoalInfo] = useState(null);
  const [isGoalEditing, setIsGoalEditing] = useState(false);
  const [goalMenu, setGoalMenu] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const userdetails = JSON.parse(localStorage.getItem("userdetails"));
  const GoalActivity = userdetails?.coinmaster?.filter(
    (list) => list.activity == 6
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window.innerWidth]);

  const handleNext = () => {
    if (
      !error?.user_goal_name &&
      !error?.cost_per_year &&
      !error?.purchase_year
    ) {
      if (parseInt(inputData?.purchase_year) >= new Date().getFullYear()) {
        if (currentIndex < data[currentData].user_data.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else if (currentData < data.length - 1) {
          setCurrentData((prevData) => prevData + 1);
          setCurrentIndex(0);
        } else {
          // alert("No next data available!");
          // setReview(true)
          setHandleTitle({
            isAddNewGoal: false,
            review: true,
            isGoalEditingUpdated: false,
          });
          setGoalList(true);
          setGoalMenu(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentIndex === 0 && currentData === 0) {
      // alert("No previous data available!");
      dispatch(updateCradInputs({ user_selected_goals: data }));
      setCardSection(1);
    } else if (currentIndex === 0 && currentData > 0) {
      setCurrentData((prevData) => prevData - 1);
      setCurrentIndex(data[currentData - 1].user_data.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    // setReview(false)
    setHandleTitle({
      isAddNewGoal: false,
      review: false,
      isGoalEditingUpdated: false,
    });
  };

  //------------------------------Goal Toast for Congratulations------------------------------//
  const ToastCongratulate = () => {
    if (data[currentData].user_data?.length >= 0) {
      switch (currentData) {
        case 0:
          return (
            <div>
              <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
                <img
                  src={diamond}
                  alt=""
                  className=" max-w-[30px] lg:max-w-[38px]"
                />
                <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${GoalActivity[0]?.coins}`}</p>
              </div>
              <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
                <div className="text-slate-700 text-center text-xs lg:text-base ">{`You have your first goal.Way to go! Add more to earn more..`}</div>
              </div>
            </div>
          );
        case 1:
          return (
            <div>
              <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
                <img
                  src={diamond}
                  alt=""
                  className=" max-w-[30px] lg:max-w-[38px]"
                />
                <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${GoalActivity[0]?.coins}`}</p>
              </div>
              <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
                <div className="text-slate-700 text-center text-xs lg:text-base ">
                  {`And you add ${GoalActivity[0]?.coins} more coins! `} <br />
                  {`Keep going!`}
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div>
              <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
                <img
                  src={diamond}
                  alt=""
                  className=" max-w-[30px] lg:max-w-[38px]"
                />
                <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${GoalActivity[0]?.coins}`}</p>
              </div>
              <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
                <div className="text-slate-700 text-center text-xs lg:text-base ">{`You really know what you want. We know it’s not just the coins. :))`}</div>
              </div>
            </div>
          );

        default:
          return (
            <div>
              <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
                <img
                  src={diamond}
                  alt=""
                  className=" max-w-[30px] lg:max-w-[38px]"
                />
                <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${GoalActivity[0]?.coins}`}</p>
              </div>
              <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
                <div className="text-slate-700 text-center text-xs lg:text-base ">
                  {`${GoalActivity[0]?.coins} more coins rolling in!`}
                  <br />
                  {` Keep going!`}
                </div>
              </div>
            </div>
          );
      }
    }
  };
  //------------------------------Goal Toast for Alert------------------------------//
  const ToastFieldAlert = ({ message }) => {
    return (
      <div className="bg-emerald-100 rounded-xl p-3 text-center max-md:text-sm">
        {message ? (
          <div>{message}</div>
        ) : (
          <div className="max-md:text-sm">
            {`The details here will help to get the numbers right`} <br /> OR{" "}
            <br /> {`Go back to remove this goal from selection`}
          </div>
        )}
      </div>
    );
  };

  //--------------------------when new Goal is updated through checked cards--------------------------//
  const handleUpdate = async () => {
    dispatch(updateCradInputs({ isNewGoalSelected: false }));
    setGoalMenu(false);
    let payload = {
      user_goal_name: inputData.user_goal_name,
      purchase_year: +inputData.purchase_year,
      course_duration: +inputData.course_duration,
      cost_per_year: +inputData.cost_per_year,
    };

    if (
      inputData.user_goal_name == "" ||
      inputData.purchase_year == "" ||
      inputData.cost_per_year == ""
    ) {
      let user_goal_name = false;
      let purchase_year = false;
      let cost_per_year = false;
      let course_duration = false;
      if (!inputData.user_goal_name) {
        user_goal_name = true;
      }
      if (!inputData.purchase_year) {
        purchase_year = true;
      }
      if (!inputData.cost_per_year) {
        cost_per_year = true;
      }
      if (data[currentData]?.is_education && !inputData.course_duration) {
        course_duration = true;
      }
      setError({
        ...error,
        user_goal_name: user_goal_name,
        purchase_year: purchase_year,
        cost_per_year: cost_per_year,
        course_duration: course_duration,
      });
      setErrorMessage(true);
    }
    if (
      inputData?.purchase_year > new Date().getFullYear &&
      inputData.user_goal_name != "" &&
      inputData.purchase_year != "" &&
      !inputData.cost_per_year != ""
    ) {
      if (
        !error?.user_goal_name &&
        !error?.cost_per_year &&
        !error?.purchase_year
      ) {
        await updateDetails(inputData.id, "user-goal", payload, (success) => {
          if (success.data.code === 200) {
            setData((prevData) => {
              const updatedData = [...prevData];
              const newData = { ...inputData };

              const user_data = [...updatedData[currentData].user_data];
              user_data[currentIndex] = newData;

              updatedData[currentData] = {
                ...updatedData[currentData],
                user_data,
              };
              return updatedData;
            });
          }
        });
      }
    } else {
      // handleAlertClick(<ToastFieldAlert message={'purchase year should not be less than current year'} />, 'message')
    }
  };

  //--------------------------when new goal is added through checked cards--------------------------//
  const handleAddNew = () => {
    setShowSave(true);
    // setReview(false);
    setHandleTitle({
      isAddNewGoal: false,
      review: false,
      isGoalEditingUpdated: false,
    });
    setInputData({
      user_goal_name: "",
      purchase_year: "",
      cost_per_year: "",
      course_duration: 1,
    });

    // Find the current category index
    const currentCategoryIndex = currentData;
    handleAlertClick(<ToastCongratulate />, "message");
    // Check if the current category exists and is not empty
    if (
      data[currentCategoryIndex] &&
      data[currentCategoryIndex].user_data.length > 0
    ) {
      // Add the new item to the current category's user_data array
      setData((prevData) => {
        const updatedData = [...prevData];
        const newUserData = { ...inputData }; // Assuming inputData contains the details of the new item
        updatedData[currentCategoryIndex].user_data.push(newUserData);
        return updatedData;
      });
    } else {
      // Handle the case where the current category doesn't exist or is empty
      console.error("Current category is empty or does not exist.");
    }
    dispatch(updateCradInputs({ isNewGoalSelected: false }));
  };

  const handleSave = async () => {
    setGoalMenu(false);
    dispatch(updateCradInputs({ isNewGoalSelected: false }));
    const isUserOnZeroIndex = currentIndex === 0;
    if (
      inputData.user_goal_name == "" ||
      inputData.purchase_year == "" ||
      inputData.cost_per_year == ""
    ) {
      // alert("Please fill in all required fields.");
      let user_goal_name = false;
      let purchase_year = false;
      let cost_per_year = false;
      let course_duration = false;

      if (!inputData.user_goal_name) {
        user_goal_name = true;
      }
      if (!inputData.purchase_year) {
        purchase_year = true;
      }
      if (!inputData.cost_per_year) {
        cost_per_year = true;
      }
      if (data[currentData]?.is_education && !inputData.course_duration) {
        course_duration = true;
      }

      if (!goalMenu)
        setError({
          ...error,
          user_goal_name: user_goal_name,
          purchase_year: purchase_year,
          cost_per_year: cost_per_year,
          course_duration: course_duration,
        });
      setErrorMessage(true);
      // Validate the form
      if (isUserOnZeroIndex) {
        // If user is on the 0th index, require all fields

        if (currentData > 0) {
          if (isMobile) {
            handleAlertClick(
              <ToastFieldAlert />,
              "custom",
              "Top-right",
              "320px",
              "160px"
            );
          } else {
            handleAlertClick(
              <ToastFieldAlert />,
              "custom",
              "bottom-right",
              "500px",
              "160px"
            );
          }
        }

        return false;
      }
    }

    // If user is on an index other than 0 and all fields are empty, do nothing
    if (
      !isUserOnZeroIndex &&
      !inputData.user_goal_name &&
      !inputData.purchase_year &&
      !inputData.cost_per_year
    ) {
      return false;
    }

    if (
      inputData.user_goal_name != "" &&
      inputData.cost_per_year != "" &&
      inputData.cost_per_year != "0" &&
      inputData.cost_per_year != 0
    ) {
      if (parseInt(inputData?.purchase_year) >= new Date().getFullYear()) {
        let created_goalID = null;
        let created_date = null;
        let last_updated_date = null;
        let is_active = null;
        let user_auth = null;
        let goal_id = null;

        let payload = {
          user_goal_name: inputData.user_goal_name,
          purchase_year: +inputData.purchase_year,
          course_duration: +inputData.course_duration,
          cost_per_year: +inputData.cost_per_year,
          login_form_number: 5,
        };

        if (
          !error?.user_goal_name &&
          !error?.cost_per_year &&
          !error?.purchase_year
        ) {
          if (editIndex.dataIndex !== null && editIndex.userIndex !== null) {
            created_goalID = inputData.id;
            await updateDetails(
              inputData.id,
              "user-goal",
              payload,
              (success) => {
                if (success.data.code === 200) {
                  handleAlertClick(success.data.status_message, "success");
                  console.log("user-goal-put", success.data.message);
                }
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            payload.goal_id =
              +data[currentData]?.id || +data[currentData]?.goal_id;
            payload.login_form_number = 5;

            await saveDetails(
              "user-goal",
              payload,
              (success) => {
                if (success.data.code == 200) {
                  if (
                    success.data.message.total_active_goals_coin <=
                    GoalActivity[0]?.max_coins
                  ) {
                    if (success.data.message?.coins_added?.is_coin_added) {
                      handleAlertClick(<ToastCongratulate />, "message");
                    }
                  }
                  let responce = success.data.message;
                  created_goalID = responce.id;
                  created_date = responce.created_date;
                  last_updated_date = responce.last_updated_date;
                  is_active = responce.is_active;
                  user_auth = responce.user_auth;
                  goal_id = responce.goal_id;
                }
              },
              (error) => {
                console.log(error);
              }
            );
          }

          setData((prevData) => {
            const updatedData = [...prevData];
            const newData = {
              ...inputData,
              id: created_goalID,
              created_date,
              last_updated_date,
              is_active,
              user_auth,
              goal_id,
            };

            if (editIndex.dataIndex !== null && editIndex.userIndex !== null) {
              // Update existing user data
              updatedData[editIndex.dataIndex] = {
                ...updatedData[editIndex.dataIndex],
                user_data: updatedData[editIndex.dataIndex].user_data.map(
                  (userData, index) => {
                    if (index === editIndex.userIndex) {
                      return newData;
                    }
                    return userData;
                  }
                ),
              };
              setEditIndex({ dataIndex: null, userIndex: null });
              setIsGoalEditing(false);
            } else {
              // Add new user data
              const currentIndex = updatedData[currentData].user_data.length;
              updatedData[currentData] = {
                ...updatedData[currentData],
                user_data: [
                  ...updatedData[currentData].user_data.slice(0, currentIndex),
                  newData,
                  ...updatedData[currentData].user_data.slice(currentIndex),
                ],
              };
              setCurrentIndex(currentIndex + 1); // Set currentIndex to the newly added data
            }
            setShowSave(false);
            return updatedData;
          });
        }
      } else {
        handleAlertClick(
          <ToastFieldAlert
            message={"Purchase year cannot be less than the current year"}
          />,
          "message"
        );
        return false;
      }
    }

    return true;
  };

  const onHandleRestErrorState = () => {
    setErrorMessage(false);
    setError({
      ...error,
      user_goal_name: false,
      cost_per_year: false,
      purchase_year: false,
      course_duration: false,
    });
  };

  useEffect(() => {
    const dataIndex = allmodels?.dataIndex;
    const userIndex = allmodels?.userIndex;

    if (dataIndex >= 0 && userIndex >= 0 && allmodels?.isDelete) {
      const itemToDelete = data[dataIndex].user_data[userIndex];
      deleteData(
        "user-goal",
        itemToDelete.id,
        (success) => {
          if (success.data.code === 200) {
            toast.success(success.data.status_message);
            getData("user-goal", (success) => {
              if (success.data.code === 200) {
                // setData(success.data.message)
              } else {
                // setData([])
              }
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );

      // Copy the data array and remove the item to delete
      const updatedData = [...data];
      updatedData[dataIndex] = {
        ...updatedData[dataIndex],
        user_data: updatedData[dataIndex].user_data.filter(
          (_, index) => index !== userIndex
        ),
      };
      setData(updatedData);
      dispatch(
        updateCradInputs({ isDelete: false, deleteConfirmation: false })
      );
    }
  }, [allmodels?.isDelete, data]);

  useEffect(() => {
    dispatch(updateCradInputs({ deleteConfirmation: false, isDelete: false }));
  }, []);

  const handleDelete = (dataIndex, userIndex, item) => {
    const itemToDelete = data[dataIndex].user_data[userIndex];
    setGoalMenu(false);
    dispatch(
      updateCradInputs({
        isNewGoalSelected: false,
        deleteConfirmation: true,
        triggerFromGoal: true,
        isDelete: false,
        dataIndex,
        userIndex,
        goal_name: `${item?.goal_name}:${itemToDelete?.user_goal_name}`,
      })
    );
  };

  const handleEdit = (dataIndex, userIndex) => {
    setEditGoalInfo(data[dataIndex]);
    const itemToEdit = data[dataIndex].user_data[userIndex];
    setInputData(itemToEdit);
    setEditIndex({ dataIndex, userIndex });
    setShowSave(true);
    setIsGoalEditing(true);
    // setIsGoalEditingUpdated(true);
    setHandleTitle({
      isAddNewGoal: false,
      review: false,
      isGoalEditingUpdated: true,
    });
    setGoalList(false);
    // setReview(false);
  };

  //---------------for navigating the selected goal when user click add goals-----------//
  useEffect(() => {
    if (allmodels["goalNavigation"] && allmodels["isNewGoalSelected"]) {
      const newData = allmodels["goalNavigation"];
      const goalId = allmodels["goalNavigation"]?.goal_id;

      let existingIndex = data?.findIndex((goal) => goal.goal_id === goalId);

      if (existingIndex !== -1) {
        // Goal with the same goal_id already exists, so update the user_data array
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[existingIndex] = {
            ...updatedData[existingIndex],
            user_data: [
              ...(updatedData[existingIndex]?.user_data || []),
              ...(newData.user_data || []).filter(
                (newUserData) =>
                  !updatedData[existingIndex].user_data.some(
                    (existingUserData) =>
                      existingUserData.user_goal_name ===
                      newUserData.user_goal_name
                  )
              ),
            ],
          };
          return updatedData;
        });
        setCurrentData(existingIndex);
      } else {
        // Goal doesn't exist, so add a new entry
        const uniqueUserData = [
          ...new Set(
            newData.user_data.map((item) => ({
              ...item,
              user_goal_name: item.user_goal_name,
            }))
          ),
        ];
        //Update existingIndex after adding the new goal
        existingIndex = data.length;
        setData((prevData) => [
          ...prevData.slice(0, existingIndex), // Keep existing goals up to the insertion point
          {
            goal_id: newData.goal_id,
            goal_name: newData.goal_name,
            is_education: newData.is_education,
            user_data: uniqueUserData,
          },
          ...prevData.slice(existingIndex), // Add remaining goals
        ]);

        setCurrentData(existingIndex);
      }

      setGoalList(false);
      setIsGoalEditing(false);
      setShowSave(true);

      setInputData({
        user_goal_name: "",
        purchase_year: "",
        cost_per_year: "",
        course_duration: 1,
      });
      // setGoalMenu(false);
      setEditIndex({ dataIndex: null, userIndex: null });
    }
    dispatch(
      updateCradInputs({ goalNavigation: null, isNewGoalSelected: false })
    );
  }, [allmodels?.goalNavigation, allmodels?.isNewGoalSelected]);

  useEffect(() => {
    setGoalMenu(false);
  }, []);

  useEffect(() => {
    if (data[currentData]?.user_data?.length === 0) {
      setInputData({
        user_goal_name: "",
        purchase_year: "",
        cost_per_year: "",
        course_duration: 1,
      });
    }
  }, [data, currentData]);

  useEffect(() => {
    if (data[currentData]?.user_data[currentIndex]) {
      setInputData(data[currentData].user_data[currentIndex]);
      // dispatch(updateCradInputs({user_selected_goals: data}))
    }
  }, [currentData, currentIndex, data]);

  useEffect(() => {
    // Reset the form when editIndex changes
    if (editIndex.dataIndex === null && editIndex.userIndex === null) {
      setInputData({
        user_goal_name: "",
        purchase_year: "",
        cost_per_year: "",
        course_duration: 1,
      });
    }
  }, [editIndex]);

  const handleInputChange = (e) => {
    if (e.target.name === "purchase_year") {
      if (/^\d{0,4}$/.test(e.target.value)) {
        let newInput = { ...inputData };
        newInput[e.target.name] = e.target.value;
        setInputData(newInput);
      }
    } else if (e.target.name == "cost_per_year") {
      setInputData({
        ...inputData,
        [e.target.name]: +e.target.value.replace(/,/g, ""),
      });
    } else {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
    setError({
      ...error,
      [e.target.name]: false,
    });
    if (
      !inputData.user_goal_name == "" &&
      !inputData.purchase_year == "" &&
      !inputData.cost_per_year == ""
    ) {
      setErrorMessage(false);
    }
  };

  const CurrencyFinder = () => {
    if (allmodels?.preferred_currency) {
      const selectedCurrency = CurrencyData?.find(
        (currency) => currency.currencyIndex == allmodels?.preferred_currency
      ).symbol;
      return selectedCurrency;
    } else {
      return "₹";
    }
  };

  //   console.log(goalList,'goalList');
  //   console.log(isGoalEditing,'isGoalEditing');
  // console.log(data, currentData, 'data');
  // console.log(data[currentData], 'data[currentData]');
  // console.log(allmodels, 'allmodals');

  return (
    <>
      {!goalList && !isGoalEditing && data.length > 0 ? (
        <>
          <>
            {data[currentData]?.user_data?.length > 0 &&
              // if user on other than 0 index then run fuction diifently
              (data[currentData]?.is_education ? (
                <Eduaction_form
                  title={data[currentData].goal_name}
                  onChange={handleInputChange}
                  data={inputData}
                  error={error}
                  errorMessage={errorMessage}
                  onHandleRestErrorState={onHandleRestErrorState}
                  handleBack={handleBack}
                  handleNext={() => {
                    if (showSave) {
                      handleSave();
                    } else {
                      handleUpdate();
                    }

                    if (showSave) {
                      if (currentData < data.length - 1) {
                        if (goalMenu) {
                          setCurrentData(data.length - 1);
                          setGoalMenu(false);
                          setGoalList(true);
                        } else {
                          setCurrentData((prevData) => prevData + 1);
                        }
                        setCurrentIndex(0);
                      } else {
                        // alert("No next data available!");
                        setGoalList(true);
                        // setCardSection(3)
                      }
                    } else {
                      handleNext();
                    }
                  }}
                  showAddGoalBtn={false}
                  addGaol={async () => {
                    if (showSave) {
                      await handleSave();
                    } else {
                      await handleUpdate();
                    }
                    setTimeout(handleAddNew, 50);
                  }}
                  CurrencyFinder={<CurrencyFinder />}
                />
              ) : (
                <Other_goal_form
                  title={data[currentData].goal_name}
                  onChange={handleInputChange}
                  data={inputData}
                  error={error}
                  errorMessage={errorMessage}
                  onHandleRestErrorState={onHandleRestErrorState}
                  handleBack={handleBack}
                  handleNext={() => {
                    if (showSave) {
                      handleSave();
                    } else {
                      handleUpdate();
                    }

                    if (showSave) {
                      if (currentData < data.length - 1) {
                        // added code to navigate list after adding goal
                        if (goalMenu) {
                          setCurrentData(data.length - 1);
                          setGoalMenu(false);
                          setGoalList(true);
                        } else {
                          setCurrentData((prevData) => prevData + 1);
                        }
                        setCurrentIndex(0);
                      } else {
                        // alert("No next data available!");
                        setGoalList(true);
                        // setCardSection(3)
                      }
                    } else {
                      handleNext();
                    }
                  }}
                  showAddGoalBtn={false}
                  addGaol={async () => {
                    if (showSave) {
                      await handleSave();
                    } else {
                      await handleUpdate();
                    }
                    setTimeout(handleAddNew, 50);
                  }}
                  CurrencyFinder={<CurrencyFinder />}
                />
              ))}
          </>
          <>
            {data[currentData]?.user_data?.length === 0 &&
              // if user on first index and its empty then save data on add and next button
              (data[currentData]?.is_education ? (
                <Eduaction_form
                  title={data[currentData].goal_name}
                  onChange={handleInputChange}
                  data={inputData}
                  showAddGoalBtn={false}
                  errorMessage={errorMessage}
                  onHandleRestErrorState={onHandleRestErrorState}
                  error={error}
                  addGaol={async () => {
                    let saceres = await handleSave();
                    // if data seve sucessfully and handleSave return true
                    if (saceres) {
                      setTimeout(handleAddNew, 50);
                    }
                  }}
                  handleNext={async () => {
                    let saceres = await handleSave();
                    // if data seve sucessfully and handleSave return true
                    if (saceres) {
                      handleNext();
                    }
                  }}
                  handleBack={handleBack}
                  CurrencyFinder={<CurrencyFinder />}
                />
              ) : (
                <Other_goal_form
                  title={data[currentData].goal_name}
                  onChange={handleInputChange}
                  data={inputData}
                  showAddGoalBtn={false}
                  errorMessage={errorMessage}
                  onHandleRestErrorState={onHandleRestErrorState}
                  error={error}
                  addGaol={async () => {
                    let saceres = await handleSave();
                    // if data seve sucessfully and handleSave return true
                    if (saceres) {
                      setTimeout(handleAddNew, 50);
                    }
                  }}
                  handleNext={async () => {
                    let saceres = await handleSave();
                    // if data seve sucessfully and handleSave return true
                    if (saceres) {
                      handleNext();
                    }
                  }}
                  handleBack={handleBack}
                  CurrencyFinder={<CurrencyFinder />}
                />
              ))}
          </>
        </>
      ) : null}

      {goalList
        ? currentData === data.length - 1 && (
            <>
              <div className="w-full mx-auto 2xl:max-w-[23.8rem] xl:max-w-[21.5rem] lg:max-w-[20rem] md:max-w-[24rem] max-w-[85vw] h-[20.3rem] overflow-y-auto pe-0 lg:pe-2">
                <div className="flex flex-col gap-2 lg:p-4">
                  {data?.map((item, dataIndex) => (
                    <div key={dataIndex} className="flex flex-col gap-2">
                      <p className="fifth-card-label ">
                        {item.goal_name} ({item.user_data.length})
                      </p>
                      {item?.user_data?.map((userItem, userIndex) => (
                        <div key={userItem.user_goal_name + userIndex}>
                          <ListCrad
                            goal={userItem}
                            goal_name={userItem.user_goal_name}
                            deleteonClick={() =>
                              handleDelete(dataIndex, userIndex, item)
                            }
                            // deleteonClick={() => handleDelete(dataIndex, item)}
                            editonClick={() => handleEdit(dataIndex, userIndex)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full  mx-auto lg:flex flex-col gap-4 items-center justify-between hidden">
                <Add_btn
                  label="Add New Goal"
                  onClick={() => {
                    setGoalMenu(true);
                    dispatch(updateCradInputs({ isNewGoalListOpen: goalMenu }));
                  }}
                />
                <Card_footer
                  className="card-footer-w"
                  title="Next"
                  BackonClick={() => {
                    onHandleRestErrorState();
                    setGoalList(false);
                  }}
                  NextonClick={() => {
                    onHandleRestErrorState();
                    handleNextClick(5);
                  }}
                />
              </div>
              {/* visible in mobile */}
              <div className="w-full mx-auto flex mb-6 md:mb-8 gap-4 items-center justify-between lg:hidden">
                <Card_footer_greenbtn
                  className=" card-footer-w"
                  title="Next"
                  BackonClick={() => {
                    onHandleRestErrorState();
                    setGoalList(false);
                  }}
                  NextonClick={() => {
                    onHandleRestErrorState();
                    handleNextClick(5);
                  }}
                  onClick={() => {
                    setGoalMenu(true);
                    dispatch(updateCradInputs({ isNewGoalListOpen: goalMenu }));
                  }}
                />
              </div>
            </>
          )
        : null}

      {/* edit goal section */}
      {isGoalEditing &&
        (editGoalInfo?.is_education ? (
          <Eduaction_form
            title={editGoalInfo.goal_name}
            onChange={handleInputChange}
            data={inputData}
            isGoalEditing={isGoalEditing}
            showAddGoalBtn={false}
            errorMessage={errorMessage}
            onHandleRestErrorState={onHandleRestErrorState}
            error={error}
            handleNext={() => {
              handleSave();
              setHandleTitle({
                isAddNewGoal: false,
                review: true,
                isGoalEditingUpdated: false,
              });
              if (
                parseInt(inputData?.purchase_year) >=
                  new Date().getFullYear() &&
                inputData.user_goal_name != "" &&
                inputData.cost_per_year != "" &&
                inputData.cost_per_year != "0" &&
                inputData.cost_per_year != 0
              ) {
                setIsGoalEditing(false);
                setGoalList(true);
              }
            }}
            handleBack={() => {
              setIsGoalEditing(false);
              setGoalList(true);
            }}
            CurrencyFinder={<CurrencyFinder />}
          />
        ) : (
          <Other_goal_form
            title={editGoalInfo.goal_name}
            onChange={handleInputChange}
            data={inputData}
            isGoalEditing={isGoalEditing}
            showAddGoalBtn={false}
            errorMessage={errorMessage}
            onHandleRestErrorState={onHandleRestErrorState}
            error={error}
            handleNext={() => {
              handleSave();
              setHandleTitle({
                isAddNewGoal: false,
                review: true,
                isGoalEditingUpdated: false,
              });
              if (
                parseInt(inputData?.purchase_year) >=
                  new Date().getFullYear() &&
                inputData.user_goal_name != "" &&
                inputData.cost_per_year != "" &&
                inputData.cost_per_year != "0" &&
                inputData.cost_per_year != 0
              ) {
                setIsGoalEditing(false);
                setGoalList(true);
              }
            }}
            handleBack={() => {
              setIsGoalEditing(false);
              setGoalList(true);
            }}
            CurrencyFinder={<CurrencyFinder />}
          />
        ))}
    </>
  );
};
export default React.memo(Fifth_section2);

{
  /* <>
                <button onClick={handleBack}>Back</button>
                <button onClick={handleNext}>Next</button>
                {data.length > 0 ? data[currentData].user_data?.length > 0 && (
                    <div>
                        <p>Title: {data[currentData].goal_name}</p>
                        <div>
                            <input
                                type="text"
                                value={inputData.user_goal_name}
                                onChange={(e) => setInputData({ ...inputData, user_goal_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={inputData.purchase_year}
                                onChange={(e) => setInputData({ ...inputData, purchase_year: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={inputData.cost_per_year}
                                onChange={(e) => setInputData({ ...inputData, cost_per_year: e.target.value })}
                            />
                        </div>
                        {!showSave &&
                            <button onClick={handleUpdate}>Update</button>
                        }


                        <div className="bg-yellow-400 p-4 w-fit">

                            {showSave ? (
                                <button onClick={handleSave}>Save</button>
                            ) : (
                                <button onClick={handleAddNew}>Add New Data</button>
                            )}

                        </div>
                    </div>
                ) : null}

                {data.length > 0 ? data[currentData].user_data.length === 0 &&
                    <div>
                        <p>Title: {data[currentData].goal_name}</p>
                        <div>
                            <input
                                type="text"
                                value={inputData.user_goal_name}
                                onChange={(e) => setInputData({ ...inputData, user_goal_name: e.target.value })}
                                placeholder="Enter User Goal Name"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={inputData.purchase_year}
                                onChange={(e) => setInputData({ ...inputData, purchase_year: e.target.value })}
                                placeholder="Enter Purchase Year"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                value={inputData.cost_per_year}
                                onChange={(e) => setInputData({ ...inputData, cost_per_year: e.target.value })}
                                placeholder="Enter Cost Per Year"
                            />
                        </div>
                        <button onClick={handleSave}>Save</button>
                    </div> : null
                }
            </> */
}

{
  /* {goalList ? currentData === data.length - 1 &&
                <>
                    {data.map((item, dataIndex) => {
                        return (
                            <div key={dataIndex}>
                                <h3>{item.goal_name}</h3>
                                <ul>
                                    {item.user_data.map((userItem, userIndex) => (
                                        <div key={userIndex}>
                                            <div className="">
                                                <li key={userIndex}>{userItem.user_goal_name}</li>
                                                <button className='bg-green-400 px-2' onClick={() => handleEdit(dataIndex, userIndex)}>
                                                    Edit
                                                </button>

                                                <button
                                                    className='bg-red-500 text-white px-2' onClick={() => handleDelete(dataIndex, userIndex)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>

                                    ))}
                                </ul>
                            </div>
                        )
                    })}
                </>
                : null
            } */
}

// const [data, setData] = useState(
//     [
//         {
//             "is_education": false,
//             "goal_name": "Travel",
//             "user_data": []
//         },
//         {
//             "is_education": false,
//             "goal_name": "Property",
//             "user_data": []
//         },
//         {
//             "is_education": false,
//             "goal_name": "Vehicle",
//             "user_data": []
//         },
//         {
//             "is_education": false,
//             "goal_name": "Wedding",
//             "user_data": []
//         }

//     ]
// );
