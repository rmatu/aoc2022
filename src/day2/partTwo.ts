import { readFile } from 'fs/promises'
import { join } from 'path'

const strategyGuide = {
  X: 0, // Lose
  Y: 3, // Draw
  Z: 6, // Win
}

const gameElementPoints = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
}

type GameElementPoint = keyof typeof gameElementPoints
type StrategyGuide = keyof typeof strategyGuide

const toWin = {
  A: 'B',
  B: 'C',
  C: 'A',
}

const toDraw = {
  A: 'A',
  B: 'B',
  C: 'C',
}

const toLose = {
  A: 'C',
  B: 'A',
  C: 'B',
}

const executeStrategy = (firstUserInput: GameElementPoint, gameStrategy: StrategyGuide) => {
  if (gameStrategy === 'Z') {
    return gameElementPoints[toWin[firstUserInput]]
  }

  if (gameStrategy === 'Y') {
    return gameElementPoints[toDraw[firstUserInput]]
  }

  if (gameStrategy === 'X') {
    return gameElementPoints[toLose[firstUserInput]]
  }

  throw new Error('Game strategy does not exist')
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let points = 0

  fileResult.split('\n').forEach((round) => {
    const [firstUserInput, secondUserInput] = round.split(' ') as [GameElementPoint, StrategyGuide]
    const pointsForStrategy = strategyGuide[secondUserInput]

    const pointsForElement = executeStrategy(firstUserInput, secondUserInput)

    points += pointsForStrategy + pointsForElement
  })

  console.log(`Points: ${points}`)
}
