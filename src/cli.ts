#!/usr/bin/env node
import { Command } from 'commander'
import {
  cacheNextBuildSize,
  comparePageSizes,
  getOutputDirectory,
  PageSizes,
  restoreNextBuildSize,
  VERSION,
  writePageSizes
} from './index'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const sendToDiscord = async (url, body: { content: string }): Promise<void> => {
  await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST'
  })
}

const sendToSlack = async (url, body: { text: string }): Promise<void> => {
  await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST'
  })
}

export default sendToDiscord
;(async () => {
  const program = new Command()

  program
    .name('next-build-size')
    .description('Get and compare page sizes of a Next.js app')
    .version(VERSION)

  program
    .command('stats')
    .description('Get and compare page sizes')
    .argument(
      '[nextDir]',
      'Optional path to a .next folder, this is typically the root of your Next.js app after running `next build`',
      '.next'
    )
    .option(
      '-o, --output <output>',
      'Path to a folder where the stats will be written to',
      'next-build-size'
    )
    .option('-d, --discord <discord>', 'Send the stats to a Discord webhook')
    .option('-s, --slack <slack>', 'Send the stats to a Slack webhook')
    .option('-t, --title <title>', 'Title of the Discord or Slack message')
    .option(
      '-v, --verbose',
      'Show information about the execution of the command'
    )
    .option(
      '-c, --cache',
      'Save the stats in the Github Actions cache and compare them with the previous build'
    )
    .action(async (nextDir = '.next', options) => {
      const directoryPath = getOutputDirectory(options.output)
      const verbose = !!options.verbose

      let restoredPageSizes: PageSizes = []

      if (options.cache) {
        restoredPageSizes = await restoreNextBuildSize({ directoryPath })
        if (verbose) {
          if (Object.keys(restoredPageSizes).length) {
            console.log('Restored page stats from cache')
          } else {
            console.log('No page stats found in cache')
          }
        }
      }

      const { filePath, pageSizes } = writePageSizes({
        nextDir,
        output: options.output
      })

      if (verbose) {
        console.log(`Wrote page sizes to ${filePath}`)
      }

      if (options.cache) {
        await cacheNextBuildSize({ directoryPath })
        if (verbose) {
          console.log('Saved stats to cache')
        }
      }

      const comparedPageSizes = comparePageSizes(pageSizes, restoredPageSizes)

      const title = ['Next.js Build Stats', options.title]
        .filter(Boolean)
        .join(' - ')

      const statsFilePath = resolve(directoryPath, 'stats.json')

      const stats = JSON.stringify(comparedPageSizes, null, 2)

      writeFileSync(statsFilePath, stats)

      if (verbose) {
        console.log(`Wrote stats to ${statsFilePath}`)
      }

      const message = `**${title}**
\`\`\`json
${stats}
\`\`\``

      if (options.discord) {
        await sendToDiscord(options.discord, { content: message })
        if (verbose) {
          console.log('Sent stats to Discord')
        }
      }

      if (options.slack) {
        await sendToSlack(options.slack, { text: message })
        if (verbose) {
          console.log('Sent stats to Slack')
        }
      }

      console.log(stats)
    })

  await program.parseAsync(process.argv)

  process.exit(0)
})()
