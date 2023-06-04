export async function extractEventDetails(eventData: string): Promise<any> {
  const response = await fetch(`${process.env.OPENAI_URL}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(JSON.stringify(data?.error?.code || data?.error?.message));
  }
  return response.json();
}
