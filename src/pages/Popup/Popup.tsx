import React, { useState } from 'react';
import EventDetailsForm from '../../components/EventDetailsForm';
import ExtractForm from '../../components/ExtractForm';
import { EventDetails } from './../../types';
import './Popup.css';

const Popup = () => {
  const [formData, setFormData] = useState({
    summary: '',
    location: '',
    description: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    startTime: '',
    endTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
  };

  const handleExtractedData = (data?: EventDetails) => {
    if (!data) {
      return;
    }
    const { summary, location, description, start, end } = data;
    const [startDate, startTime] = start.dateTime.split('T');
    const [endDate, endTime] = end.dateTime.split('T');
    setFormData((prevFormData) => ({
      ...prevFormData,
      summary,
      location,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
    }));
  };

  return (
    <div className='App'>
      <ExtractForm onExtractedData={handleExtractedData} />
      <EventDetailsForm formData={formData} onHandleChange={handleChange} onHandleSubmit={handleSubmit} />
    </div>
  );
};

export default Popup;
