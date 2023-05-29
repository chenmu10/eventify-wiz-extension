import React, { useRef, useState } from 'react'
import { getEventDetails } from '../../services/chatgpt'
import './Popup.css'

const Popup = () => {
  const textAreaRef = useRef(null)
  const [chatgptErrorMsg, setChatgptErrorMsg] = useState('')
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    description: '',
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    startTime: '',
    endTime: '',
  })

  const handleExtractClick = async () => {
    try {
      const data = await getEventDetails(textAreaRef.current?.value)
      if (data?.isError) {
        setChatgptErrorMsg(JSON.stringify(data.content, null, 2))
      } else {
        const { summary, location, description, start, end } = data.content
        const [startDate, startTime] = start.dateTime.split('T')
        const [endDate, endTime] = end.dateTime.split('T')
        setFormData({
          eventName: summary,
          location: location,
          description: description,
          startDate: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
        })
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { eventName, location, startDate } = formData
    alert(`Name: ${eventName}, Location: ${location}, Start Date: ${startDate}`)
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
        <button onClick={handleExtractClick}>Extract ✨</button>
        <p>{chatgptErrorMsg}</p>
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

        <label htmlFor='description'>Description</label>
        <textarea id='description' name='description' value={formData.description} onChange={handleChange}></textarea>

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
