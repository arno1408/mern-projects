import { delete_icon, pensil } from "../../assets/Icons";
import Card_footer from "./Card_footer";

const Goals_list = ({ goalsInfo, handleNextClick, setCardSection, selectedGoals,
    setselectedGoals, }) => {

    const groupedData = goalsInfo.reduce((group, item) => {
        const key = item.title;
        if (!group[key]) {
            group[key] = [];
        }
        group[key].push(item);
        return group;
    }, {});

    const handleClick = (item) => {
        const index = goalsInfo.findIndex(
            (goal) =>
                goal.title === item.title &&
                goal.user_goal_name === item.user_goal_name &&
                goal.purchase_year === item.purchase_year &&
                goal.cost_per_year === item.cost_per_year
        );

        console.log(`Clicked item index: ${index}`);
    };


    let ListCrad = ({ goal }) => {
        return (
            <div className="flex items-center justify-between  rounded-[20px] lg:py-4 px-5 py-4 gap-3  bg-grey-2 bg-opacity-20">
                <p className="tracking-[-0.32px] font-medium text-base text-accent-bright-green lg:text-grey-2 bg-transparent flex-1 input-border-none"
                >{goal.user_goal_name}</p>
                <span
                    onClick={() => editOnClick(goal)}
                    className=" cursor-pointer"><img src={pensil} alt="" srcSet="" />
                </span>
                <span
                    onClick={() => deleteOnClick(goal)}
                    className=" cursor-pointer"><img src={delete_icon} alt="" srcSet="" />
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="w-full max-w-[400px] mx-auto h-[324px] overflow-y-scroll pe-1">
                <div className="flex flex-col gap-2">
                    {selectedGoals?.map((item, dataIndex) =>
                        <div key={dataIndex} className="flex flex-col gap-2">
                            <p className="card-label">{item.goal_name}</p>
                            {item.user_data.map((userItem, index) => (
                                <div key={userItem.user_goal_name + index}  >
                                    {/* onClick={() => handleClick(userItem)} */}
                                    <ListCrad goal={userItem} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            <Card_footer className='w-full card-footer-w' title='View Goals'
                BackonClick={() => { setCardSection(2); }}
                NextonClick={() => { handleNextClick(5) }}
            />
        </>
    )
}

export default Goals_list
