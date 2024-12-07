import fs from 'node:fs'
import { zip } from 'lodash'

const file = (await fs.promises.readFile('input1.txt', 'utf-8')).trim().split('\n')
const ids1 = file.map(x => parseInt(x.split(/\s+/)[0])).sort()
const ids2 = file.map(x => parseInt(x.split(/\s+/)[1])).sort()
const diff = zip(ids1, ids2).map(([id1, id2]) => Math.abs(id2! - id1!))
const sum = diff.reduce((acc, x) => acc + x, 0)
console.log({ ids1, ids2, diff, sum })