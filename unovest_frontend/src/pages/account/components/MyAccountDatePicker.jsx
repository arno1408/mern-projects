import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import React, { useState } from 'react'
import dayjs from 'dayjs'

const MyAccountDatePicker = ({handleDateChange, minDate, selectedDate, popperWidth, className,classNameLabel,label,backgroundColor='white',maxDate}) => {
  const formattedDate = selectedDate ? dayjs(selectedDate) : null;

  const theme = responsiveFontSizes(
    createTheme({
      components: {
        MuiPickersDay: {
          styleOverrides: {
            root: {
              fontSize: '15px',
            }
          }
        }
      }
    })
  );
  return (
    <div className={`MyAccountDatePicker-conatiner ${className}`}>
         <label className={` MyAccountDatePicker-label ${classNameLabel}`}>{label}</label>
         <ThemeProvider theme={theme}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
              value={dayjs(selectedDate)}
              onChange={handleDateChange}
              maxDate={maxDate}
              minDate={minDate}
              renderInput={(params) => <TextField {...params} />}
              sx={{
                '& fieldset': { 
                  border: 'none', 
                },
                backgroundColor:{backgroundColor},
                borderRadius:'12px',
                width:"inherit",   
                // '@media (max-width: 600px)': { 
                //   padding:'-4px 0px',
                //   height:'40px',
                //   width:'98%'
                // }, 
              }}
             slotProps={{popper:{style:{width:popperWidth}}}}
              />
          </LocalizationProvider>
         </ThemeProvider> 
    </div>
  )
}

export default MyAccountDatePicker
