import CalculateOneSleepCycleBeforeService from './CalculateOneSleepCycleBeforeService'
import { Args } from './CalculateOneSleepCycleService'

import { describe, it, expect } from 'vitest'


function makeSut(args: Args) {
  return new CalculateOneSleepCycleBeforeService(args)
}

describe('CalculateOneSleepCycleBeforeService', () => {
  let sut: CalculateOneSleepCycleBeforeService

  describe('oneSleepCycleDurationInMinutes == minimumAmountOfSleepInMinutes', () => {
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
  })

  describe('oneSleepCycleDurationInMinutes < minimumAmountOfSleepInMinutes', () => {
    it('should output multiple times one sleep cycle (60min) apart from each other, multiple', () => {
      sut = makeSut({
        baseTime: '23:30',
        oneSleepCycleDurationInMinutes: 60,
        minimumAmountOfSleepInMinutes: 90,
      })

      expect(sut.run()).toBe('21:30')
      expect(sut.run()).toBe('20:30')
      expect(sut.run()).toBe('19:30')
      expect(sut.run()).toBe('18:30')
    })

    it('should output multiple times one sleep cycle (60min) apart from each other, not multiple', () => {
      sut = makeSut({
        baseTime: '23:30',
        oneSleepCycleDurationInMinutes: 60,
        minimumAmountOfSleepInMinutes: 70,
      })

      expect(sut.run()).toBe('21:30')
      expect(sut.run()).toBe('20:30')
      expect(sut.run()).toBe('19:30')
      expect(sut.run()).toBe('18:30')
    })

    it('should output multiple times one sleep cycle (15min) apart from each other, not multiple', () => {
      sut = makeSut({
        baseTime: '23:30',
        oneSleepCycleDurationInMinutes: 15,
        minimumAmountOfSleepInMinutes: 40
      })

      expect(sut.run()).toBe('22:45')
      expect(sut.run()).toBe('22:30')
      expect(sut.run()).toBe('22:15')
    })

    it('minimumAmountOfSleepInMinutes fits multiple sleep cycles', () => {
      sut = makeSut({
        baseTime: '22:00',
        minimumAmountOfSleepInMinutes: 60 * 9,
        oneSleepCycleDurationInMinutes: 90,
      })

      expect(sut.run()).toBe('13:00')
    })
  })

  describe('oneSleepCycleDurationInMinutes > minimumAmountOfSleepInMinutes', () => {
    it('should calculate first result only one sleep cycle before given base time', () => {
      sut = makeSut({
        baseTime: '22:00',
        oneSleepCycleDurationInMinutes: 90,
        minimumAmountOfSleepInMinutes: 30,
      })

      expect(sut.run()).toBe('20:30')
    })
  })
})
