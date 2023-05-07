import { CachePageSizesArgs } from './types'
import cache from '@actions/cache'
import { VERSION } from './constants'

const key = 'next-build-size-' + VERSION

export const cachePageSizes = async (args: CachePageSizesArgs) => {
  const paths = [args.filePath]
  const cacheId = await cache.saveCache(paths, key)
}
