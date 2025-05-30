import Earnreward from "./Earnreward"
import Earn from './Earn';
import Benefit from './Benefit';
import lock from './../../../../assets/Icons/reward_lock.png'
import addDetails from './../../../../assets/Icons/add_details.png'
import addGoal from './../../../../assets/Icons/add_goal.png'
import userInvite from './../../../../assets/Icons/User_invite.png'
import Rewardtable from './Rewardtable';
import ProgressBarCirculer from '../../../../components/circularProgressBar/ProgressBarCirculer';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData, getWithoutAuth2 } from "../../../destop_L1/server";
import { rewarddiamond } from "./../../../../assets/Icons"
import {premium} from "./../../../../assets/images/index"




const handelclick = () => {
  alert('button click!')
}

const Myrewards = () => {
  let financialDetails = useSelector((state) => state?.financialFreedomData)
  const financialFreedom = financialDetails;
  const [referralMaster, setReferralMaster] = useState();
  const [rewardBalance, setRewardBalance] = useState([]);
  const userdetail = JSON.parse(localStorage.getItem('userdetails'))


  const fetchRewardBalance = () => {

    getData('usercoins', (success) => {
      if (success.data.code === 200) {
        setRewardBalance(success.data.message)
        console.log(rewardBalance[0]?.total_coins,'rewardbalance');
      }
    }, (error) => {
      console.log(error, 'error');
    })
  }

  const fetchRefferalMaster = () => {

    getWithoutAuth2('referral_coins_master', success => {
      if (success.data.code === 200) {
        console.log(success.data.message,'referral_coins');
        setReferralMaster(success.data.message)
      }
    }, error => {
      console.log(error.message);
    })
  }
  useEffect(() => {
    fetchRewardBalance();
    fetchRefferalMaster();
  }, [])
  let data = [{ image: userInvite, number: referralMaster?.length > 0 && referralMaster[0]?.referral_coins, heading: 'Invite', para: '1 Friend' },
  { image: userInvite, number: '1K', heading: 'Bonus', para: 'Invite 10 Friends' },
  { image: userInvite, number: '1L', heading: 'Bonus', para: 'Invite 100 Friends' }
  ];

  let newdata = [{ image: addGoal, number: userdetail?.coinmaster[6]?.coins, heading: 'Add Goal', para: 'More coins for each added goal' },
  { image: addDetails, number: userdetail?.coinmaster[3]?.coins, heading: 'Add Details', para: 'Instead of lumpsums, add Breakdowns in Basecamp' },
  { image: lock, number: userdetail?.coinmaster[7]?.coins, heading: 'Complete Basecamp', para: 'View Money Matters' }
  ];
  let reward = [{ number: '-250', heading: 'Unlock My Powers' },
  { number: '-500', heading: 'Upgrade to Summit for 1 Day' },
  { number: '-1000', heading: 'Upgrade to Summit for 1 Week' }
  ];

  let tabledata = [{ date: '24 March 2020', transaction: 'Friend Referral', coins: 300 },
  { date: '24 March 2020', transaction: 'Quiz Completion', coins: 300 },
  { date: '24 March 2020', transaction: 'Upgrade (2 days)', coins: 300 },
  { date: '24 March 2020', transaction: 'Friend Referral', coins: 300 },
  { date: '24 March 2020', transaction: 'Upgrade (1 Week)', coins: 300 },
  { date: '24 March 2020', transaction: 'my Powers', coins: 300 },
  ]


  return (
    <>
      <section className="mb-5  mx-auto  mt-5">
        <div className="MyRewards-Container ">
          <h2 className="text-dark-blue MyRewards-Heading custom-shadow ">My Rewards</h2>
          <div className='MyRewards-ProgressbarContainer'>
            <div className="md:w-[377px]   m-auto  relative">
              <p className="MyRewards-TotalCoins"><img src={rewarddiamond} className="mt-2" alt="diamond" />{rewardBalance[0]?.total_coins}</p>
              <div className="">
              <ProgressBarCirculer
                percentage1={financialFreedom?.networth?.equityToAssets} percentage2={financialFreedom?.networth?.cashToAssets}
                circle1={"#67EAB3"} circle2={"#4196BA"}
                className="hidden"
              />
              </div>
            </div>
            <div className='items-center '>
              <h4 className='MyRewards-SubHeading mt-5 mb-12 text-center md:text-start'>Current Rewards Balance</h4>
              <p className='MyRewards-text'>Need 270 coins to Upgrade to Level 2 </p>
              <p className='MyRewards-text lg:mb-12  mb-7'>Need 570 coins to unlock 7 days of Level 2 Access</p>
              <button className='Redeem-btn' onClick={handelclick}><img src={premium} alt="icon" className='w-6 ' /> Redeem & Upgrade</button>
            </div>
          </div>
        </div>
        <div className='MyRewards-Container lg:gap-9   flex flex-wrap xl:flex-nowrap box-border justify-center lg:justify-between'>
          <div className=" mt-10 xl:mt-12 rounded-[30px] bg-gray-700  p-12 max-md:p-8 m-auto md:w-max">
            <h3 className='MyRewards-SubHeading'> Earn Rewards</h3>
            <div className='md:flex flex-wrap bg-[#393b4b] gap-4 md:w-max p-6 md:p-4 rounded-2xl mt-9'>
              <Earnreward alldata={data} />
            </div>
            <div className='md:flex flex-nowrap gap-4 mt-[60px] px-9'>
              <Earn datas={newdata} />
            </div>
          </div>
          <div className=' mt-12 w-screen sm:w-[600px] md:w-[700px] lg:w-[1010px] xl:w-[1260px] mx-auto  max-md:mb-10'>
            <div className='bg-gray-700 p-9 max-md:p-14 py-12  rounded-[30px]  pb-[60px] w-fit m-auto xl:m-0  '>
              <h3 className='MyRewards-SubHeading mb-8'>Reward Benefits</h3>
              <div className='md:flex  gap-4 box-border'>
                <Benefit rewards={reward} />
              </div>
            </div>
            <div className='bg-gray-700 p-12 rounded-[30px] md:w-fit  mt-[3.1rem] mb-5 md:mb-0 max-md:mx-5 mx-auto xl:mx-0 '>
              <h3 className='MyRewards-SubHeading mb-8'>Rewards History </h3>
              <div className='overflow-x-auto overflow-y-auto h-72  max-w-fit scrollbar-hide'>
                <Rewardtable />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Myrewards