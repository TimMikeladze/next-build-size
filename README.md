# next-build-size

🧰 CLI tool to calculate the sizes of artifacts produced by `next build`.

⚖️ Integrates with Github Actions to compare the sizes of the current build with the previous one.

💬 Supports sending the stats to a Discord or Slack webhook.

## Getting started

The `stats` command accepts several optional argument to modify its behavior:

```sh
# Calculate and write the stats to a file
npx next-build-size stats

# Save the stats in the Github Actions cache and compare them with the previous build
npx next-build-size stats -c

# Send the stats to a Discord webhook
npx next-build-size stats -d <webhook-url>

# Send the stats to a Slack webhook
npx next-build-size stats -s <webhook-url>
```

### Example output

```json
{
  "_app": {
    "diff": "0 Bytes",
    "size": "9.77 KB"
  },
  "_404": {
    "diff": "-9.77 KB",
    "size": "19.53 KB"
  },
  "_error": {
    "diff": "+9.77 KB",
    "size": "19.53 KB"
  }
}
```

### CLI

```
Usage: next-build-size stats [options] [nextDir]

Get and compare page sizes

Arguments:
  nextDir                  Optional path to a .next folder, this is typically the root of your Next.js app after running `next build` (default: ".next")

Options:
  -o, --output <output>    Path to a folder where the stats will be written to (default: "next-build-size")
  -d, --discord <discord>  Send the stats to a Discord webhook
  -s, --slack <slack>      Send the stats to a Slack webhook
  -t, --title <title>      Title of the Discord or Slack message
  -v, --verbose            Show information about the execution of the command
  -c, --cache              Save the stats in the Github Actions cache and compare them with the previous build
  -h, --help               display help for command
```
