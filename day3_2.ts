import fs from 'node:fs'

const input = (await fs.promises.readFile('input3.txt', 'utf-8')).trim()

const m = input.matchAll(/mul\((\d{1,3}?),(\d{1,3}?)\)|do\(\)|don't\(\)/g)

let total = 0
let enabled = true
m.forEach(x => {
  if (x[0] === "do()") enabled = true
  else if (x[0] === "don't()") enabled = false
  else if (enabled) total += Number(x[1]) * Number(x[2])
})
console.log(total)
