export interface Args {
  baseTime: string
  oneSleepCycleDurationInMinutes?: number
}

/**
 * Classe base que calcula horários baseados em `baseTime` em intervalos de
 * tempo de `sleepCycleDurationInMinutes`. As classes que herdam dela devem
 * implementar o método `operation`. A implementação de `operation` determina
 * se a classe filha calcula um novo horário antes ou depois de `baseTime`.
 *
 * @param {string} baseTime horário base no formato HH:mm
 * @param {number} sleepCycleDurationInMinutes duração de um ciclo de sono em minutos
 */
export default abstract class CalculateOneSleepCycleService {
  protected startTime: string
  protected oneSleepCycleDurationInMinutes = 90
  protected MILLISECONDS_TO_MINUTES = 60 * 1000
  protected DEFAULT_DATE = '2000-01-01'

  protected abstract operation(mili1: number, mili2: number): number

  public run() {
    const startDate = new Date(`${this.DEFAULT_DATE} ${this.startTime}`)

    const startTimeInMillisecs = this.operation(
      startDate.getTime(),
      this.oneSleepCycleDurationInMinutes
      * this.MILLISECONDS_TO_MINUTES
    )

    const oneSleepCycleLater = new Date(startTimeInMillisecs)
    // hh:mm:ss => hh:mm
    const formattedTime = oneSleepCycleLater.toLocaleTimeString('pt-BR').replace(/:\d\d$/, '')

    this.startTime = formattedTime
    return formattedTime
  }
}
