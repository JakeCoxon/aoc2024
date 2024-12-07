import fs from 'node:fs'

const file = (await fs.promises.readFile('input1.txt', 'utf-8')).trim().split('\n')
const ids1 = file.map(x => parseInt(x.split(/\s+/)[0])).sort()
const ids2 = file.map(x => parseInt(x.split(/\s+/)[1])).sort()

const appearances = ids2.reduce((acc, x) => {
  acc[x] = (acc[x] || 0) + 1
  return acc
}, {})

const sum = ids1.reduce((acc, x) => {
  const y = appearances[x] ? appearances[x] : 0
  return acc + y * x
}, 0)

console.log({ sum })