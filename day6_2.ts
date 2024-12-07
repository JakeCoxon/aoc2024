import fs from 'node:fs'

const input = (await fs.promises.readFile('input6.txt', 'utf-8')).trim().split('\n')
const p = performance.now()

const grid = input.map(line => line.split('').map(c => c === '#' ? 1 : 0))

const height = grid.length
const width = grid[0].length

type Vec = readonly [number, number]

const startPos: Vec = (() => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (input[y][x] === '^') return [x, y]
    }
  }
  throw new Error('No start position found') // type checking
})()

const obstructions = new Set<string>()
const noObstructions = new Set<string>()

const checkLoopWithNewObstruction = (startPos: Vec, startDir: Vec, obstruction: Vec) => {

  if (obstructions.has(`${obstruction}`)) return
  if (noObstructions.has(`${obstruction}`)) return

  let dir = startDir
  let pos = startPos

  const path = new Set<string>()

  while (true) {
    const [dx, dy] = dir
    const [nx, ny] = [pos[0] + dx, pos[1] + dy]

    if (nx < 0 || nx >= width || ny < 0 || ny >= height) break

    const obstructed = grid[ny][nx] || 
      nx === obstruction[0] && ny === obstruction[1]

    if (!obstructed) { 
      pos = [nx, ny]; 
      continue
    }
    path.add(`${pos}_${dir}`)

    // has loop
    if (path.has(`${pos}_${dir}`)) {
      obstructions.add(`${obstruction}`)
      return
    }
    dir = [-dy, dx]
  }
  noObstructions.add(`${obstruction}`)
}

let dir: Vec = [0, -1]
let pos: Vec = [...startPos]

while (true) {
  const [dx, dy] = dir
  const [nx, ny] = [pos[0] + dx, pos[1] + dy]
  const rotatedRight: Vec = [-dir[1], dir[0]]

  if (nx < 0 || nx >= width || ny < 0 || ny >= height) break

  if (grid[ny][nx]) {
    dir = rotatedRight
  } else {
    checkLoopWithNewObstruction(pos, rotatedRight, [nx, ny])
    pos = [nx, ny]
  }
}

// correct answer 1888
console.log({ numObstructions: obstructions.size, time: `${performance.now() - p}ms` })
