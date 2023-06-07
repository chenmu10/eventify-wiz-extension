import { EventDetails, EventFormData } from '../types';

export async function handleCreateEventClick(eventFormData: EventFormData) {
  let eventDetails = {
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
  };
  await createEvent(eventDetails);
}

async function createEvent(eventDetails: EventDetails) {
  chrome.identity.getAuthToken({ interactive: true }, async function (token: any) {
    try {
      const response = await fetch(`${process.env.CALENDAR_URL}`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }
      alert(JSON.stringify(data));
    } catch (error) {
      console.error(`An error occurred while creating event:${JSON.stringify(error)}`);
    }
  });
}