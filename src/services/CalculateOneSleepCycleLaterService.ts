interface SleepTimeArgs {
  startTime: string
  sleepCycleDurationInMinutes?: number
}

/**
 * @param startTime tempo em string no formato HH:mm
 */
export default class CalculateOneSleepCycleLaterService {
  startTime: string
  defaultSleepCycleDurationInMinutes = 90
  MILLISECONDS_TO_MINUTES = 60 * 1000
  DEFAULT_DATE = '2000-01-01'

  constructor(
    { startTime }: SleepTimeArgs
  ) {
    this.startTime = startTime
  }

  run() {
    const startDate = new Date(`${this.DEFAULT_DATE} ${this.startTime}`)

    const startTimeInMillisecs = startDate.getTime()
      + this.defaultSleepCycleDurationInMinutes
      * this.MILLISECONDS_TO_MINUTES
    const aSleepCycleLater = new Date(startTimeInMillisecs)
    const formattedTime = aSleepCycleLater.toLocaleTimeString('pt-BR').replace(/:\d\d$/, '')

    return formattedTime
  }
}
