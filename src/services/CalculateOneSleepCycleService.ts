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
  protected DEFAULT_DATE = '2000-01-01'

  /**
   * Esse método deve ser sobrescrito pela classe filha.
   *
   * Se é implementado com `n1`+`n1` a classe filha calcula horários posteriores.
   *
   * Se é implementado com `n1`-`n1` a classe filha calcula horários prévios.
   *
   * @param n1 duração em minutos 1
   * @param n2 duração em minutos 2
   */
  protected abstract operation(n1: number, n2: number): number

  public run() {
    const startDate = new Date(`${this.DEFAULT_DATE} ${this.startTime}`)

    startDate.setMinutes(
      this.operation(
        startDate.getMinutes(),
        this.oneSleepCycleDurationInMinutes
      )
    )

    const oneSleepCycleLaterOfBefore = startDate
    // hh:mm:ss => hh:mm
    const formattedTime = oneSleepCycleLaterOfBefore
      .toLocaleTimeString('pt-BR')
      .replace(/:\d\d$/, '')

    this.startTime = formattedTime
    return formattedTime
  }
}
