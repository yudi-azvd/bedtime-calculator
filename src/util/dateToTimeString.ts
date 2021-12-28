export default function dateToTimeString(date: Date): string {
  let hours = new String(date.getHours())
  hours = hours.padStart(2, '0')
  let minutes = new String(date.getMinutes())
  minutes = minutes.padStart(2, '0')
  return `${hours}:${minutes}`
}

