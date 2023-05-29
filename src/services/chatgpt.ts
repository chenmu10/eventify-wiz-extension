const BASE_URL = 'https://api.openai.com/v1'
const apiKey = '11111'

interface EventDetails {
  summary: string
  location: string
  start: {
    dateTime: Date
    timeZone: string
  }
  end: {
    dateTime: Date
    timeZone: string
  }
  description: string
}

type GetEventDetailsSuccessResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: {
    message: {
      role: string
      content: string
    }
    finish_reason: string
    index: number
  }[]
}

type GetEventDetailsErrorResponse = {
  isOk: false
  data: null
  error: {
    message: string
    type: string
    param: null
    code: string
  }
}

type GetEventDetailsResponse = GetEventDetailsSuccessResponse | GetEventDetailsErrorResponse

export async function getEventDetails(eventData: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/completions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: `extract event details in google calendar api json format from this text: ${eventData}`,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['\n'],
      }),
    })

    const data = await response.json()
    const mockData = {
      summary: 'lunch with Tina',
      location: 'Tel Aviv',
      start: {
        dateTime: '2023-06-10T16:00:00',
        timeZone: 'YOUR_TIME_ZONE',
      },
      end: {
        dateTime: '2023-06-10T21:00:00',
        timeZone: 'YOUR_TIME_ZONE',
      },
      description: 'we should discuss the project.',
    }
    if (data?.error) {
      return { isError: true, content: data?.error }
    }
    return { isError: false, content: mockData }
  } catch (error) {
    console.log('Error:', error)
  }
}
