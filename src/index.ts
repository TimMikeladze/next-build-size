import cache from '@actions/cache'

import fs, {
  existsSync,
  mkdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync
} from 'fs'
import { resolve } from 'path'
import zlib from 'zlib'

export const VERSION = '1.0.9'

const key = 'next-build-size-' + VERSION

export type Pages = Record<string, string[]>

export type BuildManifest = {
  ampDevFiles: any[]
  ampFirstPages: any[]
  devFiles: any[]
  lowPriorityFiles: string[]
  pages: Pages
  polyfillFiles: string[]
  rootMainFiles: any[]
}

export type GetPageSizesArgs = {
  nextDir?: string
}

export type WritePageSizeArgs = {
  nextDir: string
  output: string
}

export type PageSizes = {
  filePath: string
  size: number
}[]

export type CacheNextBuildSizeArgs = {
  directoryPath: string
}

export type RestoreNextBuildSizeArgs = {
  directoryPath: string
}

export type ComparedPageSizes = {
  [key: string]: {
    diff: string
    size: string
  }
}

export const cacheNextBuildSize = async (args: CacheNextBuildSizeArgs) => {
  const paths = [args.directoryPath]
  return await cache.saveCache(paths, key)
}

export const restoreNextBuildSize = async (
  args: RestoreNextBuildSizeArgs
): Promise<PageSizes> => {
  const paths = [args.directoryPath]
  const cacheId = await cache.restoreCache(paths, key)

  if (!cacheId) {
    return []
  }

  const filePath = resolve(args.directoryPath, 'next-build-size.json')

  const data = JSON.parse(readFileSync(filePath, 'utf8'))

  unlinkSync(filePath)

  return data
}

export const getPageSizes = (args: GetPageSizesArgs) => {
  const nextDirPath = resolve(
    process.cwd(),
    args.nextDir ? args.nextDir : '.next'
  )

  const buildManifest = JSON.parse(
    fs.readFileSync(resolve(nextDirPath, 'build-manifest.json'), 'utf8')
  ) as BuildManifest

  let pageSizes = Object.keys(buildManifest.pages).map((filePath) => {
    const files = buildManifest.pages[filePath]
    const size = files
      .map((filename) => {
        const gzipped = zlib.gzipSync(
          fs.readFileSync(resolve(nextDirPath, filename))
        )
        return gzipped.byteLength
      })
      .reduce((s, b) => s + b, 0)

    return { filePath, size }
  })

  pageSizes = pageSizes.sort((a, b) => b.size - a.size)

  return pageSizes
}

export const getOutputDirectory = (path: string) => {
  const directoryPath = resolve(process.cwd(), path)

  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath)
  }

  return directoryPath
}

export const writePageSizes = (args: WritePageSizeArgs) => {
  const pageSizes = getPageSizes({
    nextDir: args.nextDir
  })

  const directoryPath = getOutputDirectory(args.output)

  const filePath = resolve(directoryPath, 'sizes.json')

  writeFileSync(filePath, JSON.stringify(pageSizes, null, 2))

  return {
    directoryPath,
    filePath,
    pageSizes
  }
}

export const comparePageSizes = (
  currentPages: PageSizes,
  oldPages: PageSizes
): ComparedPageSizes => {
  const compared: ComparedPageSizes = {}

  currentPages.forEach((currentPage) => {
    const oldPage = oldPages.find((b) => b.filePath === currentPage.filePath)

    const diff = oldPage !== undefined ? currentPage.size - oldPage.size : 0

    let sign

    if (diff > 0) {
      sign = '+'
    } else if (diff < 0) {
      sign = '-'
    } else {
      sign = ''
    }

    compared[currentPage.filePath] = {
      diff: `${sign}${formatBytes(Math.abs(diff))}`,
      size: formatBytes(currentPage.size)
    }
  })

  return compared
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
