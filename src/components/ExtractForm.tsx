import React, { FC, useState } from 'react'
import { EventDetails } from '../types'
import { extractEventDetails } from './../services/chatgpt'
interface ExtractFormProps {
  onExtractedData: (eventDetails: EventDetails) => void
}

const ExtractForm: FC<ExtractFormProps> = ({ onExtractedData }) => {
  const [promptData, setPromptData] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<'typing' | 'loading' | 'success'>('typing')
  let [eventDetails, setEventDetails] = useState({
    summary: 'lunch with Tina',
    location: 'Tel Aviv',
    start: {
      dateTime: '2023-06-10T16:00:00',
      timeZone: 'Asia/Jerusalem',
    },
    end: {
      dateTime: '2023-06-10T21:00:00',
      timeZone: 'Asia/Jerusalem',
    },
    description: 'we should discuss the project.',
  })
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPromptData(e.target.value)
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    setStatus('loading')
    try {
      const data = await extractEventDetails(promptData)
      if (data.content) {
        setEventDetails(data)
        setStatus('success')
      } else {
        setError(JSON.stringify(data, null, 2))
        setStatus('typing')
      }
    } catch (err: any) {
      setStatus('typing')
      setError(err.toString())
    } finally {
      onExtractedData(eventDetails)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='extractContainer'>
      <textarea
        value={promptData}
        onChange={handleTextareaChange}
        disabled={status === 'loading'}
        placeholder='Enter any text with event details.'
      ></textarea>
      <button type='submit' disabled={promptData.length === 0 || status === 'loading'}>
        {status === 'loading' ? 'Loading..' : 'Extract ✨'}
      </button>
      {error && <p className='error'>{error}</p>}
    </form>
  )
}

export default ExtractForm
