import { readFile } from 'fs/promises'
import { join } from 'path'

const strategyGuide = {
  X: 1,
  Y: 2,
  Z: 3,
}

const gameOutput = {
  AY: 6, // rock - paper
  AX: 3, // rock - rock
  AZ: 0, // rock - scissors

  BY: 3, // paper - paper
  BX: 0, // paper - rock
  BZ: 6, // paper - scissors

  CY: 0, // scissors - paper
  CX: 6, // scissors - rock
  CZ: 3, // scissors - scissors
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let points = 0

  fileResult.split('\n').forEach((round) => {
    const [firstUserInput, secondUserInput] = round.split(' ')
    const pointsForElement = strategyGuide[secondUserInput]
    const pointsForGameOutput = gameOutput[firstUserInput + secondUserInput]

    points += pointsForElement + pointsForGameOutput
  })

  console.log(`Points: ${points}`)
}
