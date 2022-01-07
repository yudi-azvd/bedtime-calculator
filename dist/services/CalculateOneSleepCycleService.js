export default class CalculateOneSleepCycleService {
  constructor({
    baseTime,
    oneSleepCycleDurationInMinutes = 60 * 1.5,
    minimumAmountOfSleepInMinutes = 60 * 1.5
  }) {
    this.MINIMUM_MINUTES = 15;
    this.DEFAULT_DATE = "2000-01-01";
    if (oneSleepCycleDurationInMinutes < this.MINIMUM_MINUTES)
      throw new Error();
    if (minimumAmountOfSleepInMinutes < this.MINIMUM_MINUTES)
      throw new Error();
    this.baseDate = new Date(`${this.DEFAULT_DATE} ${baseTime}`);
    this.newBaseDate = this.baseDate;
    this.oneSleepCycleDurationInMinutes = oneSleepCycleDurationInMinutes;
    this.minimumAmountOfSleepInMinutes = minimumAmountOfSleepInMinutes;
    this.preRun();
  }
  run() {
    const oneSleepCycleLaterOfBefore = new Date(this.newBaseDate.getTime());
    oneSleepCycleLaterOfBefore.setMinutes(this.operation(oneSleepCycleLaterOfBefore.getMinutes(), this.oneSleepCycleDurationInMinutes));
    this.newBaseDate = oneSleepCycleLaterOfBefore;
    return this.dateToTimeString(oneSleepCycleLaterOfBefore);
  }
  preRun() {
    if (this.oneSleepCycleDurationInMinutes === this.minimumAmountOfSleepInMinutes)
      return;
    if (this.oneSleepCycleDurationInMinutes < this.minimumAmountOfSleepInMinutes) {
      let numberOfSleepCycles = Math.floor(this.minimumAmountOfSleepInMinutes / this.oneSleepCycleDurationInMinutes) + 1;
      if (this.minimumAmountOfSleepInMinutes % this.oneSleepCycleDurationInMinutes === 0)
        numberOfSleepCycles--;
      for (let i = 0; i < numberOfSleepCycles - 1; i++) {
        this.run();
      }
    }
  }
  dateToTimeString(date) {
    return date.toLocaleTimeString("pt-BR").replace(/:\d\d$/, "");
  }
}
