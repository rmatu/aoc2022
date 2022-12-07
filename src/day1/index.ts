import { readFile } from 'fs/promises'
import { join } from 'path'

const main = async () => {
  const result = await readFile(join(__dirname, 'input-small.txt'), 'utf-8')
  console.log(result + 'xdff')
}

main()
