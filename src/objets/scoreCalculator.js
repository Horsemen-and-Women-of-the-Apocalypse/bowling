export default
/**
 * Calculates the score of a player at any turn
 *
 * @param throwArray Array filled with throws. Apart from the last turn, a trurn is always 2 throws (strike =  [10, 0])
 * @param maxPins Max pins in the game
 * @return total score
 */
function scoreCalculation(throwArray, maxPins) {
    var totalScore = 0
    if (throwArray === null) throw Error('throwArray is null')
    if (throwArray.length < 3) throw Error('throwArray must contain at least 3 values')
    if ((throwArray.length % 2) === 0) throw Error('throwArray has even length')
    for (let i = 0; i < throwArray.length; i++) {
        if(throwArray[i] === null) break
        // Strike
        if (throwArray[i] === maxPins) {
            // special conditions if the strike happens around the last 3 throws
            if (i >= throwArray.length - 3) {
                totalScore += maxPins
            } else if (i + 5 === throwArray.length) {
                if (throwArray[i + 2] === null || throwArray[i + 3] === null) {
                    break
                }
                totalScore += maxPins + throwArray[i + 2] + throwArray[i + 3]
                i = i + 1
            } else {
                if(throwArray[i + 2] === null || throwArray[i + 3] === null) {
                    break
                }
                // next throw is a strike as well
                if (throwArray[i + 2] === maxPins) {
                    if(throwArray[i + 4] === null) {
                        break
                    }
                    totalScore += (2 * maxPins) + throwArray[i + 4]
                } else {
                    totalScore += maxPins + throwArray[i + 2] + throwArray[i + 3]
                }
                i = i + 1
            }
        } else {
            if(i >= throwArray.length - 3) {
                totalScore += throwArray[i]
            } else {
                if(throwArray[i + 1] === null) {
                    break
                }
                var turnScore = throwArray[i] + throwArray[i + 1]
                // Spare
                if(turnScore === maxPins) {
                    if(throwArray[i + 3] === null) {
                        break
                    }
                    totalScore += turnScore + throwArray[i + 2]
                } else {
                    totalScore += turnScore
                }
                i = i + 1
            }
        }
    }
    return totalScore
}