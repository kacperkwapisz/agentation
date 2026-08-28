# Chrome Extension

Use Agentation on any web page without adding it to your project.

## Install from release

Download `agentation-extension.zip` from [Releases](https://github.com/kacperkwapisz/agentation/releases), unzip, then:
`chrome://extensions` → Developer mode → Load unpacked → select the folder.

The toolbar stays off until you enable it for the current site from the extension popup. Chrome remembers that origin. If the page already mounts `<Agentation />`, the extension stays out of the way.

## Build from source

```bash
pnpm extension:build
```

Then `chrome://extensions` → Developer mode → Load unpacked → select the `extension/` folder.

Watch mode (rebuilds on package or extension changes):

```bash
pnpm extension:watch
```

## Chrome Web Store

Listing copy, permission justifications, and screenshot notes: [STORE.md](./STORE.md).

```bash
pnpm extension:zip
./extension/publish-chrome-store.sh
```
