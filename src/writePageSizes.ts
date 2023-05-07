import { resolve } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { getPageSizes } from './getPageSizes'
import { WritePageSizeArgs } from './types'

export const writePageSizes = (args: WritePageSizeArgs) => {
  const pageSizes = getPageSizes({
    nextDir: args.nextDir
  })

  const directoryPath = resolve(process.cwd(), args.output)

  if (!existsSync(directoryPath)) {
    mkdirSync(directoryPath)
  }

  const filePath = resolve(directoryPath, 'page-sizes.json')

  writeFileSync(filePath, JSON.stringify(pageSizes, null, 2))

  return {
    directoryPath,
    filePath,
    pageSizes
  }
}
