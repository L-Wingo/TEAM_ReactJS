// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
// import {
//   Button,
//   Datepicker,
//   Dropdown,
//   Eventcalendar,
//   Input,
//   Popup,
//   Segmented,
//   SegmentedGroup,
//   setOptions,
//   Snackbar,
//   Switch,
//   Textarea,
// } from '@mobiscroll/react';
// import { useCallback, useMemo, useRef, useState } from 'react';

// setOptions({
//   theme: 'ios',
//   themeVariant: 'light'
// });

// const defaultEvents = [
//   {
//     id: 1,
//     start: '2024-11-08T13:00',
//     end: '2024-11-08T13:45',
//     title: "Lunch @ Butcher's",
//     description: '',
//     allDay: false,
//     bufferBefore: 15,
//     free: true,
//     color: '#009788',
//   },
//   {
//     id: 2,
//     start: '2024-11-26T15:00',
//     end: '2024-11-26T16:00',
//     title: 'Conference',
//     description: '',
//     allDay: false,
//     bufferBefore: 30,
//     free: false,
//     color: '#ff9900',
//   },
//   {
//     id: 3,
//     start: '2024-11-25T18:00',
//     end: '2024-11-25T22:00',
//     title: 'Site Visit',
//     description: '',
//     allDay: false,
//     bufferBefore: 60,
//     free: true,
//     color: '#3f51b5',
//   },
//   {
//     id: 4,
//     start: '2024-11-27T10:30',
//     end: '2024-11-27T11:30',
//     title: 'Stakeholder mtg.',
//     description: '',
//     allDay: false,
//     free: false,
//     color: '#f44437',
//   },
// ];

// const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];

// function App() {
//   const [myEvents, setMyEvents] = useState(defaultEvents);
//   const [tempEvent, setTempEvent] = useState(null);
//   const [undoEvent, setUndoEvent] = useState(null);
//   const [isOpen, setOpen] = useState(false);
//   const [isEdit, setEdit] = useState(false);
//   const [anchor, setAnchor] = useState(null);
//   const [start, startRef] = useState(null);
//   const [end, endRef] = useState(null);
//   const [popupEventTitle, setTitle] = useState('');
//   const [popupEventDescription, setDescription] = useState('');
//   const [popupEventAllDay, setAllDay] = useState(true);
//   const [popupTravelTime, setTravelTime] = useState(0);
//   const [popupEventDate, setDate] = useState([]);
//   const [popupEventStatus, setStatus] = useState('busy');
//   const [colorPickerOpen, setColorPickerOpen] = useState(false);
//   const [colorAnchor, setColorAnchor] = useState(null);
//   const [selectedColor, setSelectedColor] = useState('');
//   const [tempColor, setTempColor] = useState('');
//   const [isSnackbarOpen, setSnackbarOpen] = useState(false);

//   const calInst = useRef();
//   const colorPicker = useRef();

//   const myView = useMemo(() => ({ calendar: { labels: true } }), []);

//   const colorButtons = useMemo(
//     () => [
//       'cancel',
//       {
//         text: 'Set',
//         keyCode: 'enter',
//         handler: () => {
//           setSelectedColor(tempColor);
//           setColorPickerOpen(false);
//         },
//         cssClass: 'mbsc-popup-button-primary',
//       },
//     ],
//     [tempColor],
//   );

//   const colorResponsive = useMemo(
//     () => ({
//       medium: {
//         display: 'anchored',
//         touchUi: false,
//         buttons: [],
//       },
//     }),
//     [],
//   );

//   const snackbarButton = useMemo(
//     () => ({
//       action: () => {
//         setMyEvents((prevEvents) => [...prevEvents, undoEvent]);
//       },
//       text: 'Undo',
//     }),
//     [undoEvent],
//   );

//   const handleSnackbarClose = useCallback(() => {
//     setSnackbarOpen(false);
//   }, []);

//   const saveEvent = useCallback(() => {
//     const newEvent = {
//       id: tempEvent.id,
//       title: popupEventTitle,
//       description: popupEventDescription,
//       start: popupEventDate[0],
//       end: popupEventDate[1],
//       allDay: popupEventAllDay,
//       bufferBefore: popupTravelTime,
//       status: popupEventStatus,
//       color: tempEvent.color,
//     };
//     if (isEdit) {
//       // update the event in the list
//       const index = myEvents.findIndex((x) => x.id === tempEvent.id);
//       const newEventList = [...myEvents];

//       newEventList.splice(index, 1, newEvent);
//       setMyEvents(newEventList);
//       // here you can update the event in your storage as well
//       // ...
//     } else {
//       // add the new event to the list
//       setMyEvents([...myEvents, newEvent]);
//       // here you can add the event to your storage as well
//       // ...
//     }
//     calInst.current.navigateToEvent(newEvent);
//     // close the popup
//     setOpen(false);
//   }, [
//     isEdit,
//     myEvents,
//     popupEventAllDay,
//     popupEventDate,
//     popupEventDescription,
//     popupEventStatus,
//     popupEventTitle,
//     popupTravelTime,
//     tempEvent,
//   ]);

//   const deleteEvent = useCallback(
//     (event) => {
//       setMyEvents(myEvents.filter((item) => item.id !== event.id));
//       setUndoEvent(event);
//       setTimeout(() => {
//         setSnackbarOpen(true);
//       });
//     },
//     [myEvents],
//   );

//   const loadPopupForm = useCallback((event) => {
//     setTitle(event.title);
//     setDescription(event.description);
//     setDate([event.start, event.end]);
//     setAllDay(event.allDay || false);
//     setTravelTime(event.bufferBefore || 0);
//     setStatus(event.status || 'busy');
//     setSelectedColor(event.color || '');
//   }, []);

//   const titleChange = useCallback((ev) => {
//     setTitle(ev.target.value);
//   }, []);

//   const descriptionChange = useCallback((ev) => {
//     setDescription(ev.target.value);
//   }, []);

//   const allDayChange = useCallback((ev) => {
//     setAllDay(ev.target.checked);
//   }, []);

//   const travelTimeChange = useCallback((ev) => {
//     setTravelTime(ev.target.value);
//   }, []);

//   const dateChange = useCallback((args) => {
//     setDate(args.value);
//   }, []);

//   const statusChange = useCallback((ev) => {
//     setStatus(ev.target.value);
//   }, []);

//   const onDeleteClick = useCallback(() => {
//     deleteEvent(tempEvent);
//     setOpen(false);
//   }, [deleteEvent, tempEvent]);

//   const onEventClick = useCallback(
//     (args) => {
//       setEdit(true);
//       setTempEvent({ ...args.event });
//       // fill popup form with event data
//       loadPopupForm(args.event);
//       setAnchor(args.domEvent.target);
//       setOpen(true);
//     },
//     [loadPopupForm],
//   );

//   const onEventCreated = useCallback(
//     (args) => {
//       setEdit(false);
//       setTempEvent(args.event);
//       // fill popup form with event data
//       loadPopupForm(args.event);
//       setAnchor(args.target);
//       // open the popup
//       setOpen(true);
//     },
//     [loadPopupForm],
//   );

//   const onEventDeleted = useCallback(
//     (args) => {
//       deleteEvent(args.event);
//     },
//     [deleteEvent],
//   );

//   const onEventUpdated = useCallback(() => {
//     // here you can update the event in your storage as well, after drag & drop or resize
//     // ...
//   }, []);

//   const controls = useMemo(() => (popupEventAllDay ? ['date'] : ['datetime']), [popupEventAllDay]);
//   const datepickerResponsive = useMemo(
//     () =>
//       popupEventAllDay
//         ? {
//             medium: {
//               controls: ['calendar'],
//               touchUi: false,
//             },
//           }
//         : {
//             medium: {
//               controls: ['calendar', 'time'],
//               touchUi: false,
//             },
//           },
//     [popupEventAllDay],
//   );

//   const headerText = useMemo(() => (isEdit ? 'Edit event' : 'New Event'), [isEdit]);
//   const popupButtons = useMemo(() => {
//     if (isEdit) {
//       return [
//         'cancel',
//         {
//           handler: () => {
//             saveEvent();
//           },
//           keyCode: 'enter',
//           text: 'Save',
//           cssClass: 'mbsc-popup-button-primary',
//         },
//       ];
//     } else {
//       return [
//         'cancel',
//         {
//           handler: () => {
//             saveEvent();
//           },
//           keyCode: 'enter',
//           text: 'Add',
//           cssClass: 'mbsc-popup-button-primary',
//         },
//       ];
//     }
//   }, [isEdit, saveEvent]);

//   const popupResponsive = useMemo(
//     () => ({
//       medium: {
//         display: 'anchored',
//         width: 400,
//         fullScreen: false,
//         touchUi: false,
//       },
//     }),
//     [],
//   );

//   const onClose = useCallback(() => {
//     if (!isEdit) {
//       // refresh the list, if add popup was canceled, to remove the temporary event
//       setMyEvents([...myEvents]);
//     }
//     setOpen(false);
//   }, [isEdit, myEvents]);

//   const selectColor = useCallback((color) => {
//     setTempColor(color);
//   }, []);

//   const openColorPicker = useCallback(
//     (ev) => {
//       selectColor(selectedColor || '');
//       setColorAnchor(ev.currentTarget);
//       setColorPickerOpen(true);
//     },
//     [selectColor, selectedColor],
//   );

//   const changeColor = useCallback(
//     (ev) => {
//       const color = ev.currentTarget.getAttribute('data-value');
//       selectColor(color);
//       if (!colorPicker.current.s.buttons.length) {
//         setSelectedColor(color);
//         setColorPickerOpen(false);
//       }
//     },
//     [selectColor, setSelectedColor],
//   );

//   return (
//     <>
//       <Eventcalendar
//         clickToCreate={true}
//         dragToCreate={true}
//         dragToMove={true}
//         dragToResize={true}
//         data={myEvents}
//         ref={calInst}
//         view={myView}
//         onEventClick={onEventClick}
//         onEventCreated={onEventCreated}
//         onEventDeleted={onEventDeleted}
//         onEventUpdated={onEventUpdated}
//       />
//       <Popup
//         display="bottom"
//         fullScreen={true}
//         contentPadding={false}
//         headerText={headerText}
//         anchor={anchor}
//         buttons={popupButtons}
//         isOpen={isOpen}
//         onClose={onClose}
//         responsive={popupResponsive}
//       >
//         <div className="mbsc-form-group">
//           <Input label="Title" value={popupEventTitle} onChange={titleChange} />
//           <Textarea label="Description" value={popupEventDescription} onChange={descriptionChange} />
//         </div>
//         <div className="mbsc-form-group">
//           <Switch label="All-day" checked={popupEventAllDay} onChange={allDayChange} />
//           <Input ref={startRef} label="Starts" />
//           <Input ref={endRef} label="Ends" />
//           {!popupEventAllDay && (
//             <div id="travel-time-group">
//               <Dropdown label="Travel time" value={popupTravelTime} onChange={travelTimeChange}>
//                 <option value="0">None</option>
//                 <option value="5">5 minutes</option>
//                 <option value="15">15 minutes</option>
//                 <option value="30">30 minutes</option>
//                 <option value="60">1 hour</option>
//                 <option value="90">1.5 hours</option>
//                 <option value="120">2 hours</option>
//               </Dropdown>
//             </div>
//           )}
//           <Datepicker
//             select="range"
//             display="anchored"
//             controls={controls}
//             touchUi={true}
//             startInput={start}
//             endInput={end}
//             showRangeLabels={false}
//             responsive={datepickerResponsive}
//             onChange={dateChange}
//             value={popupEventDate}
//           />
//           <div onClick={openColorPicker} className="event-color-c">
//             <div className="event-color-label">Color</div>
//             <div className="event-color" style={{ background: selectedColor }}></div>
//           </div>
//           <SegmentedGroup onChange={statusChange}>
//             <Segmented value="busy" checked={popupEventStatus === 'busy'}>
//               Show as busy
//             </Segmented>
//             <Segmented value="free" checked={popupEventStatus === 'free'}>
//               Show as free
//             </Segmented>
//           </SegmentedGroup>
//           {isEdit ? (
//             <div className="mbsc-button-group">
//               <Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>
//                 Delete event
//               </Button>
//             </div>
//           ) : null}
//         </div>
//       </Popup>
//       <Popup
//         display="bottom"
//         contentPadding={false}
//         showArrow={false}
//         showOverlay={false}
//         anchor={colorAnchor}
//         isOpen={colorPickerOpen}
//         buttons={colorButtons}
//         responsive={colorResponsive}
//         ref={colorPicker}
//       >
//         <div className="crud-color-row">
//           {colors.map((color, index) =>
//             index < 5 ? (
//               <div
//                 key={index}
//                 onClick={changeColor}
//                 className={'crud-color-c ' + (tempColor === color ? 'selected' : '')}
//                 data-value={color}
//               >
//                 <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
//               </div>
//             ) : null,
//           )}
//         </div>
//         <div className="crud-color-row">
//           {colors.map((color, index) =>
//             index >= 5 ? (
//               <div
//                 key={index}
//                 onClick={changeColor}
//                 className={'crud-color-c ' + (tempColor === color ? 'selected' : '')}
//                 data-value={color}
//               >
//                 <div className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check" style={{ background: color }}></div>
//               </div>
//             ) : null,
//           )}
//         </div>
//       </Popup>
//       <Snackbar isOpen={isSnackbarOpen} message="Event deleted" button={snackbarButton} onClose={handleSnackbarClose} />
//     </>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29" },
//   { title: "Event 2", date: "2024-12-01" },
//   { title: "Event 3", date: "2024-12-05" }
// ];

// const App = () => {
//   const [events, setEvents] = useState(initialEvents);

//   const handleEventClick = (info) => {
//     alert("Event: " + info.event.title);
//   };

//   const handleDateClick = (info) => {
//     alert("Date clicked: " + info.dateStr);
//   };

//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//       />
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import './App.css'

// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29" },
//   { title: "Event 2", date: "2024-12-01" },
//   { title: "Event 3", date: "2024-12-05" }
// ];

// const App = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const handleEventClick = (info) => {
//     const eventTitle = info.event.title;
//     if (window.confirm(`Are you sure you want to delete the event: ${eventTitle}?`)) {
//       setEvents(events.filter(event => event.title !== eventTitle));
//     }
//   };
//   const handleDateClick = (info) => {
//     const newEventTitle = prompt("Enter the event title:");
//     if (newEventTitle) {
//       const newEvent = {
//         title: newEventTitle,
//         date: info.dateStr,
//       };
//       setEvents([...events, newEvent]);
//     }
//   };

//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };

//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//       />
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29T10:00:00" },
//   { title: "Event 2", date: "2024-12-01T12:00:00" },
//   { title: "Event 3", date: "2024-12-05T14:00:00" }
// ];
// const App = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const handleEventClick = (info) => {
//     const eventTitle = info.event.title;
//     if (window.confirm(`Are you sure you want to delete the event: ${eventTitle}?`)) {
//       setEvents(events.filter(event => event.title !== eventTitle));
//     }
//   };
//   const handleDateClick = (info) => {
//     const newEventTitle = prompt("Enter the event title:");
//     if (newEventTitle) {
//       const newEvent = {
//         title: newEventTitle,
//         date: info.dateStr,
//       };
//       setEvents([...events, newEvent]);
//     }
//   };
//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };
//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridWeek"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//         eventTimeFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           meridiem: 'short'
//         }}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'timeGridWeek,dayGridMonth'
//         }}
//       />
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import 'bootstrap/dist/css/bootstrap.min.css';
// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29T10:00:00" },
//   { title: "Event 2", date: "2024-12-01T12:00:00" },
//   { title: "Event 3", date: "2024-12-05T14:00:00" }
// ];
// const App = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [eventDetails, setEventDetails] = useState({ title: "", date: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventToEdit, setEventToEdit] = useState(null);
//   const handleEventClick = (info) => {
//     setEventToEdit(info.event);
//     setEventDetails({
//       title: info.event.title,
//       date: info.event.startStr,
//     });
//     setIsEditing(true);
//     setModalVisible(true);
//   };
//   const handleDateClick = (info) => {
//     setEventDetails({ title: "", date: info.dateStr });
//     setIsEditing(false);
//     setModalVisible(true);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails({
//       ...eventDetails,
//       [name]: value,
//     });
//   };
//   const handleSaveEvent = () => {
//     if (isEditing) {
//       const updatedEvents = events.map((event) =>
//         event.title === eventToEdit.title
//           ? { ...event, title: eventDetails.title, date: eventDetails.date }
//           : event
//       );
//       setEvents(updatedEvents);
//     } else {
//       const newEvent = {
//         title: eventDetails.title,
//         date: eventDetails.date,
//       };
//       setEvents([...events, newEvent]);
//     }
//     setModalVisible(false);
//   };
//   const handleDeleteEvent = () => {
//     if (eventToEdit) {
//       const updatedEvents = events.filter(
//         (event) => event.title !== eventToEdit.title
//       );
//       setEvents(updatedEvents);
//     }
//     setModalVisible(false);
//   };
//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };
//   return (
//     <div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="timeGridWeek"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//         eventTimeFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           meridiem: 'short'
//         }}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'timeGridWeek,dayGridMonth'
//         }}
//       />
//       <div
//         className={`modal fade ${modalVisible ? "show" : ""}`}
//         style={{ display: modalVisible ? "block" : "none" }}
//         tabIndex="-1"
//         aria-labelledby="eventModalLabel"
//         aria-hidden={!modalVisible}
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="eventModalLabel">
//                 {isEditing ? "Edit Event" : "Add New Event"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => setModalVisible(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label htmlFor="eventTitle" className="form-label">
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="eventTitle"
//                   name="title"
//                   value={eventDetails.title}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventDate" className="form-label">
//                   Event Date
//                 </label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   id="eventDate"
//                   name="date"
//                   value={eventDetails.date}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               {isEditing && (
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setModalVisible(false)}
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSaveEvent}
//               >
//                 {isEditing ? "Save Changes" : "Add Event"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default App;

// import React, { useState } from "react";
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29T10:00:00", backgroundColor: "#ff9f89" },
//   { title: "Event 2", date: "2024-12-01T12:00:00", backgroundColor: "#ffcd56" },
//   { title: "Event 3", date: "2024-12-05T14:00:00", backgroundColor: "#56e39f" }
// ];

// const App = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [eventDetails, setEventDetails] = useState({ title: "", date: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventToEdit, setEventToEdit] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const handleEventClick = (info) => {
//     setEventToEdit(info.event);
//     setEventDetails({
//       title: info.event.title,
//       date: info.event.startStr,
//       backgroundColor: info.event.backgroundColor,
//     });
//     setIsEditing(true);
//     setModalVisible(true);
//   };
//   const handleDateClick = (info) => {
//     setEventDetails({ title: "", date: info.dateStr, backgroundColor: "#ff9f89" });
//     setIsEditing(false);
//     setModalVisible(true);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails({
//       ...eventDetails,
//       [name]: value,
//     });
//   };
//   const handleSaveEvent = () => {
//     if (isEditing) {
//       const updatedEvents = events.map((event) =>
//         event.title === eventToEdit.title
//           ? { ...event, title: eventDetails.title, date: eventDetails.date, backgroundColor: eventDetails.backgroundColor }
//           : event
//       );
//       setEvents(updatedEvents);
//     } else {
//       const newEvent = {
//         title: eventDetails.title,
//         date: eventDetails.date,
//         backgroundColor: eventDetails.backgroundColor,
//       };
//       setEvents([...events, newEvent]);
//     }
//     setModalVisible(false);
//   };
//   const handleDeleteEvent = () => {
//     if (eventToEdit) {
//       const updatedEvents = events.filter(
//         (event) => event.title !== eventToEdit.title
//       );
//       setEvents(updatedEvents);
//     }
//     setModalVisible(false);
//   };
//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };
//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };
//   return (
//     <div className={isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}>
//       <div className="container py-3">
//         <button className="btn btn-secondary mb-3" onClick={toggleDarkMode}>
//           Toggle {isDarkMode ? "Light" : "Dark"} Mode
//         </button>
//       </div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//         eventTimeFormat={{
//           hour: '2-digit',
//           minute: '2-digit',
//           meridiem: 'short'
//         }}
//         headerToolbar={{
//           left: 'prev,next today',
//           center: 'title',
//           right: 'dayGridMonth,timeGridWeek,dayGridYear',
//         }}
//       />
//       <div
//         className={`modal fade ${modalVisible ? "show" : ""}`}
//         style={{ display: modalVisible ? "block" : "none" }}
//         tabIndex="-1"
//         aria-labelledby="eventModalLabel"
//         aria-hidden={!modalVisible}
//       >
//         <div className={`modal-dialog ${isDarkMode ? "modal-dark" : "modal-light"}`}>
//           <div className={`modal-content ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
//             <div className="modal-header">
//               <h5 className="modal-title" id="eventModalLabel">
//                 {isEditing ? "Edit Event" : "Add New Event"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close bg-danger "
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => setModalVisible(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label htmlFor="eventTitle" className="form-label">
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="eventTitle"
//                   name="title"
//                   value={eventDetails.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventDate" className="form-label">
//                   Event Date
//                 </label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   id="eventDate"
//                   name="date"
//                   value={eventDetails.date}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventColor" className="form-label">
//                   Event Background Color
//                 </label>
//                 <input
//                   type="color"
//                   className="form-control"
//                   id="eventColor"
//                   name="backgroundColor"
//                   value={eventDetails.backgroundColor}
//                   onChange={handleInputChange}
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               {isEditing && (
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setModalVisible(false)}
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSaveEvent}
//               >
//                 {isEditing ? "Save Changes" : "Add Event"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default App;

// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import "bootstrap/dist/css/bootstrap.min.css";
// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29T10:00:00", backgroundColor: "#ff9f89" },
//   { title: "Event 2", date: "2024-12-01T12:00:00", backgroundColor: "#ffcd56" },
//   { title: "Event 3", date: "2024-12-05T14:00:00", backgroundColor: "#56e39f" },
// ];
// const App = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [eventDetails, setEventDetails] = useState({
//     title: "",
//     date: "",
//     backgroundColor: "#0d6efd",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventToEdit, setEventToEdit] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const handleEventClick = (info) => {
//     setEventToEdit(info.event);
//     setEventDetails({
//       title: info.event.title,
//       date: info.event.startStr,
//       backgroundColor: info.event.backgroundColor,
//     });
//     setIsEditing(true);
//     setModalVisible(true);
//   };
//   const handleDateClick = (info) => {
//     setEventDetails({
//       title: "",
//       date: info.dateStr,
//       backgroundColor: "#0d6efd",
//     });
//     setIsEditing(false);
//     setModalVisible(true);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails({
//       ...eventDetails,
//       [name]: value,
//     });
//   };
//   const handleSaveEvent = () => {
//     if (!eventDetails.title.trim()) {
//       alert("Event title is required!");
//       return;
//     }
//     if (isEditing) {
//       const updatedEvents = events.map((event) =>
//         event.title === eventToEdit.title
//           ? {
//               ...event,
//               title: eventDetails.title,
//               date: eventDetails.date,
//               backgroundColor: eventDetails.backgroundColor,
//             }
//           : event
//       );
//       setEvents(updatedEvents);
//     } else {
//       const newEvent = {
//         title: eventDetails.title,
//         date: eventDetails.date,
//         backgroundColor: eventDetails.backgroundColor,
//       };
//       setEvents([...events, newEvent]);
//     }
//     setModalVisible(false);
//   };
//   const handleDeleteEvent = () => {
//     if (eventToEdit) {
//       const updatedEvents = events.filter(
//         (event) => event.title !== eventToEdit.title
//       );
//       setEvents(updatedEvents);
//     }
//     setModalVisible(false);
//   };
//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };
//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };
//   return (
//     <div className={isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}>
//       <div className="container py-3">
//         <button className="btn btn-secondary mb-3" onClick={toggleDarkMode}>
//           Toggle {isDarkMode ? "Light" : "Dark"} Mode
//         </button>
//       </div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//         eventTimeFormat={{
//           hour: "2-digit",
//           minute: "2-digit",
//           meridiem: "short",
//         }}
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,dayGridYear",
//         }}
//       />
//       <div
//         className={`modal fade ${modalVisible ? "show" : ""}`}
//         style={{ display: modalVisible ? "block" : "none" }}
//         tabIndex="-1"
//         aria-labelledby="eventModalLabel"
//         aria-hidden={!modalVisible}
//       >
//         <div
//           className={`modal-dialog ${
//             isDarkMode ? "modal-dark" : "modal-light"
//           }`}
//         >
//           <div
//             className={`modal-content ${
//               isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
//             }`}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title" id="eventModalLabel">
//                 {isEditing ? "Edit Event" : "Add New Event"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close bg-danger"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => setModalVisible(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label htmlFor="eventTitle" className="form-label">
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="eventTitle"
//                   name="title"
//                   value={eventDetails.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventDate" className="form-label">
//                   Event Date
//                 </label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   id="eventDate"
//                   name="date"
//                   value={eventDetails.date}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventColor" className="form-label">
//                   Event Background Color
//                 </label>
//                 <select
//                   className="form-select"
//                   id="eventColor"
//                   name="backgroundColor"
//                   value={eventDetails.backgroundColor}
//                   onChange={handleInputChange}
//                 >
//                   <option value="#0d6efd">Primary</option>
//                   <option value="#dc3545">Danger</option>
//                   <option value="#17a2b8">Info</option>
//                   <option value="#28a745">Success</option>
//                   <option value="#ffc107">Warning</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-footer">
//               {isEditing && (
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setModalVisible(false)}
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSaveEvent}
//               >
//                 {isEditing ? "Save Changes" : "Add Event"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css"; 

// const initialEvents = [
//   { title: "Event 1", date: "2024-11-29T10:00:00", backgroundColor: "#ff9f89" },
//   { title: "Event 2", date: "2024-12-01T12:00:00", backgroundColor: "#ffcd56" },
//   { title: "Event 3", date: "2024-12-05T14:00:00", backgroundColor: "#56e39f" },
// ];

// const App = () => {
//   const [events, setEvents] = useState(initialEvents);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [eventDetails, setEventDetails] = useState({
//     title: "",
//     date: "",
//     backgroundColor: "#0d6efd",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [eventToEdit, setEventToEdit] = useState(null);
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleEventClick = (info) => {
//     setEventToEdit(info.event);
//     setEventDetails({
//       title: info.event.title,
//       date: info.event.startStr,
//       backgroundColor: info.event.backgroundColor,
//     });
//     setIsEditing(true);
//     setModalVisible(true);
//   };

//   const handleDateClick = (info) => {
//     setEventDetails({
//       title: "",
//       date: info.dateStr,
//       backgroundColor: "#0d6efd",
//     });
//     setIsEditing(false);
//     setModalVisible(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEventDetails({
//       ...eventDetails,
//       [name]: value,
//     });
//   };

//   const handleSaveEvent = () => {
//     if (!eventDetails.title.trim()) {
//       alert("Event title is required!");
//       return;
//     }
//     if (isEditing) {
//       const updatedEvents = events.map((event) =>
//         event.title === eventToEdit.title
//           ? {
//               ...event,
//               title: eventDetails.title,
//               date: eventDetails.date,
//               backgroundColor: eventDetails.backgroundColor,
//             }
//           : event
//       );
//       setEvents(updatedEvents);
//     } else {
//       const newEvent = {
//         title: eventDetails.title,
//         date: eventDetails.date,
//         backgroundColor: eventDetails.backgroundColor,
//       };
//       setEvents([...events, newEvent]);
//     }
//     setModalVisible(false);
//   };

//   const handleDeleteEvent = () => {
//     if (eventToEdit) {
//       const updatedEvents = events.filter(
//         (event) => event.title !== eventToEdit.title
//       );
//       setEvents(updatedEvents);
//     }
//     setModalVisible(false);
//   };

//   const handleEventDrop = (info) => {
//     alert(`Event moved to: ${info.event.start}`);
//     const updatedEvents = events.map((event) =>
//       event.title === info.event.title
//         ? { ...event, date: info.event.startStr }
//         : event
//     );
//     setEvents(updatedEvents);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   return (
//     <div className={isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}>
//       <div className="container py-3">
//         <button className="btn btn-secondary mb-3" onClick={toggleDarkMode}>
//           Toggle {isDarkMode ? "Light" : "Dark"} Mode
//         </button>
//       </div>
//       <FullCalendar
//         plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//         initialView="dayGridMonth"
//         events={events}
//         dateClick={handleDateClick}
//         eventClick={handleEventClick}
//         eventDrop={handleEventDrop}
//         editable={true}
//         eventTimeFormat={{
//           hour: "2-digit",
//           minute: "2-digit",
//           meridiem: "short",
//         }}
//         headerToolbar={{
//           left: "prev,next today",
//           center: "title",
//           right: "dayGridMonth,timeGridWeek,dayGridYear",
//         }}
//         height="auto"
//       />
//       <div
//         className={`modal fade ${modalVisible ? "show" : ""}`}
//         style={{ display: modalVisible ? "block" : "none" }}
//         tabIndex="-1"
//         aria-labelledby="eventModalLabel"
//         aria-hidden={!modalVisible}
//       >
//         <div
//           className={`modal-dialog ${isDarkMode ? "modal-dark" : "modal-light"}`}
//         >
//           <div
//             className={`modal-content ${isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
//           >
//             <div className="modal-header">
//               <h5 className="modal-title" id="eventModalLabel">
//                 {isEditing ? "Edit Event" : "Add New Event"}
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close bg-danger"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//                 onClick={() => setModalVisible(false)}
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label htmlFor="eventTitle" className="form-label">
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="eventTitle"
//                   name="title"
//                   value={eventDetails.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventDate" className="form-label">
//                   Event Date
//                 </label>
//                 <input
//                   type="datetime-local"
//                   className="form-control"
//                   id="eventDate"
//                   name="date"
//                   value={eventDetails.date}
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="eventColor" className="form-label">
//                   Event Background Color
//                 </label>
//                 <select
//                   className="form-select"
//                   id="eventColor"
//                   name="backgroundColor"
//                   value={eventDetails.backgroundColor}
//                   onChange={handleInputChange}
//                 >
//                   <option value="#0d6efd">Primary</option>
//                   <option value="#dc3545">Danger</option>
//                   <option value="#17a2b8">Info</option>
//                   <option value="#28a745">Success</option>
//                   <option value="#ffc107">Warning</option>
//                 </select>
//               </div>
//             </div>
//             <div className="modal-footer">
//               {isEditing && (
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   onClick={handleDeleteEvent}
//                 >
//                   Delete
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setModalVisible(false)}
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleSaveEvent}
//               >
//                 {isEditing ? "Save Changes" : "Add Event"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const initialEvents = [
  { title: "Event 1", date: "2024-11-29T10:00:00", backgroundColor: "#ff9f89" },
  { title: "Event 2", date: "2024-12-01T12:00:00", backgroundColor: "#ffcd56" },
  { title: "Event 3", date: "2024-12-05T14:00:00", backgroundColor: "#56e39f" },
];

const App = () => {
  const [events, setEvents] = useState(initialEvents);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    backgroundColor: "#0d6efd",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleEventClick = (info) => {
    setEventToEdit(info.event);
    setEventDetails({
      title: info.event.title,
      date: info.event.startStr,
      backgroundColor: info.event.backgroundColor,
    });
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDateClick = (info) => {
    setEventDetails({
      title: "",
      date: info.dateStr,
      backgroundColor: "#0d6efd",
    });
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSaveEvent = () => {
    if (!eventDetails.title.trim()) {
      alert("Event title is required!");
      return;
    }
    if (isEditing) {
      const updatedEvents = events.map((event) =>
        event.title === eventToEdit.title
          ? {
              ...event,
              title: eventDetails.title,
              date: eventDetails.date,
              backgroundColor: eventDetails.backgroundColor,
            }
          : event
      );
      setEvents(updatedEvents);
    } else {
      const newEvent = {
        title: eventDetails.title,
        date: eventDetails.date,
        backgroundColor: eventDetails.backgroundColor,
      };
      setEvents([...events, newEvent]);
    }
    setModalVisible(false);
  };

  const handleDeleteEvent = () => {
    if (eventToEdit) {
      const updatedEvents = events.filter(
        (event) => event.title !== eventToEdit.title
      );
      setEvents(updatedEvents);
    }
    setModalVisible(false);
  };

  const handleEventDrop = (info) => {
    alert(`Event moved to: ${info.event.start}`);
    const updatedEvents = events.map((event) =>
      event.title === info.event.title
        ? { ...event, date: info.event.startStr }
        : event
    );
    setEvents(updatedEvents);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={isDarkMode ? "bg-dark text-white" : "bg-light text-dark"}>
      <div className="container py-3">
        <button className="btn btn-secondary mb-3" onClick={toggleDarkMode}>
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          editable={true}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            meridiem: "short",
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,dayGridYear",
          }}
          height="auto"
          contentHeight="calc(90% - 10px)"
        />
      </div>
      <div
        className={`modal fade ${modalVisible ? "show" : ""}`}
        style={{ display: modalVisible ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="eventModalLabel"
        aria-hidden={!modalVisible}
      >
        <div
          className={`modal-dialog ${isDarkMode ? "modal-dark" : "modal-light"}`}
        >
          <div
            className={`modal-content ${
              isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
            }`}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="eventModalLabel">
                {isEditing ? "Edit Event" : "Add New Event"}
              </h5>
              <button
                type="button"
                className="btn-close bg-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalVisible(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="eventTitle" className="form-label">
                  Event Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="eventTitle"
                  name="title"
                  value={eventDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eventDate" className="form-label">
                  Event Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="eventDate"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eventColor" className="form-label">
                  Event Background Color
                </label>
                <select
                  className="form-select"
                  id="eventColor"
                  name="backgroundColor"
                  value={eventDetails.backgroundColor}
                  onChange={handleInputChange}
                >
                  <option value="#0d6efd">Primary</option>
                  <option value="#dc3545">Danger</option>
                  <option value="#17a2b8">Info</option>
                  <option value="#28a745">Success</option>
                  <option value="#ffc107">Warning</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteEvent}
                >
                  Delete
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setModalVisible(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveEvent}
              >
                {isEditing ? "Save Changes" : "Add Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


