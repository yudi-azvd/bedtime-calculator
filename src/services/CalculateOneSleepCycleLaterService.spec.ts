import CalculateOneSleepCycleLaterService from './CalculateOneSleepCycleLaterService'
import { Args } from './CalculateOneSleepCycleService'

function makeSut(args: Args) {
  return new CalculateOneSleepCycleLaterService(args)
}

describe('CalculateOneSleepCycleLaterService', () => {
  let sut: CalculateOneSleepCycleLaterService

  it('should not allow inputs to be less than 15 minutes', () => {
    expect(
      () => makeSut({
        baseTime: '08:00',
        minimumAmountOfSleepInMinutes: 7,
      })
    ).toThrow()

    expect(
      () => makeSut({
        baseTime: '08:00',
        oneSleepCycleDurationInMinutes: 7
      })
    ).toThrow()
  })

  describe('oneSleepCycleDurationInMinutes == minimumAmountOfSleepInMinutes', () => {
    it('should output a time one sleep cycle after given start time = 20:30', () => {
      sut = makeSut({
        baseTime: '20:00',
      })

      const time = sut.run()

      expect(time).toBe('21:30')
    })

    it('should output a time one sleep cycle after given start time = 23:30', () => {
      sut = makeSut({
        baseTime: '23:30',
      })

      const time = sut.run()

      expect(time).toBe('01:00')
    })

    it('should output multiple times one sleep cycle (90min) apart from each other', () => {
      sut = makeSut({
        baseTime: '23:30',
      })

      expect(sut.run()).toBe('01:00')
      expect(sut.run()).toBe('02:30')
      expect(sut.run()).toBe('04:00')
      expect(sut.run()).toBe('05:30')
    })
  })

  describe('oneSleepCycleDurationInMinutes < minimumAmountOfSleepInMinutes', () => {
    it('should output times minimumAmountOfSleepInMinutes later', () => {
      sut = makeSut({
        baseTime: '23:30',
        minimumAmountOfSleepInMinutes: 90,
        oneSleepCycleDurationInMinutes: 60,
      })

      expect(sut.run()).toBe('01:30')
      expect(sut.run()).toBe('02:30')
      expect(sut.run()).toBe('03:30')
    })

    it('should output multiple times one sleep cycle (15min) apart from each other', () => {
      sut = makeSut({
        baseTime: '23:30',
        minimumAmountOfSleepInMinutes: 30,
        oneSleepCycleDurationInMinutes: 15,
      })

      expect(sut.run()).toBe('00:15')
      expect(sut.run()).toBe('00:30')
      expect(sut.run()).toBe('00:45')
    })

    it('minimumAmountOfSleepInMinutes is not multiple of oneSleepCycleDurationInMinutes', () => {
      sut = makeSut({
        baseTime: '23:30',
        minimumAmountOfSleepInMinutes: 30,
        oneSleepCycleDurationInMinutes: 25,
      })

      expect(sut.run()).toBe('00:15')
      expect(sut.run()).toBe('00:30')
      expect(sut.run()).toBe('00:45')
    })

    it('minimumAmountOfSleepInMinutes fits multiple sleep cycles', () => {
      sut = makeSut({
        baseTime: '22:00',
        minimumAmountOfSleepInMinutes: 60 * 9,
        oneSleepCycleDurationInMinutes: 90,
      })

      expect('07:00').toBe(sut.run())
    })
  })

  describe('oneSleepCycleDurationInMinutes > minimumAmountOfSleepInMinutes', () => {
    it('case 1', () => {
      sut = makeSut({
        baseTime: '22:00',
        minimumAmountOfSleepInMinutes: 30,
        oneSleepCycleDurationInMinutes: 90,
      })

      expect('23:30').toBe(sut.run())
    })

    it('case 2', () => {
      sut = makeSut({
        baseTime: '22:00',
        minimumAmountOfSleepInMinutes: 15,
        oneSleepCycleDurationInMinutes: 90,
      })

      expect('23:30').toBe(sut.run())
    })
  })
})
