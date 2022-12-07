import { readFile } from 'fs/promises'
import { join } from 'path'

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let max = 0
  let calories = 0

  fileResult.split('\n').forEach((line) => {
    calories = Number(line) + calories

    if (line === '') {
      max = calories > max ? calories : max
      calories = 0
    }
  })

  console.log(`Result: ${max}`)
}
