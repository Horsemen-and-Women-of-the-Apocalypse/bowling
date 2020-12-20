import Player from '../../src/objets/player'
import GameParam from '../../src/objets/gameparam'

describe('player', () => {
  describe('constructor', () => {
    test('Assert contents', () => {
      var p = new Player('Nom')
      var p2 = new Player('Nom2')

      expect(p.getName()).toStrictEqual('Nom')
      expect(p2.getName()).toStrictEqual('Nom2')
    })
  })

  describe('errorConstruct', () => {
    test('Assert contents', () => {
      const t = () => {
        return new Player(42)
      }

      expect(t).toThrow('bad name type argument')
    })
  })
})

describe('gameparam', () => {
  describe('constructor', () => {
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

  describe('addPlayer', () => {
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

  describe('removePlayer', () => {
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

  describe('getPlayers', () => {
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

  describe('errorremovePlayerFromIndex', () => {
    test('Assert contents', () => {
      var p = new Player('Nom')
      var p2 = new Player('Nom2')

      var players = [p, p2]

      var g = new GameParam(players, 10, 5)

      const t = () => {
        g.removePlayerFromIndex('Test')
      }

      expect(t).toThrow('bad type argument')
    })
  })

  describe('errorgetPlayerAt', () => {
    test('Assert contents', () => {
      var p = new Player('Nom')
      var p2 = new Player('Nom2')

      var players = [p, p2]

      var g = new GameParam(players, 10, 5)

      const t = () => {
        g.getPlayerAt('Test')
      }

      expect(t).toThrow('bad type argument')
    })
  })

  describe('erroraddPlayer', () => {
    test('Assert contents', () => {
      var p = new Player('Nom')
      var p2 = new Player('Nom2')

      var players = [p, p2]

      var g = new GameParam(players, 10, 5)

      const t = () => {
        g.addPlayer(42)
      }

      expect(t).toThrow('bad type argument')
    })
  })

  describe('errorremovePlayer', () => {
    test('Assert contents', () => {
      var p = new Player('Nom')
      var p2 = new Player('Nom2')

      var players = [p, p2]

      var g = new GameParam(players, 10, 5)

      const t = () => {
        g.removePlayer(g)
      }

      expect(t).toThrow('bad type argument')
    })
  })

  describe('errorConstructPlayers', () => {
    test('Assert contents', () => {
      const t = () => {
        var p = new Player('Nom')

        var players = [p, 'TEST']

        return new GameParam(players, 10, 5)
      }

      expect(t).toThrow('bad players type argument')
    })
  })

  describe('errorConstructCount', () => {
    test('Assert contents', () => {
      const t = () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        return new GameParam(players, 'test', 5)
      }

      expect(t).toThrow('bad count type argument')
    })
  })

  describe('errorConstructPins', () => {
    test('Assert contents', () => {
      const t = () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        return new GameParam(players, 10, 'test')
      }

      expect(t).toThrow('bad pins type argument')
    })
  })
})
