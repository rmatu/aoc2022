import { readFile } from 'fs/promises'
import { join } from 'path'

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const lines = fileResult.split('\n')

  let calories = 0
  const caloriesSum: number[] = []

  lines.forEach((line, idx) => {
    calories = Number(line) + calories

    if (line === '' || idx === lines.length - 1) {
      caloriesSum.push(calories)
      calories = 0
    }
  })

  const total = caloriesSum
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0)

  console.log(`Result: ${total}`)
}
