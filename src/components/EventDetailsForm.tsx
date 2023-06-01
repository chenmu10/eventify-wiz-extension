import React, { FC } from 'react'

interface EventDetailsFormProps {
  eventDetails: Meeting
  onHandleChange: any
  onHandleSubmit: any
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ eventDetails, onHandleChange, onHandleSubmit }) => {
  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor='eventName'>Event Name</label>
      <input
        type='text'
        id='eventName'
        name='eventName'
        value={eventDetails.eventName}
        onChange={onHandleChange}
        required
      />

      <label htmlFor='location'>Location</label>
      <input type='text' id='location' name='location' value={eventDetails.location} onChange={onHandleChange} />

      <label htmlFor='description'>Description</label>
      <textarea
        id='description'
        name='description'
        value={eventDetails.description}
        onChange={onHandleChange}
      ></textarea>

      <label htmlFor='startDate'>Start Date</label>
      <input
        type='date'
        id='startDate'
        name='startDate'
        value={eventDetails.startDate}
        onChange={onHandleChange}
        required
      />
      <label htmlFor='startTime'></label>
      <input type='time' id='startTime' name='startTime' value={eventDetails.startTime} onChange={onHandleChange} />

      <label htmlFor='endDate'>End Date</label>
      <input type='date' id='endDate' name='endDate' value={eventDetails.endDate} onChange={onHandleChange} required />
      <label htmlFor='endTime'></label>
      <input type='time' id='endTime' name='endTime' value={eventDetails.endTime} onChange={onHandleChange} />

      <button type='submit'>Create Google Calendar Event 🪄</button>
    </form>
  )
}

export default EventDetailsForm
