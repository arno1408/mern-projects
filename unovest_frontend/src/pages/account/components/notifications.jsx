import React, { useState } from 'react'
import MyAccountCards from './MyAccountCards'
import MyAccountHead from './MyAccountHead'
import ToggleButton from './ToggleButton'
import MyAccountInput from './MyAccountInput'
import MyAccountSelect from './MyAccountSelect'
import { InputAdornment } from '@mui/material'

function Notifications() {
    const [notification, setNotification] = useState({
        notification_type:'SMS',
        notification_repeat:'SMS',
        reminder_date:'',
        notification_end:''
    });
    console.log(notification,'reminderdate');
    const NotificationType = ['SMS', 'Email'];
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        if(name=='reminder_date' || name=='notification_end'){
            console.log(name,"name");
            const formattedValue = name.includes('date') ? formatDate(value) : value;
            setNotification({
                ...notification,
                [name]: formattedValue
            });
        }
        setNotification(
         {
             ...notification,
             [name]: value
         }
        )  
    };
    
    // Function to format date in YYYY-MM-DD format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
 
    return (
        <>
            <div className='flex gap-9 mt-[52px] max-lg:flex-col max-md:mb-24 opacity-45'>
                <MyAccountCards className="flex flex-col gap-6 flex-grow basis-1/2 md:pe-[8%]">
                    <MyAccountHead className="mb-3">Notification Preferences</MyAccountHead>
                    <ToggleButton id="email_notification"  label="Email Notifications" />
                    <ToggleButton id="sms_notification"  label="SMS Notifications" />
                    <ToggleButton id="other_notification"  label="Email Notifications" />
                </MyAccountCards>

                <MyAccountCards className="flex flex-col gap-6 max-md:gap-4 md:pe-[8%] flex-grow basis-1/2">
                    <MyAccountHead>Reminder to Revisit</MyAccountHead>

                    <p className='my-account-desc'>Set a date to checkin with your future progress and we will remind you!</p>
                    <MyAccountInput id="reminder_date" label="Remind me on" type="date" classNameInput='md:w-full' value={notification.reminder_date}  onChangeHandler={inputChangeHandler}/>

                    <button className='h-[38px] w-max px-8 py-2 rounded-[30px] border border-slate-400 text-center text-slate-400 text-lg max-md:text-sm font-semibold font-["Montserrat"] leading-none' onClick={()=>alert("Repeat Reminder")} disabled='disable'>Repeat Reminder</button>

                    <MyAccountSelect id="notification_type" label="Remind me via" options={NotificationType}  classNameInput='md:w-full' value={notification.notification_type} onChangeHandler={inputChangeHandler}/>
                    <MyAccountSelect id="notification_repeat" label="Repeat Every" options={NotificationType}  classNameInput='md:w-full' value={notification.notification_repeat} onChangeHandler={inputChangeHandler} />
                    <MyAccountInput id="notification_end" label="End Repeat" type="date"  classNameInput='md:w-full' value={notification.notification_end} onChangeHandler={inputChangeHandler}/>
                    <button className='h-[38px] w-max px-8 py-2 rounded-[30px] border border-slate-400 text-center text-slate-400 text-lg max-md:text-sm font-semibold font-["Montserrat"] leading-none'onClick={()=>alert("Repeat Reminder")} disabled='disable'>Set One-time Reminder</button>

                </MyAccountCards>
            </div>
        </>
    )
}

export default Notifications
