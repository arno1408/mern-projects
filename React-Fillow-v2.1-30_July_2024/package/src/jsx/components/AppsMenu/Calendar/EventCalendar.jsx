import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";

class EventCalendar extends Component {
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

   /**
    * adding dragable properties to external events through javascript
    */
   componentDidMount() {
      let draggableEl = document.getElementById("external-events");
      new Draggable(draggableEl, {
         itemSelector: ".fc-event",
         eventData: function (eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("data");
            return {
               title: title,
               id: id,
            };
         },
      });
   }

   /**
    * when we click on event we are displaying event details
    */
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
            eventClick.event.remove(); // It will remove event from the calendar
            Alert.fire("Deleted!", "Your Event has been deleted.", "success");
         }
      });
   };

   render() {
      return (
         <div className="animated fadeIn demo-app">
            <Row>
               <Col lg={3}>
                  <Card>
                     <div className="card-header border-0 pb-0">
                        <h4 className="text-black fs-20 mb-0">Events</h4>
                     </div>
                     <Card.Body>
                        <div id="external-events">
                           {this.state.events.map((event) => (
                              <div
                                 className="fc-event mt-0 ms-0 mb-2 btn btn-block btn-primary"
                                 title={event.title}
                                 data={event.id}
                                 key={event.id}
                              >
                                 {event.title}
                              </div>
                           ))}
                        </div>
                     </Card.Body>
                  </Card>
               </Col>

               <Col lg={9}>
                  <Card>
                     <Card.Body>
                        <div className="demo-app-calendar" id="mycalendartest">
                           <FullCalendar
                              defaultView="dayGridMonth"
                              header={{
                                 left: "prev,next today",
                                 center: "title",
                                 right:
                                    "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
                  </Card>
               </Col>
            </Row>
         </div>
      );
   }
}

export default EventCalendar;
