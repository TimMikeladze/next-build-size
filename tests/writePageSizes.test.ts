import { readFileSync, unlinkSync } from 'fs'
import { writePageSizes } from '../src'

describe('writePageSizes', () => {
  it('works', () => {
    const { filePath } = writePageSizes({
      nextDir: 'artifacts/nextjs-blog',
      output: 'tests/next-build-size'
    })

    const data = JSON.parse(readFileSync(filePath, 'utf8'))

    expect(data).toEqual(
      expect.arrayContaining([
        {
          filePath: expect.any(String),
          size: expect.any(Number)
        }
      ])
    )

    unlinkSync(filePath)
  })
})
