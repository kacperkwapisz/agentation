const toolbarDot = document.getElementById("toolbar-dot");
const toolbarValue = document.getElementById("toolbar-value");
const mcpStatus = document.getElementById("mcp-status");
const mcpDot = document.getElementById("mcp-dot");
const mcpValue = document.getElementById("mcp-value");
const toggle = document.getElementById("toggle");
const originEl = document.getElementById("origin");

let tabId = null;
let enabled = false;

function setToolbarState(active, label) {
  toolbarDot.className = active ? "dot active" : "dot inactive";
  toolbarValue.textContent = label;
}

function setUnavailable(label) {
  setToolbarState(false, label);
  mcpStatus.style.display = "none";
  toggle.disabled = true;
  toggle.textContent = "Unavailable on this page";
}

function renderToggle() {
  toggle.disabled = false;
  toggle.className = enabled ? "off" : "";
  toggle.textContent = enabled ? "Disable on this site" : "Enable on this site";
}

function send(message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      resolve(response);
    });
  });
}

function checkMcpHealth() {
  mcpStatus.style.display = "";
  fetch("http://localhost:4747/health")
    .then((res) => {
      if (res.ok) {
        mcpDot.className = "dot active";
        mcpValue.textContent = "Connected";
      } else {
        mcpDot.className = "dot inactive";
        mcpValue.textContent = "Not responding";
      }
    })
    .catch(() => {
      mcpDot.className = "dot inactive";
      mcpValue.textContent = "Not running";
    });
}

chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const tab = tabs[0];
  tabId = tab?.id ?? null;
  const url = tab?.url || "";

  try {
    const parsed = new URL(url);
    originEl.textContent = parsed.origin;
  } catch {
    originEl.textContent = "";
  }

  if (!tabId) {
    setUnavailable("Inactive");
    return;
  }

  try {
    const state = await send({ type: "get-state" });
    if (state.hasOwnToolbar) {
      setToolbarState(true, "Page already has it");
      mcpStatus.style.display = "none";
      toggle.disabled = true;
      toggle.textContent = "Already on this page";
      return;
    }

    enabled = Boolean(state.enabled);
    setToolbarState(enabled, enabled ? "On" : "Off");
    renderToggle();
    if (enabled) checkMcpHealth();
    else mcpStatus.style.display = "none";
  } catch {
    setUnavailable("Inactive");
  }
});

toggle.addEventListener("click", async () => {
  if (toggle.disabled || tabId == null) return;
  toggle.disabled = true;
  try {
    const state = await send({ type: "set-enabled", enabled: !enabled });
    enabled = Boolean(state.enabled);
    setToolbarState(enabled, enabled ? "On" : "Off");
    renderToggle();
    if (enabled) checkMcpHealth();
    else mcpStatus.style.display = "none";
  } catch {
    setUnavailable("Inactive");
  }
});
