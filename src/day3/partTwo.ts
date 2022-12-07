import { readFile } from 'fs/promises'
import { join } from 'path'

const isCapital = (ch: string) => {
  return ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 90
}

const intersection = (...arrays: string[][]): string[] => {
  const intersectedArray: string[] = []

  // Loop through the elements of the first array
  for (const element of arrays[0]) {
    let isIntersected = true

    // Loop through the remaining arrays and check if the element exists in all of them
    for (let i = 1; i < arrays.length; i++) {
      if (!arrays[i].includes(element)) {
        isIntersected = false
        break
      }
    }

    // If the element is present in all arrays, add it to the intersected array
    if (isIntersected) {
      intersectedArray.push(element)
    }
  }

  return intersectedArray
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  let points = 0
  let lineCounter = 0
  const collectedHashes: string[] = []

  fileResult.split('\n').forEach((hash) => {
    lineCounter++

    collectedHashes.push(hash)

    if (lineCounter === 3) {
      const [first, second, third] = collectedHashes.map((hash) => hash.split(''))
      const [intersectionValue] = intersection(first, second, third)

      points += isCapital(intersectionValue)
        ? intersectionValue.charCodeAt(0) - 38
        : intersectionValue.charCodeAt(0) - 96

      lineCounter = 0
      collectedHashes.length = 0
    }
  })

  console.log(`Points: ${points}`)
}
