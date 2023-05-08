import { getPageSizes } from '../src'

describe('getPageSizes', () => {
  it('works', () => {
    const pageSizes = getPageSizes({
      nextDir: 'artifacts/nextjs-blog'
    })

    const first = Object.values(pageSizes)[0]

    expect(first).toMatchObject({
      filePath: expect.any(String),
      size: expect.any(Number)
    })
  })
})
