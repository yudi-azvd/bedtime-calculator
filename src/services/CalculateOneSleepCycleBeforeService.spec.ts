import CalculateOneSleepCycleBeforeService from './CalculateOneSleepCycleBeforeService'
import { Args } from './CalculateOneSleepCycleService'

function makeSut(args: Args) {
  return new CalculateOneSleepCycleBeforeService(args)
}

describe('CalculateOneSleepCycleBeforeService', () => {
  let sut: CalculateOneSleepCycleBeforeService

  it('should output a time one sleep cycle before given base time = 20:00', () => {
    sut = makeSut({
      baseTime: '20:00',
    })

    const time = sut.run()

    expect(time).toBe('18:30')
  })

  it('should output a time one sleep cycle after given base time = 01:00', () => {
    sut = makeSut({
      baseTime: '01:00',
    })

    const time = sut.run()

    expect(time).toBe('23:30')
  })

  it('should output multiple times one sleep cycle (90min) apart from each other', () => {
    sut = makeSut({
      baseTime: '23:30',
    })

    expect(sut.run()).toBe('22:00')
    expect(sut.run()).toBe('20:30')
    expect(sut.run()).toBe('19:00')
    expect(sut.run()).toBe('17:30')
  })

  it('should output multiple times one sleep cycle (60min) apart from each other', () => {
    sut = makeSut({
      baseTime: '23:30',
      oneSleepCycleDurationInMinutes: 60
    })

    expect(sut.run()).toBe('22:30')
    expect(sut.run()).toBe('21:30')
    expect(sut.run()).toBe('20:30')
    expect(sut.run()).toBe('19:30')
  })

  it('should output multiple times one sleep cycle (15min) apart from each other', () => {
    sut = makeSut({
      baseTime: '23:30',
      oneSleepCycleDurationInMinutes: 15
    })

    expect(sut.run()).toBe('23:15')
    expect(sut.run()).toBe('23:00')
    expect(sut.run()).toBe('22:45')
    expect(sut.run()).toBe('22:30')
    expect(sut.run()).toBe('22:15')
  })
})
