import React, { useState } from 'react'
import EventDetailsForm from '../../components/EventDetailsForm'
import ExtractForm from '../../components/ExtractForm'
import './Popup.css'

type Meeting = {
  summary: string
  location: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  description: string
}

const Popup = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    startTime: '',
    endTime: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify(formData))
  }

  const handleExtractedData = (data?: Meeting) => {
    if (!data) {
      return
    }
    const { summary, location, description, start, end } = data
    const [startDate, startTime] = start.dateTime.split('T')
    const [endDate, endTime] = end.dateTime.split('T')
    setFormData((prevFormData) => ({
      ...prevFormData,
      eventName: summary,
      location: location,
      description: description,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
    }))
  }

  return (
    <div className='App'>
      <ExtractForm onExtractedData={handleExtractedData} />
      <EventDetailsForm eventDetails={formData} onHandleChange={handleChange} onHandleSubmit={handleSubmit} />
    </div>
  )
}

export default Popup
