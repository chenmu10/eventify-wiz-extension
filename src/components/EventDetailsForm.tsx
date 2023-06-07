import React, { ChangeEvent, FC, FormEvent } from 'react';
import { EventFormData } from '../types';
interface EventDetailsFormProps {
  formData: EventFormData;
  onHandleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onHandleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const EventDetailsForm: FC<EventDetailsFormProps> = ({ formData, onHandleChange, onHandleSubmit }) => {
  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor='eventName'>Event Name</label>
      <input type='text' id='eventName' name='eventName' value={formData.summary} onChange={onHandleChange} required />

      <label htmlFor='location'>Location</label>
      <input type='text' id='location' name='location' value={formData.location} onChange={onHandleChange} />

      <label htmlFor='description'>Description</label>
      <textarea id='description' name='description' value={formData.description} onChange={onHandleChange}></textarea>

      <label htmlFor='startDate'>Start Date</label>
      <input
        type='date'
        id='startDate'
        name='startDate'
        value={formData.startDate}
        onChange={onHandleChange}
        required
      />

      <label htmlFor='startTime'>Start Time</label>
      <input type='time' id='startTime' name='startTime' value={formData.startTime} onChange={onHandleChange} />

      <label htmlFor='endDate'>End Date</label>
      <input type='date' id='endDate' name='endDate' value={formData.endDate} onChange={onHandleChange} required />

      <label htmlFor='endTime'>End Time</label>
      <input type='time' id='endTime' name='endTime' value={formData.endTime} onChange={onHandleChange} />

      <button type='submit'>Create Google Calendar Event 🪄</button>
    </form>
  );
};

export default EventDetailsForm;