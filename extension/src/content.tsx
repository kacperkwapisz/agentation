import React from "react";
import ReactDOM from "react-dom/client";
import { Agentation } from "agentation";

const MCP_DEFAULT_ENDPOINT = "http://localhost:4747";
const ROOT_ID = "agentation-extension-root";
const EXTENSION_CLASS = "agentation-from-extension";

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

function mount() {
  if (document.getElementById(ROOT_ID) || pageHasOwnToolbar()) return;

  const container = document.createElement("div");
  container.id = ROOT_ID;
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <AgentationExtension />
    </React.StrictMode>
  );

  // Unmount if the page later mounts its own <Agentation />.
  const observer = new MutationObserver(() => {
    if (!pageHasOwnToolbar()) return;
    observer.disconnect();
    root.unmount();
    container.remove();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.body) {
  mount();
} else {
  document.addEventListener("DOMContentLoaded", mount);
}
