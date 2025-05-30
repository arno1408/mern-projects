import QuestionCard from "../../QuestionCard";
import Card_input from "../Card_input";
import Card_footer from "../Card_footer";
import React, { useEffect, useState } from "react";
import Edit_goals from "../Edit_goals";
import Add_btn from "../../Add_btn";
// import { FaChevronRight } from "react-icons/fa"
// import Gray_btn from "../Gray_btn"
// import Skipp_btn from "../Skipp_btn"
// import { updateCradInputs } from "../../../redux/slices/Card_Inputs"
// import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  getData,
  saveDetails,
  updateDetails,
} from "../../../pages/destop_L1/server";
import Gray_btn from "../Gray_btn";
import { FaChevronRight } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import NumberInput from "../NumberInput";
import { CurrencyData } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import Notifier from "../../notifierModal/Notifier";
import { updateCradInputs } from "../../../redux/slices/Card_Inputs";
import { diamond } from "../../../assets/Icons";

const Third_Card = ({ handleNextClick, handleAlertClick }) => {
  const [sections, setsections] = useState(1);
  const [allLoans, setallLoans] = useState([]);
  const [updateloan, setupdateloan] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [error, setError] = useState({
    loan_name: false,
    outstanding_balance: false,
    interest: false,
    end_year: false,
    emi_amount: false,
  });
  const [index, setindex] = useState(0);
  const [backClicked, setBackClicked] = useState(false);
  const [loan, setloan] = useState({
    loan_name: "",
    outstanding_balance: "",
    end_year: "",
    emi_amount: "",
    start_year: new Date().getFullYear(),
    interest: "",
  });
  const dispatch = useDispatch();
  const allmodels = useSelector((state) => state.Card_inputs);

  const userdetails = JSON.parse(localStorage.getItem("userdetails"));
  const LoanActivity = userdetails?.coinmaster?.filter(
    (list) => list.activity == 4
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [window.innerWidth]);

  // console.log(allmodels,"data");

  let DymmyLoans = () => {
    return (
      <>
        <div className=" flex flex-col gap-1 lg:gap-2 mx-9 lg:mx-14">
          <div className=" p-2  lg:p-[18px] rounded-[20px]">
            <p className="text-grey-2 text-xs md:text-sm 2xl:text-[15px] font-normal lg:font-medium font-Montserrat">
              Some Loans you might have
            </p>
          </div>
          {["Education Loan", "Home Loan", "Car Loan"].map((loan) => (
            <div
              key={loan}
              className="p-5 lg:p-4 lg:bg-grey-2 lg:bg-opacity-20 rounded-[15px] lg:rounded-[20px] border lg:border-none border-slate-600 shadow"
            >
              <p className="text-grey-2 text-sm font-normal lg:text-[15px] xl:text-base 2xl:text-[17px] lg:font-semibold ">
                {loan}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const updateInput = (e) => {
    let newloan = { ...loan };
    if (e.target.name === "end_year") {
      if (/^\d{0,4}$/.test(e.target.value)) {
        newloan[e.target.name] = e.target.value;
        setloan(newloan);
      }
    } else if (e.target.name === "interest") {
      if (parseFloat(e.target.value) <= 100) {
        setloan(newloan);
        newloan[e.target.name] = e.target.value;
      } else {
        setloan({
          ...loan,
          interest: "",
        });
      }
    } else if (e.target.name === "loan_name") {
      newloan[e.target.name] = e.target.value.replace(/,/g, "");
      setloan(newloan);
      dispatch(
        updateCradInputs({ [e.target.name]: e.target.value.replace(/,/g, "") })
      );
    } else {
      newloan[e.target.name] = +e.target.value.replace(/,/g, "");
      setloan(newloan);
      dispatch(
        updateCradInputs({ [e.target.name]: +e.target.value.replace(/,/g, "") })
      );
    }
    if (e.target.value !== "") {
      setError({
        ...error,
        [e.target.name]: false,
      });
    }

    if (
      error.loan_name === false &&
      error.outstanding_balance === false &&
      error.interest === false &&
      error.end_year === false &&
      error.emi_amount === false
    ) {
      setErrorMessage(false);
    }
  };

  //------------------------------Loan Toast for Congratulations------------------------------//
  const ToastCongratulate = () => {
    return (
      <div>
        <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
          <img src={diamond} alt="" className=" max-w-[30px] lg:max-w-[38px]" />
          <p className="text-cyan-950 text-xl lg:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${LoanActivity[0]?.coins}`}</p>
        </div>
        <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
          <h3 className="font-bold text-sm lg:text-lg text-slate-700 text-center">
            Congratulations!
          </h3>
          <div className="text-slate-700 text-xs lg:text-base  text-center">
            You have earned {`+${LoanActivity[0]?.coins}`} coins.
            <br /> More power to you. Keep Going!{" "}
          </div>
        </div>
      </div>
    );
  };

  //------------------------------loan Toast for Alert------------------------------//
  const ToastFieldAlert = ({ message }) => {
    return (
      <div className="bg-emerald-100 rounded-xl p-3 text-center">
        <div>{message}</div>
      </div>
    );
  };

  const addNewLoan = () => {
    if (
      loan.hasOwnProperty("loan_name") &&
      loan.loan_name !== "" &&
      loan.hasOwnProperty("outstanding_balance") &&
      loan.outstanding_balance !== "" &&
      loan.outstanding_balance !== "0" &&
      loan.outstanding_balance !== 0 &&
      loan.outstanding_balance > 0 &&
      loan.hasOwnProperty("end_year") &&
      loan.end_year !== "" &&
      loan.end_year !== "0" &&
      loan.end_year !== 0 &&
      loan.hasOwnProperty("emi_amount") &&
      loan.emi_amount !== "" &&
      loan.emi_amount !== "0" &&
      loan.emi_amount !== 0 &&
      loan.emi_amount > 0
    ) {
      if (parseInt(loan.end_year) >= new Date().getFullYear()) {
        if (parseInt(loan.emi_amount) < parseInt(loan.outstanding_balance)) {
          if (updateloan === true) {
            let newloan = { ...loan };
            let obj = {};
            obj.loan_name = newloan.loan_name;
            obj.outstanding_balance = newloan.outstanding_balance;
            obj.end_year = newloan.end_year;
            obj.emi_amount = newloan.emi_amount;
            obj.start_year = new Date().getFullYear();
            obj.interest = newloan?.interest;
            obj.login_form_number = 3;
            updateDetails(
              loan.id,
              "loan",
              obj,
              (success) => {
                if (success.data.code === 200) {
                  // handleNextClick(3);
                  setupdateloan(false);
                  handleAlertClick(success.data.status_message, "success");
                  setloan({
                    loan_name: "",
                    outstanding_balance: "",
                    end_year: "",
                    emi_amount: "",
                    interest: "",
                  });
                  setsections(3);
                }
              },
              (error) => {
                console.log(error);
              }
            );
          } else {
            let obj = { ...loan };
            obj.start_year = new Date().getFullYear();
            obj.login_form_number = 3;
            saveDetails(
              "loan",
              obj,
              (success) => {
                if (success.data.code === 200) {
                  // handleNextClick(3);
                  console.log(
                    success.data.message.total_loan_coins,
                    LoanActivity[0]?.max_coins,
                    "rate"
                  );
                  if (
                    success.data.message.total_loan_coins <=
                    LoanActivity[0]?.max_coins
                  ) {
                    if (success.data.message?.coins_added?.is_coin_added) {
                      handleAlertClick(<ToastCongratulate />, "message");
                    }
                  }
                  getAllLoans();
                  handleAlertClick(success.data.status_message, "success");
                  setloan({
                    loan_name: "",
                    outstanding_balance: "",
                    end_year: "",
                    emi_amount: "",
                    interest: "",
                  });
                  setErrorMessage(false);
                }
              },
              (error) => {
                console.log(error);
              }
            );
          }
        } else {
          // alert("emi amount could not be greater than outstanding balance");
          // handleAlertClick('emi amount could not be greater than outstanding balance')
          handleAlertClick(
            <ToastFieldAlert
              message={
                "Emi amount could not be greater than outstanding balance"
              }
            />,
            "message"
          );
        }
      } else {
        // alert("end year could not be less than current year");
        handleAlertClick(
          <ToastFieldAlert
            message={"End year could not be less than current year"}
          />,
          "message"
        );
      }
    } else {
      // alert("please fill all the fields");
      let loan_name = false;
      let interest = false;
      let emi_amount = false;
      let end_year = false;
      let outstanding_balance = false;
      if (loan.hasOwnProperty("loan_name") && loan["loan_name"] == "") {
        loan_name = true;
      }
      if (
        loan.hasOwnProperty("outstanding_balance") &&
        (loan["outstanding_balance"] == "" || loan["outstanding_balance"] <= 0)
      ) {
        outstanding_balance = true;
      }
      if (loan.hasOwnProperty("interest") && loan["interest"] == "") {
        interest = true;
      }
      if (
        loan.hasOwnProperty("emi_amount") &&
        (loan["emi_amount"] == "" || loan["emi_amount"] <= 0)
      ) {
        emi_amount = true;
      }
      if (
        (loan.hasOwnProperty("end_year") && loan["end_year"] == "") ||
        parseInt(loan.end_year) <= new Date().getFullYear()
      ) {
        end_year = true;
      }
      setError({
        ...error,
        loan_name: loan_name,
        outstanding_balance: outstanding_balance,
        interest: interest,
        end_year: end_year,
        emi_amount: emi_amount,
      });
      setErrorMessage(true);
      // setupdateloan(false)

      // handleAlertClick(<ToastFieldAlert message={'please fill all the fields'}/>,'message')
    }
  };

  const editLoan = (id) => {
    setupdateloan(true);
    // setupdateid
    setindex(id);
    let findElement = allLoans.find((element) => element.id === id);
    setloan(findElement);
    setsections(2);
  };

  const updateCardLoan = () => {
    addNewLoan();
    if (Object.values(loan).includes(true)) {
      setsections(2);
    } else {
      setsections(3);
    }
  };

  const getAllLoans = () => {
    getData(
      "loan",
      (success) => {
        if (success.data.code === 200) {
          console.log(success.data.message, "data loan");
          if (success?.data?.message?.length === 0 && sections !== 2) {
            // for setting first section just after 2nd card
            setsections(1);
          }
          setallLoans(success.data.message);
        } else {
          setallLoans([]);
        }
      },
      (error) => {
        console.log(error);
        setallLoans([]);
      }
    );
  };
  useEffect(() => {
    setTimeout(() => {
      getAllLoans();
    }, 500);
  }, [sections]);

  useEffect(() => {
    setsections(1);
    dispatch(updateCradInputs({ deleteConfirmation: false, isDelete: false }));
  }, []);

  useEffect(() => {
    const deleteId = allmodels?.deleteId;
    if (deleteId && allmodels?.isDelete) {
      deleteData(
        "loan",
        deleteId,
        (success) => {
          if (success.data.code === 200) {
            handleAlertClick(success.data.status_message, "success");
            getAllLoans();
          }
        },
        (error) => {
          setsections(2);
          console.log(error);
        }
      );
      dispatch(
        updateCradInputs({ isDelete: false, deleteConfirmation: false })
      );
    }
  }, [allmodels?.isDelete]);

  //----------delete loan----------//
  const deleteLoan = (id, loan, index) => {
    // const result = window.confirm('Do you want to delete?');
    dispatch(
      updateCradInputs({
        deleteConfirmation: true,
        triggerFromGoal: false,
        isDelete: false,
        deleteIndex: index,
        deleteId: id,
        loan_name: loan?.loan_name,
      })
    );
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

  const onHanleRestErrorState = () => {
    setErrorMessage(false);
    setError({
      ...error,
      loan_name: false,
      outstanding_balance: false,
      interest: false,
      end_year: false,
      emi_amount: false,
    });
  };

  const AddAnotherLoan = () => {
    const addAnotherLoanFunctionality = () => {
      if (allmodels?.deleteConfirmation == false) {
        setsections(2);
      }
      setloan({
        loan_name: "",
        outstanding_balance: "",
        end_year: "",
        emi_amount: "",
        interest: "",
      });
      setupdateloan(false);
    };
    return (
      <div className=" w-full max-w-[78%] lg:max-w-fit  mx-auto">
        {isMobile ? (
          <Gray_btn
            className="w-full max-w-[85%] ml-auto lg:hidden mb-4"
            label="Add Another Loan"
            Icon={MdAdd}
            onClick={addAnotherLoanFunctionality}
          />
        ) : (
          <Add_btn
            label="Add Another Loan"
            className="hidden lg:flex"
            onClick={addAnotherLoanFunctionality}
          />
        )}
      </div>
    );
  };

  const SkipButtonSection = () => {
    const skipButtonHandlerFunctionality = () => {
      if (!backClicked) {
        handleNextClick(3);
      }
    };

    return (
      <div>
        {isMobile ? (
          <Gray_btn
            className={`w-full max-w-[85%] ml-auto mb-4 mt-8 lg:hidden max-md:flex`}
            onClick={() => {
              skipButtonHandlerFunctionality();
            }}
            id="skipButton"
            label="Skip Loans"
            Icon={FaChevronRight}
          />
        ) : (
          <div
            className={`lg:flex lg:items-center lg:justify-center max-md:hidden`}
          >
            <div
              id="skipButton"
              onClick={() => {
                skipButtonHandlerFunctionality();
              }}
              className="text-center text-gray-200 text-xl lg:text-base font-medium font-Montserrat underline pb-6 cursor-pointer"
            >
              Skip Loans
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card card-3">
      <QuestionCard
        number="3"
        label="What do you currently OWE ?"
        subtitle={
          sections == 2
            ? updateloan === true
              ? "Edit Details"
              : "Enter Details"
            : sections == 3
              ? "Review Loans"
              : ""
        }
        subtitlePostion=""
      />

      <div
        className={`card-body hide-scrollbar cards-scroll lg:pt-[25px] lg:pb-[50px] 2xl:pt-[35px] 2xl:pb-[45px] ${Object.values(error).every((value) => !value) ? "pt-[2rem] pb-[26%] " : "pt-3 pb-[18%] "}`}
      >
        {sections === 1 ? (
          <DymmyLoans />
        ) : sections === 2 ? (
          <div className="w-full max-w-[78%] lg:max-w-[85%] 2xl:max-w-[80%] mx-auto flex flex-col justify-between gap-8 md:gap-4 flex-1">
            {/* visible in  mobile media  */}
            {isMobile ? (
              <div className="flex flex-col gap-3">
                <div
                  className={`please-feild-text ${errorMessage ? "block" : "hidden"}`}
                >
                  * Please fill the highlighted fields
                </div>
                <div className="flex flex-col justify-start ">
                  <p className="card-label">What is this loan for?</p>
                  <Card_input
                    type="text"
                    name={"loan_name"}
                    error={error.loan_name}
                    className=" my-1 md:my-0 px-3 py-2 lg:px-4 lg:py-2.5 text-base font-Work_Sans font-light italic  md:placeholder:text-transparent"
                    placeholder="Eg-Daughter’s Education"
                    onChange={updateInput}
                    value={loan?.loan_name}
                  />
                </div>

                <div className="flex justify-between items-baseline">
                  <p className="card-label max-w-0">Outstanding Balance</p>
                  <div className="flex items-center">
                    <p className="text-grey-2 currencyfinder-1 pr-3">
                      <CurrencyFinder />
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <NumberInput
                        error={error.outstanding_balance}
                        type="number"
                        name={"outstanding_balance"}
                        className={`px-3 py-2 lg:px-4 lg:py-1 lg:max-w-[190px] ${error.outstanding_balance ? "max-w-[125px]" : "max-w-[116px]"}`}
                        placeholder=""
                        onChange={updateInput}
                        value={
                          loan?.outstanding_balance
                            ? loan?.outstanding_balance.toString()
                            : ""
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <p className="card-label">EMI Amount</p>
                  <div className="flex items-center">
                    <p className="text-grey-2 currencyfinder-1 pr-3 ">
                      <CurrencyFinder />
                    </p>
                    <div className="flex flex-col  items-center gap-2">
                      <NumberInput
                        type="number"
                        error={error.emi_amount}
                        name={"emi_amount"}
                        className={`px-3 py-2 lg:px-4 lg:py-1 lg:max-w-[200px] ${error.emi_amount ? "max-w-[125px]" : "max-w-[116px]"}`}
                        placeholder=""
                        onChange={updateInput}
                        value={
                          loan?.emi_amount ? loan?.emi_amount.toString() : ""
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <p className="card-label">EMI ends in Year</p>
                  <div className="flex  items-center gap-3">
                    <div
                      className={`${error.end_year ? `flex gap-2 flex-col` : `max-w-[90px]`}`}
                    >
                      <Card_input
                        name={"end_year"}
                        type="number"
                        error={error.end_year}
                        className={`px-3 py-2 lg:px-4 lg:py-1 text-center ${error.end_year ? "max-w-[125px]" : "max-w-[88px]"}`}
                        placeholder="YYYY"
                        onChange={updateInput}
                        value={loan?.end_year}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="card-label ">Loan Interest Rate</p>
                  <div className="flex items-center">
                    <p className="currencyfinder-1 text-grey-2 pr-3">%</p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`${error.interest ? "max-w-[50px]" : "max-w-[50px]"}`}
                      >
                        <Card_input
                          name={"interest"}
                          type="number"
                          error={error.interest}
                          className="px-3  py-2 lg:px-4 lg:py-1 text-center"
                          onChange={updateInput}
                          value={loan?.interest}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" flex-col gap-3 lg:gap-4  hidden lg:flex">
                <div
                  className={`italic text-xs text-orange pb-2 ${errorMessage ? "block " : "hidden"}`}
                >
                  * Please fill the highlighted fields
                </div>
                <div className="flex flex-col justify-start ">
                  <p className="card-label pb-1">What is this loan for?</p>
                  <Card_input
                    type="text"
                    name={"loan_name"}
                    error={error.loan_name}
                    className=" my-1 text-grey-2 md:my-0 px-3 py-2 lg:px-4 lg:py-[6px] 2xl:py-[10.5px]   text-base font-light italic lg:not-italic  md:placeholder:text-transparent"
                    placeholder="Eg-Daughter’s Education"
                    onChange={updateInput}
                    value={loan?.loan_name}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <p className="card-label max-w-0">Outstanding Balance</p>
                  <div className="flex items-center gap-2">
                    <p className="text-grey-2 currencyfinder-1">
                      <CurrencyFinder />
                    </p>
                    <NumberInput
                      error={error.outstanding_balance}
                      type="number"
                      name={"outstanding_balance"}
                      className="max-w-[106px] lg:max-w-[190px] px-3  py-2 lg:px-4 lg:py-[7px] 2xl:py-[10.5px]"
                      placeholder=""
                      onChange={updateInput}
                      value={
                        loan?.outstanding_balance
                          ? loan?.outstanding_balance.toString()
                          : ""
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="card-label">EMI Amount</p>
                  <div className="flex items-center gap-2">
                    <p className="text-grey-2 currencyfinder-1">
                      <CurrencyFinder />
                    </p>
                    <NumberInput
                      type="number"
                      error={error.emi_amount}
                      name={"emi_amount"}
                      className="max-w-[106px] lg:max-w-[190px] px-3  py-2 lg:px-4 lg:py-[7px] 2xl:py-[10.5px]"
                      placeholder=""
                      onChange={updateInput}
                      value={
                        loan?.emi_amount ? loan?.emi_amount.toString() : ""
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="card-label">EMI ends in Year</p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`${error.end_year ? `flex gap-2` : `max-w-[85px]`}`}
                    >
                      <Card_input
                        maxLength={3}
                        name={"end_year"}
                        type="number"
                        error={error.end_year}
                        className={`${error.end_year && `max-w-[93px]`} px-3 py-2 lg:px-4 lg:py-[7px] 2xl:py-[10.5px]`}
                        placeholder="YYYY"
                        onChange={updateInput}
                        value={loan?.end_year?.toString()}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <p className="card-label">Loan Interest Rate</p>
                  <div className="flex items-center gap-3">
                    <p className="currencyfinder-1 text-grey-2">%</p>
                    <div className={`max-w-[62px]`}>
                      <NumberInput
                        name={"interest"}
                        step={0.2}
                        type="text"
                        error={error.interest}
                        className="px-3  py-2 lg:px-4 lg:py-[7px] 2xl:py-[10.5px] text-center"
                        onChange={updateInput}
                        value={loan?.interest?.toString()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {updateloan == false && (
              <div className="flex justify-center gap-5">
                <Add_btn
                  label="Add Another Loan"
                  onClick={addNewLoan}
                  className="hidden lg:flex mb-4"
                />
                <Gray_btn
                  className="w-full max-w-[85%] ml-auto mb-4 lg:hidden"
                  // onClick={() => handleNextClick(3)}
                  onClick={addNewLoan}
                  label="Add Another Loan"
                  Icon={MdAdd}
                />
              </div>
            )}
          </div>
        ) : (
          sections === 3 && (
            <div className="flex-1 flex flex-col justify-between lg:justify-start gap-0 lg:gap-16 pb-0 lg:pb-6">
              <div className="max-w-[78%] w-[400px] mx-auto">
                <div className="flex flex-col gap-1 lg:gap-2 h-[230px] lg:h-[16rem] xl:h-[18rem] 2xl:h-[21rem] overflow-y-auto pe-2">
                  {allLoans?.map((loan, i) => (
                    <div key={loan.id}>
                      <Edit_goals
                        key={loan.loan_name + i}
                        edit={() => editLoan(loan?.id)}
                        value={loan}
                        isDeleteConfirm={allmodels?.deleteConfirmation}
                        deleteConfirmationId={allmodels?.deleteId}
                        obj={loan}
                        name={loan?.loan_name}
                        index={i}
                        deleteData={() => deleteLoan(loan?.id, loan, i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <AddAnotherLoan />
            </div>
          )
        )}

        <div className=" w-full mx-auto max-w-[78%] lg:max-w-[69%]">
          {sections === 1 && <SkipButtonSection />}
          <Card_footer
            className=" "
            title={
              sections == 1
                ? "Add A Loan"
                : sections === 2
                  ? updateloan === true
                    ? "Update & View"
                    : "View Loans"
                  : "Next"
            }
            BackonClick={() => {
              setBackClicked(true);
              onHanleRestErrorState();
              handleNextClick(1);
              // setsections(1);
            }}
            NextonClick={() => {
              onHanleRestErrorState();
              if (sections === 1) {
                setsections(2);
              } else if (sections === 2) {
                if (updateloan === true) {
                  updateCardLoan();
                } else {
                  if (allLoans?.length > 0) {
                    setsections(3);
                  }
                }
              } else {
                // sav'eThirdCard()
                handleNextClick(3);
                // setsections(1)
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Third_Card);
