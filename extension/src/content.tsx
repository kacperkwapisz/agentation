import React from "react";
import ReactDOM from "react-dom/client";
import { Agentation } from "agentation";

const MCP_DEFAULT_ENDPOINT = "http://localhost:4747";
const ROOT_ID = "agentation-extension-root";
const EXTENSION_CLASS = "agentation-from-extension";
const STORAGE_KEY = "enabledOrigins";

type Root = ReturnType<typeof ReactDOM.createRoot>;

let root: Root | null = null;
let container: HTMLDivElement | null = null;
let pageObserver: MutationObserver | null = null;

function pageHasOwnToolbar() {
  return Array.from(
    document.querySelectorAll("[data-agentation-toolbar]")
  ).some((el) => !el.classList.contains(EXTENSION_CLASS));
}

function AgentationExtension() {
  const [endpoint, setEndpoint] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    fetch(`${MCP_DEFAULT_ENDPOINT}/health`)
      .then((res) => {
        if (res.ok) {
          setEndpoint(MCP_DEFAULT_ENDPOINT);
        }
      })
      .catch(() => {
        // MCP server not available — run in local-only mode
      });
  }, []);

  return <Agentation endpoint={endpoint} className={EXTENSION_CLASS} />;
}

function unmount() {
  pageObserver?.disconnect();
  pageObserver = null;
  root?.unmount();
  root = null;
  container?.remove();
  container = null;
}

function mount() {
  if (root || document.getElementById(ROOT_ID) || pageHasOwnToolbar()) return;

  container = document.createElement("div");
  container.id = ROOT_ID;
  document.body.appendChild(container);

  root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AgentationExtension />
    </React.StrictMode>
  );

  pageObserver = new MutationObserver(() => {
    if (!pageHasOwnToolbar()) return;
    unmount();
  });
  pageObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

async function getEnabledOrigins(): Promise<string[]> {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  return Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : [];
}

async function isOriginEnabled(origin: string): Promise<boolean> {
  const origins = await getEnabledOrigins();
  return origins.includes(origin);
}

async function setOriginEnabled(origin: string, enabled: boolean) {
  const origins = await getEnabledOrigins();
  const next = enabled
    ? Array.from(new Set([...origins, origin]))
    : origins.filter((item) => item !== origin);
  await chrome.storage.local.set({ [STORAGE_KEY]: next });
}

function applyEnabled(enabled: boolean) {
  if (enabled) mount();
  else unmount();
}

async function syncFromStorage() {
  applyEnabled(await isOriginEnabled(location.origin));
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type === "get-state") {
    isOriginEnabled(location.origin).then((enabled) => {
      sendResponse({
        enabled,
        origin: location.origin,
        hasOwnToolbar: pageHasOwnToolbar(),
      });
    });
    return true;
  }

  if (message?.type === "set-enabled") {
    const enabled = Boolean(message.enabled);
    setOriginEnabled(location.origin, enabled).then(() => {
      applyEnabled(enabled);
      sendResponse({ enabled, origin: location.origin });
    });
    return true;
  }

  return false;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local" || !changes[STORAGE_KEY]) return;
  syncFromStorage();
});

if (document.body) {
  syncFromStorage();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    syncFromStorage();
  });
}
