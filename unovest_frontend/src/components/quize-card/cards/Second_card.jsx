import React, { useEffect, useState } from "react";
import QuestionCard from "../../QuestionCard";
import Card_OR from "../Card_OR";
import Card_input from "../Card_input";
import Gray_btn from "../Gray_btn";
import I_btn from "../I_btn";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import Card_footer from "../Card_footer";
import { updateCradInputs } from "../../../redux/slices/Card_Inputs";
import { useDispatch, useSelector } from "react-redux";
import { saveDetails } from "../../../pages/destop_L1/server";
import NumberInput from "../NumberInput";
import { formatNumberWithCommas } from "../../../Variable";
import { CurrencyData } from "../../../constants";
import Tooltip from "../../tooltip/Tooltip";
import { diamond } from "../../../assets/Icons";

let Row_input = ({
  onChange,
  title,
  amtName,
  error,
  rorName,
  input_label,
  percentValue,
  amountValue,
  CurrencyFinder,
  tooltipIdLabel,
  LabelMessage,
  tooltipIdPercent,
  PercentMessage,
  className,
}) => {
  const TooltipLabelMassage = () => {
    return (
      <div>
        <ul className="list-disc p-2">
          {LabelMessage.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <div className="w-full justify-between items-center flex">
      <div className={`flex gap-2 items-center ${className}`}>
        {/* <I_btn title={title} /> */}
        <p className="card-label" data-tooltip-id={tooltipIdLabel}>
          {input_label}
        </p>
        <Tooltip
          id={tooltipIdLabel}
          backgroundColor={"#232E41"}
          message={<TooltipLabelMassage />}
          width={"10rem"}
          color={"#B7C3D8"}
          margin_left={"2rem"}
          opacity={1}
        />
      </div>
      <div className=" flex gap-2 items-baseline">
        <p className="text-grey-3 lg:text-grey-2 pr-1 currencyfinder-1">
          {CurrencyFinder}
        </p>
        <div className="w-full small-input-w number-input-div">
          <NumberInput
            type="number"
            error={error}
            className="2xl:py-[10px] lg:py-[8px] py-[10px] px-2 lg:px-6"
            title={title}
            name={amtName}
            onChange={onChange}
            value={amountValue}
          />
          {error && (
            <div className="please-feild-text">* Please fill in this field</div>
          )}
        </div>

        <div
          className="w-9 text-grey-3 text-lg font-medium font-Work_Sans lg:hidden "
          data-tooltip-id={tooltipIdPercent}
        >
          {percentValue}%
        </div>

        <div
          data-tooltip-id={tooltipIdPercent}
          className="hidden lg:flex items-center justify-center w-12 p-2 bg-zinc-300 bg-opacity-10 rounded-2xl input-border-none text-center  text-dark-blue  "
        >
          <input
            placeholder="5"
            type="number"
            className="bg-transparent h-6 w-full input-border-none text-gray-200  2xl:text-lg lg:text-sm  font-medium font-Work_Sans "
            onWheel={(e) => e.target.blur()}
            onChange={onChange}
            name={rorName}
            defaultValue={percentValue}
            disabled
          />
          <span className="2xl:text-lg lg:text-sm leading-3 font-bold font-Work_Sans text-gray-200">
            %
          </span>
        </div>
        <Tooltip
          id={tooltipIdPercent}
          backgroundColor={"#232E41"}
          message={PercentMessage}
          color={"#B7C3D8"}
          width={"9rem"}
          opacity={1}
        />
      </div>
    </div>
  );
};

const Second_card = ({ handleNextClick, handleAlertClick }) => {
  // const [details, setDetails] = useState(!useSelector(state => state?.Card_inputs?.lead_invested_value_is_lumsum))
  const details = useSelector(
    (state) => state?.Card_inputs?.lead_invested_value_is_lumsum
  );
  const detailExpense = useSelector(
    (state) => state?.Card_inputs?.lead_invested_value
  );
  const [data, setData] = useState([]);
  const [allincomeAmt, setallincomeAmt] = useState(0);
  const [error, setError] = useState({
    total_invested_value: false,
    bond_amount: false,
    cash_amount: false,
    equity_amount: false,
  });
  const dispatch = useDispatch();
  const allmodels = useSelector((state) => state?.Card_inputs);
  const UpdateInput = (e) => {
    dispatch(
      updateCradInputs({ [e.target.name]: +e.target.value.replace(/,/g, "") })
    );
    if (
      e.target.name == "bond_amount" ||
      e.target.name == "cash_amount" ||
      e.target.name == "equity_amount"
    ) {
      setError({
        ...error,
        bond_amount: false,
        cash_amount: false,
        equity_amount: false,
        total_invested_value: false,
      });
    } else {
      setError({
        ...error,
        [e.target.name]: false,
      });
    }
  };

  //------------------------------Investment Toast for Congratulations------------------------------//
  const ToastCongratulate = () => {
    const userdetails = JSON.parse(localStorage.getItem("userdetails"));
    const InvestmentActivity = userdetails?.coinmaster?.filter(
      (list) => list.activity == 3
    );
    return (
      <div>
        <div className="h-11 p-2 bg-slate-300 rounded-[26px] shadow justify-start items-start gap-2 flex w-max mx-auto mt-[19px]">
          <img src={diamond} alt="" className=" max-w-[30px] lg:max-w-[38px]" />
          <p className="text-cyan-950 text-xl 2xl:text-2xl font-extrabold font-['Work Sans'] shadow">{`+${InvestmentActivity[0]?.coins}`}</p>
        </div>
        <div className="bg-blue-100 rounded-xl mt-2 p-2 w-fit mx-auto">
          <h3 className="font-bold text-sm lg:text-lg text-slate-700 text-center">
            Congratulations!
          </h3>
          <div className="text-slate-700 text-xs lg:text-base text-center">
            You have earned {`+${InvestmentActivity[0]?.coins}`} coins.
            <br /> More power to you. Keep Going!{" "}
          </div>
        </div>
      </div>
    );
  };

  const saveSecondCard = () => {
    if (details == false || details == undefined) {
      let data = {};
      data.expected_average_annual_ror = allmodels.expected_average_annual_ror;
      data.total_invested_value = allmodels.total_invested_value;
      data.login_form_number = 2;

      if (
        allmodels["expected_average_annual_ror"] > 0 &&
        allmodels["total_invested_value"] > 0
      ) {
        saveDetails(
          "lead-invested-value",
          data,
          (success) => {
            if (success.data.code === 200) {
              handleNextClick(2);
              if (success.data.message?.coins_added?.is_coin_added) {
                handleAlertClick(<ToastCongratulate />, "message");
              }
            } else {
              // alert("something went wrong")
              handleAlertClick(success.data.status_message);
            }
          },
          (error) => {
            // console.log(error)
            handleAlertClick(error, "error");
          }
        );
      } else {
        setError({
          ...error,
          total_invested_value: true,
        });
        // alert("please fill all the fields")
        // handleAlertClick("please fill all the fields")
      }
    } else {
      if (
        allmodels["bond_amount"] > 0 ||
        allmodels["cash_amount"] > 0 ||
        allmodels["equity_amount"] > 0
      ) {
        let detailsValue = {
          bond_amount: allmodels["bond_amount"] ? allmodels["bond_amount"] : 0,
          cash_amount: allmodels["cash_amount"] ? allmodels["cash_amount"] : 0,
          equity_amount: allmodels["equity_amount"]
            ? allmodels["equity_amount"]
            : 0,
          equity_ror: allmodels["equity_ror"] ? allmodels["equity_ror"] : null,
          bonds_ror: allmodels["bonds_ror"] ? allmodels["bonds_ror"] : null,
          cash_ror: allmodels["cash_ror"] ? allmodels["cash_ror"] : null,
          login_form_number: 2,
        };

        saveDetails(
          "lead-invested-value",
          detailsValue,
          (success) => {
            if (success.data.code === 200) {
              handleNextClick(2);
              if (success.data.message?.coins_added?.is_coin_added) {
                handleAlertClick(<ToastCongratulate />, "message");
              }
            } else {
              // alert("something went wrong")
              handleAlertClick(success.data.status_message);
            }
          },
          (error) => {
            console.log(error);
            handleAlertClick(error, "error");
          }
        );
      } else {
        let bond_amount = false;
        let equity_amount = false;
        let cash_amount = false;
        if (allmodels["bond_amount"] <= 0 || isNaN(allmodels["bond_amount"])) {
          bond_amount = true;
        }
        if (
          allmodels["equity_amount"] <= 0 ||
          isNaN(allmodels["equity_amount"])
        ) {
          equity_amount = true;
        }
        if (allmodels["cash_amount"] <= 0 || isNaN(allmodels["cash_amount"])) {
          cash_amount = true;
        }
        setError({
          ...error,
          bond_amount: bond_amount,
          equity_amount: equity_amount,
          cash_amount: cash_amount,
        });
        // alert("please fill all the inputs");
        // handleAlertClick("please fill all the inputs")
      }
    }
  };

  const changeDetails = (status, total) => {
    dispatch(
      updateCradInputs({
        lead_invested_value_is_lumsum: status,
        total_invested_value: total ? total : allincomeAmt,
      })
    );
  };

  const DisplayTotalAmount = () => {
    if (allmodels?.equity_amount)
      setallincomeAmt(
        allmodels?.equity_amount +
          allmodels?.bond_amount +
          allmodels?.cash_amount
      );
    let calculatedAmt = formatNumberWithCommas(
      (allmodels?.equity_amount > 0 ? allmodels?.equity_amount : 0) +
        (allmodels?.bond_amount > 0 ? allmodels?.bond_amount : 0) +
        (allmodels?.cash_amount > 0 ? allmodels?.cash_amount : 0)
    );
    return calculatedAmt;
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

  //----------------calculate weighted average for equity, cash and bond----------------------//
  const weightedAverage =
    ((((allmodels?.cash_ror || 0) / 100) * (allmodels?.cash_amount || 0) +
      ((allmodels?.bonds_ror || 0) / 100) * (allmodels?.bond_amount || 0) +
      ((allmodels?.equity_ror || 0) / 100) * (allmodels?.equity_amount || 0)) /
      ((allmodels?.cash_amount || 0) +
        (allmodels?.bond_amount || 0) +
        (allmodels?.equity_amount || 0))) *
    100;

  const handleSecondToggleDetails = (type) => {
    const total =
      (allmodels["equity_amount"] > 0 ? allmodels["equity_amount"] : 0) +
      (allmodels["bond_amount"] > 0 ? allmodels["bond_amount"] : 0) +
      (allmodels["cash_amount"] > 0 ? allmodels["cash_amount"] : 0);
    if (
      allmodels["equity_amount"] > 0 ||
      allmodels["bond_amount"] ||
      allmodels["cash_amount"] > 0
    ) {
      dispatch(
        updateCradInputs({
          expected_average_annual_ror: Math.round(weightedAverage),
        })
      );
    }
    changeDetails(type, total);
    if (type !== false) {
      setError({
        ...error,
        bond_amount: false,
        cash_amount: false,
        equity_amount: false,
      });
    } else {
      setError({
        ...error,
        total_invested_value: false,
      });
    }
  };

  const onHanleRestErrorState = () => {
    setError({
      ...error,
      total_invested_value: false,
      bond_amount: false,
      cash_amount: false,
      equity_amount: false,
    });
  };

  return (
    <div className="card card-2">
      <QuestionCard number="2" label="What do you currently OWN?" />
      <div
        className={`card-body cards-scroll hide-scrollbar  ${Object.values(error).every((value) => !value) ? "pt-[2rem] pb-[26%] lg:pt-[2.2rem] lg:pb-[2.5rem] xl:pt-[20px] xl:pb-[30px] 2xl:pt-[2.2rem] 2xl:pb-[2.5rem]" : "pt-3 pb-[18%] lg:pt-[20px] lg:pb-[18px] xl:pt-[25px] xl:pb-[30px] 2xl:pt-[20px] 2xl:pb-[18px]"}`}
      >
        {/* over all input show if Lumpsum Amount not selected  */}
        {details === false || details === undefined ? (
          <div className="w-full flex flex-col justify-between 2xl:gap-6 lg:gap-2 gap-6 lg:justify-start max-w-[78%]  lg:px-0 lg:max-w-[65%] mx-auto flex-1 pt-1 lg:pt-0">
            <div className=" flex flex-col gap-6 lg:gap-4 2xl:gap-10 px-2">
              <div className=" ">
                <div className="flex gap-2">
                  <p className="card-label invisible text-grey-2  w-[15px] h-4 currencyfinder-1">
                    <CurrencyFinder />
                  </p>
                  <p className="card-label">Total value of Investment</p>
                </div>
                <div className=" flex gap-2 items-center">
                  <p className="text-grey-2 w-[15px] currencyfinder-1">
                    <CurrencyFinder />
                  </p>
                  <div className=" flex-1">
                    <NumberInput
                      type="number"
                      className="number-input-feild-h"
                      placeholder=""
                      name={"total_invested_value"}
                      error={error?.total_invested_value}
                      onChange={UpdateInput}
                      value={
                        allmodels?.total_invested_value
                          ? allmodels?.total_invested_value.toString()
                          : ""
                      }
                    />
                    {error.total_invested_value && (
                      <div className="please-feild-text">
                        * Please fill in this field
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=" ">
                <div className="flex gap-2">
                  <p className="card-label invisible w-[15px]">%</p>
                  <p className="card-label">Average Annual Returns</p>
                </div>

                <div className=" flex gap-2 items-center">
                  <p className="text-grey-2 currencyfinder-1 pb-3 w-[15px]">
                    %
                  </p>
                  <div className=" flex-1">
                    <NumberInput
                      type="number"
                      className="number-input-feild-h opacity-55"
                      tooltipId="lock"
                      name={"expected_average_annual_ror"}
                      step={"0.02"}
                      onChange={UpdateInput}
                      value={
                        allmodels?.expected_average_annual_ror
                          ? allmodels?.expected_average_annual_ror.toString()
                          : ""
                      }
                      disabledCheck={true}
                    />
                    <p className="enter-details-p mt-1 pl-0 lg:pl-1">
                      Doubles the value in {72 / allmodels?.average_inflation}{" "}
                      years
                    </p>
                    <Tooltip
                      id={"lock"}
                      backgroundColor={"#232E41"}
                      message="Upgrade to Next Level"
                      opacity={1}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:block  mx-auto flex flex-col md:flex-row mb-4 lg:mb-0 lg:px-0">
              <div className="flex flex-row lg:flex-col items-center justify-between gap-2">
                <Card_OR className=" md:mt-5 lg:mt-1 2xl:mt-5 " />
                <Gray_btn
                  className="w-fit md:mx-auto min-w-[68vw] md:mt-5 flex-1 md:hidden flex"
                  PreIcon={!details && diamond}
                  onClick={() => handleSecondToggleDetails(true)}
                  label={details ? "Enter Lumpsum" : "Enter Details"}
                  Icon={FaChevronRight}
                />
                <Gray_btn
                  className="w-fit lg:mx-auto 2xl:mt-5 lg:mt-3 md:mt-5 flex-1 hidden md:min-w-[16.5rem] lg:min-w-0 md:flex"
                  PreIcon={!details && diamond}
                  onClick={() => handleSecondToggleDetails(true)}
                  label={details ? "Enter Lumpsum" : "Enter Details"}
                  Icon={details ? FaChevronUp : FaChevronDown}
                />
              </div>
              <p className=" ms-9 lg:ms-0 enter-details-p mt-2 lg:mt-1 2xl:mt-2 md:pl-2 lg:pl-1 xl:pl-2 pl-0">
                Enter details to earn coins
              </p>
            </div>
          </div>
        ) : null}

        {details === true ? (
          <div className="w-full max-w-[434px] lg:max-w-[90%] mx-auto flex-1 flex">
            <div className=" flex flex-col  2xl:gap-5 lg:gap-2 max-md:gap-12  flex-1  justify-between md:justify-start">
              <Gray_btn
                className="w-fit mx-auto md:hidden hidden"
                PreIcon={!details && diamond}
                // onClick={() => handleSecondToggleDetails(false) }
                label={details ? "Enter Lumpsum" : "Enter Details"}
                Icon={details ? FaChevronUp : FaChevronDown}
              />
              <Gray_btn
                className="w-fit mx-auto 2xl:min-w-[15.5rem] lg:min-w-[12.5rem] lg:flex hidden"
                PreIcon={!details && diamond}
                onClick={() => handleSecondToggleDetails(false)}
                label={details ? "Enter Lumpsum" : "Enter Details"}
                Icon={details ? FaChevronUp : FaChevronDown}
              />

              <div className="max-w-[78%] lg:max-w-[90%] mx-auto w-full ">
                <div className=" w-full justify-between items-end flex text-grey-3 italic tracking-[-0.48px] lg:tracking-normal">
                  <div className="text-xs 2xl:text-sm font-normal ">
                    Instrument
                  </div>
                  <div className="text-xs 2xl:text-sm font-normal ">
                    Balance
                  </div>
                  <div className="text-xs 2xl:text-sm font-normal ">
                    Rate of <br />
                    Return
                  </div>
                </div>
                <div className="flex flex-col 2xl:gap-4 lg:gap-1.5 gap-2 mt-3 lg:mt-1 2xl:mt-4">
                  <Row_input
                    title={"Include Stocks, Equity Funds, ESOPs, etc."}
                    input_label="Equity"
                    rorName={"equity_ror"}
                    amtName={"equity_amount"}
                    error={error?.equity_amount}
                    percentValue={allmodels?.equity_ror}
                    amountValue={
                      allmodels?.equity_amount
                        ? allmodels?.equity_amount.toString()
                        : ""
                    }
                    onChange={UpdateInput}
                    CurrencyFinder={<CurrencyFinder />}
                    tooltipIdLabel={"EqualityLabel"}
                    LabelMessage={["Stocks", "Equity Funds", "ESOPs"]}
                    tooltipIdPercent={"EquityPercent"}
                    PercentMessage={
                      "Let’s work with these rates for now.You can change them later!"
                    }
                  />
                  <Row_input
                    title="Include Pension Accounts, Interest earning Deposits, Debt Funds, etc."
                    input_label="Bonds"
                    percentValue={allmodels?.bonds_ror}
                    rorName={"bonds_ror"}
                    error={error?.bond_amount}
                    amtName={"bond_amount"}
                    onChange={UpdateInput}
                    amountValue={
                      allmodels?.bond_amount
                        ? allmodels?.bond_amount.toString()
                        : ""
                    }
                    CurrencyFinder={<CurrencyFinder />}
                    tooltipIdLabel={"BondsLabel"}
                    LabelMessage={[
                      "Pension Accounts",
                      "Interest earning Deposits",
                      "Debt Funds",
                    ]}
                    tooltipIdPercent={"BondsPercent"}
                    PercentMessage={
                      "Let’s work with these rates for now.You can change them later!"
                    }
                  />
                  <Row_input
                    title="Include Bank Accounts, Liquid funds, Cash in Hand, etc."
                    className={"lg:gap-4"}
                    input_label="Cash"
                    percentValue={allmodels?.cash_ror}
                    rorName={"cash_ror"}
                    error={error?.cash_amount}
                    amtName={"cash_amount"}
                    onChange={UpdateInput}
                    amountValue={
                      allmodels?.cash_amount
                        ? allmodels?.cash_amount.toString()
                        : ""
                    }
                    CurrencyFinder={<CurrencyFinder />}
                    tooltipIdLabel={"CashLabe"}
                    LabelMessage={[
                      "Bank Accounts",
                      "Liquid funds",
                      "Cash in Hand",
                    ]}
                    tooltipIdPercent={"CashPercent"}
                    PercentMessage={
                      "Let’s work with these rates for now.You can change them later!"
                    }
                  />
                  <hr className="border-zinc-400 -mt-1 lg:mt-0" />

                  <div className=" flex justify-between items-center lg:mr-2 lg:gap-2">
                    <p className="text-blue-grey lg:text-grey-4 text-base lg:text-sm 2xl:text-lg tracking-[-0.32px] leading-5 font-extrabold  lg:font-semibold ">
                      Total
                    </p>

                    {/* visible in mobile */}
                    <div className=" flex gap-2 items-center text-blue-grey text-sm font-medium lg:hidden">
                      <p className="currencyfinder-1 ">
                        <CurrencyFinder />
                      </p>
                      <div className="flex-1 w-[151px] md:w-[151px] small-input-total-w overflow-x-hidden  pl-3 ">
                        <DisplayTotalAmount />
                        {/* {console.log(formatNumberWithCommas((allmodels?.equity_amount > 0 ? allmodels?.equity_amount : 0) + (allmodels?.bond_amount > 0 ? allmodels?.bond_amount : 0) + (allmodels?.cash_amount > 0 ? allmodels?.cash_amount : 0)))} */}
                      </div>
                      <div className="w-9 text-lg font-medium">
                        {Math.round(weightedAverage) ||
                          allmodels?.expected_average_annual_ror}
                        %
                      </div>
                    </div>

                    {/* visible in destop */}
                    <div className="hidden lg:flex items-center gap-2">
                      <span className="text-grey-4 currencyfinder-1 pr-1">
                        <CurrencyFinder />
                      </span>
                      <div className="py-1.5 px-0 display-total-amount-div">
                        <p className="">
                          {" "}
                          <DisplayTotalAmount />
                        </p>
                      </div>
                      <div className="items-center justify-end w-12 p-2 bg-zinc-300 bg-opacity-10 rounded-2xl input-border-none text-center flex text-dark-blue lg:w-[2.3rem]">
                        <input
                          placeholder="0"
                          type="number"
                          className=" w-full bg-transparent h-6 input-border-none text-center  text-gray-200 2xl:text-lg lg:text-sm flex-grow font-medium font-Work_Sans "
                          disabled
                          value={
                            Math.round(weightedAverage) ||
                            allmodels?.expected_average_annual_ror
                          }
                        />
                        <span
                          className="2xl:text-lg lg:text-sm leading-3 font-Work_Sans w-9"
                          style={{ color: "#B5B5B5" }}
                        >
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="flex justify-end relative mt-1 lg:mb-6">
                  <div className="text-center text-blue-grey lg:text-accent-bright-green text-opacity-60 2xl:text-[11px] lg:text-[9px] text-[11px] font-medium font-Montserrat absolute -right-3 italic">
                    Doubles the <br />
                    value in{" "}
                    {(
                      72 /
                      +(
                        (allmodels?.cash_ror +
                          allmodels?.bonds_ror +
                          allmodels?.equity_ror) /
                        3
                      )
                    ).toFixed(1)}{" "}
                    years
                  </div>
                </span>
              </div>

              <div className="md:mt-10 lg:hidden flex flex-col max-sm:min-w-[68vw]  w-full  mb-4">
                <div className="flex flex-row  items-center max-sm:min-w-[68vw] mx-auto gap-2">
                  <Card_OR className=" " />
                  <Gray_btn
                    className="w-fit md:mx-auto max-md:min-w-[68vw] md:min-w-[15.5rem] lg:mt-4 flex -1"
                    PreIcon={!details && diamond}
                    onClick={() => handleSecondToggleDetails(false)}
                    label={details ? "Enter Lumpsum" : "Enter Details"}
                    Icon={FaChevronRight}
                  />
                  {/* <Gray_btn className=' flex-1'
                                    PreIcon={!details && diamond}
                                    onClick={() => { changeDetails(pre => !pre) }}
                                    label={details ? 'Enter Lumpsum' : 'Enter Details'}
                                    Icon={details ? FaChevronUp : FaChevronDown}
                                /> */}
                </div>
                <p className="enter-details-p ms-20 md:ms-28 mt-2  pl-0 ">
                  Enter details to earn coins
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* ---------- */}
        {/* <div className="lg:block flex flex-col lg:flex-row mb-4 lg:mb-0 lg:px-0 ">
                <div className="flex flex-row md:flex-col items-center justify-between gap-2">
                <Card_OR className=' lg:mt-[14px] ' />
                <Gray_btn className='w-fit lg:mx-auto min-w-[200px] lg:mt-8 flex-1'
                  onClick={() =>handleToggleDetails(true)}
                  label={'Enter Details'}
                  Icon={FaChevronDown}
                />
                </div>
                <p className="text-[#8792A6] ms-8 text-opacity-60 text-[11px] font-medium font-['Montserrat'] leading-[14.52px] lg:text-accent-bright-green lg:font-medium lg:tracking-normal italic mt-3 lg:mt-2 pl-0 lg:pl-1">
                    Enter details to earn coins
                </p>
              </div> */}
        {/* ---------- */}
        <Card_footer
          className="max-md:mb-6 2xl:mt-5 lg:mt-2 card-footer-w"
          title="Next"
          BackonClick={() => {
            onHanleRestErrorState();
            handleNextClick(0);
          }}
          NextonClick={() => {
            onHanleRestErrorState();
            saveSecondCard();
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(Second_card);
