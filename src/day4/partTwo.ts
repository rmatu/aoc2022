import { readFile } from 'fs/promises'
import { join } from 'path'

const convertToNumberRange = (range: string) => {
  const [start, end] = range.split('-')

  return [Number(start), Number(end)]
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const lines = fileResult.split('\n')
  let points = 0

  lines.forEach((line) => {
    const [firstRange, secondRange] = line.split(',')

    const [a1, b1] = convertToNumberRange(firstRange)
    const [a2, b2] = convertToNumberRange(secondRange)

    if (a2 >= a1 && b2 <= b1) {
      points++
    } else if (a1 >= a2 && b1 <= b2) {
      points++
    }
  })

  console.log(`Points: ${points}`)
}
