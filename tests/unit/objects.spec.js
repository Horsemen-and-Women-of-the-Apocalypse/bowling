import Player from '../../src/objets/player'
import GameParam from '../../src/objets/gameparam'
import Automaton from '../../src/objets/automaton'

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
      expect(g.getTurn()).toEqual(10)
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
      expect(g.getTurn()).toEqual(10)
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

      const t = () => {
        g.getPlayerAt(0)
      }

      expect(t).toThrow('index out of bound')
      expect(g.getTurn()).toEqual(10)
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
      expect(g.getTurn()).toEqual(10)
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

      const h = () => {
        g.removePlayerFromIndex(3)
      }

      expect(h).toThrow('index out of bound')
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
      var p3 = new Player('Nom3')

      var players = [p, p2]

      var g = new GameParam(players, 10, 5)

      const t = () => {
        g.removePlayer(g)
      }

      expect(t).toThrow('bad type argument')

      const h = () => {
        g.removePlayer(p3)
      }

      expect(h).toThrow('player not in list')
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

      const h = () => {
        return new GameParam(5, 10, 5)
      }

      expect(h).toThrow('players is not a list')
    })
  })

  describe('errorConstructTurn', () => {
    test('Assert contents', () => {
      const t = () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        return new GameParam(players, 'test', 5)
      }

      expect(t).toThrow('bad turn type argument')

      const h = () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        return new GameParam(players, -1, 5)
      }

      expect(h).toThrow('wrong number of turn')
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

      const h = () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        return new GameParam(players, 10, -1)
      }

      expect(h).toThrow('wrong number of pins')
    })
  })

  describe('automaton', () => {
    describe('constructor', () => {
      test('Not null', () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        var g = new GameParam(players, 10, 5)

        var a = new Automaton(g)

        expect(a).not.toBeNull()
      })
    })

    describe('errorConstruct', () => {
      test('Throw', () => {
        const t = () => {
          var p = new Player('Jean Robert')

          return new Automaton(p)
        }

        expect(t).toThrow('bad type argument')
      })
    })

    describe('advance', () => {
      test('Assert contents', () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        var g = new GameParam(players, 10, 5)

        var a = new Automaton(g)

        expect(a.getCurrentPlayer()).toBe(p)
        a.advance()
        expect(a.getCurrentPlayer()).toBe(p2)
      })
    })

    describe('advanceIfFinish', () => {
      test('Assert contents', () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        var g = new GameParam(players, 1, 5)

        var a = new Automaton(g)

        expect(a.getCurrentPlayer()).toBe(p)
        a.advance()
        a.advance()
        expect(a.isEnd()).toBe(true)
        a.advance()
        expect(a.isEnd()).toBe(true)
        expect(a.getCurrentPlayer()).toBe(p)
      })
    })

    describe('currentPlayer', () => {
      test('Assert contents', () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        var g = new GameParam(players, 10, 5)

        var a = new Automaton(g)

        expect(a.getCurrentPlayer()).toBe(p)
        a.advance()
        expect(a.getCurrentPlayer()).toBe(p2)
        a.advance()
        expect(a.getCurrentPlayer()).toBe(p)
      })
    })

    describe('currentTurn', () => {
      test('Assert contents', () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        var g = new GameParam(players, 10, 5)

        var a = new Automaton(g)

        expect(a.getCurrentTurn()).toBe(0)
        a.advance()
        a.advance()
        expect(a.getCurrentTurn()).toBe(1)
        a.advance()
        expect(a.getCurrentTurn()).toBe(1)
        a.advance()
        expect(a.getCurrentTurn()).toBe(2)
      })
    })

    describe('isEnd', () => {
      test('Assert contents', () => {
        var p = new Player('Nom')
        var p2 = new Player('Nom2')

        var players = [p, p2]

        var g = new GameParam(players, 2, 10)

        var a = new Automaton(g)

        expect(a.isEnd()).toBe(false)
        a.advance()
        a.advance()
        expect(a.isEnd()).toBe(false)
        a.advance()
        a.advance()
        expect(a.isEnd()).toBe(true)
      })
    })
  })
})
