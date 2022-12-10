import { readFile } from 'fs/promises'
import { join } from 'path'

export const main = async () => {
  const fileResult = await readFile(join(__dirname, 'input.txt'), 'utf-8')
  const allCharacters = fileResult.split('')

  const packet: string[] = []
  let markerPosition = 0

  allCharacters.every((char, idx) => {
    packet.push(char)

    if (idx < 14) return true

    packet.shift()
    const set = new Set(packet)

    if (set.size === 14) {
      markerPosition = idx + 1
      return false
    }

    return true
  })

  console.log(`Result: ${markerPosition}`)
}
