import { comparePageSizes } from '../src'

describe('comparePageSizes', () => {
  it('works', () => {
    expect(
      comparePageSizes(
        [
          {
            filePath: '_app',
            size: 10000
          },
          {
            filePath: '_error',
            size: 20000
          },
          {
            filePath: '_404',
            size: 20000
          }
        ],
        [
          {
            filePath: '_app',
            size: 10000
          },
          {
            filePath: '_error',
            size: 10000
          },
          {
            filePath: '_404',
            size: 30000
          }
        ]
      )
    ).toMatchSnapshot()
  })
})
