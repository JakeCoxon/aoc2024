import fs from 'node:fs'
import zip from 'lodash/zip'

const lines = (await fs.promises.readFile('input2.txt', 'utf-8')).trim().split('\n')

const safeDiff = (x: number) => x <= 3 && x >= 1

const safeDiffs = (nums: number[]) => {
  const diffs = zip(nums, nums.slice(1))
    .filter(([x, y]) => y !== undefined) as [number, number][]
  return diffs.every(([x, y]) => safeDiff(y - x))
}

const safes = lines.map((x) => {
  const nums = x.split(/\s+/).map(x => parseInt(x)) as number[]
  return safeDiffs(nums) || safeDiffs(nums.map(x => -x))
})

console.log({safes})
const countTrue = safes.filter(Boolean).length
console.log({countTrue})