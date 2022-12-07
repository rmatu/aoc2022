import { readFile } from 'fs/promises'
import { join } from 'path'

const convertToNumberRange = (range: string) => {
  const [start, end] = range.split('-')

  return fillArrayWithIntegers(Number(start), Number(end))
}

const fillArrayWithIntegers = (start: number, end: number): number[] => {
  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const lines = fileResult.split('\n')
  let points = 0

  lines.forEach((line) => {
    const [firstRange, secondRange] = line.split(',')

    const firstArr = convertToNumberRange(firstRange)
    const secondArr = convertToNumberRange(secondRange)

    const isOverlapping = firstArr.find((el) => secondArr.includes(el))

    if (isOverlapping) {
      points++
    }
  })

  console.log(`Points: ${points}`)
}
