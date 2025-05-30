import { delete_icon, gray_delete, gray_edit, pensil } from "../../assets/Icons"
import Tooltip from "../tooltip/Tooltip"
 
const Edit_goals = ({ name, obj, edit, deleteData }) => {
    const toolTipData = [{
        id: 1,
        tooltipId:'edit_loan',
        message: 'Edit Loan'
    },{
        id: 2,
        tooltipId:'delete_loan',
        message: 'Delete Loan'
    }]
    return (
        <>
            <div className="p-5 lg:p-4 lg:bg-grey-2 lg:bg-opacity-20 rounded-[15px] lg:rounded-[20px] border lg:border-none border-slate-600 shadow flex items-center justify-between gap-3">
                <p className="text-grey-2  font-normal text-sm md:text-base lg:font-semibold flex-1">{name}</p>
                <span data-tooltip-id="edit_loan" onClick={() => edit(obj.id)} className=" cursor-pointer "><img src={pensil} className="hidden lg:block" alt="" srcSet="" /><img src={gray_edit} className=" block lg:hidden" alt="" srcSet="" /></span>
                <span data-tooltip-id="delete_loan" onClick={() => deleteData(obj.id)} className=" cursor-pointer"><img src={delete_icon} className="hidden lg:block" alt="" srcSet="" /><img src={gray_delete} className="block lg:hidden" alt="" srcSet="" /></span>
               
            </div>
            {toolTipData.map((list) =>(
                <Tooltip
                    id={list.tooltipId}
                    message={list.message}
                    backgroundColor={'#232E41'}
                    opacity={1}
                />
            ))}
         
        </>
    )
}
 
export default Edit_goals