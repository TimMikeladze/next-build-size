import { readFileSync, unlinkSync } from 'fs'
import { writePageSizes } from '../src/writePageSizes'

describe('writePageSizes', () => {
  it('works', () => {
    const { filePath } = writePageSizes({
      nextDir: 'artifacts/nextjs-blog',
      output: 'tests/next-build-size.json'
    })

    const data = readFileSync(filePath, 'utf8')

    expect(data).toBeTruthy()

    unlinkSync(filePath)
  })
})
