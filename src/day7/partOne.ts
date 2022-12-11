import { readFile } from 'fs/promises'
import { join } from 'path'

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const lines = fileResult.split('\n')

  const folders: { path: string; amount: number; level: number }[] = []

  let level = 0
  let isReadingLines = false
  let currentFolderPath: string[] = []
  let currAmount = 0

  lines.forEach((line, idx) => {
    if (level < 0) throw new Error('Out of file structure')

    const isCdLine = line.slice(0, 4) === '$ cd'
    const isBackCdLine = line === '$ cd ..'
    const isLsLine = line === '$ ls'
    const isCommandLine = line.slice(0, 1) === '$'
    // if the 1st character is a number, we know that it's the file line
    const isFileLine = Number.isInteger(Number(line.slice(0, 1)))

    if (isReadingLines && isFileLine) {
      currAmount += Number(line.split(' ')[0])
    }

    if ((isReadingLines && isCommandLine) || idx + 1 === lines.length) {
      const path = currentFolderPath.join('')

      folders.push({ path, amount: currAmount, level })

      isReadingLines = false
      currAmount = 0
    }

    if (isBackCdLine) {
      currentFolderPath.pop()
      level--
      return
    }

    if (isCdLine) {
      currentFolderPath.push(line.split(' ')[2])
      level++
    }

    if (isLsLine) {
      isReadingLines = true
      return
    }
  })

  const foldersWithNestedAmount: { path: string; amount: number; level: number }[] = []

  let i = 0

  for (let folder of folders) {
    foldersWithNestedAmount.push({ ...folder })
    for (let folder2 of folders) {
      if (folder2.path.includes(folder.path) && folder2.path !== folder.path) {
        foldersWithNestedAmount[i].amount += folder2.amount
      }
    }
    i++
  }

  const result = foldersWithNestedAmount
    .filter((f) => f.amount <= 100000 && f.amount !== 0)
    .reduce((a, b) => a + b.amount, 0)

  console.log(`Result: ${result}`)
}
