import fs from 'node:fs'

const input = (await fs.promises.readFile('input3.txt', 'utf-8')).trim()

const m = input.matchAll(/mul\((\d{1,3}?),(\d{1,3}?)\)/g)
const nums = [...m.map(x => Number(x[1]) * Number(x[2]))]
console.log(nums.reduce((acc, x) => acc + x, 0))
