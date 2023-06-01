export type EventDetails = {
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

export type FormData = {
  summary: string
  location: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
}
