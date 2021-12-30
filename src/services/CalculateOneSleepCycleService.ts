export interface Args {
  baseTime: string
  oneSleepCycleDurationInMinutes?: number
  minimumAmountOfSleepInMinutes?: number
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
  private readonly MINIMUM_MINUTES = 15
  protected readonly DEFAULT_DATE = '2000-01-01'
  protected readonly baseDate: Date
  protected newBaseDate: Date
  protected baseTime: string
  protected newBaseTime: string
  protected oneSleepCycleDurationInMinutes: number
  protected minimumAmountOfSleepInMinutes: number


  constructor({
    baseTime,
    oneSleepCycleDurationInMinutes = 60 * 1.5,
    minimumAmountOfSleepInMinutes = 60 * 1.5
  }: Args) {
    if (oneSleepCycleDurationInMinutes < this.MINIMUM_MINUTES)
      throw new Error()

    if (minimumAmountOfSleepInMinutes < this.MINIMUM_MINUTES)
      throw new Error()

    this.baseDate = new Date(`${this.DEFAULT_DATE} ${baseTime}`)
    this.newBaseDate = this.baseDate
    this.oneSleepCycleDurationInMinutes = oneSleepCycleDurationInMinutes
    this.minimumAmountOfSleepInMinutes = minimumAmountOfSleepInMinutes

    this.preRun()
  }

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

  public run(): string {
    const oneSleepCycleLaterOfBefore = new Date(this.newBaseDate.getTime())

    oneSleepCycleLaterOfBefore.setMinutes(
      this.operation(
        oneSleepCycleLaterOfBefore.getMinutes(),
        this.oneSleepCycleDurationInMinutes
      )
    )

    this.newBaseDate = oneSleepCycleLaterOfBefore
    return this.dateToTimeString(oneSleepCycleLaterOfBefore)
  }

  private preRun(): void {
    // TODO: executar um shift para o minimunAmountOfSleepInMinutes

    if (this.oneSleepCycleDurationInMinutes === this.minimumAmountOfSleepInMinutes)
      return

    if (this.oneSleepCycleDurationInMinutes >= this.minimumAmountOfSleepInMinutes) {
      // this.baseDate.setMinutes()
      return
    }

    if (this.oneSleepCycleDurationInMinutes < this.minimumAmountOfSleepInMinutes) {
      const numberOfSleepCycles = Math.floor(
        this.minimumAmountOfSleepInMinutes / this.oneSleepCycleDurationInMinutes
      )

      for (let i = 0; i < numberOfSleepCycles; i++) {
        this.run()
      }
    }
  }

  private dateToTimeString(date: Date): string {
    return date
      .toLocaleTimeString('pt-BR')
      .replace(/:\d\d$/, '')
  }
}
