#!/usr/bin/env node
import { Command } from 'commander'
import { writePageSizes } from './writePageSizes'
import { VERSION } from './constants'

const sendToDiscord = async (url, body: { content: string }): Promise<void> => {
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
    .description('Get the page sizes and other stats of a Next.js app')
    .version(VERSION)

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
    .option('-d, --discord <discord>', 'Send the stats to a Discord webhook')
    .option('-t, --title <title>', 'Title of the Discord message')
    .option(
      '-c, --cache',
      'Save the stats in the Github Actions cache and compare them with the previous build'
    )
    .action(async (nextDir, options) => {
      const { filePath, pageSizes } = writePageSizes({
        nextDir,
        output: options.output
      })

      console.log(`Wrote stats to ${filePath}`)

      const title = ['Next.js Build Stats', options.title]
        .filter(Boolean)
        .join(' - ')

      if (options.discord) {
        await sendToDiscord(options.discord, {
          content: `**${title}**
\`\`\`json
${JSON.stringify(pageSizes, null, 2)}
\`\`\``
        })
        console.log('Sent stats to Discord')
      }
    })

  await program.parseAsync(process.argv)

  process.exit(0)
})()
