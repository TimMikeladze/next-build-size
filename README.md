# next-build-size

CLI tool to calculate the sizes of artifacts produced by `next build`.

### Usage

```sh
# Calculate and write the stats to a file
npx next-build-size stats

# Send the stats to a Discord webhook
npx next-build-size stats -d <webhook-url>
```

### Example output

```json
{
  "/": "102.68 KB",
  "/_app": "96.49 KB",
  "/_error": "96.47 KB"
}
```

### CLI

```
Usage: next-build-size stats [options] [nextDir]

Get the page sizes and other stats of a Next.js app

Arguments:
  nextDir                  Path to a .next folder, this is typically the root of your Next.js app after running `next build` (default: ".next")

Options:
  -o, --output <output>    Path to a file where the stats will be written to. Defaults to the current directory. (default: "next-build-size.json")
  -d, --discord <discord>  Send the stats to a Discord webhook
  -t, --title <title>      Title of the Discord message
```

