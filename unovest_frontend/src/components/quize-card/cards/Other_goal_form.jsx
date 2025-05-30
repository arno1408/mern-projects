import Add_btn from "../../Add_btn";
import Card_input from "../Card_input";
import Card_footer from "../Card_footer";
import NumberInput from "../NumberInput";
import { useSelector } from "react-redux";
import { IMAGEBACKENDURL } from "../../../Variable";

const Other_goal_form = ({
  onChange,
  title,
  data,
  handleNext,
  error,
  isGoalEditing = false,
  handleBack,
  addGaol,
  showAddGoalBtn,
  CurrencyFinder,
  errorMessage,
  onHandleRestErrorState,
}) => {
  const allmodels = useSelector((state) => state.Card_inputs);
  const icon = allmodels?.allgoals?.filter((list) => list.goal_name == title);

  return (
    <>
      <div className="goals-div lg:p-4">
        <div className="flex flex-col gap-3 lg:gap-5 lg:mx-0">
          <span
            className={`please-feild-text ${errorMessage ? " inline-block " : "hidden"}`}
          >
            * Please fill the highlighted fields
          </span>
          <p className="text-grey-2 lg:text-accent-bright-green text-xl  font-bold  leading-[28.80px] tracking-[-0.48px] flex">
            {icon && (
              <img
                src={`${IMAGEBACKENDURL}${icon[0]?.white_icon}`}
                alt="icon"
                className="lg:hidden me-2  w-4 h-4 lg:w-7 lg:h-7 mt-[6px]"
              />
            )}
            {title}
          </p>

          <div className="">
            <p className="card-label">Name of the Goal</p>
            <Card_input
              type="text"
              className="py-3 lg:py-[9px] 2xl:py-[10.5px] pl-4 pr-1"
              placeholder={
                title == "Property"
                  ? "eg- Home Purchase"
                  : title == "Wedding"
                    ? "eg- Daughter's Wedding"
                    : title == "Travel"
                      ? "eg-Singapore"
                      : title == "Vehicle"
                        ? "eg-Car Purchase"
                        : title == "Unique Experience"
                          ? "eg-Experience Beach"
                          : ""
              }
              name={"user_goal_name"}
              error={error?.user_goal_name}
              onChange={onChange}
              value={data?.user_goal_name}
            />
          </div>

          <div className="flex justify-between items-baseline ">
            <p className="card-label">Today’s Cost</p>
            <div className="flex items-baseline lg:items-center gap-2">
              <p className="lg:text-grey-2 text-grey-3 currencyfinder-1">
                {CurrencyFinder}
              </p>
              <div>
                <NumberInput
                  type="number"
                  className={`py-3 lg:py-[9px] 2xl:py-2  pl-4 pr-1 ${error?.purchase_year ? "max-w-[150px]" : "max-w-[120px]"} lg:max-w-[190px]`}
                  name={"cost_per_year"}
                  error={error?.cost_per_year}
                  onChange={onChange}
                  value={
                    data?.cost_per_year ? data?.cost_per_year.toString() : ""
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-baseline lg:items-center">
            <p className="card-label">Year of Purchase</p>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
              <Card_input
                type="number"
                className={`py-3 lg:py-[9px] 2xl:py-[10.5px] text-center ${error?.purchase_year ? "max-w-[140px]" : "max-w-[94px]"} lg:max-w-[94px]`}
                placeholder="YYYY"
                name={"purchase_year"}
                error={error?.purchase_year}
                onChange={onChange}
                value={data?.purchase_year}
              />
              {/* {error?.purchase_year && (
                                <div className="italic text-orange pt-0 lg:pt-2 max-w-[200px] lg:max-w-[88px] text-xs lg:text-base">
                                    * Please fill in this field
                                </div>
                            )} */}
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer-w goals-footer md:mb-8 lg:mb-0">
        {showAddGoalBtn && (
          <Add_btn
            label="Add New Goal"
            onClick={() => {
              addGaol();
            }}
          />
        )}
        <Card_footer
          title={isGoalEditing ? "Update & View" : "Next Goal"}
          BackonClick={() => {
            onHandleRestErrorState();
            handleBack();
          }}
          NextonClick={() => {
            onHandleRestErrorState();
            handleNext();
          }}
        />
      </div>
    </>
  );
};

export default Other_goal_form;
