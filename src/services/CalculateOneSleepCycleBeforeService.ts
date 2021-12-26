import CalculateOneSleepCycleService from './CalculateOneSleepCycleService'
import { Args } from './CalculateOneSleepCycleService'

/**
 * Calcula horários prévios a `baseTime` em intervalos de
 * tempo de `sleepCycleDurationInMinutes`.
 *
 * @param {string} baseTime horário base no formato HH:mm
 * @param {number} sleepCycleDurationInMinutes duração de um ciclo de sono em minutos
 */
export default class CalculateOneSleepCycleLaterService extends CalculateOneSleepCycleService {
  constructor(
    { baseTime, oneSleepCycleDurationInMinutes = 90 }: Args
  ) {
    super()
    this.startTime = baseTime
    this.oneSleepCycleDurationInMinutes = oneSleepCycleDurationInMinutes
  }

  protected operation(mili1: any, mili2: any): number {
    return mili1 - mili2
  }
}
