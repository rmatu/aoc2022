import { readFile } from 'fs/promises'
import { join } from 'path'

const isCapital = (ch: string) => {
  return ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 90
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let points = 0

  fileResult.split('\n').forEach((hash) => {
    const firstPart = hash.slice(0, hash.length / 2).split('')
    const secondPart = hash.slice(hash.length / 2, hash.length).split('')

    const [sharedElement] = firstPart.filter((element) => secondPart.includes(element))

    points += isCapital(sharedElement)
      ? sharedElement.charCodeAt(0) - 38
      : sharedElement.charCodeAt(0) - 96
  })

  console.log(`Points: ${points}`)
}
