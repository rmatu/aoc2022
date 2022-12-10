import { readFile } from 'fs/promises'
import { join } from 'path'

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const lines = fileResult.split('\n')
  const result = 0

  console.log(`Result: ${result}`)
}
