import { useEffect, useState } from "react";
import {rewarddiamond} from "./../../../../assets/Icons"
import { getData } from "../../../destop_L1/server";
 
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
const Rewardtable = () => {
    const [rewardTransaction,setRewardTransaction] =useState([])
  
      const fetchRewardTransaction = () => {
        getData('coins_transaction', (success) => {
          if (success.data.code === 200) {
            console.log(success.data.message, 'rewardTransaction');
            const formattedTransactions = success.data.message.map(transaction => {
              return {
                ...transaction,
                formattedDate: formatDate(transaction.created_date) // Assuming `date` is the date field
              };
            });
            setRewardTransaction(formattedTransactions);
            console.log(formattedTransactions, 'rewardTransaction');
          }
        }, (error) => {
          console.log(error, 'error');
        });
      };
      useEffect(() => {
        fetchRewardTransaction();
      }, [])
     
  return (
   
        <table >
            <thead  >
                <tr>
                    <th className="font-Montserrat text-[28px] max-md:text-lg font-extrabold text-white align-baseline text-left ">Date</th>
                    <th className="font-Montserrat text-[28px] max-md:text-lg font-extrabold text-white text-left pe-14">Transaction</th>
                    <th className="font-Montserrat text-[28px] max-md:text-lg font-extrabold text-white text-left">Coins</th>
                </tr>
            </thead>
            <tbody>
                {rewardTransaction?.map((item)=>{
                    return(
                        <tr key={item.id}>
                            <td className="font-Montserrat text-xl max-md:text-base font-medium text-[#B5B5B5] pe-14 pb-1 text-nowrap">{item?.formattedDate}</td>
                            <td className="font-Montserrat text-xl max-md:text-base font-medium text-[#B5B5B5]">{item.activity_name}</td>
                            <td className="flex items-center justify-center gap-1 font-Montserrat text-xl  max-md:text-base font-medium text-[#0F3A4D] bg-[#BCFBE4] rounded-[28px]  mt-[10px] max-md:px-3"> <img src={rewarddiamond} alt="" className="w-[30px] h-[30px] max-md:w-5 max-md:h-5"/>{item.coins_added}</td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>

  )
}
 
export default Rewardtable