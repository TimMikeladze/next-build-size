import { readFileSync, unlinkSync } from 'fs'
import { writePageSizes } from '../src/writePageSizes'

describe('writePageSizes', () => {
  it('works', () => {
    const { filePath } = writePageSizes({
      nextDir: 'artifacts/nextjs-blog',
      output: 'tests/next-build-size'
    })

    const data = JSON.parse(readFileSync(filePath, 'utf8'))

    expect(data).toMatchObject({
      '/': expect.any(String),
      '/_app': expect.any(String),
      '/_error': expect.any(String)
    })

    unlinkSync(filePath)
  })
})
