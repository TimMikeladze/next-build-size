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

export type PageSizes = Record<string, string>

export type CachePageSizesArgs = {
  filePath: string
  pageSizes: PageSizes
}
