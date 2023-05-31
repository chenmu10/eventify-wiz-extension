type EventDetails = {
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

export default EventDetails
