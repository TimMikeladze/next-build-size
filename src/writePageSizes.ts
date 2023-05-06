import { resolve } from 'path'
import { lstatSync, writeFileSync } from 'fs'
import { getPageSizes } from './getPageSizes'
import { WritePageSizeArgs } from './types'

export const writePageSizes = (args: WritePageSizeArgs) => {
  const pageSizes = getPageSizes({
    nextDir: args.nextDir
  })

  const filePath = resolve(process.cwd(), args.output)

  try {
    const stats = lstatSync(filePath)

    if (stats.isDirectory()) {
      throw new Error(
        `The path ${args.output} is a directory, please provide a file path`
      )
    }
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  writeFileSync(filePath, JSON.stringify(pageSizes, null, 2))

  return {
    filePath,
    pageSizes
  }
}
