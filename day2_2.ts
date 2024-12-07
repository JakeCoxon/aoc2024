import fs from 'node:fs'
import zip from 'lodash/zip'

const lines = (await fs.promises.readFile('input2.txt', 'utf-8')).trim().split('\n')

// Answer: 436

const safeDiff = (x: number) => x <= 3 && x >= 1

const safeDiffsOriginal = (nums: number[]) => {
  const diffs = zip(nums, nums.slice(1))
    .filter(([x, y]) => y !== undefined) as [number, number][]
  return diffs.every(([x, y]) => safeDiff(y - x))
}

const safeDiffsBruteForce = (a: number[]) => 
  a.some((x, i) => 
    safeDiffsOriginal(a.filter((_, j) => j !== i)))

const safeDiffs = (list: number[], skips: number = 0) => {
  if (list.length <= 1) return true
  const [a, b] = list
  if (safeDiff(b - a) && safeDiffs(list.slice(1), skips)) return true
  if (skips === 0 && safeDiffs([a, ...list.slice(2)], 1)) return true
  return false
}

const safeDiffs2 = (list: number[]) => 
  safeDiffs(list) || safeDiffs(list.slice(1), 1) || 
  safeDiffs(list.map(x => -x)) || safeDiffs(list.map(x => -x).slice(1), 1)

const safes = lines.map((x) => {
  const nums: number[] = x.split(/\s+/).map(x => parseInt(x)!)
  return safeDiffs2(nums)
})

console.log({safes})

const countTrue = safes.filter(x => x).length
console.log({countTrue})