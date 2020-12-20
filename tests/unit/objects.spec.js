import Player from '../../src/objets/player'
import GameParam from '../../src/objets/gameparam'

describe('player', () => {
  test('Assert contents', () => {
    var p = new Player('Nom')
    var p2 = new Player('Nom2')

    expect(p.getName()).toStrictEqual('Nom')
    expect(p2.getName()).toStrictEqual('Nom2')
  })
})

describe('gameparamCreate', () => {
  test('Assert contents', () => {
    var p = new Player('Nom')
    var p2 = new Player('Nom2')

    var players = [p, p2]

    var g = new GameParam(players, 10, 5)

    expect(g.getPlayerAt(0).getName()).toStrictEqual('Nom')
    expect(g.getPlayerAt(1).getName()).toStrictEqual('Nom2')
    expect(g.getCount()).toEqual(10)
    expect(g.getPins()).toEqual(5)
  })
})

describe('gameparamAdd', () => {
  test('Assert contents', () => {
    var p = new Player('Nom')
    var p2 = new Player('Nom2')

    var players = [p, p2]

    var g = new GameParam(players, 10, 5)

    var p3 = new Player('Nom3')

    g.addPlayer(p3)

    expect(g.getPlayerAt(0).getName()).toStrictEqual('Nom')
    expect(g.getPlayerAt(1).getName()).toStrictEqual('Nom2')
    expect(g.getPlayerAt(2).getName()).toStrictEqual('Nom3')
    expect(g.getCount()).toEqual(10)
    expect(g.getPins()).toEqual(5)
  })
})

describe('gameparamRemove', () => {
  test('Assert contents', () => {
    var p = new Player('Nom')
    var p2 = new Player('Nom2')

    var players = [p, p2]

    var g = new GameParam(players, 10, 5)

    g.removePlayer(p)

    expect(g.getPlayerAt(0).getName()).toStrictEqual('Nom2')

    g.removePlayerFromIndex(0)

    expect(g.getPlayerAt(0)).toBeUndefined()
    expect(g.getCount()).toEqual(10)
    expect(g.getPins()).toEqual(5)
  })
})

describe('gameparamPlayers', () => {
  test('Assert contents', () => {
    var p = new Player('Nom')
    var p2 = new Player('Nom2')

    var players = [p, p2]

    var g = new GameParam(players, 10, 5)

    var players2 = g.getPlayers()

    expect(players2).toEqual(players)
    expect(g.getCount()).toEqual(10)
    expect(g.getPins()).toEqual(5)
  })
})
