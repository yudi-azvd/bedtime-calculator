import CalculateOneSleepCycleLaterService from './CalculateOneSleepCycleLaterService'

describe('CalculateOneSleepCycleLaterService', () => {
  it('should output a time one sleep cycle after given start time = 20:30', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      baseTime: '20:00',
    })

    const time = calculateOneSleepCycleLaterService.run()

    expect(time).toEqual('21:30')
  })

  it('should output a time one sleep cycle after given start time = 23:30', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      baseTime: '23:30',
    })

    const time = calculateOneSleepCycleLaterService.run()

    expect(time).toEqual('01:00')
  })

  it('should output multiple times one sleep cycle (90min) apart from each other', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      baseTime: '23:30',
    })

    expect('01:00').toEqual(calculateOneSleepCycleLaterService.run())
    expect('02:30').toEqual(calculateOneSleepCycleLaterService.run())
    expect('04:00').toEqual(calculateOneSleepCycleLaterService.run())
    expect('05:30').toEqual(calculateOneSleepCycleLaterService.run())
  })

  it('should output multiple times one sleep cycle (60min) apart from each other', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      baseTime: '23:30',
      oneSleepCycleDurationInMinutes: 60
    })

    expect('00:30').toEqual(calculateOneSleepCycleLaterService.run())
    expect('01:30').toEqual(calculateOneSleepCycleLaterService.run())
    expect('02:30').toEqual(calculateOneSleepCycleLaterService.run())
    expect('03:30').toEqual(calculateOneSleepCycleLaterService.run())
  })

  it('should output multiple times one sleep cycle (15min) apart from each other', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      baseTime: '23:30',
      oneSleepCycleDurationInMinutes: 15
    })

    expect('23:45').toEqual(calculateOneSleepCycleLaterService.run())
    expect('00:00').toEqual(calculateOneSleepCycleLaterService.run())
    expect('00:15').toEqual(calculateOneSleepCycleLaterService.run())
    expect('00:30').toEqual(calculateOneSleepCycleLaterService.run())
  })
})
