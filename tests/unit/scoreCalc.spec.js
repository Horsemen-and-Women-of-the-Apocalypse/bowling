import scoreCalculation from "../../src/objets/scoreCalculator"

describe('scoreCalculation', () => {
    test('empty array', () => {
        var tb = [null, null, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(0)
    })
    test('full strikes', () => {
        var tb = [10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 10, 10]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(300)
    })
    test('spare, 3 2 1 strikes, spare last turn', () => {
        var tb = [5, 5, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 5, 5, 5, 5, 5]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(245)
    })
    test('game with less than 10 turns', () => {
        var tb = [5, 0, 5, 0, 5, 5, 5]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(25)
    })
    test('2 + 2 = 4', () => {
        var tb = [2, 2, 0, 0, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(4)
    })
    test('null after strike, 2 turns before the end', () => {
        var tb = [10, 0, null, null, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(0)
    })
    test('null after strike', () => {
        var tb = [10, 0, null, null, null, null, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(0)
    })
    test('null after 2 strikes', () => {
        var tb = [10, 0, 10, 0, null, null, null, null, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(0)
    })
    test('null after spare', () => {
        var tb = [5, 5, null, null, null, null, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(0)
    })
    test('turn not finished', () => {
        var tb = [5, null, null, null, null, null, null]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(0)
    })
    test('spare and 5', () => {
        var tb = [5, 5, 5, 0, 0, 0, 0]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(20)
    })
    test('1 strike', () => {
        var tb = [10, 0, 2, 0, 2, 0, 0]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(16)
    })
    test('2 strikes', () => {
        var tb = [10, 0, 10, 0, 2, 0, 0]
        var score = scoreCalculation(tb, 10)
        expect(score).toBe(36)
    })
    test('array is null', () => {
        expect(() => scoreCalculation(null, 10)).toThrow('throwArray is null')
    })
    test('array does not contain enough values', () => {
        expect(() => scoreCalculation([2, 2], 10)).toThrow('throwArray must contain at least 3 values')
    })
    test('array with even number of values', () => {
        expect(() => scoreCalculation([2, 2, 2, 2], 10)).toThrow('throwArray has even length')
    })
  })