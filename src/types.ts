export type BuildManifest = {
  ampDevFiles: any[];
  ampFirstPages: any[];
  devFiles: any[];
  lowPriorityFiles: string[];
  pages: Pages;
  polyfillFiles: string[];
  rootMainFiles: any[];
};

export type Pages = Record<string, string[]>;

export type GetPageSizesArgs = {
  nextDir?: string;
};

export type WritePageSizeArgs = {
  nextDir: string;
  output: string;
};
