import { OPENAI_API_KEY } from '../env'
const BASE_URL = 'https://api.openai.com/v1'

export async function extractEventDetails(eventData: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/completions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
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
    return response.json()
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
