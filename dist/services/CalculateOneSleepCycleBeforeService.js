import CalculateOneSleepCycleService from "./CalculateOneSleepCycleService.js";
export default class CalculateOneSleepCycleBeforeService extends CalculateOneSleepCycleService {
  operation(mili1, mili2) {
    return mili1 - mili2;
  }
}
