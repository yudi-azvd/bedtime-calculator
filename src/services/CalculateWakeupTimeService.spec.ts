import CalculateWakeupTimeService from './CalculateWakeupTimeService'

describe('CalculateWakeupTimeService', () => {
  it('should output a time one sleep cycle after given start time', () => {
    const calculateWakeupTimeService = new CalculateWakeupTimeService({
      startTime: '20:00',
    })

    const times = calculateWakeupTimeService.run()

    expect(times).toEqual(['21:30'])
  })
})
