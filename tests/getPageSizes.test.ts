import { getPageSizes } from '../src/getPageSizes';

describe('getPageSizes', () => {
  it('works', () => {
    const pageSizes = getPageSizes({
      nextDir: 'artifacts/nextjs-blog',
    });

    const first = Object.values(pageSizes)[0];

    expect(first).toEqual(expect.any(String));
  });
});
