import CalculateOneSleepCycleService from './CalculateOneSleepCycleService'

/**
 * Calcula horários prévios a `baseTime` em intervalos de
 * tempo de `sleepCycleDurationInMinutes`.
 *
 * @param {string} baseTime horário base no formato HH:mm
 * @param {number} sleepCycleDurationInMinutes duração de um ciclo de sono em minutos
 */
export default class CalculateOneSleepCycleBeforeService extends CalculateOneSleepCycleService {
  protected operation(mili1: any, mili2: any): number {
    return mili1 - mili2
  }
}
