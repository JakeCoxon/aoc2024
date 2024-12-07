import fs from 'node:fs'

const input = (await fs.promises.readFile('input6.txt', 'utf-8')).trim().split('\n')
const p = performance.now()
const grid = input.map(line => line.split(''))

const height = grid.length
const width = grid[0].length

type Vec = readonly [number, number]

const startPos: Vec = (() => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === '^') return [x, y]
    }
  }
  throw new Error('No start position found') // type checking
})()

let dir: Vec = [0, -1]
let pos: Vec = [...startPos]

const visited = new Set<string>([`${pos}`])

while (true) {
  const [dx, dy] = dir
  const [nx, ny] = [pos[0] + dx, pos[1] + dy]

  if (nx < 0 || nx >= width || ny < 0 || ny >= height) break

  if (grid[ny][nx] === '#') {
    dir = [-dy, dx] // rotate right
  } else {
    pos = [nx, ny]
    visited.add(`${pos}`)
  }
}
// console.log({ visited })
console.log({ visited: visited.size, time: `${performance.now() - p}ms` })