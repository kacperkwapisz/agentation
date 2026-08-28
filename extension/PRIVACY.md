# Privacy Policy

Last updated: August 28, 2026

Agentation is a visual feedback tool for AI coding agents. This policy covers the Chrome extension published at the Chrome Web Store.

## What we collect

The extension does not collect personal information. It does not include analytics, advertising, crash reporting, or any remote telemetry. We do not operate a backend that receives data from the extension.

## Where data lives

The toolbar stays off until you enable it on a site from the extension popup. That choice is stored in Chrome's local extension storage as the site origin (`https://example.com`), on your machine. Annotations you create are stored in that page's `localStorage`. Neither leaves the browser unless you copy them or you are running the optional local MCP server.

If you are running the Agentation MCP server locally, the extension may send annotation data to `http://localhost:4747`. That server runs on your computer. Nothing is sent to Agentation or any third party.

## Permissions

The extension can run on http and https pages so that, after you enable a site, it can show the toolbar and read the element you click (tag, CSS classes, position). It does not read your cookies, account data, or form passwords. It does not run on the Chrome Web Store.

## Clipboard

When you copy structured feedback from the toolbar, that text is written to your clipboard at your request. It is not transmitted anywhere else by the extension.

## Changes

If this policy changes, we will update this page and the date above.

## Contact

Questions: [open an issue on GitHub](https://github.com/kacperkwapisz/agentation/issues).
