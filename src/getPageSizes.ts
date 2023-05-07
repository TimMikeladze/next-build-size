import fs from 'fs'
import path, { resolve } from 'path'
import zlib from 'zlib'
import { BuildManifest, GetPageSizesArgs, PageSizes } from './types'

export const getPageSizes = (args: GetPageSizesArgs): PageSizes => {
  const nextDirPath = resolve(
    process.cwd(),
    args.nextDir ? args.nextDir : '.next'
  )

  const buildManifest = JSON.parse(
    fs.readFileSync(path.join(nextDirPath, 'build-manifest.json'), 'utf8')
  ) as BuildManifest

  const pageSizes = Object.keys(buildManifest.pages).map((filePath) => {
    const files = buildManifest.pages[filePath]
    const size = files
      .map((filename) => {
        const gzipped = zlib.gzipSync(
          fs.readFileSync(path.join(nextDirPath, filename))
        )
        return gzipped.byteLength
      })
      .reduce((s, b) => s + b, 0)

    return { filePath, size }
  })

  return pageSizes.reduce((acc, { filePath, size }) => {
    acc[filePath] = formatBytes(size)
    return acc
  }, {} as Record<string, string>)
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}
