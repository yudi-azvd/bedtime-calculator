import CalculateOneSleepCycleLaterService from './CalculateOneSleepCycleLaterService'

describe('CalculateOneSleepCycleLaterService', () => {
  it('should output a time one sleep cycle after given start time = 20:30', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      startTime: '20:00',
    })

    const time = calculateOneSleepCycleLaterService.run()

    expect(time).toEqual('21:30')
  })

  it('should output a time one sleep cycle after given start time = 23:30', () => {
    const calculateOneSleepCycleLaterService = new CalculateOneSleepCycleLaterService({
      startTime: '23:30',
    })

    const time = calculateOneSleepCycleLaterService.run()

    expect(time).toEqual('01:00')
  })
})
