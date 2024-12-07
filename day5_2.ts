import fs from 'node:fs'

const input = (await fs.promises.readFile('input5.txt', 'utf-8')).trim().split('\n\n')
const section1 = input[0].split('\n').map(x => x.split("|").map(x => parseInt(x)))
const section2 = input[1].split('\n').map(x => x.split(",").map(x => parseInt(x)))

const smallToLarge = new Set<string>()
section1.forEach(([a, b]) => smallToLarge.add(`${a},${b}`))

const listEqual = (a: number[], b: number[]) => {
  return a.length === b.length && a.every((x, i) => x === b[i])
}

let result = 0
section2.forEach((list, i) => {
  const sorted = [...list].sort((a, b) => {
    if (smallToLarge.has(`${a},${b}`)) return -1
    if (smallToLarge.has(`${b},${a}`)) return 1
    return 0
  })
  if (!listEqual(sorted, list)) {
    result += sorted[(sorted.length - 1) / 2]
  }
})


console.log({smallToLarge})
console.log({result})
