interface SleepTimeArgs {
  startTime: string
  sleepCycleDurationInMinutes?: number
}

/**
 * @param startTime tempo em string no formato HH:mm
 */
export default class SleepTime {
  startTime: string
  defaultSleepCycleDurationInMinutes = 90
  MILLISECONDS_TO_MINUTES = 60 * 1000
  DEFAULT_DATE = '2000-01-01'
  numberOfTimes = 1

  constructor(
    { startTime }: SleepTimeArgs
  ) {
    this.startTime = startTime
  }

  run() {
    const times: string[] = []
    const startDate = new Date(`${this.DEFAULT_DATE} ${this.startTime}`)

    for (let i = 0; i < this.numberOfTimes; i++) {
      const startTimeInMillisecs = startDate.getTime()
        + (i + 1)
        * this.defaultSleepCycleDurationInMinutes
        * this.MILLISECONDS_TO_MINUTES
      const aSleepCycleLater = new Date(startTimeInMillisecs)
      const formattedTime = aSleepCycleLater.toLocaleTimeString('pt-BR').replace(/:\d\d$/, '')
      times.push(formattedTime)
    }

    return times
  }
}
