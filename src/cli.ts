#!/usr/bin/env node
import { Command } from 'commander'
import { writePageSizes } from './writePageSizes'
;(async () => {
  const program = new Command()

  program
    .name('next-build-size')
    .description('Get the page sizes and other stats of a Next.js app')
    .version('1.0.4')

  program
    .command('stats')
    .description('Get the page sizes and other stats of a Next.js app')
    .argument(
      '[nextDir]',
      'Path to a .next folder, this is typically the root of your Next.js app after running `next build`',
      '.next'
    )
    .option(
      '-o, --output <output>',
      'Path to a file where the stats will be written to. Defaults to the current directory.',
      'next-build-size.json'
    )
    .action((nextDir, options) => {
      const { filePath } = writePageSizes({
        nextDir,
        output: options.output
      })
      console.log(`Writing stats to ${filePath}`)
    })

  program.command('cli')

  program.parse()

  process.exit(0)
})()
