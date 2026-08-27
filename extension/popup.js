const toolbarDot = document.getElementById("toolbar-dot");
const toolbarValue = document.getElementById("toolbar-value");
const mcpStatus = document.getElementById("mcp-status");
const mcpDot = document.getElementById("mcp-dot");
const mcpValue = document.getElementById("mcp-value");

function isInjectable(url) {
  if (!url) return false;
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "http:" && protocol !== "https:") return false;
    if (hostname === "chrome.google.com" || hostname === "chromewebstore.google.com") {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0]?.url || "";
  const isActive = isInjectable(url);

  if (isActive) {
    toolbarDot.className = "dot active";
    toolbarValue.textContent = "Active";
    checkMcpHealth();
  } else {
    toolbarDot.className = "dot inactive";
    toolbarValue.textContent = "Inactive";
    mcpStatus.style.display = "none";
  }
});

function checkMcpHealth() {
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
