import React, { Component } from "react";
import { Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { } from "@fullcalendar/interaction";
import Alert from "sweetalert2";

class CalendarData extends Component {
   state = {
      calendarEvents: [
         {
            title: "Annual Meeting Envatos Community",
            start: new Date("2024-06-03 12:00"),
            end: new Date("2024-06-04 12:30"),
            id: "99999110",
         },
         {
            title: "Conference",
            start: new Date("2024-06-11 12:00"),
            end: new Date("2024-06-12 12:30"),
            id: "99999110",
         },
         {
            title: "Atlanta Monster",
            start: new Date("2024-06-15 00:00"),
            id: "99999997",
         },
         {
            title: "Birthday Party",
            start: new Date("2024-06-17 00:00"),
            id: "99999998",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2024-06-21 00:00"),
            id: "99999999",
         },
         {
            title: "Dinner",
            start: new Date("2024-06-29 10:00"),
            end: new Date("2024-06-30 12:30"),
            id: "99999110",
         },
         {
            title: "Conference",
            start: new Date("2024-07-11 12:00"),
            end: new Date("2024-07-12 12:30"),
            id: "99999110",
         },
         {
            title: "Atlanta Monster",
            start: new Date("2024-07-15 00:00"),
            id: "99999997",
         },
         {
            title: "Birthday Party",
            start: new Date("2024-07-17 00:00"),
            id: "99999998",
         },
         {
            title: "My Favorite Murder",
            start: new Date("2024-07-21 00:00"),
            id: "99999999",
         },
         {
            title: "Dinner",
            start: new Date("2024-07-29 10:00"),
            end: new Date("2024-07-30 12:30"),
            id: "99999110",
         },
      ],
      events: [
         { title: "Event 1", id: "1" },
         { title: "Event 2", id: "2" },
         { title: "Event 3", id: "3" },
         { title: "Event 4", id: "4" },
         { title: "Event 5", id: "5" },
      ],
   };

   
   eventClick = (eventClick) => {
      Alert.fire({
         title: eventClick.event.title,
         html:
            `<div className="table-responsive">
               <table className="table">
               <tbody>
               <tr >
               <td>Title</td>
               <td><strong>` +
            eventClick.event.title +
            `</strong></td>
               </tr>
               <tr >
               <td>Start Time</td>
               <td><strong>
               ` +
            eventClick.event.start +
            `
            </strong></td>
            </tr>
            </tbody>
            </table>
            </div>`,

         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Remove Event",
         cancelButtonText: "Close",
      }).then((result) => {
         if (result.value) {
            eventClick.event.remove(); 
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });
   };

   render() {
      return (

         <div className="row">
            <div className="col-xl-12">
               <div className="card dashboard-calendar">
                  <Card.Body>
                     <div className="fullcalendar" id="calendar">
                        <FullCalendar
                           defaultView="dayGridMonth"
                           headerToolbar={{
                              start: "prev,next today",
                              center: "title",
                              end:
                                 "dayGridMonth,timeGridWeek,timeGridDay",
                           }}
                           rerenderDelay={10}
                           eventDurationEditable={false}
                           editable={true}
                           droppable={true}
                           plugins={[
                              dayGridPlugin,
                              timeGridPlugin,
                              interactionPlugin,
                           ]}
                           ref={this.calendarComponentRef}
                           weekends={this.state.calendarWeekends}
                           events={this.state.calendarEvents}
                           eventDrop={this.drop}
                           // drop={this.drop}
                           eventReceive={this.eventReceive}
                           eventClick={this.eventClick}
                        // selectable={true}
                        />
                     </div>
                  </Card.Body>
               </div>
            </div>
         </div>

      );
   }
}

export default CalendarData;
