import fs from 'node:fs'

const lines = (await fs.promises.readFile('input4.txt', 'utf-8')).trim().split('\n')
const grid = lines.map(x => x.split(''))

const width = grid[0].length
const height = grid.length

const dirs = [
  [1, 1], [1, -1], [-1, -1], [-1, 1]
]
const find = (x: number, y: number, dx: number, dy: number, word: string) => {
  if (x < 0 || y < 0 || x >= width || y >= height) return false
  if (grid[y][x] !== word[0]) return false
  if (word.length === 1) return true
  return find(x + dx, y + dy, dx, dy, word.slice(1))
}
let numFound = 0
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const search = dirs.filter(([dx, dy]) => 
      find(x - dx, y - dy, dx, dy, "MAS"))
    if (search.length === 2) numFound ++
  }
}
console.log({ numFound })