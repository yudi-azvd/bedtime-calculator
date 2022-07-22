import CalculateOneSleepCycleLaterService from './CalculateOneSleepCycleLaterService'
import { Args } from './CalculateOneSleepCycleService'

import { describe, it, expect } from 'vitest'


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
        oneSleepCycleDurationInMinutes: 60,
        minimumAmountOfSleepInMinutes: 90,
      })

      expect(sut.run()).toBe('01:30')
      expect(sut.run()).toBe('02:30')
      expect(sut.run()).toBe('03:30')
    })

    it('should output multiple times one sleep cycle (15min) apart from each other', () => {
      sut = makeSut({
        baseTime: '23:30',
        oneSleepCycleDurationInMinutes: 15,
        minimumAmountOfSleepInMinutes: 30,
      })

      expect(sut.run()).toBe('00:00')
      expect(sut.run()).toBe('00:15')
      expect(sut.run()).toBe('00:30')
      expect(sut.run()).toBe('00:45')
    })

    it('minimumAmountOfSleepInMinutes is not multiple of oneSleepCycleDurationInMinutes', () => {
      sut = makeSut({
        baseTime: '23:30',
        oneSleepCycleDurationInMinutes: 25,
        minimumAmountOfSleepInMinutes: 30,
      })

      expect(sut.run()).toBe('00:20')
      expect(sut.run()).toBe('00:45')
      expect(sut.run()).toBe('01:10')
    })

    it('minimumAmountOfSleepInMinutes fits multiple sleep cycles', () => {
      sut = makeSut({
        baseTime: '22:00',
        oneSleepCycleDurationInMinutes: 90,
        minimumAmountOfSleepInMinutes: 60 * 9,
      })

      expect(sut.run()).toBe('07:00')
    })
  })

  describe('oneSleepCycleDurationInMinutes > minimumAmountOfSleepInMinutes', () => {
    it('should calculate first result only one sleep cycle after given base time', () => {
      sut = makeSut({
        baseTime: '22:00',
        oneSleepCycleDurationInMinutes: 90,
        minimumAmountOfSleepInMinutes: 30,
      })

      expect(sut.run()).toBe('23:30')
    })

    it('should calculate first result only one sleep cycle after given base time, 2', () => {
      sut = makeSut({
        baseTime: '22:00',
        oneSleepCycleDurationInMinutes: 20,
        minimumAmountOfSleepInMinutes: 15,
      })

      expect(sut.run()).toBe('22:20')
    })
  })
})
