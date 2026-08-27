# Chrome Web Store listing

Fields to paste into https://chrome.google.com/webstore/devconsole

Or run the walkthrough:

```bash
./extension/publish-chrome-store.sh
```

## Privacy policy URL

```
https://github.com/kacperkwapisz/agentation/blob/feat/chrome-extension/extension/PRIVACY.md
```

## Name

```
Agentation
```

## Short description (132 characters max)

```
Annotate localhost pages and copy structured feedback for AI coding agents. Nothing to add to your project.
```

## Detailed description

```
A floating toolbar on localhost. Click an element, leave a note, copy markdown with the CSS selector and where it sits on the page. Paste that into Claude Code, Cursor, Codex, or any other agent.

This is the same toolbar as `npm install agentation`. If the page already renders <Agentation />, the extension does not mount a second copy.

It only runs on localhost and 127.0.0.1. If agentation-mcp is running on port 4747, annotations can sync to the agent without copy-paste.
```

## Category

Developer Tools

## Language

English

## Single purpose

```
Show the Agentation toolbar on localhost so you can annotate a page and copy selectors for an AI coding agent.
```

## Permission justifications

Host permissions (`http://localhost/*`, `http://127.0.0.1/*`, `https://localhost/*`):

```
Needed to inject the toolbar on local dev pages, and to ping http://localhost:4747/health if you are running the Agentation MCP server. It does not run on other sites.
```

Remote code: none. Data use: none.

## Graphics

| Asset | Path | Size |
| --- | --- | --- |
| Store icon | `store/icon-128.png` | 128×128 |
| Screenshot (required) | `store/screenshot-1280x800.png` | 1280×800 |
| Small promo tile (optional) | `store/small-tile-440x280.png` | 440×280 |
| Marquee (optional) | `store/marquee-1400x560.png` | 1400×560 |

If you can, add a second screenshot of the toolbar open on a localhost page. The one we have is the marketing homepage with the collapsed button in the corner, which is weak.

## Zip

```
pnpm extension:zip
```

Upload `extension/agentation-extension.zip`. Leave `store/` out of the zip. Chrome wants the extension package, not the listing assets.
