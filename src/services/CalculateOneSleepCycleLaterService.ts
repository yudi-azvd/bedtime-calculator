import CalculateOneSleepCycleService from './CalculateOneSleepCycleService'
import { Args } from './CalculateOneSleepCycleService'

/**
 * Calcula horários a partir de `baseTime` em intervalos de
 * tempo de `sleepCycleDurationInMinutes`.
 *
 * @param {string} baseTime horário base no formato HH:mm
 * @param {number} sleepCycleDurationInMinutes duração de um ciclo de sono em minutos
 */
export default class CalculateOneSleepCycleLaterService extends CalculateOneSleepCycleService {
  constructor(args: Args) {
    super(args)
  }

  protected operation(mili1: any, mili2: any): number {
    return mili1 + mili2
  }
}
