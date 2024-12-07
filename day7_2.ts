import fs from 'node:fs'

const input = (await fs.promises.readFile('input7.txt', 'utf-8')).trim().split('\n')
const lines = input.map(line => [Number(line.split(':')[0]), line.split(':')[1].trim().split(" ").map(Number)]) as [number, number[]][]

console.log({lines})

let total = 0
lines.forEach(([target, nums]) => {
  const find = (acc: number, nums: number[]) => {
    if (nums.length === 0) return acc === target
    const [x, ...rest] = nums
    return find(acc + x, rest) || find(acc * x, rest) || find(Number(`${acc}${x}`), rest)
  }

  const f = find(nums[0], nums.slice(1))
  if (f) total += target

})
console.log({total})