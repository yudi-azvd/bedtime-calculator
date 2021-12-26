import CalculateOneSleepCycleBeforeService from './CalculateOneSleepCycleBeforeService'

describe('CalculateOneSleepCycleBeforeService', () => {
  it('should output a time one sleep cycle before given base time = 20:00', () => {
    const calculateOneSleepCycleBeforeService = new CalculateOneSleepCycleBeforeService({
      baseTime: '20:00',
    })

    const time = calculateOneSleepCycleBeforeService.run()

    expect('18:30').toEqual(time)
  })

  it('should output a time one sleep cycle after given base time = 01:00', () => {
    const calculateOneSleepCycleBeforeService = new CalculateOneSleepCycleBeforeService({
      baseTime: '01:00',
    })

    const time = calculateOneSleepCycleBeforeService.run()

    expect('23:30').toEqual(time)
  })

  it('should output multiple times one sleep cycle (90min) apart from each other', () => {
    const calculateOneSleepCycleBeforeService = new CalculateOneSleepCycleBeforeService({
      baseTime: '23:30',
    })

    expect('22:00').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('20:30').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('19:00').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('17:30').toEqual(calculateOneSleepCycleBeforeService.run())
  })

  it('should output multiple times one sleep cycle (60min) apart from each other', () => {
    const calculateOneSleepCycleBeforeService = new CalculateOneSleepCycleBeforeService({
      baseTime: '23:30',
      oneSleepCycleDurationInMinutes: 60
    })

    expect('22:30').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('21:30').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('20:30').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('19:30').toEqual(calculateOneSleepCycleBeforeService.run())
  })

  it('should output multiple times one sleep cycle (15min) apart from each other', () => {
    const calculateOneSleepCycleBeforeService = new CalculateOneSleepCycleBeforeService({
      baseTime: '23:30',
      oneSleepCycleDurationInMinutes: 15
    })

    expect('23:15').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('23:00').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('22:45').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('22:30').toEqual(calculateOneSleepCycleBeforeService.run())
    expect('22:15').toEqual(calculateOneSleepCycleBeforeService.run())
  })
})
