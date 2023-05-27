import React, { useRef, useState } from 'react'
import './Popup.css'

const Popup = () => {
  const textAreaRef = useRef(null)
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    startTime: '',
    endTime: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    alert(`Name: ${formData.eventName}, Email: ${formData.location}, Message: ${formData.startDate}`)
  }

  return (
    <div className='App'>
      <div className='extractContainer'>
        <textarea
          name='eventData'
          id='eventData'
          onChange={handleChange}
          ref={textAreaRef}
          placeholder='Enter any text with event details.'
        ></textarea>
        <button>Extract ✨</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='eventName'>Event Name</label>
        <input
          type='text'
          id='eventName'
          name='eventName'
          value={formData.eventName}
          onChange={handleChange}
          required
        />

        <label htmlFor='location'>Location</label>
        <input type='text' id='location' name='location' value={formData.location} onChange={handleChange} required />

        <label htmlFor='startDate'>Start Date</label>
        <input
          type='date'
          id='startDate'
          name='startDate'
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type='time'
          id='startTime'
          name='startTime'
          value={formData.startTime}
          onChange={handleChange}
          required
        />

        <label htmlFor='endDate'>End Date</label>
        <input type='date' id='endDate' name='endDate' value={formData.endDate} onChange={handleChange} required />
        <input type='time' id='endTime' name='endTime' value={formData.endTime} onChange={handleChange} required />

        <button type='submit'>Create Google Calendar Event 🪄</button>
      </form>
    </div>
  )
}

export default Popup
