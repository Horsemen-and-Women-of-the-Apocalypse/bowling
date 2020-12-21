/**
 * Class to describe player
 */
export default class Player {
    #name = ''

    /**
     * @param {string} cname - Name of player
     */
    constructor (cname) {
      if (typeof (cname) === typeof (String())) {
        this.#name = cname
      } else {
        throw new Error('bad name type argument')
      }
    }

    /**
     * return player name
     */
    getName () {
      return this.#name
    }
}
