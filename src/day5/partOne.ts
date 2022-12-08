import { readFile } from 'fs/promises'
import { join } from 'path'

const createStackFromFileResult = (lines: string[]) => {
  let endingIndex = 0
  const tempStacks: string[][] = []

  lines.every((line, idx) => {
    if (line === '') {
      endingIndex = idx + 1
      return false
    }

    const elements = line
      .split(/(.{4})/)
      .filter((O) => O)
      .map((l) => l.trim())

    if (elements) {
      tempStacks.push(elements)
    }

    return true
  })

  // Remove the stack index from the file
  tempStacks.pop()

  // Transpose the 2D-array, remove empty strings '' and [] characters from the string
  const stacks = tempStacks[0]
    .map((_, colIndex) => tempStacks.map((row) => row[colIndex]).reverse())
    .map((s) => s.filter((n) => n))
    .map((s) => s.map((x) => x.slice(1, 2)))

  return { stacks, endingIndex }
}

const executeInstructions = (move: number, from: number, to: number, stacks: string[][]) => {
  const temp: string[] = []

  for (let i = 0; i < move; i++) {
    const el = stacks[from].pop()

    if (el) temp.push(el)
  }

  temp.forEach((el) => stacks[to].push(el))
}

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const lines = fileResult.split('\n')

  const { stacks, endingIndex } = createStackFromFileResult(lines)

  const wordsToRemove = ['move', 'from', 'to']
  const expStr = wordsToRemove.join('\\b|\\b')

  const instructions = lines.slice(endingIndex).map((line) =>
    line
      .replace(new RegExp(expStr, 'gi'), '')
      .trim()
      .replace(/ +/g, ' ')
      .split(' ')
      .map((instruction) => Number(instruction)),
  )

  instructions.forEach((i) => executeInstructions(i[0], i[1] - 1, i[2] - 1, stacks))

  const result = stacks.map((s) => s.pop()).join('')

  console.log(`Result: ${result}`)
}
