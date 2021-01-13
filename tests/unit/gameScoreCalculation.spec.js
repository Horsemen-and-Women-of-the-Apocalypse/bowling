import GameScore from '../../src/objets/gameScore'
import GameParam from '../../src/objets/gameparam'
import Player from '../../src/objets/player'

// Unit testing for score calculation has already been done in 'scoreCalc.spec.js'
// The purpose of this test is to ensure the score is filled in the right place
// We want to try
// Double strike '
// Strike + spare '
// Strike + 2 throws != spare '
// Spare '
// Normal throw '
// 2 throws
describe('Global assertion of GameScore.registerThrow(...) method', () => {
  const imaginaryPlayer = new Player('Joseph')
  const imaginaryParams = new GameParam([imaginaryPlayer], 7, 10)
  var imaginaryGame = new GameScore(imaginaryParams)

  // Strike. Score must be null
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 1, 1, 10)
  let throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[0].score).toBe(null)

  // Another Strike. Score still null
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 2, 1, 10)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[0].score).toBe(null)

  // Normal throw. Score turn 1 should be displayed, score turn 2 shouldn't
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 3, 1, 2)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[0].score).toBe(22)
  expect(throwData[1].score).toBe(null)

  // Normal throw. Turn isnt spare, two scores should have been filled for one throw
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 3, 2, 2)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[1].score).toBe(36)
  expect(throwData[2].score).toBe(40)

  // Normal throw. Expected score for current turn is null
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 4, 1, 2)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[3].score).toBe(null)

  // Spare. Expected score for current turn is null
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 4, 2, 8)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[3].score).toBe(null)

  // Throw. Score for previous turn should be filled, but not for current turn
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 5, 1, 8)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[3].score).toBe(58)
  expect(throwData[4].score).toBe(null)

  // Throw. No Spare. Score for this turn should be filled
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 5, 2, 1)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[4].score).toBe(67)

  // Strike before last turn
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 6, 1, 10)
  expect(throwData[5].score).toBe(null)

  // Last turn. Strikes should be filled instantly
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 7, 1, 10)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[5].score).toBe(null)
  expect(throwData[6].score).toBe(null)
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 7, 2, 10)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[5].score).toBe(97)
  expect(throwData[6].score).toBe(null)
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 7, 3, 10)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[6].score).toBe(127)
  test('Assert score', () => {
  })
})

describe('Global assertion of GameScore.registerThrow(...) method', () => {
  const imaginaryPlayer = new Player('Joseph')
  const imaginaryParams = new GameParam([imaginaryPlayer], 2, 10)
  var imaginaryGame = new GameScore(imaginaryParams)

  // 0 + 0 = 0
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 1, 1, 0)
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 1, 2, 0)
  let throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[0].score).toBe(0)

  // Score must be filled at 2nd throw of last turn if the player did not manage to do a spare or strike
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 2, 1, 2)
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 2, 2, 2)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[1].score).toBe(4)
})

describe('Global assertion of GameScore.registerThrow(...) method', () => {
  const imaginaryPlayer = new Player('Joseph')
  const imaginaryParams = new GameParam([imaginaryPlayer], 5, 10)
  var imaginaryGame = new GameScore(imaginaryParams)

  // Strike
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 1, 1, 10)
  let throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[0].score).toBe(null)

  // Spare : score must be determined for the last turn, and empty for the current
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 2, 1, 2)
  imaginaryGame.registerThrow(imaginaryPlayer.getName(), 2, 2, 8)
  throwData = imaginaryGame.getThrows(imaginaryPlayer.getName())
  expect(throwData[0].score).toBe(20)
  expect(throwData[1].score).toBe(null)
})
